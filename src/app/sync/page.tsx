import Link from "next/link";
import { CloudSaveButton } from "@/components/cloud/CloudSaveButton";
import { ConflictResolverPanel } from "@/components/cloud/ConflictResolverPanel";
import { SyncStatusBadge } from "@/components/cloud/SyncStatusBadge";

export default function SyncPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Sincronizacion</p>
          <h1 className="mt-2 text-5xl font-black">El expediente aprende a viajar</h1>
          <p className="mt-3 max-w-3xl text-white/64">Supabase es opcional. Sin variables configuradas, todo queda local y offline.</p>
          <Link href="/" className="campaign-choice mt-4 max-w-xs">Menu</Link>
        </header>
        <SyncStatusBadge />
        <CloudSaveButton />
        <ConflictResolverPanel />
      </section>
    </main>
  );
}
