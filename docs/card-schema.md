# Card Schema

```json
{
  "id": "martillo-de-medianoche",
  "name": "Martillo de Medianoche",
  "faction": "juez",
  "rarity": "legendaria",
  "cost": 5,
  "keywords": ["Sentencia", "Cadena"],
  "effects": [
    {
      "type": "damage",
      "target": "enemy",
      "value": 8,
      "animation": "hammer_slam",
      "sound": "hammer_slam"
    }
  ],
  "effectText": "Hace dano y aplica sentencia.",
  "flavorText": "El insomnio consiguio cargo vitalicio.",
  "visualEffect": "hammer_slam",
  "soundEffect": "hammer_slam",
  "animationType": "slam",
  "cinematic": "hammer_slam",
  "version": "0.1.0-draft",
  "createdAt": "2026-05-25T00:00:00.000Z",
  "updatedAt": "2026-05-25T00:00:00.000Z",
  "author": "Archivo de Creacion",
  "changelog": []
}
```

## Effect types

- damage
- heal
- draw
- discard
- gain_stress
- reduce_stress
- apply_chain
- remove_chain
- gain_clarity
- reduce_clarity
- summon
- transform
- copy
- trigger_keyword
- cinematic
- corruption
- catarsis
- random

## Validacion

- ID unico.
- Costo entre 0 y 12.
- Rareza existente.
- Faccion existente.
- Keywords existentes.
- Al menos un efecto.
- Flavor text requerido.
- Valores entre 0 y 99.
