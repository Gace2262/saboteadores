"use client";

import { Award, LockKeyhole } from "lucide-react";
import type { AchievementDefinition } from "@/data/achievements";
import type { PlayerStats } from "@/data/playerStats";
import { MissionProgressBar } from "@/components/missions/MissionProgressBar";

export function AchievementBadge({ achievement, stats, unlocked }: { achievement: AchievementDefinition; stats: PlayerStats; unlocked: boolean }) {
  const hidden = achievement.hidden && !unlocked;
  const progress = stats[achievement.statKey as keyof PlayerStats] ?? 0;
  return (
    <article className={`group relative overflow-hidden rounded-lg border p-5 ${unlocked ? "border-amber-100/28 bg-amber-100/10" : "border-white/10 bg-black/48"}`}>
      <div className="absolute -right-12 -top-12 size-28 rounded-full bg-amber-100/10 blur-2xl transition group-hover:bg-amber-100/20" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-white/45">{hidden ? "Clasificado" : achievement.category}</p>
          <h2 className="mt-1 text-2xl font-black">{hidden ? "???" : achievement.title}</h2>
        </div>
        <div className={`grid size-12 place-items-center rounded-md border ${unlocked ? "border-amber-100/40 text-amber-100" : "border-white/12 text-white/45"}`}>
          {hidden ? <LockKeyhole size={22} /> : <Award size={22} />}
        </div>
      </div>
      <p className="mt-3 min-h-12 text-sm leading-6 text-white/64">
        {hidden ? "Documento sellado. El Tribunal niega su existencia con demasiada energia." : achievement.description}
      </p>
      <p className="mt-3 rounded-md border border-white/10 bg-white/6 p-3 text-sm italic text-white/55">
        {hidden ? "Recompensa rara. Probablemente peligrosa para la obediencia interna." : achievement.flavorText}
      </p>
      <div className="mt-4">
        <MissionProgressBar progress={progress} target={achievement.target} />
      </div>
      <p className="mt-4 text-sm font-black uppercase text-amber-100">{hidden ? "Recompensa oculta" : achievement.reward.label}</p>
    </article>
  );
}
