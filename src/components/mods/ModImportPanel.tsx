"use client";

import { useRef } from "react";
import { useModStore } from "@/store/modStore";

export function ModImportPanel() {
  const importText = useModStore((state) => state.importText);
  const setImportText = useModStore((state) => state.setImportText);
  const installModFromJSON = useModStore((state) => state.installModFromJSON);
  const importMessage = useModStore((state) => state.importMessage);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setImportText(await file.text());
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#251047,#050308_55%,#010102)] px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-200/70">Importacion segura</p>
        <h1 className="mt-2 text-4xl font-black md:text-6xl">Abrir expediente JSON</h1>
        <p className="mt-3 text-white/70">Pega un mod completo o carga un archivo local. El parser rechaza scripts, HTML arbitrario y otros intentos de traer cuchillo a una audiencia JSON.</p>
        <div className="mt-6 rounded-lg border border-white/10 bg-black/45 p-4">
          <div className="flex flex-wrap gap-3">
            <button className="rounded border border-white/15 bg-white/10 px-4 py-2 font-bold" onClick={() => inputRef.current?.click()}>
              Elegir archivo .json
            </button>
            <input ref={inputRef} className="hidden" type="file" accept="application/json,.json" onChange={(event) => void handleFile(event.currentTarget.files?.[0])} />
            <button className="rounded border border-amber-300/35 bg-amber-300/10 px-4 py-2 font-bold text-amber-100" onClick={() => installModFromJSON(importText)}>
              Validar e importar
            </button>
          </div>
          <textarea className="editor-input mt-4 min-h-96 w-full font-mono text-xs" value={importText} onChange={(event) => setImportText(event.target.value)} />
          <p className="mt-3 rounded border border-white/10 bg-white/5 p-3 text-sm text-white/70">{importMessage}</p>
        </div>
      </section>
    </main>
  );
}
