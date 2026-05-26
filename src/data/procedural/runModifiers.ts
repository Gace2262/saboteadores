import type { ProceduralRunModifier } from "@/logic/procedural/proceduralTypes";

export const proceduralRunModifiers: ProceduralRunModifier[] = [
  { id: "culpable-entrada", name: "Culpable de Entrada", description: "Empiezas con +2 Estres. Recompensas +15%.", rewardMultiplier: 1.15, stressDelta: 2, tags: ["juicio", "culpa"] },
  { id: "claridad-fiscalizada", name: "Claridad Fiscalizada", description: "Claridad inicial -1. Cartas de Conciencia aparecen mas.", rewardMultiplier: 1.05, stressDelta: 0, tags: ["catarsis", "control"] },
  { id: "martillo-inquieto", name: "Martillo Inquieto", description: "Eventos de Juicio mas frecuentes. Mas Sellos del Tribunal.", rewardMultiplier: 1.18, stressDelta: 1, tags: ["juicio", "caos"] },
  { id: "catarsis-inestable", name: "Catarsis Inestable", description: "Catarsis cuesta menos. Ganas corrupcion al usarla.", rewardMultiplier: 1.12, stressDelta: 0, tags: ["catarsis", "memoria"] },
  { id: "sobres-sospechosos", name: "Sobres Sospechosos", description: "Mas cartas. Mayor probabilidad maldita.", rewardMultiplier: 1.2, stressDelta: 1, tags: ["caos", "burnout"] },
  { id: "silencio-mira", name: "El Silencio Mira", description: "Menos dialogos. Mas eventos secretos.", rewardMultiplier: 1.1, stressDelta: 0, tags: ["silencio", "evasion"] },
];
