"use client";

import type { ReactNode } from "react";
import { useVisualStore } from "@/store/visualStore";
import { cardThemes } from "@/styles/cardThemes";

export function GothicPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  const theme = useVisualStore((state) => state.visualTheme);
  return (
    <section className={`gothic-panel rounded-lg border p-5 shadow-2xl backdrop-blur ${cardThemes[theme].panelClass} ${className}`}>
      {children}
    </section>
  );
}
