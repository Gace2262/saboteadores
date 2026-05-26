import Link from "next/link";
import { MemoryArchive } from "@/components/world/MemoryArchive";

export default function WorldArchivePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Biblioteca viva del caos mental</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Archivo Universal</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Bosses derrotados, decisiones narrativas, cartas despertadas, corrupcion maxima, finales y eventos raros.
          </p>
          <Link href="/world" className="campaign-choice mt-5 max-w-xs">Volver al universo</Link>
        </header>
        <MemoryArchive />
      </section>
    </main>
  );
}
