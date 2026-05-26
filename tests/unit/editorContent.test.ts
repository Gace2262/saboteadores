import { describe, expect, it } from "vitest";
import { editorCardTemplate } from "@/data/editorTemplates";
import { estimateEditorCardBalance } from "@/logic/editor/balanceEstimator";
import { validateEditorCard } from "@/logic/editor/cardValidator";
import { exportContentPackage } from "@/logic/editor/contentExporter";
import { importContentPackage } from "@/logic/editor/contentImporter";
import { editorCardToRuntimeCard } from "@/logic/editor/cardSerializer";

describe("editor content system", () => {
  it("validates the base card template", () => {
    const result = validateEditorCard(editorCardTemplate, [editorCardTemplate.id]);
    expect(result.valid).toBe(true);
  });

  it("rejects malformed card ids and missing effects", () => {
    const result = validateEditorCard({ ...editorCardTemplate, id: "Carta Rota", effects: [] }, ["Carta Rota"]);
    expect(result.valid).toBe(false);
    expect(result.errors.join(" ")).toContain("ID");
  });

  it("serializes editor cards into runtime cards", () => {
    const card = editorCardToRuntimeCard(editorCardTemplate);
    expect(card.id).toBe(editorCardTemplate.id);
    expect(card.collectible).toBe(true);
  });

  it("estimates balance with a clear verdict", () => {
    const report = estimateEditorCardBalance(editorCardTemplate);
    expect(report.verdict.length).toBeGreaterThan(0);
    expect(report.powerScore).toBeGreaterThanOrEqual(0);
  });

  it("exports and imports editor content packages", () => {
    const snapshot = { cards: [editorCardTemplate], bosses: [], events: [], campaignNodes: [], expansions: [] };
    const exported = exportContentPackage(snapshot);
    const imported = importContentPackage(exported);
    expect(imported.ok).toBe(true);
    expect(imported.content?.cards[0].id).toBe(editorCardTemplate.id);
  });
});
