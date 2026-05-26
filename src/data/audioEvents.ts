import type { AdvancedTrackId } from "./audioTracks";
import type { SoundEffectId } from "./soundEffects";

export type AudioEventId = "judge_entrance" | "critical_hammer" | "legendary_catarsis" | "mental_defeat" | "judge_victory" | "corruption_spike" | "rare_silence";

export type AudioEvent = {
  id: AudioEventId;
  title: string;
  transition: "crossfade" | "low_pass" | "reverb_tail" | "silence_break" | "impact_hit";
  track?: AdvancedTrackId;
  sfx: SoundEffectId;
  subtitle: string;
  description: string;
};

export const audioEvents: Record<AudioEventId, AudioEvent> = {
  judge_entrance: { id: "judge_entrance", title: "Entrada de El Juez", transition: "impact_hit", track: "tribunal-craneo", sfx: "hammer_slam", subtitle: "[ORGANO MASIVO Y CADENAS]", description: "Pantalla oscura, cadenas y coro judicial." },
  critical_hammer: { id: "critical_hammer", title: "Martillazo critico", transition: "silence_break", sfx: "hammer_slam", subtitle: "[MARTILLAZO CELESTIAL]", description: "Pausa breve, silencio y golpe explosivo." },
  legendary_catarsis: { id: "legendary_catarsis", title: "Catarsis legendaria", transition: "reverb_tail", track: "catarsis-total", sfx: "catarsis", subtitle: "[CADENAS ROMPIENDOSE]", description: "La distorsion desaparece y entra coro luminoso." },
  mental_defeat: { id: "mental_defeat", title: "Derrota mental", transition: "low_pass", sfx: "glitch", subtitle: "[LATIDOS LENTOS Y RUIDO BLANCO]", description: "Audio distorsionado, respiracion cansada y ruido blanco." },
  judge_victory: { id: "judge_victory", title: "Victoria contra El Juez", transition: "reverb_tail", track: "catarsis-total", sfx: "catarsis", subtitle: "[CORO TRIUNFAL]", description: "Cadenas cayendo, martillo roto y fade calido." },
  corruption_spike: { id: "corruption_spike", title: "Corrupcion sonora", transition: "low_pass", sfx: "glitch", subtitle: "[ESTATICA MENTAL]", description: "Glitch invade la musica y el pitch se vuelve inestable." },
  rare_silence: { id: "rare_silence", title: "El silencio responde", transition: "silence_break", sfx: "silence_break", subtitle: "[TODO SONIDO SE CORTA]", description: "El silencio se usa como herramienta narrativa." },
};
