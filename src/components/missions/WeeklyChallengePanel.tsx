"use client";

import { weeklyChallenges } from "@/data/weeklyChallenges";
import { useProgressionStore } from "@/store/progressionStore";
import { DailyMissionCard } from "./DailyMissionCard";

export function WeeklyChallengePanel() {
  const { stats, completedWeeklyIds } = useProgressionStore();
  return (
    <section className="rounded-lg border border-violet-100/16 bg-black/50 p-5">
      <p className="text-sm font-black uppercase text-violet-100/65">Desafios semanales</p>
      <h2 className="mt-1 text-4xl font-black">Acusaciones con calendario</h2>
      <p className="mt-3 max-w-3xl text-white/60">
        No hay temporizadores abusivos: son objetivos persistentes de prototipo. El Tribunal los llama semanales porque suena mas amenazante.
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {weeklyChallenges.map((challenge) => (
          <DailyMissionCard key={challenge.id} mission={challenge} stats={stats} completed={completedWeeklyIds.includes(challenge.id)} />
        ))}
      </div>
    </section>
  );
}
