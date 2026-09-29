import type { APIRoute } from "astro";
import { requireAdminApi } from "@/lib/clases/guard";
import { MEET_URL_PREFIX } from "@/lib/clases/admin";

export const prerender = false;

type Service = {
  from: (table: string) => any;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isValidWeekday(n: unknown): n is number {
  return typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 6;
}

function isTimeString(v: unknown): v is string {
  return typeof v === "string" && /^\d{2}:\d{2}(:\d{2})?$/.test(v.trim());
}

async function handleCreateMany(service: Service, body: any) {
  const courseIds = Array.isArray(body?.course_ids)
    ? [...new Set(body.course_ids.filter((c: unknown) => typeof c === "string" && c.trim()))] as string[]
    : [];
  const subjectId =
    typeof body?.subject_id === "string" && body.subject_id.trim()
      ? body.subject_id.trim()
      : null;
  const teacherId =
    typeof body?.teacher_id === "string" && body.teacher_id.trim()
      ? body.teacher_id.trim()
      : null;
  const weekday = body?.weekday;
  const startTime = body?.start_time;
  const endTime = body?.end_time;
  const meetUrl =
    typeof body?.meet_url === "string" ? body.meet_url.trim() : "";

  if (courseIds.length === 0) return jsonResponse({ error: "Selecciona al menos un curso." }, 400);
  if (!isValidWeekday(weekday)) return jsonResponse({ error: "Día inválido (0–6)." }, 400);
  if (!isTimeString(startTime) || !isTimeString(endTime) || startTime >= endTime) {
    return jsonResponse({ error: "La hora de inicio debe ser anterior a la de fin." }, 400);
  }
  if (meetUrl && !meetUrl.startsWith(MEET_URL_PREFIX)) {
    return jsonResponse({ error: `El enlace debe comenzar con ${MEET_URL_PREFIX}` }, 400);
  }

  const rows = courseIds.map((course_id) => ({
    course_id,
    subject_id: subjectId,
    teacher_id: teacherId,
    weekday,
    start_time: startTime.trim(),
    end_time: endTime.trim(),
  }));
  const { error: insertError } = await service
    .from("schedules")
    .insert(rows);
  if (insertError) {
    return jsonResponse({ error: "No se pudo crear el horario." }, 500);
  }

  await upsertMeetLink(service, subjectId, teacherId, meetUrl);

  return jsonResponse({ ok: true, created: rows.length });
}

async function upsertMeetLink(
  service: Service,
  subjectId: string | null,
  teacherId: string | null,
  meetUrl: string,
) {
  // Upsert del enlace Meet (select-then-update-or-insert: sin constraint único).
  if (!meetUrl || !subjectId) return;
  let query = service
    .from("subject_meet_links")
    .select("id")
    .eq("subject_id", subjectId)
    .order("created_at", { ascending: true });
  query = teacherId ? query.eq("teacher_id", teacherId) : query.is("teacher_id", null);
  const { data: existing } = await query;
  const first = Array.isArray(existing) ? existing[0] : null;
  if (first?.id) {
    await service.from("subject_meet_links").update({ url: meetUrl }).eq("id", first.id);
  } else {
    await service
      .from("subject_meet_links")
      .insert({ subject_id: subjectId, teacher_id: teacherId, url: meetUrl });
  }
}
async function handleUpdate(service: Service, body: any) {
  const id = typeof body?.id === "string" ? body.id.trim() : "";
  const subjectId =
    typeof body?.subject_id === "string" && body.subject_id.trim()
      ? body.subject_id.trim()
      : null;
  const teacherId =
    typeof body?.teacher_id === "string" && body.teacher_id.trim()
      ? body.teacher_id.trim()
      : null;
  const weekday = body?.weekday;
  const startTime = body?.start_time;
  const endTime = body?.end_time;
  const meetUrl =
    typeof body?.meet_url === "string" ? body.meet_url.trim() : "";

  if (!id) return jsonResponse({ error: "Falta el id." }, 400);
  if (!isValidWeekday(weekday)) return jsonResponse({ error: "Día inválido (0–6)." }, 400);
  if (!isTimeString(startTime) || !isTimeString(endTime) || startTime >= endTime) {
    return jsonResponse({ error: "La hora de inicio debe ser anterior a la de fin." }, 400);
  }
  if (meetUrl && !meetUrl.startsWith(MEET_URL_PREFIX)) {
    return jsonResponse({ error: `El enlace debe comenzar con ${MEET_URL_PREFIX}` }, 400);
  }

  const { error: updateError } = await service
    .from("schedules")
    .update({
      subject_id: subjectId,
      teacher_id: teacherId,
      weekday,
      start_time: startTime.trim(),
      end_time: endTime.trim(),
    })
    .eq("id", id);
  if (updateError) {
    return jsonResponse({ error: "No se pudo actualizar el horario." }, 500);
  }

  await upsertMeetLink(service, subjectId, teacherId, meetUrl);
  return jsonResponse({ ok: true });
}

async function handleDeleteJson(service: Service, body: any) {
  const id = typeof body?.id === "string" ? body.id : "";
  if (!id) return jsonResponse({ error: "Falta el id." }, 400);
  await service.from("schedules").delete().eq("id", id);
  return jsonResponse({ ok: true });
}

export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;

  const contentType = context.request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await context.request.json().catch(() => null)) as any;
    const action = typeof body?.action === "string" ? body.action : "";
    if (action === "create-many") return handleCreateMany(auth.service, body);
    if (action === "update") return handleUpdate(auth.service, body);
    if (action === "delete") return handleDeleteJson(auth.service, body);
    return jsonResponse({ error: "Acción desconocida." }, 400);
  }

  const form = await context.request.formData();
  const action = String(form.get("action") ?? "create");

  if (action === "create") {
    const course_id = String(form.get("course_id") ?? "").trim();
    const subject_id = String(form.get("subject_id") ?? "").trim() || null;
    const weekday = Number(form.get("weekday"));
    const start_time = String(form.get("start_time") ?? "").trim();
    const end_time = String(form.get("end_time") ?? "").trim();
    if (!course_id || !(weekday >= 0 && weekday <= 6) || !start_time || !end_time || start_time >= end_time) {
      return redirect("/admin/horarios?error=datos");
    }
    await auth.service.from("schedules").insert({ course_id, subject_id, weekday, start_time, end_time });
    return redirect("/admin/horarios?ok=1");
  }
  if (action === "delete") {
    const id = String(form.get("id") ?? "");
    if (id) await auth.service.from("schedules").delete().eq("id", id);
    return redirect("/admin/horarios?ok=1");
  }
  return redirect("/admin/horarios");
};

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}
