"use client";

import { motion } from "framer-motion";
import { brandingAssets } from "@/data/brandingAssets";

export function KeyArtHero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden rounded-lg border border-amber-200/25 bg-[#050308] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(214,170,69,0.28),transparent_30%),radial-gradient(circle_at_20%_75%,rgba(124,58,237,0.22),transparent_30%),linear-gradient(180deg,#0e070b,#050308_48%,#000)]" />
      <motion.div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full border border-amber-200/30 bg-black/40 shadow-[0_0_90px_rgba(214,170,69,0.18)]" animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 6, repeat: Infinity }} />
      <div className="absolute left-1/2 top-28 h-24 w-48 -translate-x-1/2 rounded-[50%] border-4 border-amber-100/70 bg-black/80 shadow-[0_0_55px_rgba(214,170,69,0.55)]" />
      <div className="absolute left-1/2 top-52 h-64 w-32 -translate-x-1/2 rounded-t-full border border-amber-100/20 bg-gradient-to-b from-amber-100/20 to-black/20" />
      <motion.div className="absolute left-1/2 top-32 h-5 w-80 -translate-x-1/2 rotate-[-8deg] rounded-full bg-amber-100 shadow-[0_0_42px_rgba(214,170,69,0.75)]" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} />
      <div className="absolute inset-x-0 top-[420px] h-1 bg-amber-100/25 shadow-[0_0_34px_rgba(214,170,69,0.65)]" />
      <div className="absolute bottom-20 left-1/2 h-28 w-12 -translate-x-1/2 rounded-t-full bg-white/80 shadow-[0_0_42px_rgba(248,250,252,0.55)]" />
      {["control", "culpa", "caos", "catarsis", "sentencia", "ruido"].map((label, index) => (
        <motion.div
          key={label}
          className="absolute rounded-md border border-amber-100/20 bg-black/65 px-5 py-7 text-xs font-black uppercase tracking-[0.2em] text-amber-100/75"
          style={{ left: `${12 + index * 14}%`, top: `${48 + (index % 2) * 16}%`, transform: `rotate(${index % 2 ? 8 : -7}deg)` }}
          animate={{ y: [0, index % 2 ? 16 : -14, 0] }}
          transition={{ duration: 5 + index, repeat: Infinity }}
        >
          {label}
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0_48%,rgba(246,218,126,0.28)_49%,transparent_50%_100%)] opacity-70" />
      <div className="relative z-10 flex min-h-[720px] flex-col justify-end p-8 md:p-12">
        <p className="max-w-xl text-sm font-black uppercase tracking-[0.35em] text-amber-100/70">key art oficial</p>
        <h1 className="mt-3 max-w-5xl text-5xl font-black uppercase leading-none md:text-8xl">{brandingAssets.title}</h1>
        <p className="mt-4 max-w-2xl text-xl font-bold text-white/75">{brandingAssets.positioning}</p>
      </div>
    </section>
  );
}
