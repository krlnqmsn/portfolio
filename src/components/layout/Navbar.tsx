"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navigation, site, socials } from "@/data/portfolio";
import { useScrollLock } from "@/lib/hooks";
import { EASE_EXPO, sectionNumber, type SectionId } from "@/lib/site";
import { LiveTime, ThemeToggle } from "@/components/ui/Bits";
import { Logo } from "@/components/layout/Logo";
import { RollText } from "@/components/ui/Text";
import { useIntro } from "@/components/providers/Providers";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const { done } = useIntro();

  useScrollLock(open);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navigation.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const main = document.getElementById("main");
    const footer = document.getElementById("site-footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    return () => {
      window.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  return (
    <>
      <motion.header
        id="site-nav"
        className="fixed inset-x-0 top-0 z-50 bg-bg/75 backdrop-blur-md"
        initial={{ y: "-100%" }}
        animate={{ y: done ? "0%" : "-100%" }}
        transition={{ duration: 1, ease: EASE_EXPO, delay: 0.5 }}
      >
        <div className="frame">
          <nav
            aria-label="Primary"
            className="flex h-[var(--nav-h)] items-center justify-between border-b border-line"
          >
            <a href="#top" className="group cell flex items-center gap-3" aria-label={`${site.name} — back to top`}>
              <Logo className="text-[0.9375rem] text-fg" />
              <span className="label hidden text-muted sm:inline">{site.version}</span>
            </a>

            <div className="cell flex items-center gap-6 lg:gap-8">
              <ul className="hidden items-center gap-6 md:flex lg:gap-8">
                {navigation.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`group label flex items-center gap-1.5 transition-colors ${
                        active === id ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                      aria-current={active === id ? "true" : undefined}
                    >
                      <span
                        aria-hidden
                        className={`size-1.5 bg-fg transition-transform duration-500 ease-swift ${
                          active === id ? "scale-100" : "scale-0"
                        }`}
                      />
                      <RollText>{label}</RollText>
                    </a>
                  </li>
                ))}
              </ul>

              <ThemeToggle className="hidden md:flex" />

              <button
                type="button"
                className="group label -mr-3 px-3 py-3 md:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((o) => !o)}
              >
                [ <RollText>{open ? "Close" : "Menu"}</RollText> ]
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && <MobileMenu active={active} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ active, onClose }: { active: SectionId | null; onClose: () => void }) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-40 flex flex-col bg-bg pt-[var(--nav-h)] md:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="frame flex flex-1 flex-col">
        <ul className="flex-1 pt-4">
          {navigation.map(({ id, label }, i) => (
            <li key={id} className="overflow-hidden border-b border-line">
              <motion.a
                href={`#${id}`}
                onClick={onClose}
                className="cell flex items-baseline justify-between py-4"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.15 + i * 0.06 }}
              >
                <span className="display text-[clamp(2.75rem,14vw,5rem)] uppercase">{label}</span>
                <span className="label text-muted">
                  {active === id ? "● " : ""}
                  {sectionNumber(id)}
                </span>
              </motion.a>
            </li>
          ))}
        </ul>

        <motion.div
          className="grid grid-cols-2 gap-y-4 border-t border-line py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <div className="cell col-span-2">
            <a href={`mailto:${site.email}`} className="draw-line label">
              {site.email}
            </a>
          </div>
          <ul className="cell flex flex-col gap-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="draw-line label">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <div className="cell flex flex-col items-end justify-between gap-4 text-right">
            <ThemeToggle />
            <p className="label text-muted">
              {site.location.city}
              <br />
              <LiveTime timeZone={site.location.timeZone} /> {site.location.timeZoneLabel}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
