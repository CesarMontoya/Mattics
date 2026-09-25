import type { APIRoute } from "astro";
import { requireAdminApi } from "@/lib/clases/guard";
import { MEET_URL_PREFIX } from "@/lib/clases/admin";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;
  const form = await context.request.formData();
  const action = String(form.get("action") ?? "create");

  if (action === "create") {
    const subject_id = String(form.get("subject_id") ?? "").trim();
    const url = String(form.get("url") ?? "").trim();
    const label = String(form.get("label") ?? "").trim() || null;
    if (!subject_id || !url.startsWith(MEET_URL_PREFIX)) {
      return redirect("/admin/enlaces-meet?error=url");
    }
    await auth.service.from("subject_meet_links").insert({ subject_id, url, label });
    return redirect("/admin/enlaces-meet?ok=1");
  }
  if (action === "delete") {
    const id = String(form.get("id") ?? "");
    if (id) await auth.service.from("subject_meet_links").delete().eq("id", id);
    return redirect("/admin/enlaces-meet?ok=1");
  }
  return redirect("/admin/enlaces-meet");
};

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}
