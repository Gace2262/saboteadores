"use client";

import { useCollectionStore } from "@/store/collectionStore";
import { useModeStore } from "@/store/modeStore";
import { useProgressionStore } from "@/store/progressionStore";

export function PlayerStatsCard() {
  const collection = useCollectionStore();
  const progression = useProgressionStore();
  const modes = useModeStore((state) => state.records);
  const favoriteMode = Object.entries(modes).sort((a, b) => b[1].plays - a[1].plays)[0]?.[0] ?? "boss-rush";
  const stats = [
    ["Nivel", collection.level],
    ["Victorias", progression.stats.victories],
    ["Logros", progression.unlockedAchievementIds.length],
    ["Cosmeticos", progression.unlockedCosmeticIds.length],
    ["Modo favorito", favoriteMode],
    ["Bosses derrotados", collection.bossesDefeated],
  ];
  return (
    <section className="rounded-lg border border-amber-100/15 bg-black/48 p-5">
      <p className="text-sm font-black uppercase text-amber-100/65">Ficha criminal emocional</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-md border border-white/10 bg-white/6 p-3">
            <p className="text-xs font-black uppercase text-white/45">{label}</p>
            <p className="mt-1 text-2xl font-black text-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
