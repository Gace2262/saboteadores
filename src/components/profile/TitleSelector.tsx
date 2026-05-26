"use client";

import { unlockableTitles } from "@/data/titles";
import { useProgressionStore } from "@/store/progressionStore";

export function TitleSelector() {
  const { unlockedTitleIds, selectedTitleId, selectTitle } = useProgressionStore();
  return (
    <section className="rounded-lg border border-amber-100/15 bg-black/48 p-5">
      <p className="text-sm font-black uppercase text-amber-100/65">Titulos desbloqueables</p>
      <h2 className="mt-1 text-3xl font-black">Nombre ceremonial</h2>
      <div className="mt-4 grid gap-2">
        {unlockableTitles.map((title) => {
          const unlocked = unlockedTitleIds.includes(title.id);
          const selected = selectedTitleId === title.id;
          return (
            <button
              key={title.id}
              disabled={!unlocked}
              onClick={() => selectTitle(title.id)}
              className={`rounded-md border p-3 text-left transition ${selected ? "border-amber-100/50 bg-amber-100/16" : unlocked ? "border-white/12 bg-white/6 hover:bg-white/10" : "border-white/8 bg-black/30 opacity-55"}`}
            >
              <span className="text-xs font-black uppercase text-white/42">{unlocked ? title.rarity : "bloqueado"}</span>
              <span className="mt-1 block text-lg font-black">{unlocked ? title.name : "???"}</span>
              <span className="mt-1 block text-sm text-white/55">{unlocked ? title.flavorText : "El Tribunal aun no autorizo esta vanidad."}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
