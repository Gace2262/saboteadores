"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LogoReveal } from "@/components/branding/LogoReveal";
import { trailerScenes } from "@/data/trailerScenes";

export default function TrailerModePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <div className="absolute inset-0 court-fog opacity-70" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Trailer Mode automatico</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">El Tribunal despierta</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Modo de showcase con camara controlada, highlights, bosses, cartas legendarias y escenas encadenadas.
          </p>
          <Link href="/demo" className="campaign-action mt-5 max-w-xs">Ir a demo</Link>
        </header>
        <LogoReveal />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trailerScenes.map((scene, index) => (
            <motion.article
              key={scene.id}
              animate={{ y: [0, index % 2 ? 8 : -8, 0] }}
              transition={{ duration: 4 + index * 0.4, repeat: Infinity }}
              className="relative min-h-72 overflow-hidden rounded-lg border border-white/10 bg-black/58 p-5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(242,211,123,0.16),transparent_34%),radial-gradient(circle_at_20%_85%,rgba(190,24,93,0.18),transparent_34%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-100/55">{scene.duration}s / intensidad {scene.intensity}</p>
                  <h2 className="mt-2 text-2xl font-black text-white">{scene.title}</h2>
                  <p className="mt-3 text-sm text-white/58">{scene.visual}</p>
                </div>
                <p className="mt-6 text-xl font-black uppercase text-amber-100">{scene.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
