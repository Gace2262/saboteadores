"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FactionId } from "@/data/factions";
import type { BossIntent, BossStrategyDecision, PlayerPatternReport } from "@/logic/ai/advancedAITypes";
import type { AIDifficultyId } from "@/logic/ai/aiTypes";
import { emptyAIMemory, updateAIMemory } from "@/logic/ai/aiMemorySystem";

export type AIDecisionLogEntry = {
  id: string;
  bossId: FactionId;
  intent: BossIntent;
  reason: string;
  confidence: number;
  dialogueLine: string;
  fairnessWarnings: string[];
  selectedCardIds: string[];
  createdAt: string;
};

type AIState = {
  difficulty: AIDifficultyId;
  memory: ReturnType<typeof emptyAIMemory>;
  lastPattern?: PlayerPatternReport;
  decisionLog: AIDecisionLogEntry[];
  setDifficulty: (difficulty: AIDifficultyId) => void;
  recordPattern: (pattern: PlayerPatternReport) => void;
  recordBossResult: (bossId: FactionId, result: "win" | "loss") => void;
  pushDecision: (bossId: FactionId, decision: BossStrategyDecision) => void;
  resetAIMemory: () => void;
};

const makeId = () => `ai_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const useAIStore = create<AIState>()(
  persist(
    (set) => ({
      difficulty: "crisis",
      memory: emptyAIMemory(),
      decisionLog: [],
      setDifficulty: (difficulty) => set({ difficulty }),
      recordPattern: (pattern) =>
        set((state) => ({
          lastPattern: pattern,
          memory: updateAIMemory(state.memory, pattern, []),
        })),
      recordBossResult: (bossId, result) =>
        set((state) => ({
          memory: updateAIMemory(
            state.memory,
            state.lastPattern ?? {
              dominantStyle: state.memory.dominantStyle,
              confidence: 0,
              signals: {
                stress_overuse: 0,
                card_dependency: 0,
                defensive: 0,
                aggressive: 0,
                slow_deck: 0,
                combo_deck: 0,
                chain_abuse: 0,
                catarsis_frequent: 0,
                evasion: 0,
                irony_random: 0,
              },
              favoriteCards: [],
              repeatedCombos: [],
              summary: "Sin patron reciente.",
            },
            [],
            bossId,
            result,
          ),
        })),
      pushDecision: (bossId, decision) =>
        set((state) => ({
          decisionLog: [
            {
              id: makeId(),
              bossId,
              intent: decision.intent,
              reason: decision.reason,
              confidence: decision.confidence,
              dialogueLine: decision.dialogueLine,
              fairnessWarnings: decision.fairnessWarnings,
              selectedCardIds: decision.selectedCards.map((card) => card.id),
              createdAt: new Date().toISOString(),
            },
            ...state.decisionLog,
          ].slice(0, 20),
        })),
      resetAIMemory: () => set({ memory: emptyAIMemory(), lastPattern: undefined, decisionLog: [] }),
    }),
    { name: "saboteadores-ai-store", version: 1 },
  ),
);
