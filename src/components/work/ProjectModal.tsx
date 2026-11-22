"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { project3rdBatch, type Project } from "@/data/portfolio";
import { useScrollLock } from "@/lib/hooks";
import { EASE_EXPO, pad, sectionNumber } from "@/lib/site";
import { MaskLine, RollText } from "@/components/ui/Text";
import { ProjectThumb } from "./ProjectThumb";
import { TechChips } from "./TechChips";

const BACKGROUND_IDS = ["main", "site-nav", "site-footer"];

function external(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function readable(url: string) {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

/** Split the write-up into blocks, treating "Heading:" lines as labels. */
function infoBlocks(text: string) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const [first, ...rest] = block.split("\n");
      const heading = first.trim();
      if (rest.length > 0 && heading.endsWith(":")) {
        return { heading: heading.slice(0, -1), body: rest.join(" ").trim() };
      }
      return { heading: null, body: block.replace(/\n+/g, " ").trim() };
    });
}

export function ProjectModal({
  index,
  projects = project3rdBatch,
  onClose,
  onNavigate,
}: {
  index: number;
  projects?: Project[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const project = projects[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const total = projects.length;
  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;
  const blocks = infoBlocks(project.information ?? "");
  const single = total < 2;

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
      if (single) return;
      if (e.key === "ArrowRight") onNavigate(next);
      if (e.key === "ArrowLeft") onNavigate(prev);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate, next, prev, single]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [index]);

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
        aria-labelledby="project-title"
        className="absolute inset-x-0 bottom-0 top-0 overflow-y-auto overscroll-contain border-t border-line bg-bg md:top-[3vh]"
        variants={{ closed: { y: "100%" }, open: { y: "0%" } }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="frame min-h-full">
          <div className="min-h-full">
            {/* Sticky control bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg/85 py-3 backdrop-blur-md">
              <p className="label cell">
                {sectionNumber("projects")}.{pad(index + 1)} —{" "}
                <span className="text-muted">Project detail</span>
              </p>
              <div className="cell flex items-center gap-5">
                {!single && (
                  <>
                    <button type="button" className="group label hidden sm:inline-flex" onClick={() => onNavigate(prev)}>
                      ← <RollText>Prev</RollText>
                    </button>
                    <button type="button" className="group label hidden sm:inline-flex" onClick={() => onNavigate(next)}>
                      <RollText>Next</RollText> →
                    </button>
                  </>
                )}
                <button ref={closeRef} type="button" className="group label" onClick={onClose} aria-label="Close project">
                  [ <RollText>Close</RollText> ✕ ]
                </button>
              </div>
            </div>

            <motion.article
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <header className="cell pb-8 pt-10 md:pb-12 md:pt-16">
                <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-10">
                  <div className="md:col-span-6">
                    <p className="label mb-4 text-muted">
                      {single ? "Featured project" : `${pad(index + 1)} / ${pad(total)}`}
                    </p>
                    <h2
                      id="project-title"
                      className="display text-[clamp(1.75rem,3.4vw,3.25rem)] uppercase leading-[0.98]"
                    >
                      <MaskLine key={project.id} delay={0.35} className="pb-[0.04em]">
                        {project.title}
                      </MaskLine>
                    </h2>
                    <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
                      {project.description}
                    </p>

                    <TechChips items={project.tech} className="mt-6" />

                    {(project.websiteLink?.trim() || project.businessPage?.trim()) && (
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                    {project.websiteLink?.trim() && (
                      <a
                        href={external(project.websiteLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit max-w-full items-center gap-2 text-base font-medium underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-current"
                      >
                        <span className="truncate">{readable(project.websiteLink)}</span>
                        <span aria-hidden>↗</span>
                      </a>
                    )}
                    {project.businessPage?.trim() && (
                      <a
                        href={external(project.businessPage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 text-base font-medium underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-current"
                      >
                        View business Facebook page
                        <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                )}
                  </div>

                  <div className="md:col-span-6">
                    <ProjectThumb
                      project={project}
                      fit="contain"
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="aspect-[20/13] border border-line"
                    />
                  </div>
                </div>
              </header>

              {blocks.length > 0 && (
                <div className="cell border-t border-line py-10 md:py-14">
                  <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                    <p className="label text-muted md:col-span-3">(Information)</p>
                    <div className="md:col-span-9 lg:col-span-8">
                      {blocks.map((block, i) => (
                        <div key={i} className={i > 0 ? "mt-7 border-t border-line pt-5" : ""}>
                          <p className="label mb-2 text-muted">({pad(i + 1)})</p>
                          {block.heading && <h3 className="label mb-2">{block.heading}</h3>}
                          <p className="max-w-[68ch] text-base leading-relaxed text-muted md:text-lg">{block.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {project.images && project.images.length > 0 && (
                <div className="cell border-t border-line py-10 md:py-14">
                  <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                    <p className="label text-muted md:col-span-3">
                      ({pad(project.images.length)} screens)
                    </p>
                    <ul className="grid gap-4 sm:grid-cols-2 md:col-span-9 md:gap-5 lg:col-span-8">
                      {project.images.map((src, i) => (
                        <li
                          key={src}
                          className="relative aspect-[16/10] overflow-hidden rounded-lg bg-fg/5"
                        >
                          <Image
                            src={src}
                            alt={`${project.title} — screen ${i + 1}`}
                            fill
                            sizes="(min-width: 768px) 40vw, 100vw"
                            className="object-cover transition-transform duration-700 ease-expo hover:scale-[1.03]"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {project.features && project.features.length > 0 && (
                <div className="cell border-t border-line py-10 md:py-14">
                  <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                    <p className="label text-muted md:col-span-3">
                      ({pad(project.features.length)} features)
                    </p>
                    <ul className="grid gap-x-10 gap-y-6 md:col-span-9 md:grid-cols-2 lg:col-span-8">
                      {project.features.map((f) => (
                        <li key={f.feature} className="border-t border-line pt-4">
                          <p className="label mb-2 text-muted">
                            ({pad(project.features!.indexOf(f) + 1)})
                          </p>
                          <h3 className="font-sans text-base font-semibold">{f.feature}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                            {f.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {!single && (
              <button
                type="button"
                onClick={() => onNavigate(next)}
                className="group cell flex w-full items-center justify-between gap-4 border-t border-line py-8 text-left md:py-12"
              >
                <span className="flex min-w-0 items-center gap-4 sm:gap-6">
                  <ProjectThumb
                    project={projects[next]}
                    sizes="160px"
                    className="aspect-[16/10] w-20 shrink-0 border border-line sm:w-32 md:w-40"
                  />
                  <span className="min-w-0">
                    <span className="label block text-muted">
                      Next project — {pad(next + 1)}
                    </span>
                    <span className="display mt-2 block text-[clamp(1.5rem,4.5vw,4rem)] uppercase leading-[0.95]">
                      <RollText>{projects[next].title}</RollText>
                    </span>
                  </span>
                </span>
                <motion.span
                  aria-hidden
                  className="display text-[clamp(2.25rem,6vw,6rem)]"
                  whileHover={{ x: 8 }}
                  transition={{ ease: EASE_EXPO }}
                >
                  →
                </motion.span>
              </button>
              )}
            </motion.article>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
