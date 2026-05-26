"use client";

import { CheckCircle2, Gavel, LockKeyhole, Sparkles } from "lucide-react";
import type { MissionDefinition } from "@/data/missions";
import type { PlayerStats } from "@/data/playerStats";
import { MissionProgressBar } from "./MissionProgressBar";

const icons = {
  chains: LockKeyhole,
  pulse: Sparkles,
  gavel: Gavel,
  stampede: Sparkles,
  mask: LockKeyhole,
  court: Gavel,
  judgment: Gavel,
  burst: Sparkles,
  shield: LockKeyhole,
};

export function DailyMissionCard({ mission, stats, completed }: { mission: MissionDefinition; stats: PlayerStats; completed: boolean }) {
  const Icon = icons[mission.icon as keyof typeof icons] ?? Gavel;
  const progress = stats[mission.statKey as keyof PlayerStats] ?? 0;
  return (
    <article className={`relative overflow-hidden rounded-lg border p-5 ${completed ? "border-emerald-100/25 bg-emerald-950/20" : "border-amber-100/16 bg-black/52"}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/60 to-transparent" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-amber-100/60">{mission.category}</p>
          <h2 className="mt-1 text-2xl font-black">{mission.title}</h2>
        </div>
        <div className="grid size-11 place-items-center rounded-md border border-amber-100/20 bg-amber-100/10 text-amber-100">
          {completed ? <CheckCircle2 size={22} /> : <Icon size={22} />}
        </div>
      </div>
      <p className="mt-3 min-h-12 text-sm leading-6 text-white/65">{mission.description}</p>
      <p className="mt-3 rounded-md border border-white/10 bg-white/6 p-3 text-sm italic text-white/58">{mission.flavorText}</p>
      <div className="mt-4">
        <MissionProgressBar progress={progress} target={mission.target} />
      </div>
      <p className="mt-4 text-sm font-black uppercase text-amber-100">{mission.reward.label}</p>
    </article>
  );
}
