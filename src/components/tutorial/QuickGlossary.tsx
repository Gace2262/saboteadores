"use client";

import { tutorialGlossary } from "@/data/tutorialDialogues";

export function QuickGlossary() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/48 p-5">
      <h2 className="text-2xl font-black">Glosario rapido</h2>
      <div className="mt-4 grid gap-2">
        {tutorialGlossary.map((item) => (
          <details key={item.id} className="rounded border border-white/10 bg-white/5 p-3">
            <summary className="cursor-pointer text-sm font-black text-amber-100">{item.title} <span className="text-white/35">/{item.kind}</span></summary>
            <p className="mt-2 text-sm text-white/62">{item.description}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
