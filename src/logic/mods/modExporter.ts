import type { ModPackage } from "./modTypes";

export function exportModPackage(mod: ModPackage) {
  return JSON.stringify(mod, null, 2);
}

export function exportCommunityPack(mods: ModPackage[]) {
  return JSON.stringify({ schemaVersion: "community-pack-v1", mods }, null, 2);
}
