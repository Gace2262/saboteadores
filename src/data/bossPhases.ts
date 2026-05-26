import type { ColossalBossId } from "./cinematicBosses";

export type ColossalBossPhase = {
  id: string;
  bossId: ColossalBossId;
  order: number;
  name: string;
  mechanic: string;
  visual: string;
  quote: string;
  environmentDamage: number;
};

export const bossPhases: ColossalBossPhase[] = [
  {
    id: "audiencia-inicial",
    bossId: "juez-supremo",
    order: 1,
    name: "Audiencia Inicial",
    mechanic: "Sentencias, bloqueo y reduccion de Claridad.",
    visual: "sellos dorados y cadenas ceremoniales",
    quote: "Que conste en acta: aun respiras.",
    environmentDamage: 18,
  },
  {
    id: "archivo-errores",
    bossId: "juez-supremo",
    order: 2,
    name: "Archivo de Errores",
    mechanic: "Reutiliza descartes y copia cartas favoritas.",
    visual: "documentos flotando, frases distorsionadas y recuerdos en tinta negra",
    quote: "Tus patrones son evidencia suficiente.",
    environmentDamage: 38,
  },
  {
    id: "martillo-absoluto",
    bossId: "juez-supremo",
    order: 3,
    name: "Martillo Absoluto",
    mechanic: "Eventos de Juicio permanentes, dano masivo y corrupcion acelerada.",
    visual: "escenario roto, cadenas gigantes y lluvia de sellos judiciales",
    quote: "MARTILLO ABSOLUTO ACTIVADO.",
    environmentDamage: 72,
  },
  {
    id: "silencio-tribunal",
    bossId: "juez-supremo",
    order: 4,
    name: "Silencio del Tribunal",
    mechanic: "La ultima objecion decide el final.",
    visual: "todo queda blanco, audio amortiguado, respiraciones y cadenas lejanas",
    quote: "El tribunal espera tu ultima objecion.",
    environmentDamage: 100,
  },
  {
    id: "simetria-hostil",
    bossId: "perfeccionista-ascendido",
    order: 1,
    name: "Simetria Hostil",
    mechanic: "Castiga cartas de bajo costo y posiciones imperfectas.",
    visual: "vitrales alineados y grietas geometricas",
    quote: "Tu error sobrevivio demasiado tiempo.",
    environmentDamage: 28,
  },
  {
    id: "alarma-total",
    bossId: "hipervigilante-omega",
    order: 1,
    name: "Alarma Total",
    mechanic: "Predice movimientos, activa trampas permanentes y contraataca.",
    visual: "radares rojos, ojos mecanicos y sirenas circulares",
    quote: "El peligro acaba de actualizarse.",
    environmentDamage: 46,
  },
  {
    id: "oficina-en-llamas",
    bossId: "caballeria-burnout",
    order: 1,
    name: "Oficina en Llamas",
    mechanic: "Ataques rapidos, Estres masivo y estampidas continuas.",
    visual: "papeles ardiendo, cielo rojo y caballos espectrales",
    quote: "La productividad encontro drogas nuevas.",
    environmentDamage: 54,
  },
];

export const getBossPhases = (bossId: ColossalBossId) => bossPhases.filter((phase) => phase.bossId === bossId).sort((a, b) => a.order - b.order);
export const getBossPhase = (phaseId?: string) => bossPhases.find((phase) => phase.id === phaseId);
