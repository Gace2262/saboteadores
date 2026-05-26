"use client";

import { healthyProgressionTargets, levelRewards } from "@/data/progressionCurves";

export function ProgressionCurveView() {
  const sample = levelRewards.filter((reward) => [1, 2, 5, 10, 15, 20, 30, 40, 50].includes(reward.level));
  return (
    <section className="rounded-lg border border-white/10 bg-black/50 p-5">
      <h2 className="text-3xl font-black">Curva de progresion</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        {sample.map((reward) => (
          <article key={reward.level} className="rounded border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase text-white/45">Nivel {reward.level}</p>
            <p className="mt-1 text-2xl font-black text-amber-100">{reward.xpRequired} XP</p>
            <p className="mt-2 text-sm text-white/62">{reward.label}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 grid gap-2">
        {healthyProgressionTargets.map((target) => <p key={target} className="rounded border border-white/10 bg-white/5 p-3 text-sm text-white/65">{target}</p>)}
      </div>
    </section>
  );
}
