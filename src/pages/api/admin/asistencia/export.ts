import type { APIRoute } from "astro";
import * as XLSX from "xlsx";
import { requireAdminApi } from "@/lib/clases/guard";

export const prerender = false;

async function loadAttendance(service: any, params: URLSearchParams) {
  const fCurso = params.get("curso") ?? "";
  const fAsignatura = params.get("asignatura") ?? "";
  const fDia = params.get("dia") ?? "";
  const fClase = params.get("clase") ?? "";

  let studentQuery = service.from("students").select("id,full_name,course_id").order("full_name");
  if (fCurso) studentQuery = studentQuery.eq("course_id", fCurso);
  const { data: students } = await studentQuery;

  let visitQuery = service.from("visits").select("student_id").limit(2000);
  if (fCurso) visitQuery = visitQuery.eq("resolved_course_id", fCurso);
  if (fAsignatura) visitQuery = visitQuery.eq("resolved_subject_id", fAsignatura);
  if (fClase) visitQuery = visitQuery.eq("resolved_schedule_id", fClase);
  if (fDia) {
    visitQuery = visitQuery.gte("occurred_at", `${fDia}T00:00:00Z`).lt("occurred_at", `${fDia}T23:59:59.999Z`);
  }
  const { data: visits } = await visitQuery;
  const presentIds = new Set((visits ?? []).map((v) => v.student_id).filter(Boolean) as string[]);
  return { students: students ?? [], presentIds, fCurso, fAsignatura, fDia, fClase };
}

export const GET: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;
  const params = context.url.searchParams;
  const format = params.get("format") ?? "xlsx";
  const { students, presentIds, fDia } = await loadAttendance(auth.service, params);

  const rows = students.map((s) => ({
    estudiante: s.full_name,
    estado: presentIds.has(s.id) ? "Presente" : "Ausente",
    dia: fDia || "",
  }));

  if (format === "md") {
    const md = [
      "# Asistencia — Mattics",
      "",
      `Día: ${fDia || "—"}`,
      "",
      "| Estudiante | Estado |",
      "| --- | --- |",
      ...rows.map((r) => `| ${r.estudiante.replace(/\|/g, "\\|")} | ${r.estado} |`),
      "",
    ].join("\n");
    return new Response(md, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": 'attachment; filename="asistencia.md"',
      },
    });
  }

  // Default: xlsx
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows, { header: ["estudiante", "estado", "dia"] }), "Asistencia");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
  return new Response(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="asistencia.xlsx"',
    },
  });
};
