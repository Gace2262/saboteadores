"use client";

import { motion } from "framer-motion";
import { useAudioStore } from "@/store/audioStore";

export function AudioVisualizer() {
  const { battleIntensity, bpm, visualIntensity, enabled, started } = useAudioStore();
  if (!enabled) return null;
  const bars = Array.from({ length: 18 });
  const speed = Math.max(0.35, 60 / Math.max(50, bpm));

  return (
    <div className="pointer-events-none fixed bottom-3 left-1/2 z-40 hidden -translate-x-1/2 items-end gap-1 rounded-full border border-amber-100/15 bg-black/45 px-4 py-2 backdrop-blur md:flex">
      {bars.map((_, index) => (
        <motion.span
          key={index}
          className="w-1 rounded-full bg-amber-200 shadow-[0_0_14px_rgba(252,211,77,0.75)]"
          animate={
            started
              ? {
                  height: [6, 10 + ((battleIntensity + index * 9) % 30) * visualIntensity, 6],
                  backgroundColor: battleIntensity > 70 ? ["#fcd34d", "#fb7185", "#fcd34d"] : ["#fde68a", "#67e8f9", "#fde68a"],
                }
              : { height: 6 }
          }
          transition={{ duration: speed, repeat: Infinity, delay: index * 0.025 }}
        />
      ))}
    </div>
  );
}
