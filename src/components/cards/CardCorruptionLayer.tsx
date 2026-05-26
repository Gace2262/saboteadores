"use client";

import type { Card } from "@/data/cards";

export function CardCorruptionLayer({ card }: { card: Card }) {
  if (card.rarity !== "maldita") return null;
  return (
    <>
      <div className="pointer-events-none absolute inset-0 cursed-static-lines opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-8 -rotate-6 bg-black/35 shadow-[0_0_20px_rgba(255,77,109,0.35)]" />
      <span className="pointer-events-none absolute bottom-3 left-3 text-xs font-black uppercase text-rose-200/70">archivo corrupto</span>
    </>
  );
}
