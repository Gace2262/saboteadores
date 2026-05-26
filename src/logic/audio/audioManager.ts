import type { MusicLayerId, MusicThemeId } from "@/audio/musicTracks";
import { musicTracks } from "@/audio/musicTracks";
import type { SfxDefinition } from "@/audio/sfxMap";
import type { VoiceLine } from "@/audio/voiceLines";
import { useAudioStore } from "@/store/audioStore";
import { getMixedVolume } from "./volumeMixer";

type LayerNode = {
  oscillator: OscillatorNode;
  gain: GainNode;
};

const layerRatios: Record<MusicLayerId, number> = {
  base: 1,
  percussion: 0.5,
  choir: 1.5,
  guitars: 2,
  judicial: 0.75,
  distortion: 0.25,
};

class AudioManager {
  private context?: AudioContext;
  private master?: GainNode;
  private musicNodes = new Map<MusicLayerId, LayerNode>();
  private theme?: MusicThemeId;
  private timer?: number;

  private getContext() {
    if (typeof window === "undefined") return undefined;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return undefined;
    this.context ??= new AudioContextClass();
    this.master ??= this.context.createGain();
    this.master.connect(this.context.destination);
    return this.context;
  }

  async unlock() {
    const context = this.getContext();
    if (!context) return false;
    if (context.state === "suspended") await context.resume();
    useAudioStore.getState().setStarted(true);
    return true;
  }

  stopMusic() {
    this.musicNodes.forEach((node) => {
      try {
        node.gain.gain.exponentialRampToValueAtTime(0.001, this.context?.currentTime ?? 0 + 0.15);
        node.oscillator.stop((this.context?.currentTime ?? 0) + 0.18);
      } catch {
        node.oscillator.disconnect();
      }
    });
    this.musicNodes.clear();
    if (this.timer) window.clearInterval(this.timer);
  }

  startMusic(theme: MusicThemeId, layers: MusicLayerId[], intensity: number, bpm: number) {
    const context = this.getContext();
    if (!context || !useAudioStore.getState().enabled || !useAudioStore.getState().started) return;
    if (this.theme !== theme) {
      this.stopMusic();
      this.theme = theme;
    }

    const track = musicTracks[theme];
    layers.forEach((layer) => {
      if (this.musicNodes.has(layer)) return;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      oscillator.type = layer === "distortion" ? "sawtooth" : layer === "guitars" ? "square" : "triangle";
      oscillator.frequency.value = track.rootFrequency * layerRatios[layer];
      filter.type = layer === "distortion" ? "highpass" : "lowpass";
      filter.frequency.value = layer === "judicial" ? 760 : 1200;
      gain.gain.value = 0.001;
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(this.master!);
      oscillator.start();
      this.musicNodes.set(layer, { oscillator, gain });
    });

    this.musicNodes.forEach((node, layer) => {
      const active = layers.includes(layer);
      const bus = layer === "base" ? "ambience" : "music";
      const level = active ? getMixedVolume(bus, (0.1 + intensity / 140) * (layer === "distortion" ? 0.45 : 1)) : 0.001;
      node.gain.gain.setTargetAtTime(Math.max(0.001, level), context.currentTime, 0.25);
    });

    if (this.timer) window.clearInterval(this.timer);
    this.timer = window.setInterval(() => this.pulse(bpm, intensity), Math.max(220, 60000 / Math.max(40, bpm)));
  }

  private pulse(bpm: number, intensity: number) {
    const context = this.getContext();
    if (!context || !this.master || !useAudioStore.getState().started) return;
    const now = context.currentTime;
    const gain = context.createGain();
    const oscillator = context.createOscillator();
    oscillator.type = intensity > 70 ? "square" : "sine";
    oscillator.frequency.value = intensity > 70 ? 90 : 55;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(getMixedVolume("effects", intensity > 70 ? 0.09 : 0.035), now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + Math.min(0.22, 60000 / bpm / 1000));
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(now);
    oscillator.stop(now + 0.24);
  }

  playSfx(sfx: SfxDefinition, bus: "effects" | "voice" = "effects") {
    const context = this.getContext();
    if (!context || !useAudioStore.getState().started) return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    oscillator.type = sfx.intensity > 75 ? "square" : "triangle";
    oscillator.frequency.setValueAtTime(sfx.frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(28, sfx.frequency * 0.42), now + sfx.duration);
    filter.type = "lowpass";
    filter.frequency.value = useAudioStore.getState().noDistortion ? 1600 : 900 + sfx.intensity * 10;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(getMixedVolume(bus, sfx.intensity / 100), now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + sfx.duration);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(this.master!);
    oscillator.start(now);
    oscillator.stop(now + sfx.duration + 0.04);
    useAudioStore.getState().pushSubtitle(sfx.subtitle);
  }

  playVoice(line: VoiceLine) {
    const state = useAudioStore.getState();
    const noDistortion = state.noDistortion || state.streamerSafe;
    this.playSfx(
      {
        id: line.id,
        route: line.route,
        subtitle: line.subtitle,
        frequency: 170 * line.pitch,
        duration: 0.85 + line.echo * 0.5,
        intensity: noDistortion ? 38 : 55 + line.distortion * 60,
      },
      "voice",
    );
  }
}

export const audioManager = new AudioManager();

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
