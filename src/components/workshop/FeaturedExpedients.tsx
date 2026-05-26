"use client";

import { useWorkshopStore } from "@/store/workshopStore";
import { CampaignShowcase } from "./CampaignShowcase";
import { ChallengeCard } from "./ChallengeCard";
import { SeedCard } from "./SeedCard";

export function FeaturedExpedients({ type }: { type?: string }) {
  const contents = useWorkshopStore((state) => state.contents);
  const search = useWorkshopStore((state) => state.search);
  const selectedTag = useWorkshopStore((state) => state.selectedTag);
  const filtered = contents.filter((content) => (!type || content.type === type) && (selectedTag === "all" || content.tags.includes(selectedTag as never)) && `${content.title} ${content.description} ${content.creatorName}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {filtered.map((content) =>
        content.type === "seed" ? <SeedCard key={content.id} content={content} /> : content.type === "challenge" ? <ChallengeCard key={content.id} content={content} /> : <CampaignShowcase key={content.id} content={content} />,
      )}
    </section>
  );
}
