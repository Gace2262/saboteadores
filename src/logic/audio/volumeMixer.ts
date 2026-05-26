import { useAudioStore } from "@/store/audioStore";

export type AudioBus = "music" | "voice" | "effects" | "ambience" | "cinematic" | "ui" | "corruption" | "choir";

export function getMixedVolume(bus: AudioBus, multiplier = 1) {
  const state = useAudioStore.getState();
  if (!state.enabled) return 0;
  const busVolume = {
    music: state.musicVolume,
    voice: state.voiceVolume,
    effects: state.effectsVolume,
    ambience: state.ambienceVolume,
    cinematic: state.cinematicVolume,
    ui: state.uiVolume,
    corruption: state.corruptionVolume,
    choir: state.choirVolume,
  }[bus];
  const range = state.reducedDynamicRange ? 0.72 : 1;
  return Math.min(1, Math.max(0, state.masterVolume * busVolume * multiplier * range));
}
