"use client";

import { factionWars } from "@/data/factionWars";
import { useWorldStore } from "@/store/worldStore";

export function FactionWarPanel() {
  const { reputations, adjustReputation } = useWorldStore();
  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4 md:grid-cols-2">
        {factionWars.map((war) => (
          <article key={war.id} className="rounded-lg border border-white/10 bg-black/48 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">{war.leader}</p>
                <h3 className="mt-2 text-2xl font-black text-white">{war.faction}</h3>
              </div>
              <span className="rounded bg-amber-300/12 px-2 py-1 text-xs font-black text-amber-100">{war.influence}%</span>
            </div>
            <p className="mt-3 text-sm text-white/62">{war.status}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {war.occupiedRegions.map((region) => (
                <span key={region} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/55">
                  {region}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs font-black uppercase text-amber-100/65">{war.activeEvents.join(" / ")}</p>
          </article>
        ))}
      </div>
      <aside className="rounded-lg border border-amber-100/16 bg-black/55 p-5">
        <h2 className="text-3xl font-black">Reputacion</h2>
        <p className="mt-2 text-sm text-white/55">Cambia dialogos, recompensas, finales y bosses. El Tribunal lo llama diplomacia. Nadie le cree.</p>
        <div className="mt-5 grid gap-4">
          {Object.entries(reputations).map(([id, value]) => (
            <div key={id}>
              <div className="flex justify-between text-xs font-black uppercase text-white/50">
                <span>{id}</span>
                <span>{value}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-gradient-to-r from-cyan-200 via-amber-200 to-red-400" style={{ width: `${value}%` }} />
              </div>
              <div className="mt-2 flex gap-2">
                <button className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/60" onClick={() => adjustReputation(id as never, -5)}>-5</button>
                <button className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/60" onClick={() => adjustReputation(id as never, 5)}>+5</button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
