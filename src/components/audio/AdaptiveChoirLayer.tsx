"use client";

import { useAudioStore } from "@/store/audioStore";

export function AdaptiveChoirLayer() {
  const active = useAudioStore((state) => state.advancedLayers.includes("choir"));
  const volume = useAudioStore((state) => state.choirVolume);
  return (
    <section className={`rounded-lg border p-4 text-white ${active ? "border-amber-200/45 bg-amber-200/10" : "border-white/10 bg-black/45"}`}>
      <h2 className="text-2xl font-black uppercase">Adaptive Choir Layer</h2>
      <p className="mt-2 text-white/62">{active ? "El coro judicial esta creciendo." : "El coro espera en silencio, con papeles."}</p>
      <p className="mt-3 text-sm text-amber-100/70">Volumen coro: {Math.round(volume * 100)}%</p>
    </section>
  );
}
