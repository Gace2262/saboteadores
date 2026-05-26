"use client";

import { motion } from "framer-motion";
import type { FactionId } from "@/data/factions";
import { getFactionVisual } from "@/data/factionVisuals";
import { useVisualStore } from "@/store/visualStore";

export function FloatingSymbolField({ faction, density = 10 }: { faction: FactionId; density?: number }) {
  const activeParticles = useVisualStore((state) => state.activeParticles);
  const lowPerformance = useVisualStore((state) => state.lowPerformance);
  if (!activeParticles || lowPerformance) return null;
  const visual = getFactionVisual(faction);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: density }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute text-xs font-black opacity-45"
          style={{ color: visual.accent, left: `${(index * 29) % 100}%`, top: `${(index * 41) % 100}%` }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 3 + (index % 4), repeat: Infinity, delay: index * 0.12 }}
        >
          {visual.symbols[index % visual.symbols.length]}
        </motion.span>
      ))}
    </div>
  );
}
