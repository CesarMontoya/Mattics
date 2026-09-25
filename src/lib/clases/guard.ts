import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { AstroCookies } from "astro";
import {
  getSupabaseServiceRoleKey,
  requirePublicSupabaseEnv,
} from "@/lib/supabase/env";

export type SupabaseServerContext = {
  cookies: AstroCookies;
  headers: Headers;
};

/** Per-request SSR client (auth session via cookies). */
export function createSupabaseServerClient(ctx: SupabaseServerContext) {
  const { url, publishableKey } = requirePublicSupabaseEnv();
  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(ctx.headers.get("cookie") ?? "");
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          ctx.cookies.set(name, value, options);
        }
      },
    },
  });
}

/** Privileged service-role client (bypasses RLS). Server-only, never to browser. */
export function createSupabaseServiceRoleClient() {
  const { url } = requirePublicSupabaseEnv();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Page-level guard: returns { supabase, user, service } or null when no session. */
export async function requireAdminPage(Astro: {
  cookies: AstroCookies;
  request: Request;
}) {
  const supabase = createSupabaseServerClient({
    cookies: Astro.cookies,
    headers: Astro.request.headers,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return { supabase, user, service: createSupabaseServiceRoleClient() };
}

/** API-level guard: returns user + clients, or a 401 Response when unauthenticated. */
export async function requireAdminApi(context: {
  cookies: AstroCookies;
  request: Request;
}): Promise<
  | { ok: true; user: { id: string; email?: string }; service: ReturnType<typeof createSupabaseServiceRoleClient> }
  | { ok: false; response: Response }
> {
  try {
    const supabase = createSupabaseServerClient({
      cookies: context.cookies,
      headers: context.request.headers,
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        ok: false,
        response: new Response(JSON.stringify({ error: "No autorizado" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }),
      };
    }
    return { ok: true, user, service: createSupabaseServiceRoleClient() };
  } catch {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }
}
