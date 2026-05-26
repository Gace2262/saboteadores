# Formato de mods

Todos los mods son JSON. Un paquete completo incluye `manifest` y contenido opcional.

## Manifest

```ts
type ModManifest = {
  id: string;
  name: string;
  version: string;
  gameVersion: string;
  author: string;
  description: string;
  content: Partial<Record<"cards" | "bosses" | "events" | "campaigns" | "cosmetics", string>>;
  permissions: ModPermission[];
  tags: string[];
  contentWarnings?: ModContentWarning[];
  changelog?: string[];
};
```

## Permisos

- `cards`
- `bosses`
- `events`
- `campaigns`
- `cosmetics`
- `backgrounds`
- `dialogues`
- `missions`
- `limited_rules`

## Advertencias de contenido

- `flashing`
- `loud_audio`
- `dark_theme`
- `intense_motion`
- `psychological_horror`

## Carta

Las cartas usan el esquema del editor:

- `id`
- `name`
- `faction`
- `rarity`
- `cost`
- `keywords`
- `effects`
- `effectText`
- `flavorText`
- `visualEffect`
- `soundEffect`
- `animationType`
- `cinematic`
- `version`
- `createdAt`
- `updatedAt`
- `author`
- `changelog`

## Efectos permitidos

- `damage`
- `heal`
- `draw`
- `discard`
- `gain_stress`
- `reduce_stress`
- `apply_chain`
- `remove_chain`
- `gain_clarity`
- `reduce_clarity`
- `summon`
- `transform`
- `copy`
- `trigger_keyword`
- `cinematic`
- `corruption`
- `catarsis`
- `random`

## Reglas custom limitadas

```ts
type ModCustomRules = {
  initialWillpower?: number;
  initialClarity?: number;
  initialStress?: number;
  handSize?: number;
  deckLimit?: number;
  eventFrequency?: number;
  rewardMultiplier?: number;
};
```

Los limites se validan para evitar loops, partidas imposibles o expedientes con ambiciones dictatoriales.
