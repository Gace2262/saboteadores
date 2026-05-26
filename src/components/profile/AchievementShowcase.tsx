"use client";

import { achievements } from "@/data/achievements";
import { useProfileStore } from "@/store/profileStore";
import { useProgressionStore } from "@/store/progressionStore";

export function AchievementShowcase() {
  const { showcasedAchievementIds, toggleShowcaseAchievement } = useProfileStore();
  const unlocked = useProgressionStore((state) => state.unlockedAchievementIds);
  const selected = achievements.filter((achievement) => showcasedAchievementIds.includes(achievement.id));
  return (
    <section className="rounded-lg border border-amber-100/15 bg-black/48 p-5">
      <p className="text-sm font-black uppercase text-amber-100/65">Vitrina de logros</p>
      <h2 className="mt-1 text-3xl font-black">Medallas mentales destacadas</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {(selected.length ? selected : achievements.slice(0, 3)).map((achievement) => (
          <button
            key={achievement.id}
            onClick={() => toggleShowcaseAchievement(achievement.id)}
            className="rounded-md border border-white/10 bg-white/6 p-4 text-left transition hover:border-amber-100/35"
          >
            <p className="text-xs font-black uppercase text-white/45">{unlocked.includes(achievement.id) ? "desbloqueado" : "clasificado"}</p>
            <h3 className="mt-1 text-xl font-black">{achievement.hidden && !unlocked.includes(achievement.id) ? "???" : achievement.title}</h3>
            <p className="mt-2 text-sm text-white/55">{achievement.hidden && !unlocked.includes(achievement.id) ? "Contrato sellado." : achievement.flavorText}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
