"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { exportExpansion } from "@/logic/editor/contentExporter";
import { JSONPreviewPanel } from "./JSONPreviewPanel";

export function ExpansionBuilder() {
  const [name, setName] = useState("La Rebelion del Burnout");
  const { expansions, selectedExpansionId, addExpansionFromCurrent } = useEditorStore();
  const expansion = expansions.find((item) => item.id === selectedExpansionId) ?? expansions[0];
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_480px]">
      <div className="rounded-lg border border-amber-100/18 bg-black/55 p-5 text-white">
        <h1 className="text-4xl font-black">Expansion Builder</h1>
        <p className="mt-2 text-white/60">Agrupa cartas, bosses, eventos, campañas y referencias para un paquete exportable.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <input className="editor-input max-w-md" value={name} onChange={(event) => setName(event.target.value)} />
          <button className="campaign-action max-w-xs" onClick={() => addExpansionFromCurrent(name)}>Crear expansion</button>
        </div>
        <div className="mt-5 grid gap-3">
          {expansions.map((item) => (
            <div key={item.id} className="rounded border border-white/10 bg-white/5 p-4">
              <p className="font-black text-amber-100">{item.name}</p>
              <p className="text-sm text-white/55">{item.tagline}</p>
              <p className="mt-2 text-xs text-white/40">Cartas {item.cards.length} / bosses {item.bosses.length} / eventos {item.events.length}</p>
            </div>
          ))}
        </div>
      </div>
      <JSONPreviewPanel title="Paquete expansion" data={JSON.parse(exportExpansion(expansion))} />
    </section>
  );
}
