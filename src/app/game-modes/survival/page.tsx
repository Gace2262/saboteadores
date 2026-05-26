import { ModePageShell } from "@/components/modes/ModePageShell";
import { SurvivalProgressBar } from "@/components/modes/SurvivalProgressBar";

export default function SurvivalModePage() {
  return (
    <ModePageShell modeId="survival">
      <SurvivalProgressBar />
    </ModePageShell>
  );
}
