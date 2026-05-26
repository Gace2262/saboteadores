# Desktop Build

La demo esta preparada para una distribucion desktop futura, pero no incluye binarios todavia.

## Recomendacion

Usar Tauri como primera opcion:

- menor peso de instalador;
- buen rendimiento;
- permisos mas claros;
- encaja bien con un juego offline basado en WebView.

Electron queda como alternativa si el proyecto necesita integraciones Node mas amplias.

## Preparacion actual

- El guardado es local y exportable.
- No se usan servicios externos obligatorios.
- No hay claves ni secretos en cliente.
- Las rutas principales compilan con Next.js.

## Checklist futuro

- Crear adaptador de filesystem para saves.
- Definir iconos finales.
- Preparar instaladores por sistema operativo.
- Probar audio Web Audio dentro del shell desktop.
- Revisar rendimiento de cinemáticas y particulas.
