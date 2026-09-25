/**
 * Centralized Supabase environment variable names and accessors.
 *
 * Public vars (safe to expose to the browser, `PUBLIC_` prefix for Astro):
 * - PUBLIC_SUPABASE_URL
 * - PUBLIC_SUPABASE_PUBLISHABLE_KEY
 *
 * Server-only secret (NEVER import this into client-side code):
 * - SUPABASE_SERVICE_ROLE_KEY
 */

export const SUPABASE_URL_ENV = "PUBLIC_SUPABASE_URL" as const;
export const SUPABASE_PUBLISHABLE_KEY_ENV =
  "PUBLIC_SUPABASE_PUBLISHABLE_KEY" as const;
export const SUPABASE_SERVICE_ROLE_KEY_ENV =
  "SUPABASE_SERVICE_ROLE_KEY" as const;

export const PUBLIC_SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL as
  | string
  | undefined;

export const PUBLIC_SUPABASE_PUBLISHABLE_KEY = import.meta.env
  .PUBLIC_SUPABASE_PUBLISHABLE_KEY as string | undefined;

/** Throw a helpful error when a public env var is missing. */
export function requirePublicSupabaseEnv(): {
  url: string;
  publishableKey: string;
} {
  if (!PUBLIC_SUPABASE_URL) {
    throw new Error(
      `Missing ${SUPABASE_URL_ENV}. Add it to your .env (see .env.example).`,
    );
  }
  if (!PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error(
      `Missing ${SUPABASE_PUBLISHABLE_KEY_ENV}. Add it to your .env (see .env.example).`,
    );
  }
  return { url: PUBLIC_SUPABASE_URL, publishableKey: PUBLIC_SUPABASE_PUBLISHABLE_KEY };
}

/**
 * Server-only: read the service_role key.
 * Works in Astro SSR via `process.env` (Node adapter) or `import.meta.env`.
 * Throws when missing so misconfiguration fails fast instead of silently
 * falling back to a less-privileged key.
 *
 * MUST only be called from server-side code (Astro actions, API routes,
 * `.astro` frontmatter with `export const prerender = false`, middleware).
 */
export function getSupabaseServiceRoleKey(): string {
  const fromProcess =
    typeof process !== "undefined"
      ? process.env?.[SUPABASE_SERVICE_ROLE_KEY_ENV]
      : undefined;
  // `import.meta.env` also exposes non-PUBLIC vars on the server in Astro.
  const fromMeta = import.meta.env?.[SUPABASE_SERVICE_ROLE_KEY_ENV] as
    | string
    | undefined;
  const key = fromProcess ?? fromMeta;
  if (!key) {
    throw new Error(
      `Missing ${SUPABASE_SERVICE_ROLE_KEY_ENV}. ` +
        `Set it as a server-only env var (see .env.example). ` +
        `Never expose it with a PUBLIC_ prefix.`,
    );
  }
  return key;
}
