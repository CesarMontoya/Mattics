import type { APIRoute } from "astro";
import { requireAdminApi } from "@/lib/clases/guard";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;
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
