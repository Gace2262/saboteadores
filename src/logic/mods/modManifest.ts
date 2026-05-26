import { allowedModPermissions } from "@/data/modPermissions";
import type { ModManifest } from "./modTypes";

export const CURRENT_GAME_VERSION = "0.1.0-demo";

export function validateManifest(manifest: ModManifest) {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!/^[a-z0-9_-]+$/.test(manifest.id)) errors.push("ID de mod invalido. Usa minusculas, numeros, guiones o underscore.");
  if (!manifest.name?.trim()) errors.push("Nombre requerido.");
  if (!/^\d+\.\d+\.\d+/.test(manifest.version)) errors.push("Version semver requerida.");
  if (manifest.gameVersion !== CURRENT_GAME_VERSION) errors.push("Version incompatible. El Tribunal cambio las cerraduras.");
  if (!manifest.author?.trim()) errors.push("Autor requerido.");
  if (!manifest.description?.trim()) warnings.push("Descripcion vacia. Sospechoso, pero no ilegal.");
  manifest.permissions.forEach((permission) => {
    if (!allowedModPermissions.includes(permission)) errors.push(`Permiso no permitido: ${permission}`);
  });
  return { errors, warnings };
}

export function createManifestTemplate(): ModManifest {
  return {
    id: "burnout_rebellion",
    name: "La Rebelion del Burnout",
    version: "1.0.0",
    gameVersion: CURRENT_GAME_VERSION,
    author: "Comunidad",
    description: "Expansion no oficial centrada en productividad maldita.",
    content: {
      cards: "cards.json",
      bosses: "bosses.json",
      events: "events.json",
      campaigns: "campaigns.json",
      cosmetics: "cosmetics.json",
    },
    permissions: ["cards", "bosses", "events"],
    tags: ["burnout", "maldita", "campana"],
    contentWarnings: ["dark_theme"],
    changelog: ["Manifest inicial."],
  };
}
