"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { achievements } from "@/data/achievements";
import { allMissionDefinitions, type MissionDefinition } from "@/data/missions";
import { initialPlayerStats, type PlayerStatKey, type PlayerStats } from "@/data/playerStats";
import { getTitle } from "@/data/titles";
import { weeklyChallenges } from "@/data/weeklyChallenges";

export type JudgmentNotificationType = "achievement" | "mission" | "title" | "reward" | "record";

export type JudgmentNotification = {
  id: string;
  type: JudgmentNotificationType;
  title: string;
  message: string;
};

type ProgressionState = {
  stats: PlayerStats;
  completedMissionIds: string[];
  completedWeeklyIds: string[];
  unlockedAchievementIds: string[];
  unlockedTitleIds: string[];
  selectedTitleId?: string;
  unlockedCosmeticIds: string[];
  rewardVault: {
    clarityFragments: number;
    packs: string[];
    cards: string[];
    effects: string[];
  };
  notifications: JudgmentNotification[];
  cleanCompetitiveMode: boolean;
  popupsDisabled: boolean;
  lastDailySeed: string;
  claimMission: (missionId: string) => void;
  claimWeekly: (challengeId: string) => void;
  incrementStat: (key: PlayerStatKey, amount?: number) => void;
  recordCardPlayed: (input: { faction: string; keywords: string[]; damage?: number; stressGain?: number; visualEffect?: string; type?: string }) => void;
  recordBattleResult: (input: { won: boolean; playerWill: number; maxStress: number; usedFactions: string[]; usedTypes: string[]; enemyId?: string }) => void;
  recordPackOpened: () => void;
  recordBossDefeated: () => void;
  recordLoreUnlocked: (count: number) => void;
  recordExtremeFinished: (won: boolean) => void;
  unlockAchievement: (achievementId: string) => void;
  unlockTitle: (titleId: string) => void;
  unlockCosmetic: (cosmeticId: string, label?: string) => void;
  selectTitle: (titleId?: string) => void;
  dismissNotification: (id: string) => void;
  togglePopups: () => void;
  toggleCleanCompetitiveMode: () => void;
};

const allProgressMissions = [...allMissionDefinitions, ...weeklyChallenges];

const todaySeed = () => new Date().toISOString().slice(0, 10);

const addNotification = (
  state: ProgressionState,
  notification: Omit<JudgmentNotification, "id">,
): Pick<ProgressionState, "notifications"> => ({
  notifications: state.popupsDisabled
    ? state.notifications
    : [{ ...notification, id: `${Date.now()}-${notification.type}` }, ...state.notifications].slice(0, 5),
});

const rewardLabel = (mission: MissionDefinition) => `${mission.reward.label}: ${mission.flavorText}`;

const addMissionReward = (state: ProgressionState, mission: MissionDefinition) => {
  const rewardVault = {
    clarityFragments: state.rewardVault.clarityFragments,
    packs: [...state.rewardVault.packs],
    cards: [...state.rewardVault.cards],
    effects: [...state.rewardVault.effects],
  };
  const unlockedTitleIds = [...state.unlockedTitleIds];
  const unlockedCosmeticIds = [...state.unlockedCosmeticIds];

  if (mission.reward.type === "fragmentos") rewardVault.clarityFragments += mission.reward.amount;
  if (mission.reward.type === "sobre") rewardVault.packs.push(mission.reward.packId);
  if (mission.reward.type === "carta") rewardVault.cards.push(mission.reward.cardId);
  if (mission.reward.type === "titulo") unlockedTitleIds.push(mission.reward.titleId);
  if (mission.reward.type === "cosmetico") {
    unlockedCosmeticIds.push(mission.reward.cosmeticId);
    rewardVault.effects.push(mission.reward.cosmeticId);
  }

  return {
    rewardVault,
    unlockedTitleIds: Array.from(new Set(unlockedTitleIds)),
    unlockedCosmeticIds: Array.from(new Set(unlockedCosmeticIds)),
  };
};

const completeReadyMissions = (state: ProgressionState, stats: PlayerStats) => {
  const completedMissionIds = [...state.completedMissionIds];
  const completedWeeklyIds = [...state.completedWeeklyIds];
  const notifications: JudgmentNotification[] = [...state.notifications];
  const unlockedTitleIds = [...state.unlockedTitleIds];
  const unlockedCosmeticIds = [...state.unlockedCosmeticIds];
  let rewardVault = state.rewardVault;

  allProgressMissions.forEach((mission) => {
    const progress = stats[mission.statKey as PlayerStatKey] ?? 0;
    const isWeekly = mission.category === "semanal";
    const completed = isWeekly ? completedWeeklyIds.includes(mission.id) : completedMissionIds.includes(mission.id);
    if (completed || progress < mission.target) return;

    if (isWeekly) completedWeeklyIds.push(mission.id);
    else completedMissionIds.push(mission.id);
    const rewardState = addMissionReward({ ...state, unlockedTitleIds, unlockedCosmeticIds, rewardVault }, mission);
    rewardVault = rewardState.rewardVault;
    unlockedTitleIds.splice(0, unlockedTitleIds.length, ...rewardState.unlockedTitleIds);
    unlockedCosmeticIds.splice(0, unlockedCosmeticIds.length, ...rewardState.unlockedCosmeticIds);
    if (!state.popupsDisabled) {
      notifications.unshift({
        id: `${Date.now()}-${mission.id}`,
        type: "mission",
        title: "MISION COMPLETADA",
        message: `${mission.title}: ${rewardLabel(mission)}`,
      });
    }
  });

  return {
    completedMissionIds: Array.from(new Set(completedMissionIds)),
    completedWeeklyIds: Array.from(new Set(completedWeeklyIds)),
    unlockedTitleIds: Array.from(new Set(unlockedTitleIds)),
    unlockedCosmeticIds: Array.from(new Set(unlockedCosmeticIds)),
    rewardVault,
    notifications: notifications.slice(0, 5),
  };
};

const completeReadyAchievements = (state: ProgressionState, stats: PlayerStats) => {
  const unlockedAchievementIds = [...state.unlockedAchievementIds];
  const unlockedTitleIds = [...state.unlockedTitleIds];
  const unlockedCosmeticIds = [...state.unlockedCosmeticIds];
  const notifications: JudgmentNotification[] = [...state.notifications];

  achievements.forEach((achievement) => {
    if (unlockedAchievementIds.includes(achievement.id)) return;
    const progress = stats[achievement.statKey as PlayerStatKey] ?? 0;
    if (progress < achievement.target) return;
    unlockedAchievementIds.push(achievement.id);
    if (achievement.reward.type === "titulo") unlockedTitleIds.push(achievement.reward.id);
    if (achievement.reward.type === "cosmetico") unlockedCosmeticIds.push(achievement.reward.id);
    if (!state.popupsDisabled) {
      notifications.unshift({
        id: `${Date.now()}-${achievement.id}`,
        type: "achievement",
        title: "LOGRO DESBLOQUEADO",
        message: `${achievement.title}: ${achievement.flavorText}`,
      });
    }
  });

  return {
    unlockedAchievementIds: Array.from(new Set(unlockedAchievementIds)),
    unlockedTitleIds: Array.from(new Set(unlockedTitleIds)),
    unlockedCosmeticIds: Array.from(new Set(unlockedCosmeticIds)),
    notifications: notifications.slice(0, 5),
  };
};

const advance = (state: ProgressionState, updates: Partial<PlayerStats>) => {
  const stats = { ...state.stats };
  Object.entries(updates).forEach(([key, value]) => {
    stats[key as PlayerStatKey] = Math.max(0, (stats[key as PlayerStatKey] ?? 0) + (value ?? 0));
  });
  return {
    stats,
    ...completeReadyMissions(state, stats),
    ...completeReadyAchievements(state, stats),
  };
};

export const useProgressionStore = create<ProgressionState>()(
  persist(
    (set, get) => ({
      stats: initialPlayerStats,
      completedMissionIds: [],
      completedWeeklyIds: [],
      unlockedAchievementIds: [],
      unlockedTitleIds: ["funcionario-caos"],
      selectedTitleId: "funcionario-caos",
      unlockedCosmeticIds: ["borde-carbon"],
      rewardVault: { clarityFragments: 0, packs: [], cards: [], effects: [] },
      notifications: [],
      cleanCompetitiveMode: false,
      popupsDisabled: false,
      lastDailySeed: todaySeed(),

      claimMission: (missionId) => {
        const mission = allMissionDefinitions.find((item) => item.id === missionId);
        if (!mission) return;
        set((state) => ({
          completedMissionIds: Array.from(new Set([...state.completedMissionIds, missionId])),
          ...addMissionReward(state, mission),
          ...addNotification(state, { type: "reward", title: "RECOMPENSA OBTENIDA", message: rewardLabel(mission) }),
        }));
      },

      claimWeekly: (challengeId) => {
        const challenge = weeklyChallenges.find((item) => item.id === challengeId);
        if (!challenge) return;
        set((state) => ({
          completedWeeklyIds: Array.from(new Set([...state.completedWeeklyIds, challengeId])),
          ...addMissionReward(state, challenge),
          ...addNotification(state, { type: "reward", title: "DESAFIO SEMANAL", message: rewardLabel(challenge) }),
        }));
      },

      incrementStat: (key, amount = 1) => set((state) => advance(state, { [key]: amount } as Partial<PlayerStats>)),

      recordCardPlayed: ({ faction, keywords, damage = 0, stressGain = 0, visualEffect }) => {
        const updates: Partial<PlayerStats> = {
          cardsUsed: 1,
          damageDealt: Math.max(0, damage),
          stressAccumulated: Math.max(0, stressGain),
        };
        if (keywords.includes("Catarsis")) updates.catarsisActivated = 1;
        if (keywords.includes("Sentencia")) updates.sentencesActivated = 1;
        if (keywords.includes("Cadena")) updates.cardsBlocked = 1;
        if (keywords.includes("Estampida") || visualEffect === "horse_stampede") updates.stampedesActivated = 1;
        if (faction === "hiperracional") updates.hiperrationalCardsUsed = 1;
        set((state) => advance(state, updates));
      },

      recordBattleResult: ({ won, playerWill, maxStress, usedFactions, usedTypes, enemyId }) => {
        const updates: Partial<PlayerStats> = {
          gamesPlayed: 1,
          victories: won ? 1 : 0,
          defeats: won ? 0 : 1,
          timePlayedMinutes: 8,
        };
        if (won && playerWill <= 1) updates.oneWillWins = 1;
        if (won && maxStress >= 10) updates.maxStressSurvived = maxStress;
        if (won && maxStress <= 3) updates.lowStressWins = 1;
        if (won && !usedTypes.includes("Crisis")) updates.noCrisisWins = 1;
        if (won && usedFactions.some((faction) => ["reservado", "evitador"].includes(faction))) updates.reservedOrAvoiderWins = 1;
        if (usedFactions.includes("juez") && usedFactions.includes("conciencia")) updates.judgeAndConscienceGames = 1;
        if (!won && enemyId === "juez" && get().stats.cardsUsed > 0) updates.legendaryJudgeLosses = 1;
        set((state) => advance(state, updates));
      },

      recordPackOpened: () => set((state) => advance(state, { packsOpened: 1 })),
      recordBossDefeated: () => set((state) => advance(state, { bossesDefeated: 1 })),
      recordLoreUnlocked: (count) => set((state) => ({ ...advance(state, { loreUnlocked: Math.max(0, count - state.stats.loreUnlocked) }) })),
      recordExtremeFinished: (won) => set((state) => advance(state, { extremeWins: won ? 1 : 0 })),

      unlockAchievement: (achievementId) =>
        set((state) => ({
          unlockedAchievementIds: Array.from(new Set([...state.unlockedAchievementIds, achievementId])),
          ...addNotification(state, { type: "achievement", title: "LOGRO DESBLOQUEADO", message: achievementId.replaceAll("-", " ") }),
        })),

      unlockTitle: (titleId) =>
        set((state) => ({
          unlockedTitleIds: Array.from(new Set([...state.unlockedTitleIds, titleId])),
          ...addNotification(state, { type: "title", title: "TITULO NUEVO", message: getTitle(titleId)?.name ?? titleId }),
        })),

      unlockCosmetic: (cosmeticId, label) =>
        set((state) => ({
          unlockedCosmeticIds: Array.from(new Set([...state.unlockedCosmeticIds, cosmeticId])),
          ...addNotification(state, { type: "reward", title: "COSMETICO OBTENIDO", message: label ?? cosmeticId.replaceAll("-", " ") }),
        })),

      selectTitle: (selectedTitleId) => set({ selectedTitleId }),
      dismissNotification: (id) => set((state) => ({ notifications: state.notifications.filter((item) => item.id !== id) })),
      togglePopups: () => set((state) => ({ popupsDisabled: !state.popupsDisabled })),
      toggleCleanCompetitiveMode: () => set((state) => ({ cleanCompetitiveMode: !state.cleanCompetitiveMode })),
    }),
    {
      name: "saboteadores-progression-v1",
    },
  ),
);
