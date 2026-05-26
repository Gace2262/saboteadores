"use client";

import { levelRewards } from "@/data/progressionCurves";

export function LevelRewardTrack() {
  return (
    <section className="rounded-lg border border-amber-100/15 bg-black/52 p-5">
      <h2 className="text-3xl font-black">Recompensas de nivel 1-50</h2>
      <div className="mt-4 grid max-h-[620px] gap-2 overflow-y-auto pr-2">
        {levelRewards.map((reward) => (
          <div key={reward.level} className="grid grid-cols-[80px_1fr_120px] items-center gap-3 rounded border border-white/10 bg-white/5 p-3">
            <span className="font-black text-amber-100">Nivel {reward.level}</span>
            <span className="text-white/72">{reward.label}</span>
            <span className="text-right text-xs text-white/45">{reward.xpRequired} XP</span>
          </div>
        ))}
      </div>
    </section>
  );
}
