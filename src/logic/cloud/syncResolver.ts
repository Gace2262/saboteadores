import type { GameSave } from "@/logic/save/saveManager";
import { detectSaveConflict, mergeSavesSafely, type SaveConflict } from "./conflictResolver";

export type SyncDecision = "use_local" | "use_cloud" | "merge_safe";

export type SyncResolution = {
  save: GameSave;
  conflict: SaveConflict | null;
  decision: SyncDecision;
  message: string;
};

export function resolveSync(localSave: GameSave, cloudSave: GameSave | null, decision: SyncDecision = "merge_safe"): SyncResolution {
  if (!cloudSave) {
    return { save: localSave, conflict: null, decision: "use_local", message: "No habia nube. El expediente local sube al estrado." };
  }
  const conflict = detectSaveConflict(localSave, cloudSave);
  if (!conflict) return { save: localSave, conflict: null, decision, message: "Local y nube coinciden. Sospechoso, pero util." };
  if (decision === "use_cloud") return { save: cloudSave, conflict, decision, message: "Usando save de nube." };
  if (decision === "use_local") return { save: localSave, conflict, decision, message: "Usando save local." };
  return { save: mergeSavesSafely(localSave, cloudSave), conflict, decision, message: "Fusion segura aplicada." };
}
