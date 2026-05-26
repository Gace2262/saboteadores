"use client";

import Link from "next/link";
import { Trophy, RotateCcw } from "lucide-react";
import { extremeDifficulties } from "@/data/extremeModifiers";
import { useExtremeJudgmentStore } from "@/store/extremeJudgmentStore";

export function ExtremeResultScreen() {
  const { lastResult, attempts, bestScore } = useExtremeJudgmentStore();

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 extreme-judgment-bg" />
      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-amber-100/18 bg-black/62 p-7">
          <p className="text-sm font-black uppercase text-amber-100/70">Resultado</p>
          <h1 className="mt-2 text-6xl font-black">
            {lastResult?.won ? "Pesadilla archivada" : "Condena con amplificador"}
          </h1>
          <p className="mt-4 text-xl text-white/68">
            {lastResult?.won
              ? "El Tribunal del Craneo queda suspendido por exceso de autoestima insolente."
              : "El martillo gano la mezcla de audio. Tu mente pide revancha con casco."}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Metric label="Puntaje" value={`${lastResult?.score ?? 0}`} />
            <Metric label="Mejor marca" value={`${bestScore}`} />
            <Metric label="Dificultad" value={lastResult ? extremeDifficulties[lastResult.difficulty].name : "Sin registro"} />
          </div>
          {lastResult?.won ? (
            <div className="mt-6 rounded-lg border border-emerald-100/20 bg-emerald-400/10 p-4">
              <Trophy className="text-emerald-100" />
              <h2 className="mt-2 text-2xl font-black">Recompensas desbloqueadas</h2>
              <p className="mt-2 text-white/66">
                Titulo especial, sobre maldito, carta exclusiva, cosmetico de energia maldita y registro en perfil.
              </p>
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="campaign-action" href="/extreme-judgment/setup">
              <RotateCcw size={18} />
              Nuevo juicio
            </Link>
            <Link className="campaign-choice max-w-52" href="/profile">
              Ver perfil
            </Link>
          </div>
        </div>

        <aside className="rounded-lg border border-white/12 bg-black/52 p-5">
          <p className="text-xs font-black uppercase text-amber-100/60">Historial de intentos</p>
          <div className="mt-4 grid gap-3">
            {attempts.length ? attempts.map((attempt) => (
              <div key={attempt.id} className="rounded-md border border-white/10 bg-white/6 p-3">
                <strong className={attempt.won ? "text-emerald-100" : "text-rose-100"}>{attempt.won ? "Victoria" : "Derrota"}</strong>
                <p className="text-sm text-white/58">{extremeDifficulties[attempt.difficulty].name} - {attempt.score} pts</p>
              </div>
            )) : <p className="text-sm text-white/55">Aun no hay intentos. El martillo esta calentando.</p>}
          </div>
        </aside>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/35 p-4">
      <p className="text-xs font-black uppercase text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}
