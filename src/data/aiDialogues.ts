import type { FactionId } from "@/data/factions";
import type { PlayerPattern } from "@/logic/ai/advancedAITypes";

export type AIDialogueEvent =
  | "combatStart"
  | "playerLowHealth"
  | "playerHighStress"
  | "bossLowHealth"
  | "repeatedCombo"
  | "cardBlocked"
  | "catarsisUsed"
  | "cursedCardUsed"
  | "bossPhaseChange"
  | "playerVictory"
  | "playerDefeat";

export const aiDialogues: Record<FactionId, Partial<Record<AIDialogueEvent | PlayerPattern, string[]>>> = {
  juez: {
    combatStart: ["La audiencia continua.", "Tus patrones ya declararon."],
    repeatedCombo: ["El expediente muestra reincidencia estrategica.", "Interesante. Repetiste el mismo mecanismo con mejor iluminacion."],
    catarsis_frequent: ["La claridad viene armada hoy."],
    stress_overuse: ["Tu estres acaba de declarar en tu contra."],
    playerDefeat: ["El Tribunal reservo tu silla."],
  },
  controlador: {
    combatStart: ["Improvisar queda suspendido.", "Tu libertad necesita formulario."],
    chain_abuse: ["Controlar no es miedo. Es miedo con escritorio."],
    cardBlocked: ["Formulario aprobado: bloqueo aplicado."],
  },
  perfeccionista: {
    combatStart: ["Que jugada tan casi aceptable."],
    slow_deck: ["Tu curva de costos pidio funeral con catering."],
    bossPhaseChange: ["El error sobrevivio. Imperdonable, pero documentado."],
  },
  inquieto: {
    combatStart: ["Ya me aburri del turno actual."],
    aggressive: ["El proximo problema se ve mas entretenido."],
    irony_random: ["La pausa fue cancelada por exceso de posibilidades."],
  },
  hipervigilante: {
    combatStart: ["No hay peligro visible. Claramente es el peor tipo."],
    combo_deck: ["Prepare un plan contra tu plan de tener demasiados planes."],
  },
  evitador: {
    combatStart: ["Resolveremos esto en un futuro emocionalmente conveniente."],
    defensive: ["Sobrevivir tambien cuenta como estrategia."],
  },
  reservado: {
    combatStart: ["No dije nada. Ese fue el ataque."],
    evasion: ["El silencio no esta vacio. Esta cargando."],
  },
  victima: {
    combatStart: ["No me atacaste. Me diste material."],
    aggressive: ["Tu dano viene con devolucion emocional."],
  },
  hiperracional: {
    combatStart: ["Tu esperanza no supera revision estadistica."],
    combo_deck: ["He modelado tu impulsividad en tres graficos deprimentes."],
  },
  complaciente: {
    combatStart: ["No es manipulacion si traje galletas."],
    defensive: ["Te cuide tanto que ahora me perteneces un poquito."],
  },
  conciencia: { combatStart: ["La claridad no deberia estar del lado enemigo, pero aqui estamos."] },
  trascendencia: { combatStart: ["La paz interior trajo casco y una mala actitud."] },
};
