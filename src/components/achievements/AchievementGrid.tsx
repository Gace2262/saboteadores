"use client";

import { achievements } from "@/data/achievements";
import { useProgressionStore } from "@/store/progressionStore";
import { AchievementBadge } from "./AchievementBadge";

export function AchievementGrid() {
  const { stats, unlockedAchievementIds } = useProgressionStore();
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 court-fog opacity-80" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Placas judiciales</p>
          <h1 className="mt-2 text-5xl font-black">Logros del expediente mental</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Medallas, sellos ceremoniales y documentos clasificados para celebrar que tu mente sobrevivio con direccion artistica.
          </p>
        </header>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} achievement={achievement} stats={stats} unlocked={unlockedAchievementIds.includes(achievement.id)} />
          ))}
        </div>
      </section>
    </main>
  );
}
