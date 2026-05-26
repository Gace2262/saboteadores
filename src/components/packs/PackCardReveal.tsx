"use client";

import { motion } from "framer-motion";
import type { Card as CardData } from "@/data/cards";
import { rarityDefinitions } from "@/data/rarities";
import { Card } from "@/components/Card";

export function PackCardReveal({ card, index }: { card: CardData; index: number }) {
  const rarity = rarityDefinitions[card.rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: 90 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: index * 0.22, duration: 0.5 }}
      className={`pack-reveal-${rarity.visual}`}
    >
      <Card card={card} disabled />
    </motion.div>
  );
}
