"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { hero, site } from "@/data/portfolio";
import { EASE_EXPO, pad } from "@/lib/site";
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
          <div className="cell grid flex-1 items-center gap-10 py-10 md:py-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 xl:col-span-6">
              <motion.p
                className="flex items-center gap-3"
                {...fade(0.6)}
              >
                <span className="font-display text-[clamp(0.8rem,1.5vw,1.05rem)] font-medium uppercase leading-snug tracking-[0.12em] text-fg">
                  {site.role}
                </span>
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

              <motion.div className="mt-8 flex flex-nowrap items-stretch gap-3 md:gap-x-5" {...fade(0.85)}>
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="group label inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap bg-fg px-4 py-3.5 text-bg md:flex-none md:gap-2 md:px-6 md:py-4"
                >
                  <RollText>View résumé</RollText> <span aria-hidden>↗</span>
                </button>
                <a
                  href="#contact"
                  className="group label inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap border border-fg/30 px-4 py-3.5 transition-colors hover:border-fg md:flex-none md:gap-2 md:px-6 md:py-4"
                >
                  <RollText>Contact</RollText> <span aria-hidden>→</span>
                </a>
              </motion.div>
            </div>

            {/* Portrait (2×2) + résumé card */}
            <motion.div
              className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:col-span-5 xl:col-span-5 xl:col-start-8"
              {...fade(0.9)}
            >
              <figure className="flex min-w-0 flex-col sm:-translate-y-14 lg:-translate-y-18">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-line bg-fg/5">
                  <Image
                    src={site.photo}
                    alt={`${site.name} — portrait`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 30vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </figure>

              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                aria-haspopup="dialog"
                aria-label="View résumé (PDF, 2 pages)"
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-line text-left transition-colors duration-500 hover:border-fg focus-visible:border-fg sm:translate-y-12 lg:translate-y-15"
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
              </button>
            </motion.div>
          </div>

          {/* Quick facts */}
          <motion.dl className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4" {...fade(0.95)}>
            {hero.facts.map((fact, i) => (
              <div
                key={fact.label}
                className="group cell relative flex flex-col gap-2 border-b border-line py-5 transition-colors duration-500 hover:bg-fg/[0.04] sm:border-r sm:py-6 sm:[&:nth-child(2n)]:border-r-0 sm:last:border-b-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-fg transition-transform duration-700 ease-expo group-hover:scale-x-100"
                />

                <div className="flex items-center justify-between gap-3">
                  <dt className="label flex items-center gap-2 text-muted">
                    <span aria-hidden className="inline-block size-1 shrink-0 rounded-full bg-fg/40 transition-colors duration-500 group-hover:bg-fg" />
                    {fact.label}
                  </dt>
                  <span aria-hidden className="label tabular-nums text-muted/50">
                    {pad(i + 1, 2)}
                  </span>
                </div>

                <dd className="font-display text-[0.95rem] font-medium leading-snug tracking-[-0.01em] text-fg md:text-lg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      <AnimatePresence>{resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}</AnimatePresence>
    </>
  );
}
