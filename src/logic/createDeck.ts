import { demoCoreCards } from "@/data/cards";
import { perfeccionistaAscendido } from "@/data/enemies";
import { getRealDemoDeck } from "@/data/demoDecks";
import type { DemoCard, DemoDeckId } from "@/types/game";

export function shuffleDeck(cards: DemoCard[], seed = Date.now()) {
  const result = [...cards];
  let state = seed;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function createPlayerDeck(deckId: DemoDeckId) {
  const ids = getRealDemoDeck(deckId).cardIds;
  const cards = ids.map((id) => demoCoreCards.find((card) => card.id === id)).filter(Boolean) as DemoCard[];
  return shuffleDeck([...cards, ...cards, ...cards], deckId.length * 1009);
}

export function createEnemyDeck() {
  const cards = perfeccionistaAscendido.deckIds.map((id) => demoCoreCards.find((card) => card.id === id)).filter(Boolean) as DemoCard[];
  return shuffleDeck([...cards, ...cards, ...cards, ...cards], 37045);
}
