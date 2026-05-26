"use client";

import Link from "next/link";
import { tutorialDeckChoices } from "@/data/tutorialDecks";
import { useGameStore } from "@/store/gameStore";
import { useTutorialStore } from "@/store/tutorialStore";

export function FirstDeckChoice() {
  const { selectedDeckId, selectDeck, completeTutorial } = useTutorialStore();
  const selectedFactions = useGameStore((state) => state.selectedFactions);
  const toggleFaction = useGameStore((state) => state.toggleFaction);
  const choose = (deckId: typeof tutorialDeckChoices[number]["id"]) => {
    const deck = tutorialDeckChoices.find((item) => item.id === deckId) ?? tutorialDeckChoices[0];
    selectDeck(deck.id);
    selectedFactions.forEach((faction) => {
      if (!deck.factions.includes(faction)) toggleFaction(faction);
    });
    deck.factions.forEach((faction) => {
      if (!useGameStore.getState().selectedFactions.includes(faction)) toggleFaction(faction);
    });
  };
  return (
    <section className="rounded-lg border border-white/10 bg-black/50 p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/60">Primer mazo</p>
      <h2 className="mt-2 text-4xl font-black">Elige tu mecanismo inicial</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {tutorialDeckChoices.map((deck) => (
          <button key={deck.id} onClick={() => choose(deck.id)} className={`rounded-lg border p-5 text-left ${selectedDeckId === deck.id ? "border-cyan-100/60 bg-cyan-300/12" : "border-white/10 bg-white/5"}`}>
            <h3 className="text-2xl font-black text-white">{deck.name}</h3>
            <p className="mt-2 text-sm font-bold text-cyan-100">{deck.style}</p>
            <p className="mt-3 text-sm text-white/62">{deck.phrase}</p>
            <p className="mt-4 text-xs uppercase text-white/42">{deck.factions.join(" + ")}</p>
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/battle" onClick={completeTutorial} className="campaign-action max-w-xs">
          Probar mazo
        </Link>
        <Link href="/" onClick={completeTutorial} className="campaign-choice max-w-xs">
          Terminar audiencia
        </Link>
      </div>
    </section>
  );
}
