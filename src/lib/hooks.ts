"use client";

import { useEffect, useLayoutEffect, useMemo, useState, useSyncExternalStore, type RefObject } from "react";

/* ── Live clock ────────────────────────────────────────────── */

const subscribeSecond = (cb: () => void) => {
  const id = window.setInterval(cb, 1000);
  return () => window.clearInterval(id);
};
const getSecond = () => Math.floor(Date.now() / 1000);
const getServerSecond = () => null;

/** Current time (in whole seconds), or `null` during SSR / before hydration. */
export function useNowSeconds() {
  return useSyncExternalStore(subscribeSecond, getSecond, getServerSecond);
}

/** Formatted live time in a given IANA time zone, e.g. "14:32:07". */
export function useLocalTime(timeZone: string, withSeconds = true) {
  const now = useNowSeconds();
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: withSeconds ? "2-digit" : undefined,
        hour12: false,
      }),
    [timeZone, withSeconds],
  );
  if (now === null) return withSeconds ? "--:--:--" : "--:--";
  return formatter.format(now * 1000);
}

export function useYear() {
  const now = useNowSeconds();
  return now === null ? null : new Date(now * 1000).getFullYear();
}

/* ── Theme ─────────────────────────────────────────────────── */

export type Theme = "dark" | "light";
export const THEME_KEY = "theme";

/** Same logic as the inline script in layout.tsx. Dark unless the visitor chose light. */
export function resolveTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {}
  return "dark";
}

const subscribeTheme = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const getTheme = () => (document.documentElement.getAttribute("data-theme") as Theme) ?? "dark";
const getServerTheme = () => null;

export function useTheme() {
  return useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
}

/* ── Scroll lock (ref-counted so overlays can stack) ───────── */

let lockCount = 0;
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockCount++;
    document.documentElement.style.overflow = "hidden";
    return () => {
      lockCount--;
      if (lockCount === 0) document.documentElement.style.overflow = "";
    };
  }, [active]);
}

/* ── Media query ───────────────────────────────────────────── */

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/* ── Fit text to container width ───────────────────────────────
 * Scales the container's font-size so its widest `[data-fit]`
 * child exactly fills the available width.
 */
export function useFitText(ref: RefObject<HTMLElement | null>) {
  const [fontSize, setFontSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastWidth = -1;

    const measure = () => {
      const cs = getComputedStyle(el);
      const width = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (width === lastWidth) return;
      lastWidth = width;
      const items = el.querySelectorAll<HTMLElement>("[data-fit]");
      let widest = 0;
      items.forEach((item) => {
        widest = Math.max(widest, item.offsetWidth);
      });
      if (!widest) return;
      const current = parseFloat(cs.fontSize);
      const next = Math.floor(current * (width / widest) * 100) / 100;
      el.style.fontSize = `${next}px`;
      setFontSize(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(() => {
      lastWidth = -1;
      measure();
    });
    return () => ro.disconnect();
  }, [ref]);

  return fontSize;
}
