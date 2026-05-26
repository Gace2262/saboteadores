import Link from "next/link";
import { AudioSettingsPanel } from "@/components/settings/AudioSettingsPanel";
import { AccessibilityPanel } from "@/components/settings/AccessibilityPanel";
import { UserMenu } from "@/components/auth/UserMenu";
import { CloudSaveButton } from "@/components/cloud/CloudSaveButton";
import { SyncStatusBadge } from "@/components/cloud/SyncStatusBadge";

export default function SettingsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <div className="absolute inset-0 court-fog opacity-80" />
      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="lg:col-span-2 rounded-lg border border-amber-100/18 bg-black/58 p-6">
          <p className="text-sm font-black uppercase text-amber-100/70">Ajustes</p>
          <h1 className="mt-2 text-5xl font-black">Direccion audiovisual</h1>
          <p className="mt-3 max-w-3xl text-white/64">
            Controla musica dinamica, voces sintetizadas, efectos, ambiente, subtitulos y reduccion sensorial.
          </p>
          <Link className="campaign-choice mt-4 max-w-44" href="/">
            Volver
          </Link>
        </div>
        <AudioSettingsPanel />
        <AccessibilityPanel />
        <div className="grid gap-4 lg:col-span-2 lg:grid-cols-[320px_1fr]">
          <div className="grid gap-4">
            <SyncStatusBadge />
            <UserMenu />
          </div>
          <CloudSaveButton />
        </div>
      </section>
    </main>
  );
}
