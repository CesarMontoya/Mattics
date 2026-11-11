/**
 * Lectura y escritura de las clases y entregas de la actividad (server-only).
 * Usa el cliente con service_role: las tablas tienen RLS sin políticas para
 * anon/authenticated, así que PostgREST directo queda negado.
 */
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";
import { generateCode } from "./codigo";

export const ACTIVITY_SLUG = "tienda-abuela";

export type SessionRow = {
  id: string;
  code: string;
  activity: string;
  title: string;
  course_id: string | null;
  created_at: string;
  closed_at: string | null;
};

export type SubmissionRow = {
  id: string;
  session_id: string;
  student_name: string;
  group_names: string[];
  progress: Record<string, unknown>;
  answers: Record<string, unknown>;
  attempts: unknown[];
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type SessionWithCount = SessionRow & { submissions: number };

function db() {
  return createSupabaseServiceRoleClient();
}

const CAMPOS_BASE = "id,session_id,student_name,group_names,progress,answers";
const CAMPOS_COMPLETOS = `${CAMPOS_BASE},attempts`;

/** La columna `attempts` llega con la migración 0007. Mientras no esté, no se rompe nada. */
function faltaColumna(error: { code?: string } | null): boolean {
  return error?.code === "42703" || error?.code === "PGRST204";
}

export async function findSessionByCode(code: string): Promise<SessionRow | null> {
  const { data, error } = await db()
    .from("activity_sessions")
    .select("id,code,activity,title,course_id,created_at,closed_at")
    .eq("code", code)
    .maybeSingle();
  if (error || !data) return null;
  return data as SessionRow;
}

export async function createSession(input: {
  title: string;
  courseId?: string | null;
  createdBy?: string | null;
}): Promise<{ session?: SessionRow; error?: string }> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const { data, error } = await db()
      .from("activity_sessions")
      .insert({
        code: generateCode(),
        activity: ACTIVITY_SLUG,
        title: input.title,
        course_id: input.courseId ?? null,
        created_by: input.createdBy ?? null,
      })
      .select("id,code,activity,title,course_id,created_at,closed_at")
      .single();

    if (!error && data) return { session: data as SessionRow };
    // 23505 = código repetido: se intenta con otro.
    if (error && error.code !== "23505") return { error: error.message };
  }
  return { error: "No se pudo generar un código único." };
}

export async function listSessions(): Promise<SessionWithCount[]> {
  const { data: sessions, error } = await db()
    .from("activity_sessions")
    .select("id,code,activity,title,course_id,created_at,closed_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error || !sessions) return [];
  if (sessions.length === 0) return [];

  const { data: rows } = await db()
    .from("activity_submissions")
    .select("session_id")
    .in(
      "session_id",
      sessions.map((session) => session.id),
    );

  const counts = new Map<string, number>();
  for (const row of rows ?? []) {
    counts.set(row.session_id, (counts.get(row.session_id) ?? 0) + 1);
  }

  return (sessions as SessionRow[]).map((session) => ({
    ...session,
    submissions: counts.get(session.id) ?? 0,
  }));
}

export async function getSessionById(id: string): Promise<SessionRow | null> {
  const { data, error } = await db()
    .from("activity_sessions")
    .select("id,code,activity,title,course_id,created_at,closed_at")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as SessionRow;
}

export async function listSubmissions(sessionId: string): Promise<SubmissionRow[]> {
  const base = (columns: string) =>
    db()
      .from("activity_submissions")
      .select(`${columns},completed_at,created_at,updated_at`)
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

  const first = await base(CAMPOS_COMPLETOS);
  if (!first.error && first.data) return first.data as SubmissionRow[];
  if (!faltaColumna(first.error)) return [];

  const fallback = await base(CAMPOS_BASE);
  if (fallback.error || !fallback.data) return [];
  return (fallback.data as Omit<SubmissionRow, "attempts">[]).map((row) => ({ ...row, attempts: [] }));
}

export async function createSubmission(input: {
  sessionId: string;
  studentName: string;
  groupNames: string[];
}): Promise<{ token?: string; id?: string; error?: string }> {
  const { data, error } = await db()
    .from("activity_submissions")
    .insert({
      session_id: input.sessionId,
      token: crypto.randomUUID(),
      student_name: input.studentName,
      group_names: input.groupNames,
    })
    .select("id,token")
    .single();
  if (error || !data) return { error: error?.message ?? "No se pudo registrar." };
  return { id: data.id as string, token: data.token as string };
}

export async function updateSubmissionByToken(
  token: string,
  patch: {
    progress?: Record<string, unknown>;
    answers?: Record<string, unknown>;
    attempts?: unknown[];
    completed?: boolean;
  },
): Promise<{ ok: boolean; error?: string }> {
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.progress) update.progress = patch.progress;
  if (patch.answers) update.answers = patch.answers;
  if (patch.attempts) update.attempts = patch.attempts;
  if (typeof patch.completed === "boolean") {
    update.completed_at = patch.completed ? new Date().toISOString() : null;
  }

  const first = await db().from("activity_submissions").update(update).eq("token", token);
  if (!first.error) return { ok: true };

  // Sin la columna `attempts` (migración 0007 pendiente) se guarda el resto.
  if (faltaColumna(first.error) && "attempts" in update) {
    const { attempts: _omit, ...rest } = update as Record<string, unknown>;
    const retry = await db().from("activity_submissions").update(rest).eq("token", token);
    if (!retry.error) return { ok: true };
    return { ok: false, error: retry.error.message };
  }

  return { ok: false, error: first.error.message };
}

export async function setSubmissionFinished(id: string, finished: boolean): Promise<void> {
  await db()
    .from("activity_submissions")
    .update({
      completed_at: finished ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
}

export async function getSubmissionById(
  id: string,
): Promise<(SubmissionRow & { session_id: string }) | null> {
  const first = await db()
    .from("activity_submissions")
    .select(`${CAMPOS_COMPLETOS},completed_at,created_at,updated_at`)
    .eq("id", id)
    .maybeSingle();
  if (!first.error && first.data) return first.data as SubmissionRow;
  if (!faltaColumna(first.error)) return null;

  const fallback = await db()
    .from("activity_submissions")
    .select(`${CAMPOS_BASE},completed_at,created_at,updated_at`)
    .eq("id", id)
    .maybeSingle();
  if (fallback.error || !fallback.data) return null;
  return { ...(fallback.data as Omit<SubmissionRow, "attempts">), attempts: [] };
}

export async function closeSession(id: string, closed: boolean): Promise<void> {
  await db()
    .from("activity_sessions")
    .update({ closed_at: closed ? new Date().toISOString() : null })
    .eq("id", id);
}

export async function deleteSession(id: string): Promise<void> {
  await db().from("activity_sessions").delete().eq("id", id);
}
