import Link from "next/link";
import { UserMenu } from "@/components/auth/UserMenu";
import { CloudSaveButton } from "@/components/cloud/CloudSaveButton";
import { SyncStatusBadge } from "@/components/cloud/SyncStatusBadge";

export default function AccountPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 bg-grimorio-mental" />
      <section className="relative z-10 mx-auto grid w-full max-w-5xl gap-5">
        <header className="rounded-lg border border-amber-100/18 bg-black/62 p-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Cuenta</p>
          <h1 className="mt-2 text-5xl font-black">Expediente en la nube</h1>
          <Link href="/profile" className="campaign-choice mt-4 max-w-xs">Perfil</Link>
        </header>
        <SyncStatusBadge />
        <UserMenu />
        <CloudSaveButton />
      </section>
    </main>
  );
}
