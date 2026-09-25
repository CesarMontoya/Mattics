import type { APIRoute } from "astro";
import { requireAdminApi } from "@/lib/clases/guard";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;
  const form = await context.request.formData();
  const action = String(form.get("action") ?? "create");

  if (action === "create") {
    const name = String(form.get("name") ?? "").trim();
    if (!name) return redirect("/admin/asignaturas");
    await auth.service.from("subjects").insert({ name });
    return redirect("/admin/asignaturas?ok=1");
  }
  if (action === "update") {
    const id = String(form.get("id") ?? "");
    const name = String(form.get("name") ?? "").trim();
    if (!id || !name) return redirect("/admin/asignaturas");
    await auth.service.from("subjects").update({ name }).eq("id", id);
    return redirect("/admin/asignaturas?ok=1");
  }
  if (action === "delete") {
    const id = String(form.get("id") ?? "");
    if (id) await auth.service.from("subjects").delete().eq("id", id);
    return redirect("/admin/asignaturas?ok=1");
  }
  return redirect("/admin/asignaturas");
};

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}
