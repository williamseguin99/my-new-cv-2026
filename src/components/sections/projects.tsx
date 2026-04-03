"use client";

import Image from "next/image";
import { FadeInSection, FadeInCard } from "@/components/motion-wrapper";
import { useLanguage } from "@/context/language-context";

interface ProjectConfig {
  key: "qcheck" | "moretti_radio";
  url?: string;
  image: string;
  icon?: string;
  imageAlign?: "top" | "center" | "bottom";
}

const PROJECT_CONFIGS: ProjectConfig[] = [
  {
    key: "qcheck",
    url: "https://www.qcheck.ca",
    image: "/q-check-image.png",
    icon: "/q-check-icon.png",
    imageAlign: "top",
  },
  {
    key: "moretti_radio",
    url: "https://soundcloud.com/morettiradio",
    image: "/moretti-radio-cover-1.png",
  },
];

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
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

export function Projects() {
  const { dict } = useLanguage();

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="content-max">
        <FadeInSection>
          <p className="section-label">{dict.projects.section_label}</p>
          <h2 className="section-heading mb-12">{dict.projects.section_heading}</h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECT_CONFIGS.map((config, i) => {
            const project = dict.projects[config.key];
            const tags = project.tags as string[];
            return (
              <FadeInCard key={config.key} delay={i * 0.1}>
                <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl hover:shadow-accent/8 transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image
                      src={config.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover group-hover:scale-105 transition-transform duration-500 ${config.imageAlign === "top" ? "object-top" : config.imageAlign === "bottom" ? "object-bottom" : "object-center"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col gap-4">
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium bg-accent/10 text-accent border border-accent/20 rounded-full px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    {config.url && (
                      <a
                        href={config.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline group/link"
                      >
                        {project.cta}
                        <span className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-150">
                          <ExternalIcon />
                        </span>
                      </a>
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
