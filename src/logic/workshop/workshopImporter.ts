import type { WorkshopContent } from "./workshopTypes";
import { validateWorkshopContent } from "./workshopValidator";

export function importWorkshopContent(raw: string): { ok: boolean; content?: WorkshopContent; errors: string[] } {
  try {
    const parsed = JSON.parse(raw) as unknown;
    const maybeWrapped = parsed as { content?: unknown };
    const content = (typeof parsed === "object" && parsed !== null && "content" in maybeWrapped ? maybeWrapped.content : parsed) as WorkshopContent | undefined;
    if (!content) return { ok: false, errors: ["JSON sin expediente comunitario."] };
    const report = validateWorkshopContent(content);
    return { ok: report.valid, content: report.valid ? content : undefined, errors: report.errors };
  } catch {
    return { ok: false, errors: ["JSON ilegible. El Tribunal no puede archivar humo."] };
  }
}
