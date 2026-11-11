-- 0007_actividad_intentos.sql
-- Registro de cada intento de la actividad, correcto o incorrecto.
--
-- Antes solo se guardaba el número de intentos por capítulo (y no se enviaba).
-- El docente necesita ver el proceso: qué eligió el estudiante en cada paso y
-- si acertó, no solo si terminó.
--
-- Forma de cada elemento de `attempts`:
--   { "step": "caja", "value": "Compra de aceite y harina",
--     "detail": "Entra a la caja", "correct": false, "at": 1730000000000 }

alter table public.activity_submissions
  add column if not exists attempts jsonb not null default '[]'::jsonb;

comment on column public.activity_submissions.attempts is
  'Registro ordenado de cada intento: sección, valor elegido, corrección y momento.';

-- Consultas del panel: entregas con más intentos o sin terminar.
create index if not exists activity_submissions_completed_at_idx
  on public.activity_submissions (completed_at);
