"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { gallery, type GalleryImage } from "@/data/portfolio";
import { pad } from "@/lib/site";
import { SectionHeader } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Text";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

const GAP = 8;

type Row = { items: GalleryImage[]; height: number; stretch: boolean };

/**
 * Justified rows: images share a row height and every image keeps its own
 * width based on its aspect ratio, so nothing is cropped or forced to a
 * single column width.
 */
function buildRows(images: GalleryImage[], width: number, target: number): Row[] {
  if (width <= 0) return images.map((image) => ({ items: [image], height: target, stretch: false }));

  const rows: Row[] = [];
  let row: GalleryImage[] = [];
  let aspects = 0;

  const flush = () => {
    const height = (width - GAP * (row.length - 1)) / aspects;
    rows.push({ items: row, height, stretch: true });
    row = [];
    aspects = 0;
  };

  for (const image of images) {
    const aspect = image.width / image.height;
    row.push(image);
    aspects += aspect;
    if (aspects * target + GAP * (row.length - 1) >= width) flush();
  }

  if (row.length) rows.push({ items: row, height: target, stretch: false });
  return rows;
}

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const target = width >= 1024 ? 180 : width >= 640 ? 155 : 110;
  const rows = useMemo(() => buildRows(gallery, width, target), [width, target]);

  return (
    <section id="gallery" className="relative">
      <div className="frame">
        <SectionHeader
          id="gallery"
          title="Gallery"
          titleSize="compact"
          meta={`${pad(gallery.length)} frames`}
        />

        <div ref={ref} className="cell flex flex-col gap-2 pb-20 pt-1 md:pb-28">
          {rows.map((row, rowIndex) => (
            <Reveal key={rowIndex} delay={Math.min(rowIndex * 0.04, 0.3)} className="flex items-start gap-2">
              {row.items.map((image) => {
                const aspect = image.width / image.height;
                const style = row.stretch
                  ? { flexGrow: aspect, flexBasis: 0, height: row.height }
                  : { width: aspect * row.height, height: row.height, flex: "none" };

                return (
                  <button
                    key={image.src}
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setOpenIndex(gallery.indexOf(image))}
                    style={style}
                    className="group relative min-w-0 cursor-zoom-in overflow-hidden bg-line"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={`${Math.round(aspect * row.height)}px`}
                      className="object-cover transition-opacity duration-500 ease-expo group-hover:opacity-80"
                    />
                  </button>
                );
              })}
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <GalleryLightbox index={openIndex} onClose={close} onNavigate={setOpenIndex} />
        )}
      </AnimatePresence>
    </section>
  );
}
