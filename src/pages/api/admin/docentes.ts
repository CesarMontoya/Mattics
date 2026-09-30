import type { APIRoute } from "astro";
import { requireAdminApi } from "@/lib/clases/guard";

export const prerender = false;

function normalizeName(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim().replace(/\s+/g, " ").toUpperCase();
}

async function findOrCreateTeacher(service: { from: (t: string) => any }, fullName: string) {
  const { data: existing } = await service
    .from("teachers")
    .select("id,full_name")
    .eq("full_name", fullName)
    .maybeSingle();
  if (existing) return { teacher: existing, created: false };
  const { data, error } = await service
    .from("teachers")
    .insert({ full_name: fullName })
    .select("id,full_name")
    .single();
  if (error) return { teacher: null, created: false };
  return { teacher: data, created: true };
}

export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;

  const contentType = context.request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await context.request.json().catch(() => null)) as any;
    const action = typeof body?.action === "string" ? body.action : "";
    if (action === "create") {
      const fullName = normalizeName(body?.full_name);
      if (!fullName) {
        return new Response(JSON.stringify({ error: "Ingresa el nombre del docente." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const { teacher } = await findOrCreateTeacher(auth.service, fullName);
      if (!teacher) {
        return new Response(JSON.stringify({ error: "No se pudo crear el docente." }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ ok: true, teacher }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Acción desconocida." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const form = await context.request.formData();
  const action = String(form.get("action") ?? "create");

  if (action === "create") {
    const fullName = normalizeName(form.get("full_name"));
    if (!fullName) return redirect("/admin/docentes?error=nombre");
    await findOrCreateTeacher(auth.service, fullName);
    return redirect("/admin/docentes?ok=1");
  }

  if (action === "delete") {
    const id = String(form.get("id") ?? "");
    if (id) await auth.service.from("teachers").delete().eq("id", id);
    return redirect("/admin/docentes?ok=1");
  }

  return redirect("/admin/docentes");
};

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}
