# Content System

El Archivo de Creacion usa contenido JSON-first. Los borradores viven en Zustand/localStorage y pueden exportarse como paquetes `editor-content-v1`.

## Principios

- No tocar contenido base accidentalmente.
- Validar antes de publicar.
- Evitar IDs duplicados.
- No permitir efectos sin tipo, target o valor razonable.
- Mantener todo offline.
- Preparar Supabase `admin_content` para drafts y publish/unpublish futuros.

## Flujo

1. Crear carta, boss, evento o nodo.
2. Validar errores y warnings.
3. Probar en sandbox.
4. Exportar JSON.
5. Importar en otro entorno o subir a admin futuro.

## QA editorial

El hub detecta:

- IDs duplicados
- cartas invalidas
- cartas sin audio
- cartas sin cinematica
- bosses sin fases
- eventos invalidos

## Versionado

Cada carta/evento incluye:

- version
- createdAt
- updatedAt
- author
- changelog
