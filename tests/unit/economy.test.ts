import { describe, expect, it } from "vitest";
import { packCosts, startingWallet } from "@/data/economyConfig";
import { canAfford, grant, spend } from "@/logic/economy/economyManager";
import { simulatePackOpening } from "@/logic/economy/rewardCalculator";

describe("economy", () => {
  it("does not allow negative spending", () => {
    const wallet = spend(startingWallet, { clarityFragments: 99999 });
    expect(wallet.clarityFragments).toBe(startingWallet.clarityFragments);
  });

  it("opens affordable basic pack cost", () => {
    expect(canAfford(startingWallet, packCosts.intrusivos)).toBe(true);
    const wallet = spend(startingWallet, packCosts.intrusivos);
    expect(wallet.clarityFragments).toBe(startingWallet.clarityFragments - 100);
  });

  it("simulates pity distribution", () => {
    const sim = simulatePackOpening("intrusivos", 100);
    expect(sim.openings).toBe(100);
    expect(Object.values(sim.distribution).reduce((sum, value) => sum + value, 0)).toBe(100);
  });

  it("grants currencies safely", () => {
    const wallet = grant(startingWallet, { tribunalSeals: 2 });
    expect(wallet.tribunalSeals).toBe(2);
  });
});
