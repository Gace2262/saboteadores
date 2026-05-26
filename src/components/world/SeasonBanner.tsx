"use client";

import { seasons } from "@/data/seasons";
import { useWorldStore } from "@/store/worldStore";

export function SeasonBanner() {
  const { activeSeasonId, setSeason, seenSeasonIds } = useWorldStore();
  const activeSeason = seasons.find((season) => season.id === activeSeasonId) ?? seasons[0];
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/58 p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/60">Temporada psicologica activa</p>
      <h2 className="mt-2 text-4xl font-black text-white">{activeSeason.name}</h2>
      <p className="mt-2 text-lg font-bold text-amber-100">{activeSeason.subtitle}</p>
      <p className="mt-3 max-w-3xl text-white/62">{activeSeason.description}</p>
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {activeSeason.effects.map((effect) => (
          <div key={effect} className="rounded border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/65">
            {effect}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => setSeason(season.id)}
            className={`rounded-md border px-3 py-2 text-sm font-black uppercase transition ${season.id === activeSeason.id ? "border-amber-100/55 bg-amber-100/15 text-amber-100" : "border-white/10 bg-black/35 text-white/60 hover:bg-white/10"}`}
          >
            {season.name}
            {seenSeasonIds.includes(season.id) ? "" : " *"}
          </button>
        ))}
      </div>
    </section>
  );
}
