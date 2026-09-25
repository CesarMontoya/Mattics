/**
 * Seed de notas del segundo periodo desde los concentradores .xls locales.
 *
 * Uso:
 *   bun scripts/seed-grades.ts            # inserta/actualiza en Supabase
 *   bun scripts/seed-grades.ts --dry-run  # solo parsea y reporta, no escribe
 *
 * Lee Telemetria/Analisis-Periodo-2/*.xls (hoja Sheet4). Cada estudiante
 * ocupa un bloque: fila "I" (con el nombre en la col. 2 antes del salto de
 * línea + DOC, que NUNCA se almacena), fila "II", fila "III" (vacía) y fila
 * "FIN" (se ignora: el FIN se calcula en la app). Las materias salen del
 * encabezado (cols. 4 hasta la columna J). Solo se insertan periodos 1 y 2;
 * una celda vacía se guarda como NULL (nunca como 0).
 *
 * Mapeo de archivos a cursos:
 * - Concentradror_SEPTIMO_{A,B,C,D}_-_TARDE.xls -> cursos 7-A..7-D
 *   (se enlaza con los estudiantes existentes por nombre normalizado y se
 *   crean los faltantes).
 * - Concentradror_OCTAVO_{A,B}_-_TARDE.xls -> cursos 8-A y 8-B
 *   (se crean el curso y sus estudiantes).
 *
 * Requiere PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en el entorno
 * (bun carga .env automáticamente). Telemetria/ está en .gitignore y nunca
 * se commitea.
 */

import * as XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";

const SHEET_NAME = "Sheet4";
const SOURCE_DIR = "Telemetria/Analisis-Periodo-2";

// Nombre del archivo -> curso destino. `createCourse` solo es true para
// octavo (los cursos 7-A..7-D ya existen con sus estudiantes).
const FILE_COURSE_MAP: Array<{ match: RegExp; course: string; createCourse: boolean }> = [
  { match: /SEPTIMO_A/i, course: "7-A", createCourse: false },
  { match: /SEPTIMO_B/i, course: "7-B", createCourse: false },
  { match: /SEPTIMO_C/i, course: "7-C", createCourse: false },
  { match: /SEPTIMO_D/i, course: "7-D", createCourse: false },
  { match: /OCTAVO_A/i, course: "8-A", createCourse: true },
  { match: /OCTAVO_B/i, course: "8-B", createCourse: true },
];

type ParsedScore = { subject: string; period: 1 | 2; score: number | null };
type ParsedStudent = { rawName: string; scores: ParsedScore[] };

/**
 * Normaliza un nombre para comparar el .xls con la base de datos:
 * mayúsculas, sin comas, espacios colapsados.
 * ("ARISTIZABAL SERNA, JACOB" y "ARISTIZABAL SERNA JACOB" coinciden.)
 */
export function normalizeName(name: string): string {
  return name.toUpperCase().replace(/,/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Los .xls legados guardan la Ñ como un byte suelto 0xD1 y SheetJS lo
 * decodifica como U+FFFD. Verificado: los 20 casos en estos archivos son
 * todos Ñ (CASTAÑEDA, MUÑOZ, LONDOÑO, PATIÑO, QUIÑONES, BRICEÑO, CASTAÑO),
 * siempre en la columna del nombre. Sin esta reparación se crearían
 * estudiantes duplicados al no coincidir con la base de datos.
 */
export function repairLegacyEncoding(value: string): string {
  return value.replace(/�/g, "Ñ");
}

function fileToCourse(fileName: string): { course: string; createCourse: boolean } | null {
  for (const entry of FILE_COURSE_MAP) {
    if (entry.match.test(fileName)) return { course: entry.course, createCourse: entry.createCourse };
  }
  return null;
}

/** Extrae el nombre (sin el DOC) de la celda "NOMBRE\n\nDOC:...". */
function extractName(cell: unknown): string {
  const text = repairLegacyEncoding(String(cell ?? ""));
  return text.split(/\r?\n/)[0].replace(/\s+/g, " ").trim();
}

function toScoreOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(String(value).trim().replace(",", "."));
  if (!Number.isFinite(n) || n < 0 || n > 5) return null;
  return n;
}

/**
 * Parsea la hoja Sheet4 de un concentrador.
 * Devuelve los estudiantes con sus notas de periodo 1 (fila I) y 2 (fila II).
 * Las filas III, FIN y las columnas J/B/A/S, Foto y DOC se ignoran siempre.
 */
export function parseSheet(rows: unknown[][]): { subjects: string[]; students: ParsedStudent[] } {
  const header = (rows[0] ?? []) as unknown[];
  // Las materias van de la col. 4 hasta la columna "J" (conteos, no notas).
  let endCol = header.length;
  for (let c = 4; c < header.length; c++) {
    if (String(header[c] ?? "").trim().toUpperCase() === "J") {
      endCol = c;
      break;
    }
  }
  const subjects = (header as unknown[])
    .slice(4, endCol)
    .map((h) => String(h ?? "").trim())
    .filter((h) => h.length > 0);

  const students: ParsedStudent[] = [];
  let current: ParsedStudent | null = null;
  for (const row of rows.slice(1)) {
    const cells = row as unknown[];
    const tag = String(cells[3] ?? "").trim();
    if (tag === "I") {
      current = { rawName: extractName(cells[2]), scores: [] };
      students.push(current);
      for (let c = 4; c < 4 + subjects.length; c++) {
        current.scores.push({ subject: subjects[c - 4], period: 1, score: toScoreOrNull(cells[c]) });
      }
    } else if (tag === "II" && current) {
      for (let c = 4; c < 4 + subjects.length; c++) {
        current.scores.push({ subject: subjects[c - 4], period: 2, score: toScoreOrNull(cells[c]) });
      }
    }
    // "III", "FIN" y filas de encabezado ("Ped.") se ignoran.
  }
  return { subjects, students: students.filter((s) => s.rawName.length > 0) };
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const url = process.env.PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Falta PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el entorno (.env).");
    process.exit(1);
  }
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  // La tabla la crea supabase/migrations/0004_grades.sql (solo se exige al escribir).
  // OJO: el probe usa limit(1) y no head:true, porque PostgREST responde 204
  // sin error ante HEAD aunque la tabla no exista en el schema cache.
  if (!dryRun) {
    const { error: gradesProbeError } = await supabase.from("grades").select("id").limit(1);
    if (gradesProbeError) {
      console.error(
        `No se puede leer public.grades (${gradesProbeError.message}).\n` +
          "Aplica primero supabase/migrations/0004_grades.sql en el proyecto Supabase.",
      );
      process.exit(1);
    }
  }

  const [{ data: courses }, { data: dbStudents }] = await Promise.all([
    supabase.from("courses").select("id,name"),
    supabase.from("students").select("id,full_name,course_id"),
  ]);
  const courseByName = new Map((courses ?? []).map((c) => [c.name, c]));
  // Índice de estudiantes existentes por nombre normalizado.
  const studentByNorm = new Map<string, { id: string; full_name: string; course_id: string | null }>();
  for (const s of dbStudents ?? []) {
    const key = normalizeName(s.full_name);
    if (!studentByNorm.has(key)) studentByNorm.set(key, s);
  }

  const report = { coursesCreated: 0, studentsMatched: 0, studentsCreated: 0, gradesUpserted: 0, unmatched: [] as string[] };

  const { readdirSync } = await import("node:fs");
  const files = readdirSync(SOURCE_DIR).filter((f) => f.endsWith(".xls") || f.endsWith(".xlsx"));
  if (files.length === 0) {
    console.error(`Sin archivos .xls en ${SOURCE_DIR}/.`);
    process.exit(1);
  }

  for (const file of files.sort()) {
    const mapping = fileToCourse(file);
    if (!mapping) {
      console.warn(`Archivo sin curso asignado, se omite: ${file}`);
      continue;
    }
    const workbook = XLSX.readFile(`${SOURCE_DIR}/${file}`);
    const sheet = workbook.Sheets[SHEET_NAME];
    if (!sheet) {
      console.warn(`Sin hoja ${SHEET_NAME} en ${file}, se omite.`);
      continue;
    }
    const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, defval: null });
    const { subjects, students } = parseSheet(rows);
    console.log(`${file} -> curso ${mapping.course}: ${students.length} estudiantes, materias: ${subjects.join(", ")}`);

    let course = courseByName.get(mapping.course);
    if (!course) {
      if (!mapping.createCourse) {
        console.warn(`No existe el curso ${mapping.course} y no está marcado para crearse; se omite ${file}.`);
        continue;
      }
      if (dryRun) {
        console.log(`[dry-run] se crearía el curso ${mapping.course}`);
      } else {
        const { data, error } = await supabase.from("courses").insert({ name: mapping.course }).select("id,name").single();
        if (error || !data) {
          console.error(`No se pudo crear el curso ${mapping.course}: ${error?.message}`);
          continue;
        }
        course = data;
        courseByName.set(course.name, course);
        report.coursesCreated++;
        console.log(`Curso creado: ${mapping.course}`);
      }
    }
    const courseId = course?.id as string | undefined;
    if (!courseId) continue;

    const gradeRows: Array<{ student_id: string; subject: string; period: number; score: number | null }> = [];
    for (const parsed of students) {
      const key = normalizeName(parsed.rawName);
      let student = studentByNorm.get(key);
      // Solo vale el enlace si el estudiante ya está en este curso; si está
      // en otro curso se crea aparte para no mover matrículas existentes.
      const sameCourse = student && (student.course_id === courseId || (!student.course_id && mapping.createCourse));
      if (!sameCourse) {
        if (student && student.course_id !== courseId) {
          report.unmatched.push(`${parsed.rawName} (${file}: ya existe en otro curso)`);
        } else {
          report.unmatched.push(`${parsed.rawName} (${file})`);
        }
        if (dryRun) {
          console.log(`[dry-run] se crearía estudiante "${parsed.rawName}" en ${mapping.course}`);
          report.studentsCreated++;
          continue;
        }
        const { data, error } = await supabase
          .from("students")
          .insert({ full_name: parsed.rawName, course_id: courseId })
          .select("id,full_name,course_id")
          .single();
        if (error || !data) {
          console.error(`No se pudo crear "${parsed.rawName}": ${error?.message}`);
          continue;
        }
        student = data;
        studentByNorm.set(key, student);
        report.studentsCreated++;
      } else {
        report.studentsMatched++;
      }
      for (const s of parsed.scores) {
        gradeRows.push({ student_id: student!.id, subject: s.subject, period: s.period, score: s.score });
      }
    }

    if (!dryRun && gradeRows.length > 0) {
      // Re-ejecutable: la unicidad (student_id, subject, period) evita duplicados.
      const CHUNK = 500;
      for (let i = 0; i < gradeRows.length; i += CHUNK) {
        const { error } = await supabase
          .from("grades")
          .upsert(gradeRows.slice(i, i + CHUNK), { onConflict: "student_id,subject,period" });
        if (error) {
          console.error(`Error insertando notas de ${file} (lote ${i}): ${error.message}`);
        } else {
          report.gradesUpserted += Math.min(CHUNK, gradeRows.length - i);
        }
      }
    } else if (dryRun) {
      console.log(`[dry-run] ${gradeRows.length} filas de notas parseadas para ${mapping.course} (no insertadas)`);
    }
  }

  console.log("\n--- Resumen ---");
  console.log(`Cursos creados: ${report.coursesCreated}`);
  console.log(`Estudiantes enlazados: ${report.studentsMatched}`);
  console.log(`Estudiantes creados: ${report.studentsCreated}`);
  console.log(`Notas insertadas/actualizadas: ${report.gradesUpserted}`);
  console.log(`Nombres sin coincidencia previa (${report.unmatched.length}):`);
  for (const name of report.unmatched) console.log(`  - ${name}`);
}

await main();
