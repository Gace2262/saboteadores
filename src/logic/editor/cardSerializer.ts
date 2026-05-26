import type { Card } from "@/data/cards";
import type { EditorCardDraft } from "@/data/editorTemplates";

const effectValue = (card: EditorCardDraft, type: string) =>
  card.effects.filter((effect) => effect.type === type).reduce((sum, effect) => sum + effect.value, 0);

export function editorCardToRuntimeCard(card: EditorCardDraft): Card {
  const keyBase = `cards.${card.id.replace(/-([a-z0-9])/g, (_, letter: string) => letter.toUpperCase())}`;
  return {
    id: card.id,
    name: card.name,
    nameKey: `${keyBase}.name`,
    faction: card.faction,
    type: card.effects.some((effect) => effect.type === "catarsis") ? "Trascendencia" : "Accion",
    rarity: card.rarity,
    cost: card.cost,
    willpowerDamage: effectValue(card, "damage"),
    stressGain: effectValue(card, "gain_stress") - effectValue(card, "reduce_stress"),
    clarityGain: effectValue(card, "gain_clarity") - effectValue(card, "reduce_clarity"),
    mentalNoise: effectValue(card, "corruption") - effectValue(card, "remove_chain"),
    effectText: card.effectText,
    effectKey: `${keyBase}.effect`,
    darkHumorText: card.flavorText,
    visualEffect: card.visualEffect,
    soundEffect: card.soundEffect,
    animationType: card.animationType,
    impactText: card.flavorText,
    impactKey: `${keyBase}.impact`,
    keywords: card.keywords,
    collectible: true,
    unlockCondition: "Contenido creado en Archivo de Creacion.",
    packSources: ["intrusivos"],
    duplicateValue: 10,
    flavorQuote: card.flavorText,
    flavorKey: `${keyBase}.flavor`,
  };
}

export function serializeCard(card: EditorCardDraft) {
  return JSON.stringify(card, null, 2);
}

export function deserializeCard(json: string): EditorCardDraft {
  const parsed = JSON.parse(json) as EditorCardDraft;
  return parsed;
}
