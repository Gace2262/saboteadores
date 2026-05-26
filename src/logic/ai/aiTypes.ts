import type { Card, VisualEffect } from "@/data/cards";
import type { FactionId } from "@/data/factions";
import type { Keyword } from "@/data/keywords";
import type { CombatantSnapshot } from "@/logic/resolveCardEffect";

export type AIDifficultyId = "susurro" | "crisis" | "juicio" | "tribunal-extremo";

export type AIDifficulty = {
  id: AIDifficultyId;
  name: string;
  text: string;
  randomness: number;
  comboLookahead: number;
  maxCardsPerTurn: number;
  aggressionMultiplier: number;
};

export type AIDecisionWeights = {
  aggression: number;
  defense: number;
  control: number;
  chaos: number;
  healing: number;
  stressPressure: number;
  cardDraw: number;
  comboPriority: number;
};

export type AITauntTrigger =
  | "combatStart"
  | "legendary"
  | "block"
  | "takeDamage"
  | "playerStressHigh"
  | "nearWin"
  | "lose"
  | "playCard";

export type AITaunts = Record<AITauntTrigger, string[]>;

export type AICombatPattern = {
  preferredKeywords: Keyword[];
  punishKeywords: Keyword[];
  preferredEffects: VisualEffect[];
  openingLine: string;
};

export type AIPersonality = {
  style: string;
  weakness: string;
  danger: string;
  warning: string;
  color: string;
};

export type AIProfile = {
  id: FactionId;
  name: string;
  displayName: string;
  personality: AIPersonality;
  weights: AIDecisionWeights;
  taunts: AITaunts;
  pattern: AICombatPattern;
};

export type AIGameStateSnapshot = {
  player: CombatantSnapshot;
  enemy: CombatantSnapshot;
  hand: Card[];
  enemyHand: Card[];
  enemyDeck: Card[];
  enemyDiscard: Card[];
  lastResolvedCard?: Card;
  turn: number;
};

export type AICardChoice = {
  card?: Card;
  score: number;
  reason: string;
};
