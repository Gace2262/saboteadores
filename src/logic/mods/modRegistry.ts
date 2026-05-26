import { stableStringify } from "./safeContentParser";
import type { InstalledMod, ModPackage } from "./modTypes";
import { validateModPackage } from "./modValidator";

export function calculateModChecksum(mod: ModPackage) {
  let hash = 2166136261;
  const input = stableStringify(mod);
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

export function registerMod(pkg: ModPackage, installed: InstalledMod[]): InstalledMod {
  const validation = validateModPackage(pkg, installed.map((mod) => mod.manifest.id));
  return {
    manifest: pkg.manifest,
    package: pkg,
    enabled: false,
    trustState: validation.valid ? "unverified" : "unsafe",
    checksum: calculateModChecksum(pkg),
    installedAt: new Date().toISOString(),
    loadOrder: installed.length,
    validation,
  };
}

export function combineOfficialWithMods<T>(official: T[], mods: InstalledMod[], picker: (mod: InstalledMod) => T[] | undefined, idOf: (item: T) => string) {
  const byId = new Map<string, T>();
  official.forEach((item) => byId.set(idOf(item), item));
  mods
    .filter((mod) => mod.enabled && mod.validation.valid)
    .sort((a, b) => a.loadOrder - b.loadOrder)
    .forEach((mod) => {
      (picker(mod) ?? []).forEach((item) => byId.set(idOf(item), item));
    });
  return Array.from(byId.values());
}

export function getActiveModCardIds(mods: InstalledMod[]) {
  return new Set(
    mods
      .filter((mod) => mod.enabled && mod.validation.valid)
      .flatMap((mod) => mod.package.cards?.map((card) => card.id) ?? []),
  );
}

export function validateModdedDeckAvailability(cardIds: string[], mods: InstalledMod[]) {
  const activeModCardIds = getActiveModCardIds(mods);
  const installedModCardIds = new Set(mods.flatMap((mod) => mod.package.cards?.map((card) => card.id) ?? []));
  const missingModdedCardIds = cardIds.filter((cardId) => installedModCardIds.has(cardId) && !activeModCardIds.has(cardId));
  return {
    valid: missingModdedCardIds.length === 0,
    missingModdedCardIds,
    message: missingModdedCardIds.length ? "Este mazo contiene cartas de un expediente no cargado." : "Mazo comunitario autorizado para sandbox.",
  };
}
