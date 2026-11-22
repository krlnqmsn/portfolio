"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/data/portfolio";
import { useScrollLock } from "@/lib/hooks";
import { EASE_EXPO, pad } from "@/lib/site";
import { MaskLine, RollText } from "@/components/ui/Text";
import { TechChips } from "./TechChips";

const BACKGROUND_IDS = ["main", "site-nav", "site-footer"];

function external(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function readable(url: string) {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

/**
 * The capstone gets its own detail sheet: cover, every screen, and the
 * full feature list, since it carries far more material than a card.
 */
export function CapstoneModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const screens = project.images ?? [];
  const features = project.features ?? [];
  const website = project.websiteLink?.trim();

  useScrollLock(true);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    BACKGROUND_IDS.forEach((id) => document.getElementById(id)?.setAttribute("inert", ""));
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      BACKGROUND_IDS.forEach((id) => document.getElementById(id)?.removeAttribute("inert"));
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <motion.div className="fixed inset-0 z-[60]" initial="closed" animate="open" exit="closed">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
        variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="capstone-title"
        className="absolute inset-x-0 bottom-0 top-0 overflow-y-auto overscroll-contain border-t border-line bg-bg md:top-[3vh]"
        variants={{ closed: { y: "100%" }, open: { y: "0%" } }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="frame min-h-full">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg/85 py-3 backdrop-blur-md">
            <p className="label cell">
              Capstone / thesis project —{" "}
              <span className="text-muted">Project detail</span>
            </p>
            <div className="cell">
              <button
                ref={closeRef}
                type="button"
                className="group label"
                onClick={onClose}
                aria-label="Close project"
              >
                [ <RollText>Close</RollText> ✕ ]
              </button>
            </div>
          </div>

          <header className="cell pb-8 pt-10 md:pb-12 md:pt-14">
            <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-10">
              <div className="md:col-span-6">
                <p className="label mb-4 text-muted">
                  {pad(screens.length)} screens · {pad(features.length)} features
                </p>
                <h2
                  id="capstone-title"
                  className="display text-[clamp(1.35rem,2.4vw,2.25rem)] leading-[1.02]"
                >
                  <MaskLine delay={0.3} className="pb-[0.04em]">
                    {project.title}
                  </MaskLine>
                </h2>
                <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
                  {project.description}
                </p>

                <TechChips items={project.tech} className="mt-6" />

                {website && (
                  <a
                    href={external(website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-fit max-w-full items-center gap-2 text-base font-medium underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-current"
                  >
                    <span className="truncate">{readable(website)}</span>
                    <span aria-hidden>↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>

              <div className="md:col-span-6">
                <div className="relative aspect-[20/13] w-full overflow-hidden rounded-lg bg-fg/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Features */}
          <section className="cell border-t border-line py-10 md:py-14">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h3 className="display text-[clamp(1.25rem,2.2vw,1.75rem)] uppercase leading-none">
                Features
              </h3>
              <p className="label text-muted">{pad(features.length)} built</p>
            </div>
            <ul className="grid gap-x-10 gap-y-0 md:grid-cols-2">
              {features.map((f, i) => (
                <li key={f.feature} className="border-t border-line py-5">
                  <p className="label mb-2 text-muted">({pad(i + 1)})</p>
                  <h4 className="font-sans text-base font-semibold leading-snug md:text-lg">
                    {f.feature}
                  </h4>
                  <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted md:text-base">
                    {f.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Screens — every screenshot, no cropping of the set */}
          <section className="cell border-t border-line py-10 md:py-14">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h3 className="display text-[clamp(1.25rem,2.2vw,1.75rem)] uppercase leading-none">
                Screens
              </h3>
              <p className="label text-muted">{pad(screens.length)} total</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {screens.map((src, i) => (
                <li
                  key={src}
                  className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-fg/5"
                >
                  <Image
                    src={src}
                    alt={`${project.title} — screen ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
                  />
                  <span className="label absolute bottom-2 left-2 rounded-full bg-bg/85 px-2 py-0.5 backdrop-blur-sm">
                    {pad(i + 1)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="cell flex items-center justify-between border-t border-line py-8">
            <p className="label text-muted">End of project detail</p>
            <button
              type="button"
              onClick={onClose}
              className="label inline-flex items-center gap-3 bg-fg px-5 py-3 text-bg transition-opacity duration-300 hover:opacity-80"
            >
              Close
              <span aria-hidden>✕</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
