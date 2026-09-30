import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { WEEKDAY_OPTIONS, MEET_URL_PREFIX } from "@/lib/clases/admin";
import type {
  PlannerCourse,
  PlannerMeetLink,
  PlannerSchedule,
  PlannerSubject,
  PlannerTeacher,
} from "./SchedulePlanner";

export type ScheduleDialogInitial = {
  courseIds: string[];
  weekday: number;
  start: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: PlannerCourse[];
  subjects: PlannerSubject[];
  teachers: PlannerTeacher[];
  meetLinks: PlannerMeetLink[];
  initial: ScheduleDialogInitial;
  /** When set, the dialog edits this session instead of creating new ones. */
  editing?: PlannerSchedule | null;
};

function addMinutes(t: string, mins: number): string {
  const parts = t.split(":");
  const h = Number(parts[0] ?? 0);
  const m = Number(parts[1] ?? 0);
  const total = h * 60 + m + mins;
  const hh = String(Math.floor(total / 60) % 24).padStart(2, "0");
  const mm = String(((total % 60) + 60) % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** Resolver rule: link whose teacher matches wins, else first link of subject. */
function resolveLinkUrl(
  links: PlannerMeetLink[],
  subjectId: string,
  teacherId: string,
): string {
  const ofSubject = links.filter((l) => l.subject_id === subjectId);
  if (ofSubject.length === 0) return "";
  if (teacherId) {
    const match = ofSubject.find((l) => l.teacher_id === teacherId);
    if (match) return match.url;
  }
  return ofSubject[0]?.url ?? "";
}

const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm";
const labelCls = "text-sm font-medium block mb-1";

export default function ScheduleCreateDialog({
  open,
  onOpenChange,
  courses,
  subjects,
  teachers,
  meetLinks,
  initial,
  editing = null,
}: Props) {
  const isEdit = editing != null;
  const [courseIds, setCourseIds] = React.useState<string[]>(initial.courseIds);
  const [courseOpen, setCourseOpen] = React.useState(false);
  const [courseSearch, setCourseSearch] = React.useState("");
  const [subjectId, setSubjectId] = React.useState("");
  const [subjectOpen, setSubjectOpen] = React.useState(false);
  const [subjectSearch, setSubjectSearch] = React.useState("");
  const [teacherId, setTeacherId] = React.useState("");
  const [teacherList, setTeacherList] = React.useState<PlannerTeacher[]>(teachers);
  const [newTeacher, setNewTeacher] = React.useState("");
  const [creatingTeacher, setCreatingTeacher] = React.useState(false);
  const [showCreateTeacher, setShowCreateTeacher] = React.useState(false);
  const [meetUrl, setMeetUrl] = React.useState("");
  const [weekday, setWeekday] = React.useState(initial.weekday);
  const [start, setStart] = React.useState(initial.start);
  const [end, setEnd] = React.useState(() => addMinutes(initial.start, 55));
  const [endTouched, setEndTouched] = React.useState(false);
  const [linkTouched, setLinkTouched] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [confirmingDelete, setConfirmingDelete] = React.useState(false);
  const lastPrefill = React.useRef("");

  // Reset every time the dialog opens: edit context or new cell context.
  React.useEffect(() => {
    if (!open) return;
    setTeacherList(teachers);
    setNewTeacher("");
    setShowCreateTeacher(false);
    setCreatingTeacher(false);
    if (editing) {
      const subj = editing.subject_id ?? "";
      const teach = editing.teacher_id ?? "";
      const url = resolveLinkUrl(meetLinks, subj, teach);
      setCourseIds([editing.course_id]);
      setSubjectId(subj);
      setTeacherId(teach);
      setWeekday(editing.weekday);
      setStart(editing.start_time.slice(0, 5));
      setEnd(editing.end_time.slice(0, 5));
      setEndTouched(true);
      setMeetUrl(url);
      lastPrefill.current = url;
      setLinkTouched(false);
    } else {
      setCourseIds(initial.courseIds);
      setSubjectId("");
      setTeacherId("");
      setWeekday(initial.weekday);
      setStart(initial.start);
      setEnd(addMinutes(initial.start, 55));
      setEndTouched(false);
      setMeetUrl("");
      setLinkTouched(false);
      lastPrefill.current = "";
    }
    setCourseOpen(false);
    setCourseSearch("");
    setSubjectOpen(false);
    setSubjectSearch("");
    setConfirmingDelete(false);
    setError(null);
    setSaving(false);
    setDeleting(false);
  }, [open, editing, teachers, initial.courseIds, initial.weekday, initial.start]);

  // Teachers linked to the selected subject via subject_meet_links.
  const linkedTeacherIds = React.useMemo(() => {
    if (!subjectId) return [] as string[];
    const ids = meetLinks
      .filter((l) => l.subject_id === subjectId && l.teacher_id)
      .map((l) => l.teacher_id as string);
    return [...new Set(ids)];
  }, [subjectId, meetLinks]);

  const linkedTeachers = React.useMemo(
    () => teacherList.filter((t) => linkedTeacherIds.includes(t.id)),
    [teacherList, linkedTeacherIds],
  );
  const useLinkedList = linkedTeachers.length > 0;

  const selectedSubject = subjects.find((s) => s.id === subjectId) ?? null;
  const selectedTeacher =
    teacherList.find((t) => t.id === teacherId) ?? null;

  // Create a teacher inline without leaving the dialog.
  const handleCreateTeacher = async () => {
    const name = newTeacher.trim();
    if (!name) {
      setError("Escribe el nombre del docente.");
      return;
    }
    setCreatingTeacher(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/docentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", full_name: name }),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
        teacher?: PlannerTeacher;
      } | null;
      if (!res.ok || !data?.teacher) {
        setError(data?.error ?? "No se pudo crear el docente.");
        setCreatingTeacher(false);
        return;
      }
      const t = data.teacher;
      setTeacherList((prev) =>
        (prev.some((x) => x.id === t.id) ? prev : [...prev, t]).sort((a, b) =>
          a.full_name.localeCompare(b.full_name, "es"),
        ),
      );
      setNewTeacher("");
      setShowCreateTeacher(false);
      setCreatingTeacher(false);
      handleTeacherSelect(t.id);
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
      setCreatingTeacher(false);
    }
  };

  // When the subject changes: default teacher to first linked one + prefill link.
  const handleSubjectSelect = (id: string) => {
    setSubjectId(id);
    setSubjectOpen(false);
    setSubjectSearch("");
    const firstLinked = meetLinks
      .filter((l) => l.subject_id === id && l.teacher_id)
      .map((l) => l.teacher_id as string)[0];
    const nextTeacher = firstLinked ?? "";
    setTeacherId(nextTeacher);
    const nextUrl = resolveLinkUrl(meetLinks, id, nextTeacher);
    setMeetUrl(nextUrl);
    lastPrefill.current = nextUrl;
    setLinkTouched(false);
    setError(null);
  };

  // When the teacher changes: prefill link unless the user typed a custom one.
  const handleTeacherSelect = (id: string) => {
    setTeacherId(id);
    if (!subjectId) return;
    const nextUrl = resolveLinkUrl(meetLinks, subjectId, id);
    if (!linkTouched || meetUrl === lastPrefill.current) {
      setMeetUrl(nextUrl);
      lastPrefill.current = nextUrl;
    }
  };

  const handleStartChange = (v: string) => {
    setStart(v);
    if (!endTouched && v) setEnd(addMinutes(v, 55));
  };

  const toggleCourse = (id: string) => {
    setCourseIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(courseSearch.trim().toLowerCase()),
  );
  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(subjectSearch.trim().toLowerCase()),
  );

  const handleSave = async () => {
    setError(null);
    if (!isEdit && courseIds.length === 0) {
      setError("Selecciona al menos un curso.");
      return;
    }
    if (!start || !end || start >= end) {
      setError("La hora de inicio debe ser anterior a la de fin.");
      return;
    }
    const url = meetUrl.trim();
    if (url && !url.startsWith(MEET_URL_PREFIX)) {
      setError(`El enlace debe comenzar con ${MEET_URL_PREFIX}`);
      return;
    }
    setSaving(true);
    try {
      const payload = isEdit
        ? {
            action: "update",
            id: editing.id,
            subject_id: subjectId || null,
            teacher_id: teacherId || null,
            weekday,
            start_time: start,
            end_time: end,
            meet_url: url,
          }
        : {
            action: "create-many",
            course_ids: courseIds,
            subject_id: subjectId || null,
            teacher_id: teacherId || null,
            weekday,
            start_time: start,
            end_time: end,
            meet_url: url,
          };
      const res = await fetch("/api/admin/horarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        setError(data?.error ?? "No se pudo guardar el horario.");
        setSaving(false);
        return;
      }
      window.location.reload();
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editing) return;
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    setError(null);
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/horarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id: editing.id }),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        setError(data?.error ?? "No se pudo eliminar el horario.");
        setDeleting(false);
        setConfirmingDelete(false);
        return;
      }
      window.location.reload();
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
      setDeleting(false);
      setConfirmingDelete(false);
    }
  };

  const editingCourseName =
    editing != null
      ? (courses.find((c) => c.id === editing.course_id)?.name ?? editing.course_name)
      : null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-lg max-h-[92vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-5 shadow-lg">
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Cerrar y cancelar"
              className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
          <Dialog.Title className="text-lg font-semibold pr-8">
            {isEdit ? "Editar horario" : "Nuevo horario"}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground mb-4">
            {isEdit
              ? `Sesión de ${editingCourseName ?? "curso"}. Guarda los cambios o elimina la sesión.`
              : "Se creará la misma franja en cada curso seleccionado."}
          </Dialog.Description>

          <div className="grid gap-4">
            {/* Cursos: multi-combobox with tags (locked in edit mode) */}
            <div>
              <span className={labelCls} id="dlg-courses-label">
                {isEdit ? "Curso" : "Cursos *"}
              </span>
              {isEdit ? (
                <p className="rounded-lg border border-input bg-muted/60 px-3 py-2 text-sm font-medium">
                  {editingCourseName ?? "—"}
                </p>
              ) : (
              <div className="rounded-lg border border-input bg-background px-2 py-1.5">
                <div className="flex flex-wrap gap-1.5">
                  {courseIds.map((id) => {
                    const c = courses.find((x) => x.id === id);
                    if (!c) return null;
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-2 py-0.5 text-xs font-medium"
                      >
                        {c.name}
                        <button
                          type="button"
                          aria-label={`Quitar ${c.name}`}
                          onClick={() => toggleCourse(id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                  {courseIds.length === 0 && (
                    <span className="text-xs text-muted-foreground px-1 py-1">
                      Sin cursos — selecciónalos abajo
                    </span>
                  )}
                </div>
                <div className="relative mt-1.5">
                  <button
                    type="button"
                    aria-labelledby="dlg-courses-label"
                    aria-expanded={courseOpen}
                    onClick={() => setCourseOpen((v) => !v)}
                    className="w-full rounded-md border border-border px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted"
                  >
                    {courseOpen ? "Cerrar lista" : "Añadir cursos…"}
                  </button>
                  {courseOpen && (
                    <div className="absolute left-0 right-0 z-10 mt-1 rounded-lg border border-border bg-card shadow-lg">
                      <input
                        type="text"
                        placeholder="Buscar curso…"
                        value={courseSearch}
                        onChange={(e) => setCourseSearch(e.target.value)}
                        className="w-full border-b border-border bg-transparent px-3 py-2 text-sm outline-none"
                      />
                      <ul className="max-h-44 overflow-y-auto p-1">
                        {filteredCourses.map((c) => (
                          <li key={c.id}>
                            <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted">
                              <input
                                type="checkbox"
                                checked={courseIds.includes(c.id)}
                                onChange={() => toggleCourse(c.id)}
                                className="accent-current"
                              />
                              {c.name}
                            </label>
                          </li>
                        ))}
                        {filteredCourses.length === 0 && (
                          <li className="px-2 py-3 text-xs text-muted-foreground">
                            Sin coincidencias.
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              )}
            </div>

            {/* Asignatura: single searchable combobox */}
            <div>
              <span className={labelCls} id="dlg-subject-label">
                Asignatura
              </span>
              <div className="relative">
                <button
                  type="button"
                  aria-labelledby="dlg-subject-label"
                  aria-expanded={subjectOpen}
                  onClick={() => setSubjectOpen((v) => !v)}
                  className={`${inputCls} text-left ${selectedSubject ? "" : "text-muted-foreground"}`}
                >
                  {selectedSubject ? selectedSubject.name : "Sin asignatura"}
                </button>
                {subjectOpen && (
                  <div className="absolute left-0 right-0 z-10 mt-1 rounded-lg border border-border bg-card shadow-lg">
                    <input
                      type="text"
                      placeholder="Buscar asignatura…"
                      value={subjectSearch}
                      onChange={(e) => setSubjectSearch(e.target.value)}
                      className="w-full border-b border-border bg-transparent px-3 py-2 text-sm outline-none"
                    />
                    <ul className="max-h-44 overflow-y-auto p-1">
                      <li>
                        <button
                          type="button"
                          onClick={() => handleSubjectSelect("")}
                          className="w-full rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-muted"
                        >
                          Sin asignatura
                        </button>
                      </li>
                      {filteredSubjects.map((s) => (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => handleSubjectSelect(s.id)}
                            className={`w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted ${s.id === subjectId ? "font-semibold" : ""}`}
                          >
                            {s.name}
                          </button>
                        </li>
                      ))}
                      {filteredSubjects.length === 0 && (
                        <li className="px-2 py-3 text-xs text-muted-foreground">
                          Sin coincidencias.
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {/* Docente derivado */}
              {subjectId ? (
                <div className="mt-2 rounded-lg bg-muted/60 px-3 py-2">
                  {useLinkedList ? (
                    <div>
                      <label
                        htmlFor="dlg-teacher"
                        className="text-xs text-muted-foreground block mb-1"
                      >
                        Docente ({linkedTeachers.length}{" "}
                        {linkedTeachers.length === 1
                          ? "vinculado"
                          : "vinculados"}{" "}
                        a esta asignatura)
                      </label>
                      <select
                        id="dlg-teacher"
                        value={teacherId}
                        onChange={(e) => handleTeacherSelect(e.target.value)}
                        className={`${inputCls} py-1.5`}
                      >
                        <option value="">Sin docente asignado</option>
                        {linkedTeachers.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Sin docente asignado a esta asignatura. Puedes elegir
                        uno:
                      </p>
                      <select
                        id="dlg-teacher"
                        value={teacherId}
                        onChange={(e) => handleTeacherSelect(e.target.value)}
                        className={`${inputCls} py-1.5`}
                      >
                        <option value="">Sin docente asignado</option>
                        {teacherList.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedTeacher && (
                    <p className="mt-1 text-xs">
                      Docente:{" "}
                      <span className="font-medium">
                        {selectedTeacher.full_name}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-2 rounded-lg bg-muted/60 px-3 py-2">
                  <label
                    htmlFor="dlg-teacher"
                    className="text-xs text-muted-foreground block mb-1"
                  >
                    Docente (opcional)
                  </label>
                  <select
                    id="dlg-teacher"
                    value={teacherId}
                    onChange={(e) => handleTeacherSelect(e.target.value)}
                    className={`${inputCls} py-1.5`}
                  >
                    <option value="">Sin docente asignado</option>
                    {teacherList.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* Crear docente sin salir del diálogo */}
              <div className="mt-2">
                {!showCreateTeacher ? (
                  <button
                    type="button"
                    onClick={() => setShowCreateTeacher(true)}
                    className="text-xs text-primary hover:underline underline-offset-2"
                  >
                    ＋ Crear docente nuevo
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTeacher}
                      onChange={(e) => setNewTeacher(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          void handleCreateTeacher();
                        }
                      }}
                      placeholder="Nombre del docente"
                      maxLength={100}
                      className={`${inputCls} py-1.5`}
                    />
                    <button
                      type="button"
                      onClick={() => void handleCreateTeacher()}
                      disabled={creatingTeacher}
                      className="shrink-0 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium disabled:opacity-50"
                    >
                      {creatingTeacher ? "Creando…" : "Crear"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateTeacher(false);
                        setNewTeacher("");
                      }}
                      className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enlace */}
            <div>
              <label htmlFor="dlg-link" className={labelCls}>
                Enlace de Meet
              </label>
              <input
                id="dlg-link"
                type="url"
                value={meetUrl}
                onChange={(e) => {
                  setMeetUrl(e.target.value);
                  setLinkTouched(true);
                }}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                className={inputCls}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Se completa con el enlace existente de la asignatura y el
                docente. Puedes editarlo.
              </p>
            </div>

            {/* Día + horas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="dlg-weekday" className={labelCls}>
                  Día
                </label>
                <select
                  id="dlg-weekday"
                  value={weekday}
                  onChange={(e) => setWeekday(Number(e.target.value))}
                  className={inputCls}
                >
                  {WEEKDAY_OPTIONS.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dlg-start" className={labelCls}>
                  Hora inicio
                </label>
                <input
                  id="dlg-start"
                  type="time"
                  value={start}
                  onChange={(e) => handleStartChange(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="dlg-end" className={labelCls}>
                  Hora fin
                </label>
                <input
                  id="dlg-end"
                  type="time"
                  value={end}
                  onChange={(e) => {
                    setEnd(e.target.value);
                    setEndTouched(true);
                  }}
                  className={inputCls}
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              >
                {error}
              </p>
            )}

            <div className="flex items-center justify-between gap-2">
              {isEdit ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving || deleting}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-50 ${
                    confirmingDelete
                      ? "border-red-500 bg-red-600 text-white hover:bg-red-700"
                      : "border-red-200 text-red-600 hover:bg-red-50"
                  }`}
                >
                  {deleting
                    ? "Eliminando…"
                    : confirmingDelete
                      ? "Confirmar eliminación"
                      : "Borrar"}
                </button>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
                  >
                    Cancelar
                  </button>
                </Dialog.Close>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || deleting}
                  className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {saving
                    ? "Guardando…"
                    : isEdit
                      ? "Guardar cambios"
                      : `Guardar${courseIds.length > 1 ? ` en ${courseIds.length} cursos` : ""}`}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
