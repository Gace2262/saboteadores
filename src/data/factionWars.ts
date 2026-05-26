import type { WorldRegionId } from "./worldRegions";

export type ReputationId = "tribunal" | "catarsis" | "saboteadores" | "conciencia";

export type FactionWar = {
  id: string;
  faction: string;
  influence: number;
  occupiedRegions: WorldRegionId[];
  activeEvents: string[];
  leader: string;
  status: string;
};

export const factionWars: FactionWar[] = [
  {
    id: "juez-domina",
    faction: "El Juez domina",
    influence: 76,
    occupiedRegions: ["tribunal-craneo", "catedral-culpa", "arena-colapso"],
    activeEvents: ["Silencio Judicial", "Semana de la Culpa"],
    leader: "El Juez Supremo",
    status: "El martillo pidio expansion territorial y la autoestima presento recurso.",
  },
  {
    id: "catarsis-resiste",
    faction: "Catarsis resiste",
    influence: 42,
    occupiedRegions: ["jardines-catarsis", "fosas-silencio"],
    activeEvents: ["Rebelion de Catarsis"],
    leader: "La Claridad",
    status: "Pocas tropas, mucha luz y una sospechosa falta de obediencia.",
  },
  {
    id: "perfeccionista-invade",
    faction: "Perfeccionista invade regiones",
    influence: 58,
    occupiedRegions: ["vacio-casi", "catedral-culpa"],
    activeEvents: ["Auditoria del Alma"],
    leader: "El Perfeccionista Ascendido",
    status: "No conquista territorios: los corrige hasta que piden perdon.",
  },
  {
    id: "inquieto-caos",
    faction: "Inquieto genera caos",
    influence: 64,
    occupiedRegions: ["estacion-estres", "mar-pensamientos", "archivo-burnout"],
    activeEvents: ["Festival del Burnout", "Caballos invisibles"],
    leader: "Caballeria del Burnout",
    status: "Se movio tanto que la estrategia tuvo que alcanzarlo en taxi.",
  },
  {
    id: "evitador-abandona",
    faction: "Evitador abandona zonas",
    influence: 31,
    occupiedRegions: ["ruinas-autoengano", "fosas-silencio"],
    activeEvents: ["Silencio total"],
    leader: "El Pasillo Cerrado",
    status: "No retiro tropas. Las dejo para manana con intencion emocional.",
  },
];

export const defaultReputations: Record<ReputationId, number> = {
  tribunal: 35,
  catarsis: 28,
  saboteadores: 25,
  conciencia: 32,
};
