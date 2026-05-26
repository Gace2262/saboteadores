export type ColossalBossId = "juez-supremo" | "perfeccionista-ascendido" | "hipervigilante-omega" | "caballeria-burnout";

export type ColossalBoss = {
  id: ColossalBossId;
  name: string;
  subtitle: string;
  visual: string[];
  entrance: string[];
  quote: string;
  soundtrack: string;
  arena: string;
  difficulty: "colosal" | "apocaliptica" | "absurda";
};

export const cinematicBosses: ColossalBoss[] = [
  {
    id: "juez-supremo",
    name: "El Juez Supremo",
    subtitle: "Forma definitiva de El Juez",
    visual: ["gigante ceremonial", "rostro parcialmente oculto", "martillo flotante descomunal", "cadenas orbitando", "ojo dorado gigante", "capa de documentos judiciales rotos"],
    entrance: ["pantalla negra", "sonido de cadenas", "coro judicial", "grietas en el fondo", "martillo cae desde el cielo"],
    quote: "Tu mente entra oficialmente en desacato.",
    soundtrack: "organo judicial, coros, martillo y power metal sin pedir permiso",
    arena: "Tribunal del Craneo fracturado",
    difficulty: "apocaliptica",
  },
  {
    id: "perfeccionista-ascendido",
    name: "El Perfeccionista Ascendido",
    subtitle: "La catedral viva del error inadmisible",
    visual: ["catedral viva", "geometria imposible", "relojes gigantes", "grietas simetricas"],
    entrance: ["vitrales se alinean", "relojes retroceden", "el escenario se reorganiza perfectamente"],
    quote: "Tu error sobrevivio demasiado tiempo.",
    soundtrack: "piano dramatico, reloj mecanico y coro triste con regla milimetrica",
    arena: "Catedral del Casi imposible",
    difficulty: "colosal",
  },
  {
    id: "hipervigilante-omega",
    name: "Hipervigilante Omega",
    subtitle: "La torre que sospecha incluso de la calma",
    visual: ["torre mecanica gigante", "cientos de ojos", "radares", "alarmas rojas"],
    entrance: ["sirenas lejanas", "radares abren pupilas", "la calma queda fichada"],
    quote: "El peligro acaba de actualizarse.",
    soundtrack: "sirenas, percusion militar y respiraciones electronicas",
    arena: "Torre de Alarmas orbital",
    difficulty: "colosal",
  },
  {
    id: "caballeria-burnout",
    name: "Caballeria del Burnout",
    subtitle: "Boss colectivo de productividad necromante",
    visual: ["caballos espectrales", "oficina en llamas", "papeles volando", "cielo rojo"],
    entrance: ["casco tras casco", "la oficina prende fuego", "el calendario aprende a gritar"],
    quote: "La productividad encontro drogas nuevas.",
    soundtrack: "estampida, bateria rapida y guitarras con cafeina",
    arena: "Oficina incendiada del rendimiento eterno",
    difficulty: "absurda",
  },
];

export const getCinematicBoss = (id?: string) => cinematicBosses.find((boss) => boss.id === id) ?? cinematicBosses[0];
