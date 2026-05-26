import type { InstalledMod, ModConflict } from "./modTypes";

export function collectModConflicts(mods: InstalledMod[]): ModConflict[] {
  const conflicts: ModConflict[] = [];
  const cardOwners = new Map<string, string>();
  const bossOwners = new Map<string, string>();
  mods.forEach((mod) => {
    mod.package.cards?.forEach((card) => {
      const owner = cardOwners.get(card.id);
      if (owner) conflicts.push({ id: `${card.id}-${owner}-${mod.manifest.id}`, type: "duplicate_card", affectedId: card.id, modA: owner, modB: mod.manifest.id, message: "Dos mods reclaman la misma carta." });
      cardOwners.set(card.id, mod.manifest.id);
    });
    mod.package.bosses?.forEach((boss) => {
      const owner = bossOwners.get(boss.id);
      if (owner) conflicts.push({ id: `${boss.id}-${owner}-${mod.manifest.id}`, type: "duplicate_boss", affectedId: boss.id, modA: owner, modB: mod.manifest.id, message: "Dos mods reclaman el mismo boss." });
      bossOwners.set(boss.id, mod.manifest.id);
    });
  });
  return conflicts;
}

export function resolveConflictByWinner(mods: InstalledMod[], conflict: ModConflict, winnerModId: string) {
  return mods.map((mod) => (mod.manifest.id === winnerModId ? { ...mod, loadOrder: Math.max(...mods.map((item) => item.loadOrder)) + 1 } : mod));
}
