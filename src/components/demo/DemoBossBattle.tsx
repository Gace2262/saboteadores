"use client";

import { useState } from "react";
import Link from "next/link";
import { demoBoss } from "@/data/demo/demoBoss";
import { demoDialogues } from "@/data/demo/demoDialogues";
import { useDemoStore } from "@/store/demoStore";
import { BossIntentPreview } from "@/components/battle/BossIntentPreview";
import { DemoProgressBar } from "./DemoProgressBar";

type Props = {
  normalBattle?: boolean;
};

export function DemoBossBattle({ normalBattle = false }: Props) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const completeStage = useDemoStore((state) => state.completeStage);
  const setBossOutcome = useDemoStore((state) => state.setBossOutcome);
  const phase = demoBoss.phases[phaseIndex];
  const activeStage = normalBattle ? "battle" : "boss";

  const advance = () => {
    if (normalBattle) {
      completeStage("battle");
      return;
    }
    if (phaseIndex < demoBoss.phases.length - 1) setPhaseIndex((value) => value + 1);
    else {
      setBossOutcome("win");
      completeStage("boss");
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,211,123,0.2),transparent_26%),linear-gradient(135deg,#050308,#19090a_55%,#050308)] px-5 py-8 text-white">
      <section className="mx-auto grid max-w-7xl gap-6">
        <DemoProgressBar active={activeStage} />
        <header className="rounded-2xl border border-amber-100/20 bg-black/60 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">{normalBattle ? "Primer combate real" : "Boss fight demo"}</p>
          <h1 className="mt-2 text-5xl font-black">{normalBattle ? "Controlador Menor" : demoBoss.name}</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            {normalBattle ? "Prueba tu mazo con IA simple, intencion visible y log de combate controlado." : "Tres fases, escenario agrietado y musica que sube con cada correccion innecesaria."}
          </p>
        </header>
        <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(242,211,123,0.08),transparent),repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_90px)]" />
            <div className="relative grid gap-5">
              <div className="rounded-xl border border-rose-100/20 bg-rose-900/20 p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-rose-100/55">Fase activa</p>
                <h2 className="mt-2 text-4xl font-black">{normalBattle ? "Tramite Inicial" : phase.name}</h2>
                <p className="mt-2 text-sm text-white/62">{normalBattle ? "Bloquea una carta y reduce opciones." : phase.rule}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {(normalBattle ? ["Bloqueo administrativo", "Golpe menor", "Fin de turno"] : demoDialogues.boss).map((line) => (
                  <article key={line} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-bold text-white/78">{line}</p>
                  </article>
                ))}
              </div>
              <div className="rounded-xl border border-amber-100/20 bg-amber-100/10 p-4">
                <p className="text-sm text-amber-50/80">Log: carta jugada, dano aplicado, Claridad gastada, respuesta del boss y subtitulos de audio quedan visibles para grabacion.</p>
              </div>
            </div>
          </div>
          <aside className="grid gap-4">
            <BossIntentPreview intent={normalBattle ? "block" : phaseIndex === 0 ? "punish_stress" : phaseIndex === 1 ? "prepare_combo" : "attack"} preview={normalBattle ? "El Controlador Menor prepara una Cadena." : "El Perfeccionista afila una correccion. Probablemente con tipografia perfecta."} />
            <div className="rounded-2xl border border-white/10 bg-black/50 p-5">
              <h2 className="text-2xl font-black">Audio dinamico</h2>
              <p className="mt-2 text-sm text-white/55">Base oscura, percusion al subir Estres y coro triste cuando la Catedral del Casi se agrieta.</p>
            </div>
            {normalBattle ? (
              <Link href="/demo/event" onClick={advance} className="campaign-action">
                Ganar combate
              </Link>
            ) : (
              <>
                <button type="button" onClick={advance} className="campaign-action">
                  {phaseIndex < demoBoss.phases.length - 1 ? "Romper fase" : "Vencer boss"}
                </button>
                <Link href="/demo/end" onClick={() => { setBossOutcome("loss"); completeStage("boss"); }} className="campaign-choice">
                  Simular derrota
                </Link>
              </>
            )}
          </aside>
        </section>
      </section>
    </main>
  );
}
