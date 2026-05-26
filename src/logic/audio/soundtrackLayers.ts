import type { DemoSoundtrackTheme, DemoSoundtrackThemeId } from "@/data/soundtrackThemes";
import { soundtrackThemes } from "@/data/soundtrackThemes";

export type RuntimeLayerId = "base" | "tension" | "stress" | "climax" | "ambience";

export type RuntimeLayerPlan = {
  layer: RuntimeLayerId;
  frequency: number;
  gain: number;
  waveform: OscillatorType;
  detune: number;
};

export function resolveLayerPlan(themeId: DemoSoundtrackThemeId, intensity: number, bossPhase: 1 | 2 | 3 = 1): RuntimeLayerPlan[] {
  const theme = soundtrackThemes[themeId];
  const safeIntensity = Math.max(0, Math.min(1, intensity));
  const phaseBoost = bossPhase === 3 ? 0.18 : bossPhase === 2 ? 0.09 : 0;
  const root = theme.rootFrequency;

  return [
    { layer: "base", frequency: root, gain: 0.075, waveform: "sine", detune: -4 },
    { layer: "ambience", frequency: root * 1.5, gain: 0.028 + safeIntensity * 0.018, waveform: "triangle", detune: 3 },
    { layer: "tension", frequency: root * 2, gain: safeIntensity > 0.18 ? 0.024 + safeIntensity * 0.034 : 0, waveform: "sawtooth", detune: 7 },
    { layer: "stress", frequency: root * 2.5, gain: safeIntensity > 0.42 ? 0.018 + safeIntensity * 0.034 : 0, waveform: "square", detune: -9 },
    { layer: "climax", frequency: root * 3, gain: safeIntensity > 0.68 || bossPhase === 3 ? 0.02 + safeIntensity * 0.04 + phaseBoost : 0, waveform: "triangle", detune: 12 },
  ];
}

export function getTrackName(themeId: DemoSoundtrackThemeId): string {
  return soundtrackThemes[themeId].name;
}

export function getTheme(themeId: DemoSoundtrackThemeId): DemoSoundtrackTheme {
  return soundtrackThemes[themeId];
}
