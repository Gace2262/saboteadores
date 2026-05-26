import type { DemoSfxId } from "@/data/sfxCatalog";
import { sfxCatalog } from "@/data/sfxCatalog";

export type SfxOptions = {
  volume: number;
  streamerSafe?: boolean;
  reducedDynamicRange?: boolean;
  onSubtitle?: (subtitle: string) => void;
};

function makeNoise(ctx: AudioContext, duration: number, gainValue: number) {
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < bufferSize; index += 1) data[index] = (Math.random() * 2 - 1) * (1 - index / bufferSize);
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  gain.gain.value = gainValue;
  source.buffer = buffer;
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  source.stop(ctx.currentTime + duration);
}

export function playProceduralSfx(ctx: AudioContext, id: DemoSfxId, options: SfxOptions) {
  const sfx = sfxCatalog[id];
  const volume = Math.max(0, Math.min(1, options.volume));
  if (!volume) return;
  options.onSubtitle?.(sfx.subtitle);

  const impact = options.reducedDynamicRange ? Math.min(0.62, sfx.impact) : sfx.impact;
  const duration = options.streamerSafe ? Math.min(sfx.duration, 0.28) : sfx.duration;
  const gainTarget = Math.max(0.001, volume * impact * 0.16);
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc.type = sfx.waveform;
  osc.frequency.setValueAtTime(sfx.baseFrequency, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, sfx.baseFrequency * (id === "liberation_burst" ? 1.8 : 0.58)), now + duration);
  filter.type = id.includes("hammer") || id.includes("hit") ? "lowpass" : "bandpass";
  filter.frequency.value = id === "chains" ? 900 : id === "panic_pulse" ? 180 : 1300;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainTarget, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);

  if (["hammer_slam", "hit_heavy", "boss_phase_transition", "horse_stampede"].includes(id)) {
    makeNoise(ctx, Math.min(0.22, duration), volume * impact * 0.08);
  }
  if (id === "chains") {
    window.setTimeout(() => makeNoise(ctx, 0.08, volume * 0.035), 90);
  }
}

export function mapVisualEffectToSfx(effect: string): DemoSfxId {
  if (effect === "hammer_slam") return "hammer_slam";
  if (effect === "chains") return "chains";
  if (effect === "horse_stampede") return "horse_stampede";
  if (effect === "panic_pulse") return "panic_pulse";
  if (effect === "liberation_burst") return "liberation_burst";
  if (effect === "shimmer") return "clarity_gain";
  if (effect === "error") return "corruption_glitch";
  return "hit_light";
}
