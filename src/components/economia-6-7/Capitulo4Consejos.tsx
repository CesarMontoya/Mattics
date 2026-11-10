"use client"

import * as React from "react"
import { GrandmaSays } from "./kit/SliceShell"
import { SortBoard } from "./kit/SortBoard"
import { HABIT_CARDS } from "./content"
import { useShuffled } from "./kit/useShuffled"
import type { StepProps } from "./kit/types"

const ZONES = [
    { id: "bueno", label: "Hábito que cuida la plata", hint: "Decisiones que ayudan.", tone: "positive" as const },
    { id: "malo", label: "Hábito que la gasta sin darse cuenta", hint: "Decisiones que la ponen en riesgo.", tone: "negative" as const },
]

export function Capitulo4Consejos({ onDone }: StepProps) {
    const [solved, setSolved] = React.useState(false)
    // Orden distinto por estudiante: evita que la columna izquierda sea siempre
    // "bueno" y la derecha "malo", que permite resolver sin leer.
    const cards = useShuffled(HABIT_CARDS)

    return (
        <div className="space-y-5">
            <GrandmaSays>
                Yo no sé de cosas raras. Sé que lo que se anota no se pierde, que lo que se guarda se junta y que
                la deuda por un gusto se paga con meses.
            </GrandmaSays>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                Un hábito financiero es una decisión que repites todos los días. Separa las tarjetas: ¿cuáles
                cuidan la plata y cuáles la gastan sin que te des cuenta?
            </p>

            <SortBoard
                items={cards}
                zones={ZONES}
                onSolved={() => {
                    setSolved(true)
                    onDone()
                }}
            />

            {solved && (
                <div className="animate-in fade-in rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium leading-relaxed text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-100 dark:ring-amber-900/50">
                    Ninguno de estos hábitos necesita un sueldo grande: necesitan repetirse. Eso es lo que los
                    vuelve hábitos.
                </div>
            )}
        </div>
    )
}
