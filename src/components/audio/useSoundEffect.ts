"use client";

import { useCallback, useRef } from "react";
import type { VisualEffect } from "@/data/cards";
import { soundMap } from "./soundMap";

export function useSoundEffect(muted: boolean) {
  const contextRef = useRef<AudioContext | null>(null);

  return useCallback(
    (effect: VisualEffect) => {
      if (muted || typeof window === "undefined") return;
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const context = contextRef.current ?? new AudioContextClass();
      contextRef.current = context;
      const sound = soundMap[effect];
      const now = context.currentTime;

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();

      oscillator.type = sound.wave;
      oscillator.frequency.setValueAtTime(sound.frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, sound.frequency * 0.45), now + sound.duration);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(effect === "liberation_burst" ? 2200 : 900, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(sound.gain, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + sound.duration);

      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + sound.duration + 0.04);

      if (effect === "horse_stampede" || effect === "panic_pulse") {
        [0.1, 0.22, 0.34].forEach((offset) => {
          const pulse = context.createOscillator();
          const pulseGain = context.createGain();
          pulse.type = "square";
          pulse.frequency.setValueAtTime(sound.frequency * 1.6, now + offset);
          pulseGain.gain.setValueAtTime(0.001, now + offset);
          pulseGain.gain.exponentialRampToValueAtTime(sound.gain * 0.8, now + offset + 0.02);
          pulseGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.12);
          pulse.connect(pulseGain);
          pulseGain.connect(context.destination);
          pulse.start(now + offset);
          pulse.stop(now + offset + 0.14);
        });
      }
    },
    [muted],
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
