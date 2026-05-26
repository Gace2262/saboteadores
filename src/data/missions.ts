import type { PackId } from "./packs";

export type MissionCategory = "diaria" | "semanal" | "epica" | "secreta" | "juicio-extremo";

export type MissionReward =
  | { type: "fragmentos"; amount: number; label: string }
  | { type: "sobre"; packId: PackId; label: string }
  | { type: "cosmetico"; cosmeticId: string; label: string }
  | { type: "titulo"; titleId: string; label: string }
  | { type: "carta"; cardId: string; label: string };

export type MissionDefinition = {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: MissionReward;
  icon: string;
  flavorText: string;
  category: MissionCategory;
  statKey: string;
};

export const dailyMissions: MissionDefinition[] = [
  {
    id: "daily-control-danos",
    title: "Control de danos",
    description: "Bloquear 5 cartas enemigas.",
    progress: 0,
    target: 5,
    reward: { type: "fragmentos", amount: 100, label: "100 Fragmentos" },
    icon: "chains",
    flavorText: "El caos pidio permiso para existir. Negado.",
    category: "diaria",
    statKey: "cardsBlocked",
  },
  {
    id: "daily-ansiedad-aerobica",
    title: "Ansiedad aerobica",
    description: "Llegar a 10 Estres y sobrevivir.",
    progress: 0,
    target: 10,
    reward: { type: "sobre", packId: "crisis-premium", label: "Sobre de Crisis" },
    icon: "pulse",
    flavorText: "Tu sistema nervioso rompio records.",
    category: "diaria",
    statKey: "maxStressSurvived",
  },
  {
    id: "daily-martillazos-abrazos",
    title: "Martillazos y abrazos",
    description: "Usar cartas de El Juez y Conciencia en la misma partida.",
    progress: 0,
    target: 1,
    reward: { type: "cosmetico", cosmeticId: "sello-dual", label: "Sello dual" },
    icon: "gavel",
    flavorText: "Trauma y crecimiento compartiendo ascensor.",
    category: "diaria",
    statKey: "judgeAndConscienceGames",
  },
  {
    id: "daily-caballos-apocalipsis",
    title: "Caballos del apocalipsis administrativo",
    description: "Activar Estampida 3 veces.",
    progress: 0,
    target: 3,
    reward: { type: "fragmentos", amount: 80, label: "80 Fragmentos" },
    icon: "stampede",
    flavorText: "La agenda aprendio a galopar otra vez.",
    category: "diaria",
    statKey: "stampedesActivated",
  },
  {
    id: "daily-no-me-pasa-nada",
    title: "No me pasa nada",
    description: "Ganar usando Reservado o Evitador.",
    progress: 0,
    target: 1,
    reward: { type: "titulo", titleId: "casi-suficiente", label: "Titulo comun" },
    icon: "mask",
    flavorText: "Las emociones quedaron en visto.",
    category: "diaria",
    statKey: "reservedOrAvoiderWins",
  },
];

export const epicMissions: MissionDefinition[] = [
  {
    id: "epic-audiencia-infinita",
    title: "Audiencia infinita",
    description: "Jugar 25 partidas.",
    progress: 0,
    target: 25,
    reward: { type: "cosmetico", cosmeticId: "fondo-tribunal-nocturno", label: "Fondo Tribunal Nocturno" },
    icon: "court",
    flavorText: "El expediente ya pidio silla ergonomica.",
    category: "epica",
    statKey: "gamesPlayed",
  },
  {
    id: "extreme-fiscalia-pesadilla",
    title: "Fiscalia de la pesadilla",
    description: "Completar Juicio Extremo.",
    progress: 0,
    target: 1,
    reward: { type: "titulo", titleId: "libre-bajo-protesta", label: "Titulo legendario" },
    icon: "judgment",
    flavorText: "La noche firmo una absolucion con mala letra.",
    category: "juicio-extremo",
    statKey: "extremeWins",
  },
];

export const secretMissions: MissionDefinition[] = [
  {
    id: "secret-juez-pestaneo",
    title: "El Juez pestaneo",
    description: "Derrotar a El Juez sin recibir Sentencia.",
    progress: 0,
    target: 1,
    reward: { type: "titulo", titleId: "dejo-obedecer", label: "Titulo secreto" },
    icon: "judgment",
    flavorText: "El martillo tuvo una duda y eso basto.",
    category: "secreta",
    statKey: "judgeNoSentenceWins",
  },
  {
    id: "secret-no-era-para-tanto",
    title: "No era para tanto",
    description: "Reducir 15 Estres en un turno.",
    progress: 0,
    target: 1,
    reward: { type: "cosmetico", cosmeticId: "sello-respiracion-negra", label: "Sello raro" },
    icon: "burst",
    flavorText: "La crisis pidio reembolso.",
    category: "secreta",
    statKey: "bigStressDrops",
  },
  {
    id: "secret-silencio-grito",
    title: "El silencio grito",
    description: "Ganar usando solo cartas Reservado.",
    progress: 0,
    target: 1,
    reward: { type: "titulo", titleId: "audiencia-termino", label: "Titulo secreto" },
    icon: "mask",
    flavorText: "El bunker abrio la boca y se cayeron tres paredes.",
    category: "secreta",
    statKey: "reservedOnlyWins",
  },
  {
    id: "secret-cadena-alimenticia",
    title: "Cadena alimenticia emocional",
    description: "Aplicar 30 bloqueos en una campana.",
    progress: 0,
    target: 30,
    reward: { type: "titulo", titleId: "error-sistema-emocional", label: "Titulo secreto" },
    icon: "chains",
    flavorText: "La culpa descubrio que tambien podia ser bloqueada.",
    category: "secreta",
    statKey: "campaignBlocks",
  },
];

export const allMissionDefinitions = [...dailyMissions, ...epicMissions, ...secretMissions];
