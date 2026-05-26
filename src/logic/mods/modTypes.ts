import type { EditorBossDraft, EditorCampaignNodeDraft, EditorCardDraft, EditorEventDraft, EditorExpansionDraft } from "@/data/editorTemplates";
import type { ModContentWarning, ModPermission, ModTrustState } from "@/data/modPermissions";
import type { Locale, TranslationDictionary } from "@/i18n/config";

export type ModManifest = {
  id: string;
  name: string;
  version: string;
  gameVersion: string;
  author: string;
  description: string;
  content: Partial<Record<"cards" | "bosses" | "events" | "campaigns" | "cosmetics", string>>;
  permissions: ModPermission[];
  tags: string[];
  contentWarnings?: ModContentWarning[];
  changelog?: string[];
};

export type ModCustomRules = {
  initialWillpower?: number;
  initialClarity?: number;
  initialStress?: number;
  handSize?: number;
  deckLimit?: number;
  eventFrequency?: number;
  rewardMultiplier?: number;
};

export type ModPackage = {
  manifest: ModManifest;
  cards?: EditorCardDraft[];
  bosses?: EditorBossDraft[];
  events?: EditorEventDraft[];
  campaigns?: EditorCampaignNodeDraft[];
  cosmetics?: unknown[];
  expansions?: EditorExpansionDraft[];
  customRules?: ModCustomRules;
  i18n?: Partial<Record<Locale, TranslationDictionary>>;
};

export type InstalledMod = {
  manifest: ModManifest;
  package: ModPackage;
  enabled: boolean;
  trustState: ModTrustState;
  checksum: string;
  installedAt: string;
  loadOrder: number;
  validation: ModValidationReport;
};

export type ModConflictType =
  | "duplicate_card"
  | "duplicate_boss"
  | "unknown_keyword"
  | "missing_event_reference"
  | "invalid_reward"
  | "rarity_not_allowed"
  | "manifest_duplicate";

export type ModConflict = {
  id: string;
  type: ModConflictType;
  affectedId: string;
  modA: string;
  modB?: string;
  message: string;
};

export type ModValidationReport = {
  valid: boolean;
  errors: string[];
  warnings: string[];
  conflicts: ModConflict[];
  detectedContent: {
    cards: number;
    bosses: number;
    events: number;
    campaigns: number;
    cosmetics: number;
    rules: boolean;
  };
};
