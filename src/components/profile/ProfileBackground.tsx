"use client";

import { motion } from "framer-motion";
import { getProfileBackground } from "@/data/profileBackgrounds";
import { useProfileStore } from "@/store/profileStore";

export function ProfileBackground() {
  const backgroundId = useProfileStore((state) => state.backgroundId);
  const background = getProfileBackground(backgroundId);
  return (
    <div className={`absolute inset-0 ${background.className}`}>
      <div className="absolute inset-0 court-fog opacity-70" />
      {background.layers.map((layer, index) => (
        <motion.span
          key={layer}
          className="absolute rounded-full border border-amber-100/10 bg-white/5 px-3 py-1 text-xs font-black uppercase text-white/25"
          style={{ left: `${14 + index * 27}%`, top: `${18 + (index % 2) * 44}%` }}
          animate={{ y: [0, index % 2 ? 12 : -12, 0], opacity: [0.22, 0.46, 0.22] }}
          transition={{ duration: 5 + index, repeat: Infinity }}
        >
          {layer}
        </motion.span>
      ))}
    </div>
  );
}
