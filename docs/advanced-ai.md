# Advanced Boss AI

Etapa 33 agrega una IA determinista, offline y extensible para bosses. No usa IA generativa ni servicios externos: todo se decide por reglas, pesos, memoria local y guardias de justicia.

## Arquitectura

- `playerPatternAnalyzer` detecta patrones de juego: estres alto, dependencia de cartas, control, catarsis, evasiones, mazos lentos y combos.
- `aiMemorySystem` guarda solo datos de gameplay local: cartas frecuentes, facciones usadas, victorias y derrotas por boss.
- `bossStrategyEngine` recibe estado, perfil, dificultad, fase, memoria y seed. Devuelve cartas seleccionadas, confianza, intencion, razon, frase y advertencias.
- `aiDecisionScorer` puntua cartas segun personalidad, fase, patron del jugador, coste y riesgo.
- `aiComboPlanner` busca combos de 2 a 3 cartas segun keywords preferidas del boss.
- `aiFairnessGuard` impide trampas visibles: coste insuficiente, combos infinitos y exceso de control fuerte.
- `bossIntentResolver` genera una pista para el jugador: atacar, bloquear, curarse, preparar combo, castigar estres o protegerse.
- `aiDialogueDirector` selecciona frases por boss, evento, patron, dificultad y fase.

## Personalidades

Cada Saboteador tiene pesos propios en `data/aiBossProfiles.ts`.

- El Juez castiga estres, usa Cadena y Sentencia, y comenta reincidencia.
- Controlador limita opciones y recursos.
- Perfeccionista castiga baja Claridad y busca jugadas de alto impacto.
- Inquieto roba, acelera y acepta caos.
- Hipervigilante prepara defensa, trampas y contraataques.
- Evitador retrasa, congela y evita daño.
- Reservado espera late game y oculta presion.
- Victima devuelve culpa y castiga agresion.
- Hiperracional calcula, anula y prioriza consistencia.
- Complaciente cura, sacrifica y genera deuda emocional.

## Dificultad

`data/aiDifficultyProfiles.ts` define cuatro niveles:

- Susurro: lectura baja, errores leves, intenciones claras.
- Crisis: patrones basicos y combos cortos.
- Juicio: memoria mas fuerte, counters moderados y sinergias.
- Tribunal Extremo: combos largos, intenciones cripticas y adaptacion alta sin romper reglas.

## Fairness

La IA puede adaptarse, pero no puede inventar respuestas perfectas:

- No juega cartas sin Claridad suficiente.
- No ejecuta mas de tres cartas en combo.
- Limita control fuerte y counters directos.
- Respeta cartas disponibles y estado visible.
- La memoria cambia pesos, no crea cartas nuevas.

## Debug

- `/boss-ai` muestra la arquitectura y perfiles.
- `/ai-debug` permite simular boss, fase, Claridad enemiga, dificultad, patron detectado, intencion y decision.

En produccion puede mantenerse oculto desde navegacion principal si se desea, pero la ruta es util para QA local.

## Crear un nuevo boss AI

1. Agregar su faccion o usar una existente.
2. Crear perfil en `data/aiBossProfiles.ts`.
3. Agregar frases en `data/aiDialogues.ts`.
4. Definir plan de fase con `phasePlan`.
5. Probar en `/ai-debug`.
6. Agregar tests de coste, intencion, fase y fairness.
