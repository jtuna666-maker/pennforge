"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type DemoModalContextValue = {
  isOpen: boolean;
  openDemo: () => void;
  closeDemo: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

/**
 * Provides openDemo()/closeDemo() to every CTA on the page so all
 * "Book a Demo" buttons share one demo-request modal instance.
 */
export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openDemo = useCallback(() => setIsOpen(true), []);
  const closeDemo = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ isOpen, openDemo, closeDemo }),
    [isOpen, openDemo, closeDemo]
  );
  return (
    <DemoModalContext.Provider value={value}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal(): DemoModalContextValue {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal must be used inside DemoModalProvider");
  return ctx;
}
