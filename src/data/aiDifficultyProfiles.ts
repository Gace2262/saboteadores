import type { AIDifficultyId } from "@/logic/ai/aiTypes";

export type AdvancedDifficultyProfile = {
  id: AIDifficultyId;
  name: string;
  memoryStrength: number;
  patternAdaptation: number;
  intentionalMistakeChance: number;
  maxComboLength: number;
  intentClarity: "clear" | "partial" | "cryptic";
};

export const advancedDifficultyProfiles: Record<AIDifficultyId, AdvancedDifficultyProfile> = {
  susurro: { id: "susurro", name: "Susurro", memoryStrength: 0.15, patternAdaptation: 0.2, intentionalMistakeChance: 0.22, maxComboLength: 1, intentClarity: "clear" },
  crisis: { id: "crisis", name: "Crisis", memoryStrength: 0.35, patternAdaptation: 0.45, intentionalMistakeChance: 0.08, maxComboLength: 2, intentClarity: "clear" },
  juicio: { id: "juicio", name: "Juicio", memoryStrength: 0.7, patternAdaptation: 0.75, intentionalMistakeChance: 0.02, maxComboLength: 3, intentClarity: "partial" },
  "tribunal-extremo": { id: "tribunal-extremo", name: "Tribunal Extremo", memoryStrength: 0.95, patternAdaptation: 1, intentionalMistakeChance: 0, maxComboLength: 3, intentClarity: "cryptic" },
};
