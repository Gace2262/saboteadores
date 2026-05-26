"use client";

import { motion } from "framer-motion";
import { useVisualStore } from "@/store/visualStore";

export function ParticleField({ color = "rgba(252,211,77,0.75)", density = 28 }: { color?: string; density?: number }) {
  const activeParticles = useVisualStore((state) => state.activeParticles);
  const lowPerformance = useVisualStore((state) => state.lowPerformance);
  if (!activeParticles || lowPerformance) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: density }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ background: color, left: `${(index * 37) % 100}%`, top: `${(index * 19) % 100}%` }}
          animate={{ y: [20, -80], opacity: [0, 1, 0], scale: [0.4, 1.4, 0.2] }}
          transition={{ duration: 1.4 + (index % 5) * 0.2, repeat: Infinity, delay: index * 0.035 }}
        />
      ))}
    </div>
  );
}
