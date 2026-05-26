"use client";

import type { EditorBossDraft } from "@/data/editorTemplates";
import { useEditorStore } from "@/store/editorStore";

export function BossPhaseEditor({ boss }: { boss: EditorBossDraft }) {
  const updateSelectedBoss = useEditorStore((state) => state.updateSelectedBoss);
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-black">Fases</h2>
        <button className="campaign-choice max-w-xs" onClick={() => updateSelectedBoss({ phases: [...boss.phases, { id: `fase-${boss.phases.length + 1}`, name: "Nueva fase", life: 20, aiProfile: "control", passiveEffects: [], events: [], soundtrackLayer: "base", visual: "chains" }] })}>Agregar fase</button>
      </div>
      <div className="mt-4 grid gap-3">
        {boss.phases.map((phase, index) => (
          <div key={phase.id} className="rounded border border-white/10 bg-white/5 p-3">
            <input className="editor-input" value={phase.name} onChange={(event) => {
              const phases = [...boss.phases];
              phases[index] = { ...phase, name: event.target.value };
              updateSelectedBoss({ phases });
            }} />
            <input className="editor-input mt-2" type="number" value={phase.life} onChange={(event) => {
              const phases = [...boss.phases];
              phases[index] = { ...phase, life: Number(event.target.value) };
              updateSelectedBoss({ phases });
            }} />
            <p className="mt-2 text-xs text-white/45">IA {phase.aiProfile} / visual {phase.visual}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
