"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { EASE_EXPO } from "@/lib/site";

type TagName = "p" | "h1" | "h2" | "h3" | "div" | "span" | "li" | "ul" | "section";

/**
 * Text that rolls up and is replaced by a copy of itself on hover.
 * Triggers when this element OR the nearest `.group` ancestor is hovered.
 */
export function RollText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`roll ${className}`}>
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

const container: Variants = {
  hidden: {},
  show: ({ stagger, delay }: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_EXPO } },
};

/**
 * Splits text into words, each sliding up from behind a mask when the
 * block scrolls into view. Reads as a line-by-line reveal.
 */
export function MaskText({
  text,
  as = "p",
  className = "",
  stagger = 0.018,
  delay = 0,
  play,
}: {
  text: string;
  as?: TagName;
  className?: string;
  stagger?: number;
  delay?: number;
  /** Control the reveal manually instead of on scroll. */
  play?: boolean;
}) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" as const } }
      : { animate: play ? "show" : "hidden" };

  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      variants={container}
      custom={{ stagger, delay }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] indent-0 align-bottom">
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

/** A single line sliding up from a mask. */
export function MaskLine({
  children,
  className = "",
  delay = 0,
  play,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  play?: boolean;
}) {
  // Observe the (unclipped) mask, not the clipped line inside it —
  // IntersectionObserver treats a fully clipped element as off-screen.
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" as const } }
      : { animate: play ? "show" : "hidden" };
  return (
    <motion.span className={`block overflow-hidden ${className}`} initial="hidden" {...trigger}>
      <motion.span
        className="block"
        variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
        transition={{ duration: 1.1, ease: EASE_EXPO, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Fade + rise for blocks of content. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: TagName;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE_EXPO, delay }}
    >
      {children}
    </Tag>
  );
}
