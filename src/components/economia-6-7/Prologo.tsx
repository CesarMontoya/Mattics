"use client"

import * as React from "react"
import { GrandmaSays } from "./kit/SliceShell"
import { cn } from "@/lib/utils"
import type { StepProps } from "./kit/types"

const OPTIONS = [
    {
        id: "guardar",
        emoji: "🫙",
        label: "Cuento lo que hay y aparto algo antes de gastar",
        reply: "Eso se llama separar antes de gastar. No es desconfianza: es saber cuánto hay.",
    },
    {
        id: "gastar",
        emoji: "🛍️",
        label: "Me compro algo que quiero y ya veremos",
        reply: "Puede pasar, pero si no cuentas primero, la caja se vacía sin que sepas por qué.",
    },
    {
        id: "dejar",
        emoji: "🙈",
        label: "La dejo quieta y no la toco por si acaso",
        reply: "Cuidarla está bien; no saber cuánto hay adentro es el problema. La caja se cuenta.",
    },
]

export function Prologo({ onDone }: StepProps) {
    const [chosen, setChosen] = React.useState<string | null>(null)
    const option = OPTIONS.find((candidate) => candidate.id === chosen)

    return (
        <div className="space-y-5">
            <GrandmaSays>
                Me voy tres días donde mi hermana. Te dejo la tienda y te dejo la caja. No te dejo un examen: te
                dejo lo que aprendí.
            </GrandmaSays>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                Es martes en la mañana. La tienda abre a las siete y hay empanadas, jugos y un cuaderno donde la
                abuela anota todo. Antes de entregarte la llave, ella señala la caja de metal y hace una pregunta.
            </p>

            <div>
                <p className="mb-3 text-base font-bold text-slate-800 dark:text-zinc-100">
                    ¿Qué haces primero con lo que hay en la caja?
                </p>
                <div className="grid gap-2.5">
                    {OPTIONS.map((candidate) => (
                        <button
                            key={candidate.id}
                            type="button"
                            onClick={() => {
                                setChosen(candidate.id)
                                onDone({ answers: { eleccion: candidate.id } })
                            }}
                            className={cn(
                                "flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all",
                                chosen === candidate.id
                                    ? "-translate-y-0.5 border-amber-400 bg-amber-50 ring-4 ring-amber-100 dark:bg-amber-950/30 dark:ring-amber-900/40"
                                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900",
                            )}
                        >
                            <span aria-hidden className="text-2xl">
                                {candidate.emoji}
                            </span>
                            <span className="text-sm font-semibold leading-snug text-slate-800 dark:text-zinc-100">
                                {candidate.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {option && (
                <div className="animate-in fade-in slide-in-from-bottom-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-700 ring-1 ring-slate-200 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-800">
                    <span aria-hidden>👵 </span>
                    {option.reply}
                </div>
            )}

            <p className="text-xs leading-relaxed text-slate-400 dark:text-zinc-500">
                No hay respuesta correcta aquí. Esta decisión es tuya y va a cambiar cómo ves el resto de la
                semana.
            </p>
        </div>
    )
}
