"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { THEME_KEY, useLocalTime, useTheme, type Theme } from "@/lib/hooks";
import { iconPaths, type IconName } from "@/lib/icons";
import type { StackItem } from "@/data/portfolio";
import { EASE_EXPO, sectionLabel, sectionNumber, type SectionId } from "@/lib/site";
import { MaskLine, RollText } from "./Text";

/* ── Section header: "(02) — Work" label row + optional giant title ── */

export function SectionHeader({
  id,
  title,
  meta,
  labelAs,
  titleSize = "default",
}: {
  id: SectionId;
  title?: string;
  meta?: string;
  /** Defaults to h2 when there is no big title. */
  labelAs?: "h2" | "p";
  /** "compact" keeps the title small for short, secondary sections. */
  titleSize?: "default" | "compact";
}) {
  const LabelTag = labelAs ?? (title ? "p" : "h2");
  return (
    <div className="border-t border-line pt-12 md:pt-20">
      <div className="cell flex items-baseline justify-between gap-4">
        <LabelTag className="label">
          {sectionNumber(id)} — {sectionLabel(id)}
        </LabelTag>
        {meta && <p className="label text-right text-muted">{meta}</p>}
      </div>
      {title && (
        <h2
          className={`display cell uppercase ${
            titleSize === "compact"
              ? "pb-5 pt-3 text-[clamp(1.5rem,3.4vw,2.75rem)] md:pb-7"
              : "pb-8 pt-4 text-[clamp(2.75rem,9vw,9rem)] md:pb-12"
          }`}
        >
          <MaskLine className="pb-[0.04em]">{title}</MaskLine>
        </h2>
      )}
    </div>
  );
}

/* ── Marquee / ticker strip ── */

export function Marquee({
  items,
  variant = "solid",
  reverse = false,
  duration = 45,
}: {
  items: readonly StackItem[];
  variant?: "solid" | "outline";
  reverse?: boolean;
  duration?: number;
}) {
  const solid = variant === "solid";
  const sequence = [...items, ...items];
  const group = (
    <div className="flex shrink-0 items-center">
      {sequence.map((item, i) => (
        <span key={i} className="mr-[0.7em] flex items-center gap-[0.32em] last:mr-0">
          {item.icon && <MarqueeIcon name={item.icon} tone={solid ? "inherit" : "fg"} />}
          <span className={solid ? "" : "outline-text"}>{item.label}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className={`relative z-[1] overflow-hidden border-y border-line select-none ${
        solid ? "bg-fg text-bg" : "text-fg"
      }`}
    >
      <div
        className={`marquee-track display whitespace-nowrap uppercase leading-none ${
          solid ? "py-3 text-[clamp(1.75rem,5vw,5rem)] md:py-4" : "py-5 text-[clamp(3rem,10vw,10rem)]"
        }`}
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        {group}
        {group}
      </div>
    </div>
  );
}

/** Brand mark inside the ticker; sized relative to the marquee type. */
function MarqueeIcon({ name, tone }: { name: IconName; tone: "inherit" | "fg" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`size-[0.6em] shrink-0 ${tone === "fg" ? "text-fg" : ""}`}
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

/* ── Number that counts up when scrolled into view ── */

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const format = (n: number) => `${Math.round(n).toLocaleString("en-US")}${suffix}`;

  useEffect(() => {
    if (reduce || !ref.current || inView) return;
    ref.current.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: EASE_EXPO,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return <span ref={ref}>{format(value)}</span>;
}

/* ── Blinking availability dot ── */

export function StatusDot() {
  return (
    <span aria-hidden className="relative inline-flex size-2 shrink-0">
      <span className="absolute inset-0 rounded-full border border-fg" />
      <span className="blink absolute inset-[1px] rounded-full bg-fg" />
    </span>
  );
}

/* ── Live clock ── */

export function LiveTime({ timeZone, seconds = true }: { timeZone: string; seconds?: boolean }) {
  const time = useLocalTime(timeZone, seconds);
  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {time}
    </time>
  );
}

/* ── Theme toggle with circular reveal ── */

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    const apply = () => {
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return apply();

    if (typeof document.startViewTransition === "function") {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.detail === 0 ? rect.left + rect.width / 2 : e.clientX;
      const y = e.detail === 0 ? rect.top + rect.height / 2 : e.clientY;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const transition = document.startViewTransition(apply);
      transition.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            { duration: 800, easing: "cubic-bezier(0.7, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
          );
        })
        .catch(() => {});
      return;
    }

    root.classList.add("theme-fade");
    apply();
    window.setTimeout(() => root.classList.remove("theme-fade"), 650);
  };

  const label = theme === null ? "Theme" : theme === "dark" ? "Dark" : "Light";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`group label flex items-center gap-2 ${className}`}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      <span
        aria-hidden
        className={`relative size-3 overflow-hidden rounded-full border border-current transition-transform duration-700 ease-swift ${
          theme === "light" ? "rotate-180" : ""
        }`}
      >
        <span className="absolute inset-y-0 left-1/2 right-0 bg-current" />
      </span>
      <span aria-hidden>[</span>
      <RollText>{label}</RollText>
      <span aria-hidden>]</span>
    </button>
  );
}
