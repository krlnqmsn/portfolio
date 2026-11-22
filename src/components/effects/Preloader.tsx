"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/portfolio";
import { useScrollLock } from "@/lib/hooks";
import { pad } from "@/lib/site";
import { useIntro } from "@/components/providers/Providers";

export const INTRO_KEY = "intro-seen";

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
          className="preloader fixed inset-0 z-[80] flex flex-col justify-between bg-fg text-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading"
        >
          <div className="frame flex items-start justify-between pt-5">
            <span className="label">{site.name}</span>
            <span className="label hidden md:inline">{site.role}</span>
            <span className="label">{site.version}</span>
          </div>

          <div className="frame pb-5" aria-hidden>
            <div className="flex flex-col-reverse items-start justify-between gap-4 md:flex-row md:items-end md:gap-6">
              <span className="label md:pb-[2vw]">
                Loading portfolio<span className="blink">_</span>
              </span>
              <span
                ref={countRef}
                className="display self-end text-[40vw] leading-[0.78] tabular-nums md:self-auto md:text-[19vw]"
              >
                000
              </span>
            </div>
            <div className="mt-5 h-px w-full bg-bg/20">
              <div ref={barRef} className="h-full origin-left bg-bg" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
