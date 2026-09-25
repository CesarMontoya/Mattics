/**
 * Matemática pura del informe de padres (segundo periodo).
 *
 * Fórmula definida por el propietario (suma simple, sin ponderaciones):
 * - SUMA = P1 + P2 (parcial acumulado sin el periodo III).
 *   Es `null` si falta P1 o P2.
 * - need3 = 9 - SUMA: nota necesaria en el periodo III para ganar (9).
 *   Es `null` si SUMA es `null`.
 * - Nivel de riesgo según need3: < 4 verde, 4..5 naranja, > 5 rojo
 *   (más de 5.0 es imposible porque esa es la nota máxima).
 * - Tendencia = signo de (P2 - P1).
 *
 * Todo es `null`-seguro: una celda vacía del concentrador nunca se
 * trata como cero.
 */

export type Score = number | null | undefined;

export type RiskLevel = "verde" | "naranja" | "rojo";

export type Trend = "subió" | "bajó" | "igual";

function isMissing(score: Score): score is null | undefined {
  return score === null || score === undefined || Number.isNaN(score);
}

/** Suma parcial acumulada: P1 + P2; `null` si falta algún periodo. */
export function calcSuma(period1: Score, period2: Score): number | null {
  if (isMissing(period1) || isMissing(period2)) return null;
  return period1 + period2;
}

/** Nota necesaria en el periodo III para ganar (9); `null` si SUMA es `null`. */
export function calcNeed3(suma: Score): number | null {
  if (isMissing(suma)) return null;
  return 9 - suma;
}

export type RiskResult = {
  level: RiskLevel;
  /** `true` cuando la nota necesaria supera la máxima posible (5.0). */
  imposible: boolean;
};

/** Nivel de riesgo a partir de la nota necesaria en el periodo III. */
export function riskLevel(need3: Score): RiskResult | null {
  if (isMissing(need3)) return null;
  if (need3 < 4) return { level: "verde", imposible: false };
  if (need3 <= 5) return { level: "naranja", imposible: false };
  return { level: "rojo", imposible: true };
}

/** Tendencia entre periodos; `null` si falta algún periodo. */
export function calcTrend(period1: Score, period2: Score): Trend | null {
  if (isMissing(period1) || isMissing(period2)) return null;
  const diff = period2 - period1;
  if (diff > 0) return "subió";
  if (diff < 0) return "bajó";
  return "igual";
}
