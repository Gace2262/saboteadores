# Launch Checklist - 0.1.0-public-demo

## Antes de publicar

- [ ] Ejecutar instalacion limpia con `npm ci` o `npm install`.
- [ ] Ejecutar `npm run typecheck`.
- [ ] Ejecutar `npm run lint`.
- [ ] Ejecutar `npm run test -- --run`.
- [ ] Ejecutar `npm run build`.
- [ ] Probar demo completa desde `/demo`.
- [ ] Probar `/landing`, `/feedback`, `/press`, `/roadmap`, `/legal` y `/credits`.
- [ ] Probar mobile basico.
- [ ] Probar audio mute y activar audio tras interaccion.
- [ ] Probar reduced motion.
- [ ] Probar reinicio de demo.
- [ ] Revisar textos, typos y claims de contenido.
- [ ] Confirmar que no se promete contenido incompleto como disponible.
- [ ] Revisar aviso legal.
- [ ] Revisar creditos.
- [ ] Revisar consola sin errores criticos.

## Deploy

- [ ] Vercel preview OK.
- [ ] Netlify preview opcional OK.
- [ ] Rutas directas OK.
- [ ] Refresh en rutas internas OK.
- [ ] localStorage OK.
- [ ] Audio funciona tras interaccion del usuario.
- [ ] Feedback exporta JSON.

## Criterios de publicacion

- [ ] Build OK.
- [ ] Demo completa jugable.
- [ ] No hay errores criticos de consola.
- [ ] Audio no queda infinito al terminar combate.
- [ ] Feedback exporta.
- [ ] Legal visible.
- [ ] Creditos visibles.
- [ ] Mobile basico aceptable.
- [ ] Performance estable.

## Post-publicacion

- [ ] Compartir link a testers.
- [ ] Recopilar feedback exportado.
- [ ] Registrar bugs en `docs/known-issues.md`.
- [ ] Priorizar fixes: blocker, critical, major, minor, polish.
- [ ] Publicar changelog corto con version probada.
