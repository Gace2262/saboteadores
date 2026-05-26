"use client";

import { allCards } from "@/data/cards";
import { bosses } from "@/data/bosses";
import { gameModes } from "@/data/gameModes";
import { useProfileStore } from "@/store/profileStore";

export function FavoriteDeckPanel() {
  const { favorites, setFavorite } = useProfileStore();
  return (
    <section className="rounded-lg border border-white/12 bg-black/48 p-5">
      <p className="text-sm font-black uppercase text-white/45">Favoritos ceremoniales</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Select label="Carta favorita" value={favorites.cardId ?? ""} onChange={(value) => setFavorite("cardId", value)} options={allCards.slice(0, 40).map((card) => [card.id, card.name])} />
        <Select label="Boss favorito" value={favorites.bossId ?? ""} onChange={(value) => setFavorite("bossId", value)} options={bosses.map((boss) => [boss.id, boss.name])} />
        <Select label="Modo favorito" value={favorites.modeId ?? ""} onChange={(value) => setFavorite("modeId", value)} options={gameModes.map((mode) => [mode.id, mode.name])} />
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return (
    <label className="grid gap-2 text-xs font-black uppercase text-white/55">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white">
        <option value="">Sin registrar</option>
        {options.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
      </select>
    </label>
  );
}
