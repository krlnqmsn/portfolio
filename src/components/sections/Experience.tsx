import { experience, experienceIntro, experienceStats } from "@/data/portfolio";
import { SectionHeader, CountUp } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Text";

export function Experience() {
  return (
    <section id="experience" className="relative">
      <div className="frame">
        <SectionHeader id="experience" title="Experience" titleSize="compact" />

        <div className="cell grid gap-10 pb-10 md:pb-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p className="max-w-[68ch] text-base leading-relaxed text-muted md:text-lg">
              {experienceIntro}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <dl className="grid grid-cols-2 border-t border-line">
              {experienceStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col gap-3 py-6 ${
                    i === 0 ? "border-r border-line pr-4" : "pl-4"
                  }`}
                >
                  <dd className="display order-1 text-[clamp(2.5rem,4.5vw,4rem)] leading-[0.85] tabular-nums">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="label order-2 text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ol className="grid border-t border-line md:grid-cols-2">
          {experience.map((item, i) => {
            const current = i === experience.length - 1;
            const Icon = current ? AgenticIcon : ManualIcon;

            return (
              <Reveal
                as="li"
                key={item.period}
                delay={i * 0.06}
                className={`cell py-6 md:py-8 ${
                  i === 0 ? "border-b border-line md:border-b-0 md:border-r" : ""
                }`}
              >
                <div className="flex flex-nowrap items-baseline justify-between gap-2 md:gap-4">
                  <h3 className="display whitespace-nowrap text-[clamp(1rem,2.4vw,2.25rem)] uppercase leading-[0.95]">
                    {item.role}
                  </h3>
                  <span className="display flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[clamp(0.75rem,1.8vw,1.6rem)] uppercase leading-[0.95] md:gap-2">
                    <Icon className="size-3 shrink-0 md:size-4" />
                    {item.period}
                  </span>
                </div>

                <p className="label mt-2 text-muted">{item.company}</p>

                <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-muted">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </ol>
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
