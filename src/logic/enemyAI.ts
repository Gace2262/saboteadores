import type { DemoCard, DemoCombatant } from "@/types/game";

export function chooseEnemyCard(enemy: DemoCombatant, player: DemoCombatant, hand: DemoCard[]) {
  const playable = hand.filter((card) => card.cost <= enemy.clarity);
  if (!playable.length) return undefined;
  const lethal = playable.find((card) => card.damage >= player.will);
  if (lethal) return lethal;
  const heal = playable.find((card) => enemy.will <= 15 && card.heal > 0);
  if (heal) return heal;
  const block = playable.find((card) => card.block);
  if (block && (enemy.will < 25 || player.clarity >= 5)) return block;
  return playable.sort((a, b) => b.damage + b.heal - (a.damage + a.heal))[0];
}
