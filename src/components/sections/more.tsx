"use client";

import { FadeInSection, FadeInCard } from "@/components/motion-wrapper";
import { useLanguage } from "@/context/language-context";
import { useState } from "react";

interface FactConfig {
  key: "dj" | "wellness" | "poetry" | "global";
  emoji: string;
  link?: { href: string };
}

const FACT_CONFIGS: FactConfig[] = [
  {
    key: "dj",
    emoji: "🎧",
    link: { href: "https://soundcloud.com/morettiradio" },
  },
  {
    key: "wellness",
    emoji: "🧘",
  },
  {
    key: "poetry",
    emoji: "✍️",
    link: { href: "https://www.poesie-en-liberte.fr/funerailles-de-lhomme-moderne/" },
  },
  {
    key: "global",
    emoji: "🌍",
  },
];

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function More() {
  const { dict } = useLanguage();
  const [poetryExpanded, setPoetryExpanded] = useState(false);

  return (
    <section id="more" className="section-padding bg-contrast text-base">
      <div className="content-max">
        <FadeInSection>
          <p className="section-label text-accent/80">{dict.more.section_label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-base mb-12">{dict.more.section_heading}</h2>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FACT_CONFIGS.map((config, i) => {
            const fact = dict.more[config.key];
            const linkLabel = "link_label" in fact ? (fact.link_label as string) : undefined;
            const isPoetry = config.key === "poetry";
            return (
              <FadeInCard key={config.key} delay={i * 0.08}>
                <div className="group bg-base/5 border border-base/15 rounded-2xl p-6 hover:border-accent/50 hover:bg-base/8 transition-all duration-300 h-full flex flex-col gap-4">
                  <div className="text-3xl" aria-hidden="true">{config.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-base mb-2">{fact.title}</h3>
                    <p
                      className={[
                        "text-sm text-base/65 leading-relaxed",
                        isPoetry && !poetryExpanded ? "max-h-24 overflow-hidden" : "",
                      ].join(" ")}
                    >
                      {fact.body}
                    </p>
                  </div>
                  {isPoetry ? (
                    <div className="mt-auto flex items-center justify-between gap-4">
                      {config.link && linkLabel ? (
                        <a
                          href={config.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                        >
                          {linkLabel}
                          <ExternalIcon />
                        </a>
                      ) : (
                        <span />
                      )}

                      <button
                        type="button"
                        onClick={() => setPoetryExpanded((v) => !v)}
                        className="inline-flex items-center text-xs font-bold text-accent hover:underline"
                      >
                        {poetryExpanded ? dict.more.read_less : dict.more.read_more}
                      </button>
                    </div>
                  ) : (
                    config.link &&
                    linkLabel && (
                      <a
                        href={config.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline self-start"
                      >
                        {linkLabel}
                        <ExternalIcon />
                      </a>
                    )
                  )}
                </div>
              </FadeInCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
