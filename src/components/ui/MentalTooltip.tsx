"use client";

import type { ReactNode } from "react";

export function MentalTooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-md border border-amber-100/20 bg-black/90 px-3 py-2 text-xs normal-case leading-4 text-white/78 opacity-0 shadow-xl transition group-hover/tooltip:opacity-100">
        {label}
      </span>
    </span>
  );
}
