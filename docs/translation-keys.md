# Claves de traduccion

Convencion: `namespace.area.item.property`.

## Namespaces

- `common`: titulo del juego, acciones, recursos generales.
- `ui`: menus, ajustes, pantallas.
- `cards`: nombres, efectos, flavor e impacto de cartas.
- `story`: capitulos, dialogos, legal y narrativa.
- `effects`: subtitulos de audio y cinematicas.
- `factions`: nombres, descripciones y taglines.
- `keywords`: nombres y descripciones.

## Ejemplos

```json
{
  "game.title": "Saboteadores Mentales: Habitantes Invisibles",
  "actions.save": "Guardar",
  "ui.menu.deckBuilder": "Constructor de mazos",
  "cards.judge.name": "El Juez",
  "cards.judge.impact": "Culpable hasta que demuestres autoestima.",
  "story.prologue.title": "La primera grieta",
  "effects.chains.subtitle": "[CADENAS ARRASTRANDOSE]"
}
```

## Cartas

Para IDs con guion se usa camelCase:

- `controlador-compulsivo` -> `cards.controladorCompulsivo.name`
- `sentencia-express` -> `cards.sentenciaExpress.name`
- `autoestima-con-casco` -> `cards.autoestimaConCasco.name`

Excepcion:

- `el-juez` -> `cards.judge.name`

## Plurales

Usa sufijos:

- `_one`
- `_other`

```json
{
  "battle.cardsDrawn_one": "Robaste {{count}} carta",
  "battle.cardsDrawn_other": "Robaste {{count}} cartas"
}
```

## Fallback

Cadena principal:

`es-CL -> es -> en`

Si falta una traduccion en componentes de cartas, el juego usa el texto base de la carta y registra la clave faltante para debug.
