"use client";

import { getCorruptionRule } from "@/data/corruptions";

export function CorruptionMeter({ value }: { value: number }) {
  const rule = getCorruptionRule(value);
  const width = Math.min(100, value);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-black uppercase text-white/45">
        <span>Corrupcion: {rule.state}</span>
        <span className="text-rose-100">{value}/100</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-black/60">
        <div className="h-full bg-[linear-gradient(90deg,#f8fafc,#f2d37b,#8b1e3f,#450a0a)]" style={{ width: `${width}%` }} />
      </div>
      <p className="text-xs italic text-white/45">{rule.flavorText}</p>
    </div>
  );
}
