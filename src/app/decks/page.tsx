import { SavedDecksList } from "@/components/deck/SavedDecksList";

export default function DecksPage() {
  return (
    <main className="relative min-h-screen px-5 py-8 text-white">
      <div className="absolute inset-0 deck-ritual-bg" />
      <section className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="text-sm font-black uppercase text-amber-100/65">Archivo de mazos</p>
        <h1 className="mb-6 mt-2 text-5xl font-black">Guardar y cargar diagnosticos jugables</h1>
        <SavedDecksList />
      </section>
    </main>
  );
}
