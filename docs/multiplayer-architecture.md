# Multiplayer Architecture

La Etapa 26 prepara la base. No implementa online competitivo real.

## Principio

El combate PvP debe ser determinista. Los componentes no modifican estado directamente: emiten eventos y el `MatchReducer` produce el nuevo estado.

## Event sourcing

Eventos soportados:

- DRAW_CARD
- PLAY_CARD
- END_TURN
- APPLY_EFFECT
- DISCARD_CARD
- TRIGGER_KEYWORD
- RESOLVE_DAMAGE
- GAIN_RESOURCE
- START_CINEMATIC
- END_CINEMATIC
- CONCEDE
- RECONNECT
- SYNC_STATE

Cada evento tiene:

- id
- matchId
- playerId
- type
- payload
- timestamp
- turnNumber
- sequenceNumber
- checksum

## Online futuro

`NetworkAdapter` separa la red de la UI:

- `MockNetworkAdapter`: pruebas locales.
- `SupabaseRealtimeAdapter`: estructura preparada para Realtime.
- WebSocket futuro: implementar la misma interfaz.

## Anti-trampa futuro

- El cliente no decide resultados finales en ranked.
- Servidor o Edge Function valida eventos.
- `sequenceNumber` evita duplicados y saltos.
- `checksum` detecta divergencia.
- `eventLog` permite reproducir partidas.

## Reconexion

Se guarda snapshot local temporal. En casual se puede esperar; en privado se permite reconectar; en ranked las reglas quedan pendientes.
