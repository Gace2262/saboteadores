"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useDeckStore } from "@/store/deckStore";

export function SavedDecksList({ compact = false }: { compact?: boolean }) {
  const savedDecks = useDeckStore((state) => state.savedDecks);
  const loadDeck = useDeckStore((state) => state.loadDeck);
  const deleteDeck = useDeckStore((state) => state.deleteDeck);

  return (
    <section className="rounded-lg border border-white/10 bg-black/48 p-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-black">Mazos guardados</h2>
        {compact ? <Link className="text-sm font-black uppercase text-amber-100" href="/decks">Ver todos</Link> : null}
      </div>
      <div className="mt-4 grid gap-3">
        {savedDecks.length ? savedDecks.map((deck) => (
          <div key={deck.id} className="rounded-md border border-white/10 bg-white/6 p-4">
            <h3 className="text-xl font-black">{deck.name}</h3>
            <p className="mt-1 text-sm text-white/55">{deck.factions.join(" + ")} · {deck.cardIds.length} cartas</p>
            <div className="mt-3 flex gap-2">
              <button className="campaign-action min-h-10" onClick={() => loadDeck(deck.id)}>Cargar</button>
              <button className="icon-button" onClick={() => deleteDeck(deck.id)} title="Borrar mazo">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )) : (
          <p className="rounded-md bg-white/6 p-4 text-white/58">Aun no hay mazos guardados. El vacio esta ordenado, pero no gana partidas.</p>
        )}
      </div>
    </section>
  );
}
