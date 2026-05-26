"use client";

import { arenaRanks, getArenaRank } from "@/data/arenaRanks";
import { useModeStore } from "@/store/modeStore";

export function ArenaRankingBoard() {
  const record = useModeStore((state) => state.records.arena);
  const completeModeRun = useModeStore((state) => state.completeModeRun);
  const currentRank = getArenaRank(record.arenaWins);
  return (
    <section className="rounded-lg border border-amber-100/16 bg-black/52 p-5">
      <p className="text-sm font-black uppercase text-amber-100/65">Arena de Saboteadores</p>
      <h2 className="mt-1 text-4xl font-black">{currentRank.name}</h2>
      <p className="mt-2 text-white/62">Victorias locales: <strong className="text-amber-100">{record.arenaWins}</strong>. Temporada offline, ego opcional.</p>
      <div className="mt-5 grid gap-3">
        {arenaRanks.map((rank) => (
          <div key={rank.id} className={`rounded-md border p-3 ${rank.id === currentRank.id ? "border-amber-100/45 bg-amber-100/12" : "border-white/10 bg-white/6"}`}>
            <div className="flex justify-between gap-3">
              <strong>{rank.name}</strong>
              <span className="text-amber-100">{rank.minWins}+ victorias</span>
            </div>
            <p className="mt-1 text-sm text-white/55">{rank.reward} - {rank.flavorText}</p>
          </div>
        ))}
      </div>
      <button className="campaign-action mt-5" onClick={() => completeModeRun("arena", { won: true, score: record.arenaWins * 100 + 100 })}>
        Registrar victoria de arena
      </button>
    </section>
  );
}
