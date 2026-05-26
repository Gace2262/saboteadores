"use client";

import { motion } from "framer-motion";
import { FactionSymbol } from "./FactionSymbol";

type Props = {
  compact?: boolean;
  reducedMotion?: boolean;
};

export function LogoMark({ compact, reducedMotion }: Props) {
  return (
    <div className="relative mx-auto max-w-4xl text-center">
      <motion.div
        className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border border-amber-100/35 bg-black/45 shadow-[0_0_60px_rgba(242,211,123,0.22)]"
        animate={reducedMotion ? {} : { boxShadow: ["0 0 28px rgba(242,211,123,0.18)", "0 0 70px rgba(242,211,123,0.34)", "0 0 28px rgba(242,211,123,0.18)"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <FactionSymbol faction="juez" className="h-14 w-14" />
      </motion.div>
      <p className="text-xs font-black uppercase tracking-[0.34em] text-amber-100/62">Sello judicial mental</p>
      <h1
        className={`mt-3 font-black leading-none text-amber-100 drop-shadow-[0_8px_18px_rgba(0,0,0,0.9)] ${
          compact ? "text-4xl md:text-6xl" : "text-6xl md:text-8xl"
        }`}
      >
        Saboteadores Mentales
      </h1>
      <div className="mx-auto mt-3 h-px max-w-xl bg-gradient-to-r from-transparent via-amber-100/70 to-transparent" />
      <p className="mt-3 text-xl font-black uppercase tracking-[0.18em] text-white/72">Habitantes Invisibles</p>
    </div>
  );
}
