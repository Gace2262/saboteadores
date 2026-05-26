import type { Card } from "@/data/cards";
import type { Keyword } from "@/data/keywords";
import { aiDifficulties } from "./aiDifficulty";
import type { AICardChoice, AIDifficultyId, AIGameStateSnapshot, AIProfile } from "./aiTypes";

const keywordWeight = (card: Card, keywords: Keyword[], value: number) =>
  card.keywords.reduce((score, keyword) => score + (keywords.includes(keyword) ? value : 0), 0);

const hasKeyword = (card: Card, keyword: Keyword) => card.keywords.includes(keyword);

function scoreCard(card: Card, state: AIGameStateSnapshot, profile: AIProfile, difficultyId: AIDifficultyId) {
  const difficulty = aiDifficulties[difficultyId];
  const { player, enemy, hand } = state;
  const weights = profile.weights;
  let score = 0;

  score += card.willpowerDamage * weights.aggression * difficulty.aggressionMultiplier;
  score += Math.max(0, card.clarityGain) * weights.cardDraw * 0.8;
  score += Math.max(0, -card.stressGain) * weights.defense;
  score += Math.max(0, -card.mentalNoise) * weights.defense;
  score += card.cost * 0.25;

  if (hasKeyword(card, "Cadena")) score += weights.control * (player.clarity >= 5 || hand.some((item) => item.cost >= 3) ? 1.8 : 1);
  if (hasKeyword(card, "Culpa")) score += weights.control * (player.clarity >= 4 ? 1.7 : 1);
  if (hasKeyword(card, "Derrumbe")) score += weights.control * (hand.length >= 4 ? 1.8 : 0.8);
  if (hasKeyword(card, "Estampida")) score += weights.aggression + hand.length * 1.4;
  if (hasKeyword(card, "Mascara")) score += weights.defense * (enemy.will <= 12 ? 2 : 0.8);
  if (hasKeyword(card, "Despertar")) score += weights.healing * (enemy.mentalNoise > 0 || enemy.will <= 18 ? 1.7 : 0.6);
  if (hasKeyword(card, "Obsesion")) score += weights.comboPriority * (state.lastResolvedCard ? 1.8 : 0.4);
  if (hasKeyword(card, "Ironia")) score += weights.chaos * (difficulty.id === "susurro" ? 0.8 : 1.3);
  if (hasKeyword(card, "Catarsis")) score += weights.comboPriority + enemy.stress * 1.5;
  if (hasKeyword(card, "Sentencia")) score += weights.stressPressure * (player.stress >= 5 ? 2.2 : 1);

  score += keywordWeight(card, profile.pattern.preferredKeywords, weights.comboPriority);
  score -= keywordWeight(card, profile.pattern.punishKeywords, 2);

  if (enemy.will <= 10) score += Math.max(0, -card.stressGain) * weights.healing + (hasKeyword(card, "Mascara") ? 8 : 0);
  if (player.will <= card.willpowerDamage + (hasKeyword(card, "Sentencia") && player.stress >= 5 ? 3 : 0)) score += 30;
  if (player.stress >= 7 && (hasKeyword(card, "Sentencia") || hasKeyword(card, "Culpa"))) score += 12;
  if (player.clarity >= 7 && (hasKeyword(card, "Culpa") || hasKeyword(card, "Cadena"))) score += 8;
  if (card.rarity === "legendaria") score += difficulty.comboLookahead * 4;
  if (card.rarity === "maldita" && difficulty.id !== "tribunal-extremo") score -= enemy.stress >= 8 ? 4 : 1;

  const deterministicNoise = ((card.id.length * 17 + state.turn * 13) % 10) / 10;
  score += deterministicNoise * difficulty.randomness;

  return score;
}

export function chooseAICard(
  gameState: AIGameStateSnapshot,
  aiProfile: AIProfile,
  difficultyId: AIDifficultyId,
): AICardChoice {
  const playable = gameState.enemyHand.filter((card) => card.cost <= gameState.enemy.clarity);
  if (!playable.length) {
    return { score: 0, reason: "Sin Claridad suficiente. La mente enemiga finge que era parte del plan." };
  }

  const ranked = playable
    .map((card) => ({ card, score: scoreCard(card, gameState, aiProfile, difficultyId) }))
    .sort((a, b) => b.score - a.score);

  const difficulty = aiDifficulties[difficultyId];
  const pickIndex = difficulty.randomness > 2 ? Math.min(ranked.length - 1, Math.floor(Math.random() * Math.min(3, ranked.length))) : 0;
  const picked = ranked[pickIndex];
  const keyword = picked.card.keywords.find((item) => aiProfile.pattern.preferredKeywords.includes(item));

  return {
    card: picked.card,
    score: picked.score,
    reason: keyword
      ? `${aiProfile.name} prioriza ${keyword}. El secuestro mental trae metodologia.`
      : `${aiProfile.name} elige la carta con mejor dano psicologico disponible.`,
  };
}
