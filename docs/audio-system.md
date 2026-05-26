# Sistema de audio

El audio de Saboteadores Mentales es procedural y offline por defecto. Usa Web Audio API con rutas mock preparadas para reemplazar por soundtrack original.

## Arquitectura

- `audioEngine`: entrada principal para eventos, actualizacion adaptativa y cinematicas.
- `audioManager`: Web Audio API procedural, osciladores, filtros y pulso ritmico.
- `adaptiveMusic`: resuelve track, intensidad, BPM y capas.
- `musicResolver`: decide tema segun estres, boss, corrupcion, catarsis y salud.
- `audioMixer`: mezcla canales y aplica rango dinamico reducido.
- `voiceProcessor`: prepara pitch, reverb, distorsion y whisper layer.
- `sfxController`: dispara efectos disenados.

## Canales

1. `music`
2. `ambience`
3. `sfx`
4. `voices`
5. `cinematic`
6. `ui`
7. `corruption`
8. `choir`

## Capas musicales

- Base
- Tension
- Estres
- Coro
- Corrupcion
- Climax

Cada capa tiene threshold de intensidad y bus asignado.

## Tracks

- Tribunal del Craneo
- Perfeccionista Ascendido
- Hipervigilante Omega
- Caballeria del Burnout
- Catarsis Total
- Habitantes Invisibles

## Eventos cinematicos

- Entrada de El Juez
- Martillazo critico
- Catarsis legendaria
- Derrota mental
- Victoria contra El Juez
- Corrupcion sonora
- El silencio responde

## Convenciones

- Rutas mock: `/music/<track>.ogg`, `/sfx/<id>.wav`.
- Subtitulos en mayuscula entre corchetes.
- Mantener silencio narrativo antes de impactos.
- No saturar todas las capas al mismo tiempo.

## Accesibilidad

- Volumen por canal.
- Subtitulos de audio.
- Whispers desactivables.
- Tinnitus opcional, apagado por defecto.
- Rango dinamico reducido.
- Streamer safe reduce distorsion y whispers.

## Futuro soundtrack

El sistema esta preparado para cargar archivos reales con lazy loading. Por ahora genera audio sintetico para mantener demo offline y sin copyright.
