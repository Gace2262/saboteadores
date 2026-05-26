import type { ProceduralNode } from "./proceduralTypes";

export function connectProceduralRoutes(nodes: ProceduralNode[]) {
  const byActAndIndex = new Map<string, ProceduralNode[]>();
  nodes.forEach((node) => {
    const key = `${node.act}:${node.index}`;
    byActAndIndex.set(key, [...(byActAndIndex.get(key) ?? []), node]);
  });

  return nodes.map((node) => {
    const nextLayer = byActAndIndex.get(`${node.act}:${node.index + 1}`) ?? byActAndIndex.get(`${node.act + 1}:0`) ?? [];
    if (nextLayer.length === 0) return node;
    const targets = nextLayer.length <= 2 ? nextLayer : nextLayer.filter((next) => Math.abs(next.lane - node.lane) <= 1);
    return { ...node, next: (targets.length ? targets : nextLayer).map((next) => next.id) };
  });
}

export function hasCompleteRoute(nodes: ProceduralNode[]) {
  const first = nodes.filter((node) => node.act === 1 && node.index === 0);
  const final = new Set(nodes.filter((node) => node.type === "juicio").map((node) => node.id));
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const visited = new Set<string>();
  const stack = first.map((node) => node.id);
  while (stack.length) {
    const id = stack.pop() as string;
    if (visited.has(id)) continue;
    if (final.has(id)) return true;
    visited.add(id);
    const node = byId.get(id);
    node?.next.forEach((next) => stack.push(next));
  }
  return false;
}
