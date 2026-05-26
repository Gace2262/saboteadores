"use client";

import { getFaction } from "@/data/factions";
import { useProceduralCampaignStore } from "@/store/proceduralCampaignStore";

export function RunHistoryList() {
  const history = useProceduralCampaignStore((state) => state.runHistory);

  return (
    <section className="grid gap-4">
      {history.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-black/55 p-6 text-white/60">Sin runs archivadas. El Tribunal todavia no tiene material para juzgar con confianza.</div>
      ) : (
        history.map((entry) => (
          <article key={entry.id} className="rounded-2xl border border-white/10 bg-black/55 p-5 text-white">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-white/38">{entry.result}</p>
                <h2 className="mt-2 text-2xl font-black">Seed {entry.seedText}</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{entry.durationMinutes} min</span>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-white/62 md:grid-cols-3">
              <span>Boss: {getFaction(entry.finalBossId)?.name ?? entry.finalBossId}</span>
              <span>Estres max: {entry.maxStress}</span>
              <span>Nodos: {entry.visitedNodeIds.length}</span>
              <span>Carta clave: {entry.keyCard}</span>
              <span>Combo: {entry.bestCombo}</span>
              <span>Dificultad: {entry.difficulty}</span>
            </div>
            <p className="mt-3 text-sm font-bold text-amber-100">{entry.finalLine}</p>
          </article>
        ))
      )}
    </section>
  );
}
