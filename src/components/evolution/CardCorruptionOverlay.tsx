"use client";

import { getCorruptionRule } from "@/data/corruptions";

export function CardCorruptionOverlay({ value }: { value: number }) {
  const rule = getCorruptionRule(value);
  if (rule.level < 2) return null;
  return (
    <div className="pointer-events-none absolute inset-0 rounded-lg border border-rose-300/35 bg-[radial-gradient(circle_at_50%_40%,rgba(127,29,29,0.28),transparent_36%)] mix-blend-screen">
      <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-xs font-black uppercase text-rose-100">{rule.state}</span>
    </div>
  );
}
