"use client";

import { motion } from "framer-motion";
import type { Card } from "@/data/cards";
import { useVisualStore } from "@/store/visualStore";

export function CardHolographicLayer({ card }: { card: Card }) {
  const animationMode = useVisualStore((state) => state.animationMode);
  if (animationMode === "minimal") return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-lg opacity-60 mix-blend-screen"
      style={{
        transform: "translateZ(24px)",
        background:
          card.rarity === "maldita"
            ? "linear-gradient(115deg, transparent 10%, rgba(255,77,109,0.25), transparent 38%, rgba(0,0,0,0.35), transparent 70%)"
            : "linear-gradient(115deg, transparent 10%, rgba(255,255,255,0.22), transparent 35%, rgba(252,211,77,0.2), transparent 70%)",
      }}
      animate={{ x: ["-20%", "20%", "-20%"], opacity: [0.25, 0.7, 0.25] }}
      transition={{ duration: card.rarity === "legendaria" ? 2.2 : 3.8, repeat: Infinity }}
    />
  );
}
