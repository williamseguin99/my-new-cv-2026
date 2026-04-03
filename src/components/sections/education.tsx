"use client";

import Image from "next/image";
import { FadeInSection, FadeInCard } from "@/components/motion-wrapper";
import { useLanguage } from "@/context/language-context";

interface SchoolConfig {
  key: keyof ReturnType<typeof useLanguage>["dict"]["education"]["schools"];
  logo: string;
  image?: string;
}

const SCHOOL_CONFIGS: SchoolConfig[] = [
  {
    key: "sherbrooke",
    logo: "/Sherbrooke-icon.png",
    image: "/Sherbrooke-image.jpg",
  },
  {
    key: "hec",
    logo: "/hec-montreal-icon.png",
    image: "/hec-montreal-image.webp",
  },
  {
    key: "uc3m",
    logo: "/uc3m-icon.jpg",
    image: "/uc3m-image.webp",
  },
  {
    key: "jean_giono",
    logo: "/jean-giono-icon.jpg",
    image: "/jean-giono-image.jpg",
  },
];

export function Education() {
  const { dict } = useLanguage();

  return (
    <section id="education" className="section-padding bg-contrast text-base">
      <div className="content-max">
        <FadeInSection>
          <p className="section-label text-accent/80">{dict.education.section_label}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-base mb-12">{dict.education.section_heading}</h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SCHOOL_CONFIGS.map((config, i) => {
            const school = dict.education.schools[config.key];
            const highlight = "highlight" in school ? (school.highlight as string) : undefined;
            const notes = school.notes as string;
            return (
              <FadeInCard key={config.key} delay={i * 0.07}>
                <div className="group bg-base/5 border border-base/15 rounded-2xl overflow-hidden hover:border-accent/50 hover:bg-base/8 transition-all duration-300 h-full">
                  {config.image && (
                    <div className="relative w-full h-36 overflow-hidden">
                      <Image
                        src={config.image}
                        alt={school.institution}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-contrast/60 to-transparent" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-base/20 flex-shrink-0 mt-0.5 bg-base/10">
                        <Image
                          src={config.logo}
                          alt={`${school.institution} logo`}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-base leading-tight">{school.institution}</h3>
                        <p className="text-sm text-base/70 mt-0.5">{school.credential}</p>
                        <p className="text-xs text-accent mt-1">{school.dates}</p>
                      </div>
                    </div>
                    {notes && (
                      <p className="text-sm text-base/60 leading-relaxed">{notes}</p>
                    )}
                    {highlight && (
                      <div className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/40 rounded-full px-3 py-1 text-xs font-bold text-accent self-start">
                        <span>🏆</span>
                        {highlight}
                      </div>
                    )}
                  </div>
                </div>
              </FadeInCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
