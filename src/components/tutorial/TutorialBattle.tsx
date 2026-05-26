"use client";

import { getTutorialStep } from "@/data/tutorialSteps";
import { useTutorialStore } from "@/store/tutorialStore";
import { TutorialCardPointer } from "./TutorialCardPointer";
import { TutorialHandHighlight } from "./TutorialHandHighlight";
import { TutorialNarrator } from "./TutorialNarrator";
import { TutorialStepOverlay } from "./TutorialStepOverlay";

const actionForStep = {
  "first-card": "conciencia",
  block: "block",
  catarsis: "catarsis",
  combo: "combo",
  victory: "victory",
} as const;

export function TutorialBattle() {
  const { currentStepId, battle, playTutorialAction, nextStep, reducedMotion } = useTutorialStore();
  const step = getTutorialStep(currentStepId);
  const action = actionForStep[currentStepId as keyof typeof actionForStep];
  const handleAction = () => {
    if (action) playTutorialAction(action);
    nextStep();
  };
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5 xl:grid-cols-[1fr_360px]">
        <div className="relative min-h-[720px] overflow-hidden rounded-lg border border-amber-100/16 bg-black/55 p-5">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Voluntad", battle.playerWill],
              ["Claridad", battle.clarity],
              ["Estres", battle.stress],
              ["Ruido Mental", battle.mentalNoise],
            ].map(([label, value]) => (
              <div key={label as string} className={`rounded border p-3 ${step.highlight === "resources" ? "border-cyan-100/60 bg-cyan-300/10" : "border-white/10 bg-white/5"}`}>
                <p className="text-xs font-black uppercase text-white/45">{label as string}</p>
                <p className="mt-1 text-3xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-cyan-100/16 bg-cyan-950/20 p-5">
              <p className="text-xs font-black uppercase text-cyan-100/65">Jugador citado</p>
              <h2 className="mt-2 text-3xl font-black">Sobreviviente provisional</h2>
              <p className="mt-3 text-white/55">No puedes perder este combate. El Tribunal esta ensayando, no cobrando entrada.</p>
            </div>
            <div className={`rounded-lg border p-5 ${step.highlight === "enemy" ? "border-red-100/60 bg-red-500/15" : "border-red-100/16 bg-red-950/20"}`}>
              <p className="text-xs font-black uppercase text-red-100/65">Controlador menor</p>
              <h2 className="mt-2 text-3xl font-black">Voluntad {battle.enemyWill}</h2>
              <p className="mt-3 text-white/55">Improvisar fue eliminado del presupuesto.</p>
            </div>
          </div>

          <div className="absolute inset-x-6 bottom-8 grid gap-3 md:grid-cols-3">
            {[
              ["conciencia-basica", "Conciencia Basica", "Limpia 1 Ruido Mental."],
              ["pensamiento-automatico", "Pensamiento Automatico", "Hace dano, sube Estres."],
              ["catarsis-inicial", "Catarsis Inicial", "Rompe cadenas y gana Claridad."],
            ].map(([id, name, text]) => {
              const blocked = battle.blockedCardId === id;
              const highlighted = (step.highlight === "hand" && id === "conciencia-basica") || (step.highlight === "blocked" && blocked) || (step.highlight === "catarsis" && id === "catarsis-inicial") || (step.highlight === "combo" && id !== "conciencia-basica");
              return (
                <button
                  key={id}
                  onClick={handleAction}
                  className={`relative min-h-36 rounded-lg border p-4 text-left transition ${blocked ? "border-red-100/60 bg-red-500/15" : highlighted ? "border-amber-100/70 bg-amber-100/14" : "border-white/10 bg-white/6"}`}
                >
                  {highlighted ? <TutorialCardPointer label={blocked ? "bloqueada" : "juega aqui"} /> : null}
                  <p className="text-xs font-black uppercase text-white/45">{id}</p>
                  <h3 className="mt-2 text-xl font-black text-white">{name}</h3>
                  <p className="mt-2 text-sm text-white/58">{text}</p>
                  {blocked ? <p className="mt-2 text-xs font-black uppercase text-red-100">Encadenada</p> : null}
                </button>
              );
            })}
          </div>
          <TutorialHandHighlight active={["hand", "blocked", "catarsis", "combo"].includes(step.highlight)} />
          {!reducedMotion ? <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(242,211,123,0.10),transparent_30%)]" /> : null}
        </div>
        <aside className="grid content-start gap-4">
          <TutorialStepOverlay step={step} />
          <TutorialNarrator text={step.narrator} />
          <section className="rounded-lg border border-white/10 bg-black/50 p-4">
            <h2 className="text-xl font-black">Log del Tribunal</h2>
            <div className="mt-3 grid gap-2">
              {battle.log.slice(0, 5).map((line) => (
                <p key={line} className="rounded border border-white/10 bg-white/5 p-2 text-sm text-white/60">{line}</p>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
