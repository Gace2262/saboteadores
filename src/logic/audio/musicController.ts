import type { FactionId } from "@/data/factions";
import type { MusicLayerId, MusicThemeId } from "@/audio/musicTracks";
import { musicTracks, themeByFaction } from "@/audio/musicTracks";

export type MusicInput = {
  playerStress: number;
  playerWill: number;
  maxWill: number;
  bossFaction?: FactionId;
  judgmentMeter?: number;
  cardsPlayed: number;
  phase: "home" | "battle" | "ended" | string;
};

export type MusicState = {
  theme: MusicThemeId;
  intensity: number;
  bpm: number;
  layers: MusicLayerId[];
};

export function calculateBattleIntensity(input: MusicInput) {
  const stress = input.playerStress * 7;
  const lowWill = Math.max(0, 1 - input.playerWill / input.maxWill) * 24;
  const judgment = (input.judgmentMeter ?? 0) * 0.28;
  const cards = Math.min(18, input.cardsPlayed * 2);
  const boss = input.bossFaction === "juez" ? 12 : input.phase === "battle" ? 6 : 0;
  return Math.min(100, Math.round(stress + lowWill + judgment + cards + boss));
}

export function resolveMusicState(input: MusicInput): MusicState {
  const theme = input.phase === "battle" ? themeByFaction(input.bossFaction) : "home-ambient";
  const intensity = calculateBattleIntensity(input);
  const track = musicTracks[theme];
  const layers: MusicLayerId[] = ["base"];
  if (intensity >= 25) layers.push("percussion");
  if (intensity >= 45) layers.push("judicial");
  if (intensity >= 55) layers.push("choir");
  if (intensity >= 70) layers.push("guitars");
  if (intensity >= 82) layers.push("distortion");
  return { theme, intensity, layers, bpm: Math.round(track.bpm + intensity * 0.35) };
}
