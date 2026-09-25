import { defineMiddleware } from "astro:middleware";
import { createSupabaseServerClient } from "@/lib/clases/guard";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  // Only guard /admin/* (except the login page itself + its static assets).
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return next();
  }
  if (!pathname.startsWith("/admin")) {
    return next();
  }
  try {
    const supabase = createSupabaseServerClient({
      cookies: context.cookies,
      headers: context.request.headers,
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return context.redirect("/admin/login", 302);
    }
  } catch {
    return context.redirect("/admin/login", 302);
  }
  return next();
});
