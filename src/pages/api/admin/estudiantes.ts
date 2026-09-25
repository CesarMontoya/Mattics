import type { APIRoute } from "astro";
import { requireAdminApi } from "@/lib/clases/guard";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;
  const form = await context.request.formData();
  const action = String(form.get("action") ?? "create");

  if (action === "create") {
    const full_name = String(form.get("full_name") ?? "").trim();
    const course_id = String(form.get("course_id") ?? "").trim() || null;
    if (!full_name) return redirect("/admin/estudiantes");
    await auth.service.from("students").insert({ full_name, course_id });
    return redirect("/admin/estudiantes?ok=1");
  }
  if (action === "update") {
    const id = String(form.get("id") ?? "");
    const full_name = String(form.get("full_name") ?? "").trim();
    const course_id = String(form.get("course_id") ?? "").trim() || null;
    if (!id || !full_name) return redirect("/admin/estudiantes");
    await auth.service.from("students").update({ full_name, course_id }).eq("id", id);
    return redirect("/admin/estudiantes?ok=1");
  }
  if (action === "delete") {
    const id = String(form.get("id") ?? "");
    if (id) await auth.service.from("students").delete().eq("id", id);
    return redirect("/admin/estudiantes?ok=1");
  }
  return redirect("/admin/estudiantes");
};

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}
