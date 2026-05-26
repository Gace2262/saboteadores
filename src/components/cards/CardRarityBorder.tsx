"use client";

import type { Card } from "@/data/cards";
import { rarityThemes } from "@/styles/rarityThemes";

export function CardRarityBorder({ rarity }: { rarity: Card["rarity"] }) {
  const theme = rarityThemes[rarity];
  return (
    <>
      <div className={`pointer-events-none absolute inset-0 rounded-lg border-2 ${theme.frame}`} />
      <div
        className="pointer-events-none absolute inset-1 rounded-md opacity-40"
        style={{ boxShadow: `inset 0 0 30px ${theme.glow}, 0 0 24px ${theme.glow}` }}
      />
    </>
  );
}
