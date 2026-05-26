import Link from "next/link";
import { notFound } from "next/navigation";
import { ErrorLogViewer } from "@/components/debug/ErrorLogViewer";
import { SystemHealthPanel } from "@/components/debug/SystemHealthPanel";
import { TestScenarioLauncher } from "@/components/debug/TestScenarioLauncher";
import { requireDebugEnabled } from "@/lib/debugGate";

export default function DebugDiagnosticsPage() {
  if (!requireDebugEnabled()) notFound();
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Diagnostico interno</p>
          <h1 className="mt-2 text-5xl font-black">Estado del expediente</h1>
          <Link href="/debug" className="campaign-choice mt-5 max-w-xs">Volver a debug</Link>
        </header>
        <SystemHealthPanel />
        <TestScenarioLauncher />
        <ErrorLogViewer />
      </section>
    </main>
  );
}
