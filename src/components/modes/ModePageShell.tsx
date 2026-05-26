"use client";

import Link from "next/link";
import { getGameMode, type GameModeId } from "@/data/gameModes";
import { useModeStore } from "@/store/modeStore";

export function ModePageShell({ modeId, children }: { modeId: GameModeId; children: React.ReactNode }) {
  const mode = getGameMode(modeId);
  const record = useModeStore((state) => state.records[modeId]);
  if (!mode) return null;
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <div className="absolute inset-0 court-fog opacity-70" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <Link href="/game-modes" className="inline-flex rounded-md border border-white/12 bg-black/45 px-3 py-2 text-sm font-black uppercase text-white/70 hover:bg-white/10">
          Volver a modos
        </Link>
        <header className="mt-4 rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">{mode.difficulty} - {mode.visual}</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">{mode.name}</h1>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-white/66">{mode.description}</p>
          <p className="mt-4 rounded-md border border-white/10 bg-white/6 p-4 text-xl font-black text-white/78">{mode.narratorLine}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Metric label="Jugadas" value={`${record.plays}`} />
            <Metric label="Victorias" value={`${record.wins}`} />
            <Metric label="Mejor puntaje" value={`${record.bestScore}`} />
            <Metric label="Recompensas" value={`${record.unlockedRewards.length}`} />
          </div>
        </header>
        <div className="mt-5">{children}</div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/45 p-3">
      <p className="text-xs font-black uppercase text-white/42">{label}</p>
      <p className="mt-1 text-2xl font-black text-amber-100">{value}</p>
    </div>
  );
}
