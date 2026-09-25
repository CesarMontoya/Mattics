-- 0001_clases_virtuales.sql
-- Virtual-classes module: courses, students, subjects, schedules, link-based
-- visit tracking, alerts and shareable reports.
--
-- Security model:
-- - RLS is enabled on every table and NO policies are granted to `anon` or
--   `authenticated` yet. With RLS enabled and zero policies, all direct
--   PostgREST access is denied by default.
-- - `visits` rows are written SERVER-SIDE ONLY with the service_role key
--   (see src/lib/supabase/server.ts -> createSupabaseServiceRoleClient),
--   which bypasses RLS. There is intentionally no `anon` INSERT policy.
-- - Authenticated admin/teacher policies (profiles + roles) will be added in
--   a later migration once the profiles model exists.
--
-- Privacy (Colombia Ley 1581 de 2012):
-- - `visits` stores IP + geo + user-agent (personal data). Define a retention
--   policy (e.g. anonymize/delete after N months) and surface a privacy notice
--   + consent where links are shared. A cleanup job is still TODO.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- courses --
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);
comment on table public.courses is 'School courses/groups (e.g. 10-A).';

-- ---------------------------------------------------------------- students --
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses (id) on delete set null,
  full_name text not null,
  created_at timestamptz not null default now()
);
comment on table public.students is 'Students, each optionally assigned to a course.';
create index if not exists students_course_id_idx on public.students (course_id);

-- ---------------------------------------------------------------- subjects --
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);
comment on table public.subjects is 'School subjects (e.g. Matematicas).';

-- ------------------------------------------------------ subject_meet_links --
create table if not exists public.subject_meet_links (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects (id) on delete cascade,
  url text not null,
  label text,
  created_at timestamptz not null default now()
);
comment on table public.subject_meet_links is 'Virtual-class (Meet) links per subject.';
create index if not exists subject_meet_links_subject_id_idx
  on public.subject_meet_links (subject_id);

-- ---------------------------------------------------------------- schedules --
create table if not exists public.schedules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  subject_id uuid references public.subjects (id) on delete set null,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  created_at timestamptz not null default now(),
  check (start_time < end_time)
);
comment on table public.schedules is 'Weekly class schedule. weekday: 0=Sunday .. 6=Saturday.';
create index if not exists schedules_course_id_idx on public.schedules (course_id);
create index if not exists schedules_subject_id_idx on public.schedules (subject_id);
create index if not exists schedules_course_weekday_idx
  on public.schedules (course_id, weekday);

-- ------------------------------------------------------------- student_links --
create table if not exists public.student_links (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  student_id uuid not null references public.students (id) on delete cascade,
  created_at timestamptz not null default now()
);
comment on table public.student_links is 'Per-student magic link tokens used to attribute visits. Token is opaque and unique.';
create index if not exists student_links_student_id_idx
  on public.student_links (student_id);

-- -------------------------------------------------------------------- visits --
create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  student_link_id uuid references public.student_links (id) on delete set null,
  student_id uuid references public.students (id) on delete set null,
  occurred_at timestamptz not null default now(),
  ip text,
  ip_city text,
  ip_country text,
  user_agent text,
  resolved_course_id uuid references public.courses (id) on delete set null,
  resolved_subject_id uuid references public.subjects (id) on delete set null,
  resolved_schedule_id uuid references public.schedules (id) on delete set null,
  created_at timestamptz not null default now()
);
comment on table public.visits is
  'Link-visit log. Written server-side with service_role only (no anon policies). '
  'Contains personal data (IP/geo/UA): subject to Colombia Ley 1581 retention rules — add cleanup job.';
create index if not exists visits_student_link_id_idx on public.visits (student_link_id);
create index if not exists visits_student_id_idx on public.visits (student_id);
create index if not exists visits_occurred_at_idx on public.visits (occurred_at desc);

-- -------------------------------------------------------------------- alerts --
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid not null references public.visits (id) on delete cascade,
  type text not null check (type in ('different_ip', 'same_ip_repeat')),
  severity text not null check (severity in ('high', 'moderate')),
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
comment on table public.alerts is 'Suspicious-visit flags derived from visits (different_ip | same_ip_repeat).';
create index if not exists alerts_visit_id_idx on public.alerts (visit_id);

-- ------------------------------------------------------------ shared_reports --
create table if not exists public.shared_reports (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  scope_subject_id uuid references public.subjects (id) on delete cascade,
  scope_course_id uuid references public.courses (id) on delete cascade,
  expires_at timestamptz,
  revoked boolean not null default false,
  created_at timestamptz not null default now()
);
comment on table public.shared_reports is 'Shareable report links, optionally scoped to one subject/course, revocable and expirable.';

-- ------------------------------------------------------------------ RLS ----
-- Deny-by-default: enable RLS everywhere with no anon/authenticated policies.
-- service_role bypasses RLS for trusted server writes; admin policies come later.

alter table public.courses enable row level security;
alter table public.students enable row level security;
alter table public.subjects enable row level security;
alter table public.subject_meet_links enable row level security;
alter table public.schedules enable row level security;
alter table public.student_links enable row level security;
alter table public.visits enable row level security;
alter table public.alerts enable row level security;
alter table public.shared_reports enable row level security;

revoke all on table
  public.courses,
  public.students,
  public.subjects,
  public.subject_meet_links,
  public.schedules,
  public.student_links,
  public.visits,
  public.alerts,
  public.shared_reports
from anon, authenticated;
