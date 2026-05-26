"use client";

import { useMultiplayerStore } from "@/store/multiplayerStore";

export function MatchStatusBadge() {
  const match = useMultiplayerStore((state) => state.currentMatch);
  if (!match) return <div className="rounded border border-white/10 bg-black/45 p-3 text-white/60">Sin audiencia activa.</div>;
  return (
    <div className="rounded-md border border-amber-100/20 bg-black/55 p-3 text-sm text-white">
      <p className="font-black uppercase text-amber-100">Partida {match.status}</p>
      <p className="mt-1 text-white/60">Turno {match.turnNumber} / fase {match.phase}</p>
      <p className="text-xs text-white/40">Checksum {match.lastChecksum}</p>
    </div>
  );
}
