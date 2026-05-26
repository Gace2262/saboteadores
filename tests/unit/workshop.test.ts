import { describe, expect, it } from "vitest";
import { communitySeedChecksum, resolveCommunitySeed } from "@/logic/workshop/communitySeedResolver";
import { serializeRunReplay, replaySummary } from "@/logic/workshop/runReplaySerializer";
import { validateWorkshopContent, detectMissingDependencies } from "@/logic/workshop/workshopValidator";
import { exportWorkshopContent } from "@/logic/workshop/workshopExporter";
import { importWorkshopContent } from "@/logic/workshop/workshopImporter";
import { useWorkshopStore, featuredWorkshopContent } from "@/store/workshopStore";
import type { WorkshopContent } from "@/logic/workshop/workshopTypes";

const validContent = featuredWorkshopContent[0];

describe("workshop community system", () => {
  it("shared seed reproduces the same procedural map", () => {
    const seed = validContent.seed;
    if (!seed) throw new Error("Fixture seed missing");
    const first = resolveCommunitySeed(seed);
    const second = resolveCommunitySeed(seed);

    expect(second.nodes.map((node) => node.type)).toEqual(first.nodes.map((node) => node.type));
    expect(communitySeedChecksum(seed)).toBe(communitySeedChecksum(seed));
  });

  it("serializes replay data without video or personal fields", () => {
    const replay = serializeRunReplay({
      seedText: "la ansiedad pidio silla",
      eventLog: ["start", "play-card", "boss"],
      keyDecisions: ["Tomar cafe", "Aceptar reliquia"],
      routeNodeIds: ["a1", "a2", "boss"],
    });
    const summary = replaySummary(replay);

    expect(summary.events).toBe(3);
    expect(JSON.stringify(replay)).not.toContain("@");
  });

  it("rejects executable-looking workshop payloads", () => {
    const unsafe: WorkshopContent = { ...validContent, id: "unsafe-expedient", description: "<script>alert(1)</script>" };
    const report = validateWorkshopContent(unsafe);

    expect(report.valid).toBe(false);
    expect(report.errors.join(" ")).toContain("executable");
  });

  it("fails invalid community tags", () => {
    const invalid = { ...validContent, id: "invalid-tags", tags: ["not-a-tag"] } as unknown as WorkshopContent;
    const report = validateWorkshopContent(invalid);

    expect(report.valid).toBe(false);
    expect(report.errors.join(" ")).toContain("Tags invalidos");
  });

  it("detects missing mod dependencies", () => {
    const missing = detectMissingDependencies({ ...validContent, dependencies: [{ id: "burnout-rebellion", version: "1.0.0", type: "mod" }] }, []);

    expect(missing[0].id).toBe("burnout-rebellion");
  });

  it("persists local rating interactions", () => {
    useWorkshopStore.getState().reactToContent(validContent.id, "martillazo_aprobado");
    useWorkshopStore.getState().toggleFavorite(validContent.id);
    const rating = useWorkshopStore.getState().ratings[validContent.id];

    expect(rating.reactions.martillazo_aprobado).toBeGreaterThan(0);
    expect(rating.favorite).toBe(true);
  });

  it("exports and imports workshop content", () => {
    const exported = exportWorkshopContent(validContent);
    const imported = importWorkshopContent(exported);

    expect(imported.ok).toBe(true);
    expect(imported.content?.id).toBe(validContent.id);
  });
});
