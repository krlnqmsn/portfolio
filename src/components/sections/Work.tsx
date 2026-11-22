"use client";

import { AnimatePresence } from "framer-motion";
import { CapstoneModal } from "@/components/work/CapstoneModal";
import Image from "next/image";
import { useCallback, useState } from "react";
import type { CSSProperties } from "react";
import {
  project1stBatch,
  project2ndBatch,
  project3rdBatch,
  type Project,
} from "@/data/portfolio";
import { pad } from "@/lib/site";
import { SectionHeader } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Text";
import { FeaturedProject } from "@/components/work/FeaturedProject";
import { FeaturedProjects } from "@/components/work/FeaturedProjects";
import { ProjectModal } from "@/components/work/ProjectModal";
import { ProjectThumb } from "@/components/work/ProjectThumb";
import { TechChips } from "@/components/work/TechChips";

export function Work() {
  const [detail, setDetail] = useState<{ projects: Project[]; index: number } | null>(null);
  const [capstoneOpen, setCapstoneOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const close = useCallback(() => setDetail(null), []);
  const closeCapstone = useCallback(() => setCapstoneOpen(false), []);
  const openFrom = useCallback(
    (projects: Project[]) => (index: number) => setDetail({ projects, index }),
    [],
  );

  const initialCount = 3;
  const hiddenProjects = project3rdBatch.slice(initialCount);
  const hiddenCount = hiddenProjects.length;
  const visible = expanded ? project3rdBatch : project3rdBatch.slice(0, initialCount);

  return (
    <section id="projects" className="relative">
      <div className="frame">
        <SectionHeader
          id="projects"
          title="Projects"
          titleSize="compact"
          meta={`${pad(1 + project2ndBatch.length + project3rdBatch.length)} projects`}
        />

        <FeaturedProject project={project1stBatch} onOpen={() => setCapstoneOpen(true)} />

        <FeaturedProjects projects={project2ndBatch} onOpen={openFrom(project2ndBatch)} />

        <p className="cell label border-t border-line py-4 text-muted">More projects</p>

        <ul
          id="project-list"
          className="cell grid gap-x-6 gap-y-14 pb-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-y-16"
        >
          {visible.map((project, i) => (
            <Reveal as="li" key={project.id} delay={(i % 3) * 0.08}>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => openFrom(project3rdBatch)(i)}
                className="group block w-full text-left"
              >
                <div className="overflow-hidden">
                  <ProjectThumb
                    project={project}
                    className="aspect-[16/10] transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="display text-[clamp(1.35rem,1.9vw,2rem)] uppercase leading-[0.94]">
                    {project.title}
                  </h3>
                  <span className="label shrink-0 text-muted">{pad(i + 1)}</span>
                </div>

                <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
                  {project.description}
                </p>

                <TechChips items={project.tech} className="mt-4" />

                <span className="label mt-5 inline-flex items-center gap-2">
                  <span className="draw-line pb-0.5">View project</span>
                  <span aria-hidden className="transition-transform duration-500 ease-expo group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <div className="cell pb-20 md:pb-28">
            {expanded ? (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-expanded={expanded}
                aria-controls="project-list"
                className="group inline-flex items-center gap-3 border border-line px-5 py-3 transition-colors duration-300 hover:bg-fg hover:text-bg"
              >
                <span className="label">Show less</span>
                <span
                  aria-hidden
                  className="text-sm leading-none transition-transform duration-500 ease-expo group-hover:-translate-y-0.5"
                >
                  ↑
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                aria-expanded={expanded}
                aria-controls="project-list"
                aria-label={`View ${hiddenCount} more projects`}
                className="group relative block w-full overflow-hidden border border-line text-left"
              >
                <div className="relative h-[190px] overflow-hidden bg-fg/5 sm:h-[240px]">
                  <div
                    className="marquee-track h-full group-hover:[animation-play-state:paused]"
                    style={
                      {
                        "--marquee-duration": `${Math.max(hiddenCount * 4, 18)}s`,
                      } as CSSProperties
                    }
                  >
                    {[...hiddenProjects, ...hiddenProjects].map((project, i) => (
                      <div
                        key={`${project.id}-${i}`}
                        className="relative mr-3 h-full w-[240px] shrink-0 overflow-hidden rounded-lg bg-line sm:mr-4 sm:w-[320px]"
                      >
                        {project.image.endsWith("/") ? (
                          <div className="flex h-full items-end bg-fg/10 p-4">
                            <span className="label text-muted">{project.title}</span>
                          </div>
                        ) : (
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            sizes="(min-width: 640px) 320px, 240px"
                            className="object-cover object-top"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 text-white sm:p-7">
                  <div>
                    <p className="label text-white/70">
                      {hiddenCount} more {hiddenCount === 1 ? "project" : "projects"} hidden
                    </p>
                    <p className="display mt-1 text-[clamp(1.5rem,3.2vw,2.75rem)] uppercase leading-[0.9]">
                      View more projects
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/70 text-lg transition-colors duration-300 group-hover:bg-white group-hover:text-black sm:size-14 sm:text-xl"
                  >
                    →
                  </span>
                </div>
              </button>
            )}
            {expanded && (
              <p className="label mt-3 text-muted">
                Showing all {pad(project3rdBatch.length)} projects
              </p>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {detail !== null && (
          <ProjectModal
            index={detail.index}
            projects={detail.projects}
            onClose={close}
            onNavigate={(index) => setDetail({ ...detail, index })}
          />
        )}
        {capstoneOpen && (
          <CapstoneModal project={project1stBatch} onClose={closeCapstone} />
        )}
      </AnimatePresence>
    </section>
  );
}
