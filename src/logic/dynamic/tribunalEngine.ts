import { ambientNarrations, getNarrationsForWeather } from "@/data/ambientNarration";
import { dynamicEvents } from "@/data/dynamicEvents";
import { tribunalAnomalies, type MentalWeather } from "@/data/tribunalAnomalies";
import type { PlayerMemorySnapshot } from "./playerMemory";

export type TribunalSignals = {
  stressHistory: number[];
  corruptionAverage: number;
  defeatCount: number;
  judgeUseCount: number;
  extremeRuns: number;
  screenVisits: number;
  streamerSafe: boolean;
  stableMode: boolean;
  memory: PlayerMemorySnapshot;
};

export function calculateJudgeAttention(signals: TribunalSignals) {
  const stress = signals.stressHistory.reduce((sum, item) => sum + item, 0) / Math.max(1, signals.stressHistory.length);
  return Math.min(100, Math.round(stress * 4 + signals.corruptionAverage * 0.45 + signals.defeatCount * 4 + signals.judgeUseCount * 1.2 + signals.extremeRuns * 8));
}

export function calculateInstability(signals: TribunalSignals) {
  if (signals.stableMode) return 0;
  return Math.min(100, Math.round(signals.corruptionAverage * 0.55 + signals.screenVisits * 1.5 + signals.memory.catarsisNeglect * 0.8 + calculateJudgeAttention(signals) * 0.35));
}

export function resolveMentalWeather(signals: TribunalSignals): MentalWeather {
  if (signals.stableMode) return "calma";
  if (signals.corruptionAverage > 65) return "corrupcion";
  if (calculateJudgeAttention(signals) > 70) return "juicio";
  if (signals.memory.stressStyle === "ansioso" || signals.memory.stressStyle === "maldito") return "ansiedad";
  if (signals.memory.catarsisNeglect <= 2 && signals.screenVisits > 4) return "catarsis";
  if (signals.screenVisits > 18) return "agotamiento";
  return "calma";
}

export function pickDynamicEvent(signals: TribunalSignals, seed: number) {
  if (signals.stableMode) return undefined;
  const attention = calculateJudgeAttention(signals);
  const instability = calculateInstability(signals);
  const chance = Math.min(82, 8 + attention * 0.28 + instability * 0.24);
  if (seed % 100 > chance) return undefined;
  const pool = dynamicEvents.filter((event) => event.intensity <= Math.max(35, attention + 20));
  return pool[seed % Math.max(1, pool.length)];
}

export function pickAnomaly(signals: TribunalSignals, seed: number) {
  if (signals.stableMode) return undefined;
  if (signals.streamerSafe) {
    const safe = tribunalAnomalies.filter((anomaly) => anomaly.streamerSafe);
    return seed % 100 < 18 ? safe[seed % safe.length] : undefined;
  }
  const instability = calculateInstability(signals);
  if (seed % 100 > Math.min(28, instability * 0.22)) return undefined;
  return tribunalAnomalies[seed % tribunalAnomalies.length];
}

export function pickNarration(weather: MentalWeather, seed: number) {
  const pool = getNarrationsForWeather(weather);
  if (!pool.length) return ambientNarrations[seed % ambientNarrations.length];
  return pool[seed % pool.length];
}
