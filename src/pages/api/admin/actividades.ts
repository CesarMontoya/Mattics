import type { APIRoute } from "astro";
import { requireAdminApi } from "@/lib/clases/guard";
import { closeSession, createSession, deleteSession, setSubmissionFinished } from "@/lib/actividad/store";

export const prerender = false;

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}

export const POST: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;

  const form = await context.request.formData();
  const action = String(form.get("action") ?? "create");

  if (action === "create") {
    const title = String(form.get("title") ?? "").trim();
    const courseId = String(form.get("course_id") ?? "").trim();
    if (!title) return redirect("/admin/actividades?error=titulo");

    const created = await createSession({
      title: title.slice(0, 120),
      courseId: courseId || null,
      createdBy: auth.user.id,
    });
    if (!created.session) {
      return redirect(`/admin/actividades?error=crear&detail=${encodeURIComponent(created.error ?? "")}`);
    }
    return redirect(`/admin/actividades/${created.session.id}?ok=1`);
  }

  if (action === "finish" || action === "unfinish") {
    const submissionId = String(form.get("submission_id") ?? "");
    const sessionId = String(form.get("session_id") ?? "");
    if (!submissionId || !sessionId) return redirect("/admin/actividades");
    await setSubmissionFinished(submissionId, action === "finish");
    return redirect(`/admin/actividades/${sessionId}/${submissionId}?ok=1`);
  }

  const id = String(form.get("id") ?? "");
  if (!id) return redirect("/admin/actividades");

  if (action === "close") {
    await closeSession(id, true);
    return redirect(`/admin/actividades/${id}?ok=1`);
  }
  if (action === "reopen") {
    await closeSession(id, false);
    return redirect(`/admin/actividades/${id}?ok=1`);
  }
  if (action === "delete") {
    await deleteSession(id);
    return redirect("/admin/actividades?ok=1");
  }

  return redirect("/admin/actividades");
};
