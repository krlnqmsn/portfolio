import Image from "next/image";
import type { Project } from "@/data/portfolio";

/**
 * Project screenshot. The caller supplies the aspect-ratio box so the
 * grid and modal reserve space before the image loads.
 */
export function ProjectThumb({
  project,
  fit = "cover",
  sizes = "(min-width: 768px) 50vw, 100vw",
  className = "",
}: {
  project: Project;
  fit?: "cover" | "contain";
  sizes?: string;
  className?: string;
}) {
  // Entries without a screenshot point at the `public/projects/` folder.
  if (project.image.endsWith("/")) {
    return (
      <div
        className={`relative isolate flex items-end overflow-hidden rounded-lg bg-fg/5 p-4 ${className}`}
        aria-hidden
      >
        <span className="label text-muted">Screenshot coming soon</span>
      </div>
    );
  }

  return (
    <div className={`relative isolate overflow-hidden rounded-lg bg-fg/5 ${className}`}>
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes={sizes}
        className={fit === "contain" ? "object-contain object-top" : "object-cover object-top"}
      />
    </div>
  );
}
