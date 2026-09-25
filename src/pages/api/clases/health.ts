import type { APIRoute } from "astro";

export const prerender = false;

/** Simple JSON health check for the /ir/[token] landing route. */
export const GET: APIRoute = async () => {
  return Response.json({
    ok: true,
    route: "ir/[token]",
    timezone: "America/Bogota",
    time: new Date().toISOString(),
  });
};
