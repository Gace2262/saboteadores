import type { EditorCardDraft, EditorCardEffect } from "@/data/editorTemplates";

export type CompiledEffectLine = {
  text: string;
  weight: number;
};

export function compileEffect(effect: EditorCardEffect): CompiledEffectLine {
  const target = effect.target === "enemy" ? "al rival" : effect.target === "self" ? "a ti" : "al tablero";
  const textByType: Record<string, string> = {
    damage: `Hace ${effect.value} de dano ${target}.`,
    heal: `Recupera ${effect.value} Voluntad ${target}.`,
    draw: `Roba ${effect.value} carta(s).`,
    discard: `Descarta ${effect.value} carta(s) ${target}.`,
    gain_stress: `Gana ${effect.value} Estres.`,
    reduce_stress: `Reduce ${effect.value} Estres.`,
    apply_chain: `Aplica ${effect.value} Cadena(s) ${target}.`,
    remove_chain: `Rompe ${effect.value} Cadena(s).`,
    gain_clarity: `Gana ${effect.value} Claridad.`,
    reduce_clarity: `Reduce ${effect.value} Claridad ${target}.`,
    summon: `Invoca entidad de archivo nivel ${effect.value}.`,
    transform: `Transforma carta con valor ${effect.value}.`,
    copy: `Copia efecto con intensidad ${effect.value}.`,
    trigger_keyword: `Activa keyword con potencia ${effect.value}.`,
    cinematic: `Dispara cinematica ${effect.animation ?? "sin asignar"}.`,
    corruption: `Agrega ${effect.value} Corrupcion.`,
    catarsis: `Convierte Estres en resultado catartico nivel ${effect.value}.`,
    random: `Efecto aleatorio controlado: ${effect.condition ?? "sin condicion"}.`,
  };
  return { text: textByType[effect.type] ?? "Efecto desconocido.", weight: effect.value };
}

export function compileCardEffects(card: EditorCardDraft) {
  return card.effects.map(compileEffect);
}
