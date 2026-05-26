"use client";

import { motion } from "framer-motion";
import { ParticleField } from "@/components/effects/ParticleField";

export function ChainsBindingScene({ text, reducedMotion }: { text: string; reducedMotion?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-black/68">
      <ParticleField color="rgba(148,163,184,0.85)" density={18} />
      {[
        ["-20%", "22%", "12deg"],
        ["20%", "58%", "-12deg"],
        ["-25%", "42%", "-4deg"],
      ].map(([x, top, rotate], index) => (
        <motion.div
          key={index}
          className="chain-stripe absolute left-[-12%] h-10 w-[130%]"
          style={{ top, rotate }}
          initial={{ x }}
          animate={{ x: "0%" }}
          transition={{ duration: reducedMotion ? 0.2 : 0.55, delay: index * 0.08 }}
        />
      ))}
      <motion.div
        className="grid h-32 w-32 place-items-center rounded-md border-8 border-slate-300 bg-zinc-950 text-2xl font-black uppercase text-slate-100"
        initial={{ scale: 0, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: reducedMotion ? 0.05 : 0.38 }}
      >
        BLOQUEADO
      </motion.div>
      <p className="absolute bottom-[18%] px-5 text-center text-2xl font-black text-slate-100">{text}</p>
    </div>
  );
}
