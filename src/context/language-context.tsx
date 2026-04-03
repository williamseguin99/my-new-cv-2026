"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";
import type { Dictionary, Locale } from "@/i18n/types";

import en from "@/i18n/en.json";
import fr from "@/i18n/fr.json";
import it from "@/i18n/it.json";
import es from "@/i18n/es.json";

const DICTS: Record<Locale, Dictionary> = {
  en: en as unknown as Dictionary,
  fr: fr as unknown as Dictionary,
  it: it as unknown as Dictionary,
  es: es as unknown as Dictionary,
};

const VALID_LOCALES: Locale[] = ["en", "fr", "it", "es"];
const STORAGE_KEY = "cv-locale";

function isValidLocale(value: unknown): value is Locale {
  return VALID_LOCALES.includes(value as Locale);
}

// ─── Module-level external store ─────────────────────────────────────────────
// Listeners are notified whenever the stored locale changes so that
// useSyncExternalStore triggers a re-render without a useEffect + setState.

const listeners = new Set<() => void>();

function subscribeToLocale(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getLocaleSnapshot(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isValidLocale(stored) ? stored : "en";
}

// Server snapshot always returns "en" — avoids hydration mismatch.
function getServerSnapshot(): Locale {
  return "en";
}

function notifyListeners() {
  listeners.forEach((cb) => cb());
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface LanguageContextValue {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore reads from localStorage client-side and returns the
  // server snapshot ("en") during SSR / first hydration — zero mismatch.
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerSnapshot,
  );

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    notifyListeners();
  }, []);

  const value: LanguageContextValue = {
    locale,
    dict: DICTS[locale],
    setLocale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return ctx;
}
