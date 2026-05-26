"use client";

import { allCards } from "@/data/cards";
import { tutorialRewardCards } from "@/data/tutorialDecks";
import { useCollectionStore } from "@/store/collectionStore";
import { useProgressionStore } from "@/store/progressionStore";
import { useTutorialStore } from "@/store/tutorialStore";

export function TutorialRewardScreen() {
  const selectRewardCard = useTutorialStore((state) => state.selectRewardCard);
  const selectedRewardCardId = useTutorialStore((state) => state.selectedRewardCardId);
  const grantCard = useCollectionStore((state) => state.grantCard);
  const unlockTitle = useProgressionStore((state) => state.unlockTitle);
  const cards = tutorialRewardCards.map((id) => allCards.find((card) => card.id === id)).filter(Boolean);
  const choose = (cardId: string) => {
    selectRewardCard(cardId);
    grantCard(cardId, "Tutorial: primera audiencia");
    unlockTitle("citado-oficialmente");
  };
  return (
    <section className="rounded-lg border border-amber-100/18 bg-black/58 p-5">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/60">Recompensa tutorial</p>
      <h2 className="mt-2 text-4xl font-black">Elige una carta nueva</h2>
      <p className="mt-3 text-white/60">Tambien recibes 1 Sobre de Pensamientos Intrusivos, 150 Fragmentos, titulo Citado Oficialmente y avatar El Sobreviviente.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {cards.map((card) => card ? (
          <button key={card.id} onClick={() => choose(card.id)} className={`rounded-lg border p-4 text-left ${selectedRewardCardId === card.id ? "border-amber-100/60 bg-amber-100/14" : "border-white/10 bg-white/5"}`}>
            <p className="text-xs font-black uppercase text-white/45">{card.rarity} / {card.type}</p>
            <h3 className="mt-2 text-2xl font-black text-white">{card.name}</h3>
            <p className="mt-2 text-sm text-white/58">{card.effectText}</p>
            <p className="mt-3 text-sm font-bold text-amber-100">{card.impactText}</p>
          </button>
        ) : null)}
      </div>
    </section>
  );
}
