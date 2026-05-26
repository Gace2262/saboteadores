# Expansion Format

```json
{
  "schemaVersion": "editor-expansion-v1",
  "expansion": {
    "id": "rebelion-burnout",
    "name": "La Rebelion del Burnout",
    "tagline": "Cuando la productividad presenta demanda colectiva.",
    "cards": [],
    "bosses": [],
    "events": [],
    "campaigns": [],
    "cosmetics": [],
    "soundtrackRefs": [],
    "backgrounds": [],
    "version": "0.1.0-draft",
    "author": "Archivo de Creacion"
  }
}
```

## Importacion

El importador:

- valida `schemaVersion`;
- detecta conflictos por ID;
- permite importar sin reemplazar;
- permite reemplazo explicito de conflictos.

## Supabase futuro

La tabla `admin_content` puede guardar:

- drafts
- published
- disabled
- version
- author
- changelog
