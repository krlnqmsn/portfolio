import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/data/portfolio";
import { Providers } from "@/components/providers/Providers";
import { ScrollProgress } from "@/components/effects/Backdrop";
import { Preloader } from "@/components/effects/Preloader";
import "./globals.css";
  
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display-face", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body-face", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap" });

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.seoDescription,
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

/**
 * Runs before first paint: applies the saved theme (dark by default) and
 * hides the intro loader if it has already played this session (or motion is reduced).
 */
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t="dark";d.setAttribute("data-theme",t)}catch(e){}try{if(sessionStorage.getItem("intro-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)d.setAttribute("data-intro","skip")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="label fixed left-3 top-3 z-[110] -translate-y-20 bg-fg px-3 py-2 text-bg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <Preloader />
          {children}
          <ScrollProgress />
        </Providers>
      </body>
    </html>
  );
}
