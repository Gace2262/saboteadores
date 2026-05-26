import { allCards } from "./cards";

export type DraftEvent = {
  id: string;
  name: string;
  effect: string;
  options: string[];
  narratorLine: string;
};

export const draftPickCount = 30;

export const draftEvents: DraftEvent[] = [
  {
    id: "oferta-sospechosa",
    name: "Oferta Sospechosa",
    effect: "Una carta legendaria maldita aparece con sonrisa de abogado.",
    options: ["Tomar carta legendaria maldita", "Perder Voluntad inicial", "Ganar recompensa extra"],
    narratorLine: "Nada sospechoso trae tantas firmas.",
  },
  {
    id: "tribunal-creativo",
    name: "Tribunal Creativo",
    effect: "Las proximas 3 elecciones son de facciones incompatibles.",
    options: ["Aceptar incompatibilidad", "Pedir orden y fallar", "Reir con miedo"],
    narratorLine: "La coherencia fue rechazada por falta de dramatismo.",
  },
  {
    id: "ansiedad-premium",
    name: "Ansiedad Premium",
    effect: "Empiezas con +3 Estres, pero robas carta extra.",
    options: ["Comprar el colapso deluxe", "Respirar y perder glamour", "Firmar sin leer"],
    narratorLine: "Tu sistema nervioso desbloqueo beneficios VIP.",
  },
];

export const draftPools = {
  common: allCards.filter((card) => card.rarity === "comun"),
  rare: allCards.filter((card) => card.rarity === "rara"),
  epic: allCards.filter((card) => card.rarity === "epica"),
  legendary: allCards.filter((card) => card.rarity === "legendaria"),
  cursed: allCards.filter((card) => card.rarity === "maldita"),
};

export const getDraftOffer = (seed: number) => {
  const pool = allCards.filter((card) => card.collectible);
  return [0, 1, 2].map((offset) => pool[(seed + offset * 7) % pool.length]).filter(Boolean);
};
