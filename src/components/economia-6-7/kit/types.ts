export type StepId =
    | "prologo"
    | "dinero"
    | "caja"
    | "precio"
    | "consejos"
    | "junta"
    | "postal"

export type MuralPiece = "letrero" | "toldo" | "vitrina" | "puerta" | "nevera" | "maceta"

export interface StepResult {
    attempts?: number
    note?: string
}

export interface StepProps {
    onDone: (result?: StepResult) => void
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
    junta: "nevera",
    postal: null,
}

export function cop(value: number): string {
    return "$" + value.toLocaleString("es-CO")
}
