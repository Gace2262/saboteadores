# Desktop Build Prep

Esta carpeta reserva la arquitectura para una version descargable futura.

## Ruta recomendada

- Tauri: recomendado por menor peso, mejor rendimiento y buena integracion con apps offline.
- Electron: alternativa si se necesitan APIs de escritorio mas amplias o ecosistema Node completo.

## Estado actual

- No hay empaquetado desktop activo en la demo.
- El juego funciona como Next.js web app y usa `localStorage`.
- El guardado ya puede exportarse e importarse como JSON para migrar progreso entre builds.

## Futuro

- Crear shell Tauri/Electron apuntando a una build local.
- Mover guardados a un adaptador de almacenamiento con interfaz comun.
- Agregar auto-update solo cuando exista una politica de releases clara.
