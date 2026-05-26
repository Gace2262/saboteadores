"use client";

import { useMultiplayerStore } from "@/store/multiplayerStore";

export function OpponentStatusPanel() {
  const match = useMultiplayerStore((state) => state.currentMatch);
  if (!match) return null;
  return (
    <section className="grid gap-3 md:grid-cols-2">
      {match.players.map((player) => {
        const resources = match.resources[player.id];
        const active = match.activePlayerId === player.id;
        return (
          <div key={player.id} className={`rounded-lg border p-4 ${active ? "border-amber-100/45 bg-amber-100/10" : "border-white/10 bg-black/45"}`}>
            <p className="text-xs font-black uppercase text-white/45">{active ? "Turno activo" : "Esperando"}</p>
            <h3 className="mt-1 text-2xl font-black text-white">{player.name}</h3>
            <p className="mt-2 text-sm text-white/60">Voluntad {resources.willpower} / Claridad {resources.clarity}</p>
            <p className="text-sm text-white/60">Estres {resources.stress} / Ruido {resources.mentalNoise}</p>
          </div>
        );
      })}
    </section>
  );
}
