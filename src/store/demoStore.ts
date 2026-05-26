"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DemoDeckId } from "@/data/demo/demoDecks";
import type { DemoStageId } from "@/data/demo/demoFlow";
import { DEMO_VERSION } from "@/data/demo/demoConfig";
import type { DemoFeedback } from "@/logic/demo/demoSave";

type DemoState = {
  currentStage: DemoStageId;
  completedStages: DemoStageId[];
  selectedDeck?: DemoDeckId;
  eventChoice?: "mirror" | "laugh" | "towel";
  evolvedCard?: string;
  bossOutcome?: "win" | "loss";
  lowPerformance: boolean;
  reducedMotion: boolean;
  reducedFlashes: boolean;
  subtitles: boolean;
  feedback: DemoFeedback[];
  setStage: (stage: DemoStageId) => void;
  completeStage: (stage: DemoStageId) => void;
  selectDeck: (deck: DemoDeckId) => void;
  chooseEvent: (choice: "mirror" | "laugh" | "towel") => void;
  evolveCard: (cardName: string) => void;
  setBossOutcome: (outcome: "win" | "loss") => void;
  toggleSetting: (key: "lowPerformance" | "reducedMotion" | "reducedFlashes" | "subtitles") => void;
  addFeedback: (feedback: Omit<DemoFeedback, "createdAt">) => void;
  resetDemo: () => void;
};

const uniqueStages = (stages: DemoStageId[]) => Array.from(new Set(stages));

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      currentStage: "home",
      completedStages: [],
      lowPerformance: false,
      reducedMotion: false,
      reducedFlashes: false,
      subtitles: true,
      feedback: [],
      setStage: (stage) => set({ currentStage: stage }),
      completeStage: (stage) => set((state) => ({ completedStages: uniqueStages([...state.completedStages, stage]), currentStage: stage })),
      selectDeck: (deck) => set({ selectedDeck: deck }),
      chooseEvent: (choice) => set({ eventChoice: choice }),
      evolveCard: (cardName) => set({ evolvedCard: cardName }),
      setBossOutcome: (outcome) => set({ bossOutcome: outcome }),
      toggleSetting: (key) => set((state) => ({ [key]: !state[key] })),
      addFeedback: (feedback) =>
        set((state) => ({
          feedback: [...state.feedback, { ...feedback, createdAt: new Date().toISOString() }],
        })),
      resetDemo: () =>
        set({
          currentStage: "home",
          completedStages: [],
          selectedDeck: undefined,
          eventChoice: undefined,
          evolvedCard: undefined,
          bossOutcome: undefined,
          feedback: [],
        }),
    }),
    { name: "saboteadores-demo-vertical", version: Number(DEMO_VERSION.replace(/\D/g, "").slice(0, 3)) || 1 },
  ),
);
