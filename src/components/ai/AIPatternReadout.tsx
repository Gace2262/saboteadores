"use client";

import type { PlayerPatternReport } from "@/logic/ai/advancedAITypes";
import { useAIStore } from "@/store/aiStore";

type Props = {
  pattern?: PlayerPatternReport;
};

export function AIPatternReadout({ pattern }: Props) {
  const storedPattern = useAIStore((state) => state.lastPattern);
  const activePattern = pattern ?? storedPattern;

  if (!activePattern) {
    return (
      <section className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 text-sm text-zinc-400">
        El expediente de patrones esta vacio. El Tribunal aun no sabe si corres, bloqueas o finges compostura.
      </section>
    );
  }

  const sortedSignals = Object.entries(activePattern.signals).sort(([, a], [, b]) => b - a);

  return (
    <section className="rounded-2xl border border-violet-300/20 bg-violet-950/20 p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-violet-200/70">Lectura del jugador</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{activePattern.dominantStyle.replace(/_/g, " ")}</h3>
      <p className="mt-1 text-sm text-zinc-300">{activePattern.summary}</p>
      <div className="mt-4 space-y-2">
        {sortedSignals.slice(0, 5).map(([signal, value]) => (
          <div key={signal}>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>{signal.replace(/_/g, " ")}</span>
              <span>{Math.round(value * 100)}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-violet-300" style={{ width: `${Math.min(100, Math.round(value * 100))}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
