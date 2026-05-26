"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { editorBossTemplate, editorCardTemplate, editorEventTemplate, type EditorCampaignNodeDraft } from "@/data/editorTemplates";
import type { Keyword } from "@/data/keywords";
import type { ModContentWarning, ModPermission } from "@/data/modPermissions";
import { exportModPackage } from "@/logic/mods/modExporter";
import { importModFromJSON } from "@/logic/mods/modImporter";
import { moveMod, normalizeLoadOrder } from "@/logic/mods/modLoadOrder";
import { createManifestTemplate } from "@/logic/mods/modManifest";
import { calculateModChecksum, registerMod } from "@/logic/mods/modRegistry";
import { createModSandboxState, type ModSandboxState } from "@/logic/mods/modSandbox";
import { collectModConflicts, resolveConflictByWinner } from "@/logic/mods/modConflictResolver";
import type { InstalledMod, ModConflict, ModPackage } from "@/logic/mods/modTypes";

type ModStore = {
  installedMods: InstalledMod[];
  selectedModId: string;
  importText: string;
  importMessage: string;
  setImportText: (value: string) => void;
  installModFromJSON: (raw: string) => void;
  installSampleMod: () => void;
  toggleMod: (id: string) => void;
  removeMod: (id: string) => void;
  moveModUp: (id: string) => void;
  moveModDown: (id: string) => void;
  selectMod: (id: string) => void;
  exportMod: (id: string) => string;
  exportActivePack: () => string;
  resolveConflict: (conflict: ModConflict, winnerModId: string) => void;
  getConflicts: () => ModConflict[];
  getSandboxState: () => ModSandboxState;
};

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const sampleCampaignNode: EditorCampaignNodeDraft = {
  id: "burnout-audiencia-inicial",
  type: "evento",
  title: "Audiencia del Burnout Importado",
  x: 30,
  y: 50,
  connections: [],
  eventId: "el-tribunal-suspira",
  rewardIds: ["productividad-en-llamas"],
};

export function createSampleModPackage(): ModPackage {
  const manifest = {
    ...createManifestTemplate(),
    id: "burnout-rebellion-local",
    name: "La Rebelion del Burnout Local",
    author: "Comunidad",
    description: "Expansion no oficial centrada en productividad maldita y papeleo emocional inflamable.",
    permissions: ["cards", "bosses", "events", "campaigns"] satisfies ModPermission[],
    tags: ["burnout", "maldita", "sandbox"],
    contentWarnings: ["dark_theme", "intense_motion"] satisfies ModContentWarning[],
    changelog: ["Expediente de ejemplo generado localmente."],
  };
  const card = {
    ...clone(editorCardTemplate),
    id: "productividad-en-llamas",
    name: "Productividad en Llamas",
    faction: "inquieto" as const,
    rarity: "rara" as const,
    cost: 2,
    keywords: ["Estampida", "Caos"] satisfies Keyword[],
    effects: [
      { type: "damage" as const, target: "enemy" as const, value: 4, animation: "horse_stampede" as const, sound: "horse_stampede" as const },
      { type: "gain_stress" as const, target: "self" as const, value: 1, animation: "panic_pulse" as const, sound: "panic_pulse" as const },
    ],
    effectText: "Hace 4 de dano y ganas 1 Estres. La agenda arde con excelente gestion.",
    flavorText: "El burnout pidio presupuesto y recibio una antorcha.",
    visualEffect: "horse_stampede" as const,
    soundEffect: "horse_stampede" as const,
    cinematic: "horse_stampede" as const,
    author: "Comunidad",
  };
  const boss = {
    ...clone(editorBossTemplate),
    id: "supervisor-del-burnout",
    name: "Supervisor del Burnout",
    faction: "inquieto" as const,
    room: "Archivo con Cafe en Llamas",
    dialogue: ["La productividad no murio. Fue promovida."],
    rewards: ["productividad-en-llamas"],
  };
  const event = { ...clone(editorEventTemplate), id: "el-tribunal-suspira", title: "El Tribunal Suspira Importado" };
  return {
    manifest,
    cards: [card],
    bosses: [boss],
    events: [event],
    campaigns: [sampleCampaignNode],
    cosmetics: [{ id: "aura-burnout-local", name: "Aura Burnout Local", type: "aura" }],
    customRules: { initialStress: 1, rewardMultiplier: 1.1 },
  };
}

function backupBeforeActivation(mods: InstalledMod[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    "saboteadores-mod-backup",
    JSON.stringify({ at: new Date().toISOString(), enabledModIds: mods.filter((mod) => mod.enabled).map((mod) => mod.manifest.id) }),
  );
}

export const useModStore = create<ModStore>()(
  persist(
    (set, get) => ({
      installedMods: [],
      selectedModId: "",
      importText: JSON.stringify(createSampleModPackage(), null, 2),
      importMessage: "Sin expedientes importados. El archivo prohibido bosteza.",
      setImportText: (importText) => set({ importText }),
      installModFromJSON: (raw) => {
        const parsed = importModFromJSON(raw);
        if (!parsed.ok || !parsed.mod) {
          set({ importMessage: `${parsed.message} ${parsed.errors.join(" ")}`.trim() });
          return;
        }
        set((state) => {
          const installed = registerMod(parsed.mod as ModPackage, state.installedMods);
          return {
            installedMods: normalizeLoadOrder([installed, ...state.installedMods]),
            selectedModId: installed.manifest.id,
            importMessage: parsed.message,
          };
        });
      },
      installSampleMod: () =>
        set((state) => {
          const pkg = createSampleModPackage();
          const installed = registerMod(pkg, state.installedMods);
          return {
            installedMods: normalizeLoadOrder([installed, ...state.installedMods]),
            selectedModId: installed.manifest.id,
            importMessage: "Expediente de ejemplo archivado. Nadie firmo, pero quedo bonito.",
          };
        }),
      toggleMod: (id) =>
        set((state) => {
          const target = state.installedMods.find((mod) => mod.manifest.id === id);
          if (target && !target.enabled) backupBeforeActivation(state.installedMods);
          return {
            installedMods: state.installedMods.map((mod) => (mod.manifest.id === id ? { ...mod, enabled: !mod.enabled } : mod)),
            importMessage: target?.enabled ? "Mod desactivado. El expediente vuelve al cajon." : "Backup creado y mod activado. Logros oficiales en pausa si aplica.",
          };
        }),
      removeMod: (id) =>
        set((state) => ({
          installedMods: normalizeLoadOrder(state.installedMods.filter((mod) => mod.manifest.id !== id)),
          selectedModId: state.selectedModId === id ? "" : state.selectedModId,
          importMessage: "Expediente eliminado. El Tribunal niega haberlo leido.",
        })),
      moveModUp: (id) => set((state) => ({ installedMods: moveMod(state.installedMods, id, "up") })),
      moveModDown: (id) => set((state) => ({ installedMods: moveMod(state.installedMods, id, "down") })),
      selectMod: (selectedModId) => set({ selectedModId }),
      exportMod: (id) => {
        const mod = get().installedMods.find((item) => item.manifest.id === id);
        return mod ? exportModPackage(mod.package) : "";
      },
      exportActivePack: () => {
        const active = get().installedMods.filter((mod) => mod.enabled && mod.validation.valid);
        return JSON.stringify(
          {
            exportedAt: new Date().toISOString(),
            checksums: active.map((mod) => ({ id: mod.manifest.id, checksum: calculateModChecksum(mod.package) })),
            mods: active.map((mod) => mod.package),
          },
          null,
          2,
        );
      },
      resolveConflict: (conflict, winnerModId) => set((state) => ({ installedMods: normalizeLoadOrder(resolveConflictByWinner(state.installedMods, conflict, winnerModId)) })),
      getConflicts: () => collectModConflicts(get().installedMods),
      getSandboxState: () => createModSandboxState(get().installedMods),
    }),
    { name: "saboteadores-mods-v1" },
  ),
);
