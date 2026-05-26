import { startingWallet } from "@/data/economyConfig";

export const CURRENT_SAVE_VERSION = 4;

export type LegacySave = Record<string, unknown>;

export function migrateSave(input: LegacySave): LegacySave {
  const currentVersion = typeof input.saveVersion === "number" ? input.saveVersion : 1;
  let save: LegacySave = { ...input, saveVersion: currentVersion };

  if ((save.saveVersion as number) < 2) {
    save = { ...save, economy: { wallet: startingWallet }, saveVersion: 2 };
  }
  if ((save.saveVersion as number) < 3) {
    save = { ...save, evolution: { cardProgressions: {} }, saveVersion: 3 };
  }
  if ((save.saveVersion as number) < 4) {
    save = { ...save, tribunal: { memory: { eventsSeen: [], anomaliesSeen: [] } }, saveVersion: 4 };
  }

  return save;
}
