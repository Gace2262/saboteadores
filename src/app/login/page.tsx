import Link from "next/link";
import { LoginPanel } from "@/components/auth/LoginPanel";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-4xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Login opcional</p>
          <h1 className="mt-2 text-5xl font-black">Identidad del expediente</h1>
          <p className="mt-3 text-white/64">La demo funciona offline. La cuenta solo desbloquea sincronizacion futura.</p>
          <Link href="/" className="campaign-choice mt-4 max-w-xs">Volver</Link>
        </header>
        <LoginPanel />
      </section>
    </main>
  );
}
