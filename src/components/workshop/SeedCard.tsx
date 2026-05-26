"use client";

import { useWorkshopStore } from "@/store/workshopStore";
import type { WorkshopContent } from "@/logic/workshop/workshopTypes";
import { WarningSeal } from "./WarningSeal";

export function SeedCard({ content }: { content: WorkshopContent }) {
  const markPlayed = useWorkshopStore((state) => state.markPlayed);
  const seed = content.seed;
  return (
    <article className="rounded-2xl border border-amber-100/18 bg-black/55 p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-100/55">Seed compartida</p>
      <h2 className="mt-2 text-2xl font-black">{content.title}</h2>
      <p className="mt-2 text-sm text-white/58">{content.description}</p>
      {seed && (
        <div className="mt-4 grid gap-2 text-sm text-white/70">
          <span>Seed: {seed.seedText}</span>
          <span>Boss final: {seed.finalBoss}</span>
          <span>Win rate local mock: {seed.winRate}%</span>
          <span>Tiempo promedio: {seed.averageMinutes} min</span>
        </div>
      )}
      <div className="mt-4"><WarningSeal warnings={content.warnings} /></div>
      <button type="button" onClick={() => markPlayed(content.id)} className="campaign-choice mt-4">Jugar seed</button>
    </article>
  );
}
