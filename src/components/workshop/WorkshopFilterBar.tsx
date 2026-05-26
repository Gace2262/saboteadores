"use client";

import { communityTags } from "@/data/communityTags";
import { useWorkshopStore } from "@/store/workshopStore";

export function WorkshopFilterBar() {
  const selectedTag = useWorkshopStore((state) => state.selectedTag);
  const setSelectedTag = useWorkshopStore((state) => state.setSelectedTag);
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => setSelectedTag("all")} className={`rounded-full px-3 py-1 text-xs font-bold ${selectedTag === "all" ? "bg-amber-200 text-black" : "bg-white/10 text-white/65"}`}>Todos</button>
      {communityTags.map((tag) => (
        <button key={tag} type="button" onClick={() => setSelectedTag(tag)} className={`rounded-full px-3 py-1 text-xs font-bold ${selectedTag === tag ? "bg-amber-200 text-black" : "bg-white/10 text-white/65"}`}>
          {tag}
        </button>
      ))}
    </div>
  );
}
