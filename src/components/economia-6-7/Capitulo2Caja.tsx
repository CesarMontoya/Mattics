"use client"

import * as React from "react"
import { GrandmaSays } from "./kit/SliceShell"
import { SortBoard } from "./kit/SortBoard"
import { DAY_MOVEMENTS, DAY_TOTALS } from "./content"
import { cop } from "./kit/types"
import type { StepProps } from "./kit/types"

const ZONES = [
    { id: "ingreso", label: "Entra a la caja", hint: "Dinero que llega.", tone: "positive" as const },
    { id: "gasto", label: "Sale de la caja", hint: "Dinero que se va.", tone: "negative" as const },
]

export function Capitulo2Caja({ onDone }: StepProps) {
    const [solved, setSolved] = React.useState(false)
    const balance = DAY_TOTALS.income - DAY_TOTALS.expense

    return (
        <div className="space-y-5">
            <GrandmaSays>
                Todo lo que entra y todo lo que sale se anota. Si se mezcla, uno cree que ganó y en realidad se
                gastó la caja.
            </GrandmaSays>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                Este es el martes de la tienda. Clasifica cada movimiento: ¿la plata entra o sale?
            </p>

            <SortBoard
                items={DAY_MOVEMENTS}
                zones={ZONES}
                onSolved={() => {
                    setSolved(true)
                    onDone()
                }}
            />

            {solved && (
                <div className="animate-in fade-in slide-in-from-bottom-3 space-y-3 rounded-3xl border-2 border-slate-200 bg-slate-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <p className="text-sm font-bold text-slate-800 dark:text-zinc-100">La cuenta del día</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-2xl bg-white px-3 py-3 shadow-sm dark:bg-zinc-950">
                            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">
                                Ingresos
                            </p>
                            <p className="mt-1 text-lg font-bold tabular-nums text-slate-800 dark:text-zinc-100">
                                {cop(DAY_TOTALS.income)}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white px-3 py-3 shadow-sm dark:bg-zinc-950">
                            <p className="text-[11px] font-bold uppercase tracking-wide text-rose-600">Gastos</p>
                            <p className="mt-1 text-lg font-bold tabular-nums text-slate-800 dark:text-zinc-100">
                                {cop(DAY_TOTALS.expense)}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white px-3 py-3 shadow-sm dark:bg-zinc-950">
                            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                Queda en caja
                            </p>
                            <p className="mt-1 text-lg font-bold tabular-nums text-amber-700 dark:text-amber-400">
                                {cop(balance)}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                        {cop(DAY_TOTALS.income)} − {cop(DAY_TOTALS.expense)} = <strong>{cop(balance)}</strong>. La
                        tienda ganó hoy, pero poco: un día flojo se come ese margen.
                    </p>
                </div>
            )}
        </div>
    )
}
