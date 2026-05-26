import { rewardBonuses, rewardTables, type RewardContextType } from "@/data/rewardTables";
import type { CurrencyWallet } from "@/data/economyConfig";

export type RewardInput = {
  context: RewardContextType;
  difficultyMultiplier: number;
  turns: number;
  damageReceived: number;
  finalStress: number;
  cursedCardsUsed: number;
  bossDefeated?: string;
  longCombo?: boolean;
  noSentencesReceived?: boolean;
  finalCatarsis?: boolean;
  playerWill: number;
};

export type BalancedReward = {
  currencies: Partial<CurrencyWallet>;
  xp: number;
  bonuses: string[];
  drop: string;
};

const addCurrency = (wallet: Partial<CurrencyWallet>, key: keyof CurrencyWallet, value: number) => {
  wallet[key] = Math.round((wallet[key] ?? 0) + value);
};

export function balanceReward(input: RewardInput): BalancedReward {
  const table = rewardTables.find((item) => item.id === input.context) ?? rewardTables[0];
  const currencies: Partial<CurrencyWallet> = { ...table.currencies };
  const bonuses: string[] = [];
  const clean = input.damageReceived <= 5 && input.finalStress <= 3;
  const fragmentMultiplier = input.difficultyMultiplier * (clean ? rewardBonuses.cleanVictory.multiplier : 1);
  if (currencies.clarityFragments) currencies.clarityFragments = Math.round(currencies.clarityFragments * fragmentMultiplier);
  if (clean) bonuses.push(rewardBonuses.cleanVictory.label);
  if (input.playerWill <= 1) {
    addCurrency(currencies, "mentalKeys", 1);
    bonuses.push(rewardBonuses.elegantCollapse.label);
  }
  if (input.finalStress >= 10) {
    addCurrency(currencies, "burnoutAshes", 2);
    bonuses.push(rewardBonuses.premiumBurnout.label);
  }
  if (input.bossDefeated === "juez" && input.noSentencesReceived) {
    addCurrency(currencies, "tribunalSeals", 1);
    bonuses.push(rewardBonuses.silencedJudgment.label);
  }
  if (input.finalCatarsis) {
    addCurrency(currencies, "catarsisEchoes", 2);
    bonuses.push(rewardBonuses.finalCatarsis.label);
  }
  if (input.cursedCardsUsed > 0) addCurrency(currencies, "burnoutAshes", Math.min(2, input.cursedCardsUsed));
  const xp = Math.round(table.xp * input.difficultyMultiplier * (input.longCombo ? 1.12 : 1));
  return { currencies, xp, bonuses: bonuses.length ? bonuses : ["Recompensa base: honesta, oscura y sin grindeo inutil."], drop: table.drop };
}
