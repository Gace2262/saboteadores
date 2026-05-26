import type { VisualEffect } from "@/data/cards";

export type SoundDefinition = {
  route: string;
  frequency: number;
  duration: number;
  wave: OscillatorType;
  gain: number;
};

export const soundMap: Record<VisualEffect, SoundDefinition> = {
  hammer_slam: { route: "/sounds/hammer_slam.mp3", frequency: 74, duration: 0.34, wave: "square", gain: 0.16 },
  chains: { route: "/sounds/chains.mp3", frequency: 230, duration: 0.48, wave: "sawtooth", gain: 0.1 },
  horse_stampede: { route: "/sounds/horse_stampede.mp3", frequency: 52, duration: 0.75, wave: "triangle", gain: 0.14 },
  guilt_rain: { route: "/sounds/guilt_rain.mp3", frequency: 310, duration: 0.7, wave: "sine", gain: 0.08 },
  panic_pulse: { route: "/sounds/panic_pulse.mp3", frequency: 118, duration: 0.62, wave: "sawtooth", gain: 0.12 },
  sarcasm_spark: { route: "/sounds/sarcasm_spark.mp3", frequency: 640, duration: 0.22, wave: "square", gain: 0.07 },
  void_laugh: { route: "/sounds/void_laugh.mp3", frequency: 96, duration: 0.9, wave: "sawtooth", gain: 0.11 },
  liberation_burst: { route: "/sounds/liberation_burst.mp3", frequency: 440, duration: 0.65, wave: "sine", gain: 0.13 },
  judgment_flash: { route: "/sounds/judgment_flash.mp3", frequency: 86, duration: 0.5, wave: "square", gain: 0.17 },
  cursed_static: { route: "/sounds/cursed_static.mp3", frequency: 45, duration: 0.85, wave: "sawtooth", gain: 0.12 },
  mental_spark: { route: "/sounds/mental_spark.mp3", frequency: 720, duration: 0.28, wave: "triangle", gain: 0.08 },
};
