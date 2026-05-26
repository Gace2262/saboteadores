import Link from "next/link";
import { notFound } from "next/navigation";
import { SaveInspector } from "@/components/debug/SaveInspector";
import { requireDebugEnabled } from "@/lib/debugGate";

export default function DebugSavesPage() {
  if (!requireDebugEnabled()) notFound();
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Guardado seguro</p>
          <h1 className="mt-2 text-5xl font-black">Inspector de saves</h1>
          <Link href="/debug" className="campaign-choice mt-5 max-w-xs">Volver a debug</Link>
        </header>
        <SaveInspector />
      </section>
    </main>
  );
}
