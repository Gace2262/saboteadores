import type { AITauntTrigger, AITaunts } from "./aiTypes";

export const emptyTaunts: AITaunts = {
  combatStart: [],
  legendary: [],
  block: [],
  takeDamage: [],
  playerStressHigh: [],
  nearWin: [],
  lose: [],
  playCard: [],
};

export function pickTaunt(taunts: AITaunts, trigger: AITauntTrigger, seed = Date.now()) {
  const pool = taunts[trigger] ?? [];
  if (!pool.length) return undefined;
  return pool[Math.abs(seed) % pool.length];
}
