import { CoopTurnPanel } from "@/components/modes/CoopTurnPanel";
import { ModePageShell } from "@/components/modes/ModePageShell";

export default function CoopModePage() {
  return (
    <ModePageShell modeId="co-op">
      <CoopTurnPanel />
    </ModePageShell>
  );
}
