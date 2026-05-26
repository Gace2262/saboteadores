"use client";

import Link from "next/link";
import { FlaskConical, Save, Sparkles, Trash2 } from "lucide-react";
import { allCards } from "@/data/cards";
import { starterDecks } from "@/data/starterDecks";
import { Card } from "@/components/Card";
import { SyncStatusBadge } from "@/components/cloud/SyncStatusBadge";
import { DynamicBackground } from "@/components/ui/DynamicBackground";
import { useCollectionStore } from "@/store/collectionStore";
import { isCardAllowedForFactions, useDeckStore } from "@/store/deckStore";
import { CardSearchInput } from "./CardSearchInput";
import { DeckList } from "./DeckList";
import { DeckNameInput } from "./DeckNameInput";
import { DeckStats } from "./DeckStats";
import { DeckValidationPanel } from "./DeckValidationPanel";
import { FactionSynergyPanel } from "./FactionSynergyPanel";
import { SavedDecksList } from "./SavedDecksList";

export function DeckBuilder() {
  const selectedFactions = useDeckStore((state) => state.selectedFactions);
  const search = useDeckStore((state) => state.search).toLowerCase();
  const addCard = useDeckStore((state) => state.addCard);
  const clearDeck = useDeckStore((state) => state.clearDeck);
  const autoCompleteDeck = useDeckStore((state) => state.autoCompleteDeck);
  const saveDeck = useDeckStore((state) => state.saveDeck);
  const loadStarter = useDeckStore((state) => state.loadStarter);
  const extreme = useCollectionStore((state) => state.extremeJudgmentUnlocked);

  const library = allCards.filter((card) => {
    if (!card.collectible) return false;
    if (!isCardAllowedForFactions(card, selectedFactions, extreme)) return false;
    if (!search) return true;
    return [card.name, card.type, card.rarity, card.faction, card.keywords.join(" "), card.effectText]
      .join(" ")
      .toLowerCase()
      .includes(search);
  });

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <DynamicBackground id="grimorio" />
      <div className="absolute inset-0 deck-ritual-bg" />
      <section className="relative z-10 mx-auto grid w-full max-w-[1800px] gap-4 xl:grid-cols-[340px_1fr_360px]">
        <aside className="space-y-4">
          <DeckNameInput />
          <FactionSynergyPanel />
          <DeckValidationPanel />
          <SyncStatusBadge />
          <SavedDecksList compact />
        </aside>

        <section className="rounded-lg border border-amber-100/15 bg-black/42 p-4">
          <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase text-amber-100/65">Constructor avanzado</p>
              <h1 className="text-4xl font-black md:text-5xl">Mesa ritual de mazos</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {starterDecks.map((starter) => (
                <button key={starter.id} className="rounded-md border border-white/12 bg-white/6 px-3 py-2 text-xs font-black uppercase text-white/70" onClick={() => loadStarter(starter.id)}>
                  {starter.name}
                </button>
              ))}
            </div>
          </header>
          <div className="mb-4 flex flex-wrap gap-2">
            <button className="campaign-action" onClick={autoCompleteDeck}>
              <Sparkles size={17} />
              Autocompletar mazo
            </button>
            <button className="campaign-danger" onClick={clearDeck}>
              <Trash2 size={17} />
              Limpiar mazo
            </button>
            <button className="campaign-action" onClick={saveDeck}>
              <Save size={17} />
              Guardar mazo
            </button>
            <Link className="campaign-choice max-w-44" href="/battle">
              <FlaskConical size={17} />
              Probar mazo
            </Link>
          </div>
          <CardSearchInput />
          <div className="mt-4 grid max-h-[760px] gap-4 overflow-y-auto pr-2 md:grid-cols-2 2xl:grid-cols-3">
            {library.map((card) => (
              <Card key={card.id} card={card} onClick={() => addCard(card.id)} />
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <DeckList />
          <DeckStats />
        </aside>
      </section>
    </main>
  );
}
