import type { CommunityChallenge } from "./workshopTypes";

export const weeklyMockChallenge: CommunityChallenge = {
  id: "respirar-es-opcional",
  type: "no_catarsis",
  rules: ["+3 Estres inicial", "No se permiten cartas Catarsis", "Elites dobles", "Recompensas +40%"],
  rewardTitle: "Legalmente Exhausto",
};

export function generateChallengeFromSeed(seedText: string): CommunityChallenge {
  const hard = seedText.length % 2 === 0;
  return {
    id: `challenge-${seedText.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 32) || "tribunal"}`,
    type: hard ? "cursed_run" : "boss_rush",
    rules: hard ? ["Cartas Malditas habilitadas", "+2 Estres por acto", "Boss final adelantado"] : ["Todos los bosses seguidos", "Descansos limitados", "Recompensas entre bosses"],
    rewardTitle: hard ? "Archivista de Cenizas" : "Martillo con Horario Extendido",
  };
}
