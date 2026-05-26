export type Keyword =
  | "Sentencia"
  | "Cadena"
  | "Culpa"
  | "Derrumbe"
  | "Estampida"
  | "Mascara"
  | "Despertar"
  | "Obsesion"
  | "Ironia"
  | "Catarsis"
  | "Aceptacion"
  | "Limites"
  | "Enfoque"
  | "Confianza"
  | "Intuicion"
  | "Responsabilidad"
  | "Accion Directa"
  | "Expresion"
  | "Silencio"
  | "Caos";

export type KeywordDefinition = {
  id: Keyword;
  label: string;
  nameKey: string;
  shortText: string;
  descriptionKey: string;
  icon: string;
  tone: "gold" | "blue" | "red" | "violet" | "green";
};

const keywordSlug: Record<Keyword, string> = {
  Sentencia: "sentence",
  Cadena: "chain",
  Culpa: "guilt",
  Derrumbe: "collapse",
  Estampida: "stampede",
  Mascara: "mask",
  Despertar: "awakening",
  Obsesion: "obsession",
  Ironia: "irony",
  Catarsis: "catharsis",
  Aceptacion: "acceptance",
  Limites: "boundaries",
  Enfoque: "focus",
  Confianza: "trust",
  Intuicion: "intuition",
  Responsabilidad: "responsibility",
  "Accion Directa": "directAction",
  Expresion: "expression",
  Silencio: "silence",
  Caos: "chaos",
};

const keywordKeys = (keyword: Keyword) => ({
  nameKey: `keywords.${keywordSlug[keyword]}.name`,
  descriptionKey: `keywords.${keywordSlug[keyword]}.description`,
});

export const keywordDefinitions: Record<Keyword, KeywordDefinition> = {
  Sentencia: {
    id: "Sentencia",
    ...keywordKeys("Sentencia"),
    label: "Sentencia",
    shortText: "Dano extra si el rival tiene Estres alto.",
    icon: "S",
    tone: "gold",
  },
  Cadena: {
    id: "Cadena",
    ...keywordKeys("Cadena"),
    label: "Cadena",
    shortText: "Bloquea cartas o recursos del rival.",
    icon: "#",
    tone: "violet",
  },
  Culpa: {
    id: "Culpa",
    ...keywordKeys("Culpa"),
    label: "Culpa",
    shortText: "Reduce Claridad del rival.",
    icon: "!",
    tone: "blue",
  },
  Derrumbe: {
    id: "Derrumbe",
    ...keywordKeys("Derrumbe"),
    label: "Derrumbe",
    shortText: "Hace descartar cartas.",
    icon: "V",
    tone: "red",
  },
  Estampida: {
    id: "Estampida",
    ...keywordKeys("Estampida"),
    label: "Estampida",
    shortText: "Dano por mano o Estres acumulado.",
    icon: ">>",
    tone: "red",
  },
  Mascara: {
    id: "Mascara",
    ...keywordKeys("Mascara"),
    label: "Mascara",
    shortText: "Evita dano o esconde una carta.",
    icon: "()",
    tone: "violet",
  },
  Despertar: {
    id: "Despertar",
    ...keywordKeys("Despertar"),
    label: "Despertar",
    shortText: "Limpia Ruido Mental y recupera Voluntad.",
    icon: "*",
    tone: "green",
  },
  Obsesion: {
    id: "Obsesion",
    ...keywordKeys("Obsesion"),
    label: "Obsesion",
    shortText: "Repite efectos, pero sube Estres propio.",
    icon: "8",
    tone: "violet",
  },
  Ironia: {
    id: "Ironia",
    ...keywordKeys("Ironia"),
    label: "Ironia",
    shortText: "Efecto aleatorio con comentario venenoso.",
    icon: "?",
    tone: "gold",
  },
  Catarsis: {
    id: "Catarsis",
    ...keywordKeys("Catarsis"),
    label: "Catarsis",
    shortText: "Convierte Estres en dano o curacion.",
    icon: "~",
    tone: "green",
  },
  Aceptacion: {
    id: "Aceptacion",
    ...keywordKeys("Aceptacion"),
    label: "Aceptacion",
    shortText: "Reduce castigos por errores o Estres.",
    icon: "A",
    tone: "green",
  },
  Limites: {
    id: "Limites",
    ...keywordKeys("Limites"),
    label: "Limites",
    shortText: "Rompe cadenas emocionales.",
    icon: "L",
    tone: "gold",
  },
  Enfoque: {
    id: "Enfoque",
    ...keywordKeys("Enfoque"),
    label: "Enfoque",
    shortText: "Reduce efectos de caos.",
    icon: "F",
    tone: "blue",
  },
  Confianza: {
    id: "Confianza",
    ...keywordKeys("Confianza"),
    label: "Confianza",
    shortText: "Anula trampas o alarmas.",
    icon: "C",
    tone: "green",
  },
  Intuicion: {
    id: "Intuicion",
    ...keywordKeys("Intuicion"),
    label: "Intuicion",
    shortText: "Ignora anulaciones racionales.",
    icon: "I",
    tone: "violet",
  },
  Responsabilidad: {
    id: "Responsabilidad",
    ...keywordKeys("Responsabilidad"),
    label: "Responsabilidad",
    shortText: "Evita reflejos de culpa.",
    icon: "R",
    tone: "gold",
  },
  "Accion Directa": {
    id: "Accion Directa",
    ...keywordKeys("Accion Directa"),
    label: "Accion Directa",
    shortText: "Cancela retrasos o congelamientos.",
    icon: ">",
    tone: "red",
  },
  Expresion: {
    id: "Expresion",
    ...keywordKeys("Expresion"),
    label: "Expresion",
    shortText: "Revela cartas ocultas.",
    icon: "E",
    tone: "blue",
  },
  Silencio: {
    id: "Silencio",
    ...keywordKeys("Silencio"),
    label: "Silencio",
    shortText: "Reduce multiples acciones enemigas.",
    icon: "_",
    tone: "violet",
  },
  Caos: {
    id: "Caos",
    ...keywordKeys("Caos"),
    label: "Caos",
    shortText: "Rompe bloqueos del Controlador.",
    icon: "?",
    tone: "red",
  },
};
