import type { CurrencyWallet } from "./economyConfig";
import type { PackId } from "./packs";

export type LevelReward = {
  level: number;
  xpRequired: number;
  label: string;
  currencies?: Partial<CurrencyWallet>;
  packId?: PackId;
  cosmetic?: string;
  cardId?: string;
  title?: string;
};

export const xpRequiredForLevel = (level: number) => Math.round(80 + level * 42 + Math.pow(level, 1.45) * 18);

export const levelRewards: LevelReward[] = Array.from({ length: 50 }, (_, index) => {
  const level = index + 1;
  const base: LevelReward = {
    level,
    xpRequired: level === 1 ? 0 : xpRequiredForLevel(level),
    label: level === 1 ? "Expediente abierto" : `${40 + level * 12} Fragmentos`,
    currencies: level === 1 ? undefined : { clarityFragments: 40 + level * 12 },
  };
  if (level === 2) return { ...base, label: "100 Fragmentos", currencies: { clarityFragments: 100 } };
  if (level === 5) return { ...base, label: "Sobre Pensamientos Intrusivos", packId: "intrusivos" };
  if (level === 10) return { ...base, label: "Avatar Citado Oficialmente", cosmetic: "avatar-citado-oficialmente" };
  if (level === 15) return { ...base, label: "Llave Mental", currencies: { mentalKeys: 1 } };
  if (level === 20) return { ...base, label: "Marco Cadenas Menores", cosmetic: "marco-cadenas-menores" };
  if (level === 30) return { ...base, label: "Carta epica", cardId: "funeral-plan-b" };
  if (level === 40) return { ...base, label: "Fondo Tribunal del Craneo", cosmetic: "fondo-tribunal-craneo" };
  if (level === 50) return { ...base, label: "Titulo Sobreviviente del Expediente", title: "sobreviviente-expediente" };
  if (level % 10 === 0) return { ...base, label: "Cosmetico ceremonial", cosmetic: `cosmetico-nivel-${level}` };
  if (level % 5 === 0) return { ...base, label: "Recompensa mayor", packId: "crisis-premium" };
  return base;
});

export const healthyProgressionTargets = [
  "Primer sobre en menos de 10 minutos.",
  "Primera carta rara en tutorial o primera campana.",
  "Primera epica en la primera hora.",
  "Primera legendaria tras campana o desafio importante.",
  "Cosmeticos frecuentes, visibles y no invasivos.",
];
