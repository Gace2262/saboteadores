import { packCosts, startingWallet, type CurrencyWallet, type EconomyCurrency } from "@/data/economyConfig";
import type { PackId } from "@/data/packs";

export function canAfford(wallet: CurrencyWallet, cost: Partial<CurrencyWallet>) {
  return Object.entries(cost).every(([key, value]) => wallet[key as EconomyCurrency] >= (value ?? 0));
}

export function spend(wallet: CurrencyWallet, cost: Partial<CurrencyWallet>): CurrencyWallet {
  if (!canAfford(wallet, cost)) return wallet;
  return Object.entries(cost).reduce<CurrencyWallet>((next, [key, value]) => {
    next[key as EconomyCurrency] = Math.max(0, next[key as EconomyCurrency] - (value ?? 0));
    return next;
  }, { ...wallet });
}

export function grant(wallet: CurrencyWallet, reward: Partial<CurrencyWallet>): CurrencyWallet {
  return Object.entries(reward).reduce<CurrencyWallet>((next, [key, value]) => {
    next[key as EconomyCurrency] = Math.max(0, next[key as EconomyCurrency] + (value ?? 0));
    return next;
  }, { ...wallet });
}

export function canOpenPack(wallet: CurrencyWallet, packId: PackId) {
  return canAfford(wallet, packCosts[packId]);
}

export function createWallet(seed?: Partial<CurrencyWallet>): CurrencyWallet {
  return { ...startingWallet, ...seed };
}
