export const MEET_URL_PREFIX = "https://meet.google.com/";

export function isValidMeetUrl(url: string): boolean {
  return url.trim().startsWith(MEET_URL_PREFIX);
}

export const WEEKDAY_OPTIONS = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
] as const;

export function weekdayLabel(n: number): string {
  return WEEKDAY_OPTIONS.find((w) => w.value === n)?.label ?? String(n);
}

export function shortTime(t: string | null | undefined): string {
  if (!t) return "";
  return t.slice(0, 5);
}

/** "13:00" -> { h: 1, suffix: "p. m." } (12h, es-CO style). */
function hour12Parts(t: string): { h: number; suffix: "a. m." | "p. m." } {
  const hh = Number(t.slice(0, 2));
  const h = hh % 12 === 0 ? 12 : hh % 12;
  return { h, suffix: hh < 12 ? "a. m." : "p. m." };
}

/** Gutter label for a whole hour: 12 -> "12 p. m.", 13 -> "1 p. m.". */
export function hourLabel12(hour24: number): string {
  const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${h} ${hour24 < 12 ? "a. m." : "p. m."}`;
}

/** "13:55" -> "1:55 p. m.". */
export function shortTime12(t: string | null | undefined): string {
  if (!t) return "";
  const { h, suffix } = hour12Parts(t);
  return `${h}:${t.slice(3, 5)} ${suffix}`;
}

/** "13:00"–"13:55" -> "1:00 – 1:55 p. m." (suffix once when shared). */
export function timeRange12(
  start: string | null | undefined,
  end: string | null | undefined,
): string {
  if (!start || !end) return "";
  const a = hour12Parts(start);
  const b = hour12Parts(end);
  const left = `${a.h}:${start.slice(3, 5)}${a.suffix === b.suffix ? "" : ` ${a.suffix}`}`;
  return `${left} – ${b.h}:${end.slice(3, 5)} ${b.suffix}`;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
