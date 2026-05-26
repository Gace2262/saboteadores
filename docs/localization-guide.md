# Guia de localizacion

El idioma principal de Saboteadores Mentales es `es-CL`. El sistema usa archivos JSON, Zustand y fallback offline.

## Idiomas

- `es-CL`: idioma principal.
- `es`: espanol neutro.
- `en`: ingles.
- `pt-BR`: preparado para futuro.

## Agregar un idioma

1. Crea `src/i18n/dictionaries/<locale>/`.
2. Agrega al menos `common.json`.
3. Registra el idioma en `src/i18n/config.ts`.
4. Define su cadena de fallback.
5. Corre `npm run test -- --run tests/unit/i18n.test.ts`.

## Agregar claves

Usa claves planas:

```json
{
  "ui.menu.play": "Jugar",
  "cards.judge.name": "El Juez"
}
```

La funcion `t(key, params, locale)` soporta interpolacion:

```ts
t("battle.damage", { amount: 5 }, "en")
```

## Plural simple

```json
{
  "battle.cardsDrawn_one": "Robaste {{count}} carta",
  "battle.cardsDrawn_other": "Robaste {{count}} cartas"
}
```

## Cartas

Las cartas conservan texto base como fallback, pero exponen:

- `nameKey`
- `effectKey`
- `flavorKey`
- `impactKey`

Ejemplo:

```ts
{
  id: "controlador-compulsivo",
  nameKey: "cards.controladorCompulsivo.name"
}
```

## Mods

Los mods pueden incluir:

```json
{
  "i18n": {
    "es-CL": {
      "cards.memoBurnout.name": "Memo del Burnout"
    },
    "en": {
      "cards.memoBurnout.name": "Burnout Memo"
    }
  }
}
```

Si un mod no tiene traducciones, se muestra un aviso: "Este expediente comunitario no habla tu idioma. El Tribunal improvisara subtitulos."

## Guia de tono

- Mantener el tono sarcastico.
- Adaptar chistes culturales.
- Evitar modismos demasiado cerrados cuando la regla debe ser clara.
- No sacrificar comprension por broma.
- Separar `es-CL` de `es` cuando el chiste dependa de Chile.

Ejemplos:

- `es-CL`: "El Tribunal tomo nota. Y te funo en silencio."
- `es`: "El Tribunal tomo nota. Y lo archivo con entusiasmo sospechoso."
- `en`: "The Tribunal took notes. The notes looked disappointed."

## Accesibilidad

Las traducciones pueden ser mas largas. Evita contenedores rigidos, permite saltos de linea y no dependas de texto de ancho fijo.
