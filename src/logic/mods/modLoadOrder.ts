import type { InstalledMod } from "./modTypes";

export function normalizeLoadOrder(mods: InstalledMod[]) {
  return [...mods].sort((a, b) => a.loadOrder - b.loadOrder).map((mod, index) => ({ ...mod, loadOrder: index }));
}

export function moveMod(mods: InstalledMod[], modId: string, direction: "up" | "down") {
  const ordered = normalizeLoadOrder(mods);
  const index = ordered.findIndex((mod) => mod.manifest.id === modId);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= ordered.length) return ordered;
  [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
  return ordered.map((mod, nextIndex) => ({ ...mod, loadOrder: nextIndex }));
}
