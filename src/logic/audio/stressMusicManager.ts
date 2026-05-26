import { useAudioStore } from "@/store/audioStore";

export function applyStressAudio(stress: number) {
  const intensity = Math.min(100, Math.max(0, stress * 10));
  const layers = ["base"] as const;
  useAudioStore.getState().setBattleIntensity(intensity);
  if (stress >= 8 && useAudioStore.getState().tinnitusEnabled) {
    useAudioStore.getState().pushSubtitle("[TINNITUS SUAVE]");
  }
  return {
    intensity,
    heartbeat: stress >= 4,
    distortion: stress >= 8 && !useAudioStore.getState().noDistortion,
    layers,
  };
}
