export type StepId =
    | "prologo"
    | "dinero"
    | "caja"
    | "precio"
    | "consejos"
    | "semana"
    | "postal"

export type MuralPiece = "letrero" | "toldo" | "vitrina" | "puerta" | "nevera" | "maceta"

export interface StepResult {
    attempts?: number
    /** Respuestas propias del capítulo, para el panel del docente. */
    answers?: Record<string, string | number>
}

export interface StepProps {
    onDone: (result?: StepResult) => void
    /** Nombres de la entrega (titular y grupo), para la postal impresa. */
    studentNames?: string[]
}

export interface SavedProgress {
    completed: StepId[]
    attempts: Partial<Record<StepId, number>>
}

export const MONEY_STEP_PIECES: Record<StepId, MuralPiece | null> = {
    prologo: "maceta",
    dinero: "letrero",
    caja: "toldo",
    precio: "vitrina",
    consejos: "puerta",
    semana: "nevera",
    postal: null,
}

export function cop(value: number): string {
    return "$" + value.toLocaleString("es-CO")
}
