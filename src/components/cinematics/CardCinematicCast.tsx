"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Card } from "@/data/cards";
import { Card3D } from "@/components/3d/Card3D";
import { useVisualStore } from "@/store/visualStore";
import { getCardCinematic } from "@/logic/visual/getCardCinematic";
import { getRarityAnimation } from "@/logic/visual/getRarityAnimation";
import { JudgmentHammerScene } from "./JudgmentHammerScene";
import { ChainsBindingScene } from "./ChainsBindingScene";
import { HorseStampedeScene } from "./HorseStampedeScene";
import { CatarsisBreakScene } from "./CatarsisBreakScene";
import { CursedCardScene } from "./CursedCardScene";

export function CardCinematicCast({
  card,
  impactText,
  onComplete,
  reducedMotion,
}: {
  card?: Card;
  target?: "player" | "enemy";
  effectType?: string;
  impactText?: string;
  onComplete?: () => void;
  reducedMotion?: boolean;
}) {
  const animationMode = useVisualStore((state) => state.animationMode);
  const clearCinematic = useVisualStore((state) => state.clearCinematic);
  const disableFlashes = useVisualStore((state) => state.disableFlashes);
  const activeReduced = reducedMotion || animationMode !== "full";
  const cinematic = getCardCinematic(card);
  const rarity = card ? getRarityAnimation(card.rarity) : undefined;
  const duration = animationMode === "minimal" ? 260 : activeReduced ? 650 : Math.round((rarity?.castDuration ?? 1) * 1000);

  useEffect(() => {
    if (!card) return;
    const timer = window.setTimeout(() => {
      clearCinematic();
      onComplete?.();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [card, clearCinematic, duration, onComplete]);

  if (!card) return null;

  const text = impactText ?? cinematic.phrase;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[62] overflow-hidden bg-black/72"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {!disableFlashes && cinematic.type === "hammer_slam" ? <JudgmentHammerScene text={text} reducedMotion={activeReduced} /> : null}
        {cinematic.type === "chains" ? <ChainsBindingScene text={text} reducedMotion={activeReduced} /> : null}
        {cinematic.type === "horse_stampede" ? <HorseStampedeScene text={text} reducedMotion={activeReduced} /> : null}
        {cinematic.type === "liberation_burst" ? <CatarsisBreakScene text={text} reducedMotion={activeReduced} /> : null}
        {(cinematic.type === "cursed_static" || card.rarity === "maldita") ? <CursedCardScene text={text} reducedMotion={activeReduced} /> : null}
        {["guilt_rain", "panic_pulse", "void_laugh", "default"].includes(cinematic.type) ? (
          <div className="absolute inset-0 grid place-items-center bg-black/55">
            <motion.div
              className="w-72"
              initial={{ y: 120, scale: 0.8, rotateY: -45, opacity: 0 }}
              animate={{ y: 0, scale: rarity?.cinematicScale ?? 1, rotateY: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: activeReduced ? 0.25 : 0.65 }}
            >
              <Card3D card={card} state="casting" />
            </motion.div>
            <motion.p className="absolute bottom-[16%] px-5 text-center text-3xl font-black uppercase text-amber-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {text}
            </motion.p>
          </div>
        ) : null}
        {cinematic.type !== "default" ? (
          <motion.div
            className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2"
            initial={{ y: 100, scale: 0.65, rotateY: -55, opacity: 0 }}
            animate={{ y: 0, scale: activeReduced ? 0.86 : 0.98, rotateY: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: activeReduced ? 0.2 : 0.55 }}
          >
            <Card3D card={card} state="casting" />
          </motion.div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}
