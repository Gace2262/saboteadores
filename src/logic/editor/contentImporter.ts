import type { EditorStateSnapshot } from "@/store/editorStore";
import type { ExportedContentPackage } from "./contentExporter";

export type ImportResult = {
  ok: boolean;
  message: string;
  content?: EditorStateSnapshot;
  conflicts: string[];
};

export function importContentPackage(json: string, existingIds: string[] = []): ImportResult {
  try {
    const parsed = JSON.parse(json) as ExportedContentPackage;
    if (parsed.schemaVersion !== "editor-content-v1") {
      return { ok: false, message: "Formato desconocido. El expediente vino sin membrete.", conflicts: [] };
    }
    const incomingIds = [
      ...parsed.content.cards.map((card) => card.id),
      ...parsed.content.bosses.map((boss) => boss.id),
      ...parsed.content.events.map((event) => event.id),
      ...parsed.content.campaignNodes.map((node) => node.id),
    ];
    const conflicts = incomingIds.filter((id) => existingIds.includes(id));
    return { ok: true, message: conflicts.length ? "Importado con conflictos detectados." : "Importacion lista.", content: parsed.content, conflicts };
  } catch {
    return { ok: false, message: "JSON invalido. El Tribunal no mastica llaves rotas.", conflicts: [] };
  }
}
