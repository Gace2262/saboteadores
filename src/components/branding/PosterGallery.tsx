"use client";

import { motion } from "framer-motion";
import { posterConcepts } from "@/data/posterConcepts";

export function PosterGallery() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-100/60">poster gallery</p>
          <h2 className="text-4xl font-black uppercase">Posters promocionales</h2>
        </div>
        <p className="max-w-xl text-sm text-white/60">Versiones conceptuales listas para reemplazar por ilustracion final, manteniendo composicion, paleta y tono.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posterConcepts.map((poster, index) => (
          <motion.article
            key={poster.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className={`relative min-h-[520px] overflow-hidden rounded-lg border border-amber-100/20 bg-gradient-to-b ${poster.palette} p-5 shadow-[0_0_45px_rgba(0,0,0,0.45)]`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.22),transparent_28%),linear-gradient(180deg,transparent,#000_78%)]" />
            <div className="absolute left-1/2 top-24 grid h-40 w-40 -translate-x-1/2 place-items-center rounded-full border border-white/25 bg-black/30 text-3xl font-black text-white/80">
              {poster.symbol}
            </div>
            <div className="absolute inset-x-8 top-72 h-1 bg-white/25 shadow-[0_0_24px_rgba(255,255,255,0.55)]" />
            <div className="relative z-10 flex h-full min-h-[480px] flex-col justify-end">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">{poster.visual}</p>
              <h3 className="mt-3 text-4xl font-black uppercase leading-none">{poster.title}</h3>
              <p className="mt-3 text-sm font-bold text-white/72">{poster.subtitle}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
