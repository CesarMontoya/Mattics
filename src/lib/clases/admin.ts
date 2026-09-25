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

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
