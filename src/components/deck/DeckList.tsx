"use client";

import { allCards } from "@/data/cards";
import { countCopies, useDeckStore } from "@/store/deckStore";

export function DeckList() {
  const cardIds = useDeckStore((state) => state.cardIds);
  const removeCard = useDeckStore((state) => state.removeCard);
  const uniqueIds = Array.from(new Set(cardIds));

  return (
    <section className="rounded-lg border border-white/10 bg-black/48 p-4">
      <h2 className="text-xl font-black text-white">Mazo actual</h2>
      <div className="mt-3 max-h-[520px] space-y-2 overflow-y-auto pr-1">
        {uniqueIds.map((id) => {
          const card = allCards.find((item) => item.id === id);
          if (!card) return null;
          return (
            <button
              key={id}
              onClick={() => removeCard(id)}
              className="flex w-full items-center justify-between gap-3 rounded-md border border-white/10 bg-white/6 p-3 text-left hover:bg-rose-400/10"
            >
              <span>
                <strong className="block text-sm text-white">{card.name}</strong>
                <span className="text-xs text-white/45">{card.rarity} · {card.cost} claridad</span>
              </span>
              <span className="rounded bg-black/45 px-2 py-1 text-sm font-black text-amber-100">x{countCopies(cardIds, id)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
