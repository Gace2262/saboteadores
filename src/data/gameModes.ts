export type GameModeId = "draft" | "survival" | "boss-rush" | "chaos" | "arena" | "co-op" | "mirror" | "mutant";

export type GameModeDefinition = {
  id: GameModeId;
  name: string;
  route: string;
  concept: string;
  description: string;
  difficulty: "Inestable" | "Alta" | "Brutal" | "Experimental" | "Competitiva";
  narratorLine: string;
  visual: string;
  rewards: string[];
  unlocked: boolean;
};

export const gameModes: GameModeDefinition[] = [
  {
    id: "draft",
    name: "Draft Mental",
    route: "/game-modes/draft",
    concept: "Construye un mazo eligiendo cartas aleatorias ofrecidas por el Tribunal.",
    description: "Elige 1 carta entre 3 durante 30 elecciones. Facciones mezcladas, rarezas inestables y cartas malditas legalmente dudosas.",
    difficulty: "Inestable",
    narratorLine: "Tu mazo fue aprobado por entidades legalmente cuestionables.",
    visual: "Portal de contratos flotantes",
    rewards: ["Borde de borrador corrupto", "Titulo: Becario del Tribunal", "Carta: Error de Realidad"],
    unlocked: true,
  },
  {
    id: "survival",
    name: "Supervivencia",
    route: "/game-modes/survival",
    concept: "Oleadas infinitas de Saboteadores cada vez mas fuertes.",
    description: "Recursos limitados, mini jefes, descansos ocasionales y eventos que parecen mala gestion emocional.",
    difficulty: "Alta",
    narratorLine: "El tribunal perdio control de inventario emocional.",
    visual: "Escalera de niebla con sellos rojos",
    rewards: ["Fondo de oleada mental", "Carta: Maraton del Colapso", "Particulas de resistencia"],
    unlocked: true,
  },
  {
    id: "boss-rush",
    name: "Boss Rush",
    route: "/game-modes/boss-rush",
    concept: "Todos los jefes seguidos sin reinicio completo.",
    description: "Conserva parte del dano, parte del mazo y el cansancio ceremonial entre jefes.",
    difficulty: "Brutal",
    narratorLine: "El cerebro organizo un festival de problemas.",
    visual: "Pasillo de puertas con ojos judiciales",
    rewards: ["Marco de festival interno", "Titulo: Martillo Roto", "Fondo Tribunal fracturado"],
    unlocked: true,
  },
  {
    id: "chaos",
    name: "Caos Psicologico",
    route: "/game-modes/chaos",
    concept: "Las reglas cambian constantemente.",
    description: "Cada 3 turnos aparece un modificador: costos rotos, eventos absurdos, martillos hiperactivos o silencio administrativo.",
    difficulty: "Inestable",
    narratorLine: "Las reglas abandonaron el edificio.",
    visual: "Rueda mutante de decretos imposibles",
    rewards: ["Carta: Error de Realidad", "Efecto de camara inestable", "Titulo: Error de sistema emocional"],
    unlocked: true,
  },
  {
    id: "arena",
    name: "Arena de Saboteadores",
    route: "/game-modes/arena",
    concept: "Modo competitivo local/IA con ranking.",
    description: "Rangos locales, temporadas offline, historial de victorias y cosmeticos de vanidad psicologica.",
    difficulty: "Competitiva",
    narratorLine: "La autoestima pidio ranking. Mal comienzo, excelente interfaz.",
    visual: "Coliseo mental con marcador dorado",
    rewards: ["Contrato del Tribunal", "Marcos por rango", "Frases exclusivas"],
    unlocked: true,
  },
  {
    id: "co-op",
    name: "Cooperativo local experimental",
    route: "/game-modes/co-op",
    concept: "Dos jugadores luchan juntos contra un boss.",
    description: "Turnos alternados, recursos compartidos opcionales, cartas sincronizadas y presupuesto emocional duplicado.",
    difficulty: "Experimental",
    narratorLine: "Dos cerebros. El doble de traumas. El doble de presupuesto.",
    visual: "Mesa doble con dos sellos de claridad",
    rewards: ["Carta: Terapia de Grupo Armado", "Aura cooperativa", "Titulo: Supervisor del Derrumbe"],
    unlocked: true,
  },
  {
    id: "mirror",
    name: "Modo Espejo",
    route: "/game-modes/mirror",
    concept: "El enemigo usa una copia distorsionada de tu mazo.",
    description: "La IA copia cartas, les agrega corrupcion visual y cambia sus textos como si tuviera resentimiento editorial.",
    difficulty: "Alta",
    narratorLine: "El tribunal aprendio tus trucos y les agrego resentimiento.",
    visual: "Espejo roto con duplicados hostiles",
    rewards: ["Carta: Reflejo Hostil", "Borde de cristal oscuro", "Fondo de sala invertida"],
    unlocked: true,
  },
  {
    id: "mutant",
    name: "Desafios mutantes",
    route: "/game-modes/chaos",
    concept: "Reglas deformadas por modificadores visuales, mecanicos, narrativos y sonoros.",
    description: "Cartas gigantes, mano invertida, costos ocultos, Estres explosivo y keywords duplicadas.",
    difficulty: "Inestable",
    narratorLine: "El reglamento se miro al espejo y decidio improvisar.",
    visual: "Nucleo de reglas agrietadas",
    rewards: ["Particulas mutantes", "Titulo: La audiencia termino", "Sello de caos limpio"],
    unlocked: true,
  },
];

export const getGameMode = (id?: string) => gameModes.find((mode) => mode.id === id);
