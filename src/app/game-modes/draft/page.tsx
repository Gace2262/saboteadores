import { DraftSelectionPanel } from "@/components/modes/DraftSelectionPanel";
import { ModePageShell } from "@/components/modes/ModePageShell";

export default function DraftModePage() {
  return (
    <ModePageShell modeId="draft">
      <DraftSelectionPanel />
    </ModePageShell>
  );
}
