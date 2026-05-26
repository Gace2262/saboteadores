"use client";

import { motion } from "framer-motion";

export function CrackScreenOverlay({ active, reducedMotion }: { active: boolean; reducedMotion?: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.35] }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.25 : 0.7 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(40deg,transparent_0_46%,rgba(252,211,77,0.8)_47%,transparent_48%_100%),linear-gradient(120deg,transparent_0_55%,rgba(255,255,255,0.45)_56%,transparent_57%_100%)]" />
      <div className="absolute inset-0 bg-amber-200/10" />
    </motion.div>
  );
}
