# Demo Vertical Slice

La Etapa 34 convierte `/demo` en una experiencia corta, cerrada y presentable de 15 a 25 minutos.

## Objetivo

Mostrar lo mejor del prototipo sin pedir al tester que explore todo el proyecto:

- intro cinematografica
- tutorial breve
- seleccion de mazo
- primer combate
- evento narrativo
- evolucion de carta
- boss fight
- final de demo
- feedback local exportable

## Flujo

1. `/demo`: pantalla inicial, ajustes minimos y ruta completa.
2. `/demo/intro`: citacion cinematografica del Tribunal.
3. `/demo/tutorial`: recursos basicos y acciones esenciales.
4. `/demo/deck`: tres mazos demo.
5. `/demo/battle`: combate contra Controlador Menor.
6. `/demo/event`: evento "Espejo incomodo".
7. `/demo/evolution`: despertar de "Fortaleza de Autoestima".
8. `/demo/boss`: Perfeccionista Ascendido en tres fases.
9. `/demo/end`: cierre, teaser, feedback y contenido en desarrollo.

## Contenido incluido

- 3 mazos demo.
- 1 tutorial.
- 1 combate normal.
- 1 evento narrativo.
- 1 evolucion de carta.
- 1 boss.
- audio dinamico descrito en escena.
- ajustes basicos de accesibilidad.
- feedback local.

## Contenido bloqueado

Todo lo bloqueado se marca como "en desarrollo": campana completa, Juicio Extremo, Boss Rush, coleccion completa, Tribunal Vivo avanzado, mods, multiplayer y universo expandido.

## Trailer mode

Agrega `?trailer=true` a rutas demo para limpiar elementos de captura cuando corresponda. Recomendado:

```text
/demo/intro?trailer=true
```

## Feedback

El panel final guarda respuestas en `localStorage` y permite exportar un JSON. No se envia nada automaticamente.

## Grabacion sugerida

1. Captura la intro en `/demo/intro?trailer=true`.
2. Graba 10 segundos de mazos en `/demo/deck`.
3. Muestra intencion enemiga en `/demo/battle`.
4. Usa `/demo/evolution` para el momento de carta despertada.
5. Avanza fases en `/demo/boss`.
6. Cierra con `/demo/end`.
