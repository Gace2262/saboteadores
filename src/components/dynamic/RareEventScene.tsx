"use client";

import { rareEncounters } from "@/data/rareEncounters";

export function RareEventScene({ encounterId }: { encounterId?: string }) {
  const encounter = rareEncounters.find((item) => item.id === encounterId) ?? rareEncounters[0];
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/58 p-5 text-white">
      <p className="text-sm font-black uppercase text-amber-100/65">Encuentro raro</p>
      <h2 className="mt-1 text-3xl font-black">{encounter.name}</h2>
      <p className="mt-3 text-xl font-black text-white/78">{encounter.line}</p>
      <p className="mt-2 text-white/58">{encounter.effect}</p>
    </section>
  );
}
