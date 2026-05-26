"use client";

import { allCards } from "@/data/cards";
import { Card } from "@/components/Card";
import { sortCards, useCollectionStore } from "@/store/collectionStore";
import { CardDetailModal } from "./CardDetailModal";
import { CardFilterBar } from "./CardFilterBar";
import { DynamicBackground } from "@/components/ui/DynamicBackground";

export function CardCollectionGrid() {
  const copies = useCollectionStore((state) => state.copies);
  const filters = useCollectionStore((state) => state.filters);
  const selectCard = useCollectionStore((state) => state.selectCard);

  const filtered = sortCards(
    allCards.filter((card) => {
      if (!card.collectible) return false;
      if (filters.faction !== "todas" && card.faction !== filters.faction) return false;
      if (filters.rarity !== "todas" && card.rarity !== filters.rarity) return false;
      if (filters.type !== "todos" && card.type !== filters.type) return false;
      if (filters.keyword !== "todas" && !card.keywords.includes(filters.keyword as never)) return false;
      return true;
    }),
    filters.sort,
  );

  return (
    <main className="relative min-h-screen px-5 py-8 text-white">
      <DynamicBackground id="grimorio" />
      <div className="absolute inset-0 neural-map-bg opacity-80" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="mb-5">
          <p className="text-sm font-black uppercase text-amber-100/65">Coleccion</p>
          <h1 className="mt-2 text-5xl font-black">Album de grietas mentales</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Cartas obtenidas, siluetas de verguenza pendiente y duplicados convertibles en fragmentos.
          </p>
        </header>
        <CardFilterBar />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((card) => {
            const owned = copies[card.id] ?? 0;
            return (
              <div key={card.id} className="relative">
                {owned > 0 ? (
                  <Card card={card} onClick={() => selectCard(card.id)} />
                ) : (
                  <button
                    onClick={() => selectCard(card.id)}
                    className="relative grid min-h-72 w-full place-items-center rounded-lg border border-white/10 bg-black/55 text-center text-white/35"
                  >
                    <div>
                      <p className="text-5xl font-black">???</p>
                      <p className="mt-3 text-sm uppercase">{card.rarity}</p>
                    </div>
                  </button>
                )}
                <span className="absolute right-3 top-3 rounded bg-black/70 px-2 py-1 text-xs font-black text-amber-100">
                  x{owned}
                </span>
              </div>
            );
          })}
        </div>
      </section>
      <CardDetailModal />
    </main>
  );
}
