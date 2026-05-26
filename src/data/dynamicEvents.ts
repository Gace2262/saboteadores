export type DynamicEventType =
  | "judge_interruption"
  | "boss_invasion"
  | "conscious_card"
  | "menu_corruption"
  | "observing_tribunal"
  | "repetition"
  | "fatigue"
  | "card_argument"
  | "chain_invasion"
  | "spontaneous_catarsis";

export type DynamicEvent = {
  id: string;
  type: DynamicEventType;
  title: string;
  description: string;
  narratorLine: string;
  intensity: number;
  visual: string;
  cooldown: number;
};

export const dynamicEvents: DynamicEvent[] = [
  {
    id: "judge-returned",
    type: "judge_interruption",
    title: "Interrupcion del Juez",
    description: "La pantalla oscurece brevemente y una sentencia lejana entra sin pedir permiso.",
    narratorLine: "Volviste.",
    intensity: 62,
    visual: "humo, cadenas, golpe lejano y distorsion breve",
    cooldown: 4,
  },
  {
    id: "boss-invader-hypervigilant",
    type: "boss_invasion",
    title: "Boss invasor",
    description: "Un Saboteador ajeno invade temporalmente una sala que no le correspondia.",
    narratorLine: "La ansiedad decidio colaborar interdisciplinariamente.",
    intensity: 74,
    visual: "sirenas suaves, sombra lateral y pulso rojo",
    cooldown: 6,
  },
  {
    id: "conscious-card",
    type: "conscious_card",
    title: "Carta consciente",
    description: "Una carta comenta el patron de juego como si hubiera estado tomando notas.",
    narratorLine: "Nos usas cuando ya todo arde.",
    intensity: 44,
    visual: "texto flotante, brillo inestable y eco sutil",
    cooldown: 3,
  },
  {
    id: "menu-corruption",
    type: "menu_corruption",
    title: "Menu corrupto",
    description: "Algunos nombres del menu cambian como mecanismos defensivos mal archivados.",
    narratorLine: "El tribunal tomo nota.",
    intensity: 38,
    visual: "glitch leve, botones respirando y simbolos dorados",
    cooldown: 5,
  },
  {
    id: "tribunal-observing",
    type: "observing_tribunal",
    title: "Tribunal Observando",
    description: "Un ojo gigante transparente aparece y se desvanece con elegante falta de privacidad ficticia.",
    narratorLine: "El tribunal tomo nota.",
    intensity: 50,
    visual: "ojo dorado translucido y niebla lenta",
    cooldown: 7,
  },
  {
    id: "repetition-anomaly",
    type: "repetition",
    title: "Anomalia: Repeticion",
    description: "Un efecto se repite visualmente: doble eco, doble martillo, doble sospecha.",
    narratorLine: "El eco pidio declarar otra vez.",
    intensity: 58,
    visual: "doble sombra y eco visual",
    cooldown: 5,
  },
  {
    id: "tribunal-fatigue",
    type: "fatigue",
    title: "Fatiga del Tribunal",
    description: "El menu parece cansado, las particulas bajan velocidad y el expediente bosteza teatralmente.",
    narratorLine: "Incluso el tribunal necesita dormir.",
    intensity: 36,
    visual: "particulas lentas, tonos apagados y respiracion suave",
    cooldown: 8,
  },
  {
    id: "cards-argue",
    type: "card_argument",
    title: "Cartas discutiendo",
    description: "Dos cartas se contradicen con demasiada personalidad para ser papel tranquilo.",
    narratorLine: "Trabajemos mas. No. Cobarde. Funcional.",
    intensity: 47,
    visual: "globos de dialogo oscuros y chispas violetas",
    cooldown: 4,
  },
  {
    id: "chain-invasion",
    type: "chain_invasion",
    title: "Invasion de cadenas",
    description: "Cadenas cruzan la UI. Nada queda bloqueado de verdad, pero el drama hace su intento.",
    narratorLine: "Las cadenas te reconocen.",
    intensity: 66,
    visual: "cadenas sobre la interfaz y brillo metalico",
    cooldown: 7,
  },
  {
    id: "spontaneous-catarsis",
    type: "spontaneous_catarsis",
    title: "Catarsis espontanea",
    description: "Evento raro positivo: luz blanca, silencio amable y reduccion temporal de corrupcion ambiental.",
    narratorLine: "Algo dentro del tribunal respiro.",
    intensity: 22,
    visual: "particulas blancas, niebla disipandose y pulso dorado",
    cooldown: 9,
  },
];

export const getDynamicEvent = (id?: string) => dynamicEvents.find((event) => event.id === id);
