import { describe, expect, it } from "vitest";
import { balanceReward } from "@/logic/balance/rewardBalancer";

describe("reward system", () => {
  it("applies clean victory bonus", () => {
    const reward = balanceReward({ context: "normal", difficultyMultiplier: 1, turns: 5, damageReceived: 0, finalStress: 0, cursedCardsUsed: 0, playerWill: 20 });
    expect(reward.currencies.clarityFragments).toBeGreaterThan(55);
    expect(reward.bonuses).toContain("Victoria Limpia");
  });

  it("grants burnout ashes for high stress victory", () => {
    const reward = balanceReward({ context: "normal", difficultyMultiplier: 1, turns: 8, damageReceived: 10, finalStress: 10, cursedCardsUsed: 0, playerWill: 4 });
    expect(reward.currencies.burnoutAshes).toBe(2);
  });
});
