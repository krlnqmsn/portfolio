"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/portfolio";
import { useScrollLock } from "@/lib/hooks";
import { pad } from "@/lib/site";
import { useIntro } from "@/components/providers/Providers";

export const INTRO_KEY = "intro-seen";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Page-load intro: counts 000 → 100, then lifts like a curtain.
 * Shown once per browser session; skipped entirely for reduced motion
 * (the inline script in layout.tsx hides it before first paint).
 */
export function Preloader() {
  const { finish } = useIntro();
  const [visible, setVisible] = useState(true);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useScrollLock(visible);

  useEffect(() => {
    let skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      skip ||= sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}

    if (skip) {
      const id = requestAnimationFrame(() => {
        setVisible(false);
        finish();
      });
      return () => cancelAnimationFrame(id);
    }

    let timeout: number | undefined;
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (countRef.current) countRef.current.textContent = pad(Math.round(v), 3);
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => {
        timeout = window.setTimeout(() => {
          try {
            sessionStorage.setItem(INTRO_KEY, "1");
          } catch {}
          setVisible(false);
          finish();
        }, 250);
      },
    });

    return () => {
      controls.stop();
      window.clearTimeout(timeout);
    };
  }, [finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[80] flex flex-col bg-bg text-fg"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading"
        >
          {/* Top rail: identity + build tag */}
          <div className="frame">
            <div className="flex items-center justify-between gap-4 border-b border-line py-4">
              <span className="label flex items-center gap-2">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-fg/60" />
                  <span className="relative size-1.5 rounded-full bg-fg" />
                </span>
                {site.name}
              </span>
              <span className="label hidden truncate text-muted md:block">{site.role}</span>
              <span className="label tabular-nums text-muted">{site.version}</span>
            </div>
          </div>

          {/* Centre: name reveal + counter */}
          <div className="frame flex flex-1 flex-col justify-center">
            <p className="label flex items-center gap-2 text-muted">
              Loading portfolio<span className="blink text-fg">_</span>
            </p>

            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
              <h1 className="display flex flex-col text-[clamp(2.25rem,9.5vw,8.5rem)] uppercase leading-[0.82]">
                {site.heroLines.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="block"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, ease: EASE, delay: 0.08 + i * 0.09 }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                className="display shrink-0 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.8] tabular-nums text-muted"
              >
                <span ref={countRef}>000</span>
                <span className="text-[0.35em] align-super">%</span>
              </motion.span>
            </div>
          </div>

          {/* Bottom: progress + meta */}
          <div className="frame pb-5">
            <div className="h-px w-full overflow-hidden bg-line">
              <div
                ref={barRef}
                className="h-px origin-left bg-fg"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="label truncate text-muted">{site.location.city}</span>
              <span className="label shrink-0 tabular-nums text-muted">
                {site.location.timeZoneLabel}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
