import { advancedMusicLayers, type AdvancedMusicLayerId } from "@/data/musicLayers";
import { advancedAudioTracks } from "@/data/audioTracks";
import { resolveAdvancedTrack, resolveAudioIntensity, type AdaptiveMusicInput } from "./musicResolver";

export type AdaptiveMusicState = {
  trackId: keyof typeof advancedAudioTracks;
  intensity: number;
  bpm: number;
  activeLayers: AdvancedMusicLayerId[];
  silenceRecommended: boolean;
};

export function resolveAdaptiveMusic(input: AdaptiveMusicInput): AdaptiveMusicState {
  const trackId = resolveAdvancedTrack(input);
  const track = advancedAudioTracks[trackId];
  const intensity = resolveAudioIntensity(input);
  const activeLayers = advancedMusicLayers.filter((layer) => track.layers.includes(layer.id) && intensity >= layer.threshold).map((layer) => layer.id);
  const silenceRecommended = input.cinematicState === "defeat" || (input.tribunalAttention > 92 && input.stress < 2);
  return {
    trackId,
    intensity,
    bpm: Math.round(track.bpm + intensity * 0.28),
    activeLayers: activeLayers.length ? activeLayers : ["base"],
    silenceRecommended,
  };
}
