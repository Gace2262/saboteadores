export type WorldRegionId =
  | "tribunal-craneo"
  | "mar-pensamientos"
  | "ruinas-autoengano"
  | "catedral-culpa"
  | "archivo-burnout"
  | "jardines-catarsis"
  | "vacio-casi"
  | "estacion-estres"
  | "fosas-silencio"
  | "arena-colapso";

export type MentalClimate = "juicio" | "caos" | "agotamiento" | "claridad" | "corrupcion" | "catarsis";

export type WorldRegion = {
  id: WorldRegionId;
  name: string;
  subtitle: string;
  description: string;
  dominantClimate: MentalClimate;
  danger: number;
  unlockRequirement: string;
  connectedTo: WorldRegionId[];
  anomalies: string[];
  rewards: string[];
  factionPressure: string[];
  x: number;
  y: number;
};

export const worldRegions: WorldRegion[] = [
  {
    id: "tribunal-craneo",
    name: "Tribunal del Craneo",
    subtitle: "Centro del poder judicial mental",
    description: "La sala donde El Juez firma decretos contra pensamientos que todavia no terminaron de nacer.",
    dominantClimate: "juicio",
    danger: 88,
    unlockRequirement: "Disponible desde el inicio.",
    connectedTo: ["catedral-culpa", "archivo-burnout", "arena-colapso"],
    anomalies: ["Coros judiciales", "Lluvia de documentos", "Martillazo de protocolo"],
    rewards: ["Fragmento del Martillo", "Entrada al Juicio Extremo"],
    factionPressure: ["El Juez", "Controlador"],
    x: 51,
    y: 45,
  },
  {
    id: "mar-pensamientos",
    name: "Mar de Pensamientos Intrusivos",
    subtitle: "Oceano oscuro lleno de voces",
    description: "Una masa de ideas no invitadas golpea la costa como si tuviera agenda y poca educacion.",
    dominantClimate: "caos",
    danger: 62,
    unlockRequirement: "Ganar 2 combates o abrir un Sobre de Pensamientos Intrusivos.",
    connectedTo: ["ruinas-autoengano", "estacion-estres"],
    anomalies: ["Cartas duplicadas", "Caballos invisibles"],
    rewards: ["Reliquia menor", "Cartas Ironia"],
    factionPressure: ["Inquieto", "Hipervigilante"],
    x: 18,
    y: 28,
  },
  {
    id: "ruinas-autoengano",
    name: "Ruinas del Autoengano",
    subtitle: "Ciudad destruida por negacion emocional",
    description: "Las fachadas siguen en pie. Los cimientos firmaron una renuncia hace anos.",
    dominantClimate: "corrupcion",
    danger: 70,
    unlockRequirement: "Completar un evento mental evasivo.",
    connectedTo: ["mar-pensamientos", "fosas-silencio"],
    anomalies: ["Distorsion de memoria", "Puertas que niegan existir"],
    rewards: ["Mascara del Silencio", "Carta maldita ocasional"],
    factionPressure: ["Evitador", "Reservado"],
    x: 16,
    y: 66,
  },
  {
    id: "catedral-culpa",
    name: "Catedral de la Culpa",
    subtitle: "Templo gigantesco con cadenas vivas",
    description: "Cada vitral representa una disculpa que fue enviada con intereses.",
    dominantClimate: "juicio",
    danger: 74,
    unlockRequirement: "Derrotar a Complaciente o activar 10 Culpa.",
    connectedTo: ["tribunal-craneo", "vacio-casi"],
    anomalies: ["Lluvia de documentos", "Cadenas que cantan bajo"],
    rewards: ["Cadena Domesticada", "Entrada de lore"],
    factionPressure: ["Complaciente", "Victima", "El Juez"],
    x: 34,
    y: 18,
  },
  {
    id: "archivo-burnout",
    name: "Archivo del Burnout",
    subtitle: "Biblioteca infinita de agotamiento",
    description: "Pasillos de carpetas, tareas resucitadas y cafe que mira de vuelta.",
    dominantClimate: "agotamiento",
    danger: 68,
    unlockRequirement: "Sobrevivir con 10 Estres o mas.",
    connectedTo: ["tribunal-craneo", "estacion-estres"],
    anomalies: ["Lluvia de documentos", "Oficinas que se multiplican"],
    rewards: ["Archivo Perdido", "Cafe del Burnout"],
    factionPressure: ["Inquieto", "Hiperracional"],
    x: 72,
    y: 24,
  },
  {
    id: "jardines-catarsis",
    name: "Jardines de Catarsis",
    subtitle: "Zona rara de calma y liberacion",
    description: "Un lugar improbable donde las cadenas se oxidan por falta de obediencia.",
    dominantClimate: "catarsis",
    danger: 22,
    unlockRequirement: "Usar Catarsis o Despertar varias veces.",
    connectedTo: ["fosas-silencio", "arena-colapso"],
    anomalies: ["Silencio total", "Particulas blancas"],
    rewards: ["Llave de Catarsis", "Reputacion con Conciencia"],
    factionPressure: ["Conciencia", "Trascendencia"],
    x: 82,
    y: 70,
  },
  {
    id: "vacio-casi",
    name: "El Vacio del Casi",
    subtitle: "Donde viven errores no superados",
    description: "Un hueco elegante donde el Perfeccionista guarda cosas que salieron bien pero no lo suficiente.",
    dominantClimate: "agotamiento",
    danger: 64,
    unlockRequirement: "Derrotar al Perfeccionista.",
    connectedTo: ["catedral-culpa", "arena-colapso"],
    anomalies: ["Distorsion de memoria", "Reglas milimetricas"],
    rewards: ["Marco del Casi", "Mejora de carta"],
    factionPressure: ["Perfeccionista"],
    x: 46,
    y: 78,
  },
  {
    id: "estacion-estres",
    name: "Estacion del Estres",
    subtitle: "Complejo industrial hiperactivo",
    description: "La maquinaria convierte pendientes en vapor rojo y planes alternativos en sirenas.",
    dominantClimate: "caos",
    danger: 77,
    unlockRequirement: "Activar Estampida o jugar Supervivencia.",
    connectedTo: ["mar-pensamientos", "archivo-burnout"],
    anomalies: ["Caballos invisibles", "Alarmas con contrato"],
    rewards: ["Cafe del Burnout", "Fragmentos de Claridad"],
    factionPressure: ["Inquieto", "Hipervigilante"],
    x: 86,
    y: 42,
  },
  {
    id: "fosas-silencio",
    name: "Las Fosas del Silencio",
    subtitle: "Region del Reservado",
    description: "Un territorio que no dice nada. Lo cual, naturalmente, resulta amenazante.",
    dominantClimate: "claridad",
    danger: 48,
    unlockRequirement: "Ganar usando Reservado o Evitador.",
    connectedTo: ["ruinas-autoengano", "jardines-catarsis"],
    anomalies: ["Silencio total", "Sombras que toman acta"],
    rewards: ["Mascara del Silencio", "Aura silenciosa"],
    factionPressure: ["Reservado", "Evitador"],
    x: 34,
    y: 86,
  },
  {
    id: "arena-colapso",
    name: "La Arena del Colapso",
    subtitle: "Zona final de Juicio Extremo",
    description: "El suelo ya esta roto. Es una decision de diseno y tambien una advertencia.",
    dominantClimate: "corrupcion",
    danger: 96,
    unlockRequirement: "Completar campana y entrar a Juicio Extremo.",
    connectedTo: ["tribunal-craneo", "jardines-catarsis", "vacio-casi"],
    anomalies: ["Coros judiciales", "Cartas duplicadas", "Martillo infinito"],
    rewards: ["Reliquia abisal", "Finales alternativos"],
    factionPressure: ["El Juez", "Corrupcion"],
    x: 63,
    y: 86,
  },
];

export const getWorldRegion = (id?: string) => worldRegions.find((region) => region.id === id) ?? worldRegions[0];
