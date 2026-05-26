import { describe, expect, it } from "vitest";
import { demoCoreCards } from "@/data/cards";
import { createEnemyDeck, createPlayerDeck } from "@/logic/createDeck";
import { chooseEnemyCard } from "@/logic/enemyAI";
import { resolveSimpleCardEffect } from "@/logic/resolveCardEffect";
import { useRealGameStore } from "@/store/gameStore";

describe("real demo core", () => {
  it("has 24 playable demo cards", () => {
    expect(demoCoreCards).toHaveLength(24);
    expect(demoCoreCards.every((card) => card.id && card.name && card.effectText)).toBe(true);
  });

  it("creates a playable player deck and enemy deck", () => {
    expect(createPlayerDeck("oficina-control").length).toBe(24);
    expect(createEnemyDeck().length).toBeGreaterThanOrEqual(20);
  });

  it("applies damage, healing, stress and block effects", () => {
    const card = demoCoreCards.find((item) => item.id === "orden-absoluto");
    if (!card) throw new Error("missing card");
    const result = resolveSimpleCardEffect({
      card,
      caster: "player",
      player: { will: 20, clarity: 3, stress: 0, mentalNoise: 0, blocked: false },
      enemy: { will: 35, clarity: 3, stress: 0, mentalNoise: 0, blocked: false },
      hand: [],
      enemyHand: [],
      deck: [],
      enemyDeck: [],
    });
    expect(result.enemy.will).toBe(32);
    expect(result.enemy.blocked).toBe(true);
  });

  it("enemy AI chooses lethal damage when possible", () => {
    const lethal = demoCoreCards.find((item) => item.damage >= 7);
    if (!lethal) throw new Error("missing lethal card");
    const choice = chooseEnemyCard(
      { will: 20, clarity: 10, stress: 0, mentalNoise: 0, blocked: false },
      { will: 5, clarity: 3, stress: 0, mentalNoise: 0, blocked: false },
      [lethal],
    );
    expect(choice?.id).toBe(lethal.id);
  });

  it("store can start a demo battle and play a card", () => {
    useRealGameStore.getState().startDemoBattle("oficina-control");
    const first = useRealGameStore.getState().hand[0];
    expect(useRealGameStore.getState().player.will).toBe(30);
    expect(useRealGameStore.getState().enemy.will).toBe(45);
    useRealGameStore.getState().playDemoCard(first.id);
    expect(useRealGameStore.getState().discard.some((card) => card.id === first.id)).toBe(true);
  });
});
