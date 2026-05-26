import { defaultReputations, type ReputationId } from "@/data/factionWars";
import { getSeason, type SeasonId } from "@/data/seasons";
import { worldRegions, type MentalClimate, type WorldRegionId } from "@/data/worldRegions";

export type WorldReputationMap = Record<ReputationId, number>;

export type WorldSummary = {
  unlockedCount: number;
  totalRegions: number;
  explorationPercent: number;
  dominantClimate: MentalClimate;
  corruptionPressure: number;
  narratorLine: string;
};

const climateWeight: Record<MentalClimate, number> = {
  juicio: 0,
  caos: 0,
  agotamiento: 0,
  claridad: 0,
  corrupcion: 0,
  catarsis: 0,
};

export function clampReputation(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function resolveDominantClimate(unlockedRegionIds: WorldRegionId[], seasonId: SeasonId): MentalClimate {
  const weights = { ...climateWeight };
  const season = getSeason(seasonId);
  weights[season.globalClimate] += 3;
  worldRegions.forEach((region) => {
    if (unlockedRegionIds.includes(region.id)) weights[region.dominantClimate] += 1 + region.danger / 100;
  });
  return Object.entries(weights).sort((a, b) => b[1] - a[1])[0][0] as MentalClimate;
}

export function calculateWorldSummary(input: {
  unlockedRegionIds: WorldRegionId[];
  seasonId: SeasonId;
  reputations: WorldReputationMap;
  activeEventCount: number;
}): WorldSummary {
  const unlockedCount = input.unlockedRegionIds.length;
  const explorationPercent = Math.round((unlockedCount / worldRegions.length) * 100);
  const dominantClimate = resolveDominantClimate(input.unlockedRegionIds, input.seasonId);
  const corruptionPressure = Math.min(
    100,
    Math.round(
      input.activeEventCount * 9 +
        (input.reputations.tribunal - input.reputations.catarsis) * 0.35 +
        input.unlockedRegionIds.filter((id) => ["arena-colapso", "ruinas-autoengano"].includes(id)).length * 12,
    ),
  );
  const narratorLine =
    dominantClimate === "catarsis"
      ? "La claridad recupero terreno."
      : dominantClimate === "agotamiento"
        ? "El burnout abrio otra oficina."
        : dominantClimate === "corrupcion"
          ? "Las cadenas cambiaron de dueno."
          : dominantClimate === "caos"
            ? "El Tribunal expandio fronteras sin pedir plano."
            : "La culpa encontro nuevos templos.";
  return {
    unlockedCount,
    totalRegions: worldRegions.length,
    explorationPercent,
    dominantClimate,
    corruptionPressure: Math.max(0, corruptionPressure),
    narratorLine,
  };
}

export function defaultWorldReputations(): WorldReputationMap {
  return { ...defaultReputations };
}
