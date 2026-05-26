import { actTitles } from "@/data/procedural/nodePools";
import type { FactionId } from "@/data/factions";
import type { ProceduralCampaign, ProceduralDifficulty, ProceduralMode, ProceduralNode, ProceduralNodeType, ProceduralRouteStyle } from "./proceduralTypes";
import { createSeededRandom, seedTextToNumber } from "./seededRandom";
import { resolveNarrativeSeed } from "./narrativeSeedResolver";
import { resolveRunModifiers } from "./runModifierResolver";
import { generateProceduralNode } from "./nodeGenerator";
import { connectProceduralRoutes, hasCompleteRoute } from "./routeGenerator";
import { generateProceduralEvent } from "./eventGenerator";
import { generateProceduralReward } from "./rewardGenerator";
import { selectProceduralBoss } from "./bossSelector";

export type CampaignGeneratorInput = {
  seedText: string;
  deckId: string;
  difficulty: ProceduralDifficulty;
  mode: ProceduralMode;
  forcedModifierId?: string;
  deckFactions?: readonly FactionId[];
  stressLean?: boolean;
  controlLean?: boolean;
};

const routeStyles: ProceduralRouteStyle[] = ["seguro", "balanceado", "arriesgado"];

const pickNodeType = (act: number, index: number, lane: number, randomValue: number, mode: ProceduralMode): ProceduralNodeType => {
  const finalIndex = mode === "rapido" ? 3 : 5;
  if (index === finalIndex) return act === 4 ? "juicio" : "boss";
  if (index === 0 && act === 1) return "combate";
  if (index === 2 && lane === 0) return "descanso";
  if (index === 3 && lane === 2) return "evento";
  if (randomValue < 0.12) return "descanso";
  if (randomValue < 0.24) return "evento";
  if (randomValue < 0.34) return "tienda";
  if (randomValue < 0.45) return "recompensa";
  if (randomValue < 0.58) return "elite";
  if (randomValue < 0.66) return "anomalia";
  return "combate";
};

const enforceRestSpacing = (nodes: ProceduralNode[]) => {
  const ordered = [...nodes].sort((a, b) => a.lane - b.lane || a.act - b.act || a.index - b.index);
  const forcedRest = new Set<string>();
  for (const lane of Array.from(new Set(nodes.map((node) => node.lane)))) {
    let streak = 0;
    ordered
      .filter((node) => node.lane === lane)
      .forEach((node) => {
        if (node.type === "combate" || node.type === "elite") {
          streak += 1;
          if (streak >= 3) {
            forcedRest.add(node.id);
            streak = 0;
          }
        } else {
          streak = 0;
        }
      });
  }
  return nodes.map((node) =>
    forcedRest.has(node.id)
      ? { ...node, type: "descanso" as const, title: "Descanso impuesto por el sindicato neuronal", subtitle: "El mapa casi se paso de intenso y tuvo que respirar." }
      : node,
  );
};

export function generateProceduralCampaign(input: CampaignGeneratorInput): ProceduralCampaign {
  const seed = seedTextToNumber(input.seedText);
  const random = createSeededRandom(seed);
  const narrative = resolveNarrativeSeed(random.fork("narrative"));
  const modifiers = resolveRunModifiers(random.fork("modifiers"), narrative.theme, input.forcedModifierId);
  const nodeCount = input.mode === "rapido" ? 4 : 6;
  const lanes = input.mode === "rapido" ? 3 : 4;
  const nodes: ProceduralNode[] = [];

  for (let act = 1; act <= 4; act += 1) {
    for (let index = 0; index < nodeCount; index += 1) {
      const laneCount = index === 0 || index === nodeCount - 1 ? 1 : lanes;
      for (let lane = 0; lane < laneCount; lane += 1) {
        const routeStyle = routeStyles[Math.min(routeStyles.length - 1, lane % routeStyles.length)];
        const type = pickNodeType(act, index, lane, random.next(), input.mode);
        const node = generateProceduralNode(random.fork(`node:${act}:${index}:${lane}`), {
          act,
          index,
          lane: laneCount === 1 ? 1 : lane,
          type,
          routeStyle,
          difficulty: input.difficulty,
        });
        if (type === "evento" || type === "anomalia") node.eventId = generateProceduralEvent(random.fork(`event:${node.id}`), narrative.theme).id;
        if (type === "recompensa" || type === "elite" || type === "boss") node.rewardId = generateProceduralReward(random.fork(`reward:${node.id}`), input.difficulty, routeStyle === "arriesgado" ? 2 : routeStyle === "balanceado" ? 1 : 0).id;
        if (type === "boss" || type === "juicio") node.bossId = selectProceduralBoss(random.fork(`boss:${node.id}`), { act, theme: narrative.theme, difficulty: input.difficulty, deckFactions: input.deckFactions, stressLean: input.stressLean, controlLean: input.controlLean });
        if (type === "anomalia" && random.chance(0.22)) {
          node.type = "secreto";
          node.secretCondition = random.pick(["baja Voluntad", "alto Estres", "seed especial", "carta especifica", "reliquia especifica"]);
        }
        nodes.push(node);
      }
    }
  }

  const spaced = enforceRestSpacing(nodes);
  const connected = connectProceduralRoutes(spaced);
  const acts = actTitles.map((title, index) => ({
    id: index + 1,
    title,
    nodes: connected.filter((node) => node.act === index + 1),
  }));
  const finalBossId = connected.find((node) => node.type === "juicio")?.bossId ?? "juez";
  if (!hasCompleteRoute(connected)) {
    throw new Error("El Tribunal genero un mapa sin ruta completa. El expediente fue rechazado.");
  }

  return {
    id: `run-${seed}-${input.mode}-${input.difficulty}`,
    seedText: input.seedText,
    seed,
    mode: input.mode,
    difficulty: input.difficulty,
    deckId: input.deckId,
    narrative,
    modifiers,
    acts,
    nodes: connected,
    finalBossId,
    createdAt: new Date(0).toISOString(),
  };
}
