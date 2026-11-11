export type StepId =
    | "prologo"
    | "dinero"
    | "caja"
    | "precio"
    | "consejos"
    | "semana"
    | "postal"

export type MuralPiece = "letrero" | "toldo" | "vitrina" | "puerta" | "nevera" | "maceta"

/** Un intento del estudiante: qué eligió y si era correcto. `correct: null` = decisión sin respuesta correcta. */
export interface AttemptEvent {
    step: StepId
    value: string
    correct: boolean | null
    detail?: string
    at: number
}

export interface StepAttempt {
    value: string
    correct: boolean | null
    detail?: string
}

export interface StepResult {
    attempts?: number
    /** Respuestas propias del capítulo, para el panel del docente. */
    answers?: Record<string, string | number>
}

export interface StepProps {
    onDone: (result?: StepResult) => void
    /** Se llama en cada intento, correcto o no, para que quede el proceso. */
    onAttempt?: (attempt: StepAttempt) => void
    /** Nombres de la entrega (titular y grupo). */
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
