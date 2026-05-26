import type { ModPackage } from "./modTypes";
import { safeParseJSON } from "./safeContentParser";
import { validateModPackage } from "./modValidator";

export type ModImportResult = {
  ok: boolean;
  message: string;
  mod?: ModPackage;
  errors: string[];
};

export function importModFromJSON(raw: string): ModImportResult {
  const parsed = safeParseJSON<ModPackage>(raw);
  if (!parsed.ok || !parsed.data) return { ok: false, message: "Importacion rechazada.", errors: parsed.errors };
  const validation = validateModPackage(parsed.data);
  if (!validation.valid) {
    return {
      ok: false,
      message: "El expediente no paso validacion.",
      mod: parsed.data,
      errors: validation.errors,
    };
  }
  return { ok: true, message: "El expediente parece legal. Sospechoso, pero legal.", mod: parsed.data, errors: [] };
}
