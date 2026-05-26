import Link from "next/link";
import { AnimatedBackground } from "@/components/art/AnimatedBackground";
import { LogoMark } from "@/components/art/LogoMark";
import { visualTheme } from "@/styles/visualTheme";

export function LandingHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden px-5 py-10 text-white">
      <AnimatedBackground variant="tribunal" />
      <div className="relative mx-auto grid min-h-[calc(88vh-5rem)] max-w-6xl place-items-center">
        <div className="w-full text-center">
          <LogoMark />
          <p className="mx-auto mt-7 max-w-3xl text-2xl font-black text-amber-100">El tribunal vive dentro de ti.</p>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/70">
            Un deckbuilder psicologico y cinematografico sobre patrones mentales, humor negro y batallas internas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/demo" className={visualTheme.button}>
              Jugar demo web
            </Link>
            <a href="#trailer" className={visualTheme.ghostButton}>
              Ver trailer
            </a>
          </div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-white/46">
            Demo publica v0.1.0 / 15 a 25 minutos / offline-first
          </p>
        </div>
      </div>
    </section>
  );
}
