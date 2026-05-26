import type { SeasonId } from "@/data/seasons";
import { getSeason } from "@/data/seasons";
import { worldEvents, type WorldEvent, type WorldEventId } from "@/data/worldEvents";
import type { WorldRegionId } from "@/data/worldRegions";

export function resolveSeasonEvents(seasonId: SeasonId, unlockedRegionIds: WorldRegionId[]): WorldEvent[] {
  const season = getSeason(seasonId);
  return worldEvents.filter((event) => {
    const sharesRegion = event.affectedRegions.some((regionId) => unlockedRegionIds.includes(regionId) || season.affectedRegions.includes(regionId));
    const sharesClimate = event.climate === season.globalClimate;
    return sharesRegion || sharesClimate;
  });
}

export function pickGlobalEvent(input: { seasonId: SeasonId; unlockedRegionIds: WorldRegionId[]; seenEventIds: string[]; seed?: number }): WorldEvent {
  const events = resolveSeasonEvents(input.seasonId, input.unlockedRegionIds);
  const unseen = events.filter((event) => !input.seenEventIds.includes(event.id));
  const pool = unseen.length ? unseen : events.length ? events : worldEvents;
  const seed = input.seed ?? Date.now();
  return pool[Math.abs(seed) % pool.length];
}

export function isUltraRareEvent(eventId: WorldEventId) {
  return worldEvents.find((event) => event.id === eventId)?.rarity === "ultra-raro";
}
