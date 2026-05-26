"use client";

import type { Card } from "@/data/cards";
import { getFactionVisual } from "@/data/factionVisuals";
import { FloatingSymbolField } from "@/components/ui/FloatingSymbolField";

export function CardPortrait({ card, compact = false }: { card: Card; compact?: boolean }) {
  const visual = getFactionVisual(card.faction);
  return (
    <div
      className={`relative overflow-hidden rounded-md border border-white/10 bg-black/45 ${compact ? "h-20" : "h-32"}`}
      style={{ background: visual.portrait, boxShadow: `inset 0 0 40px ${visual.glow}` }}
    >
      <FloatingSymbolField faction={card.faction} density={compact ? 4 : 8} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <p className="text-[10px] font-black uppercase tracking-wide text-white/58">{visual.pattern}</p>
      </div>
      <div className="absolute right-3 top-3 text-3xl font-black opacity-70" style={{ color: visual.accent }}>
        {visual.symbols[0]}
      </div>
    </div>
  );
}
