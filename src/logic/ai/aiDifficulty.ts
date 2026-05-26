import type { AIDifficulty, AIDifficultyId } from "./aiTypes";

export const aiDifficulties: Record<AIDifficultyId, AIDifficulty> = {
  susurro: {
    id: "susurro",
    name: "Susurro",
    text: "Ideal para cerebros recien reiniciados.",
    randomness: 3.4,
    comboLookahead: 0,
    maxCardsPerTurn: 1,
    aggressionMultiplier: 0.85,
  },
  crisis: {
    id: "crisis",
    name: "Crisis",
    text: "La mente ya empezo a tocar tambores.",
    randomness: 1.8,
    comboLookahead: 1,
    maxCardsPerTurn: 1,
    aggressionMultiplier: 1,
  },
  juicio: {
    id: "juicio",
    name: "Juicio",
    text: "Trae pruebas, excusas y casco.",
    randomness: 0.8,
    comboLookahead: 2,
    maxCardsPerTurn: 2,
    aggressionMultiplier: 1.15,
  },
  "tribunal-extremo": {
    id: "tribunal-extremo",
    name: "Tribunal Extremo",
    text: "No recomendado para autoestima sin armadura.",
    randomness: 0.25,
    comboLookahead: 3,
    maxCardsPerTurn: 3,
    aggressionMultiplier: 1.35,
  },
};

export const defaultDifficulty: AIDifficultyId = "crisis";
