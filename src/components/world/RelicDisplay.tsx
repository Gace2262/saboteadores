"use client";

import { worldRelics } from "@/data/worldRelics";
import { useWorldStore } from "@/store/worldStore";

const rarityClass = {
  comun: "border-white/12 bg-white/5 text-white/70",
  rara: "border-blue-200/25 bg-blue-400/10 text-blue-100",
  epica: "border-fuchsia-200/25 bg-fuchsia-500/10 text-fuchsia-100",
  legendaria: "border-amber-100/35 bg-amber-300/12 text-amber-100",
  maldita: "border-red-100/30 bg-red-700/16 text-red-100",
};

export function RelicDisplay() {
  const { ownedRelicIds, collectRelic } = useWorldStore();
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {worldRelics.map((relic) => {
        const owned = ownedRelicIds.includes(relic.id);
        return (
          <article key={relic.id} className={`rounded-lg border p-5 ${rarityClass[relic.rarity]}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-65">{relic.rarity}</p>
                <h3 className="mt-2 text-2xl font-black text-white">{relic.name}</h3>
              </div>
              <span className={owned ? "rounded bg-emerald-300/15 px-2 py-1 text-xs font-black text-emerald-100" : "rounded bg-black/30 px-2 py-1 text-xs font-black text-white/45"}>
                {owned ? "Obtenida" : "Perdida"}
              </span>
            </div>
            <p className="mt-4 text-sm font-bold">{relic.effect}</p>
            <p className="mt-3 text-sm text-white/62">{relic.flavor}</p>
            <p className="mt-4 text-xs font-black uppercase text-white/45">{relic.regionHint} / {relic.visual}</p>
            <button className="campaign-choice mt-4" onClick={() => collectRelic(relic.id)}>
              Registrar reliquia
            </button>
          </article>
        );
      })}
    </section>
  );
}
