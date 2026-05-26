import Link from "next/link";
import { AnimatedBackground } from "@/components/art/AnimatedBackground";
import { LogoMark } from "@/components/art/LogoMark";
import { visualTheme } from "@/styles/visualTheme";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <AnimatedBackground variant="tribunal" />
      <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl place-items-center">
        <div className="w-full">
          <LogoMark />
          <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-amber-100/20 bg-black/58 p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur">
            <p className="mx-auto max-w-2xl text-lg leading-8 text-white/70">
              Demo jugable real: elige mazo, entra al juicio, juega turnos y enfrenta al Perfeccionista Ascendido.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/demo" className={visualTheme.button}>
                Iniciar demo
              </Link>
              <Link href="/settings" className={visualTheme.ghostButton}>
                Ajustes
              </Link>
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-amber-100/48">v0.1.0-demo / Tribunal en sesion</p>
          </div>
        </div>
      </section>
    </main>
  );
}
