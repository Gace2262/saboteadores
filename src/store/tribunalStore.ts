"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DynamicEvent } from "@/data/dynamicEvents";
import type { AmbientNarration } from "@/data/ambientNarration";
import type { TribunalAnomaly, MentalWeather } from "@/data/tribunalAnomalies";
import { pickAnomaly, pickDynamicEvent, pickNarration, calculateInstability, calculateJudgeAttention, resolveMentalWeather } from "@/logic/dynamic/tribunalEngine";
import { buildPlayerMemory, contextualMemoryLine, type PlayerMemorySnapshot } from "@/logic/dynamic/playerMemory";
import type { PlayerStats } from "@/data/playerStats";
import type { CardProgression } from "./evolutionStore";

export type TribunalMemory = {
  visitedScreens: Record<string, number>;
  eventsSeen: string[];
  anomaliesSeen: string[];
  unlockedDialogues: string[];
  playerStressHistory: number[];
  favoriteFaction?: string;
  mostUsedCard?: string;
  hardestBoss?: string;
  defeatCount: number;
  judgeAttention: number;
  tribunalInstability: number;
  anomalyChance: number;
};

type TribunalStore = {
  memory: TribunalMemory;
  weather: MentalWeather;
  activeEvent?: DynamicEvent;
  activeAnomaly?: TribunalAnomaly;
  activeNarration?: AmbientNarration;
  activeCardConversation?: string[];
  stableMode: boolean;
  disableAnomalies: boolean;
  reduceCorruptionVisuals: boolean;
  limitGlitches: boolean;
  streamerSafe: boolean;
  tick: number;
  visitScreen: (screen: string) => void;
  absorbContext: (input: { stats: PlayerStats; cardProgressions: Record<string, CardProgression>; selectedFactions?: string[]; extremeRuns?: number }) => void;
  recordStress: (stress: number) => void;
  recordJudgeUse: (amount?: number) => void;
  triggerManualEvent: (seed?: number) => void;
  clearEvent: () => void;
  clearAnomaly: () => void;
  setCardConversation: (lines?: string[]) => void;
  toggleStableMode: () => void;
  toggleDisableAnomalies: () => void;
  toggleReduceCorruptionVisuals: () => void;
  toggleLimitGlitches: () => void;
  toggleStreamerSafe: () => void;
};

const initialMemory: TribunalMemory = {
  visitedScreens: {},
  eventsSeen: [],
  anomaliesSeen: [],
  unlockedDialogues: [],
  playerStressHistory: [],
  defeatCount: 0,
  judgeAttention: 0,
  tribunalInstability: 0,
  anomalyChance: 8,
};

const fallbackStats = {
  gamesPlayed: 0,
  defeats: 0,
  stressAccumulated: 0,
  catarsisActivated: 0,
} as PlayerStats;

export const useTribunalStore = create<TribunalStore>()(
  persist(
    (set) => ({
      memory: initialMemory,
      weather: "calma",
      stableMode: false,
      disableAnomalies: false,
      reduceCorruptionVisuals: false,
      limitGlitches: false,
      streamerSafe: false,
      tick: 0,

      visitScreen: (screen) =>
        set((state) => {
          const visitedScreens = { ...state.memory.visitedScreens, [screen]: (state.memory.visitedScreens[screen] ?? 0) + 1 };
          return { memory: { ...state.memory, visitedScreens }, tick: state.tick + 1 };
        }),

      absorbContext: ({ stats, cardProgressions, selectedFactions, extremeRuns = 0 }) =>
        set((state) => {
          const memorySnapshot: PlayerMemorySnapshot = buildPlayerMemory({
            stats: stats ?? fallbackStats,
            cardProgressions,
            selectedFactions,
            lastBoss: state.memory.hardestBoss,
          });
          const signals = {
            stressHistory: state.memory.playerStressHistory,
            corruptionAverage: memorySnapshot.corruptionAverage,
            defeatCount: stats.defeats,
            judgeUseCount: memorySnapshot.judgeUseCount,
            extremeRuns,
            screenVisits: Object.values(state.memory.visitedScreens).reduce((sum, item) => sum + item, 0),
            streamerSafe: state.streamerSafe,
            stableMode: state.stableMode,
            memory: memorySnapshot,
          };
          const judgeAttention = calculateJudgeAttention(signals);
          const tribunalInstability = calculateInstability(signals);
          const weather = resolveMentalWeather(signals);
          const seed = Date.now() + state.tick + judgeAttention + tribunalInstability;
          const activeEvent = state.disableAnomalies ? undefined : pickDynamicEvent(signals, seed);
          const activeAnomaly = state.disableAnomalies ? undefined : pickAnomaly(signals, seed + 17);
          const activeNarration = pickNarration(weather, seed + 31);
          return {
            weather,
            activeEvent,
            activeAnomaly,
            activeNarration,
            memory: {
              ...state.memory,
              favoriteFaction: memorySnapshot.favoriteFaction,
              mostUsedCard: memorySnapshot.mostUsedCard,
              defeatCount: stats.defeats,
              judgeAttention,
              tribunalInstability,
              anomalyChance: Math.min(100, Math.round(8 + tribunalInstability * 0.35)),
              eventsSeen: activeEvent ? Array.from(new Set([activeEvent.id, ...state.memory.eventsSeen])).slice(0, 30) : state.memory.eventsSeen,
              anomaliesSeen: activeAnomaly ? Array.from(new Set([activeAnomaly.id, ...state.memory.anomaliesSeen])).slice(0, 30) : state.memory.anomaliesSeen,
              unlockedDialogues: Array.from(new Set([contextualMemoryLine(memorySnapshot), ...state.memory.unlockedDialogues])).slice(0, 30),
            },
            tick: state.tick + 1,
          };
        }),

      recordStress: (stress) =>
        set((state) => ({
          memory: {
            ...state.memory,
            playerStressHistory: [stress, ...state.memory.playerStressHistory].slice(0, 20),
          },
        })),

      recordJudgeUse: (amount = 1) =>
        set((state) => ({
          memory: {
            ...state.memory,
            judgeAttention: Math.min(100, state.memory.judgeAttention + amount * 4),
          },
        })),

      triggerManualEvent: (seed = Date.now()) =>
        set((state) => {
          const memorySnapshot: PlayerMemorySnapshot = {
            favoriteFaction: state.memory.favoriteFaction,
            mostUsedCard: state.memory.mostUsedCard,
            hardestBoss: state.memory.hardestBoss,
            stressStyle: "ansioso",
            defeatCount: state.memory.defeatCount,
            judgeUseCount: state.memory.judgeAttention / 4,
            corruptionAverage: state.memory.tribunalInstability,
            catarsisNeglect: 0,
          };
          const signals = {
            stressHistory: state.memory.playerStressHistory,
            corruptionAverage: state.memory.tribunalInstability,
            defeatCount: state.memory.defeatCount,
            judgeUseCount: state.memory.judgeAttention / 4,
            extremeRuns: 0,
            screenVisits: Object.values(state.memory.visitedScreens).reduce((sum, item) => sum + item, 0),
            streamerSafe: state.streamerSafe,
            stableMode: state.stableMode,
            memory: memorySnapshot,
          };
          return { activeEvent: pickDynamicEvent(signals, seed) ?? state.activeEvent, activeAnomaly: pickAnomaly(signals, seed + 1) ?? state.activeAnomaly };
        }),

      clearEvent: () => set({ activeEvent: undefined }),
      clearAnomaly: () => set({ activeAnomaly: undefined }),
      setCardConversation: (activeCardConversation) => set({ activeCardConversation }),
      toggleStableMode: () => set((state) => ({ stableMode: !state.stableMode, activeEvent: undefined, activeAnomaly: undefined })),
      toggleDisableAnomalies: () => set((state) => ({ disableAnomalies: !state.disableAnomalies, activeEvent: undefined, activeAnomaly: undefined })),
      toggleReduceCorruptionVisuals: () => set((state) => ({ reduceCorruptionVisuals: !state.reduceCorruptionVisuals })),
      toggleLimitGlitches: () => set((state) => ({ limitGlitches: !state.limitGlitches })),
      toggleStreamerSafe: () => set((state) => ({ streamerSafe: !state.streamerSafe })),
    }),
    {
      name: "saboteadores-tribunal-vivo-v1",
      partialize: (state) => ({
        memory: state.memory,
        weather: state.weather,
        stableMode: state.stableMode,
        disableAnomalies: state.disableAnomalies,
        reduceCorruptionVisuals: state.reduceCorruptionVisuals,
        limitGlitches: state.limitGlitches,
        streamerSafe: state.streamerSafe,
      }),
    },
  ),
);
