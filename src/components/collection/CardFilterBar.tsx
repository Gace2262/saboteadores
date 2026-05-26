"use client";

import { allCards } from "@/data/cards";
import { keywordDefinitions } from "@/data/keywords";
import { useCollectionStore } from "@/store/collectionStore";

const unique = (items: string[]) => Array.from(new Set(items)).sort();

export function CardFilterBar() {
  const filters = useCollectionStore((state) => state.filters);
  const setFilter = useCollectionStore((state) => state.setFilter);

  const factions = unique(allCards.map((card) => card.faction));
  const rarities = ["comun", "rara", "epica", "legendaria", "maldita"];
  const types = unique(allCards.map((card) => card.type));
  const keywords = Object.keys(keywordDefinitions);

  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/45 p-3 md:grid-cols-5">
      <Select label="Faccion" value={filters.faction} onChange={(value) => setFilter("faction", value)} options={["todas", ...factions]} />
      <Select label="Rareza" value={filters.rarity} onChange={(value) => setFilter("rarity", value)} options={["todas", ...rarities]} />
      <Select label="Tipo" value={filters.type} onChange={(value) => setFilter("type", value)} options={["todos", ...types]} />
      <Select label="Keyword" value={filters.keyword} onChange={(value) => setFilter("keyword", value)} options={["todas", ...keywords]} />
      <Select label="Orden" value={filters.sort} onChange={(value) => setFilter("sort", value)} options={["rarity", "faction", "type", "cost"]} />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-xs font-black uppercase text-white/56">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-10 w-full rounded-md border border-white/12 bg-zinc-950 px-3 text-sm normal-case text-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
