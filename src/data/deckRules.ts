import type { Rarity } from "./cards";
import type { FactionId } from "./factions";

export const deckRules = {
  minSize: 30,
  maxSize: 40,
  neutralFactions: ["conciencia", "trascendencia"] satisfies FactionId[],
  judgeFaction: "juez" satisfies FactionId,
  maxCopiesByRarity: {
    comun: 3,
    rara: 3,
    epica: 2,
    legendaria: 1,
    maldita: 1,
  } satisfies Record<Rarity, number>,
};

export const sarcasticWarnings = {
  unfocused: "Este mazo tiene menos foco que una reunion con ansiedad.",
  expensive: "Demasiadas cartas caras. La epica no paga la cuenta.",
  tooSmall: "Te faltan cartas. Hasta el Evitador trajo mas compromiso.",
  judgeBlocked: "El Juez no cabe aqui. Y creeme, intento entrar.",
  valid: "Mazo valido. Sospechoso, pero valido.",
};
