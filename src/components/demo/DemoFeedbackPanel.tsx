"use client";

import { useMemo, useState } from "react";
import { demoVerticalConfig } from "@/data/demo/demoConfig";
import { createDemoExport, stringifyDemoExport } from "@/logic/demo/demoSave";
import { useDemoStore } from "@/store/demoStore";

export function DemoFeedbackPanel() {
  const selectedDeck = useDemoStore((state) => state.selectedDeck);
  const completedStages = useDemoStore((state) => state.completedStages);
  const eventChoice = useDemoStore((state) => state.eventChoice);
  const evolvedCard = useDemoStore((state) => state.evolvedCard);
  const bossOutcome = useDemoStore((state) => state.bossOutcome);
  const feedback = useDemoStore((state) => state.feedback);
  const addFeedback = useDemoStore((state) => state.addFeedback);
  const [form, setForm] = useState({
    rulesUnderstood: "Si",
    bossDifficulty: "Justo",
    favoritePart: "",
    confusingPart: "",
    performanceIssues: "No",
  });

  const exportText = useMemo(
    () =>
      stringifyDemoExport(
        createDemoExport({
          version: demoVerticalConfig.version,
          completedStages,
          selectedDeck,
          eventChoice,
          evolvedCard,
          bossOutcome,
          feedback,
        }),
      ),
    [bossOutcome, completedStages, eventChoice, evolvedCard, feedback, selectedDeck],
  );

  const saveFeedback = () => {
    addFeedback({ ...form, deckUsed: selectedDeck ?? "sin mazo" });
  };

  return (
    <section className="rounded-2xl border border-cyan-100/20 bg-black/60 p-5">
      <h2 className="text-3xl font-black">Feedback local</h2>
      <p className="mt-2 text-sm text-white/55">No se envia automaticamente. Queda guardado en este dispositivo y puedes exportarlo como JSON.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {[
          ["rulesUnderstood", "Entendiste las reglas basicas?"],
          ["bossDifficulty", "Que tan dificil fue el boss?"],
          ["performanceIssues", "Problemas de rendimiento?"],
          ["favoritePart", "Que parte te gusto mas?"],
          ["confusingPart", "Que parte confundio?"],
        ].map(([key, label]) => (
          <label key={key} className="grid gap-2 text-sm font-bold text-white/70">
            {label}
            <input
              value={form[key as keyof typeof form]}
              onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-cyan-200/60"
            />
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={saveFeedback} className="campaign-action max-w-xs">
          Guardar feedback
        </button>
        <a href={`data:application/json;charset=utf-8,${encodeURIComponent(exportText)}`} download="saboteadores-demo-feedback.json" className="campaign-choice max-w-xs">
          Exportar JSON
        </a>
      </div>
    </section>
  );
}
