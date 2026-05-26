import { ArenaRankingBoard } from "@/components/modes/ArenaRankingBoard";
import { ModePageShell } from "@/components/modes/ModePageShell";

export default function ArenaModePage() {
  return (
    <ModePageShell modeId="arena">
      <ArenaRankingBoard />
    </ModePageShell>
  );
}
