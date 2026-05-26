"use client";

import { useWorkshopStore } from "@/store/workshopStore";

export function WorkshopSearch() {
  const search = useWorkshopStore((state) => state.search);
  const setSearch = useWorkshopStore((state) => state.setSearch);
  return (
    <input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Buscar expediente, seed, boss o trauma administrativo..."
      className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-amber-200/60"
    />
  );
}
