"use client";

import Link from "next/link";
import { useState } from "react";
import { useEditorStore } from "@/store/editorStore";

const links = [
  ["/editor/cards", "Cartas", "Crear, duplicar y validar cartas JSON."],
  ["/editor/bosses", "Bosses", "Fases, recompensas y soundtrack refs."],
  ["/editor/events", "Eventos", "Anomalias, narrativa e interrupciones."],
  ["/editor/campaigns", "Campanas", "Nodos, rutas y recompensas."],
  ["/editor/expansions", "Expansiones", "Paquetes completos exportables."],
  ["/editor/sandbox", "Sandbox", "Probar efectos y previews."],
];

export function EditorHub() {
  const exportAll = useEditorStore((state) => state.exportAll);
  const importAll = useEditorStore((state) => state.importAll);
  const importMessage = useEditorStore((state) => state.importMessage);
  const runQA = useEditorStore((state) => state.runQA);
  const [payload, setPayload] = useState("");
  const [qa, setQa] = useState(() => runQA());
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Archivo de Creacion</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Ministerio emocional clandestino</h1>
          <p className="mt-3 max-w-3xl text-white/64">Crea contenido sin tocar codigo. El Tribunal exige JSON, balance y una pizca de culpa administrativa.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map(([href, title, description]) => (
            <Link key={href} href={href} className="rounded-lg border border-white/10 bg-black/45 p-5 hover:bg-white/8">
              <h2 className="text-3xl font-black">{title}</h2>
              <p className="mt-2 text-sm text-white/58">{description}</p>
            </Link>
          ))}
        </div>
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-black/45 p-5">
            <h2 className="text-2xl font-black">Exportar / importar</h2>
            <textarea className="editor-input mt-3 min-h-40" value={payload} onChange={(event) => setPayload(event.target.value)} placeholder="Pega aqui un paquete editor-content-v1" />
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="campaign-choice max-w-xs" onClick={() => setPayload(exportAll())}>Generar JSON</button>
              <button className="campaign-action max-w-xs" onClick={() => importAll(payload)}>Importar sin reemplazar</button>
              <button className="campaign-danger max-w-xs" onClick={() => importAll(payload, true)}>Importar reemplazando conflictos</button>
            </div>
            <p className="mt-3 text-sm text-white/60">{importMessage}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/45 p-5">
            <h2 className="text-2xl font-black">QA editorial</h2>
            <button className="campaign-choice mt-3 max-w-xs" onClick={() => setQa(runQA())}>Buscar contenido roto</button>
            <pre className="mt-3 max-h-64 overflow-auto rounded bg-zinc-950 p-3 text-xs text-white/65">{JSON.stringify(qa, null, 2)}</pre>
          </div>
        </section>
      </section>
    </main>
  );
}
