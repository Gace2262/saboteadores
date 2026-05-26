"use client";

import { X, Star } from "lucide-react";
import { allCards } from "@/data/cards";
import { useCollectionStore } from "@/store/collectionStore";
import { Card } from "@/components/Card";

export function CardDetailModal() {
  const selectedCardId = useCollectionStore((state) => state.selectedCardId);
  const selectCard = useCollectionStore((state) => state.selectCard);
  const copies = useCollectionStore((state) => state.copies);
  const favorites = useCollectionStore((state) => state.favorites);
  const toggleFavorite = useCollectionStore((state) => state.toggleFavorite);
  const card = allCards.find((item) => item.id === selectedCardId);

  if (!card) return null;
  const owned = copies[card.id] ?? 0;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 px-4">
      <section className="grid w-full max-w-5xl gap-5 rounded-lg border border-amber-100/20 bg-zinc-950 p-5 text-white md:grid-cols-[340px_1fr]">
        <Card card={card} disabled />
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase text-amber-100/62">{card.rarity}</p>
              <h2 className="mt-1 text-4xl font-black">{card.name}</h2>
            </div>
            <button className="icon-button" onClick={() => selectCard(undefined)} title="Cerrar detalle">
              <X size={18} />
            </button>
          </div>
          <p className="mt-5 text-lg leading-8 text-white/70">{card.flavorQuote}</p>
          <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
            <Info label="Copias" value={`${owned}`} />
            <Info label="Valor duplicado" value={`${card.duplicateValue} fragmentos`} />
            <Info label="Desbloqueo" value={card.unlockCondition} />
            <Info label="Sobres" value={card.packSources.join(", ")} />
            {card.cursedEffect ? <Info label="Efecto maldito" value={card.cursedEffect} /> : null}
          </div>
          <button
            onClick={() => toggleFavorite(card.id)}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md border border-amber-100/25 bg-amber-100/10 px-4 text-sm font-black uppercase text-amber-100"
          >
            <Star size={17} />
            {favorites.includes(card.id) ? "Quitar favorito" : "Marcar favorita"}
          </button>
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/6 p-3">
      <p className="text-xs font-black uppercase text-white/42">{label}</p>
      <p className="mt-1 text-white/76">{value}</p>
    </div>
  );
}
