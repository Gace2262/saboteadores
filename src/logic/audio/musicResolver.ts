import type { FactionId } from "@/data/factions";
import type { AdvancedTrackId } from "@/data/audioTracks";

export type AdaptiveMusicInput = {
  stress: number;
  corruption: number;
  bossFaction?: FactionId;
  bossPhase?: number;
  cinematicState?: "none" | "boss_intro" | "catarsis" | "defeat" | "awakening";
  playerHealthPercent: number;
  tribunalAttention: number;
};

export function resolveAdvancedTrack(input: AdaptiveMusicInput): AdvancedTrackId {
  if (input.cinematicState === "catarsis" || input.cinematicState === "awakening") return "catarsis-total";
  if (input.bossFaction === "juez") return "tribunal-craneo";
  if (input.bossFaction === "perfeccionista") return "perfeccionista-ascendido";
  if (input.bossFaction === "hipervigilante") return "hipervigilante-omega";
  if (input.bossFaction === "inquieto") return "caballeria-burnout";
  return "home-ambient";
}

export function resolveAudioIntensity(input: AdaptiveMusicInput) {
  const stress = input.stress * 8;
  const corruption = input.corruption * 0.55;
  const health = Math.max(0, 1 - input.playerHealthPercent) * 22;
  const boss = input.bossFaction ? 14 + (input.bossPhase ?? 0) * 6 : 0;
  const tribunal = input.tribunalAttention * 0.35;
  const cinematic = input.cinematicState && input.cinematicState !== "none" ? 16 : 0;
  return Math.min(100, Math.round(stress + corruption + health + boss + tribunal + cinematic));
}
