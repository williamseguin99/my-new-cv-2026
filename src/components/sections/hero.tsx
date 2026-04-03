"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";

const DownloadResumeButton = dynamic(
  () =>
    import("@/components/pdf/DownloadResumeButton").then(
      (m) => m.DownloadResumeButton
    ),
  { ssr: false }
);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.1 },
  },
};

const LANGUAGES = ["🇫🇷", "🇬🇧", "🇪🇸", "🇮🇹"];

export function Hero() {
  const { dict } = useLanguage();

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-contrast text-base section-padding pt-28 md:pt-32"
    >
      <div className="content-max w-full">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-16">
          {/* Text */}
          <motion.div
            className="flex-1 flex flex-col gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={item} className="section-label text-accent/80">
              {dict.hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-base leading-[1.05] tracking-tight"
            >
              {dict.hero.name_first}
              <br />
              <span className="text-accent">{dict.hero.name_last}</span>
            </motion.h1>

            <motion.blockquote
              variants={item}
              className="text-xl md:text-2xl font-normal text-base/80 leading-relaxed border-l-4 border-accent pl-5 italic max-w-xl"
            >
              &ldquo;{dict.hero.quote}&rdquo;
            </motion.blockquote>

            <motion.p
              variants={item}
              className="text-base/70 text-lg leading-relaxed max-w-xl"
            >
              {dict.hero.mission}
            </motion.p>

            <motion.div variants={item} className="flex items-center gap-3 flex-wrap">
              {LANGUAGES.map((flag) => (
                <span key={flag} className="text-2xl" aria-hidden="true">
                  {flag}
                </span>
              ))}
              <span className="text-sm text-base/60 ml-1">
                {dict.hero.languages_label}
              </span>
            </motion.div>

            <motion.div variants={item} className="flex gap-4 mt-2 flex-wrap items-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent text-contrast font-bold px-6 py-3 rounded-full hover:bg-accent/90 hover:scale-105 transition-all duration-200 text-sm uppercase tracking-wide"
              >
                {dict.hero.cta_contact}
              </a>
              <a
                href="#career"
                className="hidden md:inline-flex items-center gap-2 border border-base/30 text-base font-medium px-6 py-3 rounded-full hover:bg-base/10 hover:border-accent transition-all duration-200 text-sm uppercase tracking-wide"
              >
                {dict.hero.cta_work}
              </a>
              <DownloadResumeButton />
            </motion.div>
          </motion.div>

          {/* Headshot */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            animate="show"
            className="flex-shrink-0"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-accent shadow-2xl shadow-accent/20">
              <Image
                src="/images/William_headshot.jpg"
                alt={dict.hero.headshot_alt}
                fill
                sizes="(max-width: 768px) 224px, 288px"
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
