"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ReputationId } from "@/data/factionWars";
import type { RelicId } from "@/data/worldRelics";
import type { SeasonId } from "@/data/seasons";
import type { WorldEvent, WorldEventId } from "@/data/worldEvents";
import { getWorldEvent } from "@/data/worldEvents";
import type { WorldRegionId } from "@/data/worldRegions";
import { pickGlobalEvent } from "@/logic/world/globalEventResolver";
import { calculateWorldSummary, clampReputation, defaultWorldReputations, type WorldReputationMap, type WorldSummary } from "@/logic/world/worldStateManager";

type WorldStore = {
  selectedRegionId: WorldRegionId;
  unlockedRegionIds: WorldRegionId[];
  discoveredSecrets: string[];
  ownedRelicIds: RelicId[];
  activeSeasonId: SeasonId;
  seenSeasonIds: SeasonId[];
  activeWorldEvent?: WorldEvent;
  seenWorldEventIds: WorldEventId[];
  reputations: WorldReputationMap;
  archiveLog: Record<string, number>;
  simplifiedMap: boolean;
  reduceParticles: boolean;
  cleanWorldMode: boolean;
  fullSubtitles: boolean;
  selectRegion: (regionId: WorldRegionId) => void;
  unlockRegion: (regionId: WorldRegionId) => void;
  discoverSecret: (secretId: string) => void;
  collectRelic: (relicId: RelicId) => void;
  setSeason: (seasonId: SeasonId) => void;
  triggerGlobalEvent: (eventId?: WorldEventId) => void;
  clearGlobalEvent: () => void;
  adjustReputation: (id: ReputationId, amount: number) => void;
  recordArchive: (entryId: string, amount?: number) => void;
  getSummary: () => WorldSummary;
  toggleFlag: (flag: "simplifiedMap" | "reduceParticles" | "cleanWorldMode" | "fullSubtitles") => void;
};

const initialRegion: WorldRegionId = "tribunal-craneo";
const initialSeason: SeasonId = "martillo-despierta";

export const useWorldStore = create<WorldStore>()(
  persist(
    (set, get) => ({
      selectedRegionId: initialRegion,
      unlockedRegionIds: [initialRegion, "mar-pensamientos", "catedral-culpa"],
      discoveredSecrets: [],
      ownedRelicIds: [],
      activeSeasonId: initialSeason,
      seenSeasonIds: [initialSeason],
      seenWorldEventIds: [],
      reputations: defaultWorldReputations(),
      archiveLog: {},
      simplifiedMap: false,
      reduceParticles: false,
      cleanWorldMode: false,
      fullSubtitles: true,

      selectRegion: (selectedRegionId) => set({ selectedRegionId }),
      unlockRegion: (regionId) =>
        set((state) => ({
          unlockedRegionIds: Array.from(new Set([...state.unlockedRegionIds, regionId])),
          selectedRegionId: regionId,
        })),
      discoverSecret: (secretId) => set((state) => ({ discoveredSecrets: Array.from(new Set([secretId, ...state.discoveredSecrets])) })),
      collectRelic: (relicId) => set((state) => ({ ownedRelicIds: Array.from(new Set([relicId, ...state.ownedRelicIds])) })),
      setSeason: (activeSeasonId) =>
        set((state) => ({
          activeSeasonId,
          seenSeasonIds: Array.from(new Set([activeSeasonId, ...state.seenSeasonIds])),
        })),
      triggerGlobalEvent: (eventId) =>
        set((state) => {
          const event = eventId ? getWorldEvent(eventId) : pickGlobalEvent({ seasonId: state.activeSeasonId, unlockedRegionIds: state.unlockedRegionIds, seenEventIds: state.seenWorldEventIds });
          return {
            activeWorldEvent: event,
            seenWorldEventIds: Array.from(new Set([event.id, ...state.seenWorldEventIds])),
          };
        }),
      clearGlobalEvent: () => set({ activeWorldEvent: undefined }),
      adjustReputation: (id, amount) =>
        set((state) => ({
          reputations: {
            ...state.reputations,
            [id]: clampReputation((state.reputations[id] ?? 0) + amount),
          },
        })),
      recordArchive: (entryId, amount = 1) =>
        set((state) => ({
          archiveLog: { ...state.archiveLog, [entryId]: (state.archiveLog[entryId] ?? 0) + amount },
        })),
      getSummary: () => {
        const state = get();
        return calculateWorldSummary({
          unlockedRegionIds: state.unlockedRegionIds,
          seasonId: state.activeSeasonId,
          reputations: state.reputations,
          activeEventCount: state.activeWorldEvent ? 1 : 0,
        });
      },
      toggleFlag: (flag) => set((state) => ({ [flag]: !state[flag] } as Pick<WorldStore, typeof flag>)),
    }),
    {
      name: "saboteadores-world-universe-v1",
      partialize: (state) => ({
        selectedRegionId: state.selectedRegionId,
        unlockedRegionIds: state.unlockedRegionIds,
        discoveredSecrets: state.discoveredSecrets,
        ownedRelicIds: state.ownedRelicIds,
        activeSeasonId: state.activeSeasonId,
        seenSeasonIds: state.seenSeasonIds,
        activeWorldEvent: state.activeWorldEvent,
        seenWorldEventIds: state.seenWorldEventIds,
        reputations: state.reputations,
        archiveLog: state.archiveLog,
        simplifiedMap: state.simplifiedMap,
        reduceParticles: state.reduceParticles,
        cleanWorldMode: state.cleanWorldMode,
        fullSubtitles: state.fullSubtitles,
      }),
    },
  ),
);
