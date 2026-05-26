# Guia de modding

El Archivo de Expedientes No Autorizados permite cargar contenido comunitario local en formato JSON. El sistema no ejecuta codigo externo: todo mod es datos validados.

## Crear un mod

1. Crea un paquete JSON con `manifest`, `cards`, `bosses`, `events`, `campaigns`, `cosmetics` y `customRules` opcionales.
2. Usa IDs en minusculas, numeros y guiones.
3. Declara permisos: `cards`, `bosses`, `events`, `campaigns`, `cosmetics`, `dialogues`, `missions`, `limited_rules`.
4. Agrega `contentWarnings` si hay flashes, audio fuerte, movimiento intenso o horror psicologico.
5. Importa el JSON desde `/mods/import`.

## Ejemplo minimo

```json
{
  "manifest": {
    "id": "burnout_rebellion",
    "name": "La Rebelion del Burnout",
    "version": "1.0.0",
    "gameVersion": "0.1.0-demo",
    "author": "Comunidad",
    "description": "Expansion no oficial centrada en productividad maldita.",
    "content": { "cards": "cards.json" },
    "permissions": ["cards"],
    "tags": ["burnout", "maldita"],
    "contentWarnings": ["dark_theme"]
  },
  "cards": [
    {
      "id": "memo-del-burnout",
      "name": "Memo del Burnout",
      "faction": "inquieto",
      "rarity": "rara",
      "cost": 2,
      "keywords": ["Estampida"],
      "effects": [{ "type": "damage", "target": "enemy", "value": 4 }],
      "effectText": "Hace 4 de dano.",
      "flavorText": "La oficina aprendio a morder.",
      "visualEffect": "horse_stampede",
      "soundEffect": "horse_stampede",
      "animationType": "slam",
      "cinematic": "horse_stampede",
      "version": "1.0.0",
      "createdAt": "2026-05-25T00:00:00.000Z",
      "updatedAt": "2026-05-25T00:00:00.000Z",
      "author": "Comunidad",
      "changelog": ["Carta inicial."]
    }
  ]
}
```

## Sandbox

Los mods activos pueden probarse en `/mods/sandbox`. El sandbox no modifica el save principal y pausa logros oficiales mientras haya contenido comunitario activo.

## Exportar

Desde el editor interno se preparan cartas y expansiones; desde la biblioteca de mods puedes ver el JSON exportable y checksums de packs activos.

## Reglas de seguridad

- No JavaScript.
- No HTML arbitrario.
- No URLs remotas obligatorias.
- No telemetria.
- No modificar saves directamente.
- No simular compras reales.

El Tribunal acepta caos. No acepta malware con sombrero ceremonial.
