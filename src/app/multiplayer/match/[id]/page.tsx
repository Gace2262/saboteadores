import Link from "next/link";
import { LocalMatchSetup } from "@/components/multiplayer/LocalMatchSetup";
import { ReconnectOverlay } from "@/components/multiplayer/ReconnectOverlay";

export default function MultiplayerMatchPage({ params }: { params: { id: string } }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <Link href="/multiplayer" className="campaign-choice mb-5 max-w-xs">Salir de {params.id}</Link>
        <LocalMatchSetup />
      </section>
      <ReconnectOverlay visible={false} />
    </main>
  );
}
