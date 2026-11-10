-- 0006_actividad_estudiantes.sql
-- Actividad "La tienda de la abuela": sesiones de clase y entregas de estudiantes.
--
-- Qué agrega:
-- - public.activity_sessions: una clase creada por el docente. `code` es el
--   código corto que se escribe en el enlace (/e/CODIGO). `activity` identifica
--   qué actividad se abre, para poder sumar otras más adelante.
-- - public.activity_submissions: una entrega por estudiante o grupo. Guarda el
--   nombre completo, los integrantes, el progreso y las respuestas.
--
-- Modelo de seguridad (igual que 0001/0003):
-- - RLS activado sin políticas para anon/authenticated: el acceso directo por
--   PostgREST queda negado.
-- - Todo pasa por el servidor con service_role. El estudiante nunca escribe en
--   la base directamente: usa /api/actividad/* con el token de su entrega.
-- - `token` es la credencial de la entrega: quien lo tiene puede actualizar su
--   propio progreso, y nadie más.

create extension if not exists "pgcrypto";

create table if not exists public.activity_sessions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  activity text not null default 'tienda-abuela',
  title text not null,
  course_id uuid references public.courses (id) on delete set null,
  created_by uuid,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);
comment on table public.activity_sessions is 'Clase abierta por un docente para una actividad interactiva.';
comment on column public.activity_sessions.code is 'Código corto y legible que se escribe en /e/CODIGO.';
comment on column public.activity_sessions.created_by is 'Usuario de auth que abrió la clase.';

create index if not exists activity_sessions_course_id_idx on public.activity_sessions (course_id);
create index if not exists activity_sessions_created_at_idx on public.activity_sessions (created_at desc);

create table if not exists public.activity_submissions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.activity_sessions (id) on delete cascade,
  token text not null unique,
  student_name text not null,
  group_names text[] not null default '{}',
  progress jsonb not null default '{}'::jsonb,
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.activity_submissions is 'Entrega de un estudiante o grupo dentro de una sesión de clase.';
comment on column public.activity_submissions.token is 'Credencial de la entrega: permite al estudiante actualizar su propio avance.';
comment on column public.activity_submissions.progress is 'Pasos completados, con intentos por paso.';
comment on column public.activity_submissions.answers is 'Respuestas registradas por la actividad, por capítulo.';

create index if not exists activity_submissions_session_id_idx
  on public.activity_submissions (session_id, created_at desc);
create index if not exists activity_submissions_updated_at_idx
  on public.activity_submissions (updated_at desc);

-- ------------------------------------------------------------------ RLS ----
alter table public.activity_sessions enable row level security;
alter table public.activity_submissions enable row level security;

revoke all on table public.activity_sessions from anon, authenticated;
revoke all on table public.activity_submissions from anon, authenticated;

grant all on table public.activity_sessions to service_role;
grant all on table public.activity_submissions to service_role;
