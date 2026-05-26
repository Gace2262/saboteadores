"use client";

import { Users } from "lucide-react";
import { useModeStore } from "@/store/modeStore";

const coopCards = [
  ["Intervencion Amistosa", "Limpia Estres de ambos."],
  ["Terapia de Emergencia", "Cura y roba cartas."],
  ["Golpe de Realidad Compartido", "Dano masivo al boss."],
];

export function CoopTurnPanel() {
  const { coopSharedResources, toggleCoopResources, completeModeRun } = useModeStore();
  return (
    <section className="rounded-lg border border-cyan-100/16 bg-black/52 p-5">
      <p className="text-sm font-black uppercase text-cyan-100/65">Cooperativo local experimental</p>
      <h2 className="mt-1 text-4xl font-black">Dos cerebros contra el expediente</h2>
      <button className="campaign-choice mt-4 max-w-sm justify-between" onClick={toggleCoopResources}>
        Recursos compartidos
        <strong className={coopSharedResources ? "text-emerald-100" : "text-white/45"}>{coopSharedResources ? "ON" : "OFF"}</strong>
      </button>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {coopCards.map(([name, effect]) => (
          <div key={name} className="rounded-md border border-white/10 bg-white/6 p-4">
            <Users className="text-cyan-100" size={22} />
            <h3 className="mt-3 text-xl font-black">{name}</h3>
            <p className="mt-2 text-sm text-white/58">{effect}</p>
          </div>
        ))}
      </div>
      <button className="campaign-action mt-5" onClick={() => completeModeRun("co-op", { won: true, score: 420, reward: "Aura cooperativa" })}>
        Registrar boss cooperativo vencido
      </button>
    </section>
  );
}
