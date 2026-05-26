"use client";

import type { FactionId } from "@/data/factions";
import type { BossPhaseId } from "@/logic/ai/advancedAITypes";
import { getBossPhaseStrategy } from "@/logic/ai/bossPhaseStrategies";

type Props = {
  bossId: FactionId;
  phase: BossPhaseId;
};

export function AIBossPhaseStrategy({ bossId, phase }: Props) {
  const strategy = getBossPhaseStrategy(bossId, phase);

  return (
    <section className="rounded-2xl border border-rose-300/20 bg-rose-950/20 p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-rose-200/70">Fase del boss</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{phase}</h3>
      <p className="mt-2 text-sm text-zinc-300">{strategy.description}</p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <span className="rounded-lg bg-white/5 p-2 text-zinc-300">Agresion x{strategy.aggressionMod.toFixed(1)}</span>
        <span className="rounded-lg bg-white/5 p-2 text-zinc-300">Control x{strategy.controlMod.toFixed(1)}</span>
        <span className="rounded-lg bg-white/5 p-2 text-zinc-300">Criptico {Math.round(strategy.intentObscurity * 100)}%</span>
      </div>
    </section>
  );
}
