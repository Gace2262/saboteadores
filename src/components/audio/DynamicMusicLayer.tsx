"use client";

import { advancedMusicLayers } from "@/data/musicLayers";
import { useAudioStore } from "@/store/audioStore";

export function DynamicMusicLayer() {
  const activeLayers = useAudioStore((state) => state.advancedLayers);
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-2xl font-black uppercase">Capas musicales</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {advancedMusicLayers.map((layer) => {
          const active = activeLayers.includes(layer.id);
          return (
            <article key={layer.id} className={`rounded-lg border p-3 ${active ? "border-amber-200 bg-amber-200/12" : "border-white/10 bg-white/5 opacity-65"}`}>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{layer.bus} · {layer.threshold}</p>
              <h3 className="mt-1 text-xl font-black">{layer.label}</h3>
              <p className="mt-2 text-sm text-white/60">{layer.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
