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
    if (!name) return redirect("/admin/cursos?error=nombre");
    const { error } = await auth.service.from("courses").insert({ name });
    if (error) return redirect(`/admin/cursos?error=crear&detail=${encodeURIComponent(error.message)}`);
    return redirect("/admin/cursos?ok=1");
  }

  if (action === "delete") {
    const id = String(form.get("id") ?? "");
    if (!id) return redirect("/admin/cursos");
    await auth.service.from("courses").delete().eq("id", id);
    return redirect("/admin/cursos?ok=1");
  }

  return redirect("/admin/cursos");
};

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}
