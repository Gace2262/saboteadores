"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PackId } from "@/data/packs";
import { packCosts, type CurrencyWallet } from "@/data/economyConfig";
import { createWallet, grant, spend, canOpenPack } from "@/logic/economy/economyManager";
import { simulatePackOpening, type PackSimulation } from "@/logic/economy/rewardCalculator";
import { balanceReward, type BalancedReward, type RewardInput } from "@/logic/balance/rewardBalancer";

type EconomyStore = {
  wallet: CurrencyWallet;
  pity: {
    packsSinceEpic: number;
    packsSinceLegendary: number;
  };
  openedPacks: number;
  lastReward?: BalancedReward;
  lastPackSimulation?: PackSimulation;
  advancedNumbersHidden: boolean;
  grantCurrencies: (reward: Partial<CurrencyWallet>) => void;
  spendCurrencies: (cost: Partial<CurrencyWallet>) => boolean;
  openEconomyPack: (packId: PackId) => boolean;
  simulatePack: (packId: PackId, openings?: number) => void;
  simulateReward: (input?: Partial<RewardInput>) => void;
  toggleAdvancedNumbers: () => void;
};

const defaultRewardInput: RewardInput = {
  context: "normal",
  difficultyMultiplier: 1,
  turns: 6,
  damageReceived: 4,
  finalStress: 2,
  cursedCardsUsed: 0,
  playerWill: 18,
};

export const useEconomyStore = create<EconomyStore>()(
  persist(
    (set, get) => ({
      wallet: createWallet(),
      pity: { packsSinceEpic: 0, packsSinceLegendary: 0 },
      openedPacks: 0,
      advancedNumbersHidden: false,
      grantCurrencies: (reward) => set((state) => ({ wallet: grant(state.wallet, reward) })),
      spendCurrencies: (cost) => {
        const state = get();
        if (!Object.entries(cost).every(([key, value]) => state.wallet[key as keyof CurrencyWallet] >= (value ?? 0))) return false;
        set({ wallet: spend(state.wallet, cost) });
        return true;
      },
      openEconomyPack: (packId) => {
        const state = get();
        if (!canOpenPack(state.wallet, packId)) return false;
        set({
          wallet: spend(state.wallet, packCosts[packId]),
          openedPacks: state.openedPacks + 1,
          pity: {
            packsSinceEpic: state.pity.packsSinceEpic + 1,
            packsSinceLegendary: state.pity.packsSinceLegendary + 1,
          },
        });
        return true;
      },
      simulatePack: (packId, openings = 100) => set({ lastPackSimulation: simulatePackOpening(packId, openings) }),
      simulateReward: (input) => {
        const reward = balanceReward({ ...defaultRewardInput, ...input });
        set((state) => ({ lastReward: reward, wallet: grant(state.wallet, reward.currencies) }));
      },
      toggleAdvancedNumbers: () => set((state) => ({ advancedNumbersHidden: !state.advancedNumbersHidden })),
    }),
    { name: "saboteadores-economy-v1" },
  ),
);
