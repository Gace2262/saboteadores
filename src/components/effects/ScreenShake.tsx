"use client";

import { motion } from "framer-motion";

export function ScreenShake({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  if (!active || reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-20"
      animate={{ x: [0, -10, 8, -6, 4, 0], y: [0, 6, -8, 4, -2, 0] }}
      transition={{ duration: 0.38 }}
    />
  );
}
