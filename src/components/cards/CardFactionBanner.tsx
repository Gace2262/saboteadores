"use client";

import type { FactionId } from "@/data/factions";
import { getFaction } from "@/data/factions";
import { getFactionVisual } from "@/data/factionVisuals";

export function CardFactionBanner({ faction }: { faction: FactionId }) {
  const data = getFaction(faction);
  const visual = getFactionVisual(faction);
  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-black/45 px-3 py-2">
      <span className="text-[10px] font-black uppercase text-white/52">{data?.name ?? faction}</span>
      <span
        className="grid h-7 min-w-7 place-items-center rounded border px-1 text-[10px] font-black"
        style={{ borderColor: visual.accent, color: visual.accent, boxShadow: `0 0 12px ${visual.glow}` }}
      >
        {data?.sigil ?? visual.symbols[0]}
      </span>
    </div>
  );
}
