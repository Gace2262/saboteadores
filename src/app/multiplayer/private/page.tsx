import Link from "next/link";
import { PrivateRoomPanel } from "@/components/multiplayer/PrivateRoomPanel";

export default function PrivateMatchPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto w-full max-w-5xl">
        <Link href="/multiplayer" className="campaign-choice mb-5 max-w-xs">Volver</Link>
        <PrivateRoomPanel />
      </section>
    </main>
  );
}
