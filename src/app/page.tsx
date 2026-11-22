import { marquee } from "@/data/portfolio";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { Gallery } from "@/components/sections/Gallery";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/ui/Bits";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative z-[1]">
        <Hero />
        <Marquee items={marquee.primary} duration={100} />
        <Experience />
        <Work />
        <Stack />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
