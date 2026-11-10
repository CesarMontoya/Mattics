# Actividad interactiva: La tienda de la abuela (Educación Económica y Financiera, 6-7)

## Objetivo

Actividad guiada de 90 minutos, en formato de historia con cinco capítulos y un cierre, para que el
estudiante de grados 6-7 comprenda la relación entre hábitos financieros responsables y el consumo
de bienes y servicios, cubriendo los saberes de la planeación: historia y uso del dinero, finanzas,
ganancia y pérdida, y hábitos financieros.

## Problema y por qué

La planeación curricular pide cuatro actividades separadas (línea de tiempo, juego de mesa, tarjetas
de hábitos, diálogo sobre el aporte afrodescendiente). Ejecutadas por separado no forman una
comprensión: el estudiante memoriza hitos, juega y clasifica sin conectar nada.

La propuesta las integra en una sola narrativa: el estudiante pasa una semana a cargo de la tienda de
su abuela. La historia del dinero es el origen del negocio; los hábitos son los consejos de la
abuela; el aporte afrodescendiente es la propia familia y su junta de ahorro. Cada capítulo es un día
y un ejercicio.

## Alcance autorizado

- Ruta nueva `src/pages/economia-6-7/index.astro`.
- Componentes nuevos en `src/components/economia-6-7/` (kit + capítulos).
- Entrada de navegación en el sidebar.
- Un spec de Playwright.
- Sin backend, sin Supabase, sin login: progreso en `localStorage`.

Fuera de alcance: gamificación con puntajes persistentes, telemetría, exportación de resultados a
`tracking.ts`, audio.

## Historia (canon)

Abuela: Eulalia. Tienda: "El Buen Sabor". El estudiante queda a cargo de la caja tres días mientras
ella visita a su hermana. El cierre es la junta de ahorro para comprar la nevera nueva.

El origen geográfico de la abuela no se fija en el texto: el docente lo contextualiza. Ninguna cifra
histórica se afirma como dato sin revisión previa.

## Tareas

- [ ] T1. Capa de progreso y shell: `EconomiaActividad.tsx`, `SliceShell`, `Mural`, persistencia en
      `localStorage`, deep link `?paso=N`. Verificación: build de Astro sin errores y navegación
      entre pasos en navegador.
- [ ] T2. Capítulo 1 (línea de tiempo del dinero) con `OrderRail`; validación al revisar.
- [ ] T3. Capítulo 2 (ingresos y gastos) con `SortBoard`; revela el saldo del día.
- [ ] T4. Capítulo 3 (precio, ganancia y pérdida) con control deslizante y barra que cruza cero.
- [ ] T5. Capítulo 4 (hábitos buenos y malos) con `SortBoard`, ocho tarjetas.
- [ ] T6. Capítulo 5 (la junta de ahorro) con cuota semanal y pozo colectivo.
- [ ] T7. Cierre: postal coloreable, plan de ahorro propio e impresión.
- [ ] T8. Navegación, spec de Playwright y verificación final (`bun run build` + spec).

## Criterios de aceptación

- Se completa de principio a fin sin errores de consola.
- Cada capítulo tiene una sola tarea cognitiva y se resuelve en pantalla, sin scroll en escritorio.
- El progreso sobrevive a la recarga y se puede reanudar.
- Toda retroalimentación explica el porqué; nunca solo "incorrecto".
- Accesible con teclado: seleccionar y colocar sin arrastrar.
- Respeta `prefers-reduced-motion`.

## Verificación

- `bun run build`
- `bunx playwright test e2e/economia-6-7.spec.ts --project=chromium`
