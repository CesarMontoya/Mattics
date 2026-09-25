-- 0002_service_role_grants.sql
-- The service_role key bypasses RLS but still needs table/sequence grants
-- for PostgREST. This project keeps anon/authenticated fully revoked
-- (see 0001), so grant everything explicitly to service_role only.

grant all on table
  public.courses,
  public.students,
  public.subjects,
  public.subject_meet_links,
  public.schedules,
  public.student_links,
  public.visits,
  public.alerts,
  public.shared_reports
to service_role;

grant usage, select on all sequences in schema public to service_role;

-- Future tables created by migrations stay usable by the server client.
alter default privileges in schema public
  grant all on tables to service_role;

alter default privileges in schema public
  grant usage, select on sequences to service_role;
