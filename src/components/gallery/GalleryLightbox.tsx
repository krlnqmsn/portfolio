"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gallery } from "@/data/portfolio";
import { useScrollLock } from "@/lib/hooks";
import { EASE_EXPO, pad } from "@/lib/site";
import { RollText } from "@/components/ui/Text";

const BACKGROUND_IDS = ["main", "site-nav", "site-footer"];

export function GalleryLightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const image = gallery[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = gallery.length;
  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;

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
      if (e.key === "ArrowRight") onNavigate(next);
      if (e.key === "ArrowLeft") onNavigate(prev);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate, next, prev]);

  return createPortal(
    <motion.div className="fixed inset-0 z-[60] flex flex-col" initial="closed" animate="open" exit="closed">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-bg/95 backdrop-blur-md"
        variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Image preview ${index + 1} of ${total}`}
        className="relative z-10 flex min-h-0 flex-1 flex-col"
        variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-6">
          <p className="label">
            {pad(index + 1)} <span className="text-muted">/ {pad(total)}</span>
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="group label"
          >
            [ <RollText>Close</RollText> ✕ ]
          </button>
        </div>

        <div role="presentation" className="relative min-h-0 flex-1" onClick={onClose}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.3, ease: EASE_EXPO }}
              className="absolute inset-2 md:inset-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 md:px-6">
          <button type="button" onClick={() => onNavigate(prev)} className="group label flex items-center gap-2">
            <span aria-hidden>←</span> <RollText>Prev</RollText>
          </button>
          <p className="label text-muted">
            {image.width} × {image.height}
          </p>
          <button type="button" onClick={() => onNavigate(next)} className="group label flex items-center gap-2">
            <RollText>Next</RollText> <span aria-hidden>→</span>
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
