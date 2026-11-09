"use client";

import Image from "next/image";
import { FadeInSection, FadeInCard } from "@/components/motion-wrapper";
import { useLanguage } from "@/context/language-context";

interface RoleConfig {
  key: keyof ReturnType<typeof useLanguage>["dict"]["career"]["roles"];
  url?: string;
  logo: string;
  image?: string;
}

const ROLE_CONFIGS: RoleConfig[] = [
  {
    key: "humanise",
    logo: "/humanise-icon.jpg",
    image: "/humanise-image.webp",
  },
  {
    key: "signe_local",
    url: "https://www.signelocal.com",
    logo: "/signe-local-logo.jpg",
    image: "/signe-local.jpg",
  },
  {
    key: "belvoir",
    url: "https://www.manoirs.ca",
    logo: "/belvoir-logo-dark.png",
    image: "/belvoir-manor-1.avif",
  },
  {
    key: "renovco",
    url: "https://www.renovco.com",
    logo: "/renovco-logo2.png",
    image: "/renovco-image.jpg",
  },
  {
    key: "elections_canada",
    logo: "/Elections-Canada-Icon.png",
    image: "/Elections-Canada-Image.jpg",
  },
  {
    key: "costco",
    logo: "/Costco-icon.webp",
    image: "/Costco-image.webp",
  },
  {
    key: "public_outreach",
    url: "https://www.publicoutreachgroup.com",
    logo: "/Public-outreach-icon.jpg",
    image: "/Public-outreach-image.jpg",
  },
];

export function Career() {
  const { dict } = useLanguage();

  return (
    <section id="career" className="section-padding bg-background">
      <div className="content-max">
        <FadeInSection>
          <p className="section-label">{dict.career.section_label}</p>
          <h2 className="section-heading mb-12">{dict.career.section_heading}</h2>
        </FadeInSection>

        <div className="flex flex-col gap-6">
          {ROLE_CONFIGS.map((config, i) => {
            const role = dict.career.roles[config.key];
            const bullets = role.bullets as string[];
            return (
              <FadeInCard key={config.key} delay={i * 0.06}>
                <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    {/* Left: Image */}
                    {config.image && (
                      <div className="relative w-full md:w-48 lg:w-56 h-40 md:h-auto flex-shrink-0 overflow-hidden">
                        <Image
                          src={config.image}
                          alt={role.company}
                          fill
                          sizes="(max-width: 768px) 100vw, 224px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Right: Content */}
                    <div className="flex-1 p-6 flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border flex-shrink-0 mt-0.5 bg-white">
                          <Image
                            src={config.logo}
                            alt={`${role.company} logo`}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-foreground leading-tight">{role.title}</h3>
                          <div className="flex items-center gap-2 flex-wrap mt-0.5">
                            {config.url ? (
                              <a
                                href={config.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent font-medium text-sm hover:underline"
                              >
                                {role.company}
                              </a>
                            ) : (
                              <span className="text-accent font-medium text-sm">{role.company}</span>
                            )}
                            <span className="text-muted-foreground text-xs">·</span>
                            <span className="text-muted-foreground text-sm">{role.dates}</span>
                          </div>
                        </div>
                      </div>

                      <ul className="flex flex-col gap-1.5 mt-1">
                        {bullets.map((b, j) => (
                          <li key={j} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                            <span className="text-accent mt-1.5 flex-shrink-0 text-xs">▪</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
