import type { DemoSfxId } from "@/data/sfxCatalog";
import type { DemoSoundtrackThemeId } from "@/data/soundtrackThemes";
import { soundtrackThemes } from "@/data/soundtrackThemes";
import { useAudioStore } from "@/store/audioStore";
import { ambienceDefinitions, type AmbienceId } from "./ambienceEngine";
import { musicTransitions, type MusicTransitionType } from "./musicTransitions";
import { playProceduralSfx } from "./sfxEngine";
import { resolveLayerPlan, type RuntimeLayerId } from "./soundtrackLayers";
import { getMixedVolume } from "./volumeMixer";

type RunningLayer = {
  oscillator: OscillatorNode;
  gain: GainNode;
};

type SoundtrackSnapshot = {
  started: boolean;
  muted: boolean;
  currentTheme?: DemoSoundtrackThemeId;
  activeLayers: RuntimeLayerId[];
  intensity: number;
  bossPhase: 1 | 2 | 3;
  recentEvents: string[];
};

class SoundtrackController {
  private ctx?: AudioContext;
  private master?: GainNode;
  private layers = new Map<RuntimeLayerId, RunningLayer>();
  private ambience = new Map<string, RunningLayer>();
  private currentTheme?: DemoSoundtrackThemeId;
  private recentEvents: string[] = [];
  private intensity = 0;
  private bossPhase: 1 | 2 | 3 = 1;
  private muted = false;

  getSnapshot(): SoundtrackSnapshot {
    return {
      started: Boolean(this.ctx),
      muted: this.muted,
      currentTheme: this.currentTheme,
      activeLayers: Array.from(this.layers.keys()),
      intensity: this.intensity,
      bossPhase: this.bossPhase,
      recentEvents: this.recentEvents.slice(0, 8),
    };
  }

  async unlock() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return;
      this.ctx = new AudioContextCtor();
      this.master = this.ctx.createGain();
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") await this.ctx.resume();
    useAudioStore.getState().setStarted(true);
    this.updateMasterVolume();
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.updateMasterVolume();
  }

  pause() {
    this.stop();
    useAudioStore.getState().setStarted(false);
  }

  updateMasterVolume() {
    if (!this.master) return;
    const state = useAudioStore.getState();
    const volume = state.enabled && !this.muted ? state.masterVolume : 0;
    this.master.gain.setTargetAtTime(volume, this.ctx?.currentTime ?? 0, 0.04);
  }

  startTheme(themeId: DemoSoundtrackThemeId, intensity: number, bossPhase: 1 | 2 | 3 = 1, ambienceId: AmbienceId = "tribunal") {
    if (!this.ctx || !this.master) return;
    this.updateMasterVolume();
    const themeChanged = this.currentTheme !== themeId;
    this.currentTheme = themeId;
    this.intensity = Math.max(0, Math.min(1, intensity));
    this.bossPhase = bossPhase;

    const store = useAudioStore.getState();
    store.setBpm(soundtrackThemes[themeId].bpm);
    store.setBattleIntensity(Math.round(this.intensity * 100));
    store.setAdvancedLayers(resolveLayerPlan(themeId, this.intensity, bossPhase).filter((layer) => layer.gain > 0).map((layer) => layer.layer === "tension" ? "tension" : layer.layer === "stress" ? "stress" : layer.layer === "climax" ? "choir" : "base"));
    store.setTheme(themeId === "boss_catedral_casi" ? "catedral-casi" : themeId === "battle_ansiedad_operativa" ? "tribunal-craneo" : "home-ambient");

    const plan = resolveLayerPlan(themeId, this.intensity, bossPhase);
    plan.forEach((layer) => this.ensureLayer(layer.layer, layer.frequency, layer.gain * getMixedVolume(layer.layer === "ambience" ? "ambience" : layer.layer === "climax" ? "choir" : "music"), layer.waveform, layer.detune));
    Array.from(this.layers.keys()).forEach((layerId) => {
      if (!plan.some((layer) => layer.layer === layerId)) this.stopLayer(layerId);
    });
    this.startAmbience(ambienceId);
    if (themeChanged) this.remember(`Track: ${soundtrackThemes[themeId].name}`);
  }

  transition(type: MusicTransitionType) {
    const transition = musicTransitions[type];
    this.remember(transition.subtitle);
    useAudioStore.getState().pushSubtitle(transition.subtitle);
    if (!this.ctx) return;
    this.layers.forEach(({ gain }) => {
      gain.gain.setTargetAtTime(0.0001, this.ctx!.currentTime, transition.durationMs / 4000);
      window.setTimeout(() => this.updateLayerVolumes(), transition.silenceMs + transition.durationMs);
    });
  }

  playSfx(id: DemoSfxId) {
    if (!this.ctx || this.muted || !useAudioStore.getState().enabled) return;
    const state = useAudioStore.getState();
    playProceduralSfx(this.ctx, id, {
      volume: getMixedVolume(id.startsWith("ui_") ? "ui" : id.includes("whisper") ? "voice" : id.includes("hammer") || id.includes("phase") ? "cinematic" : "effects"),
      streamerSafe: state.streamerSafe,
      reducedDynamicRange: state.reducedDynamicRange,
      onSubtitle: (subtitle) => {
        if (state.subtitlesEnabled) state.pushSubtitle(subtitle);
        this.remember(subtitle);
      },
    });
  }

  stop() {
    this.layers.forEach((_, key) => this.stopLayer(key));
    this.ambience.forEach((running) => {
      running.gain.gain.setTargetAtTime(0.0001, this.ctx?.currentTime ?? 0, 0.05);
      running.oscillator.stop((this.ctx?.currentTime ?? 0) + 0.2);
    });
    this.ambience.clear();
    this.currentTheme = undefined;
  }

  private ensureLayer(layerId: RuntimeLayerId, frequency: number, gainValue: number, waveform: OscillatorType, detune: number) {
    if (!this.ctx || !this.master) return;
    const existing = this.layers.get(layerId);
    if (existing) {
      existing.oscillator.frequency.setTargetAtTime(frequency, this.ctx.currentTime, 0.08);
      existing.oscillator.detune.setTargetAtTime(detune, this.ctx.currentTime, 0.08);
      existing.gain.gain.setTargetAtTime(Math.max(0.0001, gainValue), this.ctx.currentTime, 0.08);
      return;
    }
    const oscillator = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    oscillator.type = waveform;
    oscillator.frequency.value = frequency;
    oscillator.detune.value = detune;
    gain.gain.value = 0.0001;
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start();
    gain.gain.setTargetAtTime(Math.max(0.0001, gainValue), this.ctx.currentTime, 0.12);
    this.layers.set(layerId, { oscillator, gain });
  }

  private updateLayerVolumes() {
    if (!this.currentTheme) return;
    this.startTheme(this.currentTheme, this.intensity, this.bossPhase);
  }

  private stopLayer(layerId: RuntimeLayerId) {
    const layer = this.layers.get(layerId);
    if (!layer || !this.ctx) return;
    layer.gain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.08);
    layer.oscillator.stop(this.ctx.currentTime + 0.26);
    this.layers.delete(layerId);
  }

  private startAmbience(ambienceId: AmbienceId) {
    if (!this.ctx || !this.master) return;
    const definition = ambienceDefinitions[ambienceId];
    definition.frequencies.forEach((frequency, index) => {
      const key = `${ambienceId}-${index}`;
      if (this.ambience.has(key)) return;
      const oscillator = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index * 6 - 6;
      gain.gain.value = 0.0001;
      oscillator.connect(gain);
      gain.connect(this.master!);
      oscillator.start();
      gain.gain.setTargetAtTime(getMixedVolume("ambience") * (0.008 + index * 0.005), this.ctx!.currentTime, 0.5);
      this.ambience.set(key, { oscillator, gain });
    });
  }

  private remember(event: string) {
    this.recentEvents = [event, ...this.recentEvents].slice(0, 10);
  }
}

export const soundtrackController = new SoundtrackController();
