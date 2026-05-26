"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MusicLayerId, MusicThemeId } from "@/audio/musicTracks";
import type { AudioEventId } from "@/data/audioEvents";
import type { AdvancedMusicLayerId } from "@/data/musicLayers";

export type AudioSubtitle = {
  id: string;
  text: string;
  createdAt: number;
};

export type CinematicAudioEvent = "judgeEntrance" | "criticalHammer" | "legendaryCatharsis" | "mentalDefeat" | "judgeVictory";

type AudioState = {
  enabled: boolean;
  started: boolean;
  streamerSafe: boolean;
  reduceFlashes: boolean;
  reduceVibration: boolean;
  noDistortion: boolean;
  subtitlesEnabled: boolean;
  musicVolume: number;
  voiceVolume: number;
  effectsVolume: number;
  ambienceVolume: number;
  cinematicVolume: number;
  uiVolume: number;
  corruptionVolume: number;
  choirVolume: number;
  masterVolume: number;
  visualIntensity: number;
  battleIntensity: number;
  currentTheme: MusicThemeId;
  activeLayers: MusicLayerId[];
  advancedLayers: AdvancedMusicLayerId[];
  currentAudioEvent?: AudioEventId;
  whispersEnabled: boolean;
  tinnitusEnabled: boolean;
  reducedDynamicRange: boolean;
  bpm: number;
  subtitles: AudioSubtitle[];
  cinematicEvent?: CinematicAudioEvent;
  setStarted: (started: boolean) => void;
  toggleEnabled: () => void;
  setVolume: (key: "musicVolume" | "voiceVolume" | "effectsVolume" | "ambienceVolume" | "cinematicVolume" | "uiVolume" | "corruptionVolume" | "choirVolume" | "masterVolume", value: number) => void;
  setBattleIntensity: (value: number) => void;
  setTheme: (theme: MusicThemeId) => void;
  setActiveLayers: (layers: MusicLayerId[]) => void;
  setAdvancedLayers: (layers: AdvancedMusicLayerId[]) => void;
  triggerAudioEvent: (event: AudioEventId) => void;
  clearAudioEvent: () => void;
  setBpm: (bpm: number) => void;
  pushSubtitle: (text: string) => void;
  clearOldSubtitles: () => void;
  triggerCinematic: (event: CinematicAudioEvent) => void;
  clearCinematic: () => void;
  toggleFlag: (flag: "streamerSafe" | "reduceFlashes" | "reduceVibration" | "noDistortion" | "subtitlesEnabled" | "whispersEnabled" | "tinnitusEnabled" | "reducedDynamicRange") => void;
  setVisualIntensity: (value: number) => void;
};

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      enabled: true,
      started: false,
      streamerSafe: false,
      reduceFlashes: false,
      reduceVibration: false,
      noDistortion: false,
      subtitlesEnabled: true,
      musicVolume: 0.45,
      voiceVolume: 0.7,
      effectsVolume: 0.75,
      ambienceVolume: 0.42,
      cinematicVolume: 0.78,
      uiVolume: 0.45,
      corruptionVolume: 0.38,
      choirVolume: 0.48,
      masterVolume: 0.8,
      visualIntensity: 0.75,
      battleIntensity: 0,
      currentTheme: "home-ambient",
      activeLayers: ["base"],
      advancedLayers: ["base"],
      whispersEnabled: true,
      tinnitusEnabled: false,
      reducedDynamicRange: false,
      bpm: 64,
      subtitles: [],

      setStarted: (started) => set({ started }),
      toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
      setVolume: (key, value) => set({ [key]: Math.min(1, Math.max(0, value)) } as Pick<AudioState, typeof key>),
      setBattleIntensity: (battleIntensity) => set({ battleIntensity: Math.min(100, Math.max(0, Math.round(battleIntensity))) }),
      setTheme: (currentTheme) => set({ currentTheme }),
      setActiveLayers: (activeLayers) => set({ activeLayers }),
      setAdvancedLayers: (advancedLayers) => set({ advancedLayers }),
      triggerAudioEvent: (currentAudioEvent) => set({ currentAudioEvent }),
      clearAudioEvent: () => set({ currentAudioEvent: undefined }),
      setBpm: (bpm) => set({ bpm }),
      pushSubtitle: (text) =>
        set((state) => ({
          subtitles: [{ id: `${Date.now()}-${text}`, text, createdAt: Date.now() }, ...state.subtitles].slice(0, 4),
        })),
      clearOldSubtitles: () =>
        set((state) => ({
          subtitles: state.subtitles.filter((subtitle) => Date.now() - subtitle.createdAt < 3200),
        })),
      triggerCinematic: (cinematicEvent) => set({ cinematicEvent }),
      clearCinematic: () => set({ cinematicEvent: undefined }),
      toggleFlag: (flag) => set((state) => ({ [flag]: !state[flag] } as Pick<AudioState, typeof flag>)),
      setVisualIntensity: (visualIntensity) => set({ visualIntensity: Math.min(1, Math.max(0, visualIntensity)) }),
    }),
    {
      name: "saboteadores-audio-v1",
      partialize: (state) => ({
        enabled: state.enabled,
        streamerSafe: state.streamerSafe,
        reduceFlashes: state.reduceFlashes,
        reduceVibration: state.reduceVibration,
        noDistortion: state.noDistortion,
        subtitlesEnabled: state.subtitlesEnabled,
        musicVolume: state.musicVolume,
        voiceVolume: state.voiceVolume,
        effectsVolume: state.effectsVolume,
        ambienceVolume: state.ambienceVolume,
        cinematicVolume: state.cinematicVolume,
        uiVolume: state.uiVolume,
        corruptionVolume: state.corruptionVolume,
        choirVolume: state.choirVolume,
        masterVolume: state.masterVolume,
        visualIntensity: state.visualIntensity,
        whispersEnabled: state.whispersEnabled,
        tinnitusEnabled: state.tinnitusEnabled,
        reducedDynamicRange: state.reducedDynamicRange,
      }),
    },
  ),
);
