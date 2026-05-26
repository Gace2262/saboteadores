import type { WorkshopCategoryId } from "@/data/workshopCategories";
import type { CommunityTag } from "@/data/communityTags";
import type { ProceduralDifficulty } from "@/logic/procedural/proceduralTypes";

export type WorkshopWarning = "flashing" | "loud_audio" | "psychological_horror" | "intense_corruption" | "difficult_gameplay" | "burnout_themes";
export type WorkshopLanguage = "es-CL" | "es" | "en" | "pt-BR";
export type WorkshopReaction = "martillazo_aprobado" | "estrategicamente_traumatico" | "ansiedad_aplaude" | "elegante_insano" | "tribunal_incomodo";

export type WorkshopDependency = {
  id: string;
  version: string;
  type: "mod" | "expansion";
};

export type CommunitySeed = {
  seedText: string;
  difficulty: ProceduralDifficulty;
  finalBoss: string;
  winRate: number;
  averageMinutes: number;
};

export type CommunityChallenge = {
  id: string;
  type: "boss_rush" | "max_stress" | "no_catarsis" | "common_only" | "extreme_judgment" | "cursed_run" | "speedrun" | "chaos_draft";
  rules: string[];
  rewardTitle: string;
};

export type CommunityRunReplay = {
  seedText: string;
  eventLog: string[];
  keyDecisions: string[];
  routeNodeIds: string[];
  checksum: string;
};

export type WorkshopContent = {
  id: string;
  title: string;
  description: string;
  type: WorkshopCategoryId;
  creatorId: string;
  creatorName: string;
  tags: CommunityTag[];
  difficulty: ProceduralDifficulty;
  warnings: WorkshopWarning[];
  language: WorkshopLanguage;
  dependencies: WorkshopDependency[];
  checksum: string;
  createdAt: string;
  seed?: CommunitySeed;
  challenge?: CommunityChallenge;
  replay?: CommunityRunReplay;
  payload: unknown;
};

export type WorkshopValidationReport = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export type WorkshopRating = {
  contentId: string;
  reactions: Partial<Record<WorkshopReaction, number>>;
  favorite: boolean;
  played: number;
  exported: number;
};

export type CreatorProfileData = {
  id: string;
  name: string;
  title: string;
  frequentTags: CommunityTag[];
  publishedCount: number;
};
