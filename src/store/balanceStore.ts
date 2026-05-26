"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DifficultyMode } from "@/data/difficultyScaling";
import type { DifficultyInput } from "@/logic/balance/difficultyResolver";

type BalanceStore = {
  xpMultiplier: number;
  fragmentMultiplier: number;
  difficultyMode: DifficultyMode;
  rewardFrequency: number;
  dropRateMultiplier: number;
  lastDifficultyInput: DifficultyInput;
  setXpMultiplier: (value: number) => void;
  setFragmentMultiplier: (value: number) => void;
  setDifficultyMode: (mode: DifficultyMode) => void;
  setRewardFrequency: (value: number) => void;
  setDropRateMultiplier: (value: number) => void;
  setDifficultyInput: (input: Partial<DifficultyInput>) => void;
};

const defaultDifficultyInput: DifficultyInput = {
  mode: "adaptive-soft",
  recentWins: 2,
  recentLosses: 1,
  deckPower: 88,
  playerLevel: 8,
  corruptionAverage: 18,
  gameMode: "campaign",
};

export const useBalanceStore = create<BalanceStore>()(
  persist(
    (set) => ({
      xpMultiplier: 1,
      fragmentMultiplier: 1,
      difficultyMode: "adaptive-soft",
      rewardFrequency: 1,
      dropRateMultiplier: 1,
      lastDifficultyInput: defaultDifficultyInput,
      setXpMultiplier: (xpMultiplier) => set({ xpMultiplier: Math.max(0.2, Math.min(3, xpMultiplier)) }),
      setFragmentMultiplier: (fragmentMultiplier) => set({ fragmentMultiplier: Math.max(0.2, Math.min(3, fragmentMultiplier)) }),
      setDifficultyMode: (difficultyMode) =>
        set((state) => ({ difficultyMode, lastDifficultyInput: { ...state.lastDifficultyInput, mode: difficultyMode } })),
      setRewardFrequency: (rewardFrequency) => set({ rewardFrequency: Math.max(0.2, Math.min(3, rewardFrequency)) }),
      setDropRateMultiplier: (dropRateMultiplier) => set({ dropRateMultiplier: Math.max(0.2, Math.min(3, dropRateMultiplier)) }),
      setDifficultyInput: (input) => set((state) => ({ lastDifficultyInput: { ...state.lastDifficultyInput, ...input } })),
    }),
    {
      name: "saboteadores-balance-v1",
      partialize: (state) => ({
        xpMultiplier: state.xpMultiplier,
        fragmentMultiplier: state.fragmentMultiplier,
        difficultyMode: state.difficultyMode,
        rewardFrequency: state.rewardFrequency,
        dropRateMultiplier: state.dropRateMultiplier,
        lastDifficultyInput: state.lastDifficultyInput,
      }),
    },
  ),
);
