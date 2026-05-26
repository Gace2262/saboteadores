import Link from "next/link";
import { FirstDeckChoice } from "@/components/tutorial/FirstDeckChoice";
import { TutorialRewardScreen } from "@/components/tutorial/TutorialRewardScreen";

export default function TutorialCompletePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6 text-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-100/65">Tutorial completado</p>
          <h1 className="mt-3 text-5xl font-black md:text-7xl">Primera audiencia completada</h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl font-bold text-amber-100">
            No ganaste libertad. Ganaste permiso para seguir discutiendo con tu cabeza.
          </p>
          <Link href="/tutorial" className="campaign-choice mx-auto mt-5 max-w-xs">Repetir citacion</Link>
        </header>
        <TutorialRewardScreen />
        <FirstDeckChoice />
      </section>
    </main>
  );
}
