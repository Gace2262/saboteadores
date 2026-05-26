"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DemoStepId } from "@/data/demoFlow";

export type GraphicsPreset = "minimal" | "balanced" | "cinematic" | "tribunal-insano";

export type PerformanceSnapshot = {
  fps: number;
  particles: number;
  audioLayers: number;
  activeCinematics: number;
  visualMemory: number;
};

type BuildStore = {
  demoStepId: DemoStepId;
  completedDemoSteps: DemoStepId[];
  graphicsPreset: GraphicsPreset;
  streamerMode: boolean;
  lowPerformanceMode: boolean;
  screenshotMode: boolean;
  detectedPerformance: PerformanceSnapshot;
  feedbackLog: string[];
  demoAchievements: string[];
  setDemoStep: (stepId: DemoStepId) => void;
  completeDemoStep: (stepId: DemoStepId) => void;
  resetDemo: () => void;
  setGraphicsPreset: (preset: GraphicsPreset) => void;
  toggleStreamerMode: () => void;
  toggleLowPerformanceMode: () => void;
  toggleScreenshotMode: () => void;
  updatePerformance: (snapshot: Partial<PerformanceSnapshot>) => void;
  recordFeedback: (message: string) => void;
  unlockDemoAchievement: (id: string) => void;
};

const initialPerformance: PerformanceSnapshot = {
  fps: 60,
  particles: 42,
  audioLayers: 4,
  activeCinematics: 0,
  visualMemory: 38,
};

export const useBuildStore = create<BuildStore>()(
  persist(
    (set) => ({
      demoStepId: "intro",
      completedDemoSteps: [],
      graphicsPreset: "balanced",
      streamerMode: false,
      lowPerformanceMode: false,
      screenshotMode: false,
      detectedPerformance: initialPerformance,
      feedbackLog: [],
      demoAchievements: [],
      setDemoStep: (demoStepId) => set({ demoStepId }),
      completeDemoStep: (stepId) =>
        set((state) => ({
          completedDemoSteps: Array.from(new Set([...state.completedDemoSteps, stepId])),
          demoStepId: stepId,
        })),
      resetDemo: () => set({ demoStepId: "intro", completedDemoSteps: [] }),
      setGraphicsPreset: (graphicsPreset) =>
        set({
          graphicsPreset,
          lowPerformanceMode: graphicsPreset === "minimal",
          streamerMode: graphicsPreset === "minimal",
        }),
      toggleStreamerMode: () => set((state) => ({ streamerMode: !state.streamerMode })),
      toggleLowPerformanceMode: () => set((state) => ({ lowPerformanceMode: !state.lowPerformanceMode })),
      toggleScreenshotMode: () => set((state) => ({ screenshotMode: !state.screenshotMode })),
      updatePerformance: (snapshot) => set((state) => ({ detectedPerformance: { ...state.detectedPerformance, ...snapshot } })),
      recordFeedback: (message) => set((state) => ({ feedbackLog: [message, ...state.feedbackLog].slice(0, 12) })),
      unlockDemoAchievement: (id) => set((state) => ({ demoAchievements: Array.from(new Set([id, ...state.demoAchievements])) })),
    }),
    {
      name: "saboteadores-build-demo-v1",
    },
  ),
);
