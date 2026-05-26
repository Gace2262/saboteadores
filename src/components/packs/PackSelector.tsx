"use client";

import { packDefinitions, type PackId } from "@/data/packs";
import { useCollectionStore } from "@/store/collectionStore";

export function PackSelector({ onOpen }: { onOpen: (packId: PackId) => void }) {
  const mentalKeys = useCollectionStore((state) => state.mentalKeys);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {packDefinitions.map((pack) => {
        const locked = Boolean(pack.keyCost && mentalKeys < pack.keyCost);
        return (
          <button
            key={pack.id}
            disabled={locked}
            onClick={() => onOpen(pack.id)}
            className="relative min-h-72 overflow-hidden rounded-lg border border-amber-100/15 bg-black/48 p-5 text-left transition hover:-translate-y-1 hover:border-amber-100/50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(242,211,123,0.2),transparent_38%),radial-gradient(circle_at_70%_90%,rgba(159,92,255,0.15),transparent_38%)]" />
            <div className="relative z-10 flex h-full flex-col">
              <p className="text-xs font-black uppercase text-amber-100/58">Sobre</p>
              <h2 className="mt-2 text-2xl font-black text-white">{pack.name}</h2>
              <p className="mt-3 text-sm leading-6 text-white/62">{pack.description}</p>
              <p className="mt-auto rounded-md bg-black/45 p-3 text-sm font-black text-amber-100">{pack.phrase}</p>
              {pack.keyCost ? <p className="mt-3 text-xs text-white/50">Requiere {pack.keyCost} llave mental</p> : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}
