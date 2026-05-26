import { describe, expect, it } from "vitest";
import { allCards } from "@/data/cards";
import { deckRules } from "@/data/deckRules";
import { validateDeck } from "@/store/deckStore";

describe("deck validation", () => {
  it("rejects undersized decks", () => {
    const result = validateDeck(["controlador-compulsivo"], ["controlador", "perfeccionista"], false);
    expect(result.valid).toBe(false);
  });

  it("rejects too many legendary copies", () => {
    const ids = Array(deckRules.minSize).fill("martillazo-realidad");
    const result = validateDeck(ids, ["controlador", "perfeccionista"], true);
    expect(result.valid).toBe(false);
  });

  it("accepts a generated legal deck", () => {
    const factions = ["controlador", "perfeccionista"] as const;
    const ids: string[] = [];
    for (const card of allCards) {
      if (ids.length >= deckRules.minSize) break;
      if (["controlador", "perfeccionista", "conciencia", "trascendencia"].includes(card.faction)) ids.push(card.id);
    }
    const result = validateDeck(ids, [...factions], true);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});
