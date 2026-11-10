import type { APIRoute } from "astro";
import * as XLSX from "xlsx";
import { requireAdminApi } from "@/lib/clases/guard";
import { getSessionById, listSubmissions } from "@/lib/actividad/store";
import { PASOS_TOTAL, contarPasos, erroresPorPaso, resumenRespuestas } from "@/lib/actividad/resumen";
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
    return {
      estudiante: row.student_name,
      grupo: row.group_names.join(", "),
      pasos: `${contarPasos(row.progress)} de ${PASOS_TOTAL}`,
      estado: row.completed_at ? "Terminada" : "En curso",
      respuestas: respuestas.join(" | "),
      intentos_adicionales: erroresPorPaso(row.progress),
      actualizado: formatFechaHora(row.updated_at),
    };
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(rows, {
      header: ["estudiante", "grupo", "pasos", "estado", "respuestas", "intentos_adicionales", "actualizado"],
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
