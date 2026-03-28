"use client";

import Image from "next/image";
import { FadeInSection, FadeInCard } from "@/components/motion-wrapper";

interface School {
  institution: string;
  shortName?: string;
  credential: string;
  dates: string;
  logo: string;
  image?: string;
  notes?: string;
  highlight?: string;
}

const SCHOOLS: School[] = [
  {
    institution: "Université de Sherbrooke",
    credential: "DESS — Specialized Graduate Diploma in Accounting",
    dates: "Sep 2023 – Sep 2025",
    logo: "/Sherbrooke-icon.png",
    image: "/Sherbrooke-image.jpg",
    notes: "CPA Common Final Exam preparation.",
    highlight: "CPA Québec — December 2025",
  },
  {
    institution: "HEC Montréal",
    credential: "BBA — Bachelor of Business Administration",
    dates: "2018 – 2023",
    logo: "/hec-montreal-icon.png",
    image: "/hec-montreal-image.webp",
    notes: "Major: Accounting. Trilingual program (FR / EN / ES).",
  },
  {
    institution: "Universidad Carlos III de Madrid",
    credential: "Student Exchange Program",
    dates: "Jan 2022 – Jul 2022",
    logo: "/uc3m-icon.png",
    image: "/uc3m-image.webp",
    notes: "Semester exchange — Madrid, Spain.",
  },
  {
    institution: "Jean Giono Intl. School of Turin",
    credential: "Baccalauréat Scientifique",
    dates: "2014 – 2017",
    logo: "/jean-giono-icon.jpg",
    image: "/jean-giono-image.jpg",
    notes:
      "Math specialization. Grade: 18.67/20 (≈ 4.3 GPA). Trilingual (FR/EN/ES). Student rep on Board of Directors (2016–17); VP of CVL committee (2014–16).",
  },
];

export function Education() {
  return (
    <section id="education" className="section-padding bg-contrast text-base">
      <div className="content-max">
        <FadeInSection>
          <p className="section-label text-accent/80">Academic Background</p>
          <h2 className="text-4xl md:text-5xl font-bold text-base mb-12">Education</h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SCHOOLS.map((school, i) => (
            <FadeInCard key={school.institution} delay={i * 0.07}>
              <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 h-full">
                {school.image && (
                  <div className="relative w-full h-36 overflow-hidden">
                    <Image
                      src={school.image}
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
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border flex-shrink-0 mt-0.5 bg-white">
                      <Image
                        src={school.logo}
                        alt={`${school.institution} logo`}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground leading-tight">{school.institution}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{school.credential}</p>
                      <p className="text-xs text-accent mt-1">{school.dates}</p>
                    </div>
                  </div>
                  {school.notes && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{school.notes}</p>
                  )}
                  {school.highlight && (
                    <div className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/40 rounded-full px-3 py-1 text-xs font-bold text-accent self-start">
                      <span>🏆</span>
                      {school.highlight}
                    </div>
                  )}
                </div>
              </div>
            </FadeInCard>
          ))}
        </div>
      </div>
    </section>
  );
}
