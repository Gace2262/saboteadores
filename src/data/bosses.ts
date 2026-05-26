import type { FactionId } from "./factions";
import type { VisualEffect } from "./cards";

export type BossId =
  | "controlador"
  | "perfeccionista"
  | "hipervigilante"
  | "inquieto"
  | "victima"
  | "evitador"
  | "hiperracional"
  | "complaciente"
  | "reservado"
  | "juez";

export type BossPhase = {
  name: string;
  mechanic: string;
};

export type Boss = {
  id: BossId;
  faction: FactionId;
  name: string;
  room: string;
  mechanic: string;
  quote: string;
  visualEffect: VisualEffect;
  rewardCardId: string;
  phases?: BossPhase[];
};

export const bosses: Boss[] = [
  {
    id: "controlador",
    faction: "controlador",
    name: "Controlador",
    room: "Oficina del Control Absoluto",
    mechanic: "Bloquea cartas y recursos con procedimientos que nadie pidio.",
    quote: "Relajate. Ya arruine todo segun protocolo.",
    visualEffect: "chains",
    rewardCardId: "controlador-compulsivo",
  },
  {
    id: "perfeccionista",
    faction: "perfeccionista",
    name: "Perfeccionista",
    room: "Catedral del Casi",
    mechanic: "Castiga cartas de bajo costo y cualquier accion que parezca humana.",
    quote: "Quedo precioso. Lastima que existe.",
    visualEffect: "panic_pulse",
    rewardCardId: "funeral-plan-b",
  },
  {
    id: "hipervigilante",
    faction: "hipervigilante",
    name: "Hipervigilante",
    room: "Torre de las Alarmas",
    mechanic: "Activa trampas, contraataques y sirenas internas por si acaso.",
    quote: "No paso nada. Por eso hay que entrar en panico.",
    visualEffect: "panic_pulse",
    rewardCardId: "repeticion-desastre",
  },
  {
    id: "inquieto",
    faction: "inquieto",
    name: "Inquieto",
    room: "Circo de Pendientes",
    mechanic: "Juega multiples cartas, sube Estres y convierte la agenda en estampida.",
    quote: "Dormir es para quienes no tienen pestanas mentales.",
    visualEffect: "horse_stampede",
    rewardCardId: "caballeria-pendientes",
  },
  {
    id: "victima",
    faction: "victima",
    name: "Victima",
    room: "Teatro del Pobre de Mi",
    mechanic: "Devuelve dano, genera culpa y pide violin con factura.",
    quote: "No quiero dramatizar, pero traigan violines y ambulancia.",
    visualEffect: "sarcasm_spark",
    rewardCardId: "payaso-doctorado",
  },
  {
    id: "evitador",
    faction: "evitador",
    name: "Evitador",
    room: "Sala de Espera Eterna",
    mechanic: "Retrasa turnos, congela cartas y evita dano con bostezos tacticos.",
    quote: "Manana enfrentamos esto. Hoy enfrentemos una siesta.",
    visualEffect: "void_laugh",
    rewardCardId: "capa-no-me-pasa-nada",
  },
  {
    id: "hiperracional",
    faction: "hiperracional",
    name: "Hiperracional",
    room: "Archivo Frio del Cerebro",
    mechanic: "Roba, calcula, archiva emociones y anula todo lo que respire.",
    quote: "He demostrado estadisticamente que sentir es ineficiente.",
    visualEffect: "guilt_rain",
    rewardCardId: "excel-culpa",
  },
  {
    id: "complaciente",
    faction: "complaciente",
    name: "Complaciente",
    room: "Banquete de Favores",
    mechanic: "Cura, sacrifica y genera cadenas emocionales con servilleta de gala.",
    quote: "Te di todo. Ahora firma este contrato afectivo.",
    visualEffect: "chains",
    rewardCardId: "cadenas-deber",
  },
  {
    id: "reservado",
    faction: "reservado",
    name: "Reservado",
    room: "Bunker del No Me Pasa Nada",
    mechanic: "Oculta cartas, reduce dano y acumula presion bajo alfombra blindada.",
    quote: "Estoy perfecto. Solo tiembla el edificio interno.",
    visualEffect: "void_laugh",
    rewardCardId: "capa-no-me-pasa-nada",
  },
  {
    id: "juez",
    faction: "juez",
    name: "El Juez",
    room: "Tribunal del Craneo",
    mechanic: "Martillazos, cadenas, sentencias e invocaciones de otros saboteadores.",
    quote: "Orden en la sala. Especialmente en las partes que duelen.",
    visualEffect: "hammer_slam",
    rewardCardId: "martillazo-realidad",
    phases: [
      { name: "Culpable por existir", mechanic: "Dano directo y reduccion de Claridad." },
      { name: "Archivo de errores", mechanic: "Usa descartes del jugador como acusaciones." },
      { name: "Sentencia final", mechanic: "Martillazos masivos, cadenas y estampida de pensamientos." },
    ],
  },
];

export const getBoss = (id?: BossId) => bosses.find((boss) => boss.id === id);
