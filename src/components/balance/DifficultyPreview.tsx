"use client";

import { difficultyGuardrails, difficultyScaling, type DifficultyMode } from "@/data/difficultyScaling";
import { resolveDifficulty } from "@/logic/balance/difficultyResolver";
import { useBalanceStore } from "@/store/balanceStore";

export function DifficultyPreview() {
  const { difficultyMode, setDifficultyMode, lastDifficultyInput } = useBalanceStore();
  const preview = resolveDifficulty({ ...lastDifficultyInput, mode: difficultyMode });
  return (
    <section className="rounded-lg border border-red-100/15 bg-black/52 p-5">
      <h2 className="text-3xl font-black">Dificultad dinamica</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.values(difficultyScaling).map((mode) => (
          <button key={mode.mode} className={`rounded border px-3 py-2 text-sm font-black uppercase ${difficultyMode === mode.mode ? "border-amber-100/55 bg-amber-100/14 text-amber-100" : "border-white/10 bg-white/5 text-white/60"}`} onClick={() => setDifficultyMode(mode.mode as DifficultyMode)}>
            {mode.label}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {[
          ["Voluntad enemiga", preview.enemyWillMultiplier],
          ["Claridad inicial", `+${preview.enemyClarityBonus}`],
          ["Agresividad IA", preview.aiAggression],
          ["Combos", preview.comboFrequency],
          ["Resistencia control", `${Math.round(preview.controlResistance * 100)}%`],
          ["Recompensas", preview.rewardMultiplier],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase text-white/45">{label as string}</p>
            <p className="text-2xl font-black text-red-100">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-white/60">{preview.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {difficultyGuardrails.map((item) => <span key={item} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/55">{item}</span>)}
      </div>
    </section>
  );
}
