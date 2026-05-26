import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { exportSave, importSave, loadGame, saveGame, type GameSave } from "@/logic/save/saveManager";
import { resolveSync, type SyncDecision } from "./syncResolver";

export type CloudSaveRow = {
  id: string;
  user_id: string;
  save_version: string;
  save_data: GameSave;
  checksum: string;
  updated_at: string;
};

export type CloudResult = {
  ok: boolean;
  message: string;
  save?: GameSave;
  cloudUpdatedAt?: string;
};

export async function checksum(payload: string) {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const encoded = new TextEncoder().encode(payload);
    const hash = await crypto.subtle.digest("SHA-256", encoded);
    return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  return String(payload.length);
}

export async function fetchCloudSave(): Promise<CloudResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase || !isSupabaseConfigured()) return { ok: false, message: "Modo offline activo. El Tribunal guarda todo en este dispositivo." };
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { ok: false, message: "Inicia sesion para sincronizar." };
  const { data, error } = await supabase
    .from("cloud_saves")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle<CloudSaveRow>();
  if (error) return { ok: false, message: error.message };
  if (!data) return { ok: true, message: "No hay save en nube todavia." };
  return { ok: true, message: "Save de nube encontrado.", save: data.save_data, cloudUpdatedAt: data.updated_at };
}

export async function uploadLocalSave(): Promise<CloudResult> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase || !isSupabaseConfigured()) return { ok: false, message: "Supabase no configurado." };
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { ok: false, message: "Inicia sesion para subir progreso." };
  const save = loadGame().save;
  const payload = JSON.stringify(save);
  const saveChecksum = await checksum(payload);
  const { error } = await supabase.from("cloud_saves").upsert(
    {
      user_id: userData.user.id,
      save_version: String(save.saveVersion),
      save_data: save,
      checksum: saveChecksum,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: "Progreso subido. El Tribunal ahora tiene copia en la nube.", save };
}

export async function downloadCloudSave(): Promise<CloudResult> {
  const cloud = await fetchCloudSave();
  if (!cloud.ok || !cloud.save) return cloud;
  const saved = saveGame(cloud.save);
  return { ok: true, message: "Save de nube descargado al dispositivo.", save: saved, cloudUpdatedAt: cloud.cloudUpdatedAt };
}

export async function syncCloudSave(decision: SyncDecision = "merge_safe"): Promise<CloudResult> {
  const local = loadGame().save;
  const cloud = await fetchCloudSave();
  if (!cloud.ok && !cloud.save) return cloud;
  const resolution = resolveSync(local, cloud.save ?? null, decision);
  saveGame(resolution.save);
  const uploaded = await uploadLocalSave();
  return { ...uploaded, save: resolution.save, message: `${resolution.message} ${uploaded.message}` };
}

export function exportLocalSaveForCloud() {
  return exportSave();
}

export function importCloudResolvedSave(serialized: string) {
  return importSave(serialized);
}
