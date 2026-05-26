import { balanceConfig, balanceWarnings } from "@/data/balanceConfig";
import type { Card } from "@/data/cards";

export type CardPowerScore = {
  cardId: string;
  score: number;
  efficiency: number;
  penalty: number;
  observations: string[];
};

const includesAny = (text: string, words: string[]) => words.some((word) => text.includes(word));

export function cardPowerScore(card: Card): CardPowerScore {
  const text = `${card.effectText} ${card.darkHumorText} ${card.cursedEffect ?? ""}`.toLowerCase();
  const healing = includesAny(text, ["gana voluntad", "recupera voluntad", "cura"]) ? Math.max(2, card.clarityGain) : 0;
  const draw = includesAny(text, ["roba", "robar"]) ? 1 : 0;
  const block = card.keywords.includes("Cadena") || includesAny(text, ["bloquea", "bloqueo"]) ? 1 : 0;
  const rivalClarity = card.keywords.includes("Culpa") || includesAny(text, ["reduce claridad"]) ? 1 : 0;
  const cleanNoise = card.keywords.includes("Despertar") || includesAny(text, ["limpia ruido", "rompe cadenas"]) ? Math.max(1, Math.abs(card.mentalNoise)) : 0;
  const random = card.keywords.includes("Ironia") || includesAny(text, ["aleatorio"]) ? 1 : 0;
  const selfDamage = includesAny(text, ["tu pierdes", "pierdes voluntad", "autodano"]) ? 2 : 0;
  const keywordScore = card.keywords.reduce((sum, keyword) => sum + (balanceConfig.keywordModifier[keyword] ?? 0), 0);
  const positive =
    card.willpowerDamage * balanceConfig.weights.damage +
    healing * balanceConfig.weights.healing +
    draw * balanceConfig.weights.cardDraw +
    block * balanceConfig.weights.block +
    rivalClarity * balanceConfig.weights.rivalClarityReduction +
    cleanNoise * balanceConfig.weights.cleanMentalNoise +
    Math.max(0, card.clarityGain) * balanceConfig.weights.clarityGain +
    random * balanceConfig.weights.randomEffect +
    keywordScore +
    balanceConfig.rarityModifier[card.rarity];
  const penalty =
    card.stressGain * Math.abs(balanceConfig.weights.stressPenalty) +
    Math.max(0, card.mentalNoise) * Math.abs(balanceConfig.weights.mentalNoisePenalty) +
    selfDamage * Math.abs(balanceConfig.weights.selfDamagePenalty) +
    (card.rarity === "maldita" ? 3.5 : 0);
  const score = Math.max(0.2, Number((positive - penalty).toFixed(2)));
  const efficiency = Number((score / Math.max(1, card.cost)).toFixed(2));
  const observations: string[] = [];
  if (efficiency > balanceConfig.efficiency.tooStrong) observations.push(balanceWarnings.tooEfficient);
  if (efficiency < balanceConfig.efficiency.tooWeak && card.cost > 0) observations.push(balanceWarnings.tooWeak);
  if (card.stressGain >= 3) observations.push("Genera mucho Estres. Poder con recibo medico.");
  if (card.rarity === "maldita") observations.push("Maldita: poder alto, penalizacion alta y cero inocencia.");
  if (!observations.length) observations.push("Eficiencia aceptable. El Tribunal no encontro delito inmediato.");
  return { cardId: card.id, score, efficiency, penalty: Number(penalty.toFixed(2)), observations };
}
