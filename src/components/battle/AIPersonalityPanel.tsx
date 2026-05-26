"use client";

import { BrainCircuit, Gavel, Siren } from "lucide-react";
import { allFactions, type FactionId } from "@/data/factions";
import { aiDifficulties } from "@/logic/ai/aiDifficulty";
import { getAIProfile } from "@/logic/ai/aiProfiles";
import type { AIDifficultyId } from "@/logic/ai/aiTypes";

const enemyOptions: FactionId[] = [
  "juez",
  "controlador",
  "perfeccionista",
  "inquieto",
  "hipervigilante",
  "hiperracional",
  "complaciente",
  "victima",
  "evitador",
  "reservado",
];

export function AIPersonalityPanel({
  profileId,
  difficulty,
  onProfileChange,
  onDifficultyChange,
}: {
  profileId: FactionId;
  difficulty: AIDifficultyId;
  onProfileChange: (id: FactionId) => void;
  onDifficultyChange: (id: AIDifficultyId) => void;
}) {
  const profile = getAIProfile(profileId);
  const difficultyInfo = aiDifficulties[difficulty];

  return (
    <section className="rounded-lg border border-amber-100/14 bg-black/50 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-md border border-amber-100/25 bg-amber-200/10 text-amber-100">
          <BrainCircuit size={22} />
        </div>
        <div>
          <p className="text-xs font-black uppercase text-amber-100/55">Perfil enemigo</p>
          <h3 className="text-xl font-black" style={{ color: profile.personality.color }}>
            {profile.displayName}
          </h3>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-1 text-xs font-black uppercase text-white/55">
          Saboteador
          <select
            value={profileId}
            onChange={(event) => onProfileChange(event.target.value as FactionId)}
            className="min-h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white"
          >
            {enemyOptions.map((id) => (
              <option key={id} value={id}>
                {allFactions.find((faction) => faction.id === id)?.name ?? id}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-xs font-black uppercase text-white/55">
          Dificultad
          <select
            value={difficulty}
            onChange={(event) => onDifficultyChange(event.target.value as AIDifficultyId)}
            className="min-h-10 rounded-md border border-white/10 bg-zinc-950 px-3 text-sm text-white"
          >
            {Object.values(aiDifficulties).map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-white/66">
        <p>
          <strong className="text-white">Estilo:</strong> {profile.personality.style}
        </p>
        <p>
          <strong className="text-white">Debilidad:</strong> {profile.personality.weakness}
        </p>
        <p>
          <strong className="text-white">Peligro:</strong> {profile.personality.danger}
        </p>
      </div>

      <div className="mt-4 rounded-md border border-rose-100/12 bg-rose-500/8 p-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-100/70">
          <Siren size={14} />
          Advertencia
        </div>
        <p className="mt-2 text-sm text-white/70">{profile.personality.warning}</p>
      </div>

      <div className="mt-3 rounded-md border border-amber-100/12 bg-amber-200/8 p-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-100/70">
          <Gavel size={14} />
          {difficultyInfo.name}
        </div>
        <p className="mt-2 text-sm text-white/66">{difficultyInfo.text}</p>
      </div>
    </section>
  );
}
