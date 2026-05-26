import type { FactionId } from "@/data/factions";

export type MusicLayerId = "base" | "percussion" | "choir" | "guitars" | "judicial" | "distortion";

export type MusicThemeId =
  | "tribunal-craneo"
  | "circo-pendientes"
  | "catedral-casi"
  | "torre-alarmas"
  | "bunker-excel"
  | "teatro-pobre-mi"
  | "sala-espera"
  | "home-ambient";

export type MusicTrack = {
  id: MusicThemeId;
  name: string;
  use: string;
  style: string[];
  bpm: number;
  rootFrequency: number;
  route: string;
  bossFaction?: FactionId;
};

export const musicLayers: Record<MusicLayerId, string> = {
  base: "Piano oscuro y ambiente suave.",
  percussion: "Percusion pesada y latidos tacticos.",
  choir: "Coros teatrales con olor a juicio apocaliptico.",
  guitars: "Guitarras rapidas de guerra mental.",
  judicial: "Organo, campanas, cadenas y martillo sincronizado.",
  distortion: "Ruido mental, glitches y respiraciones rotas.",
};

export const musicTracks: Record<MusicThemeId, MusicTrack> = {
  "tribunal-craneo": {
    id: "tribunal-craneo",
    name: "Tribunal del Craneo",
    use: "Combate contra El Juez",
    style: ["organo oscuro", "coros latinos", "percusion pesada", "cadenas metalicas", "power metal sinfonico"],
    bpm: 92,
    rootFrequency: 55,
    route: "/music/tribunal-del-craneo.ogg",
    bossFaction: "juez",
  },
  "circo-pendientes": {
    id: "circo-pendientes",
    name: "Circo de Pendientes",
    use: "Combate contra Inquieto",
    style: ["violines rapidos", "bateria acelerada", "risas distorsionadas", "ritmo caotico"],
    bpm: 148,
    rootFrequency: 82,
    route: "/music/circo-de-pendientes.ogg",
    bossFaction: "inquieto",
  },
  "catedral-casi": {
    id: "catedral-casi",
    name: "Catedral del Casi",
    use: "Combate contra Perfeccionista",
    style: ["piano dramatico", "coro triste", "cuerdas tensas", "reloj mecanico"],
    bpm: 74,
    rootFrequency: 65,
    route: "/music/catedral-del-casi.ogg",
    bossFaction: "perfeccionista",
  },
  "torre-alarmas": {
    id: "torre-alarmas",
    name: "Torre de Alarmas",
    use: "Combate contra Hipervigilante",
    style: ["pulsos electronicos", "respiraciones", "percusion militar", "sirenas lejanas"],
    bpm: 128,
    rootFrequency: 92,
    route: "/music/torre-de-alarmas.ogg",
    bossFaction: "hipervigilante",
  },
  "bunker-excel": {
    id: "bunker-excel",
    name: "Bunker de Excel",
    use: "Combate contra Hiperracional",
    style: ["sintetizadores frios", "glitches", "ritmo matematico", "pulsos minimalistas"],
    bpm: 104,
    rootFrequency: 73,
    route: "/music/bunker-de-excel.ogg",
    bossFaction: "hiperracional",
  },
  "teatro-pobre-mi": {
    id: "teatro-pobre-mi",
    name: "Teatro del Pobre de Mi",
    use: "Combate contra Victima",
    style: ["violin melancolico", "aplausos lejanos", "lluvia", "coro dramatico exagerado"],
    bpm: 68,
    rootFrequency: 58,
    route: "/music/teatro-del-pobre-de-mi.ogg",
    bossFaction: "victima",
  },
  "sala-espera": {
    id: "sala-espera",
    name: "Sala de Espera Eterna",
    use: "Combate contra Evitador",
    style: ["musica suspendida", "notas lentas", "eco", "reloj ralentizado"],
    bpm: 54,
    rootFrequency: 49,
    route: "/music/sala-de-espera-eterna.ogg",
    bossFaction: "evitador",
  },
  "home-ambient": {
    id: "home-ambient",
    name: "Habitantes Invisibles",
    use: "Pantallas generales",
    style: ["niebla mental", "piano minimo", "particulas sonoras", "susurros lejanos"],
    bpm: 64,
    rootFrequency: 62,
    route: "/music/habitantes-invisibles.ogg",
  },
};

export const themeByFaction = (faction?: FactionId): MusicThemeId => {
  const match = Object.values(musicTracks).find((track) => track.bossFaction === faction);
  return match?.id ?? "home-ambient";
};
