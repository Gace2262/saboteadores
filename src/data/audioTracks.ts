import type { FactionId } from "./factions";
import type { AdvancedMusicLayerId } from "./musicLayers";

export type AdvancedTrackId = "tribunal-craneo" | "perfeccionista-ascendido" | "hipervigilante-omega" | "caballeria-burnout" | "catarsis-total" | "home-ambient";

export type AdvancedAudioTrack = {
  id: AdvancedTrackId;
  title: string;
  bossFaction?: FactionId;
  style: string;
  bpm: number;
  rootFrequency: number;
  layers: AdvancedMusicLayerId[];
  leitmotif: string;
  mockRoute: string;
};

export const advancedAudioTracks: Record<AdvancedTrackId, AdvancedAudioTrack> = {
  "tribunal-craneo": {
    id: "tribunal-craneo",
    title: "Tribunal del Craneo",
    bossFaction: "juez",
    style: "Organo oscuro, coro judicial, percusion gigante, cadenas y martillazos graves.",
    bpm: 92,
    rootFrequency: 55,
    layers: ["base", "tension", "stress", "choir", "corruption", "climax"],
    leitmotif: "Tres notas descendentes como sentencia.",
    mockRoute: "/music/tribunal-del-craneo.ogg",
  },
  "perfeccionista-ascendido": {
    id: "perfeccionista-ascendido",
    title: "Perfeccionista Ascendido",
    bossFaction: "perfeccionista",
    style: "Reloj mecanico, cuerdas precisas y coro matematico.",
    bpm: 74,
    rootFrequency: 65,
    layers: ["base", "tension", "stress", "choir", "climax"],
    leitmotif: "Arpegio simetrico que se rompe al final.",
    mockRoute: "/music/perfeccionista-ascendido.ogg",
  },
  "hipervigilante-omega": {
    id: "hipervigilante-omega",
    title: "Hipervigilante Omega",
    bossFaction: "hipervigilante",
    style: "Alarmas, tension electronica, percusion nerviosa y respiraciones.",
    bpm: 128,
    rootFrequency: 92,
    layers: ["base", "tension", "stress", "corruption", "climax"],
    leitmotif: "Pulso agudo repetido como alarma que no sabe jubilar.",
    mockRoute: "/music/hipervigilante-omega.ogg",
  },
  "caballeria-burnout": {
    id: "caballeria-burnout",
    bossFaction: "inquieto",
    title: "Caballeria del Burnout",
    style: "Galope, guitarras rapidas, impresoras colapsando y oficina incendiada.",
    bpm: 152,
    rootFrequency: 82,
    layers: ["base", "stress", "choir", "corruption", "climax"],
    leitmotif: "Ritmo de cascos sobre teclado mecanico.",
    mockRoute: "/music/caballeria-burnout.ogg",
  },
  "catarsis-total": {
    id: "catarsis-total",
    title: "Catarsis Total",
    style: "Armonia luminosa, coro ascendente y cadenas cayendo.",
    bpm: 86,
    rootFrequency: 220,
    layers: ["base", "choir", "climax"],
    leitmotif: "Ascenso de quinta abierta con respiracion tranquila.",
    mockRoute: "/music/catarsis-total.ogg",
  },
  "home-ambient": {
    id: "home-ambient",
    title: "Habitantes Invisibles",
    style: "Dark ambient, piano minimo, niebla mental y susurros lejanos.",
    bpm: 64,
    rootFrequency: 62,
    layers: ["base", "tension"],
    leitmotif: "Nota pedal lenta bajo humo judicial.",
    mockRoute: "/music/habitantes-invisibles.ogg",
  },
};
