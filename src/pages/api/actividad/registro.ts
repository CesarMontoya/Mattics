import type { APIRoute } from "astro";
import { normalizeCode, isValidCode } from "@/lib/actividad/codigo";
import { createSubmission, findSessionByCode } from "@/lib/actividad/store";

export const prerender = false;

const MAX_GROUP = 6;

function bad(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function cleanName(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function hasFullName(name: string): boolean {
  return name.split(" ").filter(Boolean).length >= 2;
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return bad("Cuerpo inválido.");
  }

  const code = normalizeCode(String(body.code ?? ""));
  if (!isValidCode(code)) return bad("El código de la clase no es válido.");

  const studentName = cleanName(body.studentName);
  if (studentName.length < 5 || studentName.length > 80 || !hasFullName(studentName)) {
    return bad("Escribe el nombre completo (nombre y apellido).");
  }

  const rawGroup = Array.isArray(body.groupNames) ? body.groupNames : [];
  const groupNames = [...new Set(rawGroup.map(cleanName).filter((name) => name.length > 2))]
    .filter((name) => name.toLowerCase() !== studentName.toLowerCase())
    .slice(0, MAX_GROUP);

  if (groupNames.some((name) => name.length > 80)) {
    return bad("Uno de los nombres del grupo es demasiado largo.");
  }

  const session = await findSessionByCode(code);
  if (!session) return bad("No encontramos esa clase. Revisa el código.", 404);
  if (session.closed_at) return bad("La actividad de esta clase ya está cerrada.", 409);

  const created = await createSubmission({
    sessionId: session.id,
    studentName,
    groupNames,
  });
  if (!created.token) return bad(created.error ?? "No se pudo registrar la entrega.", 500);

  return new Response(
    JSON.stringify({
      token: created.token,
      names: [studentName, ...groupNames],
      title: session.title,
    }),
    { status: 201, headers: { "Content-Type": "application/json" } },
  );
};
