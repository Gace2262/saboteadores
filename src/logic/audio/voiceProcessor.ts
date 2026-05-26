import type { AdvancedVoiceLine } from "@/data/voiceLines";
import { useAudioStore } from "@/store/audioStore";

export function processVoiceLine(line: AdvancedVoiceLine) {
  const state = useAudioStore.getState();
  const whisperAllowed = line.whisperLayer && state.whispersEnabled && !state.streamerSafe;
  return {
    id: line.id,
    text: line.text,
    subtitleKey: line.subtitleKey,
    pitch: state.streamerSafe ? 1 : line.pitch,
    reverb: state.noDistortion ? Math.min(0.25, line.reverb) : line.reverb,
    distortion: state.noDistortion || state.streamerSafe ? 0 : line.distortion,
    whisperLayer: whisperAllowed,
    stereoSpread: whisperAllowed ? 0.75 : 0.25,
  };
}
