import { describe, expect, it } from "vitest";
import { editorCardTemplate } from "@/data/editorTemplates";
import { createManifestTemplate } from "@/logic/mods/modManifest";
import { importModFromJSON } from "@/logic/mods/modImporter";
import { validateModPackage } from "@/logic/mods/modValidator";
import { calculateModChecksum, combineOfficialWithMods, validateModdedDeckAvailability } from "@/logic/mods/modRegistry";
import { moveMod } from "@/logic/mods/modLoadOrder";
import { registerMod } from "@/logic/mods/modRegistry";
import type { ModPackage } from "@/logic/mods/modTypes";

const makeMod = (id = "burnout_rebellion", cardId = "memo-del-burnout"): ModPackage => ({
  manifest: { ...createManifestTemplate(), id },
  cards: [
    {
      ...editorCardTemplate,
      id: cardId,
      name: "Memo del Burnout",
      faction: "inquieto",
      rarity: "rara",
      cost: 2,
      keywords: ["Estampida"],
      effects: [{ type: "damage", target: "enemy", value: 4, animation: "horse_stampede", sound: "horse_stampede" }],
      effectText: "Hace 4 de dano.",
      flavorText: "La oficina aprendio a morder.",
      visualEffect: "horse_stampede",
      soundEffect: "horse_stampede",
      cinematic: "horse_stampede",
    },
  ],
});

describe("modding system", () => {
  it("accepts a valid manifest and modded card", () => {
    const report = validateModPackage(makeMod());
    expect(report.valid).toBe(true);
    expect(report.detectedContent.cards).toBe(1);
  });

  it("rejects invalid manifests", () => {
    const report = validateModPackage({ ...makeMod(), manifest: { ...createManifestTemplate(), id: "INVALID ID" } });
    expect(report.valid).toBe(false);
    expect(report.errors.join(" ")).toContain("ID de mod invalido");
  });

  it("rejects scripts in imported JSON", () => {
    const result = importModFromJSON(JSON.stringify({ ...makeMod(), manifest: { ...createManifestTemplate(), description: "<script>alert(1)</script>" } }));
    expect(result.ok).toBe(false);
    expect(result.errors.join(" ")).toContain("script");
  });

  it("detects duplicate mod ids and incompatible versions", () => {
    const duplicate = validateModPackage(makeMod("burnout_rebellion"), ["burnout_rebellion"]);
    const incompatible = validateModPackage({ ...makeMod("otro_mod"), manifest: { ...createManifestTemplate(), id: "otro_mod", gameVersion: "9.9.9" } });
    expect(duplicate.conflicts.some((conflict) => conflict.type === "manifest_duplicate")).toBe(true);
    expect(incompatible.valid).toBe(false);
  });

  it("keeps checksum stable for identical content", () => {
    expect(calculateModChecksum(makeMod())).toBe(calculateModChecksum(makeMod()));
  });

  it("applies load order priority when combining content", () => {
    const first = { ...registerMod(makeMod("a_mod", "same-card"), []), enabled: true, loadOrder: 0 };
    const second = { ...registerMod(makeMod("b_mod", "same-card"), []), enabled: true, loadOrder: 1 };
    const combined = combineOfficialWithMods([], [first, second], (mod) => mod.package.cards, (card) => card.id);
    expect(combined).toHaveLength(1);
    expect(combined[0].name).toBe("Memo del Burnout");
    expect(moveMod([first, second], "b_mod", "up")[0].manifest.id).toBe("b_mod");
  });

  it("removes disabled mod content from the effective registry", () => {
    const installed = { ...registerMod(makeMod("disabled_mod", "disabled-card"), []), enabled: false };
    const combined = combineOfficialWithMods([], [installed], (mod) => mod.package.cards, (card) => card.id);
    expect(combined).toHaveLength(0);
  });

  it("fails deck availability when a required mod is inactive", () => {
    const installed = { ...registerMod(makeMod("deck_mod", "deck-only-card"), []), enabled: false };
    const result = validateModdedDeckAvailability(["deck-only-card"], [installed]);
    expect(result.valid).toBe(false);
    expect(result.message).toContain("expediente no cargado");
  });
});
