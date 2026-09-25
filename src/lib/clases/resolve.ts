/**
 * Schedule resolution for virtual classes (server-only).
 *
 * Pure matching helpers are separated from the DB fetch so they can be
 * unit-tested without Supabase. All times are evaluated in the
 * America/Bogota timezone (school local time).
 *
 * DB model (supabase/migrations/0001_clases_virtuales.sql + 0003_teachers.sql):
 * - schedules: course_id, subject_id (nullable), teacher_id (nullable),
 *   weekday 0=Sunday..6=Saturday, start_time / end_time (time, "HH:MM:SS").
 * - subjects: id, name.
 * - subject_meet_links: subject_id, teacher_id (nullable), url, label.
 *   When a schedule has teacher_id, the link with the matching teacher_id
 *   wins; otherwise the first link of the subject is used.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const BOGOTA_TZ = "America/Bogota";

/** Spanish weekday names indexed by DB weekday (0=Sunday..6=Saturday). */
export const WEEKDAY_NAMES_ES = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
] as const;

export type ScheduleRow = {
  id: string;
  course_id: string;
  subject_id: string | null;
  teacher_id: string | null;
  weekday: number;
  start_time: string;
  end_time: string;
};

export type SubjectRow = {
  id: string;
  name: string;
};

export type MeetLinkRow = {
  id: string;
  subject_id: string;
  teacher_id: string | null;
  url: string;
  label: string | null;
};

export type EnrichedClass = {
  schedule: ScheduleRow;
  subject: SubjectRow | null;
  meetUrl: string | null;
};

export type Resolution = {
  /** Class happening right now in America/Bogota, or null. */
  schedule: ScheduleRow | null;
  subject: SubjectRow | null;
  meetUrl: string | null;
  /** Next upcoming class (excluding the current one), or null. */
  nextClass: EnrichedClass | null;
};

export type BogotaParts = {
  /** 0=Sunday..6=Saturday */
  weekday: number;
  /** "HH:MM:SS" 24h in America/Bogota */
  time: string;
};

const SHORT_WEEKDAY_TO_NUM: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/**
 * Pure: extract weekday + wall-clock time in America/Bogota from a Date.
 * Uses Intl so DST/offsets are handled by the runtime (Bogota is UTC-5
 * year-round, but Intl keeps this correct regardless).
 */
export function getBogotaParts(now: Date): BogotaParts {
  const weekdayShort = new Intl.DateTimeFormat("en-US", {
    timeZone: BOGOTA_TZ,
    weekday: "short",
  }).format(now);
  const weekday = SHORT_WEEKDAY_TO_NUM[weekdayShort] ?? 0;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOGOTA_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  // Some runtimes emit "24" for midnight with hour12:false — normalize.
  const hour = get("hour") === "24" ? "00" : get("hour");
  const time = `${hour}:${get("minute")}:${get("second")}`;
  return { weekday, time };
}

/** Pure: normalize "HH:MM" / "HH:MM:SS" to "HH:MM:SS" for comparison. */
export function normalizeTime(t: string): string {
  const s = t.trim();
  if (/^\d{2}:\d{2}:\d{2}$/.test(s)) return s;
  if (/^\d{2}:\d{2}$/.test(s)) return `${s}:00`;
  return s;
}

/** Pure: schedule currently in session (start <= time < end) or null. */
export function matchCurrentSchedule(
  schedules: ScheduleRow[],
  weekday: number,
  time: string,
): ScheduleRow | null {
  const t = normalizeTime(time);
  const candidates = schedules
    .filter(
      (s) =>
        s.weekday === weekday &&
        normalizeTime(s.start_time) <= t &&
        t < normalizeTime(s.end_time),
    )
    .sort((a, b) =>
      normalizeTime(a.start_time) < normalizeTime(b.start_time) ? -1 : 1,
    );
  return candidates[0] ?? null;
}

/**
 * Pure: next class strictly after the given weekday+time (same-day entries
 * require start_time > time), ordered by day offset then start time.
 */
export function findNextSchedule(
  schedules: ScheduleRow[],
  weekday: number,
  time: string,
): ScheduleRow | null {
  const t = normalizeTime(time);
  const upcoming = schedules
    .map((s) => ({
      s,
      dayOffset: (s.weekday - weekday + 7) % 7,
    }))
    .filter(({ s, dayOffset }) => {
      if (dayOffset === 0) return normalizeTime(s.start_time) > t;
      return true;
    })
    .sort((a, b) => {
      if (a.dayOffset !== b.dayOffset) return a.dayOffset - b.dayOffset;
      return normalizeTime(a.s.start_time) < normalizeTime(b.s.start_time)
        ? -1
        : 1;
    });
  return upcoming[0]?.s ?? null;
}

export type CourseScheduleData = {
  schedules: ScheduleRow[];
  subjectsById: Map<string, SubjectRow>;
  meetUrlBySubjectId: Map<string, string>;
  /** All links per subject (stable order by created_at) for teacher matching. */
  meetLinksBySubjectId: Map<string, MeetLinkRow[]>;
};

/** DB fetch via the service-role client (bypasses RLS, server-only). */
export async function fetchCourseScheduleData(
  courseId: string,
  client: SupabaseClient,
): Promise<CourseScheduleData> {
  const { data: schedules, error: schedulesError } = await client
    .from("schedules")
    .select("id,course_id,subject_id,teacher_id,weekday,start_time,end_time")
    .eq("course_id", courseId)
    .order("weekday", { ascending: true })
    .order("start_time", { ascending: true });
  if (schedulesError) throw schedulesError;

  const rows = (schedules ?? []) as ScheduleRow[];
  const subjectIds = [...new Set(rows.map((r) => r.subject_id).filter(Boolean))] as string[];

  const subjectsById = new Map<string, SubjectRow>();
  const meetUrlBySubjectId = new Map<string, string>();
  const meetLinksBySubjectId = new Map<string, MeetLinkRow[]>();
  if (subjectIds.length > 0) {
    const { data: subjects, error: subjectsError } = await client
      .from("subjects")
      .select("id,name")
      .in("id", subjectIds);
    if (subjectsError) throw subjectsError;
    for (const subj of (subjects ?? []) as SubjectRow[]) {
      subjectsById.set(subj.id, subj);
    }

    const { data: links, error: linksError } = await client
      .from("subject_meet_links")
      .select("id,subject_id,teacher_id,url,label")
      .in("subject_id", subjectIds)
      .order("created_at", { ascending: true });
    if (linksError) throw linksError;
    for (const link of (links ?? []) as MeetLinkRow[]) {
      const list = meetLinksBySubjectId.get(link.subject_id) ?? [];
      list.push(link);
      meetLinksBySubjectId.set(link.subject_id, list);
      // First link per subject wins (stable order by created_at).
      if (!meetUrlBySubjectId.has(link.subject_id) && link.url) {
        meetUrlBySubjectId.set(link.subject_id, link.url);
      }
    }
  }

  return { schedules: rows, subjectsById, meetUrlBySubjectId, meetLinksBySubjectId };
}

function enrich(
  schedule: ScheduleRow | null,
  subjectsById: Map<string, SubjectRow>,
  meetUrlBySubjectId: Map<string, string>,
  meetLinksBySubjectId?: Map<string, MeetLinkRow[]>,
): EnrichedClass | null {
  if (!schedule) return null;
  const subject = schedule.subject_id
    ? (subjectsById.get(schedule.subject_id) ?? null)
    : null;
  let meetUrl: string | null = null;
  if (schedule.subject_id) {
    // When the schedule names a teacher, prefer the link of that same
    // teacher; otherwise fall back to the first link of the subject.
    if (schedule.teacher_id && meetLinksBySubjectId) {
      const match = (meetLinksBySubjectId.get(schedule.subject_id) ?? []).find(
        (l) => l.teacher_id === schedule.teacher_id && l.url,
      );
      if (match) meetUrl = match.url;
    }
    meetUrl ??= meetUrlBySubjectId.get(schedule.subject_id) ?? null;
  }
  return { schedule, subject, meetUrl };
}

/**
 * Resolve which virtual class (if any) is live now for a course, plus the
 * next upcoming class. Returns null when the course has no schedules at all.
 *
 * Pass a client for tests; otherwise a service-role client is created
 * (server-only — never call from the browser).
 */
export async function resolveScheduleFor(
  courseId: string,
  now: Date,
  client?: SupabaseClient,
): Promise<Resolution | null> {
  const supabase = client ?? createSupabaseServiceRoleClient();
  const { schedules, subjectsById, meetUrlBySubjectId, meetLinksBySubjectId } =
    await fetchCourseScheduleData(courseId, supabase);

  if (schedules.length === 0) return null;

  const { weekday, time } = getBogotaParts(now);
  const current = matchCurrentSchedule(schedules, weekday, time);
  const next = findNextSchedule(schedules, weekday, time);

  const enrichedCurrent = enrich(
    current,
    subjectsById,
    meetUrlBySubjectId,
    meetLinksBySubjectId,
  );
  const enrichedNext = enrich(
    next,
    subjectsById,
    meetUrlBySubjectId,
    meetLinksBySubjectId,
  );

  if (enrichedCurrent) {
    return {
      schedule: enrichedCurrent.schedule,
      subject: enrichedCurrent.subject,
      meetUrl: enrichedCurrent.meetUrl,
      nextClass: enrichedNext,
    };
  }
  return {
    schedule: null,
    subject: null,
    meetUrl: null,
    nextClass: enrichedNext,
  };
}
