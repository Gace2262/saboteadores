"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useTribunalStore } from "@/store/tribunalStore";

export function AnomalyOverlay() {
  const anomaly = useTribunalStore((state) => state.activeAnomaly);
  const clearAnomaly = useTribunalStore((state) => state.clearAnomaly);
  const { stableMode, disableAnomalies, reduceCorruptionVisuals, limitGlitches } = useTribunalStore();
  const visible = Boolean(anomaly) && !stableMode && !disableAnomalies;

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(clearAnomaly, reduceCorruptionVisuals || limitGlitches ? 1400 : 3200);
    return () => window.clearTimeout(timer);
  }, [clearAnomaly, limitGlitches, reduceCorruptionVisuals, visible]);

  return (
    <AnimatePresence>
      {visible && anomaly ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={`absolute inset-0 ${anomaly.weather === "catarsis" ? "bg-white/8" : "bg-black/18"}`} />
          <motion.div
            className="absolute right-5 top-24 max-w-sm rounded-lg border border-white/12 bg-black/72 p-4 text-white backdrop-blur"
            animate={limitGlitches ? {} : { x: [0, -3, 3, 0] }}
            transition={{ duration: 0.25, repeat: 4 }}
          >
            <p className="text-xs font-black uppercase text-amber-100/65">Anomalia {anomaly.rarity}</p>
            <h2 className="mt-1 text-2xl font-black">{anomaly.name}</h2>
            <p className="mt-2 text-sm text-white/62">{anomaly.line}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
