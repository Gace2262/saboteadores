"use client";

import { motion } from "framer-motion";

export function MentalFogLayer({ intensity = 0.4, mood = "stressed" }: { intensity?: number; mood?: string }) {
  const color =
    mood === "liberation"
      ? "rgba(252,211,77,0.18)"
      : mood === "cursed"
        ? "rgba(244,63,94,0.2)"
        : mood === "judgment"
          ? "rgba(252,211,77,0.16)"
          : "rgba(120,40,160,0.16)";
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-20"
      style={{
        opacity: intensity,
        background: `radial-gradient(circle at 20% 20%, ${color}, transparent 30%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.45), transparent 34%)`,
      }}
      animate={{ filter: ["blur(10px)", "blur(18px)", "blur(10px)"], scale: [1, 1.02, 1] }}
      transition={{ duration: 5, repeat: Infinity }}
    />
  );
}
