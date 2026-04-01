"use client";

import Image from "next/image";
import { FadeInSection, FadeInCard } from "@/components/motion-wrapper";

interface Role {
  title: string;
  company: string;
  dates: string;
  url?: string;
  logo: string;
  image?: string;
  bullets: string[];
  printExclude?: boolean;
}

const ROLES: Role[] = [
  {
    title: "Assistant Financial Controller",
    company: "Humanise Collective",
    dates: "May 2025 – Present",
    logo: "/humanise-icon.jpg",
    image: "/humanise-image.webp",
    bullets: [
      "Right hand to financial management for an 8-agency marketing communications group; consolidated monthly reporting and budget variance analysis.",
      "Automation of reports and management tools via PowerQuery and Google Apps Script/Macros.",
      "Supervision of AP/AR, treasury, inter-company billing, and fee invoicing. Technical env: NetSuite, Excel (PowerQuery), Google Suite.",
    ],
  },
  {
    title: "Chief Accountant",
    company: "Signé Local",
    dates: "Sep 2023 – May 2025",
    url: "https://www.signelocal.com",
    logo: "/signe-local-logo.jpg",
    image: "/signe-local.jpg",
    bullets: [
      "Financial oversight for 4 physical stores and an eCommerce platform.",
      "Regular monitoring of inventory, financial forecasting, and reconciliation of funds.",
      "Process improvements to maintain operational efficiency and support strategic growth.",
    ],
  },
  {
    title: "Financial Controller",
    company: "Le Belvoir",
    dates: "Apr 2023 – May 2025",
    url: "https://www.manoirs.ca",
    logo: "/belvoir-logo-dark.png",
    image: "/belvoir-manor-1.avif",
    bullets: [
      "Bookkeeping, financial transaction recording, and reconciliation.",
      "Budgeting and forecasting processes; financial projections to support company growth.",
      "Tax planning: identifying opportunities for savings and ensuring compliance with local regulations.",
    ],
  },
  {
    title: "Project Accountant",
    company: "Renovco",
    dates: "Sep 2022 – Apr 2023",
    url: "https://www.renovco.com",
    logo: "/renovco-logo2.png",
    image: "/renovco-image.jpg",
    bullets: [
      "Project-based accounting support for restoration and renovation initiatives.",
      "Follow-ups with project managers to ensure alignment with budgets and cost tracking.",
      "Managed A/R and A/P cycles.",
    ],
  },
  {
    title: "Central Poll Supervisor",
    company: "Elections Canada",
    dates: "Oct 2018 – Ongoing",
    logo: "/Elections-Canada-Icon.png",
    image: "/Elections-Canada-Image.jpg",
    printExclude: true,
    bullets: [
      "Ongoing civic mandate; leads teams of 8 as polling supervisor for federal and provincial elections.",
      "Appointed supervisor after proving as clerk and Deputy Returning Officer.",
      "Ensures confidentiality of the vote and compliance with electoral law.",
    ],
  },
  {
    title: "Customer Service & Sales",
    company: "Costco Wholesale",
    dates: "Apr 2020 – Aug 2020",
    logo: "/Costco-icon.webp",
    image: "/Costco-image.webp",
    printExclude: true,
    bullets: [
      "Featured on Membership dept. Top Employees board for credit card and membership conversion performance.",
      "Repeatedly selected to drive new memberships over standard cashier duties.",
    ],
  },
  {
    title: "Fundraiser",
    company: "Public Outreach Fundraising",
    dates: "Jan 2018 – May 2020",
    url: "https://www.publicoutreachgroup.com",
    logo: "/Public-outreach-icon.jpg",
    image: "/Public-outreach-image.jpg",
    printExclude: true,
    bullets: [
      "Door-to-door recurring donation campaigns for Doctors Without Borders, Greenpeace, UNICEF, Amnesty International, and CARE.",
      "Developed key communication and persuasion skills through representing world-leading NGOs.",
    ],
  },
];

export function Career() {
  return (
    <section id="career" className="section-padding bg-background">
      <div className="content-max">
        <FadeInSection>
          <p className="section-label">Experience</p>
          <h2 className="section-heading mb-12">Career</h2>
        </FadeInSection>

        <div className="flex flex-col gap-6">
          {ROLES.map((role, i) => (
            <FadeInCard key={role.company} delay={i * 0.06} className={role.printExclude ? "print:hidden" : undefined}>
              <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 print:rounded-none print:border print:border-gray-300 print:shadow-none print:break-inside-avoid">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Image */}
                  {role.image && (
                    <div className="relative w-full md:w-48 lg:w-56 h-40 md:h-auto flex-shrink-0 overflow-hidden">
                      <Image
                        src={role.image}
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
                          src={role.logo}
                          alt={`${role.company} logo`}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-foreground leading-tight">{role.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          {role.url ? (
                            <a
                              href={role.url}
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
                      {role.bullets.map((b, j) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
