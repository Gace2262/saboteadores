import type { CollectibleRarity } from "@/data/rarities";
import type { PackId } from "@/data/packs";
import { duplicateValue, type CurrencyWallet } from "@/data/economyConfig";
import { grant } from "./economyManager";

export const packDropRates: Record<PackId, Record<CollectibleRarity, number>> = {
  intrusivos: { comun: 75, rara: 22, epica: 3, legendaria: 0, maldita: 0 },
  "crisis-premium": { comun: 45, rara: 40, epica: 13, legendaria: 0, maldita: 2 },
  tribunal: { comun: 0, rara: 55, epica: 30, legendaria: 10, maldita: 5 },
  catarsis: { comun: 40, rara: 35, epica: 20, legendaria: 5, maldita: 0 },
  maldito: { comun: 0, rara: 45, epica: 35, legendaria: 10, maldita: 10 },
};

export type PackSimulation = {
  packId: PackId;
  openings: number;
  distribution: Record<CollectibleRarity, number>;
  averageDuplicateValue: number;
  pityEpicAt: number;
  legendaryPityBoosts: number;
};

const rarities: CollectibleRarity[] = ["comun", "rara", "epica", "legendaria", "maldita"];

function pickRarity(packId: PackId, index: number, noEpic: number, noLegendary: number): CollectibleRarity {
  if (noEpic >= 9) return "epica";
  const rates = { ...packDropRates[packId] };
  if (noLegendary >= 29) rates.legendaria += 10;
  const total = rarities.reduce((sum, rarity) => sum + rates[rarity], 0);
  const roll = (index * 37 + packId.length * 11) % Math.max(1, total);
  let cursor = 0;
  for (const rarity of rarities) {
    cursor += rates[rarity];
    if (roll < cursor) return rarity;
  }
  return "comun";
}

export function simulatePackOpening(packId: PackId, openings = 100): PackSimulation {
  const distribution: Record<CollectibleRarity, number> = { comun: 0, rara: 0, epica: 0, legendaria: 0, maldita: 0 };
  let noEpic = 0;
  let noLegendary = 0;
  let duplicateValueTotal = 0;
  let pityEpicAt = 0;
  let legendaryPityBoosts = 0;
  for (let index = 0; index < openings; index += 1) {
    const rarity = pickRarity(packId, index, noEpic, noLegendary);
    distribution[rarity] += 1;
    duplicateValueTotal += Object.values(duplicateValue[rarity]).reduce((sum, value) => sum + (value ?? 0), 0);
    if (rarity === "epica" || rarity === "legendaria" || rarity === "maldita") noEpic = 0;
    else noEpic += 1;
    if (rarity === "legendaria") noLegendary = 0;
    else noLegendary += 1;
    if (noEpic === 0 && rarity === "epica") pityEpicAt += 1;
    if (noLegendary >= 29) legendaryPityBoosts += 1;
  }
  return { packId, openings, distribution, averageDuplicateValue: Math.round(duplicateValueTotal / openings), pityEpicAt, legendaryPityBoosts };
}

export function calculateDuplicateRefund(wallet: CurrencyWallet, rarity: CollectibleRarity) {
  return grant(wallet, duplicateValue[rarity]);
}
