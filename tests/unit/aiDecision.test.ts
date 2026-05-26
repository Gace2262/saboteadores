import { describe, expect, it } from "vitest";
import { allCards } from "@/data/cards";
import { getAIProfile } from "@/logic/ai/aiProfiles";
import { chooseAICard } from "@/logic/ai/chooseAICard";

const enemyHand = allCards.filter((card) => card.cost <= 4).slice(0, 8);

describe("AI decision", () => {
  it("chooses a playable card", () => {
    const choice = chooseAICard(
      {
        player: { will: 10, clarity: 5, stress: 6, mentalNoise: 0, block: 0, mask: 0 },
        enemy: { will: 20, clarity: 4, stress: 0, mentalNoise: 0, block: 0, mask: 0 },
        hand: [],
        enemyHand,
        enemyDeck: [],
        enemyDiscard: [],
        turn: 3,
      },
      getAIProfile("juez"),
      "crisis",
    );
    expect(choice.card?.cost).toBeLessThanOrEqual(4);
  });
});
