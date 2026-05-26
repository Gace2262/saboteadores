import type { Card } from "./cards";

export type EvolutionAffinity = "agresiva" | "defensiva" | "caotica" | "racional" | "maldita" | "catartica";

export type EvolutionBranch = {
  id: string;
  cardId: string;
  name: string;
  branch: string;
  requiredLevel: number;
  affinity: EvolutionAffinity;
  effect: string;
  visual: string;
  flavorText: string;
};

export const evolutionBranches: EvolutionBranch[] = [
  {
    id: "casco-fortaleza",
    cardId: "casco-autoestima",
    name: "Fortaleza de Autoestima",
    branch: "defensiva",
    requiredLevel: 3,
    affinity: "defensiva",
    effect: "Rompe cadenas, gana Claridad y reduce proxima Sentencia.",
    visual: "aura luminosa, borde dorado y casco agrietado pero terco",
    flavorText: "La autoestima pidio murallas. Esta vez no eran para esconderse.",
  },
  {
    id: "casco-corona",
    cardId: "casco-autoestima",
    name: "Corona de Autoestima Improbable",
    branch: "despertar",
    requiredLevel: 5,
    affinity: "catartica",
    effect: "Inmunidad parcial a Sentencia, Claridad extra y coro leve.",
    visual: "dorado vivo, particulas blancas y cadenas oxidadas",
    flavorText: "Nadie esperaba dignidad con corona. Por eso funciono.",
  },
  {
    id: "caballeria-productiva",
    cardId: "caballeria-pendientes",
    name: "Estampida Productiva",
    branch: "agresiva",
    requiredLevel: 2,
    affinity: "agresiva",
    effect: "Hace mas dano por cada carta en mano rival.",
    visual: "caballos rojos, polvo oscuro y bordes vibrantes",
    flavorText: "La agenda descubrio los deportes de contacto.",
  },
  {
    id: "caballeria-burnout",
    cardId: "caballeria-pendientes",
    name: "Caballos del Burnout",
    branch: "maldita",
    requiredLevel: 4,
    affinity: "maldita",
    effect: "Mas dano y mas Estres propio.",
    visual: "cascos incandescentes, humo rojo y letras cansadas",
    flavorText: "El cansancio aprendio a galopar con corbata.",
  },
  {
    id: "caballeria-colapso",
    cardId: "caballeria-pendientes",
    name: "Procesion del Colapso",
    branch: "abisal",
    requiredLevel: 5,
    affinity: "caotica",
    effect: "Dano masivo, autodestructivo y espectacularmente mal aconsejado.",
    visual: "caballos negros cruzando una grieta mental",
    flavorText: "No era urgente. Ahora tampoco, pero trae orquesta.",
  },
  {
    id: "grito-opera",
    cardId: "grito-catarsis",
    name: "Opera de Catarsis Absoluta",
    branch: "despertar",
    requiredLevel: 5,
    affinity: "catartica",
    effect: "Convierte todo Estres en dano, limpia Ruido Mental y otorga Claridad maxima.",
    visual: "cadenas explotando, coro completo y particulas blancas",
    flavorText: "El tribunal perdio el control del escenario.",
  },
  {
    id: "productividad-sobrecarga",
    cardId: "productividad-necromante",
    name: "Productividad Necromante: Sobrecarga",
    branch: "corrupcion",
    requiredLevel: 3,
    affinity: "maldita",
    effect: "Roba 2, juega una gratis, gana 5 Estres y puede causar autodano.",
    visual: "brillo abisal, papel quemado y cafe oscuro",
    flavorText: "El burnout aprendio a usar corbata.",
  },
  {
    id: "martillo-interior",
    cardId: "martillo-medianoche",
    name: "El Juez Interior",
    branch: "secreta",
    requiredLevel: 5,
    affinity: "maldita",
    effect: "Las Sentencias hablan mas fuerte y el martillo suena mas grave.",
    visual: "martillo agrietado, cadenas negras y ojo dorado distorsionado",
    flavorText: "El martillo ya no cae. Te reconoce.",
  },
];

export const getEvolutionBranches = (cardId: string) => evolutionBranches.filter((branch) => branch.cardId === cardId);

export const describeEvolvedCard = (card: Card, branch?: EvolutionBranch) => {
  if (!branch) return card.name;
  return `${card.name} -> ${branch.name}`;
};
