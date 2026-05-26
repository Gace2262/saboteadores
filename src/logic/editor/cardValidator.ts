import { allFactions } from "@/data/factions";
import { keywordDefinitions } from "@/data/keywords";
import { rarityDefinitions } from "@/data/rarities";
import type { EditorCardDraft, EditorCardEffect } from "@/data/editorTemplates";

export type EditorValidation = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

const effectTypes = new Set([
  "damage",
  "heal",
  "draw",
  "discard",
  "gain_stress",
  "reduce_stress",
  "apply_chain",
  "remove_chain",
  "gain_clarity",
  "reduce_clarity",
  "summon",
  "transform",
  "copy",
  "trigger_keyword",
  "cinematic",
  "corruption",
  "catarsis",
  "random",
]);

export function validateEditorEffect(effect: EditorCardEffect) {
  const errors: string[] = [];
  if (!effectTypes.has(effect.type)) errors.push(`Efecto invalido: ${effect.type}`);
  if (!["self", "enemy", "both", "board", "random"].includes(effect.target)) errors.push(`Target invalido: ${effect.target}`);
  if (!Number.isFinite(effect.value) || effect.value < 0 || effect.value > 99) errors.push("Valor de efecto fuera de rango.");
  if (effect.type === "random" && !effect.condition) errors.push("Random requiere condition o descripcion para evitar caos sin acta.");
  return errors;
}

export function validateEditorCard(card: EditorCardDraft, knownIds: string[] = []): EditorValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!/^[a-z0-9-]+$/.test(card.id)) errors.push("ID debe usar minusculas, numeros y guiones.");
  if (knownIds.filter((id) => id === card.id).length > 1) errors.push("ID duplicado.");
  if (!card.name.trim()) errors.push("Nombre requerido.");
  if (!allFactions.some((faction) => faction.id === card.faction)) errors.push("Faccion invalida.");
  if (!rarityDefinitions[card.rarity]) errors.push("Rareza invalida.");
  if (card.cost < 0 || card.cost > 12) errors.push("Costo fuera de rango.");
  if (!card.flavorText.trim()) errors.push("Flavor text requerido. El Tribunal exige veneno literario.");
  card.keywords.forEach((keyword) => {
    if (!keywordDefinitions[keyword]) errors.push(`Keyword inexistente: ${keyword}`);
  });
  if (!card.effects.length) errors.push("La carta necesita al menos un efecto.");
  card.effects.forEach((effect) => errors.push(...validateEditorEffect(effect)));
  const totalDamage = card.effects.filter((effect) => effect.type === "damage").reduce((sum, effect) => sum + effect.value, 0);
  if (card.cost <= 1 && totalDamage >= 7) warnings.push("Posible abuso detectado: demasiado dano por bajo costo.");
  if (!card.soundEffect) warnings.push("Carta sin audio.");
  if (!card.cinematic) warnings.push("Carta sin cinematica.");
  return { valid: errors.length === 0, errors, warnings };
}
