import type { FactionId } from "@/data/factions";

export type ProceduralDifficulty = "audiencia-suave" | "crisis-formal" | "juicio-serio" | "tribunal-desatado";
export type ProceduralMode = "rapido" | "largo";
export type ProceduralNodeType = "combate" | "elite" | "evento" | "descanso" | "tienda" | "anomalia" | "recompensa" | "boss" | "juicio" | "secreto";
export type ProceduralRouteStyle = "seguro" | "balanceado" | "arriesgado" | "secreto";
export type MentalClimate = "culpa" | "control" | "burnout" | "evasion" | "silencio" | "juicio" | "catarsis" | "caos" | "perfeccion" | "memoria";

export type ProceduralRunModifier = {
  id: string;
  name: string;
  description: string;
  rewardMultiplier: number;
  stressDelta: number;
  tags: MentalClimate[];
};

export type ProceduralEventOption = {
  id: "a" | "b" | "c";
  label: string;
  result: string;
};

export type ProceduralEvent = {
  id: string;
  title: string;
  category: string;
  text: string;
  options: ProceduralEventOption[];
};

export type ProceduralReward = {
  id: string;
  type: "carta" | "fragmentos" | "llave" | "reliquia" | "cura" | "limpiar_estres" | "evolucion" | "quitar_carta" | "mejora" | "cosmetico";
  label: string;
  rarity: "comun" | "rara" | "epica" | "legendaria" | "maldita";
};

export type ProceduralBoss = {
  id: FactionId;
  name: string;
  actBias: number;
  climates: MentalClimate[];
};

export type ProceduralNode = {
  id: string;
  act: number;
  index: number;
  lane: number;
  type: ProceduralNodeType;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  next: string[];
  routeStyle: ProceduralRouteStyle;
  eventId?: string;
  bossId?: FactionId;
  rewardId?: string;
  secretCondition?: string;
  difficultyRating: number;
};

export type ProceduralAct = {
  id: number;
  title: string;
  nodes: ProceduralNode[];
};

export type ProceduralNarrativeSeed = {
  title: string;
  openingLine: string;
  theme: MentalClimate;
  narrator: string;
};

export type ProceduralCampaign = {
  id: string;
  seedText: string;
  seed: number;
  mode: ProceduralMode;
  difficulty: ProceduralDifficulty;
  deckId: string;
  narrative: ProceduralNarrativeSeed;
  modifiers: ProceduralRunModifier[];
  acts: ProceduralAct[];
  nodes: ProceduralNode[];
  finalBossId: FactionId;
  createdAt: string;
};

export type ProceduralRunHistoryEntry = {
  id: string;
  seedText: string;
  seed: number;
  deckId: string;
  difficulty: ProceduralDifficulty;
  result: "victoria" | "derrota" | "abandono";
  finalBossId: FactionId;
  durationMinutes: number;
  visitedNodeIds: string[];
  rewards: string[];
  maxStress: number;
  keyCard: string;
  bestCombo: string;
  finalLine: string;
  completedAt: string;
};
