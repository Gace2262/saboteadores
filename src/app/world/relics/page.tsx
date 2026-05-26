import Link from "next/link";
import { RelicDisplay } from "@/components/world/RelicDisplay";

export default function WorldRelicsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Objetos mentales permanentes</p>
          <h1 className="mt-2 text-5xl font-black md:text-7xl">Reliquias del Universo</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Fragmentos, llaves, cadenas domesticadas y cafe sospechoso. Todo desbloqueable jugando, nada con dinero real.
          </p>
          <Link href="/world" className="campaign-choice mt-5 max-w-xs">Volver al universo</Link>
        </header>
        <RelicDisplay />
      </section>
    </main>
  );
}
