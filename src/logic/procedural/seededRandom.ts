export function seedTextToNumber(seedText: string) {
  let hash = 2166136261;
  const normalized = seedText.trim().toLowerCase() || "tribunal-sin-seed";
  for (let index = 0; index < normalized.length; index += 1) {
    hash ^= normalized.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export type SeededRandom = {
  seed: number;
  next: () => number;
  int: (min: number, max: number) => number;
  pick: <T>(items: T[]) => T;
  chance: (probability: number) => boolean;
  fork: (salt: string) => SeededRandom;
};

export function createSeededRandom(seed: number): SeededRandom {
  let state = seed >>> 0;
  const next = () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
  return {
    seed,
    next,
    int: (min, max) => Math.floor(next() * (max - min + 1)) + min,
    pick: (items) => items[Math.floor(next() * items.length)],
    chance: (probability) => next() < probability,
    fork: (salt) => createSeededRandom(seedTextToNumber(`${seed}:${salt}`)),
  };
}
