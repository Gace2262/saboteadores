import type { BossId } from "./bosses";

export type CampaignNodeType =
  | "combate"
  | "evento"
  | "descanso"
  | "tienda"
  | "jefe"
  | "juicio";

export type CampaignNode = {
  id: string;
  type: CampaignNodeType;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  next: string[];
  bossId?: BossId;
  eventId?: string;
};

export const campaignNodes: CampaignNode[] = [
  {
    id: "inicio",
    type: "combate",
    title: "Migraña de apertura",
    subtitle: "El tutorial no avisa, solo palpita.",
    x: 8,
    y: 52,
    next: ["espejo", "controlador"],
  },
  {
    id: "espejo",
    type: "evento",
    title: "Espejo incomodo",
    subtitle: "Te mira con demasiada informacion.",
    x: 21,
    y: 28,
    next: ["descanso-1"],
    eventId: "espejo-incomodo",
  },
  {
    id: "controlador",
    type: "jefe",
    title: "Oficina del Control Absoluto",
    subtitle: "Todo esta etiquetado. Incluso tu error.",
    x: 23,
    y: 68,
    next: ["tienda-1"],
    bossId: "controlador",
  },
  {
    id: "descanso-1",
    type: "descanso",
    title: "Banco de respiracion dudosa",
    subtitle: "Descansar sin optimizarlo. Escandaloso.",
    x: 37,
    y: 24,
    next: ["hiperracional"],
  },
  {
    id: "tienda-1",
    type: "tienda",
    title: "Tienda de claridad",
    subtitle: "Se aceptan fragmentos y dignidad suelta.",
    x: 39,
    y: 72,
    next: ["inquieto"],
  },
  {
    id: "hiperracional",
    type: "jefe",
    title: "Archivo Frio del Cerebro",
    subtitle: "Sentir requiere formulario.",
    x: 53,
    y: 32,
    next: ["evento-ansiedad"],
    bossId: "hiperracional",
  },
  {
    id: "inquieto",
    type: "jefe",
    title: "Circo de Pendientes",
    subtitle: "La carpa arde con productividad.",
    x: 55,
    y: 68,
    next: ["evento-ansiedad"],
    bossId: "inquieto",
  },
  {
    id: "evento-ansiedad",
    type: "evento",
    title: "Cafe con la ansiedad",
    subtitle: "La taza tiembla antes que tu.",
    x: 68,
    y: 50,
    next: ["perfeccionista", "reservado"],
    eventId: "cafe-ansiedad",
  },
  {
    id: "perfeccionista",
    type: "jefe",
    title: "Catedral del Casi",
    subtitle: "La perfeccion canta fuera de tono.",
    x: 79,
    y: 18,
    next: ["hipervigilante"],
    bossId: "perfeccionista",
  },
  {
    id: "hipervigilante",
    type: "jefe",
    title: "Torre de las Alarmas",
    subtitle: "La calma hizo ruido. Sospechoso.",
    x: 88,
    y: 28,
    next: ["victima"],
    bossId: "hipervigilante",
  },
  {
    id: "victima",
    type: "jefe",
    title: "Teatro del Pobre de Mi",
    subtitle: "El dolor alquilo escenario y pidio luces.",
    x: 91,
    y: 42,
    next: ["complaciente"],
    bossId: "victima",
  },
  {
    id: "reservado",
    type: "jefe",
    title: "Bunker del No Me Pasa Nada",
    subtitle: "Todo normal. Excepto el techo.",
    x: 80,
    y: 82,
    next: ["evitador"],
    bossId: "reservado",
  },
  {
    id: "evitador",
    type: "jefe",
    title: "Sala de Espera Eterna",
    subtitle: "La valentia saco numero y aun no la llaman.",
    x: 88,
    y: 72,
    next: ["complaciente"],
    bossId: "evitador",
  },
  {
    id: "complaciente",
    type: "jefe",
    title: "Banquete de Favores",
    subtitle: "Todo viene servido con deuda afectiva.",
    x: 92,
    y: 58,
    next: ["juez"],
    bossId: "complaciente",
  },
  {
    id: "juez",
    type: "juicio",
    title: "Tribunal del Craneo",
    subtitle: "El martillo ya sabe tu nombre.",
    x: 97,
    y: 50,
    next: [],
    bossId: "juez",
  },
];

export const getCampaignNode = (id?: string) => campaignNodes.find((node) => node.id === id);
