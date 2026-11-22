"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/portfolio";
import { useScrollLock } from "@/lib/hooks";
import { RollText } from "@/components/ui/Text";

const BACKGROUND_IDS = ["main", "site-nav", "site-footer"];

/**
 * Full-screen résumé viewer. The page image is shown inline so it reads
 * the same on every device; the PDF is available to open or download.
 */
export function ResumeModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(true);

  // Make the rest of the page inert, move focus in, and restore it on close.
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        className="absolute inset-x-0 bottom-0 top-0 overflow-y-auto overscroll-contain border-t border-line bg-bg md:top-[3vh]"
        variants={{ closed: { y: "100%" }, open: { y: "0%" } }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="frame">
          {/* Sticky control bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg/85 py-3 backdrop-blur-md">
            <p id="resume-title" className="label cell">
              Résumé — <span className="text-muted">{site.name}</span>
            </p>
            <div className="cell flex items-center gap-5">
              <a
                href={site.resume.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group label hidden sm:inline-flex"
              >
                <RollText>Open PDF</RollText> ↗
              </a>
              <a href={site.resume.pdf} download className="group label hidden sm:inline-flex">
                <RollText>Download</RollText> ↓
              </a>
              <button ref={closeRef} type="button" className="group label" onClick={onClose} aria-label="Close résumé">
                [ <RollText>Close</RollText> ✕ ]
              </button>
            </div>
          </div>

          <div className="cell py-6 md:py-10">
            <div className="mx-auto w-full max-w-[860px] border border-line">
              <Image
                src={site.resume.preview}
                alt={`Résumé of ${site.name}`}
                width={1241}
                height={1755}
                sizes="(min-width: 860px) 860px, 92vw"
                className="h-auto w-full"
              />
            </div>
            <p className="label mx-auto mt-4 flex max-w-[860px] flex-wrap items-center justify-between gap-2 text-muted">
              <span>PDF · 2 pages</span>
              <a href={site.resume.pdf} download className="draw-line">
                Download the PDF ↓
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
