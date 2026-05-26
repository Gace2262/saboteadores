# Challenge Format

Los desafíos comunitarios son JSON validado.

```json
{
  "id": "respirar-es-opcional",
  "type": "no_catarsis",
  "rules": [
    "+3 Estrés inicial",
    "No se permiten cartas Catarsis",
    "Elites dobles",
    "Recompensas +40%"
  ],
  "rewardTitle": "Legalmente Exhausto"
}
```

## Tipos

- boss_rush
- max_stress
- no_catarsis
- common_only
- extreme_judgment
- cursed_run
- speedrun
- chaos_draft

## Reglas

Las reglas son texto declarativo por ahora. No ejecutan codigo. En etapas futuras pueden mapearse a reglas custom limitadas y validadas.
