import { ChaosModifierWheel } from "@/components/modes/ChaosModifierWheel";
import { ModePageShell } from "@/components/modes/ModePageShell";

export default function ChaosModePage() {
  return (
    <ModePageShell modeId="chaos">
      <ChaosModifierWheel />
    </ModePageShell>
  );
}
