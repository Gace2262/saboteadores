"use client";

import { Gavel } from "lucide-react";
import { useTribunalStore } from "@/store/tribunalStore";

export function JudgePresenceMeter() {
  const { judgeAttention, tribunalInstability } = useTribunalStore((state) => state.memory);
  const weather = useTribunalStore((state) => state.weather);
  return (
    <div className="fixed bottom-4 left-4 z-40 w-[min(320px,calc(100vw-2rem))] rounded-lg border border-amber-100/16 bg-black/70 p-3 text-white backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase text-amber-100/70">
          <Gavel size={14} />
          Presencia del Juez
        </span>
        <span className="text-xs text-white/45">{weather}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[linear-gradient(90deg,#f2d37b,#8b1e3f)]" style={{ width: `${judgeAttention}%` }} />
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-violet-300/70" style={{ width: `${tribunalInstability}%` }} />
      </div>
    </div>
  );
}
