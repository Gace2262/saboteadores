export type DemoStepId = "intro" | "tutorial" | "rare-event" | "evolution" | "boss" | "cinematic-phase" | "demo-end";

export type DemoFlowStep = {
  id: DemoStepId;
  title: string;
  duration: string;
  goal: string;
  scene: string;
  narrator: string;
  cta: string;
  routeHint: string;
};

export const demoFlow: DemoFlowStep[] = [
  {
    id: "intro",
    title: "Intro cinematografica",
    duration: "2 min",
    goal: "Presentar tono, logo y amenaza del Tribunal.",
    scene: "martillo suspendido, cadenas, pantalla negra y sello judicial roto",
    narrator: "No entraste aqui para ganar. Entraste porque algo dentro de ti ya estaba peleando.",
    cta: "Abrir expediente",
    routeHint: "/demo",
  },
  {
    id: "tutorial",
    title: "Tutorial contra Controlador",
    duration: "5 min",
    goal: "Explicar Voluntad, Claridad, Estres, mano y cartas.",
    scene: "oficina oscura con sellos administrativos y cadenas perfectamente ordenadas",
    narrator: "El caos pidio permiso para existir. El Controlador lo devolvio por ventanilla.",
    cta: "Iniciar combate rapido",
    routeHint: "/battle",
  },
  {
    id: "rare-event",
    title: "Carta habla por primera vez",
    duration: "2 min",
    goal: "Mostrar Tribunal Vivo y humor negro dinamico.",
    scene: "una carta tiembla y cambia flavor text",
    narrator: "El mazo acaba de opinar. Esto no estaba en el contrato emocional.",
    cta: "Escuchar al mazo",
    routeHint: "/world",
  },
  {
    id: "evolution",
    title: "Despertar de carta",
    duration: "3 min",
    goal: "Mostrar evolucion, corrupcion y forma despierta.",
    scene: "carta flotando, grietas internas, cadenas rompiendose",
    narrator: "La carta recordo demasiado.",
    cta: "Ver evolucion",
    routeHint: "/evolution",
  },
  {
    id: "boss",
    title: "Boss: Perfeccionista Ascendido",
    duration: "8 min",
    goal: "Mostrar boss colosal, fases y destruccion de escenario.",
    scene: "catedral viva, relojes gigantes y grietas simetricas",
    narrator: "Tu error sobrevivio demasiado tiempo.",
    cta: "Entrar a la catedral",
    routeHint: "/bosses",
  },
  {
    id: "cinematic-phase",
    title: "Fase cinematografica",
    duration: "2 min",
    goal: "Mostrar pantalla rota, subtitulos y escena mayor.",
    scene: "freeze frame, zoom dramatico, escenario colapsando",
    narrator: "La realidad del tablero se fractura.",
    cta: "Ver escena mayor",
    routeHint: "/cinematics",
  },
  {
    id: "demo-end",
    title: "Final de demo",
    duration: "1 min",
    goal: "Cerrar con El Juez observando desde lejos.",
    scene: "ojo dorado al fondo, cadenas suspendidas, humo lento",
    narrator: "Esto fue apenas el expediente inicial.",
    cta: "Cerrar expediente",
    routeHint: "/demo",
  },
];

export const demoTarget = {
  minMinutes: 15,
  maxMinutes: 30,
  promise: "identidad visual, combate, narrativa, bosses, humor negro, cinematicas, cartas evolucionables, musica dinamica y Tribunal Vivo",
};
