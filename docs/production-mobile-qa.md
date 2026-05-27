# Production Mobile QA - Etapa 41

Version objetivo: 0.1.0-public-demo

## Problemas corregidos

- Panel "Soundtrack demo" reemplazado por boton flotante compacto.
- Panel de audio ahora es desplegable y no tapa cartas por defecto.
- Panel de audio incluye mute, minimizar y cerrar soundtrack.
- Audio se desbloquea desde acciones jugables y desde el boton de audio.
- Botones de jugar carta, terminar turno y mute intentan desbloquear audio antes de disparar SFX.
- Mano de cartas usa scroll horizontal con snap en mobile.
- Se agrego boton "Ver mazo completo" con vista scrolleable de mano, mazo y descarte.
- Se redujeron alturas minimas de carta y mesa en pantallas pequenas.
- Se activo `overflow-x: hidden` global para evitar scroll lateral accidental.
- Se corrigio el viewport movil con `width=device-width`.
- Se corrigieron desbordes internos de CSS Grid con `min-w-0`.
- El HUD movil usa secciones desplegables para recursos, boss y expediente.
- Los botones principales usan padding adaptable para no forzar ancho fijo en mobile.
- `html` y `body` quedan limitados a `max-width: 100vw`.

## Checklist 360px

- [x] No hay scroll lateral accidental.
- [x] Boton de audio compacto no tapa cartas ni terminar turno.
- [x] Mano puede desplazarse horizontalmente.
- [x] Boton "Ver mazo completo" abre lista scrolleable.
- [x] Botones principales quedan dentro del ancho visible.

## Checklist 390px

- [x] Cartas son legibles.
- [x] Recursos no se salen del panel.
- [x] Boss y log quedan debajo sin superponerse.
- [x] Audio puede activarse, mutearse y pausarse.

## Checklist 414px

- [x] No hay desbordes horizontales.
- [x] El mazo completo muestra al menos dos columnas cuando hay espacio.
- [x] Subtitulos de audio no tapan controles principales.

## Checklist desktop

- [x] Layout de tres columnas se mantiene.
- [x] Panel de audio compacto funciona.
- [x] Ver mazo completo no rompe la grilla.
- [x] SFX se disparan desde acciones tras desbloqueo Web Audio.
- [x] Boss cambia fase sin tapar interfaz.

## Resultado local automatizado

- Typecheck: OK.
- Lint: OK.
- Tests: OK, 20 archivos y 90 tests.
- Build: OK, 115 rutas generadas.
- Playwright responsive: OK en 360, 390, 414 iPhone, 412 Android, 1366x768 y 1920x1080.
- Scroll lateral accidental: no detectado.
- Controles fuera del ancho visible: no detectados.
- Panel antiguo "Soundtrack demo": no detectado.
- Panel de audio: abre y muestra mute, minimizar y cerrar en mobile/desktop.
- Mazo completo: abre y muestra lista navegable.
- HUD movil: recursos y boss/log disponibles en secciones desplegables.

## Pendiente manual en Vercel

- Probar en dispositivo real iOS/Android.
- Probar Chrome mobile y Safari mobile.
- Revisar audio tras primer tap en Vercel.
- Revisar que no aparezca panel antiguo persistente por cache.
