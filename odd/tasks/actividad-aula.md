# Clases con enlace corto, nombres y entregas (La tienda de la abuela)

## Objetivo

Que el docente abra una clase, comparta un código corto y reciba el nombre, el grupo, el
progreso y las respuestas de cada estudiante.

## Alcance

- Tablas nuevas: `activity_sessions` (clase) y `activity_submissions` (entrega).
- Enlace público `/e/CODIGO` con formulario de entrada (nombre completo + compañeros).
- Registro de progreso y respuestas desde la actividad.
- Panel docente: `/admin/actividades` y `/admin/actividades/[id]`, con exportación a Excel.
- Nombre de los estudiantes en la postal impresa.

Fuera de alcance: cuentas de estudiante, notas automáticas, notificaciones.

## Modelo

- `activity_sessions`: `code` (5 caracteres, sin I/L/O/0/1), `title`, `course_id`, `closed_at`.
- `activity_submissions`: `student_name`, `group_names[]`, `progress jsonb`, `answers jsonb`,
  `token` (credencial del estudiante), `completed_at`, `updated_at`.
- RLS activado sin políticas: todo pasa por el servidor con `service_role`. El estudiante
  nunca escribe directo a PostgREST; usa `/api/actividad/*` con su token.

## Tareas

- [x] T1. Migración `0006_actividad_estudiantes.sql`.
- [x] T2. Librería server-only: códigos y almacén (`src/lib/actividad/`).
- [x] T3. API pública de registro y de progreso.
- [x] T4. Panel docente: crear clase, listar, cerrar/reabrir, ver entregas, exportar Excel.
- [x] T5. Entrada del estudiante por código, con nombre completo y compañeros.
- [x] T6. Registro de respuestas por capítulo y nombres en la postal impresa.
- [x] T7. Progreso local aislado por entrega (`storageId`), para que dos estudiantes en el
      mismo navegador no se mezclen.
- [ ] T8. Verificación de punta a punta: requiere aplicar la migración en Supabase.

## Verificación observada

- `bun run build` sin errores.
- `e2e/economia-6-7.spec.ts`: 3 casos pasando (la actividad suelta no cambió).
- `/e` y `/e/ABCDE` responden con el formulario y el mensaje de clase inexistente.

## Pendiente

- Aplicar `supabase/migrations/0006_actividad_estudiantes.sql` en el SQL Editor de Supabase
  (no hay CLI ni cadena de conexión en el entorno, así que no se puede aplicar desde aquí).
- Aviso de privacidad: se guardan nombres de menores. Conviene mencionarlo en la política de
  privacidad y pedir consentimiento al docente antes de compartir el enlace.
