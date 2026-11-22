import { iconPaths, techIcon } from "@/lib/icons";

/** Project stack chips, each with its brand mark when one exists. */
export function TechChips({
  items,
  className = "",
  size = "sm",
}: {
  items: string[];
  className?: string;
  /** "lg" is used for the featured capstone, where the stack should read clearly. */
  size?: "sm" | "lg";
}) {
  const large = size === "lg";
  return (
    <div className={`flex flex-wrap items-center ${large ? "gap-2.5" : "gap-1.5"} ${className}`}>
      {items.map((item) => {
        const icon = techIcon(item);
        return (
          <span
            key={item}
            className={`label inline-flex items-center border border-line text-muted ${
              large ? "gap-2.5 px-4 py-2.5 text-[0.9rem] tracking-[0.06em]" : "gap-1.5 px-2 py-1"
            }`}
          >
            {icon && (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`shrink-0 ${large ? "size-5" : "size-3.5"}`}
              >
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
