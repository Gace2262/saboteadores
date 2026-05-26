import { useAudioStore } from "@/store/audioStore";
import { getMixedVolume, type AudioBus } from "./volumeMixer";

export function getMixerSnapshot() {
  const state = useAudioStore.getState();
  const buses: AudioBus[] = ["music", "ambience", "effects", "voice", "cinematic", "ui", "corruption", "choir"];
  return {
    enabled: state.enabled,
    started: state.started,
    master: state.masterVolume,
    buses: Object.fromEntries(buses.map((bus) => [bus, getMixedVolume(bus)])) as Record<AudioBus, number>,
  };
}

export function setSafeMute(muted: boolean) {
  const state = useAudioStore.getState();
  if (state.enabled === muted) state.toggleEnabled();
}
