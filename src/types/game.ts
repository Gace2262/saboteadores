export type DemoFaction = "controlador" | "perfeccionista" | "inquieto" | "hipervigilante" | "reservado" | "evitador" | "conciencia";
export type DemoRarity = "comun" | "rara" | "epica" | "legendaria";
export type DemoVisualEffect = "hammer_slam" | "chains" | "horse_stampede" | "panic_pulse" | "liberation_burst" | "hit" | "shimmer" | "error";

export type DemoCard = {
  id: string;
  name: string;
  faction: DemoFaction;
  type: "ataque" | "defensa" | "recurso" | "control" | "catarsis";
  cost: number;
  rarity: DemoRarity;
  effectText: string;
  flavorText: string;
  damage: number;
  heal: number;
  stress: number;
  clarity: number;
  block: boolean;
  draw: number;
  discardRandom: boolean;
  visualEffect: DemoVisualEffect;
  soundEffect: "hammer" | "chain" | "hit" | "shimmer" | "error";
};

export type DemoDeckId = "oficina-control" | "circo-pendientes" | "manual-no-me-pasa";

export type DemoCombatant = {
  will: number;
  clarity: number;
  stress: number;
  mentalNoise: number;
  blocked: boolean;
};

export type DemoEnemy = {
  id: string;
  name: string;
  maxWill: number;
  deckIds: string[];
  phrases: [string, string, string];
};

export type DemoBattleResult = "win" | "loss";
