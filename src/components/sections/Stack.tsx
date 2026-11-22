import { stack } from "@/data/portfolio";
import { iconPaths, type IconName } from "@/lib/icons";
import { SectionHeader } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Text";

export function Stack() {
  return (
    <section id="stack" className="relative">
      <div className="frame">
        <SectionHeader id="stack" title="Stack" titleSize="compact" />

        <div className="pb-20 md:pb-28">
          {stack.map((group, gi) => (
            <Reveal
              key={group.group}
              delay={gi * 0.08}
              className="cell grid gap-4 border-t border-line py-6 md:grid-cols-12 md:gap-6 md:py-8"
            >
              <h3 className="display text-2xl uppercase md:col-span-3 md:text-3xl">{group.group}</h3>
              <ul className="flex flex-wrap gap-2 md:col-span-9">
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-2.5 border border-line px-3.5 py-2 text-base transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg md:text-lg"
                  >
                    <TechIcon name={item.icon} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Monochrome brand mark; inherits the pill's color so it inverts on hover. */
function TechIcon({ name }: { name?: IconName }) {
  if (!name) {
    return (
      <span aria-hidden className="text-[0.7em] leading-none">
        ✦
      </span>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0 md:size-[1.05em]">
      <path d={iconPaths[name]} />
    </svg>
  );
}
