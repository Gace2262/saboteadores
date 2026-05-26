"use client";

import { motion } from "framer-motion";
import { officialTaglines } from "@/data/taglines";

export function TaglineCarousel() {
  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-black/45 p-5 text-white">
      <h2 className="text-3xl font-black uppercase">Taglines oficiales</h2>
      <div className="mt-5 flex gap-3 overflow-hidden">
        <motion.div className="flex gap-3" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
          {[...officialTaglines, ...officialTaglines].map((tagline, index) => (
            <div key={`${tagline.id}-${index}`} className="w-80 shrink-0 rounded-lg border border-amber-100/15 bg-amber-200/10 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-100/60">{tagline.use}</p>
              <p className="mt-2 text-xl font-black">{tagline.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
