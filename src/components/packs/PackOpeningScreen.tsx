"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CardEffectLayer } from "@/components/effects/CardEffectLayer";
import { useSoundEffect } from "@/components/audio/useSoundEffect";
import type { Card } from "@/data/cards";
import type { PackId } from "@/data/packs";
import { getPack } from "@/data/packs";
import { rarityDefinitions } from "@/data/rarities";
import { useCollectionStore } from "@/store/collectionStore";
import { DynamicBackground } from "@/components/ui/DynamicBackground";
import { PackCardReveal } from "./PackCardReveal";
import { PackSelector } from "./PackSelector";

export function PackOpeningScreen() {
  const openPack = useCollectionStore((state) => state.openPack);
  const lastOpenedCards = useCollectionStore((state) => state.lastOpenedCards);
  const [selectedPack, setSelectedPack] = useState<PackId | null>(null);
  const [opened, setOpened] = useState<Card[]>(lastOpenedCards);
  const [effect, setEffect] = useState<Card["visualEffect"] | undefined>();
  const playSound = useSoundEffect(false);

  const open = (packId: PackId) => {
    setSelectedPack(packId);
    setOpened([]);
    const cards = openPack(packId);
    const strongest = [...cards].sort((a, b) => rarityDefinitions[b.rarity].weight - rarityDefinitions[a.rarity].weight)[0];
    setEffect(strongest?.visualEffect);
    if (strongest) playSound(rarityDefinitions[strongest.rarity].combatVisual);
    window.setTimeout(() => {
      setOpened(cards);
      setEffect(undefined);
    }, 850);
  };

  const pack = selectedPack ? getPack(selectedPack) : undefined;

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 text-white">
      <DynamicBackground id="grimorio" />
      <CardEffectLayer effect={effect} impactText={effect ? "El sello mental se rompe." : undefined} reducedMotion={false} />
      <div className="absolute inset-0 neural-map-bg opacity-80" />
      <section className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="mb-6">
          <p className="text-sm font-black uppercase text-amber-100/65">Sobres</p>
          <h1 className="mt-2 text-5xl font-black">Grietas mentales selladas</h1>
          <p className="mt-3 max-w-3xl text-white/62">
            Abrir un sobre no cuesta dinero real. Cuesta la dignidad teatral de admitir que quieres ver que sale.
          </p>
        </header>
        <PackSelector onOpen={open} />
        {pack ? (
          <motion.div
            className="mx-auto mt-8 grid min-h-52 max-w-md place-items-center rounded-lg border border-amber-100/20 bg-black/58 p-8 text-center"
            animate={{ scale: [1, 1.025, 1], opacity: [0.88, 1, 0.88] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            <h2 className="text-3xl font-black text-amber-100">{pack.name}</h2>
            <p className="mt-3 text-white/65">{pack.phrase}</p>
          </motion.div>
        ) : null}
        {opened.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {opened.map((card, index) => (
              <PackCardReveal key={`${card.id}-${index}`} card={card} index={index} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
