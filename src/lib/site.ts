import { navigation } from "@/data/portfolio";

export type SectionId = (typeof navigation)[number]["id"];

/** "(01)", "(02)", … based on the order in `navigation`. */
export function sectionNumber(id: SectionId) {
  const i = navigation.findIndex((n) => n.id === id);
  return `(${String(i + 1).padStart(2, "0")})`;
}

export function sectionLabel(id: SectionId) {
  return navigation.find((n) => n.id === id)?.label ?? id;
}

export const pad = (n: number, len = 2) => String(n).padStart(len, "0");

/** Shared easing curves for Framer Motion. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SWIFT = [0.7, 0, 0.2, 1] as const;
