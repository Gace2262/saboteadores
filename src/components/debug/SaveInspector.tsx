"use client";

import { useState } from "react";
import { exportSave, importSave, loadGame, resetSave } from "@/logic/save/saveManager";

export function SaveInspector() {
  const [status, setStatus] = useState(() => loadGame());
  const [payload, setPayload] = useState("");
  const serialized = exportSave();
  const downloadSave = () => {
    const blob = new Blob([serialized], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `saboteadores-save-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const importFile = async (file?: File) => {
    if (!file) return;
    const text = await file.text();
    setPayload(text);
    setStatus(importSave(text));
  };
  return (
    <section className="rounded-lg border border-amber-100/15 bg-black/52 p-5">
      <h2 className="text-3xl font-black">SaveInspector</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div className="rounded border border-white/10 bg-white/5 p-3"><p className="text-xs text-white/45">Version</p><p className="text-2xl font-black text-amber-100">{status.save.saveVersion}</p></div>
        <div className="rounded border border-white/10 bg-white/5 p-3"><p className="text-xs text-white/45">Actualizado</p><p className="text-xs text-white/65">{status.save.updatedAt}</p></div>
        <div className="rounded border border-white/10 bg-white/5 p-3"><p className="text-xs text-white/45">Peso aprox</p><p className="text-2xl font-black text-amber-100">{Math.round(serialized.length / 1024)} KB</p></div>
        <div className="rounded border border-white/10 bg-white/5 p-3"><p className="text-xs text-white/45">Backup</p><p className="text-sm text-white/65">{status.recoveredFromBackup ? "restaurado" : "estable"}</p></div>
      </div>
      <p className="mt-4 rounded border border-white/10 bg-white/5 p-3 text-sm text-white/70">{status.message}</p>
      <textarea className="mt-4 min-h-32 w-full rounded border border-white/10 bg-zinc-950 p-3 text-xs text-white" value={payload} onChange={(event) => setPayload(event.target.value)} placeholder="Pega aqui un save exportado para importar." />
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="campaign-choice max-w-xs" onClick={downloadSave}>Descargar JSON</button>
        <button className="campaign-choice max-w-xs" onClick={() => navigator.clipboard?.writeText(serialized)}>Copiar backup</button>
        <button className="campaign-choice max-w-xs" onClick={() => setStatus(importSave(payload))}>Importar save</button>
        <label className="campaign-choice max-w-xs cursor-pointer">
          Importar archivo
          <input className="hidden" type="file" accept="application/json,.json" onChange={(event) => importFile(event.target.files?.[0])} />
        </label>
        <button className="campaign-danger max-w-xs" onClick={() => { resetSave(); setStatus(loadGame()); }}>Reset total</button>
      </div>
    </section>
  );
}
