"use client";

import { allCards } from "@/data/cards";
import { useMultiplayerStore } from "@/store/multiplayerStore";
import { EmoteWheel } from "./EmoteWheel";
import { MatchResultPanel } from "./MatchResultPanel";
import { MatchStatusBadge } from "./MatchStatusBadge";
import { OpponentStatusPanel } from "./OpponentStatusPanel";
import { TurnTimer } from "./TurnTimer";

export function LocalMatchSetup() {
  const match = useMultiplayerStore((state) => state.currentMatch);
  const startLocalMatch = useMultiplayerStore((state) => state.startLocalMatch);
  const playCard = useMultiplayerStore((state) => state.playCard);
  const drawCard = useMultiplayerStore((state) => state.drawCard);
  const endTurn = useMultiplayerStore((state) => state.endTurn);
  const concede = useMultiplayerStore((state) => state.concede);

  const hand = match?.hands[match.activePlayerId] ?? [];

  return (
    <section className="grid gap-5">
      <div className="rounded-lg border border-amber-100/18 bg-black/62 p-6 text-white">
        <p className="text-sm font-black uppercase text-amber-100/65">Modo local</p>
        <h1 className="mt-2 text-5xl font-black">Pasar dispositivo</h1>
        <p className="mt-3 text-white/65">Entrega el dispositivo. El Tribunal promete no mirar. Mucho.</p>
        <button className="campaign-action mt-5 max-w-xs" onClick={startLocalMatch}>Crear partida local</button>
      </div>
      <MatchStatusBadge />
      <OpponentStatusPanel />
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <section className="rounded-lg border border-white/10 bg-black/45 p-5 text-white">
          <h2 className="text-2xl font-black">Mano del jugador activo</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {hand.map((cardId) => {
              const card = allCards.find((item) => item.id === cardId);
              if (!card) return null;
              return (
                <button key={cardId} className="rounded border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10" onClick={() => playCard(cardId)}>
                  <p className="font-black text-amber-100">{card.name}</p>
                  <p className="text-xs text-white/55">Costo {card.cost} / dano {card.willpowerDamage}</p>
                  <p className="mt-2 text-xs text-white/45">{card.impactText}</p>
                </button>
              );
            })}
          </div>
        </section>
        <aside className="grid gap-3">
          <TurnTimer />
          <button className="campaign-choice" onClick={drawCard}>Robar carta</button>
          <button className="campaign-action" onClick={endTurn}>Terminar turno</button>
          <button className="campaign-danger" onClick={concede}>Conceder</button>
        </aside>
      </div>
      <MatchResultPanel />
      <EmoteWheel />
    </section>
  );
}
