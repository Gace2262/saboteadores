"use client";

import { officialBranding } from "@/data/branding";

export function SteamCapsulePreview() {
  return (
    <section className="grid gap-4 lg:grid-cols-[616px_1fr]">
      <div className="relative aspect-[616/353] overflow-hidden rounded-lg border border-amber-100/20 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(242,211,123,0.24),transparent_36%),radial-gradient(circle_at_70%_80%,rgba(127,29,29,0.32),transparent_40%)]" />
        <div className="absolute inset-x-8 bottom-8">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-amber-100/65">Steam capsule mock</p>
          <h2 className="mt-2 text-4xl font-black uppercase leading-none text-white">{officialBranding.shortName}</h2>
          <p className="mt-3 text-lg font-bold text-amber-100">El tribunal vive dentro de ti.</p>
        </div>
      </div>
      <aside className="rounded-lg border border-white/10 bg-black/50 p-5">
        <h3 className="text-3xl font-black">Capsule checklist</h3>
        <ul className="mt-4 grid gap-2 text-sm text-white/62">
          <li>Logo legible en tamano pequeno.</li>
          <li>Martillo, ojo y cadenas como lectura inmediata.</li>
          <li>Contraste alto para tienda y thumbnails.</li>
          <li>Espacio reservado para arte final o trailer still.</li>
        </ul>
      </aside>
    </section>
  );
}
