"use client";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useCollectionStore } from "@/store/collectionStore";
import { useDeckStore, validateDeck } from "@/store/deckStore";

export function DeckValidationPanel() {
  const cardIds = useDeckStore((state) => state.cardIds);
  const selectedFactions = useDeckStore((state) => state.selectedFactions);
  const extreme = useCollectionStore((state) => state.extremeJudgmentUnlocked);
  const validation = validateDeck(cardIds, selectedFactions, extreme);
  const Icon = validation.valid ? ShieldCheck : ShieldAlert;

  return (
    <section className="rounded-lg border border-white/10 bg-black/48 p-4">
      <div className="flex items-center gap-2">
        <Icon className={validation.valid ? "text-emerald-200" : "text-rose-200"} size={22} />
        <h2 className="text-xl font-black text-white">Validacion</h2>
      </div>
      <div className="mt-3 space-y-2">
        {validation.warnings.map((warning) => (
          <p key={warning} className="rounded-md bg-white/6 p-3 text-sm text-white/68">
            {warning}
          </p>
        ))}
      </div>
    </section>
  );
}
