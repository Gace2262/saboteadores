import { soundEffects, type SoundEffectId } from "@/data/soundEffects";
import { audioManager } from "./audioManager";

export function playDesignedSfx(id: SoundEffectId) {
  const sfx = soundEffects[id];
  audioManager.playSfx({
    id: sfx.id,
    route: `/sfx/${sfx.id}.wav`,
    subtitle: sfx.subtitle,
    frequency: sfx.frequency,
    duration: sfx.duration,
    intensity: sfx.intensity,
  });
  return sfx;
}
