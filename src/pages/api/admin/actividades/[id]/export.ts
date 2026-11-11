import type { APIRoute } from "astro";
import * as XLSX from "xlsx";
import { requireAdminApi } from "@/lib/clases/guard";
import { getSessionById, listSubmissions } from "@/lib/actividad/store";
import { PASOS_TOTAL, agruparIntentos, contarIntentos, contarPasos, resumenRespuestas } from "@/lib/actividad/resumen";
import { formatFechaHora } from "@/lib/clases/fecha";

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const auth = await requireAdminApi(context);
  if (!auth.ok) return auth.response;

  const id = context.params.id ?? "";
  const session = await getSessionById(id);
  if (!session) {
    return new Response(JSON.stringify({ error: "No existe" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const submissions = await listSubmissions(session.id);

  const rows = submissions.map((row) => {
    const respuestas = resumenRespuestas(row.answers);
    const secciones = agruparIntentos(row.attempts);
    const correctos = secciones.reduce((sum, section) => sum + section.correct, 0);
    const incorrectos = secciones.reduce((sum, section) => sum + section.wrong, 0);
    return {
      estudiantes: [row.student_name, ...row.group_names].join(" | "),
      pasos: `${contarPasos(row.progress)} de ${PASOS_TOTAL}`,
      estado: row.completed_at ? "Terminada" : "En curso",
      intentos: contarIntentos(row.attempts),
      correctos,
      incorrectos,
      respuestas: respuestas.join(" | "),
      actualizado: formatFechaHora(row.updated_at),
    };
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(rows, {
      header: ["estudiantes", "pasos", "estado", "intentos", "correctos", "incorrectos", "respuestas", "actualizado"],
    }),
    "Entregas",
  );
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;

  const safeTitle = session.title.replace(/[^a-zA-Z0-9-_]+/g, "-").slice(0, 40) || "actividad";
  return new Response(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${safeTitle}-${session.code}.xlsx"`,
    },
  });
};
