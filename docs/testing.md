# Testing

Comandos:

```bash
npm run test
npm run test:coverage
npm run typecheck
npm run test:e2e
```

La suite usa Vitest, React Testing Library y jsdom. Las pruebas unitarias cubren reglas puras: efectos de carta, economia, recompensas, IA, campana, guardado y validacion de mazos.

Las pruebas de integracion renderizan componentes clave con estado local. Los E2E quedan como base Playwright para el flujo demo.
