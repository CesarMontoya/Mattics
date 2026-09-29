import * as React from "react";
import { shortTime, weekdayLabel } from "@/lib/clases/admin";
import ScheduleCreateDialog, {
  type ScheduleDialogInitial,
} from "./ScheduleCreateDialog";

export type PlannerCourse = { id: string; name: string };
export type PlannerSubject = { id: string; name: string };
export type PlannerTeacher = { id: string; full_name: string };
export type PlannerMeetLink = {
  id: string;
  subject_id: string;
  teacher_id: string | null;
  url: string;
  label: string | null;
};
export type PlannerSchedule = {
  id: string;
  course_id: string;
  course_name: string;
  subject_id: string | null;
  subject_name: string | null;
  teacher_id: string | null;
  teacher_name: string | null;
  weekday: number;
  start_time: string;
  end_time: string;
};

type Props = {
  courses: PlannerCourse[];
  subjects: PlannerSubject[];
  teachers: PlannerTeacher[];
  meetLinks: PlannerMeetLink[];
  schedules: PlannerSchedule[];
};

const DAYS = [1, 2, 3, 4, 5]; // Lunes a Viernes
const START_HOUR = 6;
const END_HOUR = 18; // filas 06:00–17:00, la última termina a las 18:00
const HOUR_PX = 48;

const PALETTE = [
  { dot: "bg-blue-500", box: "border-blue-500 bg-blue-500/10" },
  { dot: "bg-emerald-500", box: "border-emerald-500 bg-emerald-500/10" },
  { dot: "bg-amber-500", box: "border-amber-500 bg-amber-500/10" },
  { dot: "bg-violet-500", box: "border-violet-500 bg-violet-500/10" },
  { dot: "bg-rose-500", box: "border-rose-500 bg-rose-500/10" },
  { dot: "bg-cyan-500", box: "border-cyan-500 bg-cyan-500/10" },
  { dot: "bg-lime-500", box: "border-lime-500 bg-lime-500/10" },
  { dot: "bg-orange-500", box: "border-orange-500 bg-orange-500/10" },
];

function toMinutes(t: string): number {
  const parts = t.split(":");
  return Number(parts[0] ?? 0) * 60 + Number(parts[1] ?? 0);
}

type Block = PlannerSchedule & {
  top: number;
  height: number;
  lane: number;
  lanes: number;
};

/** Position blocks of one day; overlapping blocks share the width side by side. */
function layoutDay(sessions: PlannerSchedule[]): Block[] {
  const sorted = [...sessions].sort(
    (a, b) => toMinutes(a.start_time) - toMinutes(b.start_time),
  );
  const clusters: PlannerSchedule[][] = [];
  for (const s of sorted) {
    const last = clusters[clusters.length - 1];
    const lastEnd =
      last == null
        ? -1
        : Math.max(...last.map((x) => toMinutes(x.end_time)));
    if (last != null && toMinutes(s.start_time) < lastEnd) {
      last.push(s);
    } else {
      clusters.push([s]);
    }
  }
  const out: Block[] = [];
  for (const cluster of clusters) {
    const laneEnds: number[] = [];
    const placed: Array<{ s: PlannerSchedule; lane: number }> = [];
    for (const s of cluster) {
      const start = toMinutes(s.start_time);
      let lane = laneEnds.findIndex((end) => end <= start);
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(toMinutes(s.end_time));
      } else {
        laneEnds[lane] = toMinutes(s.end_time);
      }
      placed.push({ s, lane });
    }
    const lanes = laneEnds.length;
    for (const { s, lane } of placed) {
      const top = (toMinutes(s.start_time) - START_HOUR * 60) * (HOUR_PX / 60);
      const height = Math.max(
        20,
        (toMinutes(s.end_time) - toMinutes(s.start_time)) * (HOUR_PX / 60),
      );
      out.push({ ...s, top, height, lane, lanes });
    }
  }
  return out;
}

export default function SchedulePlanner({
  courses,
  subjects,
  teachers,
  meetLinks,
  schedules,
}: Props) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<ScheduleDialogInitial>({
    courseIds: [],
    weekday: 1,
    start: "06:00",
  });
  const [deleting, setDeleting] = React.useState<string | null>(null);

  const toggleCourse = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const visible =
    selected.length === 0
      ? schedules
      : schedules.filter((s) => selected.includes(s.course_id));

  const colorOf = (courseId: string) => {
    const idx = courses.findIndex((c) => c.id === courseId);
    return PALETTE[(idx === -1 ? 0 : idx) % PALETTE.length] ?? PALETTE[0];
  };

  const openCreate = (weekday: number, hour: number) => {
    setDraft({
      courseIds: selected,
      weekday,
      start: `${String(hour).padStart(2, "0")}:00`,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (s: PlannerSchedule) => {
    const label = `${s.subject_name ?? "Sin asignatura"} · ${weekdayLabel(s.weekday)} ${shortTime(s.start_time)}–${shortTime(s.end_time)} (${s.course_name})`;
    if (!window.confirm(`¿Eliminar este horario?\n${label}`)) return;
    setDeleting(s.id);
    try {
      const res = await fetch("/api/admin/horarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id: s.id }),
      });
      if (!res.ok) {
        window.alert("No se pudo eliminar el horario.");
        setDeleting(null);
        return;
      }
      window.location.reload();
    } catch {
      window.alert("Error de red. Inténtalo de nuevo.");
      setDeleting(null);
    }
  };

  const hours: number[] = [];
  for (let h = START_HOUR; h < END_HOUR; h++) hours.push(h);

  return (
    <div>
      {/* Sección 1: filtro por curso */}
      <section aria-label="Filtrar por curso" className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {courses.map((c) => {
            const active = selected.includes(c.id);
            const palette = colorOf(c.id);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleCourse(c.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground border-primary font-medium"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full ${active ? "bg-primary-foreground" : palette?.dot ?? "bg-blue-500"}`}
                />
                {c.name}
              </button>
            );
          })}
          {courses.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No hay cursos todavía.
            </p>
          )}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {selected.length === 0
            ? "Sin selección: se muestran todos los cursos. Toca un curso para filtrar y preseleccionarlo al crear."
            : `${selected.length} ${selected.length === 1 ? "curso seleccionado" : "cursos seleccionados"}. Solo se muestran sus franjas. `}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="underline hover:text-foreground"
            >
              Mostrar todos
            </button>
          )}
        </p>
      </section>

      {/* Sección 2: calendario semanal */}
      <section aria-label="Calendario semanal">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Calendario · Lunes a Viernes</h2>
          <button
            type="button"
            onClick={() => {
              setDraft({ courseIds: selected, weekday: 1, start: "06:00" });
              setDialogOpen(true);
            }}
            className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
          >
            Nuevo horario
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <div className="min-w-[760px]">
            <div
              className="grid border-b border-border bg-muted/50"
              style={{ gridTemplateColumns: `64px repeat(${DAYS.length}, minmax(0, 1fr))` }}
            >
              <div />
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="px-2 py-2 text-center text-sm font-semibold"
                >
                  {weekdayLabel(d)}
                </div>
              ))}
            </div>

            <div
              className="grid"
              style={{ gridTemplateColumns: `64px repeat(${DAYS.length}, minmax(0, 1fr))` }}
            >
              {/* Gutter de horas */}
              <div aria-hidden>
                {hours.map((h) => (
                  <div
                    key={h}
                    className="border-t border-border/60 pr-2 text-right text-[11px] leading-[48px] text-muted-foreground h-12"
                  >
                    {String(h).padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              {DAYS.map((d) => {
                const blocks = layoutDay(
                  visible.filter((s) => s.weekday === d),
                );
                return (
                  <div
                    key={d}
                    className="relative border-l border-border/60"
                  >
                    {hours.map((h) => (
                      <button
                        key={h}
                        type="button"
                        title={`Crear horario el ${weekdayLabel(d)} a las ${String(h).padStart(2, "0")}:00`}
                        aria-label={`Crear horario el ${weekdayLabel(d)} a las ${String(h).padStart(2, "0")}:00`}
                        onClick={() => openCreate(d, h)}
                        className="block h-12 w-full border-t border-border/60 text-left hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
                      />
                    ))}
                    <div className="pointer-events-none absolute inset-0">
                      {blocks.map((b) => {
                        const palette = colorOf(b.course_id);
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => handleDelete(b)}
                            disabled={deleting === b.id}
                            title={`${b.subject_name ?? "Sin asignatura"} · ${b.course_name} · ${shortTime(b.start_time)}–${shortTime(b.end_time)} — clic para eliminar`}
                            className={`pointer-events-auto absolute overflow-hidden rounded-md border-l-4 border px-1.5 py-1 text-left shadow-sm hover:brightness-95 focus-visible:outline-2 ${palette?.box ?? ""}`}
                            style={{
                              top: b.top,
                              height: b.height,
                              left: `calc(${(b.lane * 100) / b.lanes}% + 2px)`,
                              width: `calc(${100 / b.lanes}% - 4px)`,
                            }}
                          >
                            <span className="block truncate text-xs font-semibold leading-tight">
                              {b.subject_name ?? "Sin asignatura"}
                            </span>
                            <span className="block truncate text-[11px] leading-tight text-muted-foreground">
                              {shortTime(b.start_time)}–
                              {shortTime(b.end_time)} · {b.course_name}
                            </span>
                            {b.height >= 56 && b.teacher_name && (
                              <span className="block truncate text-[11px] leading-tight text-muted-foreground">
                                {b.teacher_name}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Toca una celda vacía para crear una franja. Toca un bloque existente
          para eliminarlo.
        </p>
      </section>

      <ScheduleCreateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        courses={courses}
        subjects={subjects}
        teachers={teachers}
        meetLinks={meetLinks}
        initial={draft}
      />
    </div>
  );
}
