export type GlossaryKind = "keyword" | "rareza" | "recurso" | "estado" | "tipo";

export type TutorialGlossaryItem = {
  id: string;
  kind: GlossaryKind;
  title: string;
  description: string;
};

export const tutorialNarratorLines = [
  "La Claridad paga las decisiones. El Estres cobra intereses.",
  "Esa cadena no es decoracion. Es una mala costumbre con metalurgia.",
  "Excelente. Acabas de convertir ansiedad en dano legalmente dudoso.",
  "El Tribunal anota avances. Tambien errores, pero con mejor caligrafia.",
];

export const tutorialGlossary: TutorialGlossaryItem[] = [
  { id: "voluntad", kind: "recurso", title: "Voluntad", description: "Tu vida principal. Si llega a 0, el Tribunal intenta redactar obituario." },
  { id: "claridad", kind: "recurso", title: "Claridad", description: "Recurso positivo para jugar cartas. Pequena luz, gran papeleo." },
  { id: "estres", kind: "recurso", title: "Estres", description: "Recurso negativo acumulativo. Sube facil, baja con drama." },
  { id: "ruido", kind: "estado", title: "Ruido Mental", description: "Bloqueos temporales que ensucian decisiones." },
  { id: "catarsis", kind: "keyword", title: "Catarsis", description: "Convierte presion interna en limpieza, dano o recuperacion." },
  { id: "cadena", kind: "keyword", title: "Cadena", description: "Bloquea cartas o recursos. No es joyeria, es control con presupuesto." },
  { id: "conciencia", kind: "tipo", title: "Conciencia", description: "Cartas de claridad, limpieza y defensa emocional." },
  { id: "rara", kind: "rareza", title: "Rareza", description: "Indica potencia y estilo visual. El dorado no garantiza estabilidad." },
];
