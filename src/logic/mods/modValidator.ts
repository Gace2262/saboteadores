import { allCards } from "@/data/cards";
import { validateEditorCard } from "@/logic/editor/cardValidator";
import { validateManifest } from "./modManifest";
import type { ModConflict, ModPackage, ModValidationReport } from "./modTypes";

export function validateModPackage(pkg: ModPackage, installedIds: string[] = []): ModValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const conflicts: ModConflict[] = [];
  const manifestReport = validateManifest(pkg.manifest);
  errors.push(...manifestReport.errors);
  warnings.push(...manifestReport.warnings);

  if (installedIds.includes(pkg.manifest.id)) {
    conflicts.push({
      id: `${pkg.manifest.id}-manifest-duplicate`,
      type: "manifest_duplicate",
      affectedId: pkg.manifest.id,
      modA: pkg.manifest.id,
      message: "ID de mod duplicado. Dos expedientes reclaman el mismo archivador.",
    });
  }

  const cardIds = new Set<string>();
  (pkg.cards ?? []).forEach((card) => {
    const cardReport = validateEditorCard(card, pkg.cards?.map((item) => item.id) ?? []);
    errors.push(...cardReport.errors.map((error) => `${card.id}: ${error}`));
    warnings.push(...cardReport.warnings.map((warning) => `${card.id}: ${warning}`));
    if (cardIds.has(card.id) || allCards.some((official) => official.id === card.id)) {
      conflicts.push({
        id: `${pkg.manifest.id}-${card.id}-duplicate`,
        type: "duplicate_card",
        affectedId: card.id,
        modA: pkg.manifest.id,
        message: "IDs duplicados. Dos cartas reclaman el mismo trauma.",
      });
    }
    cardIds.add(card.id);
  });

  const bossIds = new Set<string>();
  (pkg.bosses ?? []).forEach((boss) => {
    if (!boss.phases.length) errors.push(`${boss.id}: boss sin fases.`);
    if (bossIds.has(boss.id)) {
      conflicts.push({ id: `${pkg.manifest.id}-${boss.id}-boss`, type: "duplicate_boss", affectedId: boss.id, modA: pkg.manifest.id, message: "Boss duplicado." });
    }
    bossIds.add(boss.id);
  });

  (pkg.campaigns ?? []).forEach((node) => {
    if (node.eventId && !(pkg.events ?? []).some((event) => event.id === node.eventId)) {
      conflicts.push({ id: `${pkg.manifest.id}-${node.id}-event`, type: "missing_event_reference", affectedId: node.eventId, modA: pkg.manifest.id, message: "Evento referenciado inexistente." });
    }
  });

  if (pkg.customRules) {
    const rules = pkg.customRules;
    if ((rules.initialWillpower ?? 30) > 99 || (rules.handSize ?? 5) > 10 || (rules.deckLimit ?? 40) > 80) {
      errors.push("Reglas custom fuera de limites seguros.");
    }
  }

  if (pkg.cards?.length && !pkg.i18n) {
    warnings.push("Este expediente comunitario no habla tu idioma. El Tribunal improvisara subtitulos.");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    conflicts,
    detectedContent: {
      cards: pkg.cards?.length ?? 0,
      bosses: pkg.bosses?.length ?? 0,
      events: pkg.events?.length ?? 0,
      campaigns: pkg.campaigns?.length ?? 0,
      cosmetics: pkg.cosmetics?.length ?? 0,
      rules: Boolean(pkg.customRules),
    },
  };
}
