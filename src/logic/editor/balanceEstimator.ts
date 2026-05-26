import type { EditorCardDraft } from "@/data/editorTemplates";

export type EditorBalanceReport = {
  powerScore: number;
  efficiency: number;
  risk: number;
  comboPotential: number;
  stressGenerated: number;
  verdict: string;
};

export function estimateEditorCardBalance(card: EditorCardDraft): EditorBalanceReport {
  const damage = card.effects.filter((effect) => effect.type === "damage").reduce((sum, effect) => sum + effect.value, 0);
  const heal = card.effects.filter((effect) => effect.type === "heal").reduce((sum, effect) => sum + effect.value * 0.8, 0);
  const draw = card.effects.filter((effect) => effect.type === "draw").reduce((sum, effect) => sum + effect.value * 2, 0);
  const control = card.effects.filter((effect) => ["apply_chain", "discard", "reduce_clarity"].includes(effect.type)).reduce((sum, effect) => sum + effect.value * 1.8, 0);
  const stressGenerated = card.effects.filter((effect) => effect.type === "gain_stress").reduce((sum, effect) => sum + effect.value, 0);
  const risk = stressGenerated + card.effects.filter((effect) => effect.type === "random" || effect.type === "corruption").length * 2;
  const comboPotential = card.keywords.length * 1.4 + card.effects.filter((effect) => ["copy", "trigger_keyword", "catarsis"].includes(effect.type)).length * 2;
  const powerScore = Math.round((damage + heal + draw + control + comboPotential - risk * 0.7) * 10) / 10;
  const efficiency = Math.round((powerScore / Math.max(1, card.cost)) * 10) / 10;
  const verdict =
    efficiency > 6
      ? "El Tribunal considera esto ilegal."
      : efficiency > 4.2
        ? "Posible abuso detectado"
        : risk > 5
          ? "Carta agresiva"
          : "Carta estable";
  return { powerScore, efficiency, risk, comboPotential, stressGenerated, verdict };
}
