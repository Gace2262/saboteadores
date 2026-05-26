import { describe, expect, it } from "vitest";
import { allCards } from "@/data/cards";
import { resolveCardEffect, type CombatantSnapshot } from "@/logic/resolveCardEffect";

const base: CombatantSnapshot = { will: 20, clarity: 5, stress: 0, mentalNoise: 0, block: 0, mask: 0 };

function resolve(cardId: string, overrides: Partial<CombatantSnapshot> = {}) {
  const card = allCards.find((item) => item.id === cardId);
  if (!card) throw new Error(`Missing card ${cardId}`);
  return resolveCardEffect({
    card,
    caster: "player",
    player: { ...base, ...overrides },
    enemy: { ...base },
    hand: [],
    discard: [],
    enemyHand: allCards.slice(0, 3),
    enemyDiscard: [],
    maxWill: 30,
    maxClarity: 10,
    maxStress: 12,
    randomSeed: 4,
  });
}

describe("card effects", () => {
  it("applies direct damage", () => {
    const result = resolve("martillazo-realidad");
    expect(result.enemy.will).toBeLessThan(base.will);
  });

  it("adds block with Cadena", () => {
    const result = resolve("controlador-compulsivo");
    expect(result.enemy.block).toBeGreaterThan(0);
  });

  it("converts stress through Catarsis", () => {
    const result = resolve("grito-catarsis", { stress: 5 });
    expect(result.player.stress).toBe(0);
    expect(result.enemy.will).toBeLessThan(base.will);
  });
});
