import { EditorShell } from "@/components/editor/EditorShell";
import { LiveEffectTester } from "@/components/editor/LiveEffectTester";
import { SandboxBattleLauncher } from "@/components/editor/SandboxBattleLauncher";

export default function EditorSandboxPage() {
  return (
    <EditorShell title="Sandbox">
      <div className="grid gap-5 lg:grid-cols-2">
        <LiveEffectTester />
        <SandboxBattleLauncher />
      </div>
    </EditorShell>
  );
}
