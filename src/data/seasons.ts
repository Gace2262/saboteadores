import type { MentalClimate, WorldRegionId } from "./worldRegions";

export type SeasonId = "martillo-despierta" | "rebelion-cartas" | "fatiga-tribunal";

export type WorldSeason = {
  id: SeasonId;
  name: string;
  subtitle: string;
  description: string;
  globalClimate: MentalClimate;
  effects: string[];
  affectedRegions: WorldRegionId[];
  dialogueShift: string;
  visual: string;
};

export const seasons: WorldSeason[] = [
  {
    id: "martillo-despierta",
    name: "El Martillo Despierta",
    subtitle: "El Tribunal vuelve a exigir silencio con volumen excesivo.",
    description: "Mas eventos judiciales, bosses agresivos, cadenas visibles y soundtrack mas oscuro.",
    globalClimate: "juicio",
    effects: ["Eventos judiciales +25%", "Bosses priorizan Sentencia", "Cadenas visuales en regiones ocupadas"],
    affectedRegions: ["tribunal-craneo", "catedral-culpa", "arena-colapso"],
    dialogueShift: "El narrador habla como si cada frase necesitara sello.",
    visual: "oro viejo, sombras largas y martillos suspendidos",
  },
  {
    id: "rebelion-cartas",
    name: "La Rebelion de las Cartas",
    subtitle: "El mazo recuerda que no nacio para obedecer.",
    description: "Las cartas hablan mas, los awakenings son mas frecuentes y la corrupcion se vuelve menos estable.",
    globalClimate: "catarsis",
    effects: ["Ecos mentales +40%", "Despertares acelerados", "Eventos positivos de Catarsis"],
    affectedRegions: ["jardines-catarsis", "fosas-silencio", "arena-colapso"],
    dialogueShift: "Las cartas interrumpen con dignidad teatral y cero paciencia.",
    visual: "luz blanca, grietas doradas y cadenas cayendo",
  },
  {
    id: "fatiga-tribunal",
    name: "Fatiga del Tribunal",
    subtitle: "Incluso la condena necesita una silla.",
    description: "Niebla gris, dialogos cansados, bosses debilitados y mas eventos melancolicos.",
    globalClimate: "agotamiento",
    effects: ["Bosses -10% agresividad", "Niebla gris global", "Eventos de descanso aparecen mas"],
    affectedRegions: ["archivo-burnout", "estacion-estres", "ruinas-autoengano"],
    dialogueShift: "El narrador suena como si hubiera archivado demasiadas crisis.",
    visual: "gris humo, papeles lentos y luces cansadas",
  },
];

export const getSeason = (id?: string) => seasons.find((season) => season.id === id) ?? seasons[0];
