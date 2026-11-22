import { experience, experienceIntro, experienceTitle } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Text";

export function Experience() {
  return (
    <section id="experience" className="relative">
      <div className="frame">
        <SectionHeader id="experience" title="Experience" titleSize="compact" />

        <div className="cell grid gap-10 pb-10 md:pb-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="pb-6">
              <h3 className="display text-[clamp(1.25rem,2.6vw,2.25rem)] uppercase leading-[0.95]">
                {experienceTitle.role}
              </h3>
              <p className="display mt-2 flex flex-nowrap items-center gap-x-2 whitespace-nowrap text-[clamp(0.55rem,2.4vw,1.05rem)] uppercase leading-[1] tracking-[0.02em] md:gap-x-3">
                {experienceTitle.meta.map((item, i) => (
                  <span key={item} className="flex shrink-0 items-center gap-2 whitespace-nowrap md:gap-3">
                    {i > 0 && (
                      <span aria-hidden className="text-muted">
                        ·
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </p>
            </div>

            <div className="max-w-[68ch] space-y-5">
              {experienceIntro.split("\n\n").map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-relaxed text-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <ol className="grid gap-px border-t border-line">
              {experience.map((item, i) => {
                const current = i === experience.length - 1;
                const Icon = current ? AgenticIcon : ManualIcon;

                return (
                  <Reveal
                    as="li"
                    key={item.period}
                    delay={0.1 + i * 0.06}
                    className="border-b border-line py-6"
                  >
                    <div className="flex flex-nowrap items-baseline justify-between gap-2 md:gap-4">
                      <h3 className="display whitespace-nowrap text-[clamp(1rem,2.2vw,1.6rem)] uppercase leading-[0.95]">
                        {item.role}
                      </h3>
                      <span className="display flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[clamp(0.7rem,1.5vw,1.1rem)] uppercase leading-[0.95]">
                        <Icon className="size-3 shrink-0 md:size-4" />
                        {item.period}
                      </span>
                    </div>

                    <p className="label mt-2 text-muted">{item.company}</p>

                    <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Brackets — code written by hand, one line at a time. */
function ManualIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m13.5 5-3 14" />
    </svg>
  );
}

/** Sparkles — agents doing the keystrokes. */
function AgenticIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11 2.5l1.8 5.4 5.4 1.8-5.4 1.8L11 16.9 9.2 11.5 3.8 9.7l5.4-1.8L11 2.5Z" />
      <path d="M18.5 15.2l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
    </svg>
  );
}
