"use client";

import { motion } from "framer-motion";
import { officialBranding } from "@/data/branding";

export function LogoReveal() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative overflow-hidden rounded-lg border border-amber-100/25 bg-black/70 p-7 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,211,123,0.22),transparent_38%)]" />
      <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full border border-dashed border-amber-100/25" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-amber-100/60">sello oficial</p>
        <h1 className="mt-4 text-4xl font-black uppercase leading-none text-white md:text-7xl">{officialBranding.name}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-bold text-amber-100">{officialBranding.logomark}</p>
      </div>
    </motion.div>
  );
}
