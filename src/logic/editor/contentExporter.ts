import type { EditorExpansionDraft } from "@/data/editorTemplates";
import type { EditorStateSnapshot } from "@/store/editorStore";

export type ExportedContentPackage = {
  schemaVersion: "editor-content-v1";
  exportedAt: string;
  source: "archivo-creacion";
  content: EditorStateSnapshot;
};

export function exportContentPackage(content: EditorStateSnapshot): string {
  const payload: ExportedContentPackage = {
    schemaVersion: "editor-content-v1",
    exportedAt: new Date().toISOString(),
    source: "archivo-creacion",
    content,
  };
  return JSON.stringify(payload, null, 2);
}

export function exportExpansion(expansion: EditorExpansionDraft) {
  return JSON.stringify({ schemaVersion: "editor-expansion-v1", expansion }, null, 2);
}
