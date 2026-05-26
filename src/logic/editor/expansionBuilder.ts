import type { EditorExpansionDraft } from "@/data/editorTemplates";
import type { EditorStateSnapshot } from "@/store/editorStore";

export function buildExpansionFromSnapshot(snapshot: EditorStateSnapshot, name = "Expansion sin archivar"): EditorExpansionDraft {
  const id = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    id: id || "expansion-sin-nombre",
    name,
    tagline: "Contenido creado en el Archivo de Creacion.",
    cards: snapshot.cards,
    bosses: snapshot.bosses,
    events: snapshot.events,
    campaigns: snapshot.campaignNodes,
    cosmetics: [],
    soundtrackRefs: [],
    backgrounds: [],
    version: "0.1.0-draft",
    author: "Archivo de Creacion",
  };
}
