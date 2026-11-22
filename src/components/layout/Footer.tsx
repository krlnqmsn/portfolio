"use client";

import { footer, site } from "@/data/portfolio";
import { useYear } from "@/lib/hooks";
import { LiveTime } from "@/components/ui/Bits";
import { RollText } from "@/components/ui/Text";

export function Footer() {
  const year = useYear();

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.querySelector<HTMLElement>("#site-nav a")?.focus({ preventScroll: true });
  };

  return (
    <footer id="site-footer" className="relative z-[1]">
      <div className="frame">
        <div className="site-grid gap-y-4 border-t border-line py-5">
          <p className="label cell col-span-2 md:col-span-2 lg:col-span-3" suppressHydrationWarning>
            © {year ?? ""} {site.name}
          </p>
          <p className="label cell col-span-2 text-right md:col-span-3 md:text-left lg:col-span-3">
            Designed &amp; built by {site.name}
          </p>
          <p className="label cell col-span-2 text-muted md:col-span-3 md:text-right lg:col-span-3 lg:text-left">
            {site.location.city} — <LiveTime timeZone={site.location.timeZone} seconds={false} />{" "}
            {site.location.timeZoneLabel}
          </p>
          <div className="cell col-span-2 flex justify-end md:col-span-8 lg:col-span-3">
            <button type="button" onClick={toTop} className="group label flex items-center gap-2">
              <RollText>Back to top</RollText>
              <span aria-hidden className="transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>
        </div>
        <div className="site-grid border-t border-line py-3">
          <p className="label cell col-span-4 text-muted md:col-span-6">{footer.credit}</p>
          <p className="label cell col-span-4 text-muted md:col-span-2 md:text-right lg:col-span-6">
            {site.version}
          </p>
        </div>
      </div>
    </footer>
  );
}
