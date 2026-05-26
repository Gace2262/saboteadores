"use client";

import Link from "next/link";
import { cinematicBosses, getCinematicBoss, type ColossalBossId } from "@/data/cinematicBosses";
import { getBossPhases } from "@/data/bossPhases";
import { getBossTransformations } from "@/data/bossTransformations";
import { getBossPhaseState, getPhaseThreat } from "@/logic/boss/bossPhaseManager";
import { getEnvironmentLabel } from "@/logic/boss/environmentController";
import { useBossStore } from "@/store/bossStore";
import { BossDialogueOverlay } from "./BossDialogueOverlay";
import { BossIntroCinematic } from "./BossIntroCinematic";
import { BossTransformationScene } from "./BossTransformationScene";
import { ColossalBossRenderer } from "./ColossalBossRenderer";
import { EnvironmentBreakEffect } from "./EnvironmentBreakEffect";
import { PhaseTransitionOverlay } from "./PhaseTransitionOverlay";

export function JudgmentArena() {
  const bossStore = useBossStore();
  const boss = getCinematicBoss(bossStore.selectedBossId);
  const phaseState = getBossPhaseState(boss.id, bossStore.phaseIndex);
  const phases = getBossPhases(boss.id);
  const transformations = getBossTransformations(boss.id);

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-5 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,211,123,0.16),transparent_30%),radial-gradient(circle_at_12%_80%,rgba(220,38,38,0.14),transparent_34%),radial-gradient(circle_at_90%_65%,rgba(124,58,237,0.14),transparent_30%)]" />
      <EnvironmentBreakEffect environment={bossStore.environment} reduceFlashes={bossStore.reduceFlashes} reduceShake={bossStore.reduceShake} />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-100/60">Etapa 18</p>
            <h1 className="mt-2 text-4xl font-black uppercase md:text-6xl">Bosses colosales</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/cinematics" className="campaign-choice max-w-xs">Galeria cinematica</Link>
            <Link href="/finale" className="campaign-action max-w-xs">Final interactivo</Link>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {cinematicBosses.map((item) => (
            <button
              key={item.id}
              onClick={() => bossStore.selectBoss(item.id as ColossalBossId)}
              className={`rounded-lg border p-4 text-left transition ${item.id === boss.id ? "border-amber-100/50 bg-amber-100/12" : "border-white/10 bg-black/38 hover:bg-white/8"}`}
            >
              <p className="text-xs font-black uppercase text-white/45">{item.difficulty}</p>
              <h2 className="mt-2 text-lg font-black text-white">{item.name}</h2>
              <p className="mt-2 text-xs text-white/55">{item.arena}</p>
            </button>
          ))}
        </div>

        <BossIntroCinematic boss={boss} onStart={() => bossStore.startBoss(boss.id)} />

        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <ColossalBossRenderer boss={boss} environment={bossStore.environment} />
          <aside className="grid gap-4">
            <BossDialogueOverlay name={boss.name} quote={phaseState.phase.quote} />
            <div className="rounded-lg border border-white/12 bg-black/55 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-white/45">{phaseState.progressLabel}</p>
                  <h2 className="mt-2 text-3xl font-black text-amber-100">{phaseState.phase.name}</h2>
                </div>
                <span className="rounded bg-red-300/15 px-2 py-1 text-xs font-black uppercase text-red-100">{getPhaseThreat(phaseState.phase)}</span>
              </div>
              <p className="mt-4 text-sm font-bold text-white/78">{phaseState.phase.mechanic}</p>
              <p className="mt-3 text-sm text-white/55">{phaseState.phase.visual}</p>
              <div className="mt-5 grid gap-2">
                <p className="text-xs font-black uppercase text-white/45">Estado del escenario: {getEnvironmentLabel(bossStore.environment)}</p>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-gradient-to-r from-amber-200 via-red-400 to-purple-500" style={{ width: `${phaseState.phase.environmentDamage}%` }} />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button className="campaign-choice max-w-xs" onClick={bossStore.advancePhase} disabled={phaseState.isFinalPhase}>
                  Avanzar fase
                </button>
                <button className="campaign-danger max-w-xs" onClick={bossStore.defeatBoss}>
                  Derrotar boss
                </button>
              </div>
            </div>
            <div className="rounded-lg border border-white/12 bg-black/45 p-4">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/45">Fases</p>
              <div className="mt-3 grid gap-2">
                {phases.map((phase) => (
                  <div key={phase.id} className={`rounded border px-3 py-2 text-sm ${phase.id === phaseState.phase.id ? "border-amber-100/45 bg-amber-100/10 text-amber-100" : "border-white/10 bg-white/5 text-white/55"}`}>
                    {phase.order}. {phase.name}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <BossTransformationScene transformations={transformations} />
      </section>
      <PhaseTransitionOverlay cinematic={bossStore.activeCinematic} onClose={bossStore.clearCinematic} simplified={bossStore.simplifiedCinematics} />
    </main>
  );
}
