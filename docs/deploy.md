# Deploy

## Variables

Configurar solo variables publicas:

```bash
NEXT_PUBLIC_APP_NAME="Saboteadores Mentales"
NEXT_PUBLIC_APP_VERSION="0.1.0-demo"
NEXT_PUBLIC_BUILD_MODE="demo"
NEXT_PUBLIC_ENABLE_DEBUG=false
```

No agregar secretos al cliente.

## Vercel

1. Importar el repositorio.
2. Framework: Next.js.
3. Build command: `npm run build`.
4. Install command: `npm ci`.
5. Variables: copiar `.env.example`.
6. Deploy preview.

El archivo `vercel.json` agrega headers basicos y cache para assets.

## Netlify

1. Importar el repositorio.
2. Build command: `npm run build`.
3. Publish directory: `.next`.
4. Plugin: `@netlify/plugin-nextjs`.
5. Variables: copiar `.env.example`.

El archivo `netlify.toml` configura el build, plugin y headers.

## Errores comunes

- Build falla por TypeScript: ejecutar `npm run typecheck` localmente.
- Ruta directa da 404: confirmar que el adapter de Next este activo.
- Debug visible en preview: poner `NEXT_PUBLIC_ENABLE_DEBUG=false`.
- Audio no inicia: el navegador requiere una interaccion del usuario.
- Save no carga: exportar diagnostico y probar restaurar backup.
