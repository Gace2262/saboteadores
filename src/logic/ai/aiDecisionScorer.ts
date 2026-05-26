import { aiBossProfiles } from "@/data/aiBossProfiles";
import { advancedDifficultyProfiles } from "@/data/aiDifficultyProfiles";
import type { Card } from "@/data/cards";
import type { AIGameStateSnapshot, AIProfile, AIDifficultyId } from "./aiTypes";
import type { AdvancedAIDecisionScore, AIMemorySnapshot, BossPhaseId, PlayerPatternReport } from "./advancedAITypes";
import { getBossPhaseStrategy } from "./bossPhaseStrategies";

const has = (card: Card, keyword: string) => card.keywords.some((item) => item === keyword);

export function scoreAICardAdvanced(
  card: Card,
  state: AIGameStateSnapshot,
  profile: AIProfile,
  difficultyId: AIDifficultyId,
  pattern: PlayerPatternReport,
  memory: AIMemorySnapshot,
  phase: BossPhaseId,
): AdvancedAIDecisionScore {
  const boss = aiBossProfiles[profile.id] ?? aiBossProfiles.juez;
  const difficulty = advancedDifficultyProfiles[difficultyId];
  const phasePlan = getBossPhaseStrategy(profile.id, phase);
  const reasons: string[] = [];
  let score = 0;

  if (card.cost > state.enemy.clarity) return { card, score: -999, reasons: ["Costo insuficiente. El Tribunal no falsifica Claridad."] };

  const lethal = card.willpowerDamage >= state.player.will;
  if (lethal) {
    score += 80;
    reasons.push("letal visible");
  }

  score += card.willpowerDamage * boss.weights.directDamage * phasePlan.aggressionMod;
  score += Math.max(0, -card.stressGain) * boss.weights.healing;
  score += Math.max(0, -card.mentalNoise) * boss.weights.healing;
  score += Math.max(0, card.clarityGain) * 2;
  score -= Math.max(0, card.stressGain) * (difficultyId === "tribunal-extremo" ? 0.4 : 1.2);

  if (has(card, "Sentencia")) {
    score += boss.weights.sentence + (state.player.stress >= 5 ? boss.weights.punishStress * 2 : 0);
    reasons.push("sentencia");
  }
  if (has(card, "Cadena")) {
    score += boss.weights.chain * phasePlan.controlMod + (state.player.clarity >= 5 ? 8 : 0);
    reasons.push("cadena");
  }
  if (has(card, "Culpa")) {
    score += boss.weights.resourceControl + (state.player.clarity >= 4 ? 7 : 0);
    reasons.push("culpa");
  }
  if (has(card, "Derrumbe")) score += boss.weights.denyOptions + state.hand.length;
  if (has(card, "Estampida")) score += boss.weights.chaos + state.hand.length * 1.5;
  if (has(card, "Mascara")) score += boss.weights.counter + (state.enemy.will <= 10 ? 12 : 0);
  if (has(card, "Catarsis")) score += state.enemy.stress * 1.8 + boss.weights.healing;
  if (has(card, "Ironia")) score += boss.weights.chaos * 0.8;

  if (pattern.dominantStyle === "stress_overuse" && (has(card, "Sentencia") || has(card, "Culpa"))) score += 8 * difficulty.patternAdaptation;
  if (pattern.dominantStyle === "aggressive" && (has(card, "Mascara") || has(card, "Derrumbe"))) score += 7 * difficulty.patternAdaptation;
  if (pattern.dominantStyle === "defensive" && card.willpowerDamage > 0) score += 5 * difficulty.patternAdaptation;
  if (pattern.dominantStyle === "combo_deck" && has(card, "Cadena")) score += 6 * difficulty.patternAdaptation;
  if (memory.favoriteCards.includes(card.id)) score -= boss.weights.variety;

  const deterministicNoise = ((card.id.length * 31 + state.turn * 17) % 11) * 0.1 * (difficulty.intentionalMistakeChance + 0.1);
  score += deterministicNoise;
  if (card.rarity === "legendaria") score += difficulty.maxComboLength * 2;
  if (card.rarity === "maldita") score += difficultyId === "tribunal-extremo" ? 6 : -3;

  return { card, score, reasons };
}
