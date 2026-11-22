"use client";

import type { Project } from "@/data/portfolio";
import { iconPaths } from "@/lib/icons";
import { pad } from "@/lib/site";
import { Reveal } from "@/components/ui/Text";
import { ProjectThumb } from "./ProjectThumb";
import { TechChips } from "./TechChips";

/** Accept bare domains, but never produce a relative link. */
function external(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

/** Showing the address itself, so the link reads as a link. */
function readable(url: string) {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

/**
 * The client projects that lead the section. They sit on an inverted
 * band, one wide row each, so they never read as part of the grid below.
 */
export function FeaturedProjects({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="pb-16 md:pb-20">
      <div className="cell border-y border-line py-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-[clamp(1.5rem,2.6vw,2.25rem)] uppercase leading-[0.94]">
            Freelance projects
          </h3>
          <p className="label text-muted">{pad(projects.length)} shipped</p>
        </div>
        <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">
          Only projects with client approval are shown here. The rest stay hidden
          to respect client system privacy.
        </p>
      </div>

      <div className="border-b border-line">
        {projects.map((project, i) => {
          const website = project.websiteLink?.trim();
          const facebook = project.businessPage?.trim();

          return (
            <Reveal
              key={project.id}
              className="border-b border-line last:border-b-0"
              delay={i * 0.08}
            >
              <article className="grid gap-7 p-5 sm:p-7 md:grid-cols-12 md:items-center md:gap-10 md:p-10 lg:p-14">
                <div
                  className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => onOpen(i)}
                    aria-haspopup="dialog"
                    className="group relative block w-full text-left"
                  >
                    <ProjectThumb
                      project={project}
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="aspect-[16/10] border border-line transition-transform duration-700 ease-expo group-hover:scale-[1.01]"
                    />
                    <span
                      aria-hidden
                      className="display absolute left-4 top-4 text-[clamp(2.5rem,6vw,5rem)] leading-none text-fg opacity-25"
                    >
                      {pad(i + 1)}
                    </span>
                  </button>
                </div>

                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <h3 className="display text-[clamp(1.75rem,3.6vw,3.25rem)] uppercase leading-[0.92]">
                    <button
                      type="button"
                      onClick={() => onOpen(i)}
                      aria-haspopup="dialog"
                      className="text-left transition-opacity duration-300 hover:opacity-70"
                    >
                      {project.title}
                    </button>
                  </h3>

                  <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-muted md:text-[1.0625rem]">
                    {project.description}
                  </p>

                  <TechChips items={project.tech} className="mt-5" />

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                    {website ? (
                      <a
                        href={external(website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit max-w-full items-center gap-2 font-sans text-base font-medium underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-current"
                      >
                        <span className="truncate">{readable(website)}</span>
                        <span aria-hidden>↗</span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : null}

                    {facebook ? (
                      <a
                        href={external(facebook)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on Facebook`}
                        className="group/fb inline-flex w-fit items-center gap-2 font-sans text-base font-medium underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-current"
                      >
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-3.5 shrink-0"
                        >
                          <path d={iconPaths.facebook} />
                        </svg>
                        <span className="transition-colors duration-300 group-hover/fb:text-fg">
                          View business Facebook page
                        </span>
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <span
                        aria-disabled
                        className="inline-flex w-fit items-center gap-2 text-base text-muted opacity-60"
                      >
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-3.5 shrink-0"
                        >
                          <path d={iconPaths.facebook} />
                        </svg>
                        Facebook page — link soon
                      </span>
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={() => onOpen(i)}
                    aria-haspopup="dialog"
                    className="label mt-7 inline-flex w-full items-center justify-between gap-3 bg-fg px-5 py-3.5 text-bg transition-opacity duration-300 hover:opacity-80 sm:w-auto sm:justify-start sm:gap-8"
                  >
                    View project
                    <span
                      aria-hidden
                      className="transition-transform duration-500 ease-expo group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
