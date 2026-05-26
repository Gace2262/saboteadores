import type { Card } from "@/data/cards";
import type { DemoCard, DemoCombatant } from "@/types/game";

export type CombatantSnapshot = {
  will: number;
  clarity: number;
  stress: number;
  mentalNoise: number;
  block: number;
  mask: number;
};

export type ResolveInput = {
  card: Card;
  caster: "player" | "enemy";
  player: CombatantSnapshot;
  enemy: CombatantSnapshot;
  hand: Card[];
  discard: Card[];
  enemyHand: Card[];
  enemyDiscard: Card[];
  lastResolvedCard?: Card;
  maxWill: number;
  maxClarity: number;
  maxStress: number;
  randomSeed?: number;
};

export type SimpleResolveInput = {
  card: DemoCard;
  caster: "player" | "enemy";
  player: DemoCombatant;
  enemy: DemoCombatant;
  hand: DemoCard[];
  enemyHand: DemoCard[];
  deck: DemoCard[];
  enemyDeck: DemoCard[];
};

export type SimpleResolveOutput = {
  player: DemoCombatant;
  enemy: DemoCombatant;
  hand: DemoCard[];
  enemyHand: DemoCard[];
  deck: DemoCard[];
  enemyDeck: DemoCard[];
  lines: string[];
};

const simpleClamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function resolveSimpleCardEffect(input: SimpleResolveInput): SimpleResolveOutput {
  const target = input.caster === "player" ? input.enemy : input.player;
  const self = input.caster === "player" ? input.player : input.enemy;
  const lines: string[] = [];
  const nextTarget = { ...target };
  const nextSelf = { ...self };
  let hand = [...input.hand];
  let enemyHand = [...input.enemyHand];
  const deck = [...input.deck];
  const enemyDeck = [...input.enemyDeck];

  if (input.card.damage > 0) {
    const damage = input.caster === "enemy" && nextSelf.will <= 15 ? input.card.damage + 2 : input.card.damage;
    nextTarget.will = simpleClamp(nextTarget.will - damage, 0, 99);
    lines.push(`${input.card.name} hace ${damage} de dano.`);
  }
  if (input.card.heal > 0) {
    nextSelf.will = simpleClamp(nextSelf.will + input.card.heal, 0, input.caster === "enemy" ? 45 : 30);
    lines.push(`${input.card.name} cura ${input.card.heal} Voluntad.`);
  }
  if (input.card.stress !== 0) {
    nextSelf.stress = simpleClamp(nextSelf.stress + input.card.stress, 0, 12);
    lines.push(input.card.stress > 0 ? `Ganas ${input.card.stress} Estres.` : `Reduces ${Math.abs(input.card.stress)} Estres.`);
  }
  if (input.card.clarity !== 0) {
    nextSelf.clarity = simpleClamp(nextSelf.clarity + input.card.clarity, 0, 10);
    lines.push(`Ganas ${input.card.clarity} Claridad.`);
  }
  if (input.card.block) {
    nextTarget.blocked = true;
    lines.push("El proximo turno rival queda bloqueado.");
  }
  for (let index = 0; index < input.card.draw; index += 1) {
    if (input.caster === "player") {
      const drawn = deck.shift();
      if (drawn) hand.push(drawn);
    } else {
      const drawn = enemyDeck.shift();
      if (drawn) enemyHand.push(drawn);
    }
  }
  if (input.card.discardRandom) {
    if (input.caster === "player" && enemyHand.length) enemyHand = enemyHand.slice(1);
    if (input.caster === "enemy" && hand.length) hand = hand.slice(1);
    lines.push("Una carta rival se descarta al azar. Azar con toga, pero azar.");
  }

  return input.caster === "player"
    ? { player: nextSelf, enemy: nextTarget, hand, enemyHand, deck, enemyDeck, lines }
    : { player: nextTarget, enemy: nextSelf, hand, enemyHand, deck, enemyDeck, lines };
}

export type ResolveOutput = {
  player: CombatantSnapshot;
  enemy: CombatantSnapshot;
  hand: Card[];
  discard: Card[];
  enemyHand: Card[];
  enemyDiscard: Card[];
  dramaticLines: string[];
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const discardFrom = (hand: Card[], amount: number) => ({
  kept: hand.slice(amount),
  removed: hand.slice(0, amount),
});

const applyDamage = (
  target: CombatantSnapshot,
  amount: number,
  maxWill: number,
  dramaticLines: string[],
  targetName: string,
) => {
  if (amount <= 0) return target;
  if (target.mask > 0) {
    dramaticLines.push(`${targetName} evita ${amount} de dano con una mascara impecable y emocionalmente carisima.`);
    return { ...target, mask: target.mask - 1 };
  }
  return { ...target, will: clamp(target.will - amount, 0, maxWill) };
};

const resolveSingleCard = (input: ResolveInput, recursive = false): ResolveOutput => {
  const { card, caster, maxWill, maxClarity, maxStress } = input;
  let player = { ...input.player };
  let enemy = { ...input.enemy };
  let hand = [...input.hand];
  let discard = [...input.discard];
  let enemyHand = [...input.enemyHand];
  let enemyDiscard = [...input.enemyDiscard];
  const dramaticLines: string[] = [];

  const self = caster === "player" ? player : enemy;
  const rival = caster === "player" ? enemy : player;
  const selfName = caster === "player" ? "La defensa" : "El Juez";
  const rivalName = caster === "player" ? "El Juez" : "La defensa";
  const rivalHandCount = caster === "player" ? enemyHand.length : hand.length;

  let damage = card.willpowerDamage;
  let selfWill = self.will;
  let selfClarity = self.clarity;
  let selfStress = self.stress;
  let selfNoise = self.mentalNoise;
  const selfBlock = self.block;
  let selfMask = self.mask;
  const rivalWill = rival.will;
  let rivalClarity = rival.clarity;
  const rivalStress = rival.stress;
  const rivalNoise = rival.mentalNoise;
  let rivalBlock = rival.block;
  const rivalMask = rival.mask;

  selfStress = clamp(selfStress + card.stressGain, 0, maxStress);
  selfClarity = clamp(selfClarity + card.clarityGain, 0, maxClarity);
  selfNoise = clamp(selfNoise + card.mentalNoise, 0, maxStress);

  if (card.keywords.includes("Sentencia")) {
    const bonus = rivalStress >= 5 ? 3 : 0;
    damage += bonus;
    dramaticLines.push(
      bonus
        ? "Sentencia: el Estres alto del rival firma su propia condena con tinta dorada."
        : "Sentencia: el martillo cae, aunque el expediente aun no estaba suficientemente ardiendo.",
    );
  }

  if (card.keywords.includes("Cadena")) {
    rivalBlock = clamp(rivalBlock + 1, 0, 3);
    if (card.willpowerDamage === 0) selfWill = clamp(selfWill + 3, 0, maxWill);
    dramaticLines.push("Cadena: el rival queda atado a un procedimiento interno innecesario.");
  }

  if (card.keywords.includes("Culpa")) {
    rivalClarity = clamp(rivalClarity - 2, 0, maxClarity);
    dramaticLines.push("Culpa: la Claridad rival baja mientras alguien abre una planilla de verguenza.");
  }

  if (card.keywords.includes("Derrumbe")) {
    const amount = card.id === "funeral-plan-b" ? 2 : 1;
    if (caster === "player") {
      const result = discardFrom(enemyHand, amount);
      enemyHand = result.kept;
      enemyDiscard = [...enemyDiscard, ...result.removed];
    } else {
      const result = discardFrom(hand, amount);
      hand = result.kept;
      discard = [...discard, ...result.removed];
    }
    dramaticLines.push(`Derrumbe: ${rivalName} descarta ${amount} carta${amount > 1 ? "s" : ""}.`);
  }

  if (card.keywords.includes("Estampida")) {
    const stampedeDamage =
      card.id === "caballeria-pendientes" ? rivalHandCount : Math.max(rivalHandCount, Math.floor(selfStress / 2));
    damage += stampedeDamage;
    dramaticLines.push(`Estampida: ${stampedeDamage} de dano extra, porque hasta la lista de tareas exige protagonismo.`);
  }

  if (card.keywords.includes("Mascara")) {
    selfMask = clamp(selfMask + 1, 0, 3);
    dramaticLines.push("Mascara: el proximo dano se evita con una actuacion digna de premio municipal.");
  }

  if (card.keywords.includes("Despertar")) {
    selfNoise = clamp(selfNoise - 2, 0, maxStress);
    selfWill = clamp(selfWill + 2, 0, maxWill);
    dramaticLines.push("Despertar: cae ruido mental y la Voluntad vuelve con casco reglamentario.");
  }

  if (card.keywords.includes("Obsesion")) {
    selfStress = clamp(selfStress + 2, 0, maxStress);
    if (input.lastResolvedCard && !recursive) {
      const repeated = resolveSingleCard(
        {
          ...input,
          card: input.lastResolvedCard,
          player: caster === "player" ? { ...self, will: selfWill, clarity: selfClarity, stress: selfStress, mentalNoise: selfNoise, block: selfBlock, mask: selfMask } : player,
          enemy: caster === "enemy" ? { ...self, will: selfWill, clarity: selfClarity, stress: selfStress, mentalNoise: selfNoise, block: selfBlock, mask: selfMask } : enemy,
          hand,
          discard,
          enemyHand,
          enemyDiscard,
          lastResolvedCard: undefined,
        },
        true,
      );
      player = repeated.player;
      enemy = repeated.enemy;
      hand = repeated.hand;
      discard = repeated.discard;
      enemyHand = repeated.enemyHand;
      enemyDiscard = repeated.enemyDiscard;
      dramaticLines.push("Obsesion: se repite el ultimo efecto, porque el cerebro pidio otra funcion.");
      dramaticLines.push(...repeated.dramaticLines);
      return { player, enemy, hand, discard, enemyHand, enemyDiscard, dramaticLines };
    }
    dramaticLines.push("Obsesion: no habia efecto anterior, asi que solo quedo la ansiedad haciendo calentamiento.");
  }

  if (card.keywords.includes("Ironia")) {
    const roll = Math.floor(((input.randomSeed ?? Date.now()) % 997) % 4);
    if (roll === 0) {
      damage += 4;
      dramaticLines.push("Ironia: dano gratis. Sospechoso, pero por fin util.");
    }
    if (roll === 1) {
      const result = caster === "player" ? discardFrom(enemyHand, 1) : discardFrom(hand, 1);
      if (caster === "player") {
        enemyHand = result.kept;
        enemyDiscard = [...enemyDiscard, ...result.removed];
      } else {
        hand = result.kept;
        discard = [...discard, ...result.removed];
      }
      dramaticLines.push("Ironia: descarte aleatorio. El caos trajo curriculum.");
    }
    if (roll === 2) {
      selfStress = clamp(selfStress + 2, 0, maxStress);
      dramaticLines.push("Ironia: ganas Estres. La broma eras tu, felicidades.");
    }
    if (roll === 3) {
      selfWill = clamp(selfWill + 4, 0, maxWill);
      dramaticLines.push("Ironia: curacion inesperada. Hasta el sarcasmo tuvo un dia amable.");
    }
  }

  if (card.keywords.includes("Catarsis")) {
    damage += selfStress;
    dramaticLines.push(`Catarsis: ${selfStress} de Estres se convierte en dano y luego deja de gritar.`);
    selfStress = 0;
  }

  const damagedRival = applyDamage(
    { ...rival, will: rivalWill, clarity: rivalClarity, stress: rivalStress, mentalNoise: rivalNoise, block: rivalBlock, mask: rivalMask },
    damage,
    maxWill,
    dramaticLines,
    rivalName,
  );

  const updatedSelf = {
    ...self,
    will: selfWill,
    clarity: selfClarity,
    stress: selfStress,
    mentalNoise: selfNoise,
    block: selfBlock,
    mask: selfMask,
  };

  if (caster === "player") {
    player = updatedSelf;
    enemy = damagedRival;
  } else {
    enemy = updatedSelf;
    player = damagedRival;
  }

  dramaticLines.unshift(`${selfName} ejecuta ${card.name}: ${card.darkHumorText}`);
  return { player, enemy, hand, discard, enemyHand, enemyDiscard, dramaticLines };
};

export function resolveCardEffect(input: ResolveInput): ResolveOutput {
  return resolveSingleCard(input);
}
