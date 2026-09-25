import type { APIRoute } from "astro";
import * as XLSX from "xlsx";
import { requireAdminApi } from "@/lib/clases/guard";

export const prerender = false;

/** POST { courseIds: string[] } -> .xlsx with one sheet per course (estudiante, curso, enlace). */
export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;

  let courseIds: string[] = [];
  try {
    const body = await context.request.json();
    if (Array.isArray(body?.courseIds)) courseIds = body.courseIds.map(String).filter(Boolean);
  } catch {
    courseIds = [];
  }

  let courseQuery = auth.service.from("courses").select("id,name").order("name");
  if (courseIds.length > 0) courseQuery = courseQuery.in("id", courseIds);
  const { data: courses } = await courseQuery;
  const { data: students } = await auth.service.from("students").select("id,full_name,course_id");
  const { data: links } = await auth.service.from("student_links").select("token,student_id");

  const tokenByStudent = new Map<string, string>();
  for (const l of (links ?? [])) {
    if (!tokenByStudent.has(l.student_id)) tokenByStudent.set(l.student_id, l.token);
  }
  const origin = new URL(context.request.url).origin;

  const wb = XLSX.utils.book_new();
  const courseList = courses ?? [];
  if (courseList.length === 0) {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet([]), "Sin cursos");
  }
  for (const course of courseList) {
    const rows = (students ?? [])
      .filter((s) => s.course_id === course.id)
      .map((s) => {
        const token = tokenByStudent.get(s.id);
        return {
          estudiante: s.full_name,
          curso: course.name,
          enlace: token ? `${origin}/ir/${token}` : "",
        };
      });
    const sheetName = course.name.slice(0, 31) || "Curso";
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(rows, { header: ["estudiante", "curso", "enlace"] }),
      sheetName,
    );
  }

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
  const body = new Uint8Array(buf);
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="enlaces-estudiantes.xlsx"',
    },
  });
};
