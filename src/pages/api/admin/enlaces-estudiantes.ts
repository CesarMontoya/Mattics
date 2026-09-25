import type { APIRoute } from "astro";
import { randomBytes } from "node:crypto";
import { requireAdminApi } from "@/lib/clases/guard";

export const prerender = false;

function newToken(): string {
  return randomBytes(16).toString("hex"); // 32 hex chars
}

export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;
  const form = await context.request.formData();
  const action = String(form.get("action") ?? "");

  if (action === "regenerate") {
    const student_id = String(form.get("student_id") ?? "");
    if (!student_id) return redirect("/admin/enlaces-estudiantes");
    await auth.service.from("student_links").delete().eq("student_id", student_id);
    await auth.service.from("student_links").insert({ student_id, token: newToken() });
    return redirect("/admin/enlaces-estudiantes?ok=1");
  }

  if (action === "bulk") {
    const filterCourses = form.getAll("curso").map(String).filter(Boolean);
    let q = auth.service.from("students").select("id,course_id");
    if (filterCourses.length > 0) q = q.in("course_id", filterCourses);
    const { data: students } = await q;
    const { data: existing } = await auth.service.from("student_links").select("student_id");
    const withLink = new Set((existing ?? []).map((l) => l.student_id));
    const missing = (students ?? []).filter((s) => !withLink.has(s.id));
    if (missing.length > 0) {
      await auth.service.from("student_links").insert(
        missing.map((s) => ({ student_id: s.id, token: newToken() })),
      );
    }
    const qs = filterCourses.length > 0 ? `?${filterCourses.map((c) => `curso=${encodeURIComponent(c)}`).join("&")}` : "?ok=1";
    return redirect(`/admin/enlaces-estudiantes${qs}`);
  }

  return redirect("/admin/enlaces-estudiantes");
};

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}
