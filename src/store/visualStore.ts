"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VisualEffect, Card } from "@/data/cards";
import type { VisualThemeId } from "@/styles/cardThemes";

export type BoardMood = "calm" | "stressed" | "cursed" | "judgment" | "liberation" | "chaos";
export type AnimationMode = "full" | "reduced" | "minimal";

export type VisualCinematic = {
  id: number;
  card: Card;
  effectType: VisualEffect;
  impactText: string;
};

type VisualState = {
  currentCinematic?: VisualCinematic;
  screenShakeIntensity: number;
  fogIntensity: number;
  visualIntensity: number;
  reducedMotion: boolean;
  subtitlesEnabled: boolean;
  activeParticles: boolean;
  boardMood: BoardMood;
  animationMode: AnimationMode;
  visualTheme: VisualThemeId;
  textScale: number;
  lowPerformance: boolean;
  disableFlashes: boolean;
  triggerCinematic: (cinematic: Omit<VisualCinematic, "id">) => void;
  clearCinematic: () => void;
  setBoardMood: (mood: BoardMood) => void;
  setFogIntensity: (value: number) => void;
  setScreenShakeIntensity: (value: number) => void;
  setVisualIntensity: (value: number) => void;
  setAnimationMode: (mode: AnimationMode) => void;
  setVisualTheme: (theme: VisualThemeId) => void;
  setTextScale: (value: number) => void;
  toggleFlag: (flag: "reducedMotion" | "subtitlesEnabled" | "activeParticles" | "lowPerformance" | "disableFlashes") => void;
};

export const useVisualStore = create<VisualState>()(
  persist(
    (set) => ({
      screenShakeIntensity: 0,
      fogIntensity: 0,
      visualIntensity: 0.8,
      reducedMotion: false,
      subtitlesEnabled: true,
      activeParticles: true,
      boardMood: "calm",
      animationMode: "full",
      visualTheme: "dark-court",
      textScale: 1,
      lowPerformance: false,
      disableFlashes: false,
      triggerCinematic: (cinematic) => set({ currentCinematic: { ...cinematic, id: Date.now() } }),
      clearCinematic: () => set({ currentCinematic: undefined, screenShakeIntensity: 0 }),
      setBoardMood: (boardMood) => set({ boardMood }),
      setFogIntensity: (fogIntensity) => set({ fogIntensity: Math.max(0, Math.min(1, fogIntensity)) }),
      setScreenShakeIntensity: (screenShakeIntensity) => set({ screenShakeIntensity: Math.max(0, Math.min(1, screenShakeIntensity)) }),
      setVisualIntensity: (visualIntensity) => set({ visualIntensity: Math.max(0, Math.min(1, visualIntensity)) }),
      setAnimationMode: (animationMode) => set({ animationMode }),
      setVisualTheme: (visualTheme) => set({ visualTheme }),
      setTextScale: (textScale) => set({ textScale: Math.max(0.85, Math.min(1.2, textScale)) }),
      toggleFlag: (flag) => set((state) => ({ [flag]: !state[flag] } as Pick<VisualState, typeof flag>)),
    }),
    {
      name: "saboteadores-visual-v1",
      partialize: (state) => ({
        visualIntensity: state.visualIntensity,
        reducedMotion: state.reducedMotion,
        subtitlesEnabled: state.subtitlesEnabled,
        activeParticles: state.activeParticles,
        animationMode: state.animationMode,
        visualTheme: state.visualTheme,
        textScale: state.textScale,
        lowPerformance: state.lowPerformance,
        disableFlashes: state.disableFlashes,
      }),
    },
  ),
);
