"use client";

import { LogoReveal } from "@/components/branding/LogoReveal";
import { demoFlow } from "@/data/demoFlow";

export function CinematicSplash() {
  const intro = demoFlow[0];
  return (
    <section className="grid gap-5">
      <LogoReveal />
      <div className="rounded-lg border border-amber-100/18 bg-black/58 p-5">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/60">Narrador del Tribunal</p>
        <p className="mt-3 text-2xl font-black text-white">{intro.narrator}</p>
        <p className="mt-3 text-white/55">{intro.scene}</p>
      </div>
    </section>
  );
}
