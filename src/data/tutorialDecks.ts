import type { FactionId } from "./factions";

export type TutorialDeckId = "oficina-control" | "circo-pendientes" | "manual-no-pasa-nada";

export type TutorialDeckChoice = {
  id: TutorialDeckId;
  name: string;
  factions: [FactionId, FactionId];
  style: string;
  phrase: string;
  startingCards: string[];
};

export const tutorialDeckChoices: TutorialDeckChoice[] = [
  {
    id: "oficina-control",
    name: "Oficina del Control",
    factions: ["controlador", "perfeccionista"],
    style: "bloqueo y precision",
    phrase: "Nada esta bajo control, pero el Excel se ve precioso.",
    startingCards: ["controlador-compulsivo", "funeral-plan-b", "autoestima-con-casco"],
  },
  {
    id: "circo-pendientes",
    name: "Circo de Pendientes",
    factions: ["inquieto", "hipervigilante"],
    style: "velocidad, robo y caos",
    phrase: "No sabemos que viene, pero ya corrimos en circulos.",
    startingCards: ["caballos-drama", "caballeria-pendientes", "repeticion-desastre"],
  },
  {
    id: "manual-no-pasa-nada",
    name: "Manual del No Me Pasa Nada",
    factions: ["reservado", "evitador"],
    style: "defensa, evasion y presion lenta",
    phrase: "Estoy perfecto. Solo tiembla el edificio interno.",
    startingCards: ["capa-no-me-pasa-nada", "manual-no-sentir", "casco-autoestima"],
  },
];

export const tutorialRewardCards = ["autoestima-con-casco", "excel-culpa", "caballos-drama"];

export const getTutorialDeckChoice = (id?: string) => tutorialDeckChoices.find((deck) => deck.id === id) ?? tutorialDeckChoices[0];
