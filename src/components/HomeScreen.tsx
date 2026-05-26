"use client";

import { motion } from "framer-motion";
import { Brain, Gavel, Music, Sparkles } from "lucide-react";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";
import { useTribunalStore } from "@/store/tribunalStore";
import { isDebugEnabled } from "@/data/demoConfig";
import { getCorruptionForLabel } from "@/data/menuCorruptions";
import { DemoVersionBadge } from "./demo/DemoVersionBadge";
import { DynamicBackground } from "./ui/DynamicBackground";
import { FactionSelector } from "./FactionSelector";

export function HomeScreen() {
  const phase = useGameStore((state) => state.phase);
  const goToFactions = useGameStore((state) => state.goToFactions);
  const menuCorrupted = useTribunalStore((state) => state.activeEvent?.type === "menu_corruption" && !state.reduceCorruptionVisuals && !state.stableMode);
  const label = (text: string) => (menuCorrupted ? getCorruptionForLabel(text)?.corrupted ?? text : text);

  if (phase === "factions") return <FactionSelector />;

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-10 text-white">
      <DynamicBackground id="tribunal-craneo" />
      <div className="absolute inset-0 court-fog opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(242,211,123,0.15),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(159,92,255,0.16),transparent_30%)]" />
      <section className="relative z-10 grid w-full max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-md border border-amber-100/20 bg-black/40 px-3 py-2 text-sm font-black uppercase text-amber-100/80">
            <Gavel size={16} />
            Vertical slice publico
          </div>
          <DemoVersionBadge />
          <div>
            <h1 className="max-w-5xl text-5xl font-black leading-none text-white md:text-7xl">
              Saboteadores Mentales: Habitantes Invisibles
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
              Un duelo tactico offline donde pensamientos automaticos declaran, crisis hacen solos de guitarra y el
              Juez Interior intenta condenarte por existir antes del desayuno.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={goToFactions}
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-amber-200 px-5 text-sm font-black uppercase text-black transition hover:bg-white"
            >
              <Sparkles size={18} />
              {label("Elegir facciones")}
            </button>
            <Link
              href="/demo"
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-5 text-sm font-black uppercase text-black transition hover:bg-amber-100"
            >
              <Sparkles size={18} />
              Demo vertical slice
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-cyan-100/25 bg-cyan-300/10 px-5 text-sm font-black uppercase text-cyan-100 transition hover:bg-cyan-300/18"
            >
              Primera citacion
            </Link>
            <Link
              href="/trailer-mode"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-red-100/25 bg-red-500/10 px-5 text-sm font-black uppercase text-red-100 transition hover:bg-red-500/18"
            >
              Trailer mode
            </Link>
            <Link
              href="/press-kit"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-amber-100/25 bg-amber-300/10 px-5 text-sm font-black uppercase text-amber-100 transition hover:bg-amber-300/18"
            >
              Press kit
            </Link>
            <Link
              href="/branding"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-amber-100/25 bg-amber-300/10 px-5 text-sm font-black uppercase text-amber-100 transition hover:bg-amber-300/18"
            >
              Branding
            </Link>
            <Link
              href="/legal"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/12 bg-black/35 px-5 text-sm font-black uppercase text-white/76 transition hover:bg-white/10"
            >
              Legal
            </Link>
            <Link
              href="/account"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-cyan-100/25 bg-cyan-300/10 px-5 text-sm font-black uppercase text-cyan-100 transition hover:bg-cyan-300/18"
            >
              Cuenta
            </Link>
            <Link
              href="/sync"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-blue-100/25 bg-blue-300/10 px-5 text-sm font-black uppercase text-blue-100 transition hover:bg-blue-300/18"
            >
              Sync nube
            </Link>
            <Link
              href="/campaign"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-amber-100/25 bg-amber-100/10 px-5 text-sm font-black uppercase text-amber-100 transition hover:bg-amber-100/18"
            >
              <Gavel size={18} />
              Modo campana
            </Link>
            <Link
              href="/collection"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/12 bg-black/35 px-5 text-sm font-black uppercase text-white/76 transition hover:bg-white/10"
            >
              {label("Coleccion")}
            </Link>
            <Link
              href="/packs"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/12 bg-black/35 px-5 text-sm font-black uppercase text-white/76 transition hover:bg-white/10"
            >
              Sobres
            </Link>
            <Link
              href="/profile"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/12 bg-black/35 px-5 text-sm font-black uppercase text-white/76 transition hover:bg-white/10"
            >
              {label("Perfil")}
            </Link>
            <Link
              href="/cosmetics"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-pink-100/20 bg-pink-300/10 px-5 text-sm font-black uppercase text-pink-100 transition hover:bg-pink-300/18"
            >
              Cosmeticos
            </Link>
            <Link
              href="/lore"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-violet-100/20 bg-violet-300/10 px-5 text-sm font-black uppercase text-violet-100 transition hover:bg-violet-300/18"
            >
              Codex de lore
            </Link>
            <Link
              href="/missions"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-emerald-100/20 bg-emerald-300/10 px-5 text-sm font-black uppercase text-emerald-100 transition hover:bg-emerald-300/18"
            >
              Misiones
            </Link>
            <Link
              href="/game-modes"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-fuchsia-100/20 bg-fuchsia-300/10 px-5 text-sm font-black uppercase text-fuchsia-100 transition hover:bg-fuchsia-300/18"
            >
              Modos especiales
            </Link>
            <Link
              href="/multiplayer"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-emerald-100/25 bg-emerald-300/10 px-5 text-sm font-black uppercase text-emerald-100 transition hover:bg-emerald-300/18"
            >
              Multiplayer
            </Link>
            <Link
              href="/editor"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-amber-100/25 bg-amber-300/10 px-5 text-sm font-black uppercase text-amber-100 transition hover:bg-amber-300/18"
            >
              Editor interno
            </Link>
            <Link
              href="/mods"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-violet-100/25 bg-violet-300/10 px-5 text-sm font-black uppercase text-violet-100 transition hover:bg-violet-300/18"
            >
              Mods locales
            </Link>
            <Link
              href="/world"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-cyan-100/25 bg-cyan-300/10 px-5 text-sm font-black uppercase text-cyan-100 transition hover:bg-cyan-300/18"
            >
              <Brain size={18} />
              Universo del Tribunal
            </Link>
            <Link
              href="/economy"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-emerald-100/25 bg-emerald-300/10 px-5 text-sm font-black uppercase text-emerald-100 transition hover:bg-emerald-300/18"
            >
              Economia
            </Link>
            <Link
              href="/progression"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-blue-100/25 bg-blue-300/10 px-5 text-sm font-black uppercase text-blue-100 transition hover:bg-blue-300/18"
            >
              Progresion
            </Link>
            {isDebugEnabled ? (
              <>
                <Link
                  href="/balance-debug"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/15 bg-white/8 px-5 text-sm font-black uppercase text-white/70 transition hover:bg-white/14"
                >
                  Balance debug
                </Link>
                <Link
                  href="/debug"
                  className="inline-flex min-h-12 items-center gap-2 rounded-md border border-red-100/20 bg-red-950/20 px-5 text-sm font-black uppercase text-red-100 transition hover:bg-red-950/32"
                >
                  QA debug
                </Link>
              </>
            ) : null}
            <Link
              href="/bosses"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-red-100/25 bg-red-500/10 px-5 text-sm font-black uppercase text-red-100 transition hover:bg-red-500/18"
            >
              <Gavel size={18} />
              Bosses colosales
            </Link>
            <Link
              href="/cinematics"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-amber-100/25 bg-amber-300/10 px-5 text-sm font-black uppercase text-amber-100 transition hover:bg-amber-300/18"
            >
              Cinematicas
            </Link>
            <Link
              href="/finale"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 text-sm font-black uppercase text-white transition hover:bg-white/16"
            >
              Final interactivo
            </Link>
            <Link
              href="/evolution"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-lime-100/20 bg-lime-300/10 px-5 text-sm font-black uppercase text-lime-100 transition hover:bg-lime-300/18"
            >
              Evolucion
            </Link>
            <Link
              href="/corruption"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-red-100/20 bg-red-500/10 px-5 text-sm font-black uppercase text-red-100 transition hover:bg-red-500/18"
            >
              Corrupcion
            </Link>
            <Link
              href="/achievements"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-amber-100/25 bg-amber-100/10 px-5 text-sm font-black uppercase text-amber-100 transition hover:bg-amber-100/18"
            >
              Logros
            </Link>
            <Link
              href="/stats"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-rose-100/20 bg-rose-300/10 px-5 text-sm font-black uppercase text-rose-100 transition hover:bg-rose-300/18"
            >
              Estadisticas
            </Link>
            <Link
              href="/deck-builder"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-amber-100/25 bg-amber-100/10 px-5 text-sm font-black uppercase text-amber-100 transition hover:bg-amber-100/18"
            >
              {label("Constructor")}
            </Link>
            <Link
              href="/extreme-judgment/setup"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-rose-100/25 bg-rose-500/10 px-5 text-sm font-black uppercase text-rose-100 transition hover:bg-rose-500/18"
            >
              <Gavel size={18} />
              Juicio Extremo
            </Link>
            <Link
              href="/settings"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-cyan-100/20 bg-cyan-300/10 px-5 text-sm font-black uppercase text-cyan-100 transition hover:bg-cyan-300/18"
            >
              <Music size={18} />
              {label("Ajustes audio")}
            </Link>
            <Link
              href="/audio"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-fuchsia-100/20 bg-fuchsia-300/10 px-5 text-sm font-black uppercase text-fuchsia-100 transition hover:bg-fuchsia-300/18"
            >
              Audio vivo
            </Link>
            <Link
              href="/settings/language"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-violet-100/20 bg-violet-300/10 px-5 text-sm font-black uppercase text-violet-100 transition hover:bg-violet-300/18"
            >
              Idioma
            </Link>
            <div className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/12 bg-black/35 px-4 text-sm text-white/65">
              <Music size={18} />
              Sonidos sinteticos, rayos internos y dramatismo legal
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative min-h-[540px] overflow-hidden rounded-lg border border-amber-100/15 bg-black/45 p-5"
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(242,211,123,0.12),transparent_38%,rgba(159,92,255,0.14))]" />
          <div className="relative grid h-full grid-cols-2 gap-4">
            {["Fiscalia del Juez", "Guerra de pensamientos", "Niebla de culpa", "Claridad blindada"].map((label, index) => (
              <motion.div
                key={label}
                animate={{ y: [0, index % 2 ? 12 : -12, 0] }}
                transition={{ duration: 4 + index, repeat: Infinity }}
                className="flex items-end rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <Brain className="mb-3 text-amber-100" size={24} />
                  <p className="text-2xl font-black text-white/86">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
