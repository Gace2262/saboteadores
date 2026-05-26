# Demo Test Plan

## Checklist funcional

- `/demo` carga y muestra version demo.
- Intro carga y avanza a tutorial.
- Tutorial explica Voluntad, Claridad, Estres y Ruido Mental.
- Seleccion de mazo guarda la opcion elegida.
- Primer combate avanza al evento narrativo.
- Evento "Espejo incomodo" aplica una eleccion.
- Evolucion de carta aparece y avanza al boss.
- Boss cambia fases y permite victoria o derrota.
- Pantalla final muestra texto segun resultado.
- Reiniciar demo borra progreso demo.
- Feedback se guarda localmente.
- Exportar JSON entrega un archivo legible.

## Accesibilidad

- Subtitulos visibles.
- Reducir animaciones persiste.
- Reducir flashes persiste.
- Modo bajo rendimiento persiste.
- Los botones tienen texto claro.
- El flujo no depende de audio.

## Produccion

Ejecutar antes de publicar:

```bash
npm run typecheck
npm run lint
npm run test -- --run
npm run build
```

## Criterios de aceptacion

- Demo jugable completa sin errores criticos.
- No se pierde progreso demo.
- No quedan overlays pegados.
- No hay audio infinito.
- No hay cartas sin texto visible.
- No hay botones muertos.
- Boss vencible.
- Tutorial entendible.
- Performance aceptable en desktop y movil basico.
