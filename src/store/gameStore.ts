"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Card, judgeCards, playerCards, VisualEffect } from "@/data/cards";
import { FactionId, factions } from "@/data/factions";
import { resolveCardEffect } from "@/logic/resolveCardEffect";
import { aiDifficulties, defaultDifficulty } from "@/logic/ai/aiDifficulty";
import { getAIProfile } from "@/logic/ai/aiProfiles";
import { pickTaunt } from "@/logic/ai/aiTaunts";
import { chooseAICard } from "@/logic/ai/chooseAICard";
import type { AIDifficultyId } from "@/logic/ai/aiTypes";
import { useEvolutionStore } from "./evolutionStore";
import { useProgressionStore } from "./progressionStore";
import { useTribunalStore } from "./tribunalStore";
import type { DemoBattleResult, DemoCard, DemoCombatant, DemoDeckId, DemoVisualEffect } from "@/types/game";
import { createEnemyDeck, createPlayerDeck } from "@/logic/createDeck";
import { perfeccionistaAscendido } from "@/data/enemies";
import { chooseEnemyCard } from "@/logic/enemyAI";
import { resolveSimpleCardEffect } from "@/logic/resolveCardEffect";

export type CombatantResources = {
  will: number;
  clarity: number;
  stress: number;
  mentalNoise: number;
  block: number;
  mask: number;
};

export type ZoneCard = {
  card: Card;
  owner: "player" | "enemy";
};

export type CardCast = {
  id: number;
  card: Card;
  caster: "player" | "enemy";
};

export type GamePhase = "home" | "factions" | "battle" | "ended";

type GameState = {
  phase: GamePhase;
  selectedFactions: FactionId[];
  player: CombatantResources;
  enemy: CombatantResources;
  deck: Card[];
  hand: Card[];
  discard: Card[];
  enemyDeck: Card[];
  enemyHand: Card[];
  enemyDiscard: Card[];
  playZone: ZoneCard[];
  turn: number;
  log: string[];
  pendingCast?: CardCast;
  activeEffect?: VisualEffect;
  impactText?: string;
  aiProfileId: FactionId;
  aiDifficulty: AIDifficultyId;
  aiTaunt?: string;
  aiTauntColor?: string;
  aiActionsThisTurn: number;
  usedFactionsThisGame: FactionId[];
  usedTypesThisGame: string[];
  maxStressThisGame: number;
  muted: boolean;
  reducedMotion: boolean;
  winner?: "player" | "enemy";
  lastResolvedCard?: Card;
  goHome: () => void;
  goToFactions: () => void;
  toggleFaction: (id: FactionId) => void;
  setAIProfile: (id: FactionId) => void;
  setAIDifficulty: (id: AIDifficultyId) => void;
  startBattle: () => void;
  playCard: (cardId: string) => void;
  resolvePendingCast: () => void;
  enemyTurn: () => void;
  endTurn: () => void;
  dismissEffect: () => void;
  toggleMute: () => void;
  toggleReducedMotion: () => void;
};

const maxWill = 30;
const maxClarity = 10;
const maxStress = 12;
const defaultSelection: FactionId[] = ["controlador", "perfeccionista"];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

const draw = (deck: Card[], discard: Card[], hand: Card[], amount: number) => {
  let nextDeck = [...deck];
  let nextDiscard = [...discard];
  const nextHand = [...hand];

  for (let index = 0; index < amount; index += 1) {
    if (!nextDeck.length && nextDiscard.length) {
      nextDeck = shuffle(nextDiscard);
      nextDiscard = [];
    }
    const card = nextDeck.shift();
    if (card) nextHand.push(card);
  }

  return { deck: nextDeck, discard: nextDiscard, hand: nextHand };
};

const removeOneCard = (hand: Card[], cardId: string) => {
  const index = hand.findIndex((card) => card.id === cardId);
  if (index < 0) return hand;
  return [...hand.slice(0, index), ...hand.slice(index + 1)];
};

const buildPlayerDeck = (ids: FactionId[]) => {
  const selected = playerCards.filter((card) => ids.includes(card.faction));
  const showcase = playerCards.filter((card) => !ids.includes(card.faction));
  return shuffle([
    ...selected,
    ...selected.map((card) => ({ ...card, id: `${card.id}-echo` })),
    ...showcase,
  ]);
};

const buildEnemyDeck = (profileId: FactionId) => {
  if (profileId === "juez") return shuffle([...judgeCards, ...judgeCards, ...judgeCards]);
  const profileCards = playerCards.filter((card) => card.faction === profileId || card.keywords.some((keyword) => getAIProfile(profileId).pattern.preferredKeywords.includes(keyword)));
  const fallback = profileCards.length ? profileCards : playerCards.filter((card) => card.faction === "controlador");
  return shuffle([...fallback, ...fallback, ...fallback].slice(0, 24));
};

const makeInitial = (selectedFactions = defaultSelection, aiProfileId: FactionId = "juez") => {
  const deck = buildPlayerDeck(selectedFactions);
  const drawn = draw(deck, [], [], 5);
  const enemyDeck = buildEnemyDeck(aiProfileId);
  const enemyDrawn = draw(enemyDeck, [], [], 4);
  const profile = getAIProfile(aiProfileId);

  return {
    player: { will: maxWill, clarity: 4, stress: 0, mentalNoise: 0, block: 0, mask: 0 },
    enemy: { will: maxWill, clarity: 4, stress: 0, mentalNoise: 0, block: 0, mask: 0 },
    deck: drawn.deck,
    hand: drawn.hand,
    discard: [],
    enemyDeck: enemyDrawn.deck,
    enemyHand: enemyDrawn.hand,
    enemyDiscard: [],
    playZone: [],
    turn: 1,
    winner: undefined,
    pendingCast: undefined,
    activeEffect: undefined,
    impactText: undefined,
    lastResolvedCard: undefined,
    aiTaunt: pickTaunt(profile.taunts, "combatStart"),
    aiTauntColor: profile.personality.color,
    aiActionsThisTurn: 0,
    usedFactionsThisGame: [],
    usedTypesThisGame: [],
    maxStressThisGame: 0,
    log: [profile.pattern.openingLine, "El tribunal interior abre sesion. El martillo ya se cree protagonista."],
  };
};

export const useGameStore = create<GameState>((set, get) => ({
  phase: "home",
  selectedFactions: defaultSelection,
  ...makeInitial(defaultSelection),
  aiProfileId: "juez",
  aiDifficulty: defaultDifficulty,
  muted: false,
  reducedMotion: false,

  goHome: () => set({ phase: "home" }),
  goToFactions: () => set({ phase: "factions" }),

  toggleFaction: (id) =>
    set((state) => {
      if (id === "juez") return state;
      const exists = state.selectedFactions.includes(id);
      const selectedFactions = exists
        ? state.selectedFactions.filter((faction) => faction !== id)
        : [...state.selectedFactions, id].slice(-2);
      return { selectedFactions };
    }),

  setAIProfile: (id) => {
    const state = get();
    set({ aiProfileId: id, ...makeInitial(state.selectedFactions, id) });
  },

  setAIDifficulty: (id) => set({ aiDifficulty: id }),

  startBattle: () => {
    const state = get();
    set({ phase: "battle", ...makeInitial(state.selectedFactions, state.aiProfileId) });
  },

  playCard: (cardId) => {
    const state = get();
    if (state.phase !== "battle" || state.pendingCast) return;
    if (state.player.block > 0) {
      set({
        player: { ...state.player, block: state.player.block - 1 },
        log: ["Tu turno queda bloqueado por una cadena burocratica del Juez.", ...state.log].slice(0, 8),
      });
      return;
    }

    const card = state.hand.find((item) => item.id === cardId);
    if (!card || state.player.clarity < card.cost) return;

    set({
      player: { ...state.player, clarity: clamp(state.player.clarity - card.cost, 0, maxClarity) },
      hand: state.hand.filter((item) => item.id !== cardId),
      pendingCast: { id: Date.now(), card, caster: "player" },
      activeEffect: card.visualEffect,
      impactText: card.impactText,
      log: [`Preparas ${card.name}. El estrado contiene la respiracion.`, ...state.log].slice(0, 8),
    });
  },

  resolvePendingCast: () => {
    const state = get();
    if (!state.pendingCast) return;
    const { card, caster } = state.pendingCast;
    const next = resolveCardEffect({
      card,
      caster,
      player: state.player,
      enemy: state.enemy,
      hand: state.hand,
      discard: state.discard,
      enemyHand: state.enemyHand,
      enemyDiscard: state.enemyDiscard,
      lastResolvedCard: state.lastResolvedCard,
      maxWill,
      maxClarity,
      maxStress,
      randomSeed: Date.now(),
    });
    const winner = next.enemy.will <= 0 ? "player" : next.player.will <= 0 ? "enemy" : undefined;
    const phase = winner ? "ended" : state.phase;
    const profile = getAIProfile(state.aiProfileId);
    const taunt =
      winner === "player"
        ? pickTaunt(profile.taunts, "lose")
        : caster === "player" && state.enemy.will > next.enemy.will
          ? pickTaunt(profile.taunts, "takeDamage", Date.now() + card.name.length)
          : caster === "enemy" && card.rarity === "legendaria"
            ? pickTaunt(profile.taunts, "legendary", Date.now() + card.cost)
            : caster === "enemy" && card.keywords.includes("Cadena")
              ? pickTaunt(profile.taunts, "block", Date.now() + state.turn)
              : next.player.stress >= 7
                ? pickTaunt(profile.taunts, "playerStressHigh", Date.now() + next.player.stress)
                : next.player.will <= 8
                  ? pickTaunt(profile.taunts, "nearWin", Date.now() + next.player.will)
                : undefined;
    const usedFactionsThisGame =
      caster === "player" ? Array.from(new Set([...state.usedFactionsThisGame, card.faction])) : state.usedFactionsThisGame;
    const usedTypesThisGame =
      caster === "player" ? Array.from(new Set([...state.usedTypesThisGame, card.type])) : state.usedTypesThisGame;
    const maxStressThisGame = Math.max(state.maxStressThisGame, next.player.stress);

    if (caster === "player") {
      useProgressionStore.getState().recordCardPlayed({
        faction: card.faction,
        keywords: card.keywords,
        damage: Math.max(0, state.enemy.will - next.enemy.will),
        stressGain: Math.max(0, next.player.stress - state.player.stress),
        visualEffect: card.visualEffect,
        type: card.type,
      });
      useEvolutionStore.getState().recordCardUse({
        card,
        damage: Math.max(0, state.enemy.will - next.enemy.will),
        stressGain: Math.max(0, next.player.stress - state.player.stress),
        clarityGain: Math.max(0, next.player.clarity - state.player.clarity),
        bossId: state.aiProfileId,
        won: winner === "player",
        lost: winner === "enemy",
      });
      if (card.faction === "juez" || card.keywords.includes("Sentencia")) {
        useTribunalStore.getState().recordJudgeUse(card.rarity === "legendaria" ? 2 : 1);
      }
      if (card.id.includes("productividad-necromante")) {
        useTribunalStore.getState().setCardConversation(["Trabajemos mas.", "No.", "Cobarde.", "Funcional."]);
      }
      if (card.id.includes("casco-autoestima") && next.player.stress < state.player.stress) {
        useTribunalStore.getState().setCardConversation(["El estres esta subiendo. Excelente ambiente.", "No.", "Pero era productivo.", "Era humo con agenda."]);
      }
    }
    if (caster === "enemy" && card.visualEffect === "hammer_slam") {
      useProgressionStore.getState().incrementStat("hammerSlamsReceived");
    }
    if (winner) {
      useProgressionStore.getState().recordBattleResult({
        won: winner === "player",
        playerWill: next.player.will,
        maxStress: maxStressThisGame,
        usedFactions: usedFactionsThisGame,
        usedTypes: usedTypesThisGame,
        enemyId: state.aiProfileId,
      });
    }

    set({
      ...next,
      discard: caster === "player" ? [...next.discard, card] : next.discard,
      enemyDiscard: caster === "enemy" ? [...next.enemyDiscard, card] : next.enemyDiscard,
      playZone: [{ card, owner: caster }, ...state.playZone].slice(0, 8),
      pendingCast: undefined,
      lastResolvedCard: card,
      usedFactionsThisGame,
      usedTypesThisGame,
      maxStressThisGame,
      aiTaunt: taunt,
      aiTauntColor: profile.personality.color,
      winner,
      phase,
      log: [
        ...next.dramaticLines,
        `${caster === "player" ? "Tu carta" : profile.name} resuelve: ${card.impactText}`,
        ...(taunt ? [`${profile.name}: "${taunt}"`] : []),
        ...state.log,
      ].slice(0, 10),
    });

    const after = get();
    const difficulty = aiDifficulties[after.aiDifficulty];
    const canChain =
      caster === "enemy" &&
      !winner &&
      after.phase === "battle" &&
      after.aiActionsThisTurn < difficulty.maxCardsPerTurn &&
      after.enemyHand.some((item) => item.cost <= after.enemy.clarity);
    if (canChain) window.setTimeout(() => get().enemyTurn(), after.reducedMotion ? 180 : 520);
  },

  enemyTurn: () => {
    const state = get();
    if (state.phase !== "battle" || state.pendingCast) return;
    if (state.aiActionsThisTurn >= aiDifficulties[state.aiDifficulty].maxCardsPerTurn) return;

    if (state.enemy.block > 0) {
      const profile = getAIProfile(state.aiProfileId);
      const taunt = pickTaunt(profile.taunts, "block", Date.now() + state.turn);
      set({
        enemy: { ...state.enemy, block: state.enemy.block - 1, clarity: clamp(state.enemy.clarity + 1, 0, maxClarity) },
        aiTaunt: taunt,
        aiTauntColor: profile.personality.color,
        log: [`${profile.name} pierde un turno revisando sus propias notas condenatorias.`, ...(taunt ? [`${profile.name}: "${taunt}"`] : []), ...state.log].slice(0, 8),
      });
      return;
    }

    const profile = getAIProfile(state.aiProfileId);
    const choice = chooseAICard(
      {
        player: state.player,
        enemy: state.enemy,
        hand: state.hand,
        enemyHand: state.enemyHand,
        enemyDeck: state.enemyDeck,
        enemyDiscard: state.enemyDiscard,
        lastResolvedCard: state.lastResolvedCard,
        turn: state.turn,
      },
      profile,
      state.aiDifficulty,
    );
    const card = choice.card;
    if (!card) {
      const drawn = draw(state.enemyDeck, state.enemyDiscard, state.enemyHand, 2);
      set({
        enemyDeck: drawn.deck,
        enemyDiscard: drawn.discard,
        enemyHand: drawn.hand,
        log: [`${profile.name} no tiene jugada limpia y roba cartas. Lo llama estrategia.`, ...state.log].slice(0, 8),
      });
      return;
    }
    const taunt = pickTaunt(profile.taunts, "playCard", Date.now() + card.id.length);

    set({
      enemy: { ...state.enemy, clarity: clamp(state.enemy.clarity - card.cost, 0, maxClarity) },
      enemyHand: removeOneCard(state.enemyHand, card.id),
      aiActionsThisTurn: state.aiActionsThisTurn + 1,
      pendingCast: { id: Date.now(), card, caster: "enemy" },
      activeEffect: card.visualEffect,
      impactText: card.impactText,
      aiTaunt: taunt,
      aiTauntColor: profile.personality.color,
      log: [`${profile.name} invoca ${card.name}. ${choice.reason}`, ...(taunt ? [`${profile.name}: "${taunt}"`] : []), ...state.log].slice(0, 8),
    });
  },

  endTurn: () => {
    const state = get();
    if (state.phase !== "battle" || state.pendingCast) return;
    const playerGain = 2 - Math.min(1, state.player.mentalNoise);
    const nextDraw = draw(state.deck, state.discard, state.hand, 2);
    const enemyDraw = draw(state.enemyDeck, state.enemyDiscard, state.enemyHand, 1);

    set({
      deck: nextDraw.deck,
      discard: nextDraw.discard,
      hand: nextDraw.hand.slice(0, 7),
      enemyDeck: enemyDraw.deck,
      enemyDiscard: enemyDraw.discard,
      enemyHand: enemyDraw.hand.slice(0, 6),
      player: {
        ...state.player,
        clarity: clamp(state.player.clarity + playerGain, 0, maxClarity),
        mentalNoise: clamp(state.player.mentalNoise - 1, 0, maxStress),
      },
      enemy: {
        ...state.enemy,
        clarity: clamp(state.enemy.clarity + 2, 0, maxClarity),
        mentalNoise: clamp(state.enemy.mentalNoise - 1, 0, maxStress),
      },
      aiActionsThisTurn: 0,
      turn: state.turn + 1,
      log: [`Turno ${state.turn + 1}: ganas ${playerGain} Claridad. El concierto mental sube de volumen.`, ...state.log].slice(0, 8),
    });

    window.setTimeout(() => get().enemyTurn(), 450);
  },

  dismissEffect: () => set({ activeEffect: undefined, impactText: undefined }),
  toggleMute: () => set((state) => ({ muted: !state.muted })),
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
}));

export const selectableFactions = factions;
export const maxResources = { will: maxWill, clarity: maxClarity, stress: maxStress, mentalNoise: maxStress };

type RealGameState = {
  selectedDeckId?: DemoDeckId;
  player: DemoCombatant;
  enemy: DemoCombatant;
  deck: DemoCard[];
  hand: DemoCard[];
  discard: DemoCard[];
  enemyDeck: DemoCard[];
  enemyHand: DemoCard[];
  enemyDiscard: DemoCard[];
  turn: number;
  log: string[];
  activeEffect?: DemoVisualEffect;
  bossPhrase: string;
  bossPhase: 1 | 2 | 3;
  winner?: DemoBattleResult;
  muted: boolean;
  reducedMotion: boolean;
  wins: number;
  losses: number;
  demoCompleted: boolean;
  chooseDeck: (deckId: DemoDeckId) => void;
  startDemoBattle: (deckId?: DemoDeckId) => void;
  playDemoCard: (cardId: string) => void;
  endDemoTurn: () => void;
  restartDemo: () => void;
  toggleDemoMute: () => void;
  toggleDemoReducedMotion: () => void;
  clearDemoEffect: () => void;
};

const initialPlayer = (): DemoCombatant => ({ will: 30, clarity: 3, stress: 0, mentalNoise: 0, blocked: false });
const initialEnemy = (): DemoCombatant => ({ will: perfeccionistaAscendido.maxWill, clarity: 3, stress: 0, mentalNoise: 0, blocked: false });
const drawDemo = (deck: DemoCard[], hand: DemoCard[], amount: number) => {
  const nextDeck = [...deck];
  const nextHand = [...hand];
  for (let index = 0; index < amount; index += 1) {
    const drawn = nextDeck.shift();
    if (drawn) nextHand.push(drawn);
  }
  return { deck: nextDeck, hand: nextHand };
};
const bossPhaseFor = (will: number): 1 | 2 | 3 => (will > 30 ? 1 : will > 15 ? 2 : 3);
const phraseFor = (phase: 1 | 2 | 3) => perfeccionistaAscendido.phrases[phase - 1];

export const useRealGameStore = create<RealGameState>()(
  persist(
    (set, get) => ({
      player: initialPlayer(),
      enemy: initialEnemy(),
      deck: [],
      hand: [],
      discard: [],
      enemyDeck: [],
      enemyHand: [],
      enemyDiscard: [],
      turn: 1,
      log: ["El Tribunal espera que elijas un mazo."],
      bossPhrase: perfeccionistaAscendido.phrases[0],
      bossPhase: 1,
      muted: false,
      reducedMotion: false,
      wins: 0,
      losses: 0,
      demoCompleted: false,
      chooseDeck: (deckId) => set({ selectedDeckId: deckId }),
      startDemoBattle: (deckId) => {
        const selectedDeckId = deckId ?? get().selectedDeckId ?? "oficina-control";
        const playerDraw = drawDemo(createPlayerDeck(selectedDeckId), [], 5);
        const enemyDraw = drawDemo(createEnemyDeck(), [], 5);
        set({
          selectedDeckId,
          player: initialPlayer(),
          enemy: initialEnemy(),
          deck: playerDraw.deck,
          hand: playerDraw.hand,
          discard: [],
          enemyDeck: enemyDraw.deck,
          enemyHand: enemyDraw.hand,
          enemyDiscard: [],
          turn: 1,
          winner: undefined,
          activeEffect: undefined,
          bossPhase: 1,
          bossPhrase: perfeccionistaAscendido.phrases[0],
          log: ["Turno 1: empieza la audiencia demo.", `${perfeccionistaAscendido.name}: ${perfeccionistaAscendido.phrases[0]}`],
        });
      },
      playDemoCard: (cardId) => {
        const state = get();
        if (state.winner) return;
        if (state.player.blocked) {
          set({ player: { ...state.player, blocked: false }, log: ["Tu turno estaba bloqueado. La cadena se rompe al intentarlo.", ...state.log].slice(0, 12), activeEffect: "chains" });
          return;
        }
        const card = state.hand.find((item) => item.id === cardId);
        if (!card || card.cost > state.player.clarity) return;
        const hand = state.hand.filter((item) => item.id !== cardId);
        const resolved = resolveSimpleCardEffect({
          card,
          caster: "player",
          player: { ...state.player, clarity: Math.max(0, state.player.clarity - card.cost) },
          enemy: state.enemy,
          hand,
          enemyHand: state.enemyHand,
          deck: state.deck,
          enemyDeck: state.enemyDeck,
        });
        const bossPhase = bossPhaseFor(resolved.enemy.will);
        const winner = resolved.enemy.will <= 0 ? "win" : undefined;
        set({
          ...resolved,
          discard: [...state.discard, card],
          enemyDiscard: state.enemyDiscard,
          bossPhase,
          bossPhrase: phraseFor(bossPhase),
          winner,
          wins: winner === "win" ? state.wins + 1 : state.wins,
          demoCompleted: winner === "win" ? true : state.demoCompleted,
          activeEffect: card.visualEffect,
          log: [`Juegas ${card.name}.`, ...resolved.lines, `${perfeccionistaAscendido.name}: ${phraseFor(bossPhase)}`, ...state.log].slice(0, 12),
        });
      },
      endDemoTurn: () => {
        const state = get();
        if (state.winner) return;
        const playerDraw = drawDemo(state.deck, state.hand, 1);
        let player = { ...state.player, clarity: Math.min(10, state.player.clarity + 3), mentalNoise: Math.max(0, state.player.mentalNoise - 1) };
        let enemy = { ...state.enemy, clarity: Math.min(10, state.enemy.clarity + 3), mentalNoise: Math.max(0, state.enemy.mentalNoise - 1) };
        let enemyHand = [...state.enemyHand];
        let enemyDeck = [...state.enemyDeck];
        let enemyDiscard = [...state.enemyDiscard];
        const log = [`Turno ${state.turn + 1}: ganas 3 Claridad y robas 1 carta.`];

        if (enemy.blocked) {
          enemy = { ...enemy, blocked: false };
          log.push("El Perfeccionista pierde su accion por una cadena.");
        } else {
          const enemyDraw = drawDemo(enemyDeck, enemyHand, 1);
          enemyDeck = enemyDraw.deck;
          enemyHand = enemyDraw.hand;
          const card = chooseEnemyCard(enemy, player, enemyHand);
          if (card) {
            enemyHand = enemyHand.filter((item) => item.id !== card.id);
            const resolved = resolveSimpleCardEffect({
              card,
              caster: "enemy",
              player,
              enemy: { ...enemy, clarity: Math.max(0, enemy.clarity - card.cost) },
              hand: playerDraw.hand,
              enemyHand,
              deck: playerDraw.deck,
              enemyDeck,
            });
            player = resolved.player;
            enemy = resolved.enemy;
            enemyHand = resolved.enemyHand;
            enemyDeck = resolved.enemyDeck;
            enemyDiscard = [...enemyDiscard, card];
            log.push(`El Perfeccionista juega ${card.name}.`, ...resolved.lines);
            const loss = player.will <= 0;
            const bossPhase = bossPhaseFor(enemy.will);
            set({
              player,
              enemy,
              deck: resolved.deck,
              hand: resolved.hand,
              enemyDeck,
              enemyHand,
              enemyDiscard,
              discard: state.discard,
              turn: state.turn + 1,
              bossPhase,
              bossPhrase: phraseFor(bossPhase),
              winner: loss ? "loss" : undefined,
              losses: loss ? state.losses + 1 : state.losses,
              activeEffect: card.visualEffect,
              log: [...log, `${perfeccionistaAscendido.name}: ${phraseFor(bossPhase)}`, ...state.log].slice(0, 12),
            });
            return;
          }
          log.push("El Perfeccionista no encuentra jugada posible. Lo llama pausa metodologica.");
        }

        set({
          player,
          enemy,
          deck: playerDraw.deck,
          hand: playerDraw.hand,
          enemyDeck,
          enemyHand,
          enemyDiscard,
          turn: state.turn + 1,
          activeEffect: undefined,
          log: [...log, ...state.log].slice(0, 12),
        });
      },
      restartDemo: () => get().startDemoBattle(get().selectedDeckId),
      toggleDemoMute: () => set((state) => ({ muted: !state.muted })),
      toggleDemoReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      clearDemoEffect: () => set({ activeEffect: undefined }),
    }),
    {
      name: "saboteadores-real-demo",
      partialize: (state) => ({
        selectedDeckId: state.selectedDeckId,
        wins: state.wins,
        losses: state.losses,
        muted: state.muted,
        reducedMotion: state.reducedMotion,
        demoCompleted: state.demoCompleted,
      }),
    },
  ),
);
