import type { BossId } from "@/data/bosses";

export type StoryChapterId =
  | "prologo"
  | "controlador"
  | "perfeccionista"
  | "hipervigilante"
  | "inquieto"
  | "victima"
  | "evitador"
  | "hiperracional"
  | "complaciente"
  | "reservado"
  | "juez"
  | "epilogo";

export type StoryChapter = {
  id: StoryChapterId;
  order: number;
  title: string;
  room: string;
  bossId?: BossId;
  theme: string;
  intro: string;
  entryLine: string;
  victoryLine: string;
  loreUnlockId: string;
};

export const storyChapters: StoryChapter[] = [
  {
    id: "prologo",
    order: 0,
    title: "Prologo: La primera grieta",
    room: "Sala negra del martillo suspendido",
    theme: "La mente abre juicio contra si misma.",
    intro: "No entraste a tu mente. Te citaron.",
    entryLine: "Un martillo cuelga del cielo como si el cielo tambien tuviera expediente.",
    victoryLine: "La primera grieta no rompe la mente. Rompe la orden de obedecerla.",
    loreUnlockId: "origen-saboteadores",
  },
  {
    id: "controlador",
    order: 1,
    title: "Capitulo 1: Oficina del Control Absoluto",
    room: "Oficina del Control Absoluto",
    bossId: "controlador",
    theme: "La necesidad de controlar todo para evitar dolor.",
    intro: "Caos es solo una palabra elegante para decir incompetencia.",
    entryLine: "Cada cajon tiene etiqueta. Incluso el panico esta archivado por prioridad.",
    victoryLine: "El Controlador no desaparece. Aprende que un plan tambien puede incluir respirar.",
    loreUnlockId: "infancia-fortaleza",
  },
  {
    id: "perfeccionista",
    order: 2,
    title: "Capitulo 2: Catedral del Casi",
    room: "Catedral del Casi",
    bossId: "perfeccionista",
    theme: "La exigencia imposible.",
    intro: "Si no es perfecto, al menos puede servir como evidencia.",
    entryLine: "El marmol esta limpio. La culpa, pulida. El error, iluminado con foco teatral.",
    victoryLine: "Lo imperfecto queda en pie. Que escandalo tan humano.",
    loreUnlockId: "guardian-carcelero",
  },
  {
    id: "hipervigilante",
    order: 3,
    title: "Capitulo 3: Torre de las Alarmas",
    room: "Torre de las Alarmas",
    bossId: "hipervigilante",
    theme: "El miedo anticipatorio.",
    intro: "La calma acaba de moverse. Sospechoso.",
    entryLine: "Hay sirenas para amenazas reales, imaginarias y para la posibilidad de haber olvidado una sirena.",
    victoryLine: "La alarma no era enemiga. Solo estaba sin supervisor desde hace anos.",
    loreUnlockId: "ruido-mental",
  },
  {
    id: "inquieto",
    order: 4,
    title: "Capitulo 4: Circo de Pendientes",
    room: "Circo de Pendientes",
    bossId: "inquieto",
    theme: "La evasion mediante movimiento constante.",
    intro: "Siguiente crisis! Esta ya perdio brillo.",
    entryLine: "La carpa galopa, los malabares gritan y alguien vendio entradas para tu agenda.",
    victoryLine: "No todo lo urgente merecia caballeria. Algunas cosas solo querian nombre.",
    loreUnlockId: "claridad",
  },
  {
    id: "victima",
    order: 5,
    title: "Capitulo 5: Teatro del Pobre de Mi",
    room: "Teatro del Pobre de Mi",
    bossId: "victima",
    theme: "El dolor convertido en identidad.",
    intro: "No quiero aplausos. Pero que sean de pie.",
    entryLine: "El telon sube. La herida lleva maquillaje, monologo y un violin con contrato indefinido.",
    victoryLine: "Tu dolor sigue siendo real. Ya no necesita dirigir toda la obra.",
    loreUnlockId: "cadenas-culpa",
  },
  {
    id: "evitador",
    order: 6,
    title: "Capitulo 6: Sala de Espera Eterna",
    room: "Sala de Espera Eterna",
    bossId: "evitador",
    theme: "La postergacion emocional.",
    intro: "Hoy no. Manana tampoco, pero con intencion.",
    entryLine: "Las sillas suspiran. Las puertas estan cerradas desde dentro. La valentia saco numero.",
    victoryLine: "Una puerta abierta no exige heroismo. A veces exige solo dejar de fingir que no existe.",
    loreUnlockId: "voluntad",
  },
  {
    id: "hiperracional",
    order: 7,
    title: "Capitulo 7: Archivo Frio del Cerebro",
    room: "Archivo Frio del Cerebro",
    bossId: "hiperracional",
    theme: "La desconexion emocional por exceso de analisis.",
    intro: "Tu tristeza fue rechazada por falta de bibliografia.",
    entryLine: "Cada sentimiento tiene grafico. Ninguno tiene permiso para llorar sin pie de pagina.",
    victoryLine: "El dato no murio. Solo dejo de usarse como mordaza.",
    loreUnlockId: "catarsis",
  },
  {
    id: "complaciente",
    order: 8,
    title: "Capitulo 8: Banquete de Favores",
    room: "Banquete de Favores",
    bossId: "complaciente",
    theme: "La necesidad de agradar y ser querido.",
    intro: "Te servi mi alma. La quieres con culpa o sin culpa?",
    entryLine: "La mesa esta llena de platos, facturas emocionales y sonrisas con letra chica.",
    victoryLine: "Dar amor sin venderse al contado: concepto revolucionario, aparentemente legal.",
    loreUnlockId: "nacimiento-juez",
  },
  {
    id: "reservado",
    order: 9,
    title: "Capitulo 9: Bunker del No Me Pasa Nada",
    room: "Bunker del No Me Pasa Nada",
    bossId: "reservado",
    theme: "El aislamiento emocional.",
    intro: "Estoy abierto al dialogo. Desde una boveda sellada.",
    entryLine: "El silencio tiene paredes gruesas. Desde afuera parece calma. Desde adentro, eco.",
    victoryLine: "Hablar no derrumbo el bunker. Solo abrio una ventana con mala educacion luminosa.",
    loreUnlockId: "tribunal-craneo",
  },
  {
    id: "juez",
    order: 10,
    title: "Final: Tribunal del Craneo",
    room: "Tribunal del Craneo",
    bossId: "juez",
    theme: "La voz interna que condena todo.",
    intro: "Has llegado tarde a tu propia sentencia.",
    entryLine: "El Juez no se levanta. No necesita hacerlo. Todo el tribunal ya esta dentro de su voz.",
    victoryLine: "El martillo cae. Esta vez, no dicta sentencia. Hace silencio.",
    loreUnlockId: "tribunal-craneo",
  },
  {
    id: "epilogo",
    order: 11,
    title: "Epilogo",
    room: "Pasillo de salida provisional",
    theme: "La libertad como practica, no como absolucion.",
    intro: "Salir de la sala no borra el tribunal. Pero cambia quien tiene la llave.",
    entryLine: "Las cadenas no se rompen con fuerza: se oxidan cuando ya no les das obediencia.",
    victoryLine: "Hoy no fuiste absuelto. Fuiste libre.",
    loreUnlockId: "claridad",
  },
];

export const getChapterByBoss = (bossId?: BossId) => storyChapters.find((chapter) => chapter.bossId === bossId);
export const getChapter = (id?: StoryChapterId) => storyChapters.find((chapter) => chapter.id === id);
