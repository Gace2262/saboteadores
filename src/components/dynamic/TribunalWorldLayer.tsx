"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCollectionStore } from "@/store/collectionStore";
import { useEvolutionStore } from "@/store/evolutionStore";
import { useExtremeJudgmentStore } from "@/store/extremeJudgmentStore";
import { useGameStore } from "@/store/gameStore";
import { useProgressionStore } from "@/store/progressionStore";
import { useTribunalStore } from "@/store/tribunalStore";
import { AnomalyOverlay } from "./AnomalyOverlay";
import { CardConversationOverlay } from "./CardConversationOverlay";
import { CorruptedMenuEffect } from "./CorruptedMenuEffect";
import { DynamicNarrator } from "./DynamicNarrator";
import { JudgePresenceMeter } from "./JudgePresenceMeter";
import { TribunalInterruption } from "./TribunalInterruption";

export function TribunalWorldLayer() {
  const pathname = usePathname();
  const visitScreen = useTribunalStore((state) => state.visitScreen);
  const absorbContext = useTribunalStore((state) => state.absorbContext);
  const recordStress = useTribunalStore((state) => state.recordStress);
  const selectedFactions = useGameStore((state) => state.selectedFactions);
  const playerStress = useGameStore((state) => state.player.stress);
  const stats = useProgressionStore((state) => state.stats);
  const cardProgressions = useEvolutionStore((state) => state.cards);
  const attempts = useExtremeJudgmentStore((state) => state.attempts);
  const storyMode = useCollectionStore((state) => state.storyMode);

  useEffect(() => {
    visitScreen(pathname);
  }, [pathname, visitScreen]);

  useEffect(() => {
    recordStress(playerStress);
  }, [playerStress, recordStress]);

  useEffect(() => {
    if (storyMode === "combat-only") return;
    absorbContext({
      stats,
      cardProgressions,
      selectedFactions,
      extremeRuns: attempts.length,
    });
  }, [absorbContext, attempts.length, cardProgressions, selectedFactions, stats, storyMode]);

  return (
    <>
      <CorruptedMenuEffect />
      <TribunalInterruption />
      <AnomalyOverlay />
      <CardConversationOverlay />
      <DynamicNarrator />
      <JudgePresenceMeter />
    </>
  );
}
