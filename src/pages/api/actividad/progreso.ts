import type { APIRoute } from "astro";
import { updateSubmissionByToken } from "@/lib/actividad/store";

export const prerender = false;

const MAX_PROGRESS_BYTES = 4000;
const MAX_ANSWERS_BYTES = 8000;

function respond(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return respond({ error: "Cuerpo inválido." }, 400);
  }

  const token = typeof body.token === "string" ? body.token.trim() : "";
  if (token.length < 10) return respond({ error: "Token inválido." }, 400);

  const progress = asRecord(body.progress);
  const answers = asRecord(body.answers);
  if (!progress && !answers) return respond({ error: "Nada que guardar." }, 400);

  if (progress && JSON.stringify(progress).length > MAX_PROGRESS_BYTES) {
    return respond({ error: "El progreso es demasiado grande." }, 413);
  }
  if (answers && JSON.stringify(answers).length > MAX_ANSWERS_BYTES) {
    return respond({ error: "Las respuestas son demasiado grandes." }, 413);
  }

  const result = await updateSubmissionByToken(token, {
    progress: progress ?? undefined,
    answers: answers ?? undefined,
    completed: body.completed === true,
  });
  if (!result.ok) return respond({ error: result.error ?? "No se pudo guardar." }, 500);

  return respond({ ok: true });
};
