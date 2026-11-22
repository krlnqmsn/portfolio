"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import type { Project } from "@/data/portfolio";
import { EASE_EXPO, pad } from "@/lib/site";
import { TechChips } from "./TechChips";

const AUTOPLAY_MS = 1800;
const SCROLL_SECONDS_PER_FEATURE = 3.4;

function external(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function readable(url: string) {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

/**
 * The headline build of the page: cover + screens first, then the
 * story with its auto-scrolling feature list, then stack and actions.
 */
export function FeaturedProject({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const slides = (project.images ?? []).filter(
    (src, i, all) => src && all.indexOf(src) === i,
  );
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /** Aspect ratio of the cover, so both frames can follow it. */
  const [ratio, setRatio] = useState(16 / 10);
  const reduceMotion = useReducedMotion();

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + count) % count),
    [count],
  );

  // Measure the cover first, so the image is never cropped and the
  // carousel above/beside it adopts the same proportions.
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setRatio(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = project.image;
    return () => {
      img.onload = null;
    };
  }, [project.image]);

  // Autoplay, paused on hover/focus and off for reduced-motion users.
  useEffect(() => {
    if (paused || reduceMotion || count < 2) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, count]);

  const website = project.websiteLink?.trim();
  const features = project.features ?? [];

  return (
    <div className="border-t border-line pb-14 md:pb-20">
      <div className="cell flex flex-col gap-2 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div className="w-full sm:w-auto">
          <p className="display text-[clamp(1.5rem,2.6vw,2.25rem)] uppercase leading-[0.94]">
            Capstone / Thesis project
          </p>
          <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">
            My college capstone — a full platform for tattoo artists and their
            clients, designed, built and defended end to end as the thesis
            project.
          </p>
        </div>
        <p className="label shrink-0 text-muted">{pad(count)} screens</p>
      </div>

      {/* Row 1 — cover + screens */}
      <div className="cell grid gap-6 py-8 md:grid-cols-12 md:items-stretch md:gap-10 md:py-12">
        <div className="md:col-span-6">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="group block w-full text-left"
          >
            <div
              className="relative w-full overflow-hidden rounded-lg"
              style={{ aspectRatio: ratio }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-contain transition-transform duration-700 ease-expo group-hover:scale-[1.01]"
              />
            </div>
          </button>
        </div>

        <div className="md:col-span-6">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={`${project.title} screens`}
            tabIndex={0}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            className="relative isolate overflow-hidden rounded-lg border border-line focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-fg"
          >
            <div className="relative" style={{ aspectRatio: ratio }}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={slides[index]}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE_EXPO }}
                >
                  <Image
                    src={slides[index]}
                    alt={`${project.title} — screen ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-bg/70 to-transparent p-3 sm:p-4">
                <p className="label rounded-full bg-bg/85 px-2.5 py-1 backdrop-blur-sm">
                  {pad(index + 1)} / {pad(count)}
                </p>
                <div className="pointer-events-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous screen"
                    className="grid size-11 place-items-center rounded-full border border-line bg-bg/85 text-base backdrop-blur-sm transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next screen"
                    className="grid size-11 place-items-center rounded-full bg-fg text-base text-bg shadow-sm transition-opacity duration-300 hover:opacity-80"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 — title/description + features */}
      <div className="cell grid gap-8 border-t border-line py-8 md:grid-cols-12 md:gap-10 md:py-12">
        <div className="md:col-span-5">
          <h3 className="display text-[clamp(1.5rem,2.4vw,2.15rem)] leading-[1.02]">
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              className="text-left transition-opacity duration-300 hover:opacity-70"
            >
              {project.title}
            </button>
          </h3>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
            {project.description}
          </p>

          {website && (
            <a
              href={external(website)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-fit max-w-full items-center gap-2 font-sans text-base font-medium underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-current"
            >
              <span className="truncate">{readable(website)}</span>
              <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>

        <div className="md:col-span-7">
          <p className="label mb-3 text-muted">
            ({pad(features.length)} features · auto-scrolling)
          </p>
          <div className="max-h-[24rem] overflow-hidden border-t border-line md:max-h-[26rem] [mask-image:linear-gradient(to_bottom,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)]">
            <ul
              className="features-track"
              style={
                {
                  "--features-duration": `${features.length * SCROLL_SECONDS_PER_FEATURE}s`,
                } as CSSProperties
              }
            >
              {[...features, ...features].map((f, i) => (
                <li
                  key={`${f.feature}-${i}`}
                  aria-hidden={i >= features.length || undefined}
                  className="border-b border-line py-4"
                >
                  <h4 className="font-sans text-base font-semibold leading-snug">
                    {f.feature}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {f.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Row 3 — stack, link, action */}
      <div className="cell flex flex-col gap-5 border-t border-line py-6 md:flex-row md:items-center md:justify-between md:gap-8">
        <TechChips items={project.tech} />

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="label inline-flex w-fit items-center gap-3 bg-fg px-5 py-3 text-bg transition-opacity duration-300 hover:opacity-80"
          >
            View project
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
