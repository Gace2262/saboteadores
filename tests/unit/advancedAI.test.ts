import { describe, expect, it } from "vitest";
import { allCards, type Card } from "@/data/cards";
import { getAIProfile } from "@/logic/ai/aiProfiles";
import type { AIGameStateSnapshot } from "@/logic/ai/aiTypes";
import { analyzePlayerPatterns } from "@/logic/ai/playerPatternAnalyzer";
import { resolveBossStrategy } from "@/logic/ai/bossStrategyEngine";
import { guardAICombo, validateAIActionCosts } from "@/logic/ai/aiFairnessGuard";
import { getBossPhaseStrategy } from "@/logic/ai/bossPhaseStrategies";
import { resolveBossIntent } from "@/logic/ai/bossIntentResolver";
import { emptyAIMemory, sanitizeAIMemory } from "@/logic/ai/aiMemorySystem";

const card = (id: string) => {
  const found = allCards.find((item) => item.id === id);
  if (!found) throw new Error(`Missing fixture card: ${id}`);
  return found;
};

const makeState = (overrides: Partial<AIGameStateSnapshot> = {}): AIGameStateSnapshot => ({
  player: { will: 12, clarity: 5, stress: 6, mentalNoise: 1, block: 0, mask: 0 },
  enemy: { will: 16, clarity: 6, stress: 1, mentalNoise: 0, block: 0, mask: 0 },
  hand: [],
  enemyHand: [card("sentencia-express"), card("controlador-compulsivo"), card("autoestima-con-casco")],
  enemyDeck: [],
  enemyDiscard: [],
  turn: 4,
  ...overrides,
});

describe("advanced boss AI", () => {
  it("does not play cards without enough clarity", () => {
    const expensive = card("sentencia-express");
    const cost = validateAIActionCosts([expensive], 0);
    expect(cost.valid).toBe(false);

    const decision = resolveBossStrategy({
      gameState: makeState({ enemy: { ...makeState().enemy, clarity: 0 }, enemyHand: [expensive] }),
      bossProfile: getAIProfile("juez"),
      difficulty: "juicio",
      playerPatternMemory: emptyAIMemory(),
      currentPhase: "phase1",
      availableCards: [expensive],
      seed: 7,
    });

    expect(decision.selectedCards).toHaveLength(0);
    expect(decision.fairnessWarnings.join(" ")).toContain("Claridad");
  });

  it("prioritizes lethal damage when it is legally available", () => {
    const lethal = card("sentencia-express");
    const decision = resolveBossStrategy({
      gameState: makeState({ player: { ...makeState().player, will: 2, stress: 8 }, enemyHand: [lethal, card("autoestima-con-casco")] }),
      bossProfile: getAIProfile("juez"),
      difficulty: "juicio",
      playerPatternMemory: emptyAIMemory(),
      currentPhase: "phase3",
      availableCards: [lethal, card("autoestima-con-casco")],
      seed: 8,
    });

    expect(decision.selectedAction?.id).toBe(lethal.id);
  });

  it("leans defensive when the boss is near collapse", () => {
    const defensive = card("autoestima-con-casco");
    const damage = card("controlador-compulsivo");
    const decision = resolveBossStrategy({
      gameState: makeState({ enemy: { ...makeState().enemy, will: 3 }, enemyHand: [defensive, damage] }),
      bossProfile: getAIProfile("complaciente"),
      difficulty: "crisis",
      playerPatternMemory: emptyAIMemory(),
      currentPhase: "phase2",
      availableCards: [defensive, damage],
      seed: 9,
    });

    expect(decision.selectedAction?.id).toBe(defensive.id);
  });

  it("adapts memory style from detected player patterns", () => {
    const pattern = analyzePlayerPatterns({
      playedCards: [card("grito-catarsis"), card("grito-catarsis"), card("grito-catarsis")],
      recentCombos: [["grito-catarsis", "autoestima-con-casco"]],
      finalStress: 2,
      turnsPassed: 4,
    });

    expect(pattern.dominantStyle).toBe("catarsis_frequent");
    expect(pattern.favoriteCards[0]).toBe("grito-catarsis");
  });

  it("blocks abusive combo plans before they become courtroom nonsense", () => {
    const comboCards: Card[] = [card("controlador-compulsivo"), card("sentencia-express"), card("cadena-favores-eternos"), card("cadenas-deber")];
    const result = guardAICombo({ cards: comboCards, totalCost: 9, score: 99, keywords: ["Cadena"], reason: "Combo infinito sospechoso." }, makeState(), 2);

    expect(result.allowed).toBe(false);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("changes boss strategy by phase", () => {
    const opening = getBossPhaseStrategy("juez", "phase1");
    const final = getBossPhaseStrategy("juez", "final");

    expect(opening.description).not.toBe(final.description);
    expect(final.intentObscurity).toBeGreaterThan(opening.intentObscurity);
  });

  it("generates readable or cryptic intent according to difficulty", () => {
    const clear = resolveBossIntent([card("controlador-compulsivo")], "susurro");
    const cryptic = resolveBossIntent([card("controlador-compulsivo")], "tribunal-extremo");

    expect(clear.intent).toBe("block");
    expect(clear.preview).toContain("bloqueo");
    expect(cryptic.preview).toContain("clasificados");
  });

  it("sanitizes memory without keeping personal-shaped fields", () => {
    const unsafe = { ...emptyAIMemory(), favoriteCards: ["grito-catarsis"], email: "nadie@example.test" } as ReturnType<typeof emptyAIMemory> & { email: string };
    const clean = sanitizeAIMemory(unsafe);

    expect(JSON.stringify(clean)).not.toContain("email");
    expect(clean.favoriteCards).toEqual(["grito-catarsis"]);
  });

  it("is deterministic with the same seed and state", () => {
    const input = {
      gameState: makeState(),
      bossProfile: getAIProfile("juez"),
      difficulty: "juicio" as const,
      playerPatternMemory: emptyAIMemory(),
      currentPhase: "phase2" as const,
      availableCards: makeState().enemyHand,
      seed: 33,
    };

    const first = resolveBossStrategy(input);
    const second = resolveBossStrategy(input);

    expect(second.selectedAction?.id).toBe(first.selectedAction?.id);
    expect(second.dialogueLine).toBe(first.dialogueLine);
  });
});
