"use client";

import { create } from "zustand";
import { fetchCloudSave, syncCloudSave, uploadLocalSave, downloadCloudSave } from "@/logic/cloud/cloudSaveManager";
import type { SaveConflict } from "@/logic/cloud/conflictResolver";
import type { SyncDecision } from "@/logic/cloud/syncResolver";

type CloudStatus = "offline" | "idle" | "syncing" | "conflict" | "synced" | "error";

type CloudState = {
  status: CloudStatus;
  message: string;
  lastSyncAt?: string;
  conflict?: SaveConflict;
  checkCloud: () => Promise<void>;
  upload: () => Promise<void>;
  download: () => Promise<void>;
  sync: (decision?: SyncDecision) => Promise<void>;
};

export const useCloudStore = create<CloudState>((set) => ({
  status: "idle",
  message: "Sin sincronizacion todavia.",
  checkCloud: async () => {
    set({ status: "syncing", message: "Revisando nube..." });
    const result = await fetchCloudSave();
    set({
      status: result.ok ? "idle" : "offline",
      message: result.message,
      lastSyncAt: result.cloudUpdatedAt,
    });
  },
  upload: async () => {
    set({ status: "syncing", message: "Subiendo progreso..." });
    const result = await uploadLocalSave();
    set({ status: result.ok ? "synced" : "error", message: result.message, lastSyncAt: result.ok ? new Date().toISOString() : undefined });
  },
  download: async () => {
    set({ status: "syncing", message: "Descargando progreso..." });
    const result = await downloadCloudSave();
    set({ status: result.ok ? "synced" : "error", message: result.message, lastSyncAt: result.cloudUpdatedAt ?? new Date().toISOString() });
  },
  sync: async (decision = "merge_safe") => {
    set({ status: "syncing", message: "Sincronizando..." });
    const result = await syncCloudSave(decision);
    set({ status: result.ok ? "synced" : "error", message: result.message, lastSyncAt: result.ok ? new Date().toISOString() : undefined });
  },
}));
