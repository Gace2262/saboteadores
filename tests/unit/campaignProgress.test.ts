import { describe, expect, it } from "vitest";
import { useCampaignStore } from "@/store/campaignStore";

describe("campaign progress", () => {
  it("enters unlocked first node", () => {
    useCampaignStore.getState().resetCampaign();
    const node = useCampaignStore.getState().enterNode("inicio");
    expect(node?.id).toBe("inicio");
  });

  it("handles lost encounter without crashing", () => {
    useCampaignStore.getState().resetCampaign();
    useCampaignStore.getState().enterNode("inicio");
    useCampaignStore.getState().completeActiveEncounter(false);
    expect(["defeat", "boss", "map", "reward"]).toContain(useCampaignStore.getState().status);
  });
});
