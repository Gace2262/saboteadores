export type ExtremeModifierPolarity = "negative" | "positive";

export type ExtremeModifierId =
  | "tribunal-sueno"
  | "culpable-preventa"
  | "ansiedad-megafono"
  | "cadenas-sindicalizadas"
  | "notificaciones-infernales"
  | "caballos-sin-licencia"
  | "excel-apocalipsis"
  | "martillo-bateria"
  | "casco-autoestima"
  | "terapia-bolsillo"
  | "cafe-limites"
  | "respiracion-dramatica"
  | "agenda-quemada"
  | "ironia-terapeutica";

export type ExtremeModifier = {
  id: ExtremeModifierId;
  name: string;
  polarity: ExtremeModifierPolarity;
  effect: string;
  text: string;
};

export const extremeModifiers: ExtremeModifier[] = [
  {
    id: "tribunal-sueno",
    name: "Tribunal con sueno atrasado",
    polarity: "negative",
    effect: "Empiezas con 2 Estres.",
    text: "El juez durmio poco y tu paz pagara la cuenta.",
  },
  {
    id: "culpable-preventa",
    name: "Culpable en preventa",
    polarity: "negative",
    effect: "El primer Martillazo ocurre al 50 de Medidor.",
    text: "Ni has jugado y ya hay sentencia edicion deluxe.",
  },
  {
    id: "ansiedad-megafono",
    name: "Ansiedad con megafono",
    polarity: "negative",
    effect: "Todo Estres ganado aumenta en +1.",
    text: "La preocupacion ahora trae parlantes.",
  },
  {
    id: "cadenas-sindicalizadas",
    name: "Cadenas sindicalizadas",
    polarity: "negative",
    effect: "Los bloqueos duran 1 turno adicional.",
    text: "Las cadenas negociaron beneficios.",
  },
  {
    id: "notificaciones-infernales",
    name: "Notificaciones infernales",
    polarity: "negative",
    effect: "Cada 3 turnos descartas una carta.",
    text: "No era urgente. Por eso grito.",
  },
  {
    id: "caballos-sin-licencia",
    name: "Caballos sin licencia",
    polarity: "negative",
    effect: "Las Estampidas hacen +2 dano.",
    text: "Nadie reviso los frenos del pensamiento.",
  },
  {
    id: "excel-apocalipsis",
    name: "Excel del Apocalipsis",
    polarity: "negative",
    effect: "Las cartas de Culpa reducen +1 Claridad.",
    text: "Tu autoestima fue convertida en tabla dinamica.",
  },
  {
    id: "martillo-bateria",
    name: "Martillo con bateria nueva",
    polarity: "negative",
    effect: "Los efectos hammer_slam hacen +2 dano.",
    text: "El juez actualizo firmware y resentimientos.",
  },
  {
    id: "casco-autoestima",
    name: "Casco de Autoestima",
    polarity: "positive",
    effect: "El primer dano recibido cada combate se reduce en 2.",
    text: "No evita la crisis, pero amortigua el ridiculo.",
  },
  {
    id: "terapia-bolsillo",
    name: "Terapia de bolsillo",
    polarity: "positive",
    effect: "Al inicio de cada combate limpia 1 Ruido Mental.",
    text: "Pequena, portatil y peligrosamente sensata.",
  },
  {
    id: "cafe-limites",
    name: "Cafe con limites",
    polarity: "positive",
    effect: "Una vez por combate, rompe una cadena gratis.",
    text: "Hoy digo que no con espuma.",
  },
  {
    id: "respiracion-dramatica",
    name: "Respiracion dramatica",
    polarity: "positive",
    effect: "Al llegar a 7 Estres, recuperas 2 Claridad.",
    text: "Inhalar, exhalar, demandar al cerebro.",
  },
  {
    id: "agenda-quemada",
    name: "Agenda quemada",
    polarity: "positive",
    effect: "Las cartas de Pendiente toxico no suben Estres.",
    text: "El fuego tambien organiza.",
  },
  {
    id: "ironia-terapeutica",
    name: "Ironia terapeutica",
    polarity: "positive",
    effect: "Las cartas con Ironia tienen 50% de evitar su efecto negativo.",
    text: "El sarcasmo por fin pago arriendo.",
  },
];

export const negativeExtremeModifiers = extremeModifiers.filter((modifier) => modifier.polarity === "negative");
export const positiveExtremeModifiers = extremeModifiers.filter((modifier) => modifier.polarity === "positive");

export type ExtremeDifficultyId = "crisis-elegante" | "martillo-serio" | "tribunal-desastre" | "juicio-sin-anestesia";

export type ExtremeDifficulty = {
  id: ExtremeDifficultyId;
  name: string;
  enemyWillBonus: number;
  meterRate: number;
  eventDamageBonus: number;
  aiDifficulty: "crisis" | "juicio" | "tribunal-extremo";
  rewardMultiplier: number;
  text: string;
};

export const extremeDifficulties: Record<ExtremeDifficultyId, ExtremeDifficulty> = {
  "crisis-elegante": {
    id: "crisis-elegante",
    name: "Crisis elegante",
    enemyWillBonus: 4,
    meterRate: 0.85,
    eventDamageBonus: 0,
    aiDifficulty: "crisis",
    rewardMultiplier: 1,
    text: "El desastre usa traje y todavia pide permiso.",
  },
  "martillo-serio": {
    id: "martillo-serio",
    name: "Martillo serio",
    enemyWillBonus: 8,
    meterRate: 1,
    eventDamageBonus: 1,
    aiDifficulty: "juicio",
    rewardMultiplier: 1.25,
    text: "El tribunal dejo de bromear, lo cual es una pesima noticia.",
  },
  "tribunal-desastre": {
    id: "tribunal-desastre",
    name: "Tribunal del desastre",
    enemyWillBonus: 12,
    meterRate: 1.25,
    eventDamageBonus: 2,
    aiDifficulty: "juicio",
    rewardMultiplier: 1.5,
    text: "La sala arde, pero al menos tiene excelente acustica.",
  },
  "juicio-sin-anestesia": {
    id: "juicio-sin-anestesia",
    name: "Juicio sin anestesia",
    enemyWillBonus: 18,
    meterRate: 1.6,
    eventDamageBonus: 3,
    aiDifficulty: "tribunal-extremo",
    rewardMultiplier: 2,
    text: "No recomendado para autoestima sin armadura.",
  },
};
