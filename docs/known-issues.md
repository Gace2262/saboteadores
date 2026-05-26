# Known Issues

## BUG-001

Descripcion: El navegador puede bloquear audio hasta que el jugador pulse "Activar audio del Tribunal".

Severidad: media

Estado: documentado

Workaround: pulsar el boton de activar audio antes de jugar.

Version afectada: 0.1.0-public-demo

## BUG-002

Descripcion: Algunas rutas futuras existen como preparacion tecnica, pero no forman parte de la demo publica.

Severidad: menor

Estado: documentado

Workaround: usar `/landing`, `/demo`, `/feedback`, `/press`, `/roadmap`, `/legal` y `/credits` para el flujo publico.

Version afectada: 0.1.0-public-demo

## BUG-003

Descripcion: En pantallas pequenas la mano de cartas usa scroll horizontal y puede sentirse densa.

Severidad: polish

Estado: en revision

Workaround: jugar en desktop o girar el dispositivo.

Version afectada: 0.1.0-public-demo

## BUG-004

Descripcion: El audio de boss puede seguir brevemente durante una transicion si se cambia de ruta exactamente durante un impacto.

Severidad: media

Estado: en revision

Workaround: usar mute o volver a `/landing`, lo que reinicia el contexto de audio tras nueva interaccion.

Version afectada: 0.1.0-public-demo

## Categorias de triage

- blocker: no puede iniciar demo.
- critical: no puede terminar combate o se pierde progreso.
- major: audio pegado, UI rota o error visible.
- minor: texto confuso, typos o pequenos problemas.
- polish: mejoras visuales, balance fino y sensacion.
