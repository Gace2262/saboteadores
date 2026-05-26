import type { Rarity } from "@/data/cards";

export type RarityAnimation = {
  borderClass: string;
  auraClass: string;
  particleColor: string;
  castDuration: number;
  cinematicScale: number;
};

export function getRarityAnimation(rarity: Rarity): RarityAnimation {
  const map: Record<Rarity, RarityAnimation> = {
    comun: {
      borderClass: "border-white/14",
      auraClass: "shadow-[0_0_18px_rgba(255,255,255,0.08)]",
      particleColor: "rgba(255,255,255,0.35)",
      castDuration: 0.8,
      cinematicScale: 1,
    },
    rara: {
      borderClass: "border-cyan-200/45 rare-pulse-border",
      auraClass: "shadow-[0_0_24px_rgba(103,232,249,0.18)]",
      particleColor: "rgba(103,232,249,0.55)",
      castDuration: 1.05,
      cinematicScale: 1.04,
    },
    epica: {
      borderClass: "animated-gold-border border-fuchsia-300/55 epic-dark-fire",
      auraClass: "shadow-[0_0_32px_rgba(216,180,254,0.24)]",
      particleColor: "rgba(216,180,254,0.65)",
      castDuration: 1.45,
      cinematicScale: 1.08,
    },
    legendaria: {
      borderClass: "animated-gold-border legendary-card border-amber-200 living-gold-border",
      auraClass: "shadow-[0_0_44px_rgba(242,211,123,0.32)]",
      particleColor: "rgba(252,211,77,0.85)",
      castDuration: 2.1,
      cinematicScale: 1.14,
    },
    maldita: {
      borderClass: "animated-gold-border cursed-card border-rose-300 cursed-glitch-border",
      auraClass: "shadow-[0_0_42px_rgba(255,77,109,0.36)]",
      particleColor: "rgba(255,77,109,0.8)",
      castDuration: 1.9,
      cinematicScale: 1.12,
    },
  };
  return map[rarity];
}
