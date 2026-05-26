# Workshop Guide

El Archivo Público del Tribunal es offline-first. Permite compartir seeds, runs, campañas, bosses, packs, expansiones, reglas custom y desafíos mediante JSON validado.

## Publicar

1. Abre `/workshop/publish`.
2. Escribe titulo, descripcion y tag.
3. El contenido se valida localmente.
4. Si pasa, queda guardado en el workshop local.

No se envia nada a servidores. Supabase queda preparado para una etapa futura.

## Importar y exportar

Los expedientes se exportan como JSON con:

- id
- titulo
- descripcion
- tipo
- tags
- warnings
- dependencias
- checksum
- payload

El importador rechaza scripts, tags invalidos, tipos desconocidos y dependencias incompletas.

## Seeds

Las seeds compartidas usan el generador procedural. Misma seed, misma dificultad y mismo setup reproducen el mapa.

## Replays

Los replays no guardan video ni datos personales. Solo:

- seed
- eventLog
- decisiones clave
- ruta
- checksum

## Dependencias

Los expedientes pueden declarar mods o expansiones requeridas. El panel de dependencias muestra versiones e incompatibilidades futuras.

## Backend futuro

Tablas previstas:

- `workshop_content`
- `workshop_ratings`
- `workshop_creators`
- `workshop_runs`
- `workshop_seeds`
