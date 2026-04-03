"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLanguage } from "@/context/language-context";
import type { Locale } from "@/i18n/types";

const LOCALES: Locale[] = ["en", "fr", "it", "es"];

function LanguageSwitcher() {
  const { locale, setLocale, dict } = useLanguage();

  return (
    <div
      role="group"
      aria-label={dict.nav.aria_language_switcher}
      className="flex items-center gap-0.5"
    >
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          aria-pressed={locale === loc}
          className={`text-xs font-bold px-2 py-1 rounded-md transition-all duration-150 cursor-pointer uppercase tracking-wide ${
            locale === loc
              ? "bg-accent text-contrast"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dict } = useLanguage();

  const NAV_LINKS = [
    { label: dict.nav.career, href: "#career" },
    { label: dict.nav.education, href: "#education" },
    { label: dict.nav.projects, href: "#projects" },
    { label: dict.nav.more, href: "#more" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="font-bold text-lg text-foreground hover:text-accent transition-colors duration-200 tracking-wide uppercase"
          onClick={handleNavClick}
        >
          William Séguin
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label={dict.nav.aria_main}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            aria-label={menuOpen ? dict.nav.aria_close_menu : dict.nav.aria_open_menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="h-9 w-9 rounded-full flex items-center justify-center border border-border text-foreground hover:bg-accent hover:text-contrast hover:border-accent transition-all duration-200 cursor-pointer"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="bg-background/98 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-1"
          aria-label={dict.nav.aria_mobile}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg px-3 py-2.5 transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
