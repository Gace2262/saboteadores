# Troubleshooting

## Error de build

Ejecutar:

```bash
npm run typecheck
npm run lint
npm run test -- --run
```

Revisar imports, rutas nuevas y componentes cliente que usen APIs del navegador.

## localStorage bloqueado

El juego usa fallback de memoria para no romper la sesion, pero el progreso no persistira. Recomendar al tester habilitar almacenamiento local o exportar save manualmente.

## Audio no suena

Los navegadores bloquean audio hasta la primera interaccion. Hacer clic en la pantalla, revisar mute global y bajar modo streamer si hay distorsion.

## Pantalla negra

Probar modo de bajo rendimiento, reducir particulas y recargar. Si persiste, exportar diagnostico desde `/debug` en desarrollo.

## Animaciones lentas

Usar preset `Minimal` o `Balanced`, activar reduced motion y desactivar particulas.

## Problemas de deploy

- Vercel: confirmar deteccion de Next.js.
- Netlify: confirmar `@netlify/plugin-nextjs`.
- Variables: usar solo `NEXT_PUBLIC_*`.
- Debug: `NEXT_PUBLIC_ENABLE_DEBUG=false`.
