"use client";

import { Search } from "lucide-react";
import { useDeckStore } from "@/store/deckStore";

export function CardSearchInput() {
  const search = useDeckStore((state) => state.search);
  const setSearch = useDeckStore((state) => state.setSearch);

  return (
    <label className="relative block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="min-h-11 w-full rounded-md border border-white/12 bg-black/45 pl-10 pr-3 text-white"
        placeholder="Buscar carta, keyword o frase dolorosamente especifica"
      />
    </label>
  );
}
