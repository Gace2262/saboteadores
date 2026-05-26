"use client";

import { rewardTables } from "@/data/rewardTables";
import { useEconomyStore } from "@/store/economyStore";

export function RewardBreakdown() {
  const { lastReward, simulateReward } = useEconomyStore();
  return (
    <section className="rounded-lg border border-white/10 bg-black/50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-amber-100/60">RewardBalancer</p>
          <h2 className="text-3xl font-black">Recompensas estimadas</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {rewardTables.map((table) => (
            <button key={table.id} className="campaign-choice max-w-xs" onClick={() => simulateReward({ context: table.id })}>
              {table.name}
            </button>
          ))}
        </div>
      </div>
      {lastReward ? (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase text-white/45">XP</p>
            <p className="text-3xl font-black text-amber-100">{lastReward.xp}</p>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase text-white/45">Monedas</p>
            <p className="text-sm text-white/70">{Object.entries(lastReward.currencies).map(([key, value]) => `${value} ${key}`).join(" + ")}</p>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase text-white/45">Bonos</p>
            <p className="text-sm text-white/70">{lastReward.bonuses.join(" / ")}</p>
          </div>
        </div>
      ) : <p className="mt-4 text-white/55">Simula una recompensa. El Tribunal promete transparencia, lo cual ya es raro.</p>}
    </section>
  );
}
