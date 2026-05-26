"use client";

import { motion } from "framer-motion";
import { brandingAssets } from "@/data/brandingAssets";

export function AnimatedLogoReveal() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-amber-200/25 bg-black p-8 text-center text-white shadow-[0_0_80px_rgba(214,170,69,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(214,170,69,0.28),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(124,58,237,0.16),transparent_38%)]" />
      <motion.div
        className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full border border-dashed border-amber-100/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-20 h-36 w-36 -translate-x-1/2 rounded-full border border-amber-200/45 bg-black/45"
        initial={{ scale: 0.65, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute left-1/2 top-32 h-3 w-24 -translate-x-1/2 rounded-full bg-amber-100 shadow-[0_0_32px_rgba(214,170,69,0.9)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      />
      <div className="relative z-10 pt-40">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-black uppercase tracking-[0.35em] text-amber-100/70">
          sello judicial fracturado
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-3 text-5xl font-black uppercase leading-none md:text-7xl">
          {brandingAssets.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-3 text-2xl font-black uppercase tracking-[0.28em] text-amber-100">
          {brandingAssets.subtitle}
        </motion.p>
      </div>
    </section>
  );
}
