import { BossRushTracker } from "@/components/modes/BossRushTracker";
import { ModePageShell } from "@/components/modes/ModePageShell";

export default function BossRushModePage() {
  return (
    <ModePageShell modeId="boss-rush">
      <BossRushTracker />
    </ModePageShell>
  );
}
