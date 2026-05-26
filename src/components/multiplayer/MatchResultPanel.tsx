"use client";

import { useMultiplayerStore } from "@/store/multiplayerStore";

export function MatchResultPanel() {
  const match = useMultiplayerStore((state) => state.currentMatch);
  if (!match || match.status !== "finished") return null;
  const winner = match.players.find((player) => player.id === match.winnerId);
  return (
    <section className="rounded-lg border border-emerald-100/20 bg-emerald-300/10 p-5 text-white">
      <p className="text-sm font-black uppercase text-emerald-100/70">Resultado</p>
      <h2 className="mt-2 text-4xl font-black">{winner?.name ?? "El Tribunal"} gana</h2>
      <p className="mt-2 text-white/60">La audiencia local queda registrada. Nadie fue absuelto, pero alguien robo mejor.</p>
    </section>
  );
}
