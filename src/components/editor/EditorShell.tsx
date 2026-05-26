import Link from "next/link";

export function EditorShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-[1800px] gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase text-amber-100/65">Archivo de Creacion</p>
              <h1 className="mt-1 text-4xl font-black">{title}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/editor" className="campaign-choice max-w-xs">Hub</Link>
              <Link href="/editor/cards" className="campaign-choice max-w-xs">Cartas</Link>
              <Link href="/editor/sandbox" className="campaign-choice max-w-xs">Sandbox</Link>
            </div>
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
