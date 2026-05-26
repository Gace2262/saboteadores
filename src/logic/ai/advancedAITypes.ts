import type { Card } from "@/data/cards";
import type { FactionId } from "@/data/factions";
import type { Keyword } from "@/data/keywords";
import type { AIDifficultyId, AIGameStateSnapshot, AIProfile } from "./aiTypes";

export type PlayerPattern =
  | "stress_overuse"
  | "card_dependency"
  | "defensive"
  | "aggressive"
  | "slow_deck"
  | "combo_deck"
  | "chain_abuse"
  | "catarsis_frequent"
  | "evasion"
  | "irony_random";

export type PlayerPatternReport = {
  dominantStyle: PlayerPattern;
  confidence: number;
  signals: Record<PlayerPattern, number>;
  favoriteCards: string[];
  repeatedCombos: string[];
  summary: string;
};

export type AIMemorySnapshot = {
  favoriteCards: string[];
  frequentCombos: string[];
  favoriteFactions: FactionId[];
  bossLosses: Partial<Record<FactionId, number>>;
  bossWins: Partial<Record<FactionId, number>>;
  dominantStyle: PlayerPattern;
  commonWeakness: "early_pressure" | "late_game" | "stress_spikes" | "low_defense" | "none";
};

export type BossPhaseId = "phase1" | "phase2" | "phase3" | "final";

export type BossIntent =
  | "attack"
  | "block"
  | "heal"
  | "prepare_combo"
  | "invoke_crisis"
  | "punish_stress"
  | "protect"
  | "transform";

export type AdvancedAIWeights = {
  sentence: number;
  chain: number;
  punishStress: number;
  directDamage: number;
  healing: number;
  denyOptions: number;
  resourceControl: number;
  chaos: number;
  counter: number;
  memoryUse: number;
  variety: number;
};

export type AdvancedBossProfile = {
  id: FactionId;
  title: string;
  weights: AdvancedAIWeights;
  weaknesses: Keyword[];
  preferredCombo: Keyword[];
  forbiddenCounters: Keyword[];
  phasePlan: Record<BossPhaseId, string>;
};

export type AdvancedAIDecisionScore = {
  card: Card;
  score: number;
  reasons: string[];
};

export type AIComboPlan = {
  cards: Card[];
  totalCost: number;
  score: number;
  keywords: Keyword[];
  reason: string;
};

export type BossStrategyInput = {
  gameState: AIGameStateSnapshot;
  bossProfile: AIProfile;
  difficulty: AIDifficultyId;
  playerPatternMemory: AIMemorySnapshot;
  currentPhase: BossPhaseId;
  availableCards: Card[];
  seed: number;
};

export type BossStrategyDecision = {
  selectedCards: Card[];
  selectedAction?: Card;
  confidence: number;
  intent: BossIntent;
  reason: string;
  dialogueLine: string;
  scores: AdvancedAIDecisionScore[];
  combo?: AIComboPlan;
  fairnessWarnings: string[];
};
