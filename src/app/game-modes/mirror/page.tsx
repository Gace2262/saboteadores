import { MirrorEffectOverlay } from "@/components/modes/MirrorEffectOverlay";
import { ModePageShell } from "@/components/modes/ModePageShell";

export default function MirrorModePage() {
  return (
    <ModePageShell modeId="mirror">
      <MirrorEffectOverlay />
    </ModePageShell>
  );
}
