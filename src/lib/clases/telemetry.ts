/**
 * Visit telemetry helpers for the /ir/[token] landing route (server-only).
 *
 * - getClientIp: prefer x-forwarded-for, fall back to Astro.clientAddress.
 * - fetchIpGeo: best-effort city/country lookup via api.ipquery.io,
 *   2.5s timeout, NEVER throws (returns nulls on any failure).
 * - parseUserAgent: short, DB-safe UA summary.
 */

export type IpGeo = {
  city: string | null;
  country: string | null;
};

const NULL_GEO: IpGeo = { city: null, country: null };

const IPQUERY_TIMEOUT_MS = 2500;
const MAX_UA_LENGTH = 255;

/**
 * Resolve the client IP. Proxies/LB set x-forwarded-for as a comma-separated
 * list where the first entry is the original client.
 */
export function getClientIp(
  clientAddress: string | null | undefined,
  headers: Headers,
): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded
      .split(",")
      .map((part) => part.trim())
      .find((part) => part.length > 0 && part.toLowerCase() !== "unknown");
    if (first) return stripIPv6Prefix(first);
  }
  const direct = (clientAddress ?? "").trim();
  if (direct) return stripIPv6Prefix(direct);
  return null;
}

function stripIPv6Prefix(ip: string): string {
  // Node may report IPv4 as ::ffff:1.2.3.4 — unwrap for geo lookup.
  if (ip.startsWith("::ffff:")) return ip.slice("::ffff:".length);
  return ip;
}

/** Never throws: any network/parse/timeout failure yields { city: null, country: null }. */
export async function fetchIpGeo(ip: string | null | undefined): Promise<IpGeo> {
  if (!ip) return { ...NULL_GEO };
  const trimmed = ip.trim();
  // Skip lookups that can never resolve to geo data.
  if (
    trimmed === "" ||
    trimmed === "127.0.0.1" ||
    trimmed === "::1" ||
    trimmed.toLowerCase() === "localhost"
  ) {
    return { ...NULL_GEO };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), IPQUERY_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://api.ipquery.io/${encodeURIComponent(trimmed)}?format=json`,
      { signal: controller.signal, headers: { Accept: "application/json" } },
    );
    if (!res.ok) return { ...NULL_GEO };
    const data = (await res.json()) as unknown;
    return extractGeo(data);
  } catch {
    return { ...NULL_GEO };
  } finally {
    clearTimeout(timer);
  }
}

function asStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

/** ipquery.io nests geo under `location`; accept flat shape too. */
function extractGeo(data: unknown): IpGeo {
  if (typeof data !== "object" || data === null) return { ...NULL_GEO };
  const root = data as Record<string, unknown>;
  const location =
    typeof root.location === "object" && root.location !== null
      ? (root.location as Record<string, unknown>)
      : null;
  const city =
    (location ? asStringOrNull(location.city) : null) ??
    asStringOrNull(root.city) ??
    null;
  const country =
    (location ? asStringOrNull(location.country) : null) ??
    asStringOrNull(root.country) ??
    asStringOrNull(root.country_code) ??
    asStringOrNull(root.countryCode) ??
    null;
  return { city, country };
}

/** Short UA summary safe to store/display (max 255 chars, never throws). */
export function parseUserAgent(ua: string | null | undefined): string {
  try {
    if (!ua) return "desconocido";
    const compact = ua.replace(/\s+/g, " ").trim();
    if (!compact) return "desconocido";
    return compact.length > MAX_UA_LENGTH
      ? compact.slice(0, MAX_UA_LENGTH)
      : compact;
  } catch {
    return "desconocido";
  }
}
