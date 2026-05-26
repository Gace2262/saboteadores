"use client";

import { useState } from "react";
import { runGameDiagnostics, type GameDiagnosticsReport } from "@/logic/debug/gameDiagnostics";

export function SystemHealthPanel() {
  const [report, setReport] = useState<GameDiagnosticsReport>(() => runGameDiagnostics());
  return (
    <section className="rounded-lg border border-cyan-100/15 bg-black/52 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-cyan-100/60">GameDiagnostics</p>
          <h2 className="text-3xl font-black">Salud del sistema: {report.health}</h2>
        </div>
        <button className="campaign-choice max-w-xs" onClick={() => setReport(runGameDiagnostics())}>Revisar integridad</button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {[
          ["Version", report.gameVersion],
          ["Save", report.saveVersion],
          ["Cartas", report.cardsTotal],
          ["Mazos", report.savedDecks],
          ["Errores", report.errorsRecent],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase text-white/45">{label as string}</p>
            <p className="text-2xl font-black text-cyan-100">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        {report.notes.map((note) => <p key={note} className="rounded border border-white/10 bg-white/5 p-2 text-sm text-white/62">{note}</p>)}
      </div>
    </section>
  );
}
