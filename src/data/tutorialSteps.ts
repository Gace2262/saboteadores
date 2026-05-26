export type TutorialStepId =
  | "citation"
  | "resources"
  | "first-card"
  | "first-saboteur"
  | "block"
  | "catarsis"
  | "combo"
  | "victory"
  | "reward"
  | "first-deck";

export type TutorialStep = {
  id: TutorialStepId;
  title: string;
  objective: string;
  narrator: string;
  highlight: "court" | "resources" | "hand" | "enemy" | "blocked" | "catarsis" | "combo" | "reward" | "deck";
  cta: string;
};

export const tutorialSteps: TutorialStep[] = [
  {
    id: "citation",
    title: "Citacion inicial",
    objective: "Entrar al Tribunal del Craneo.",
    narrator: "Has sido citado por el Tribunal del Craneo. Cargo principal: sobrevivir a tus propios mecanismos.",
    highlight: "court",
    cta: "Aceptar citacion",
  },
  {
    id: "resources",
    title: "Recursos del expediente",
    objective: "Conocer Voluntad, Claridad, Estres y Ruido Mental.",
    narrator: "La Claridad paga las decisiones. El Estres cobra intereses.",
    highlight: "resources",
    cta: "Entendido, mala economia",
  },
  {
    id: "first-card",
    title: "Primera carta",
    objective: "Jugar una carta simple de Conciencia.",
    narrator: "Juega Conciencia Basica. Es pequena, pero al menos no trae cadenas.",
    highlight: "hand",
    cta: "Jugar carta",
  },
  {
    id: "first-saboteur",
    title: "Primer Saboteador",
    objective: "Ver aparecer al Controlador menor.",
    narrator: "El Controlador menor entra con formulario, sello y una autoestima ajena en revision.",
    highlight: "enemy",
    cta: "Presentar objecion",
  },
  {
    id: "block",
    title: "Bloqueo",
    objective: "Aprender que una carta puede quedar encadenada.",
    narrator: "Esa cadena no es decoracion. Es una mala costumbre con metalurgia.",
    highlight: "blocked",
    cta: "Romper protocolo",
  },
  {
    id: "catarsis",
    title: "Catarsis",
    objective: "Limpiar Ruido Mental y recuperar Claridad.",
    narrator: "Catarsis no arregla la vida. Pero abre una ventana y eso ya asusta al tribunal.",
    highlight: "catarsis",
    cta: "Activar Catarsis",
  },
  {
    id: "combo",
    title: "Primer combo",
    objective: "Jugar Pensamiento Automatico + Catarsis.",
    narrator: "Excelente. Acabas de convertir ansiedad en dano legalmente dudoso.",
    highlight: "combo",
    cta: "Encadenar combo",
  },
  {
    id: "victory",
    title: "Victoria",
    objective: "Derrotar al Controlador menor.",
    narrator: "El Tribunal anota avances. Tambien errores, pero con mejor caligrafia.",
    highlight: "enemy",
    cta: "Firmar victoria",
  },
  {
    id: "reward",
    title: "Recompensa",
    objective: "Elegir una carta nueva.",
    narrator: "Ganaste una carta. No libertad, no exageremos.",
    highlight: "reward",
    cta: "Elegir recompensa",
  },
  {
    id: "first-deck",
    title: "Primer mazo",
    objective: "Elegir identidad inicial de mazo.",
    narrator: "Elige dos mecanismos para discutir con tu cabeza con mas estilo.",
    highlight: "deck",
    cta: "Elegir mazo",
  },
];

export const getTutorialStep = (id?: string) => tutorialSteps.find((step) => step.id === id) ?? tutorialSteps[0];
