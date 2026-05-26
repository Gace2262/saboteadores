"use client";

import { motion } from "framer-motion";
import { ParticleField } from "@/components/effects/ParticleField";

export function CatarsisBreakScene({ text, reducedMotion }: { text: string; reducedMotion?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-amber-50/10">
      <ParticleField color="rgba(255,255,255,0.95)" density={42} />
      <motion.div
        className="h-28 w-28 rounded-full bg-white shadow-[0_0_130px_rgba(255,255,255,0.96)]"
        animate={{ scale: reducedMotion ? 4 : [0.3, 7], opacity: [1, 0] }}
        transition={{ duration: reducedMotion ? 0.3 : 1.1 }}
      />
      <motion.div className="chain-stripe absolute top-[46%] h-8 w-full rotate-12" animate={{ opacity: [1, 0], scaleX: [1, 0.1] }} />
      <motion.div className="chain-stripe absolute top-[56%] h-8 w-full -rotate-12" animate={{ opacity: [1, 0], scaleX: [1, 0.1] }} />
      <p className="absolute bottom-[20%] px-5 text-center text-4xl font-black uppercase text-white">{text}</p>
    </div>
  );
}
