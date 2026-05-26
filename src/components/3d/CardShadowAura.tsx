"use client";

import { motion } from "framer-motion";
import type { Card } from "@/data/cards";
import { getFaction } from "@/data/factions";
import { getRarityAnimation } from "@/logic/visual/getRarityAnimation";

export function CardShadowAura({ card }: { card: Card }) {
  const faction = getFaction(card.faction);
  const rarity = getRarityAnimation(card.rarity);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl blur-xl"
      style={{
        background: `radial-gradient(circle, ${faction?.color ?? rarity.particleColor}66, transparent 65%)`,
        transform: "translateZ(-32px)",
      }}
      animate={{ opacity: [0.28, 0.62, 0.28], scale: [0.96, 1.04, 0.96] }}
      transition={{ duration: card.rarity === "maldita" ? 1.4 : 3.2, repeat: Infinity }}
    />
  );
}
