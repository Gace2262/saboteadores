"use client";

import { reactionLabels } from "@/logic/workshop/contentRatings";
import type { WorkshopReaction } from "@/logic/workshop/workshopTypes";
import { useWorkshopStore } from "@/store/workshopStore";

const reactions = Object.keys(reactionLabels) as WorkshopReaction[];

export function ExpedientRating({ contentId }: { contentId: string }) {
  const rating = useWorkshopStore((state) => state.ratings[contentId]);
  const reactToContent = useWorkshopStore((state) => state.reactToContent);
  const toggleFavorite = useWorkshopStore((state) => state.toggleFavorite);
  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        {reactions.slice(0, 3).map((reaction) => (
          <button key={reaction} type="button" onClick={() => reactToContent(contentId, reaction)} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/70">
            {reactionLabels[reaction]} {rating?.reactions[reaction] ?? 0}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => toggleFavorite(contentId)} className="justify-self-start rounded-full border border-amber-100/20 bg-amber-100/10 px-3 py-1 text-xs font-bold text-amber-100">
        {rating?.favorite ? "Favorito archivado" : "Marcar favorito"}
      </button>
    </div>
  );
}
