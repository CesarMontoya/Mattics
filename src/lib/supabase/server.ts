import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { AstroCookies } from "astro";
import {
  getSupabaseServiceRoleKey,
  requirePublicSupabaseEnv,
} from "./env";

export type SupabaseServerContext = {
  /** `Astro.cookies` in pages/actions, or `context.cookies` in API routes. */
  cookies: AstroCookies;
  /** Request headers carrying the `Cookie` header for `getAll()`. */
  headers: Headers;
};

/**
 * Per-request SSR Supabase client for Astro (server output, Node standalone).
 *
 * Pass the current request's cookies + headers so auth storage is isolated
 * per request — never reuse one instance across requests.
 *
 * Usage in an `.astro` page / API route / action:
 * ```ts
 * export const prerender = false;
 * const supabase = createSupabaseServerClient({
 *   cookies: Astro.cookies,
 *   headers: Astro.request.headers,
 * });
 * // API route: createSupabaseServerClient({ cookies: context.cookies, headers: context.request.headers })
 * ```
 */
export function createSupabaseServerClient(ctx: SupabaseServerContext) {
  const { url, publishableKey } = requirePublicSupabaseEnv();
  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(ctx.headers.get("cookie") ?? "");
      },
      setAll(cookiesToSet) {
        // Astro applies these as `Set-Cookie` on the outgoing response.
        for (const { name, value, options } of cookiesToSet) {
          ctx.cookies.set(name, value, options);
        }
      },
    },
  });
}

/**
 * Server-only privileged client using the service_role key (bypasses RLS).
 * Use ONLY for trusted server writes such as `visits` ingestion where no
 * end-user session exists. NEVER call from browser code.
 *
 * Throws when SUPABASE_SERVICE_ROLE_KEY is missing.
 */
export function createSupabaseServiceRoleClient() {
  const { url } = requirePublicSupabaseEnv();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
