"use client";

import { motion } from "framer-motion";
import { GoldenSeal } from "@/components/effects/GoldenSeal";
import { CrackScreenOverlay } from "@/components/effects/CrackScreenOverlay";
import { ParticleField } from "@/components/effects/ParticleField";

export function JudgmentHammerScene({ text, reducedMotion }: { text: string; reducedMotion?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-black/78">
      <CrackScreenOverlay active reducedMotion={reducedMotion} />
      <ParticleField color="rgba(252,211,77,0.9)" density={36} />
      <motion.div
        className="absolute top-[8%] h-72 w-28 origin-bottom rounded-t-full bg-gradient-to-b from-amber-100 to-zinc-900 shadow-[0_0_80px_rgba(252,211,77,0.3)]"
        initial={{ y: -260, rotate: -28, opacity: 0 }}
        animate={reducedMotion ? { y: -30, opacity: 1 } : { y: [-260, -90, -10], rotate: [-28, 12, 0], opacity: [0, 1, 1] }}
        transition={{ duration: reducedMotion ? 0.25 : 0.7, times: [0, 0.55, 1] }}
      />
      <GoldenSeal text="FALLO" />
      <motion.p className="absolute bottom-[18%] text-center text-3xl font-black uppercase text-amber-100" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        {text}
      </motion.p>
    </div>
  );
}
