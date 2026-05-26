export type DemoStageId = "home" | "intro" | "tutorial" | "deck" | "battle" | "event" | "evolution" | "boss" | "end";

export type DemoStage = {
  id: DemoStageId;
  title: string;
  route: string;
  duration: string;
  promise: string;
};

export const demoStages: DemoStage[] = [
  { id: "home", title: "Pantalla inicial", route: "/demo", duration: "1 min", promise: "Abrir expediente, ajustar ritmo y reiniciar progreso." },
  { id: "intro", title: "Intro cinematografica", route: "/demo/intro", duration: "2 min", promise: "Logo, martillo, ojo dorado y citacion oficial." },
  { id: "tutorial", title: "Tutorial breve", route: "/demo/tutorial", duration: "3-5 min", promise: "Voluntad, Claridad, Estres, Ruido Mental y cadenas." },
  { id: "deck", title: "Eleccion de mazo", route: "/demo/deck", duration: "2 min", promise: "Tres estilos jugables y legibles." },
  { id: "battle", title: "Primer combate", route: "/demo/battle", duration: "4-6 min", promise: "Controlador Menor con intencion visible." },
  { id: "event", title: "Espejo incomodo", route: "/demo/event", duration: "2 min", promise: "Decision narrativa con recompensa y costo." },
  { id: "evolution", title: "Carta despierta", route: "/demo/evolution", duration: "2 min", promise: "Fortaleza de Autoestima nace con grietas luminosas." },
  { id: "boss", title: "Boss fight", route: "/demo/boss", duration: "6-9 min", promise: "Perfeccionista Ascendido en tres fases." },
  { id: "end", title: "Final demo", route: "/demo/end", duration: "1 min", promise: "El Juez observa. El juicio continua." },
];

export const getDemoStage = (id: DemoStageId) => demoStages.find((stage) => stage.id === id) ?? demoStages[0];

export const getNextDemoStage = (id: DemoStageId) => {
  const index = demoStages.findIndex((stage) => stage.id === id);
  return demoStages[Math.min(demoStages.length - 1, Math.max(0, index + 1))];
};
