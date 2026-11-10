/**
 * Código corto de una clase: lo que el estudiante escribe en /e/CODIGO.
 * Alfabeto sin caracteres que se confunden al dictar o copiar (I, L, O, 0, 1).
 */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const CODE_LENGTH = 5;

export function generateCode(): string {
  const values = new Uint32Array(CODE_LENGTH);
  crypto.getRandomValues(values);
  return Array.from(values, (value) => ALPHABET[value % ALPHABET.length]).join("");
}

/** "  k7m-2q " -> "K7M2Q". Devuelve "" si no puede ser un código válido. */
export function normalizeCode(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw
    .toUpperCase()
    .replace(/[\s-]/g, "")
    .slice(0, CODE_LENGTH);
}

export function isValidCode(code: string): boolean {
  return code.length === CODE_LENGTH && [...code].every((char) => ALPHABET.includes(char));
}
