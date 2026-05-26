import type { PackId } from "./packs";
import type { CollectibleRarity } from "./rarities";

export type EconomyCurrency = "clarityFragments" | "mentalKeys" | "tribunalSeals" | "catarsisEchoes" | "burnoutAshes";

export type CurrencyWallet = Record<EconomyCurrency, number>;

export const currencyDefinitions: Record<EconomyCurrency, { name: string; use: string; flavor: string }> = {
  clarityFragments: {
    name: "Fragmentos de Claridad",
    use: "sobres, mejoras, cosmeticos internos y rutas opcionales",
    flavor: "Pedazos de lucidez con bordes filosos.",
  },
  mentalKeys: {
    name: "Llaves Mentales",
    use: "sobres especiales, Juicio Extremo y bosses opcionales",
    flavor: "Abren puertas que quiza debieron quedarse cerradas.",
  },
  tribunalSeals: {
    name: "Sellos del Tribunal",
    use: "recompensas de jefes, cosmeticos judiciales y cartas de El Juez",
    flavor: "Valen mucho porque el Tribunal imprime poco y amenaza bastante.",
  },
  catarsisEchoes: {
    name: "Ecos de Catarsis",
    use: "evolucionar cartas, reducir corrupcion y despertar formas",
    flavor: "Luz repetida hasta que una cadena se cansa.",
  },
  burnoutAshes: {
    name: "Cenizas de Burnout",
    use: "cartas malditas, modificadores extremos y cosmeticos corruptos",
    flavor: "Productividad quemada, ahora con valor contable.",
  },
};

export const startingWallet: CurrencyWallet = {
  clarityFragments: 180,
  mentalKeys: 1,
  tribunalSeals: 0,
  catarsisEchoes: 2,
  burnoutAshes: 0,
};

export const packCosts: Record<PackId, Partial<CurrencyWallet>> = {
  intrusivos: { clarityFragments: 100 },
  "crisis-premium": { clarityFragments: 250 },
  tribunal: { mentalKeys: 1, clarityFragments: 150 },
  catarsis: { catarsisEchoes: 2, clarityFragments: 100 },
  maldito: { burnoutAshes: 3, mentalKeys: 1 },
};

export const duplicateValue: Record<CollectibleRarity, Partial<CurrencyWallet>> = {
  comun: { clarityFragments: 10 },
  rara: { clarityFragments: 25 },
  epica: { clarityFragments: 75 },
  legendaria: { clarityFragments: 200 },
  maldita: { burnoutAshes: 1 },
};

export const cardUpgradeCosts = {
  level1To2: { clarityFragments: 50 },
  level2To3: { clarityFragments: 100 },
  evolution: { catarsisEchoes: 2 },
  awakening: { catarsisEchoes: 5 },
  reduceCorruption: { catarsisEchoes: 3, clarityFragments: 100 },
} satisfies Record<string, Partial<CurrencyWallet>>;
