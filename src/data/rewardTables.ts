import type { CurrencyWallet } from "./economyConfig";

export type RewardContextType = "normal" | "minorBoss" | "judge" | "extreme";

export type RewardTableEntry = {
  id: RewardContextType;
  name: string;
  currencies: Partial<CurrencyWallet>;
  xp: number;
  drop: string;
};

export const rewardTables: RewardTableEntry[] = [
  {
    id: "normal",
    name: "Combate normal",
    currencies: { clarityFragments: 55 },
    xp: 10,
    drop: "Baja probabilidad de carta comun.",
  },
  {
    id: "minorBoss",
    name: "Jefe menor",
    currencies: { clarityFragments: 120, mentalKeys: 1 },
    xp: 40,
    drop: "Carta unica.",
  },
  {
    id: "judge",
    name: "El Juez",
    currencies: { clarityFragments: 300, mentalKeys: 2, tribunalSeals: 1 },
    xp: 100,
    drop: "Sobre especial.",
  },
  {
    id: "extreme",
    name: "Juicio Extremo",
    currencies: { clarityFragments: 500, tribunalSeals: 2, burnoutAshes: 3 },
    xp: 150,
    drop: "Cosmetico raro.",
  },
];

export const rewardBonuses = {
  cleanVictory: { label: "Victoria Limpia", multiplier: 1.2, description: "+20% Fragmentos" },
  elegantCollapse: { label: "Colapso Elegante", bonus: { mentalKeys: 1 }, description: "Ganar con 1 Voluntad: +1 Llave Mental" },
  premiumBurnout: { label: "Burnout Premium", bonus: { burnoutAshes: 2 }, description: "Ganar con Estres 10 o mas: +2 Cenizas" },
  silencedJudgment: { label: "Juicio Silenciado", bonus: { tribunalSeals: 1 }, description: "Derrotar al Juez sin Sentencias: +1 Sello" },
  finalCatarsis: { label: "Catarsis final", bonus: { catarsisEchoes: 2 }, description: "Cerrar combate con Catarsis: +2 Ecos" },
};
