import { describe, expect, it } from "vitest";
import { audioEvents } from "@/data/audioEvents";
import { resolveAdaptiveMusic } from "@/logic/audio/adaptiveMusic";
import { getMixerSnapshot, setSafeMute } from "@/logic/audio/audioMixer";
import { resolveAdvancedTrack } from "@/logic/audio/musicResolver";
import { processVoiceLine } from "@/logic/audio/voiceProcessor";
import { applyStressAudio } from "@/logic/audio/stressMusicManager";
import { useAudioStore } from "@/store/audioStore";
import { advancedVoiceLines } from "@/data/voiceLines";

describe("advanced audio system", () => {
  it("activates stress layers as intensity rises", () => {
    const calm = resolveAdaptiveMusic({ stress: 1, corruption: 0, playerHealthPercent: 1, tribunalAttention: 0, cinematicState: "none" });
    const severe = resolveAdaptiveMusic({ stress: 10, corruption: 80, bossFaction: "juez", playerHealthPercent: 0.2, tribunalAttention: 90, cinematicState: "none" });
    expect(calm.activeLayers).toContain("base");
    expect(severe.activeLayers).toContain("corruption");
    expect(severe.intensity).toBeGreaterThan(calm.intensity);
  });

  it("switches boss music by faction", () => {
    expect(resolveAdvancedTrack({ stress: 3, corruption: 0, bossFaction: "juez", playerHealthPercent: 1, tribunalAttention: 0 })).toBe("tribunal-craneo");
    expect(resolveAdvancedTrack({ stress: 3, corruption: 0, bossFaction: "hipervigilante", playerHealthPercent: 1, tribunalAttention: 0 })).toBe("hipervigilante-omega");
  });

  it("routes catarsis to luminous music", () => {
    expect(resolveAdvancedTrack({ stress: 10, corruption: 100, cinematicState: "catarsis", playerHealthPercent: 0.1, tribunalAttention: 100 })).toBe("catarsis-total");
  });

  it("persists volume and mute affects mixer", () => {
    useAudioStore.getState().setVolume("musicVolume", 0.25);
    expect(useAudioStore.getState().musicVolume).toBe(0.25);
    setSafeMute(true);
    expect(getMixerSnapshot().enabled).toBe(false);
    setSafeMute(false);
    expect(getMixerSnapshot().enabled).toBe(true);
  });

  it("stress manager updates subtitles when tinnitus is enabled", () => {
    if (!useAudioStore.getState().tinnitusEnabled) useAudioStore.getState().toggleFlag("tinnitusEnabled");
    applyStressAudio(9);
    expect(useAudioStore.getState().battleIntensity).toBe(90);
    expect(useAudioStore.getState().subtitles.some((subtitle) => subtitle.text.includes("TINNITUS"))).toBe(true);
  });

  it("voice processor respects streamer safe", () => {
    if (!useAudioStore.getState().streamerSafe) useAudioStore.getState().toggleFlag("streamerSafe");
    const processed = processVoiceLine(advancedVoiceLines[1]);
    expect(processed.distortion).toBe(0);
    expect(processed.whisperLayer).toBe(false);
  });

  it("defines cinematic transitions with subtitles", () => {
    expect(audioEvents.critical_hammer.transition).toBe("silence_break");
    expect(audioEvents.judge_entrance.subtitle).toContain("CADENAS");
  });
});
