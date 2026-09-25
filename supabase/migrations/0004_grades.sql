-- 0004_grades.sql
-- Informe de padres (segundo periodo): notas por estudiante, materia y periodo.
--
-- Qué agrega:
-- - Tabla public.grades (una fila por estudiante + materia + periodo).
-- - Periodos 1..3 con puntaje numérico de 0 a 5 (nulo = sin nota registrada).
-- - Unicidad (student_id, subject, period) para que el seed sea re-ejecutable.
-- - Borrado en cascada: al eliminar un estudiante se eliminan sus notas.
--
-- Origen de los datos:
-- - Los .xls viven en Telemetria/ (gitignored, solo local) y se cargan con
--   scripts/seed-grades.ts usando la service_role key. Telemetria/ nunca se
--   commitea (contiene datos personales: nombres y documentos).
--
-- Modelo de seguridad (igual que 0001/0002/0003):
-- - RLS activado sin políticas para `anon` ni `authenticated`
--   (denegación por defecto; todo acceso directo vía PostgREST queda negado).
-- - Solo service_role opera esta tabla desde el servidor (bypasea RLS, pero
--   igual necesita los grants explícitos para PostgREST).

create table if not exists public.grades (
  id uuid primary key default gen_random_uuid(),
  -- Estudiante dueño de la nota; en cascada para no dejar notas huérfanas.
  student_id uuid not null references public.students (id) on delete cascade,
  -- Materia tal como aparece en el encabezado del concentrador
  -- (p. ej. MAT, C.N.B., C.N.FQ., LEC.CRI). Se guarda el texto original.
  subject text not null,
  -- Periodo académico: solo 1, 2 o 3.
  period smallint not null check (period between 1 and 3),
  -- Puntaje de 0 a 5; nulo significa "sin nota registrada" (nunca se usa 0
  -- como sustituto de una celda vacía del .xls).
  score numeric check (score between 0 and 5),
  created_at timestamptz not null default now(),
  -- Una sola nota por estudiante + materia + periodo (permite re-ejecutar
  -- el seed con upsert sin duplicar filas).
  unique (student_id, subject, period)
);
comment on table public.grades is 'Notas por estudiante, materia y periodo para el informe de padres (segundo periodo).';
comment on column public.grades.student_id is 'Estudiante dueño de la nota; se borra en cascada con el estudiante.';
comment on column public.grades.subject is 'Materia con el texto original del encabezado del concentrador (p. ej. MAT, C.N.B.).';
comment on column public.grades.period is 'Periodo académico (1, 2 o 3).';
comment on column public.grades.score is 'Puntaje de 0 a 5; nulo = sin nota registrada.';

create index if not exists grades_student_id_idx
  on public.grades (student_id);

-- ------------------------------------------------------------------ RLS ----
-- Denegación por defecto: RLS activado sin políticas para anon/authenticated.
-- Solo el servidor con service_role lee/escribe (bypasea RLS).

alter table public.grades enable row level security;

revoke all on table public.grades from anon, authenticated;

grant all on table public.grades to service_role;
