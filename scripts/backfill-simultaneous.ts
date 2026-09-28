import { createClient } from "@supabase/supabase-js";

const url = process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Faltan PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const WINDOW_MINUTES = 20;
const WINDOW_MS = WINDOW_MINUTES * 60 * 1000;

type Visit = {
  id: string;
  student_link_id: string | null;
  ip: string | null;
  ip_city: string | null;
  user_agent: string | null;
  occurred_at: string;
};

const all: Visit[] = [];
const PAGE = 1000;
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase
    .from("visits")
    .select("id,student_link_id,ip,ip_city,user_agent,occurred_at")
    .order("student_link_id", { ascending: true })
    .order("occurred_at", { ascending: true })
    .range(from, from + PAGE - 1);
  if (error) {
    console.error("Error leyendo visits:", error.message);
    process.exit(1);
  }
  all.push(...((data ?? []) as Visit[]));
  if (!data || data.length < PAGE) break;
}

const { data: existing, error: alertsError } = await supabase
  .from("alerts")
  .select("visit_id,details")
  .eq("type", "simultaneous");
if (alertsError) {
  console.error("Error leyendo alertas existentes:", alertsError.message);
  process.exit(1);
}
const existingPairs = new Set(
  ((existing ?? []) as Array<{ visit_id: string; details: any }>).map(
    (a) => `${a.visit_id}::${a.details?.matched_visit_id ?? ""}`,
  ),
);

const groups = new Map<string, Visit[]>();
for (const v of all) {
  if (!v.student_link_id) continue;
  const list = groups.get(v.student_link_id) ?? [];
  list.push(v);
  groups.set(v.student_link_id, list);
}

let candidates = 0;
let created = 0;
let skipped = 0;

for (const [, visits] of groups) {
  for (let i = 0; i < visits.length; i++) {
    const cur = visits[i];
    const curTime = new Date(cur.occurred_at).getTime();
    if (Number.isNaN(curTime)) continue;
    // Busca hacia atrás la coincidencia más reciente dentro de la ventana
    // con IP o user_agent distinto.
    let match: Visit | null = null;
    for (let j = i - 1; j >= 0; j--) {
      const prev = visits[j];
      const prevTime = new Date(prev.occurred_at).getTime();
      if (Number.isNaN(prevTime) || curTime - prevTime > WINDOW_MS) break;
      if (prev.ip !== cur.ip || prev.user_agent !== cur.user_agent) {
        match = prev;
        break;
      }
    }
    if (!match) continue;
    candidates++;
    const key = `${cur.id}::${match.id}`;
    if (existingPairs.has(key)) {
      skipped++;
      continue;
    }
    const matchTime = new Date(match.occurred_at).getTime();
    const deltaSeconds = Math.max(0, Math.round((curTime - matchTime) / 1000));
    const { error } = await supabase.from("alerts").insert({
      visit_id: cur.id,
      type: "simultaneous",
      severity: "high",
      details: {
        current_visit_id: cur.id,
        current_ip: cur.ip,
        current_city: cur.ip_city,
        current_user_agent: cur.user_agent,
        matched_visit_id: match.id,
        matched_ip: match.ip,
        matched_city: match.ip_city,
        matched_user_agent: match.user_agent,
        delta_seconds: deltaSeconds,
        window_minutes: WINDOW_MINUTES,
      },
    });
    if (error) {
      console.error(`Inserción fallida para visita ${cur.id}:`, error.message);
    } else {
      created++;
      existingPairs.add(key);
    }
  }
}

console.log(
  `Backfill simultáneos: grupos=${groups.size} visitas=${all.length} candidatos=${candidates} creadas=${created} omitidas=${skipped}`,
);
