"use client";

import { useDeckStore } from "@/store/deckStore";

export function DeckNameInput() {
  const deckName = useDeckStore((state) => state.deckName);
  const setDeckName = useDeckStore((state) => state.setDeckName);

  return (
    <label className="block text-xs font-black uppercase text-amber-100/62">
      Nombre del mazo
      <input
        value={deckName}
        onChange={(event) => setDeckName(event.target.value)}
        className="mt-2 min-h-11 w-full rounded-md border border-white/12 bg-black/45 px-3 text-base normal-case text-white"
        placeholder="Ej: Dictadura del Casi"
      />
    </label>
  );
}
