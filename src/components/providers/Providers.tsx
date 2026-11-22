"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import { resolveTheme } from "@/lib/hooks";

interface IntroState {
  /** True once the page-load intro has finished and content may reveal. */
  done: boolean;
  finish: () => void;
}

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

export const useIntro = () => useContext(IntroContext);

export function Providers({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);

  // React's dev Strict Mode remount resets <html> attributes;
  // re-apply the theme the inline script set. No-op in production.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", resolveTheme());
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={{ done, finish }}>{children}</IntroContext.Provider>
    </MotionConfig>
  );
}
