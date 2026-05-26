import { generateProceduralCampaign } from "@/logic/procedural/campaignGenerator";
import type { CommunitySeed } from "./workshopTypes";

export function resolveCommunitySeed(seed: CommunitySeed) {
  return generateProceduralCampaign({
    seedText: seed.seedText,
    deckId: "oficina-control",
    difficulty: seed.difficulty,
    mode: "rapido",
    deckFactions: ["controlador", "perfeccionista"],
  });
}

export function communitySeedChecksum(seed: CommunitySeed) {
  const campaign = resolveCommunitySeed(seed);
  return `${campaign.seed}:${campaign.finalBossId}:${campaign.nodes.map((node) => node.type).join("-")}`;
}
