-- 0003_teachers.sql
-- Módulo de clases virtuales: profesores y vínculo docente en enlaces y horarios.
--
-- Qué agrega:
-- - Tabla public.teachers (profesores por nombre).
-- - Columna teacher_id en public.subject_meet_links (qué profesor atiende cada
--   enlace de Meet) y en public.schedules (qué profesor dicta cada franja).
--   Así una misma materia puede tener enlaces distintos según el profesor y el
--   resolutor (src/lib/clases/resolve.ts) prefiere el enlace del profesor de la
--   franja, con repliegue al primer enlace de la materia.
--
-- Modelo de seguridad (igual que 0001/0002):
-- - RLS activado en teachers sin políticas para `anon` ni `authenticated`
--   (denegación por defecto; todo acceso directo vía PostgREST queda negado).
-- - Solo service_role opera estas tablas desde el servidor (bypasea RLS, pero
--   igual necesita los grants explícitos para PostgREST).

create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null unique,
  created_at timestamptz not null default now()
);
comment on table public.teachers is 'Profesores que dictan clases virtuales (nombre en mayúsculas normalizadas).';
comment on column public.teachers.full_name is 'Nombre del profesor, único y en mayúsculas normalizadas (p. ej. JOHANA).';

-- Enlace de Meet -> profesor que lo atiende (nulo = enlace genérico de la materia).
alter table public.subject_meet_links
  add column if not exists teacher_id uuid references public.teachers (id) on delete set null;
comment on column public.subject_meet_links.teacher_id is 'Profesor que atiende este enlace; nulo = enlace genérico de la materia.';

-- Franja de horario -> profesor que la dicta.
alter table public.schedules
  add column if not exists teacher_id uuid references public.teachers (id) on delete set null;
comment on column public.schedules.teacher_id is 'Profesor que dicta esta franja; nulo = sin profesor asignado.';

create index if not exists subject_meet_links_teacher_id_idx
  on public.subject_meet_links (teacher_id);
create index if not exists schedules_teacher_id_idx
  on public.schedules (teacher_id);

-- ------------------------------------------------------------------ RLS ----
-- Denegación por defecto: RLS activado sin políticas para anon/authenticated.
-- Solo el servidor con service_role lee/escribe (bypasea RLS).

alter table public.teachers enable row level security;

revoke all on table public.teachers from anon, authenticated;

grant all on table public.teachers to service_role;
