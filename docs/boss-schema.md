# Boss Schema

```json
{
  "id": "perfeccionista-ascendido",
  "name": "Perfeccionista Ascendido",
  "faction": "perfeccionista",
  "room": "Catedral del Casi",
  "soundtrack": "cathedral-clock-metal",
  "dialogue": ["Tu error sobrevivio demasiado tiempo."],
  "phases": [
    {
      "id": "martillo-absoluto",
      "name": "Martillo Absoluto",
      "life": 45,
      "aiProfile": "punish_errors",
      "passiveEffects": ["Castiga cartas de bajo costo."],
      "events": ["lluvia de cadenas"],
      "soundtrackLayer": "choir",
      "visual": "judgment_flash"
    }
  ],
  "rewards": ["carta-unica"],
  "difficulty": 4,
  "version": "0.1.0-draft"
}
```

Bosses sin fases se consideran invalidos para publicacion.
