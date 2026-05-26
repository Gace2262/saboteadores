# Save System

El guardado seguro vive en `logic/save`.

- `saveManager.ts`: crear, guardar, cargar, exportar, importar y resetear.
- `saveMigrations.ts`: migraciones versionadas.
- `saveValidator.ts`: estructura, monedas no negativas, mazos y cartas.

Backups:
- ultimo backup valido.
- backup previo a migracion.
- recuperacion automatica si el save principal falla.

Mensaje de corrupcion:

> El expediente mental llego con paginas mordidas. Restauramos el ultimo backup estable.
