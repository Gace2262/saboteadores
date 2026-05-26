import { balanceWarnings } from "@/data/balanceConfig";
import type { Card } from "@/data/cards";
import { cardPowerScore } from "./cardPowerScore";

export type DeckPowerReport = {
  totalPower: number;
  averagePower: number;
  averageCost: number;
  costCurve: Record<number, number>;
  stressRisk: number;
  consistency: number;
  control: number;
  damage: number;
  defense: number;
  comboDependency: number;
  corruptionAverage: number;
  warnings: string[];
};

export function evaluateDeckPower(cards: Card[]): DeckPowerReport {
  const scores = cards.map(cardPowerScore);
  const totalPower = Number(scores.reduce((sum, item) => sum + item.score, 0).toFixed(2));
  const averagePower = Number((totalPower / Math.max(1, cards.length)).toFixed(2));
  const averageCost = Number((cards.reduce((sum, card) => sum + card.cost, 0) / Math.max(1, cards.length)).toFixed(2));
  const costCurve = cards.reduce<Record<number, number>>((acc, card) => {
    acc[card.cost] = (acc[card.cost] ?? 0) + 1;
    return acc;
  }, {});
  const stressRisk = Math.min(100, Math.round(cards.reduce((sum, card) => sum + card.stressGain * 12 + (card.rarity === "maldita" ? 10 : 0), 0) / Math.max(1, cards.length)));
  const control = Math.min(100, Math.round((cards.filter((card) => card.keywords.includes("Cadena") || card.keywords.includes("Culpa")).length / Math.max(1, cards.length)) * 100));
  const damage = Math.min(100, Math.round((cards.reduce((sum, card) => sum + card.willpowerDamage, 0) / Math.max(1, cards.length * 5)) * 100));
  const defense = Math.min(100, Math.round((cards.filter((card) => card.keywords.includes("Despertar") || card.keywords.includes("Mascara") || card.type.includes("Conciencia")).length / Math.max(1, cards.length)) * 100));
  const comboDependency = Math.min(100, Math.round((cards.filter((card) => card.keywords.includes("Obsesion") || card.keywords.includes("Catarsis") || card.keywords.includes("Estampida")).length / Math.max(1, cards.length)) * 100));
  const corruptionAverage = Math.min(100, Math.round((cards.filter((card) => card.rarity === "maldita").length / Math.max(1, cards.length)) * 100 + stressRisk * 0.25));
  const duplicateRatio = cards.length ? new Set(cards.map((card) => card.id)).size / cards.length : 0;
  const consistency = Math.min(100, Math.round(duplicateRatio * 60 + (averageCost <= 3 ? 30 : 15) + (stressRisk < 45 ? 10 : 0)));
  const warnings: string[] = [];
  if (damage > 70 && stressRisk > 55) warnings.push(balanceWarnings.selfLawsuit);
  if (stressRisk > 55) warnings.push(balanceWarnings.tooStressful);
  if (averageCost > 3.2) warnings.push(balanceWarnings.highCurve);
  if (defense < 18) warnings.push(balanceWarnings.lowDefense);
  if (!warnings.length) warnings.push(balanceWarnings.stable);
  return { totalPower, averagePower, averageCost, costCurve, stressRisk, consistency, control, damage, defense, comboDependency, corruptionAverage, warnings };
}
