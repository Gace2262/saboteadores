"use client";

import { promotionalBackgrounds } from "@/data/branding";

export function KeyArtPanel() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {promotionalBackgrounds.map((background, index) => (
        <article key={background} className="relative min-h-64 overflow-hidden rounded-lg border border-amber-100/15 bg-black/60 p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(242,211,123,0.18),transparent_32%),radial-gradient(circle_at_20%_90%,rgba(190,24,93,0.16),transparent_34%)]" />
          <div className="relative flex h-full flex-col justify-end">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-100/55">Key art {index + 1}</p>
            <h3 className="mt-2 text-2xl font-black text-white">{background}</h3>
            <p className="mt-2 text-sm text-white/55">Placeholder generativo sin assets externos, listo para reemplazo artistico.</p>
          </div>
        </article>
      ))}
    </section>
  );
}
