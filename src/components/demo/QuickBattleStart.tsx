"use client";

import Link from "next/link";
import { useGameStore } from "@/store/gameStore";

export function QuickBattleStart() {
  const setAIProfile = useGameStore((state) => state.setAIProfile);
  const startBattle = useGameStore((state) => state.startBattle);
  const prepare = () => {
    setAIProfile("controlador");
    startBattle();
  };
  return (
    <section className="rounded-lg border border-red-100/15 bg-black/52 p-5">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-red-100/60">Tutorial rapido</p>
      <h2 className="mt-2 text-3xl font-black text-white">Controlador: combate de demo</h2>
      <p className="mt-3 text-white/60">Prepara una partida corta contra Controlador para mostrar recursos, mano, costes y bloqueo sin explicar una enciclopedia emocional.</p>
      <Link href="/battle" onClick={prepare} className="campaign-action mt-5 max-w-xs">
        Iniciar combate rapido
      </Link>
    </section>
  );
}
