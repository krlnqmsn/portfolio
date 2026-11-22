"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { hero, site } from "@/data/portfolio";
import { EASE_EXPO } from "@/lib/site";
import { useIntro } from "@/components/providers/Providers";
import { LiveTime, StatusDot } from "@/components/ui/Bits";
import { MaskLine, RollText } from "@/components/ui/Text";
import { ResumeModal } from "@/components/resume/ResumeModal";

export function Hero() {
  const { done } = useIntro();
  const [resumeOpen, setResumeOpen] = useState(false);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    transition: { duration: 0.9, ease: EASE_EXPO, delay },
  });

  return (
    <>
      <section
        id="top"
        aria-label="Introduction"
        className="relative flex min-h-svh flex-col pt-[var(--nav-h)]"
      >
        <div aria-hidden className="hero-glow" />
        <div className="frame flex flex-1 flex-col">
          {/* Status row */}
          <motion.div className="cell flex items-center justify-between gap-4 py-4" {...fade(0.55)}>
            <p className="label flex items-center gap-2">
              {site.availability.available && <StatusDot />}
              {site.availability.label}
            </p>
            <p className="label text-right text-muted">
              {site.location.city} · <LiveTime timeZone={site.location.timeZone} seconds={false} />
            </p>
          </motion.div>

          {/* Name, intro and actions beside the portrait + résumé */}
          <div className="cell grid flex-1 items-center gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 xl:col-span-6">
              <motion.p className="label text-muted" {...fade(0.6)}>
                {site.role}
              </motion.p>

              <h1 aria-label={site.name} className="display mt-4 text-[clamp(2.75rem,6vw,5.5rem)] uppercase leading-[0.9]">
                {site.heroLines.map((line, i) => (
                  <MaskLine key={line} play={done} delay={0.1 + i * 0.12} className="pb-[0.02em]">
                    {line}
                  </MaskLine>
                ))}
              </h1>

              <motion.p
                className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg"
                {...fade(0.75)}
              >
                {hero.intro}
              </motion.p>

              <motion.div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" {...fade(0.85)}>
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="group label inline-flex items-center justify-center gap-2 bg-fg px-6 py-4 text-bg"
                >
                  <RollText>View résumé</RollText> <span aria-hidden>↗</span>
                </button>
                <a
                  href={site.resume.pdf}
                  download
                  className="group label inline-flex items-center justify-center gap-2 border border-fg/30 px-6 py-4 transition-colors hover:border-fg"
                >
                  <RollText>Download PDF</RollText> <span aria-hidden>↓</span>
                </a>
                <a href="#contact" className="group label draw-line inline-flex items-center gap-2 py-4">
                  <RollText>Get in touch</RollText> <span aria-hidden>→</span>
                </a>
              </motion.div>
            </div>

            {/* Portrait (2×2) + résumé card */}
            <motion.div
              className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:col-span-5 xl:col-span-5 xl:col-start-8"
              {...fade(0.9)}
            >
              <figure className="flex min-w-0 flex-col">
                <div className="relative aspect-square w-full overflow-hidden border border-line bg-fg/5">
                  <Image
                    src={site.photo}
                    alt={`${site.name} — portrait`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 30vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="label mt-3 text-muted">
                  Alabang
                  <br />
                  Muntinlupa City
                </figcaption>
              </figure>

              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                aria-haspopup="dialog"
                className="group flex min-w-0 flex-col border border-line text-left transition-colors duration-500 hover:border-fg focus-visible:border-fg"
              >
                <div className="relative min-h-[9rem] flex-1 overflow-hidden bg-fg/5">
                  <Image
                    src={site.resume.preview}
                    alt="First page of the résumé"
                    fill
                    sizes="(min-width: 1024px) 15vw, 45vw"
                    className="object-cover object-top opacity-90 transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
                  />
                </div>
                <span className="flex items-end justify-between gap-2 border-t border-line py-3 pl-3 pr-4">
                  <span>
                    <span className="label block text-muted">Résumé</span>
                    <span className="label block">PDF · 2 pages</span>
                  </span>
                  <span aria-hidden className="text-lg leading-none transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
              </button>
            </motion.div>
          </div>

          {/* Quick facts */}
          <motion.dl className="grid border-t border-line sm:grid-cols-3" {...fade(0.95)}>
            {hero.facts.map((fact) => (
              <div
                key={fact.label}
                className="cell flex flex-col gap-1 border-b border-line py-4 sm:border-b-0 sm:border-r sm:py-5 sm:last:border-r-0"
              >
                <dt className="label text-muted">{fact.label}</dt>
                <dd className="text-sm leading-snug md:text-base">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      <AnimatePresence>{resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}</AnimatePresence>
    </>
  );
}
