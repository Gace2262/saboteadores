import { describe, expect, it } from "vitest";
import { createCleanSave, importSave, loadGame, resetSave, saveGame } from "@/logic/save/saveManager";
import { validateSave } from "@/logic/save/saveValidator";

describe("save system", () => {
  it("creates a valid save", () => {
    const save = createCleanSave();
    expect(validateSave(save).valid).toBe(true);
  });

  it("saves and loads", () => {
    const save = createCleanSave();
    saveGame(save);
    const loaded = loadGame();
    expect(loaded.validation.valid).toBe(true);
    expect(loaded.save.saveVersion).toBe(save.saveVersion);
  });

  it("migrates old save by importing", () => {
    const loaded = importSave(JSON.stringify({ saveVersion: 1, createdAt: "x", updatedAt: "x", profile: {}, collection: {}, campaign: {}, decks: {}, settings: {}, achievements: {}, world: {} }));
    expect(loaded.save.saveVersion).toBe(4);
  });

  it("resets corrupt save", () => {
    localStorage.setItem("saboteadores-safe-save", "{broken");
    const loaded = loadGame();
    expect(loaded.validation.valid).toBe(true);
    resetSave();
  });
});
