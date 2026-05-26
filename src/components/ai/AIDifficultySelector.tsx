"use client";

import { advancedDifficultyProfiles } from "@/data/aiDifficultyProfiles";
import type { AIDifficultyId } from "@/logic/ai/aiTypes";
import { useAIStore } from "@/store/aiStore";

const difficultyText: Record<AIDifficultyId, string> = {
  susurro: "Ideal para cerebros recien reiniciados. Lee poco, avisa mucho.",
  crisis: "Usa combos cortos y detecta patrones basicos sin ponerse insoportable.",
  juicio: "Recuerda estilo, castiga excesos y deja pistas parciales.",
  "tribunal-extremo": "Combos largos, lectura agresiva e intenciones cripticas con toga.",
};

export function AIDifficultySelector() {
  const difficulty = useAIStore((state) => state.difficulty);
  const setDifficulty = useAIStore((state) => state.setDifficulty);

  return (
    <div className="rounded-2xl border border-amber-300/20 bg-black/35 p-4 shadow-2xl shadow-black/30">
      <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">Dificultad mental</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {Object.values(advancedDifficultyProfiles).map((profile) => {
          const active = difficulty === profile.id;
          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => setDifficulty(profile.id as AIDifficultyId)}
              className={`rounded-xl border px-3 py-3 text-left transition ${
                active ? "border-amber-300 bg-amber-300/15 text-amber-50" : "border-white/10 bg-white/5 text-zinc-300 hover:border-amber-300/50"
              }`}
            >
              <span className="block text-sm font-semibold">{profile.name}</span>
              <span className="mt-1 block text-xs text-zinc-400">{difficultyText[profile.id]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
