import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "@/lib/clases/guard";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const supabase = createSupabaseServerClient({
    cookies: context.cookies,
    headers: context.request.headers,
  });
  await supabase.auth.signOut();
  return new Response(null, { status: 303, headers: { Location: "/admin/login" } });
};
