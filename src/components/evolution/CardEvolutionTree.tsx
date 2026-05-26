"use client";

import { getEvolutionBranches } from "@/data/evolutions";
import type { CardProgression } from "@/store/evolutionStore";

export function CardEvolutionTree({ cardId, progression }: { cardId: string; progression?: CardProgression }) {
  const branches = getEvolutionBranches(cardId);
  return (
    <section className="rounded-lg border border-amber-100/15 bg-black/48 p-5">
      <p className="text-sm font-black uppercase text-amber-100/65">Arbol de evolucion</p>
      <div className="mt-4 grid gap-3">
        {branches.length ? branches.map((branch) => {
          const unlocked = progression?.transformationsUnlocked.includes(branch.id);
          return (
            <article key={branch.id} className={`rounded-md border p-4 ${unlocked ? "border-amber-100/45 bg-amber-100/12" : "border-white/10 bg-white/6 opacity-75"}`}>
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="text-xl font-black">{branch.name}</h3>
                <span className="text-xs font-black uppercase text-amber-100">Nivel {branch.requiredLevel} - {branch.branch}</span>
              </div>
              <p className="mt-2 text-white/60">{branch.effect}</p>
              <p className="mt-2 text-sm italic text-white/45">{branch.flavorText}</p>
            </article>
          );
        }) : (
          <p className="rounded-md border border-white/10 bg-white/6 p-4 text-white/55">Esta carta aun no tiene rama documentada. El Tribunal la observa con clipboard.</p>
        )}
      </div>
    </section>
  );
}
