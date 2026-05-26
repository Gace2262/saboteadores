import { playerCards, type Card } from "./cards";

export type RewardBundle = {
  id: string;
  title: string;
  cards: Card[];
  clarityFragments: number;
  canUpgrade: boolean;
  canRemoveNegative: boolean;
};

type NegativeDraft = Omit<Card, "nameKey" | "effectKey" | "flavorKey" | "impactKey" | "collectible" | "unlockCondition" | "packSources" | "duplicateValue" | "flavorQuote">;

const negativeKeyStem = (id: string) => id.replace(/-([a-z0-9])/g, (_, letter: string) => letter.toUpperCase());

const withNegativeCollection = (card: NegativeDraft): Card => ({
  ...card,
  nameKey: `cards.${negativeKeyStem(card.id)}.name`,
  effectKey: `cards.${negativeKeyStem(card.id)}.effect`,
  flavorKey: `cards.${negativeKeyStem(card.id)}.flavor`,
  impactKey: `cards.${negativeKeyStem(card.id)}.impact`,
  collectible: true,
  unlockCondition: "Aparece en eventos mentales, sobres de crisis o malas decisiones con buena iluminacion.",
  packSources: ["crisis-premium", "maldito"],
  duplicateValue: 6,
  flavorQuote: card.darkHumorText,
});

const negativeDrafts: NegativeDraft[] = [
  {
    id: "pendiente-toxico",
    name: "Pendiente toxico",
    faction: "inquieto",
    type: "Pensamiento Automatico",
    rarity: "comun",
    cost: 0,
    willpowerDamage: 0,
    stressGain: 1,
    clarityGain: 0,
    mentalNoise: 0,
    effectText: "Ocupa espacio en mano y sube Estres.",
    darkHumorText: "No hace nada. Por eso pesa tanto.",
    visualEffect: "panic_pulse",
    soundEffect: "panic_pulse",
    animationType: "pulse",
    impactText: "No hace nada. Por eso pesa tanto.",
    keywords: ["Obsesion"],
  },
  {
    id: "verguenza-reciclada",
    name: "Verguenza reciclada",
    faction: "victima",
    type: "Pensamiento Automatico",
    rarity: "comun",
    cost: 0,
    willpowerDamage: 0,
    stressGain: 0,
    clarityGain: -1,
    mentalNoise: 0,
    effectText: "Reduce Claridad al robarse.",
    darkHumorText: "Reutilizable, biodegradable y siempre inoportuna.",
    visualEffect: "guilt_rain",
    soundEffect: "sarcasm_spark",
    animationType: "rain",
    impactText: "Reutilizable, biodegradable y siempre inoportuna.",
    keywords: ["Culpa"],
  },
  {
    id: "comparacion-premium",
    name: "Comparacion premium",
    faction: "juez",
    type: "Saboteador",
    rarity: "rara",
    cost: 1,
    willpowerDamage: 0,
    stressGain: 1,
    clarityGain: 0,
    mentalNoise: 1,
    effectText: "El rival gana dano adicional.",
    darkHumorText: "Suscribete hoy y pierde autoestima mensualmente.",
    visualEffect: "hammer_slam",
    soundEffect: "hammer_slam",
    animationType: "slam",
    impactText: "Suscribete hoy y pierde autoestima mensualmente.",
    keywords: ["Sentencia"],
  },
  {
    id: "notificacion-desastre",
    name: "Notificacion del desastre",
    faction: "hipervigilante",
    type: "Crisis",
    rarity: "comun",
    cost: 0,
    willpowerDamage: 0,
    stressGain: 1,
    clarityGain: 0,
    mentalNoise: 0,
    effectText: "Descarta una carta aleatoria.",
    darkHumorText: "No era urgente. Ahora si.",
    visualEffect: "panic_pulse",
    soundEffect: "panic_pulse",
    animationType: "pulse",
    impactText: "No era urgente. Ahora si.",
    keywords: ["Derrumbe"],
  },
];

export const negativeCards: Card[] = negativeDrafts.map(withNegativeCollection);

export const makeRewardBundle = (seed: number): RewardBundle => {
  const cards = [...playerCards]
    .sort((a, b) => ((a.id.length + seed) % 7) - ((b.id.length + seed) % 7))
    .slice(0, 3);

  return {
    id: `reward-${seed}`,
    title: "Botin de claridad ligeramente cuestionable",
    cards,
    clarityFragments: 2 + (seed % 3),
    canUpgrade: seed % 2 === 0,
    canRemoveNegative: seed % 3 === 0,
  };
};
