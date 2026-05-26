import { aiDialogues, type AIDialogueEvent } from "@/data/aiDialogues";
import type { FactionId } from "@/data/factions";
import type { AIDifficultyId } from "./aiTypes";
import type { BossPhaseId, PlayerPattern } from "./advancedAITypes";

export function selectAIDialogue({
  bossId,
  event,
  pattern,
  difficulty,
  phase,
  seed,
}: {
  bossId: FactionId;
  event: AIDialogueEvent;
  pattern?: PlayerPattern;
  difficulty: AIDifficultyId;
  phase: BossPhaseId;
  seed: number;
}) {
  const table = aiDialogues[bossId] ?? aiDialogues.juez;
  const candidates = [...(pattern ? table[pattern] ?? [] : []), ...(table[event] ?? []), ...(table.combatStart ?? [])];
  if (!candidates.length) return "El mecanismo observa en silencio. Eso rara vez ayuda.";
  const offset = difficulty === "tribunal-extremo" ? 2 : difficulty === "juicio" ? 1 : 0;
  return candidates[(seed + phase.length + offset) % candidates.length];
}
