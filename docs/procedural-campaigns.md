# Procedural Campaigns

Etapa 35 agrega campañas generadas por seed para que cada run tenga mapa, rutas, eventos, bosses, recompensas y narrativa contextual reproducible.

## Seed

`seededRandom.ts` convierte una frase en un numero determinista. La misma frase genera el mismo mapa:

```ts
seedTextToNumber("el juez perdio el martillo")
```

Esto permite compartir seeds, reproducir bugs y debuggear campañas.

## Estructura

Cada campaña tiene cuatro actos:

1. Acto I: Grietas Iniciales
2. Acto II: Dominios del Mecanismo
3. Acto III: Tribunal Profundo
4. Acto IV: Audiencia Final

Modo rapido genera menos nodos. Modo largo genera mas rutas, eventos y recompensas.

## Reglas del mapa

- Siempre debe existir ruta completa al nodo de juicio.
- Los bosses aparecen al final de acto.
- El Juez queda como juicio final.
- Se evitan cadenas largas de combate sin descanso.
- Cada acto tiene rutas alternativas.
- Las rutas arriesgadas tienden a dar mejores recompensas.
- Los nodos secretos pueden requerir condiciones como baja Voluntad, alto Estres, seed especial, carta o reliquia.

## Pools

Los contenidos viven en `src/data/procedural`:

- `nodePools.ts`
- `eventPools.ts`
- `rewardPools.ts`
- `runModifiers.ts`
- `bossPools.ts`

Para agregar contenido, añade una entrada al pool correspondiente. No se usa IA generativa externa.

## Boss Selector

`bossSelector.ts` sesga suavemente segun:

- acto
- tema narrativo
- dificultad
- facciones del mazo
- tendencia a estres o control

El sesgo no garantiza counters perfectos. Solo aumenta probabilidad.

## Dificultad

`difficultyCurve.ts` escala:

- vida y presion enemiga
- probabilidad de elites
- anomalías
- rareza de recompensas

La dificultad debe subir sin quitar herramientas: descansos, recompensas y rutas seguras siguen apareciendo.

## Debug

Usa `/procedural-campaign/setup` para ingresar una seed manual y `/procedural-campaign/map` para revisar nodos, rutas, modificadores y resumen.

## Mods futuros

Mods pueden extender pools de eventos, bosses, recompensas y modificadores siempre que pasen validacion JSON y no ejecuten codigo.
