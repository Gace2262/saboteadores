import type { ColossalBossId } from "./cinematicBosses";

export type BossTransformationId =
  | "juez-supremo-desacato"
  | "perfeccionista-catedral-viva"
  | "hipervigilante-torre-total"
  | "caballeria-burnout-oficina-roja"
  | "arquitecto-casi"
  | "motor-ansiedad"
  | "martir-profesional"
  | "tribunal-abisal";

export type BossTransformation = {
  id: BossTransformationId;
  bossId?: ColossalBossId;
  name: string;
  trigger: string;
  visual: string;
  mechanic: string;
  quote: string;
  fusion?: string[];
  rarity: "mayor" | "fusion" | "final";
};

export const bossTransformations: BossTransformation[] = [
  {
    id: "juez-supremo-desacato",
    bossId: "juez-supremo",
    name: "Desacato Celestial",
    trigger: "El Juez Supremo cruza 50% de Voluntad.",
    visual: "el martillo desciende, los documentos orbitan y el ojo dorado ocupa el cielo",
    mechanic: "duplica la frecuencia de Sentencias y acelera la destruccion del escenario",
    quote: "El acta ahora respira por ti.",
    rarity: "final",
  },
  {
    id: "perfeccionista-catedral-viva",
    bossId: "perfeccionista-ascendido",
    name: "Catedral Viva",
    trigger: "Pierde 50% de Voluntad.",
    visual: "vitrales imposibles se cierran y las grietas quedan perfectamente simetricas",
    mechanic: "las cartas mal posicionadas reciben castigos de costo",
    quote: "El error fue pequeno. Por eso lo agrande.",
    rarity: "mayor",
  },
  {
    id: "hipervigilante-torre-total",
    bossId: "hipervigilante-omega",
    name: "Torre Total",
    trigger: "El jugador encadena dos ataques.",
    visual: "cientos de ojos mecanicos encienden alarmas circulares",
    mechanic: "prepara contraataques automaticos y trampas permanentes",
    quote: "Gracias por confirmar mis peores escenarios.",
    rarity: "mayor",
  },
  {
    id: "caballeria-burnout-oficina-roja",
    bossId: "caballeria-burnout",
    name: "Oficina Roja",
    trigger: "El Estres llega a 10.",
    visual: "papeles arden como confeti corporativo y caballos espectrales cruzan el escritorio",
    mechanic: "cada oleada aumenta dano y presion psicologica",
    quote: "La productividad pidio horas extra y un exorcismo.",
    rarity: "mayor",
  },
  {
    id: "arquitecto-casi",
    name: "Arquitecto del Casi",
    trigger: "Evento ultra raro: Controlador + Perfeccionista.",
    visual: "planos, compases, cadenas alineadas y marmol con culpa de precision",
    mechanic: "bloquea opciones y castiga cualquier jugada incompleta",
    quote: "Nada esta terminado. Excelente, ya podemos condenarlo.",
    fusion: ["Controlador", "Perfeccionista"],
    rarity: "fusion",
  },
  {
    id: "motor-ansiedad",
    name: "Motor de Ansiedad",
    trigger: "Evento ultra raro: Inquieto + Hipervigilante.",
    visual: "radares sobre caballos veloces, sirenas rojas y polvo electrico",
    mechanic: "multiplica acciones rapidas, trampas y Estres preventivo",
    quote: "No sabemos que pasa. Perfecto: reaccionemos diez veces.",
    fusion: ["Inquieto", "Hipervigilante"],
    rarity: "fusion",
  },
  {
    id: "martir-profesional",
    name: "Martir Profesional",
    trigger: "Evento ultra raro: Victima + Complaciente.",
    visual: "telon empapado, halo roto, contratos afectivos y aplausos incomodos",
    mechanic: "cura, devuelve dano y convierte ayuda en deuda emocional",
    quote: "No quiero molestar, pero ya escribi el discurso de sacrificio.",
    fusion: ["Victima", "Complaciente"],
    rarity: "fusion",
  },
  {
    id: "tribunal-abisal",
    name: "Tribunal Abisal",
    trigger: "Evento ultra raro: El Juez + Corrupcion.",
    visual: "oro podrido, cadenas negras y sellos judiciales escritos con estatico",
    mechanic: "mezcla Sentencia, corrupcion acelerada y martillazos aleatorios",
    quote: "La justicia interna ya no distingue entre orden y hambre.",
    fusion: ["El Juez", "Corrupcion"],
    rarity: "final",
  },
];

export const getBossTransformations = (bossId?: ColossalBossId) =>
  bossTransformations.filter((item) => !bossId || item.bossId === bossId || item.rarity === "fusion");
