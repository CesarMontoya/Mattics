import { createBrowserClient } from "@supabase/ssr";
import {
  PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  PUBLIC_SUPABASE_URL,
  requirePublicSupabaseEnv,
} from "./env";

let browserClient: ReturnType<typeof createBrowserClient> | undefined;

/**
 * Browser-side Supabase client (React 19 components, client:load islands).
 * Uses the publishable key — RLS still applies, no secrets involved.
 */
export function createSupabaseBrowserClient() {
  if (browserClient) return browserClient;
  const { url, publishableKey } = requirePublicSupabaseEnv();
  browserClient = createBrowserClient(
    PUBLIC_SUPABASE_URL ?? url,
    PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? publishableKey,
  );
  return browserClient;
}
