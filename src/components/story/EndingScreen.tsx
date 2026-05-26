"use client";

import type { StoryEnding } from "@/data/story/endings";

export function EndingScreen({ ending, defeated }: { ending: StoryEnding; defeated?: boolean }) {
  return (
    <section className={`rounded-lg border p-6 ${defeated ? "border-rose-100/20 bg-rose-950/28" : "border-amber-100/20 bg-black/58"}`}>
      <p className="text-sm font-black uppercase text-amber-100/65">Final alternativo</p>
      <h2 className="mt-2 text-5xl font-black">{ending.title}</h2>
      <p className="mt-4 text-2xl font-black leading-9 text-white/80">{ending.text}</p>
      <div className="mt-5 rounded-md border border-white/10 bg-white/6 p-4 text-left">
        <p className="text-xs font-black uppercase text-white/45">Ilustracion textual desbloqueada</p>
        <p className="mt-2 text-white/66">{ending.illustrationText}</p>
      </div>
    </section>
  );
}
