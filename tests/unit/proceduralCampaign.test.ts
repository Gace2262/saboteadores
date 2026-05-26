import { describe, expect, it } from "vitest";
import { proceduralEvents } from "@/data/procedural/eventPools";
import { proceduralRewards } from "@/data/procedural/rewardPools";
import { generateProceduralCampaign } from "@/logic/procedural/campaignGenerator";
import { hasCompleteRoute } from "@/logic/procedural/routeGenerator";
import { getDifficultyRating } from "@/logic/procedural/difficultyCurve";
import { useProceduralCampaignStore } from "@/store/proceduralCampaignStore";

const baseInput = {
  seedText: "el juez perdio el martillo",
  deckId: "oficina-control",
  difficulty: "crisis-formal" as const,
  mode: "rapido" as const,
  deckFactions: ["controlador", "perfeccionista"] as const,
};

describe("procedural campaign generator", () => {
  it("generates the same map for the same seed", () => {
    const first = generateProceduralCampaign(baseInput);
    const second = generateProceduralCampaign(baseInput);

    expect(second.seed).toBe(first.seed);
    expect(second.nodes.map((node) => `${node.id}:${node.type}:${node.next.join(",")}`)).toEqual(first.nodes.map((node) => `${node.id}:${node.type}:${node.next.join(",")}`));
  });

  it("always creates a complete route to the final judgment", () => {
    const campaign = generateProceduralCampaign(baseInput);
    expect(hasCompleteRoute(campaign.nodes)).toBe(true);
    expect(campaign.nodes.some((node) => node.type === "juicio")).toBe(true);
  });

  it("does not create orphan nodes except final judgment endpoints", () => {
    const campaign = generateProceduralCampaign(baseInput);
    const inbound = new Set(campaign.nodes.flatMap((node) => node.next));
    const orphanNodes = campaign.nodes.filter((node) => node.act !== 1 || node.index !== 0).filter((node) => !inbound.has(node.id));

    expect(orphanNodes).toHaveLength(0);
  });

  it("places bosses at the end of acts and final judgment at the end", () => {
    const campaign = generateProceduralCampaign(baseInput);
    const bossNodes = campaign.nodes.filter((node) => node.type === "boss" || node.type === "juicio");

    expect(bossNodes.every((node) => node.index === 3)).toBe(true);
    expect(campaign.nodes.filter((node) => node.type === "juicio").every((node) => node.act === 4)).toBe(true);
  });

  it("avoids three mandatory combats in a row on generated ordering", () => {
    const campaign = generateProceduralCampaign({ ...baseInput, mode: "largo" });
    const ordered = campaign.nodes.filter((node) => node.lane === 1).sort((a, b) => a.act - b.act || a.index - b.index);
    const triple = ordered.some((node, index) => {
      const slice = ordered.slice(index, index + 3);
      return slice.length === 3 && slice.every((item) => item.type === "combate" || item.type === "elite");
    });

    expect(triple).toBe(false);
  });

  it("uses valid event and reward references", () => {
    const campaign = generateProceduralCampaign(baseInput);
    const eventIds = new Set(proceduralEvents.map((event) => event.id));
    const rewardIds = new Set(proceduralRewards.map((reward) => reward.id));

    expect(campaign.nodes.filter((node) => node.eventId).every((node) => eventIds.has(node.eventId as string))).toBe(true);
    expect(campaign.nodes.filter((node) => node.rewardId).every((node) => rewardIds.has(node.rewardId as string))).toBe(true);
  });

  it("scales difficulty by act and selected pressure", () => {
    const early = getDifficultyRating(1, 1, "audiencia-suave");
    const late = getDifficultyRating(4, 3, "tribunal-desatado");

    expect(late).toBeGreaterThan(early);
  });

  it("stores run history without personal data", () => {
    useProceduralCampaignStore.getState().generateRun(baseInput);
    const firstNode = useProceduralCampaignStore.getState().currentCampaign?.nodes[0];
    if (firstNode) useProceduralCampaignStore.getState().visitNode(firstNode.id);
    useProceduralCampaignStore.getState().finishRun("victoria");
    const entry = useProceduralCampaignStore.getState().runHistory[0];

    expect(entry.seedText).toBe(baseInput.seedText);
    expect(JSON.stringify(entry)).not.toContain("@");
  });
});
