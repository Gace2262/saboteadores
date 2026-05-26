"use client";

import { Trophy } from "lucide-react";
import { allCards } from "@/data/cards";
import { progressRules } from "@/data/playerProgress";
import { loreEntries } from "@/data/story/loreEntries";
import { useCollectionStore } from "@/store/collectionStore";
import { useExtremeJudgmentStore } from "@/store/extremeJudgmentStore";
import { useProgressionStore } from "@/store/progressionStore";
import { CloudSaveButton } from "@/components/cloud/CloudSaveButton";
import { SyncStatusBadge } from "@/components/cloud/SyncStatusBadge";
import { AchievementShowcase } from "./AchievementShowcase";
import { FavoriteDeckPanel } from "./FavoriteDeckPanel";
import { MentalPetDisplay } from "./MentalPetDisplay";
import { PlayerStatsCard } from "./PlayerStatsCard";
import { ProfileBackground } from "./ProfileBackground";
import { ProfileHeader } from "./ProfileHeader";
import { TitleSelector } from "./TitleSelector";
import { UnlockTimeline } from "./UnlockTimeline";
import { UnlockedCosmetics } from "./UnlockedCosmetics";

export function PlayerProgress() {
  const state = useCollectionStore();
  const ownedCount = Object.keys(state.copies).filter((id) => state.copies[id] > 0).length;
  const { attempts, bestScore } = useExtremeJudgmentStore();
  const progression = useProgressionStore();
  const nextXp = state.level * progressRules.levelBase;
  const progress = Math.min(100, (state.experience / nextXp) * 100);

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <ProfileBackground />
      <ProfileHeader />
      <section className="relative z-10 mx-auto mt-5 grid w-full max-w-7xl gap-5 lg:grid-cols-[1fr_380px]">
        <PlayerStatsCard />
        <div className="grid gap-5">
          <SyncStatusBadge />
          <MentalPetDisplay />
        </div>
      </section>
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1fr_380px]">
        <div className="rounded-lg border border-amber-100/15 bg-black/48 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Perfil</p>
          <h1 className="mt-2 text-5xl font-black">Progreso del psiconauta</h1>
          <div className="mt-6 rounded-lg border border-white/10 bg-white/6 p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-white/55">Nivel</p>
                <p className="text-6xl font-black text-amber-100">{state.level}</p>
              </div>
              <Trophy className="text-amber-100" size={48} />
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-amber-200" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-white/55">{state.experience} / {nextXp} XP</p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Metric label="Cartas coleccionadas" value={`${ownedCount}/${allCards.filter((card) => card.collectible).length}`} />
            <Metric label="Sobres abiertos" value={`${state.packsOpened}`} />
            <Metric label="Jefes derrotados" value={`${state.bossesDefeated}`} />
            <Metric label="Fragmentos" value={`${state.clarityFragments}`} />
            <Metric label="Llaves mentales" value={`${state.mentalKeys}`} />
            <Metric label="Juicio Extremo" value={state.extremeJudgmentUnlocked ? "Desbloqueado" : "Bloqueado"} />
            <Metric label="Intentos extremos" value={`${attempts.length}`} />
            <Metric label="Mejor Juicio" value={`${bestScore}`} />
            <Metric label="Lore desbloqueado" value={`${state.unlockedLoreEntries.length}/${loreEntries.length}`} />
            <Metric label="Finales obtenidos" value={`${state.unlockedEndings.length}`} />
            <Metric label="Logros" value={`${progression.unlockedAchievementIds.length}`} />
            <Metric label="Cosmeticos" value={`${progression.unlockedCosmeticIds.length}`} />
          </div>
          <section className="mt-6">
            <h2 className="text-2xl font-black">Titulos desbloqueados</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {state.unlockedTitles.map((title) => (
                <span key={title} className="rounded border border-amber-100/25 bg-amber-100/10 px-3 py-2 text-sm font-black text-amber-100">
                  {title}
                </span>
              ))}
            </div>
          </section>
        </div>
        <UnlockTimeline entries={state.timeline} />
      </section>
      <section className="relative z-10 mx-auto mt-5 grid w-full max-w-7xl gap-5 lg:grid-cols-2">
        <TitleSelector />
        <UnlockedCosmetics />
      </section>
      <section className="relative z-10 mx-auto mt-5 grid w-full max-w-7xl gap-5 lg:grid-cols-2">
        <AchievementShowcase />
        <div className="grid gap-5">
          <CloudSaveButton />
          <FavoriteDeckPanel />
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/35 p-4">
      <p className="text-xs font-black uppercase text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}
