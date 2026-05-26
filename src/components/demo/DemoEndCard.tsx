"use client";

import Link from "next/link";
import { useBuildStore } from "@/store/buildStore";

export function DemoEndCard() {
  const resetDemo = useBuildStore((state) => state.resetDemo);
  return (
    <section className="relative overflow-hidden rounded-lg border border-amber-100/22 bg-black/70 p-7 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,211,123,0.18),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(127,29,29,0.22),transparent_34%)]" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-amber-100/60">Final de demo</p>
        <h2 className="mt-3 text-5xl font-black uppercase text-white md:text-7xl">El juicio continua.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl font-bold text-amber-100">Esto fue apenas el expediente inicial.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="campaign-choice max-w-xs">Volver al menu</Link>
          <button className="campaign-action max-w-xs" onClick={resetDemo}>Reiniciar demo</button>
          <Link href="/press-kit" className="campaign-choice max-w-xs">Wishlist mock</Link>
          <Link href="/credits" className="campaign-choice max-w-xs">Creditos</Link>
          <Link href="/collection" className="campaign-choice max-w-xs">Explorar coleccion</Link>
        </div>
      </div>
    </section>
  );
}
