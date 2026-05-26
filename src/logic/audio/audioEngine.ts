import { audioEvents, type AudioEventId } from "@/data/audioEvents";
import { audioManager } from "./audioManager";
import { resolveAdaptiveMusic, type AdaptiveMusicState } from "./adaptiveMusic";
import type { AdaptiveMusicInput } from "./musicResolver";
import { playDesignedSfx } from "./sfxController";
import { useAudioStore } from "@/store/audioStore";

class AudioEngine {
  async unlock() {
    return audioManager.unlock();
  }

  update(input: AdaptiveMusicInput): AdaptiveMusicState {
    const resolved = resolveAdaptiveMusic(input);
    const store = useAudioStore.getState();
    store.setBattleIntensity(resolved.intensity);
    store.setAdvancedLayers(resolved.activeLayers);
    store.setBpm(resolved.bpm);
    if (resolved.silenceRecommended) store.pushSubtitle("[SILENCIO NARRATIVO]");
    return resolved;
  }

  trigger(eventId: AudioEventId) {
    const event = audioEvents[eventId];
    useAudioStore.getState().triggerAudioEvent(eventId);
    useAudioStore.getState().pushSubtitle(event.subtitle);
    playDesignedSfx(event.sfx);
    return event;
  }
}

export const audioEngine = new AudioEngine();
