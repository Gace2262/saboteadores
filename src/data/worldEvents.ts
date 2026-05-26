import type { MentalClimate, WorldRegionId } from "./worldRegions";

export type WorldEventId =
  | "semana-culpa"
  | "colapso-administrativo"
  | "silencio-judicial"
  | "festival-burnout"
  | "rebelion-catarsis"
  | "tribunal-vacio";

export type WorldEvent = {
  id: WorldEventId;
  name: string;
  effect: string;
  flavor: string;
  climate: MentalClimate;
  affectedRegions: WorldRegionId[];
  rarity: "global" | "raro" | "ultra-raro";
};

export const worldEvents: WorldEvent[] = [
  {
    id: "semana-culpa",
    name: "Semana de la Culpa",
    effect: "Todas las cartas Culpa mejoran temporalmente.",
    flavor: "La culpa encontro nuevos templos y los amueblo con recibos.",
    climate: "juicio",
    affectedRegions: ["catedral-culpa", "tribunal-craneo"],
    rarity: "global",
  },
  {
    id: "colapso-administrativo",
    name: "Colapso Administrativo",
    effect: "Los costos aumentan aleatoriamente.",
    flavor: "El formulario del formulario pidio un formulario.",
    climate: "caos",
    affectedRegions: ["tribunal-craneo", "archivo-burnout", "estacion-estres"],
    rarity: "global",
  },
  {
    id: "silencio-judicial",
    name: "Silencio Judicial",
    effect: "Menos dialogos y musica amortiguada.",
    flavor: "El tribunal susurro. Fue peor.",
    climate: "agotamiento",
    affectedRegions: ["fosas-silencio", "tribunal-craneo"],
    rarity: "raro",
  },
  {
    id: "festival-burnout",
    name: "Festival del Burnout",
    effect: "Mas Estres, mas recompensas.",
    flavor: "El burnout abrio otra oficina. Trajo confeti funebre.",
    climate: "agotamiento",
    affectedRegions: ["archivo-burnout", "estacion-estres"],
    rarity: "global",
  },
  {
    id: "rebelion-catarsis",
    name: "Rebelion de Catarsis",
    effect: "Awakenings acelerados y eventos positivos.",
    flavor: "La claridad recupero terreno. El martillo pidio hablar con gerencia.",
    climate: "catarsis",
    affectedRegions: ["jardines-catarsis", "arena-colapso"],
    rarity: "raro",
  },
  {
    id: "tribunal-vacio",
    name: "El Tribunal Vacio",
    effect: "Sin musica, sin particulas, sin narrador. Fondo blanco infinito.",
    flavor: "Nadie vino hoy.",
    climate: "claridad",
    affectedRegions: ["tribunal-craneo"],
    rarity: "ultra-raro",
  },
];

export const globalNarratorLines = [
  "El Tribunal expandio fronteras.",
  "La culpa encontro nuevos templos.",
  "La claridad recupero terreno.",
  "El burnout abrio otra oficina.",
  "Las cadenas cambiaron de dueno.",
  "El archivo universal pidio una pausa y no se la dieron.",
];

export const regionalAnomalies = ["Lluvia de documentos", "Caballos invisibles", "Silencio total", "Distorsion de memoria", "Cartas duplicadas", "Coros judiciales"];

export const getWorldEvent = (id?: string) => worldEvents.find((event) => event.id === id) ?? worldEvents[0];
