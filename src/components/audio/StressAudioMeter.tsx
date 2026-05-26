"use client";

import { useAudioStore } from "@/store/audioStore";

export function StressAudioMeter() {
  const intensity = useAudioStore((state) => state.battleIntensity);
  const bpm = useAudioStore((state) => state.bpm);
  return (
    <section className="rounded-lg border border-white/10 bg-black/45 p-4 text-white">
      <h2 className="text-2xl font-black uppercase">Stress Audio Meter</h2>
      <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-gradient-to-r from-emerald-300 via-amber-300 to-red-500" style={{ width: `${intensity}%` }} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <span className="rounded bg-white/5 p-3">Intensidad {intensity}</span>
        <span className="rounded bg-white/5 p-3">BPM {bpm}</span>
        <span className="rounded bg-white/5 p-3">{intensity >= 80 ? "Coro agresivo" : intensity >= 45 ? "Percusion activa" : "Controlado"}</span>
      </div>
    </section>
  );
}
