"use client";

import { motion } from "framer-motion";
import { useTribunalStore } from "@/store/tribunalStore";

export function CorruptedMenuEffect() {
  const activeEvent = useTribunalStore((state) => state.activeEvent);
  const stableMode = useTribunalStore((state) => state.stableMode);
  const reduceCorruptionVisuals = useTribunalStore((state) => state.reduceCorruptionVisuals);
  const visible = !stableMode && activeEvent?.type === "menu_corruption" && !reduceCorruptionVisuals;
  if (!visible) return null;
  return (
    <motion.div className="pointer-events-none fixed inset-0 z-20 mix-blend-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(242,211,123,0.16),transparent)]" />
      <motion.div
        className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,rgba(255,255,255,0.025)_9px)]"
        animate={{ x: [0, 8, -8, 0] }}
        transition={{ duration: 0.25, repeat: 4 }}
      />
    </motion.div>
  );
}
