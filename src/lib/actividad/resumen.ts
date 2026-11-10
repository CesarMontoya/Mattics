/** Lectura legible de lo que cada estudiante respondió, para el panel docente. */

export const PASOS_TOTAL = 7;

export const ETIQUETAS_PASO: Record<string, string> = {
  prologo: "Prólogo",
  dinero: "1 · Historia del dinero",
  caja: "2 · Ingresos y gastos",
  precio: "3 · Ganancia y pérdida",
  consejos: "4 · Hábitos",
  semana: "5 · Enteros con signo",
  postal: "Cierre",
};

const DECISIONES: Record<string, string> = {
  guardar: "Contar y apartar antes de gastar",
  gastar: "Comprar primero",
  dejar: "No tocar la caja",
};

const METAS: Record<string, string> = {
  bicicleta: "Bicicleta",
  tableta: "Tableta",
  regalo: "Regalo para la abuela",
};

function money(value: number): string {
  return "$" + value.toLocaleString("es-CO");
}

export function contarPasos(progress: Record<string, unknown> | null | undefined): number {
  return Object.keys(progress ?? {}).length;
}

export function resumenRespuestas(answers: Record<string, unknown> | null | undefined): string[] {
  const data = (answers ?? {}) as Record<string, Record<string, unknown> | undefined>;
  const lines: string[] = [];

  const decision = data.prologo?.eleccion;
  if (typeof decision === "string") {
    lines.push(`Prólogo: ${DECISIONES[decision] ?? decision}`);
  }

  const precio = data.precio?.precio;
  if (typeof precio === "number") {
    const ganancia = data.precio?.ganancia;
    lines.push(
      `Precio del jugo: ${money(precio)}${typeof ganancia === "number" ? ` · ganancia ${money(ganancia)}` : ""}`,
    );
  }

  const resultado = data.semana?.resultado;
  const monto = data.semana?.monto;
  if (typeof resultado === "string" && typeof monto === "number") {
    lines.push(`Semana: ${resultado} de ${money(monto)}`);
  }

  const meta = data.postal?.meta;
  const semanas = data.postal?.semanas;
  if (typeof meta === "string") {
    lines.push(`Plan: ${METAS[meta] ?? meta}${typeof semanas === "number" ? ` en ${semanas} semanas` : ""}`);
  }

  return lines;
}

export function erroresPorPaso(progress: Record<string, unknown> | null | undefined): number {
  let total = 0;
  for (const entry of Object.values(progress ?? {})) {
    const attempts = (entry as { attempts?: unknown } | null)?.attempts;
    if (typeof attempts === "number") total += attempts;
  }
  return total;
}
