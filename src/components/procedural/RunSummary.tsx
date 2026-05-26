"use client";

import { getFaction } from "@/data/factions";
import { useProceduralCampaignStore } from "@/store/proceduralCampaignStore";

export function RunSummary() {
  const campaign = useProceduralCampaignStore((state) => state.currentCampaign);
  const visited = useProceduralCampaignStore((state) => state.visitedNodeIds);
  const finishRun = useProceduralCampaignStore((state) => state.finishRun);

  if (!campaign) return null;

  return (
    <aside className="grid gap-4">
      <section className="rounded-2xl border border-amber-100/18 bg-black/55 p-5">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/60">Resumen de run</p>
        <h2 className="mt-2 text-2xl font-black">{campaign.narrative.title}</h2>
        <p className="mt-2 text-sm text-white/58">{campaign.narrative.openingLine}</p>
        <div className="mt-4 grid gap-2 text-sm text-white/70">
          <span>Seed: {campaign.seedText}</span>
          <span>Tema: {campaign.narrative.theme}</span>
          <span>Boss final: {getFaction(campaign.finalBossId)?.name ?? campaign.finalBossId}</span>
          <span>Nodos visitados: {visited.length}</span>
        </div>
      </section>
      <button type="button" onClick={() => finishRun("victoria")} className="campaign-action">Registrar victoria</button>
      <button type="button" onClick={() => finishRun("derrota")} className="campaign-choice">Registrar derrota</button>
    </aside>
  );
}
