"use client";

import { useModeStore } from "@/store/modeStore";

export function SurvivalProgressBar() {
  const record = useModeStore((state) => state.records.survival);
  const completeModeRun = useModeStore((state) => state.completeModeRun);
  const wave = Math.max(1, record.bestWave || 1);
  const width = Math.min(100, wave * 8);
  return (
    <section className="rounded-lg border border-emerald-100/16 bg-black/52 p-5">
      <p className="text-sm font-black uppercase text-emerald-100/65">Supervivencia</p>
      <h2 className="mt-1 text-4xl font-black">Oleada record: {record.bestWave}</h2>
      <div className="mt-4 h-5 overflow-hidden rounded-full border border-white/10 bg-black/55">
        <div className="h-full bg-[linear-gradient(90deg,#0f766e,#f2d37b,#8b1e3f)]" style={{ width: `${width}%` }} />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {["Tormenta de culpa", "Sobre maldito gratis", "Apagon de claridad", "Terapia accidental"].map((event) => (
          <div key={event} className="rounded-md border border-white/10 bg-white/6 p-3 text-sm font-black text-white/70">{event}</div>
        ))}
      </div>
      <button className="campaign-action mt-5" onClick={() => completeModeRun("survival", { score: wave * 90, wave: wave + 1, reward: "Fondo de oleada mental" })}>
        Simular siguiente oleada
      </button>
    </section>
  );
}
