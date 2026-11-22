import { iconPaths, techIcon } from "@/lib/icons";

/** Project stack chips, each with its brand mark when one exists. */
export function TechChips({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {items.map((item) => {
        const icon = techIcon(item);
        return (
          <span
            key={item}
            className="label inline-flex items-center gap-1.5 border border-line px-2 py-1 text-muted"
          >
            {icon && (
              <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0">
                <path d={iconPaths[icon]} />
              </svg>
            )}
            {item}
          </span>
        );
      })}
    </div>
  );
}
