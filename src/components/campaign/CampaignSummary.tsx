"use client";

import { RotateCcw } from "lucide-react";
import { aiDifficulties } from "@/logic/ai/aiDifficulty";
import type { AIDifficultyId } from "@/logic/ai/aiTypes";
import { useCampaignStore } from "@/store/campaignStore";

export function CampaignSummary() {
  const { will, maxWill, stress, mentalNoise, clarityFragments, campaignDeck, completedNodeIds, aiDifficulty, setCampaignDifficulty, resetCampaign } =
    useCampaignStore();

  return (
    <aside className="rounded-lg border border-amber-100/15 bg-black/48 p-4">
      <p className="text-xs font-black uppercase text-amber-100/60">Expediente de campana</p>
      <h2 className="mt-1 text-2xl font-black text-white">Ruta mental</h2>
      <div className="mt-4 grid gap-2 text-sm text-white/68">
        <div className="flex justify-between rounded-md bg-white/6 p-3">
          <span>Voluntad</span>
          <strong className="text-amber-100">{will}/{maxWill}</strong>
        </div>
        <div className="flex justify-between rounded-md bg-white/6 p-3">
          <span>Estres</span>
          <strong className="text-rose-100">{stress}</strong>
        </div>
        <div className="flex justify-between rounded-md bg-white/6 p-3">
          <span>Ruido Mental</span>
          <strong className="text-violet-100">{mentalNoise}</strong>
        </div>
        <div className="flex justify-between rounded-md bg-white/6 p-3">
          <span>Fragmentos</span>
          <strong className="text-cyan-100">{clarityFragments}</strong>
        </div>
        <div className="flex justify-between rounded-md bg-white/6 p-3">
          <span>Mazo</span>
          <strong>{campaignDeck.length}</strong>
        </div>
        <div className="flex justify-between rounded-md bg-white/6 p-3">
          <span>Nodos vencidos</span>
          <strong>{completedNodeIds.length}</strong>
        </div>
      </div>
      <label className="mt-4 grid gap-1 text-xs font-black uppercase text-white/55">
        Presion de IA
        <select
          value={aiDifficulty}
          onChange={(event) => setCampaignDifficulty(event.target.value as AIDifficultyId)}
          className="min-h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white"
        >
          {Object.values(aiDifficulties).map((difficulty) => (
            <option key={difficulty.id} value={difficulty.id}>
              {difficulty.name}
            </option>
          ))}
        </select>
      </label>
      <p className="mt-2 text-xs leading-5 text-white/50">{aiDifficulties[aiDifficulty].text}</p>
      <button
        onClick={resetCampaign}
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-white/14 bg-white/6 text-sm font-black uppercase text-white hover:bg-white/10"
      >
        <RotateCcw size={16} />
        Reiniciar campana
      </button>
    </aside>
  );
}
