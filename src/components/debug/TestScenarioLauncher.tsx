"use client";

import { useBossStore } from "@/store/bossStore";
import { useEconomyStore } from "@/store/economyStore";
import { useTribunalStore } from "@/store/tribunalStore";
import { useWorldStore } from "@/store/worldStore";

const scenarios = [
  "partida normal",
  "boss El Juez fase 3",
  "sobre maldito",
  "carta evolucionando",
  "save corrupto simulado",
  "baja performance",
  "evento Tribunal Vivo",
  "Juicio Extremo al 95 de medidor",
];

export function TestScenarioLauncher() {
  const startBoss = useBossStore((state) => state.startBoss);
  const advancePhase = useBossStore((state) => state.advancePhase);
  const simulatePack = useEconomyStore((state) => state.simulatePack);
  const triggerManualEvent = useTribunalStore((state) => state.triggerManualEvent);
  const triggerGlobalEvent = useWorldStore((state) => state.triggerGlobalEvent);
  const launch = (scenario: string) => {
    if (scenario.includes("Juez")) {
      startBoss("juez-supremo");
      advancePhase();
      advancePhase();
    }
    if (scenario.includes("maldito")) simulatePack("maldito");
    if (scenario.includes("Tribunal Vivo")) triggerManualEvent();
    if (scenario.includes("Juicio Extremo")) triggerGlobalEvent("colapso-administrativo");
  };
  return (
    <section className="rounded-lg border border-white/10 bg-black/52 p-5">
      <h2 className="text-3xl font-black">Escenarios QA</h2>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {scenarios.map((scenario) => (
          <button key={scenario} className="campaign-choice justify-start" onClick={() => launch(scenario)}>
            {scenario}
          </button>
        ))}
      </div>
    </section>
  );
}
