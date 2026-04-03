"use client";

import { useSyncExternalStore } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "./ResumePDF";
import { useLanguage } from "@/context/language-context";

// SSR-safe hydration check — same pattern as theme-toggle.tsx
function subscribe() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}
function useMounted() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

function PdfIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <polyline points="9 14 12 17 15 14" />
    </svg>
  );
}

export function DownloadResumeButton() {
  const mounted = useMounted();
  const { dict } = useLanguage();

  if (!mounted) {
    // Placeholder with identical dimensions so layout doesn't shift
    return (
      <div
        aria-hidden="true"
        className="h-12 w-12 rounded-full flex items-center justify-center border border-base/30 text-base opacity-0 pointer-events-none"
      />
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDF dict={dict} />}
      fileName="will-seguin-resume.pdf"
      aria-label={dict.pdf.download_aria}
      className="h-12 w-12 rounded-full flex items-center justify-center border border-base/30 text-base hover:bg-base/10 hover:border-accent hover:text-accent transition-all duration-200"
    >
      <PdfIcon />
    </PDFDownloadLink>
  );
}
