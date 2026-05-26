# Release Checklist

## Verificacion

- `npm ci` limpio.
- `npm run typecheck` OK.
- `npm run lint` OK.
- `npm run test -- --run` OK.
- `npm run build` OK.
- Preview deploy abre rutas directas.

## Demo

- Tutorial corto jugable.
- Combate normal resuelve turnos.
- Boss inicial muestra intro y derrota/victoria.
- Apertura de sobre funciona sin compras.
- Perfil basico abre sin errores.
- Final demo muestra mensaje.

## Experiencia

- Audio mute funciona.
- Reduced motion funciona.
- Pantalla legal accesible.
- Creditos actualizados.
- Mobile basico revisado.
- Desktop basico revisado.
- No hay errores criticos en consola.

## Guardado

- Exportar save JSON.
- Importar save JSON.
- Reset seguro pide intencion clara desde UI.
- Save corrupto recupera backup o crea save limpio.

## Accesibilidad

- Contraste legible.
- Subtitulos visuales disponibles donde aplica.
- Flashes reducidos con ajustes.
- Input no queda bloqueado tras cinematicas.
