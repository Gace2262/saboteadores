"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatedBackground } from "@/components/art/AnimatedBackground";
import { FactionSymbol } from "@/components/art/FactionSymbol";
import { useRealGameStore } from "@/store/gameStore";
import { visualTheme } from "@/styles/visualTheme";
import { soundtrackController } from "@/logic/audio/soundtrackController";
import { BattleLog } from "./BattleLog";
import { EffectOverlay } from "./EffectOverlay";
import { EnemyPanel } from "./EnemyPanel";
import { PlayerHand } from "./PlayerHand";
import { ResourceBar } from "./ResourceBar";

export function BattleBoard() {
  const {
    selectedDeckId,
    player,
    enemy,
    hand,
    deck,
    discard,
    turn,
    log,
    activeEffect,
    bossPhrase,
    bossPhase,
    winner,
    muted,
    reducedMotion,
    startDemoBattle,
    playDemoCard,
    endDemoTurn,
    restartDemo,
    toggleDemoMute,
    toggleDemoReducedMotion,
    clearDemoEffect,
  } = useRealGameStore();

  useEffect(() => {
    if (!selectedDeckId || hand.length === 0) startDemoBattle(selectedDeckId ?? "oficina-control");
  }, [hand.length, selectedDeckId, startDemoBattle]);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 text-white">
      <AnimatedBackground variant="battle" reducedMotion={reducedMotion} />
      <EffectOverlay effect={activeEffect} muted={muted} reducedMotion={reducedMotion} onDone={clearDemoEffect} />
      <section className="relative mx-auto grid max-w-7xl gap-5">
        <header className={`${visualTheme.etchedPanel} p-4`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-100/55">Turno {turn} / Audiencia demo</p>
              <h1 className="mt-1 text-3xl font-black">Audiencia contra el Perfeccionista Ascendido</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={toggleDemoMute} className={visualTheme.ghostButton}>
                {muted ? "Activar audio" : "Mute"}
              </button>
              <button type="button" onClick={toggleDemoReducedMotion} className={visualTheme.ghostButton}>
                {reducedMotion ? "Animaciones normales" : "Reducir animaciones"}
              </button>
              <button type="button" onClick={restartDemo} className={visualTheme.button}>
                Reiniciar demo
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[300px_1fr_360px]">
          <aside className={`${visualTheme.etchedPanel} p-4`}>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-100/55">Jugador</p>
            <div className="mt-2 flex items-center gap-3">
              <FactionSymbol faction="conciencia" className="h-14 w-14" />
              <h2 className="text-3xl font-black">La Defensa</h2>
            </div>
            <div className="mt-4 grid gap-3">
              <ResourceBar label="Voluntad" value={player.will} max={30} tone="red" />
              <ResourceBar label="Claridad" value={player.clarity} max={10} tone="gold" />
              <ResourceBar label="Estres" value={player.stress} max={12} tone="violet" />
              <ResourceBar label="Ruido Mental" value={player.mentalNoise} max={12} tone="blue" />
            </div>
            {player.blocked ? <p className="mt-3 rounded border border-rose-200/25 bg-rose-500/10 p-2 text-sm font-bold text-rose-100">Tu proximo turno esta bloqueado.</p> : null}
            <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm text-white/62">
              Mazo {deck.length} / Descarte {discard.length}
            </div>
          </aside>

          <section className={`${visualTheme.etchedPanel} p-5`}>
            <div className="relative grid min-h-[460px] place-items-center overflow-hidden rounded-xl border border-dashed border-amber-100/24 bg-[radial-gradient(circle,rgba(242,211,123,0.12),transparent_35%)] p-6 text-center">
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px]" />
              <div className="absolute left-1/2 top-12 h-40 w-40 -translate-x-1/2 rounded-full border border-amber-100/22 shadow-[0_0_90px_rgba(242,211,123,0.14)]" />
              <div className="relative">
                <FactionSymbol faction="juez" className="mx-auto h-20 w-20" />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.3em] text-amber-100/55">Mesa del Tribunal</p>
                <h2 className="mt-2 text-4xl font-black md:text-5xl">Cartas, turnos y consecuencias</h2>
                <p className="mx-auto mt-4 max-w-xl leading-7 text-white/64">
                  Juega cartas gastando Claridad. Termina turno para que la IA responda. Gana quien deje la Voluntad rival en 0.
                </p>
                <button type="button" onClick={endDemoTurn} disabled={Boolean(winner)} className={`${visualTheme.button} mx-auto mt-8`}>
                  Terminar turno
                </button>
              </div>
            </div>
          </section>

          <div className="grid gap-4">
            <EnemyPanel enemy={enemy} phase={bossPhase} phrase={bossPhrase} reducedMotion={reducedMotion} />
            <BattleLog entries={log} />
          </div>
        </div>

        <PlayerHand hand={hand} clarity={player.clarity} onPlay={playDemoCard} />
      </section>

      {winner ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/88 px-5">
          <section className="relative max-w-2xl overflow-hidden rounded-xl border border-amber-100/28 bg-zinc-950 p-8 text-center shadow-[0_0_100px_rgba(242,211,123,0.16)]">
            <div
              className={`absolute inset-0 ${
                winner === "win"
                  ? "bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18),transparent_38%)]"
                  : "bg-[radial-gradient(circle_at_50%_18%,rgba(127,29,29,0.25),transparent_42%)]"
              }`}
            />
            <div className="relative">
              <FactionSymbol faction={winner === "win" ? "conciencia" : "juez"} className="mx-auto h-20 w-20" />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Final demo</p>
              <h2 className="mt-3 text-5xl font-black">{winner === "win" ? "Juicio Suspendido" : "Condena Interna"}</h2>
              <p className="mt-4 text-xl leading-8 text-white/72">
                {winner === "win"
                  ? "El Perfeccionista cayo. El Tribunal tomo nota."
                  : "El fracaso tambien fue archivado con excelente caligrafia."}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => { soundtrackController.playSfx("ui_confirm"); restartDemo(); }} className={visualTheme.button}>
                  Reiniciar demo
                </button>
                <Link href="/demo" className={visualTheme.ghostButton}>
                  Elegir otro mazo
                </Link>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
