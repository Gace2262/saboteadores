"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { BattleBoard } from "@/components/BattleBoard";
import { useGameStore } from "@/store/gameStore";
import { useExtremeJudgmentStore } from "@/store/extremeJudgmentStore";
import { ExtremeJudgmentMeter } from "./ExtremeJudgmentMeter";
import { RandomHammerEvent } from "./RandomHammerEvent";

export function ExtremeBattleIntro() {
  const router = useRouter();
  const player = useGameStore((state) => state.player);
  const hand = useGameStore((state) => state.hand);
  const turn = useGameStore((state) => state.turn);
  const winner = useGameStore((state) => state.winner);
  const phase = useGameStore((state) => state.phase);
  const { judgmentMeter, meterThreshold, activeEvent, reducedFlashes, raiseMeter, clearEvent, finishRun } = useExtremeJudgmentStore();
  const previous = useRef({ stress: player.stress, will: player.will, noise: player.mentalNoise, hand: hand.length, turn });
  const finished = useRef(false);

  useEffect(() => {
    const last = previous.current;
    if (player.stress > last.stress) raiseMeter((player.stress - last.stress) * 8, "Estres ganado");
    if (player.will < last.will) raiseMeter((last.will - player.will) * 5, "dano del Juez");
    if (player.mentalNoise > last.noise) raiseMeter((player.mentalNoise - last.noise) * 6, "Ruido Mental acumulado");
    if (hand.length < last.hand && phase === "battle") raiseMeter((last.hand - hand.length) * 5, "descarte negativo");
    previous.current = { stress: player.stress, will: player.will, noise: player.mentalNoise, hand: hand.length, turn };
  }, [hand.length, phase, player.mentalNoise, player.stress, player.will, raiseMeter, turn]);

  useEffect(() => {
    if (!winner || finished.current) return;
    finished.current = true;
    finishRun(winner === "player");
    const timer = window.setTimeout(() => router.push("/extreme-judgment/result"), 900);
    return () => window.clearTimeout(timer);
  }, [finishRun, router, winner]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 extreme-judgment-bg opacity-70" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pt-4">
        <div className="mb-4 grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-amber-100/18 bg-black/62 p-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-amber-100" size={30} />
              <div>
                <p className="text-xs font-black uppercase text-amber-100/60">Tribunal del Craneo</p>
                <h1 className="text-3xl font-black">Juicio Extremo</h1>
              </div>
            </div>
            <p className="mt-2 text-sm text-white/55">
              Pesadilla activa: martillazos aleatorios, cadenas flotantes y cero respeto por tu agenda emocional.
            </p>
          </div>
          <ExtremeJudgmentMeter value={judgmentMeter} threshold={meterThreshold} />
        </div>
      </div>
      <div className="relative z-10">
        <BattleBoard />
      </div>
      <RandomHammerEvent event={activeEvent} reducedFlashes={reducedFlashes} onClose={clearEvent} />
    </main>
  );
}
