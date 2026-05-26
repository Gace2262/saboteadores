"use client";

import { gameModes } from "@/data/gameModes";
import { useModeStore } from "@/store/modeStore";
import { GameModeCard } from "./GameModeCard";

export function ModeSelectionGrid() {
  const records = useModeStore((state) => state.records);
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <div className="absolute inset-0 court-fog opacity-70" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Salon mental fracturado</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Modos de juego especiales</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            El Tribunal Mental empezo a deformar sus propias reglas. Cada puerta lleva a una version distinta del conflicto interno, con recompensas offline y cero matchmaking por ahora.
          </p>
        </header>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gameModes.map((mode) => (
            <GameModeCard key={mode.id} mode={mode} record={records[mode.id]} />
          ))}
        </div>
      </section>
    </main>
  );
}
