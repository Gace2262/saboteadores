import { forbiddenModFields } from "@/data/modPermissions";

export type SafeParseResult<T> = {
  ok: boolean;
  data?: T;
  errors: string[];
};

const MAX_JSON_SIZE = 1_500_000;

function scanDangerousKeys(value: unknown, path = "root", errors: string[] = []) {
  if (!value || typeof value !== "object") return errors;
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    if (forbiddenModFields.some((field) => key.toLowerCase().includes(field.toLowerCase()))) {
      errors.push(`Campo prohibido en ${path}.${key}. Este mod intento traer cuchillo a una audiencia JSON.`);
    }
    if (typeof nested === "string" && /<script|javascript:|data:text\/html|eval\(/i.test(nested)) {
      errors.push(`Texto peligroso en ${path}.${key}.`);
    }
    scanDangerousKeys(nested, `${path}.${key}`, errors);
  }
  return errors;
}

export function safeParseJSON<T>(raw: string): SafeParseResult<T> {
  if (raw.length > MAX_JSON_SIZE) return { ok: false, errors: ["Archivo demasiado grande para esta etapa del Tribunal."] };
  try {
    const parsed = JSON.parse(raw) as T;
    const errors = scanDangerousKeys(parsed);
    if (errors.length) return { ok: false, errors };
    return { ok: true, data: parsed, errors: [] };
  } catch {
    return { ok: false, errors: ["JSON invalido. El expediente llego con grapas en el alma."] };
  }
}

export function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value as Record<string, unknown>).sort().map((key) => `${JSON.stringify(key)}:${stableStringify((value as Record<string, unknown>)[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}
