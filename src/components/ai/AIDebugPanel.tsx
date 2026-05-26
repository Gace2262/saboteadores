"use client";

import { useMemo, useState } from "react";
import { allCards } from "@/data/cards";
import { allFactions, type FactionId } from "@/data/factions";
import type { BossPhaseId } from "@/logic/ai/advancedAITypes";
import { getAIProfile } from "@/logic/ai/aiProfiles";
import type { AIGameStateSnapshot } from "@/logic/ai/aiTypes";
import { analyzePlayerPatterns } from "@/logic/ai/playerPatternAnalyzer";
import { resolveBossStrategy } from "@/logic/ai/bossStrategyEngine";
import { summarizeAIDecision } from "@/logic/ai/aiDebugTools";
import { useAIStore } from "@/store/aiStore";
import { AIBossPhaseStrategy } from "./AIBossPhaseStrategy";
import { AIDecisionLog } from "./AIDecisionLog";
import { AIDifficultySelector } from "./AIDifficultySelector";
import { AIPatternReadout } from "./AIPatternReadout";
import { AIPersonalityPanel } from "./AIPersonalityPanel";
import { BossIntentPreview } from "@/components/battle/BossIntentPreview";
import { BossMemoryBubble } from "@/components/battle/BossMemoryBubble";

const phaseIds: BossPhaseId[] = ["phase1", "phase2", "phase3", "final"];

const makeSnapshot = (enemyClarity: number): AIGameStateSnapshot => ({
  player: { will: 13, clarity: 5, stress: 8, mentalNoise: 3, block: 0, mask: 0 },
  enemy: { will: 15, clarity: enemyClarity, stress: 2, mentalNoise: 1, block: 0, mask: 0 },
  hand: allCards.slice(0, 5),
  enemyHand: allCards.filter((card) => card.cost <= Math.max(1, enemyClarity + 1)).slice(0, 9),
  enemyDeck: allCards.slice(10, 20),
  enemyDiscard: allCards.slice(20, 24),
  turn: 5,
});

export function AIDebugPanel() {
  const [bossId, setBossId] = useState<FactionId>("juez");
  const [phase, setPhase] = useState<BossPhaseId>("phase2");
  const [clarity, setClarity] = useState(6);
  const difficulty = useAIStore((state) => state.difficulty);
  const memory = useAIStore((state) => state.memory);
  const recordPattern = useAIStore((state) => state.recordPattern);
  const pushDecision = useAIStore((state) => state.pushDecision);
  const resetAIMemory = useAIStore((state) => state.resetAIMemory);

  const pattern = useMemo(
    () =>
      analyzePlayerPatterns({
        playedCards: [
          ...allCards.filter((card) => card.keywords.includes("Catarsis")).slice(0, 2),
          ...allCards.filter((card) => card.keywords.includes("Cadena")).slice(0, 2),
          ...allCards.filter((card) => card.rarity === "maldita").slice(0, 2),
        ],
        recentCombos: [["grito-catarsis", "sentencia-express"]],
        finalStress: 9,
        turnsPassed: 6,
      }),
    [],
  );

  const decision = useMemo(() => {
    const gameState = makeSnapshot(clarity);
    return resolveBossStrategy({
      gameState,
      bossProfile: getAIProfile(bossId),
      difficulty,
      playerPatternMemory: { ...memory, dominantStyle: pattern.dominantStyle },
      currentPhase: phase,
      availableCards: gameState.enemyHand,
      seed: 33,
    });
  }, [bossId, clarity, difficulty, memory, pattern.dominantStyle, phase]);

  const summary = summarizeAIDecision(decision, pattern);

  const commitReadout = () => {
    recordPattern(pattern);
    pushDecision(bossId, decision);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#3b2612,transparent_35%),linear-gradient(135deg,#050308,#130915_55%,#050308)] px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Archivo de IA avanzada</p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">Bosses que leen el expediente</h1>
            <p className="mt-3 max-w-3xl text-zinc-300">
              Simula decisiones deterministas, patrones del jugador, memoria local y guardias de justicia. La toga dramatiza, pero no hace trampa.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={commitReadout} className="rounded-full bg-amber-300 px-4 py-2 text-sm font-bold text-black">
              Registrar lectura
            </button>
            <button type="button" onClick={resetAIMemory} className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200">
              Limpiar memoria
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <AIDifficultySelector />
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
              <label className="text-xs uppercase tracking-[0.28em] text-zinc-500" htmlFor="ai-boss">
                Boss
              </label>
              <select id="ai-boss" value={bossId} onChange={(event) => setBossId(event.target.value as FactionId)} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white">
                {allFactions.map((faction) => (
                  <option key={faction.id} value={faction.id}>
                    {faction.name}
                  </option>
                ))}
              </select>
              <label className="mt-4 block text-xs uppercase tracking-[0.28em] text-zinc-500" htmlFor="ai-phase">
                Fase
              </label>
              <select id="ai-phase" value={phase} onChange={(event) => setPhase(event.target.value as BossPhaseId)} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-white">
                {phaseIds.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label className="mt-4 block text-xs uppercase tracking-[0.28em] text-zinc-500" htmlFor="enemy-clarity">
                Claridad enemiga: {clarity}
              </label>
              <input id="enemy-clarity" type="range" min={0} max={10} value={clarity} onChange={(event) => setClarity(Number(event.target.value))} className="mt-2 w-full accent-amber-300" />
            </div>
            <BossMemoryBubble memory={memory} />
          </aside>

          <main className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <AIPersonalityPanel bossId={bossId} />
              <AIBossPhaseStrategy bossId={bossId} phase={phase} />
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              <AIPatternReadout pattern={pattern} />
              <BossIntentPreview intent={decision.intent} preview={summary.intent} />
            </div>
            <section className="rounded-2xl border border-amber-300/20 bg-black/45 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">Decision calculada</p>
              <h2 className="mt-2 text-2xl font-bold text-white">{decision.selectedCards.map((card) => card.name).join(" + ") || "Sin carta legal"}</h2>
              <p className="mt-2 text-sm text-zinc-300">{decision.reason}</p>
              <p className="mt-3 text-sm italic text-amber-100">&quot;{decision.dialogueLine}&quot;</p>
              {decision.fairnessWarnings.length > 0 && <p className="mt-3 text-sm text-rose-200">{decision.fairnessWarnings.join(" / ")}</p>}
              <div className="mt-5 grid gap-2 md:grid-cols-2">
                {decision.scores.slice(0, 6).map((score) => (
                  <div key={score.card.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="flex justify-between gap-2 text-sm">
                      <span className="font-semibold text-white">{score.card.name}</span>
                      <span className="text-amber-200">{Math.round(score.score)}</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">{score.reasons.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>
            <AIDecisionLog />
          </main>
        </div>
      </div>
    </div>
  );
}
