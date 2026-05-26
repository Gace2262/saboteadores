"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Card } from "@/data/cards";
import type { GameModeId } from "@/data/gameModes";
import { getArenaRank } from "@/data/arenaRanks";
import { getDraftOffer } from "@/data/draftPools";
import { useProgressionStore } from "./progressionStore";

export type ModeProgress = {
  plays: number;
  wins: number;
  bestScore: number;
  bestWave: number;
  bossRushBestIndex: number;
  arenaWins: number;
  unlockedRewards: string[];
};

type ModeStore = {
  records: Record<GameModeId, ModeProgress>;
  draftDeck: Card[];
  draftPick: number;
  draftOffer: Card[];
  chaosSeed: number;
  coopSharedResources: boolean;
  mirrorCorruption: number;
  startDraft: () => void;
  chooseDraftCard: (cardId: string) => void;
  completeModeRun: (modeId: GameModeId, input?: { won?: boolean; score?: number; wave?: number; bossIndex?: number; reward?: string }) => void;
  spinChaos: () => void;
  toggleCoopResources: () => void;
  raiseMirrorCorruption: () => void;
};

const blankProgress = (): ModeProgress => ({
  plays: 0,
  wins: 0,
  bestScore: 0,
  bestWave: 0,
  bossRushBestIndex: 0,
  arenaWins: 0,
  unlockedRewards: [],
});

const modeIds: GameModeId[] = ["draft", "survival", "boss-rush", "chaos", "arena", "co-op", "mirror", "mutant"];

const makeInitialRecords = () =>
  modeIds.reduce<Record<GameModeId, ModeProgress>>((acc, id) => {
    acc[id] = blankProgress();
    return acc;
  }, {} as Record<GameModeId, ModeProgress>);

export const useModeStore = create<ModeStore>()(
  persist(
    (set, get) => ({
      records: makeInitialRecords(),
      draftDeck: [],
      draftPick: 0,
      draftOffer: getDraftOffer(1),
      chaosSeed: 0,
      coopSharedResources: true,
      mirrorCorruption: 15,

      startDraft: () => set({ draftDeck: [], draftPick: 1, draftOffer: getDraftOffer(Date.now()) }),

      chooseDraftCard: (cardId) => {
        const state = get();
        const chosen = state.draftOffer.find((card) => card.id === cardId);
        const nextPick = Math.min(30, state.draftPick + 1);
        const nextDeck = chosen ? [...state.draftDeck, chosen] : state.draftDeck;
        set({
          draftDeck: nextDeck,
          draftPick: nextPick,
          draftOffer: getDraftOffer(Date.now() + nextDeck.length * 11),
        });
        if (nextDeck.length >= 30) {
          get().completeModeRun("draft", { won: true, score: nextDeck.length * 12, reward: "borde-borrador-corrupto" });
        }
      },

      completeModeRun: (modeId, input) =>
        set((state) => {
          const current = state.records[modeId] ?? blankProgress();
          const arenaWins = current.arenaWins + (modeId === "arena" && input?.won ? 1 : 0);
          const reward = input?.reward ?? (modeId === "arena" ? getArenaRank(arenaWins).reward : undefined);
          const next: ModeProgress = {
            plays: current.plays + 1,
            wins: current.wins + (input?.won ? 1 : 0),
            bestScore: Math.max(current.bestScore, input?.score ?? 0),
            bestWave: Math.max(current.bestWave, input?.wave ?? 0),
            bossRushBestIndex: Math.max(current.bossRushBestIndex, input?.bossIndex ?? 0),
            arenaWins,
            unlockedRewards: reward ? Array.from(new Set([...current.unlockedRewards, reward])) : current.unlockedRewards,
          };
          if (reward) useProgressionStore.getState().unlockCosmetic(reward.toLowerCase().replaceAll(" ", "-"), reward);
          return { records: { ...state.records, [modeId]: next } };
        }),

      spinChaos: () => set((state) => ({ chaosSeed: state.chaosSeed + 1 })),
      toggleCoopResources: () => set((state) => ({ coopSharedResources: !state.coopSharedResources })),
      raiseMirrorCorruption: () => set((state) => ({ mirrorCorruption: Math.min(100, state.mirrorCorruption + 10) })),
    }),
    {
      name: "saboteadores-game-modes-v1",
    },
  ),
);
