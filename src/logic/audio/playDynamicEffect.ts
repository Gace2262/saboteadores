import type { Card } from "@/data/cards";
import { cinematicSfx, keywordSfx, visualEffectSubtitles } from "@/audio/sfxMap";
import { narratorLines, cinematicVoiceLines, type VoiceLine } from "@/audio/voiceLines";
import { useAudioStore, type CinematicAudioEvent } from "@/store/audioStore";
import { audioManager } from "./audioManager";

export function playCardAudio(card: Card) {
  if (!useAudioStore.getState().started) return;
  const keyword = card.keywords[0];
  if (keyword) audioManager.playSfx(keywordSfx[keyword]);
  else useAudioStore.getState().pushSubtitle(visualEffectSubtitles[card.visualEffect]);

  if (card.rarity === "legendaria" || card.keywords.includes("Catarsis")) {
    triggerCinematicAudio(card.keywords.includes("Catarsis") ? "legendaryCatharsis" : "criticalHammer");
  }
}

export function playTauntAudio(text: string, tone?: Partial<VoiceLine>) {
  if (!text || !useAudioStore.getState().started) return;
  audioManager.playVoice({
    id: `taunt-${text.slice(0, 18)}`,
    text,
    route: "/voice/enemy/taunt.wav",
    pitch: tone?.pitch ?? 0.78,
    echo: tone?.echo ?? 0.45,
    distortion: tone?.distortion ?? 0.18,
    subtitle: text,
  });
}

export function playNarratorCue(seed: number) {
  if (!useAudioStore.getState().started) return;
  audioManager.playVoice(narratorLines[Math.abs(seed) % narratorLines.length]);
}

export function triggerCinematicAudio(event: CinematicAudioEvent) {
  const state = useAudioStore.getState();
  state.triggerCinematic(event);
  const sfx = cinematicSfx[event];
  if (sfx) audioManager.playSfx(sfx);
  const voice = cinematicVoiceLines[event];
  if (voice) audioManager.playVoice(voice);
}
