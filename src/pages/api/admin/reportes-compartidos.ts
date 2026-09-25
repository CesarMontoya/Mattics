import type { APIRoute } from "astro";
import { randomBytes } from "node:crypto";
import { requireAdminApi } from "@/lib/clases/guard";

export const prerender = false;

function newToken(): string {
  return randomBytes(16).toString("hex"); // 32 hex chars
}

function cleanId(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
}

export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;
  const form = await context.request.formData();
  const action = String(form.get("action") ?? "");

  if (action === "create") {
    const scope_subject_id = cleanId(form.get("scope_subject_id"));
    const scope_course_id = cleanId(form.get("scope_course_id"));
    const expiryRaw = String(form.get("expiry_days") ?? "").trim();
    const expiryDays = expiryRaw === "" ? null : Number(expiryRaw);
    const allowed = [1, 7, 15, 30, 90];

    let expires_at: string | null = null;
    if (expiryDays !== null) {
      if (!Number.isInteger(expiryDays) || !allowed.includes(expiryDays)) {
        return redirect("/admin/reportes-compartidos?error=expiry");
      }
      expires_at = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString();
    }

    const { error } = await auth.service.from("shared_reports").insert({
      token: newToken(),
      scope_subject_id,
      scope_course_id,
      expires_at,
    });
    if (error) {
      console.error("[reportes-compartidos] create failed:", error.message);
      return redirect("/admin/reportes-compartidos?error=create");
    }
    return redirect("/admin/reportes-compartidos?ok=1");
  }

  if (action === "revoke") {
    const id = cleanId(form.get("id"));
    if (!id) return redirect("/admin/reportes-compartidos");
    const { error } = await auth.service
      .from("shared_reports")
      .update({ revoked: true })
      .eq("id", id);
    if (error) console.error("[reportes-compartidos] revoke failed:", error.message);
    return redirect("/admin/reportes-compartidos?ok=1");
  }

  return redirect("/admin/reportes-compartidos");
};

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}
