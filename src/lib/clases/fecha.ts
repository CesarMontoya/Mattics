export const BOGOTA_TZ = "America/Bogota";

type FechaValue = string | number | Date | null | undefined;

function toDate(value: FechaValue): Date | null {
  if (value === null || value === undefined || value === "") return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatFechaHora(value: FechaValue, fallback = "—"): string {
  const d = toDate(value);
  if (!d) return fallback;
  return d.toLocaleString("es-CO", { timeZone: BOGOTA_TZ, hour12: false });
}

export function formatFecha(value: FechaValue, fallback = "—"): string {
  const d = toDate(value);
  if (!d) return fallback;
  return d.toLocaleDateString("es-CO", { timeZone: BOGOTA_TZ });
}

export function rangoDiaBogota(fDia: string): { desde: string; hasta: string } {
  const [y, m, d] = fDia.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + 1));
  const pad = (n: number) => String(n).padStart(2, "0");
  const nextStr = `${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}`;
  return {
    desde: `${fDia}T05:00:00.000Z`,
    hasta: `${nextStr}T05:00:00.000Z`,
  };
}
