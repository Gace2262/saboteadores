# Event Schema

```json
{
  "id": "el-tribunal-suspira",
  "title": "El Tribunal Suspira",
  "type": "dynamic",
  "description": "La musica baja y el estres se reduce.",
  "effects": [
    {
      "type": "reduce_stress",
      "target": "both",
      "value": 1,
      "animation": "guilt_rain",
      "sound": "sarcasm_spark"
    }
  ],
  "narratorLine": "Algo administrativo tuvo compasion accidental.",
  "visual": "guilt_rain",
  "enabled": true,
  "version": "0.1.0-draft"
}
```

Tipos:

- narrative
- dynamic
- anomaly
- judge_interruption
