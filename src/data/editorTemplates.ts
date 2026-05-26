import type { AnimationType, VisualEffect } from "@/data/cards";
import type { FactionId } from "@/data/factions";
import type { Keyword } from "@/data/keywords";
import type { CollectibleRarity } from "@/data/rarities";

export type EditorEffectType =
  | "damage"
  | "heal"
  | "draw"
  | "discard"
  | "gain_stress"
  | "reduce_stress"
  | "apply_chain"
  | "remove_chain"
  | "gain_clarity"
  | "reduce_clarity"
  | "summon"
  | "transform"
  | "copy"
  | "trigger_keyword"
  | "cinematic"
  | "corruption"
  | "catarsis"
  | "random";

export type EditorTarget = "self" | "enemy" | "both" | "board" | "random";

export type EditorCardEffect = {
  type: EditorEffectType;
  target: EditorTarget;
  value: number;
  condition?: string;
  animation?: VisualEffect;
  sound?: VisualEffect;
};

export type EditorCardDraft = {
  id: string;
  name: string;
  faction: FactionId;
  rarity: CollectibleRarity;
  cost: number;
  keywords: Keyword[];
  effects: EditorCardEffect[];
  effectText: string;
  flavorText: string;
  visualEffect: VisualEffect;
  soundEffect: VisualEffect;
  animationType: AnimationType;
  cinematic: VisualEffect;
  version: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  changelog: string[];
};

export type EditorBossDraft = {
  id: string;
  name: string;
  faction: FactionId;
  room: string;
  soundtrack: string;
  dialogue: string[];
  phases: EditorBossPhaseDraft[];
  rewards: string[];
  difficulty: number;
  version: string;
};

export type EditorBossPhaseDraft = {
  id: string;
  name: string;
  life: number;
  aiProfile: string;
  passiveEffects: string[];
  events: string[];
  soundtrackLayer: string;
  visual: VisualEffect;
};

export type EditorEventDraft = {
  id: string;
  title: string;
  type: "narrative" | "dynamic" | "anomaly" | "judge_interruption";
  description: string;
  effects: EditorCardEffect[];
  narratorLine: string;
  visual: VisualEffect;
  enabled: boolean;
  version: string;
};

export type EditorCampaignNodeDraft = {
  id: string;
  type: "combate" | "boss" | "evento" | "descanso" | "anomalia" | "recompensa" | "cinematica";
  title: string;
  x: number;
  y: number;
  connections: string[];
  bossId?: string;
  eventId?: string;
  rewardIds: string[];
};

export type EditorExpansionDraft = {
  id: string;
  name: string;
  tagline: string;
  cards: EditorCardDraft[];
  bosses: EditorBossDraft[];
  events: EditorEventDraft[];
  campaigns: EditorCampaignNodeDraft[];
  cosmetics: string[];
  soundtrackRefs: string[];
  backgrounds: string[];
  version: string;
  author: string;
};

const now = "2026-05-25T00:00:00.000Z";

export const effectPresets: EditorCardEffect[] = [
  { type: "damage", target: "enemy", value: 4, animation: "hammer_slam", sound: "hammer_slam" },
  { type: "heal", target: "self", value: 3, animation: "liberation_burst", sound: "liberation_burst" },
  { type: "apply_chain", target: "enemy", value: 1, animation: "chains", sound: "chains" },
  { type: "catarsis", target: "both", value: 1, animation: "liberation_burst", sound: "horse_stampede" },
  { type: "corruption", target: "self", value: 2, animation: "cursed_static", sound: "void_laugh" },
];

export const editorCardTemplate: EditorCardDraft = {
  id: "nueva-carta-del-archivo",
  name: "Nueva Carta del Archivo",
  faction: "conciencia",
  rarity: "comun",
  cost: 1,
  keywords: ["Despertar"],
  effects: [{ type: "gain_clarity", target: "self", value: 1, animation: "liberation_burst", sound: "liberation_burst" }],
  effectText: "Gana 1 Claridad. El expediente respira sin autorizacion.",
  flavorText: "Nacio en una oficina sin ventanas y aun asi trajo luz.",
  visualEffect: "liberation_burst",
  soundEffect: "liberation_burst",
  animationType: "burst",
  cinematic: "liberation_burst",
  version: "0.1.0-draft",
  createdAt: now,
  updatedAt: now,
  author: "Archivo de Creacion",
  changelog: ["Borrador inicial creado por el ministerio emocional clandestino."],
};

export const editorBossTemplate: EditorBossDraft = {
  id: "boss-del-archivo",
  name: "Boss del Archivo",
  faction: "controlador",
  room: "Oficina en Construccion",
  soundtrack: "paperwork-metal-loop",
  dialogue: ["La documentacion tambien muerde."],
  phases: [
    {
      id: "fase-uno",
      name: "Fase Uno",
      life: 30,
      aiProfile: "control",
      passiveEffects: ["Bloquea la primera carta cara."],
      events: ["lluvia de formularios"],
      soundtrackLayer: "percussion",
      visual: "chains",
    },
  ],
  rewards: ["nueva-carta-del-archivo"],
  difficulty: 2,
  version: "0.1.0-draft",
};

export const editorEventTemplate: EditorEventDraft = {
  id: "el-tribunal-suspira",
  title: "El Tribunal Suspira",
  type: "dynamic",
  description: "La musica baja y el expediente deja de apretar los dientes durante tres segundos.",
  effects: [{ type: "reduce_stress", target: "both", value: 1, animation: "guilt_rain", sound: "sarcasm_spark" }],
  narratorLine: "Algo administrativo tuvo compasion accidental.",
  visual: "guilt_rain",
  enabled: true,
  version: "0.1.0-draft",
};

export const expansionTemplates: EditorExpansionDraft[] = [
  {
    id: "rebelion-burnout",
    name: "La Rebelion del Burnout",
    tagline: "Cuando la productividad presenta demanda colectiva.",
    cards: [],
    bosses: [],
    events: [],
    campaigns: [],
    cosmetics: [],
    soundtrackRefs: ["burnout-choir", "office-fire-drums"],
    backgrounds: ["Archivo del Burnout"],
    version: "0.1.0-draft",
    author: "Archivo de Creacion",
  },
  {
    id: "archivo-culpa",
    name: "El Archivo de la Culpa",
    tagline: "Toda verguenza, ahora indexada y con sello.",
    cards: [],
    bosses: [],
    events: [],
    campaigns: [],
    cosmetics: [],
    soundtrackRefs: ["guilt-rain-loop"],
    backgrounds: ["Catedral de la Culpa"],
    version: "0.1.0-draft",
    author: "Archivo de Creacion",
  },
];
