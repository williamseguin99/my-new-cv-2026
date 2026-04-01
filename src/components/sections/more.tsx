"use client";

import { FadeInSection, FadeInCard } from "@/components/motion-wrapper";

interface Fact {
  emoji: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
}

const FACTS: Fact[] = [
  {
    emoji: "🎧",
    title: "DJ Chill Will",
    body: "Outside of finance, I perform as DJ Chill Will for corporate events and restaurant residencies. Host of Moretti Radio — Afro-Balearic Chic, sophisticated frictionless listening.",
    link: {
      label: "Listen on SoundCloud",
      href: "https://soundcloud.com/morettiradio",
    },
  },
  {
    emoji: "🧘",
    title: "Discipline & Wellness",
    body: "I start every day at 6 a.m. with meditation and cold exposure. Yoga and strength training keep me focused and energized. Competed in the 24h Tremblant endurance event for children's foundations.",
  },
  {
    emoji: "✍️",
    title: "Prix Poésie en Liberté — 2nd Prize",
    body: "2nd prize in the Prix Poésie en Liberté (Nov 2016) — an international French-language poetry competition run under the French Ministry of National Education, with 100,000+ entries annually from ages 15–25 across all countries.",
    link: {
      label: "Read the poem",
      href: "https://www.poesie-en-liberte.fr/funerailles-de-lhomme-moderne/",
    },
  },
  {
    emoji: "🌍",
    title: "Global Perspective",
    body: "Quadrilingual (FR/EN/ES/IT), EU citizen, family ties in Switzerland. Studied in Turin, Montreal, and Madrid. Open to professional exchanges within the Swiss and European market.",
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
  return (
    <section id="more" className="section-padding bg-contrast text-base print:hidden">
      <div className="content-max">
        <FadeInSection>
          <p className="section-label text-accent/80">Beyond Finance</p>
          <h2 className="text-4xl md:text-5xl font-bold text-base mb-12">More</h2>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FACTS.map((fact, i) => (
            <FadeInCard key={fact.title} delay={i * 0.08}>
              <div className="group bg-base/5 border border-base/15 rounded-2xl p-6 hover:border-accent/50 hover:bg-base/8 transition-all duration-300 h-full flex flex-col gap-4">
                <div className="text-3xl" aria-hidden="true">{fact.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-base mb-2">{fact.title}</h3>
                  <p className="text-sm text-base/65 leading-relaxed">{fact.body}</p>
                </div>
                {fact.link && (
                  <a
                    href={fact.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline self-start"
                  >
                    {fact.link.label}
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </FadeInCard>
          ))}
        </div>
      </div>
    </section>
  );
}
