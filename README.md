# Saboteadores Mentales: Habitantes Invisibles

Demo web offline de cartas tacticas sobre patrones mentales automaticos. El jugador atraviesa un Tribunal Mental lleno de saboteadores, humor negro, bosses teatrales, cartas evolucionables, audio reactivo y guardado local.

## Estado

Version: `0.1.0-demo`

La demo incluye tutorial, combate normal, boss inicial, coleccion limitada, apertura de sobres, perfil basico, cinemáticas placeholder y sistemas de QA/guardado.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Vitest / Testing Library
- localStorage

## Instalacion

```bash
npm install
npm run dev
```

Abrir `http://127.0.0.1:3000`.

## Comandos

```bash
npm run typecheck
npm run lint
npm run test -- --run
npm run test:coverage
npm run build
npm run start
npm run analyze
npm run clean
```

## Variables de entorno

Copiar `.env.example` como `.env.local` para desarrollo local si hace falta.

```bash
NEXT_PUBLIC_APP_NAME="Saboteadores Mentales"
NEXT_PUBLIC_APP_VERSION="0.1.0-demo"
NEXT_PUBLIC_BUILD_MODE="demo"
NEXT_PUBLIC_ENABLE_DEBUG=false
```

No se requieren claves reales.

## Estructura

- `src/app`: rutas App Router.
- `src/components`: UI, batalla, coleccion, campaña, debug y cinematicas.
- `src/data`: contenido centralizado.
- `src/logic`: reglas puras, guardado, economia, IA y diagnostico.
- `src/store`: stores Zustand.
- `tests`: unitarias, integracion y E2E opcional.
- `docs`: testing, deploy, release y QA.

## Modo demo

La configuracion vive en `src/data/demoConfig.ts`.

Disponible:

- tutorial;
- 1 combate normal;
- 1 boss;
- coleccion limitada;
- apertura de 1 sobre;
- perfil basico;
- cinematica final.

Bloqueado o parcial:

- Juicio Extremo completo;
- universo expandido completo;
- multiplayer futuro;
- temporadas futuras.

## Guardado

El progreso se guarda en `localStorage`, se valida antes de cargar y puede exportarse/importarse como JSON desde las herramientas de debug en desarrollo.

## Deploy

El proyecto incluye `vercel.json` y `netlify.toml`.

Ver detalles en `docs/deploy.md`.

## Legal

El juego es ficcion simbolica, no diagnostico ni tratamiento. Ver `/legal`.
