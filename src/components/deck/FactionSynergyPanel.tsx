"use client";

import { allFactions } from "@/data/factions";
import { getSynergy } from "@/data/synergies";
import { useDeckStore } from "@/store/deckStore";

export function FactionSynergyPanel() {
  const selectedFactions = useDeckStore((state) => state.selectedFactions);
  const toggleFaction = useDeckStore((state) => state.toggleFaction);
  const synergy = getSynergy(selectedFactions);

  return (
    <section className="rounded-lg border border-amber-100/15 bg-black/48 p-4">
      <p className="text-xs font-black uppercase text-amber-100/60">Sinergia de facciones</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {allFactions
          .filter((faction) => !["conciencia", "trascendencia"].includes(faction.id))
          .map((faction) => (
            <button
              key={faction.id}
              onClick={() => toggleFaction(faction.id)}
              className={`rounded-md border p-3 text-left text-sm transition ${
                selectedFactions.includes(faction.id)
                  ? "border-amber-100 bg-amber-100/12 text-amber-100"
                  : "border-white/10 bg-white/5 text-white/62 hover:bg-white/10"
              }`}
            >
              <strong>{faction.name}</strong>
            </button>
          ))}
      </div>
      <div className="mt-4 rounded-md border border-white/10 bg-white/6 p-4">
        <h2 className="text-2xl font-black text-white">{synergy?.name ?? "Sin diagnostico cruzado"}</h2>
        <p className="mt-2 text-sm text-amber-100/78">{synergy?.phrase ?? "Elige dos facciones y deja que el caos firme el acta."}</p>
        <p className="mt-3 text-sm text-white/64">{synergy?.passive ?? "Sin pasiva activa."}</p>
        <p className="mt-3 text-xs uppercase text-white/45">{synergy?.visual ?? "Visual pendiente de juicio."}</p>
      </div>
    </section>
  );
}
