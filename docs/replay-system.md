# Replay System

El replay futuro se apoya en `eventLog`.

## Funciones preparadas

- `replayMatch(initialState, eventLog)`
- `stepForward(state, event)`
- `stepBackward(initialState, eventLog, steps)`
- `jumpToTurn(initialState, eventLog, turnNumber)`

## Requisitos

- Misma seed.
- Mismos mazos snapshot.
- Eventos ordenados por `sequenceNumber`.
- Reducer determinista.

## Usos futuros

- Modo espectador diferido.
- Replays de ranked.
- Reportes anti-trampa.
- Debug de bugs de combate.
