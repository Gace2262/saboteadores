"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { proceduralRunModifiers } from "@/data/procedural/runModifiers";
import type { ProceduralDifficulty, ProceduralMode } from "@/logic/procedural/proceduralTypes";
import { useProceduralCampaignStore } from "@/store/proceduralCampaignStore";
import { SeedInput } from "./SeedInput";

const decks = [
  ["oficina-control", "Oficina del Control", "Controlador + Perfeccionista"],
  ["circo-pendientes", "Circo de Pendientes", "Inquieto + Hipervigilante"],
  ["manual-no-me-pasa", "Manual del No Me Pasa Nada", "Reservado + Evitador"],
];

const difficulties: [ProceduralDifficulty, string][] = [
  ["audiencia-suave", "Audiencia Suave"],
  ["crisis-formal", "Crisis Formal"],
  ["juicio-serio", "Juicio Serio"],
  ["tribunal-desatado", "Tribunal Desatado"],
];

export function ProceduralCampaignSetup() {
  const router = useRouter();
  const lastSetup = useProceduralCampaignStore((state) => state.lastSetup);
  const generateRun = useProceduralCampaignStore((state) => state.generateRun);
  const [seedText, setSeedText] = useState(lastSetup.seedText);
  const [deckId, setDeckId] = useState(lastSetup.deckId);
  const [difficulty, setDifficulty] = useState<ProceduralDifficulty>(lastSetup.difficulty);
  const [mode, setMode] = useState<ProceduralMode>(lastSetup.mode);
  const [modifierId, setModifierId] = useState(lastSetup.forcedModifierId ?? proceduralRunModifiers[0].id);

  const startRun = () => {
    generateRun({
      seedText,
      deckId,
      difficulty,
      mode,
      forcedModifierId: modifierId,
      deckFactions: deckId === "oficina-control" ? ["controlador", "perfeccionista"] : deckId === "circo-pendientes" ? ["inquieto", "hipervigilante"] : ["reservado", "evitador"],
      stressLean: deckId === "circo-pendientes",
      controlLean: deckId === "oficina-control",
    });
    router.push("/procedural-campaign/map");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,211,123,0.2),transparent_30%),linear-gradient(135deg,#050308,#130915_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-6xl gap-6">
        <header className="rounded-2xl border border-amber-100/18 bg-black/60 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Setup procedural</p>
          <h1 className="mt-2 text-5xl font-black">Nuevo expediente del Tribunal</h1>
          <p className="mt-3 max-w-3xl text-white/60">Elige mazo, dificultad, seed y modificador. El mapa resultante sera reproducible, compartible y un poco insolente.</p>
        </header>
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
            <SeedInput value={seedText} onChange={setSeedText} />
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decks.map(([id, name, subtitle]) => (
                <button key={id} type="button" onClick={() => setDeckId(id)} className={`rounded-xl border p-4 text-left ${deckId === id ? "border-amber-200 bg-amber-200/15" : "border-white/10 bg-white/[0.04]"}`}>
                  <h2 className="font-black">{name}</h2>
                  <p className="mt-1 text-xs text-white/50">{subtitle}</p>
                </button>
              ))}
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-white/70">
                Dificultad
                <select value={difficulty} onChange={(event) => setDifficulty(event.target.value as ProceduralDifficulty)} className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-3 text-white">
                  {difficulties.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-white/70">
                Modo
                <select value={mode} onChange={(event) => setMode(event.target.value as ProceduralMode)} className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-3 text-white">
                  <option value="rapido">Rapido 10 a 15 min</option>
                  <option value="largo">Largo 30 a 50 min</option>
                </select>
              </label>
            </div>
          </section>
          <aside className="rounded-2xl border border-amber-100/18 bg-amber-100/10 p-5">
            <h2 className="text-2xl font-black">Modificador inicial</h2>
            <select value={modifierId} onChange={(event) => setModifierId(event.target.value)} className="mt-4 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-3 text-white">
              {proceduralRunModifiers.map((modifier) => <option key={modifier.id} value={modifier.id}>{modifier.name}</option>)}
            </select>
            <p className="mt-4 text-sm text-white/60">{proceduralRunModifiers.find((modifier) => modifier.id === modifierId)?.description}</p>
            <button type="button" onClick={startRun} className="campaign-action mt-6">Generar mapa</button>
          </aside>
        </div>
      </section>
    </main>
  );
}
