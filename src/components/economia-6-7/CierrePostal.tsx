"use client"

import * as React from "react"
import { GrandmaSays } from "./kit/SliceShell"
import { Mural } from "./kit/Mural"
import { MURAL_COLORS, PERSONAL_GOALS } from "./content"
import { cop } from "./kit/types"
import { cn } from "@/lib/utils"
import { Printer, Sparkles } from "lucide-react"
import type { MuralPiece, StepProps } from "./kit/types"

const PAINTABLE: { id: MuralPiece; label: string }[] = [
    { id: "toldo", label: "Toldo" },
    { id: "vitrina", label: "Vitrina" },
    { id: "puerta", label: "Puerta" },
    { id: "maceta", label: "Maceta" },
]

const PRINT_STYLES = `
@media print {
  body * { visibility: hidden !important; }
  .postal-print, .postal-print * { visibility: visible !important; }
  .postal-print {
    position: absolute !important;
    inset: 0 !important;
    margin: 0 auto !important;
    width: 100% !important;
    max-width: 720px !important;
    border: none !important;
    box-shadow: none !important;
    background: #fff !important;
    color: #111 !important;
  }
  .no-print { display: none !important; }
}
`

export function CierrePostal({ onDone }: StepProps) {
    const [piece, setPiece] = React.useState<MuralPiece>("toldo")
    const [colors, setColors] = React.useState<Partial<Record<MuralPiece, string>>>({
        toldo: "#b91c1c",
        vitrina: "#0284c7",
        puerta: "#7c2d12",
        maceta: "#65a30d",
    })
    const [goalId, setGoalId] = React.useState(PERSONAL_GOALS[0].id)
    const [weeks, setWeeks] = React.useState(12)

    const goal = PERSONAL_GOALS.find((candidate) => candidate.id === goalId) ?? PERSONAL_GOALS[0]
    const weekly = Math.round(goal.price / weeks / 1000) * 1000

    const reportedRef = React.useRef(false)
    React.useEffect(() => {
        if (reportedRef.current) return
        reportedRef.current = true
        onDone()
    }, [onDone])

    return (
        <div className="space-y-5">
            <style>{PRINT_STYLES}</style>

            <GrandmaSays>
                Ya sabes lo que yo tardé años en aprender. Ahora píntame la tienda como quieras y llévate tu plan:
                lo que no se escribe, no se cumple.
            </GrandmaSays>

            <div className="no-print space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
                    1. Elige una parte y píntala
                </p>
                <div className="flex flex-wrap gap-2">
                    {PAINTABLE.map((candidate) => (
                        <button
                            key={candidate.id}
                            type="button"
                            onClick={() => setPiece(candidate.id)}
                            className={cn(
                                "inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-all",
                                piece === candidate.id
                                    ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30"
                                    : "border-slate-200 bg-white hover:border-amber-200 dark:border-zinc-700 dark:bg-zinc-900",
                            )}
                        >
                            <span
                                className="h-3 w-3 rounded-full ring-1 ring-black/10"
                                style={{ backgroundColor: colors[candidate.id] }}
                            />
                            {candidate.label}
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2">
                    {MURAL_COLORS.map((color) => (
                        <button
                            key={color.id}
                            type="button"
                            onClick={() => setColors((current) => ({ ...current, [piece]: color.value }))}
                            aria-label={color.label}
                            title={color.label}
                            className={cn(
                                "h-9 w-9 rounded-full ring-2 ring-offset-2 transition-transform hover:scale-110",
                                colors[piece] === color.value ? "ring-slate-800 dark:ring-white" : "ring-transparent",
                            )}
                            style={{ backgroundColor: color.value }}
                        />
                    ))}
                </div>
            </div>

            <div className="postal-print space-y-4 rounded-3xl border-2 border-amber-200 bg-gradient-to-b from-amber-50 to-white p-5 dark:from-zinc-900 dark:to-zinc-950">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
                            Postal de la tienda
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900 dark:text-zinc-50">El Buen Sabor</p>
                        <p className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                            Cinco días a cargo de la caja
                        </p>
                    </div>
                    <Mural completed={["prologo", "dinero", "caja", "precio", "consejos", "junta"]} colors={colors} size={150} />
                </div>

                <div className="rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-amber-200/70 dark:bg-zinc-900/60 dark:ring-zinc-800">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
                        Mi plan de ahorro
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-zinc-50">
                        {goal.emoji} {goal.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                        Guardar <strong>{cop(weekly)}</strong> cada semana durante{" "}
                        <strong>{weeks} semanas</strong> = <strong>{cop(goal.price)}</strong>.
                    </p>
                </div>

                <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
                    Un ingreso es dinero que entra; un gasto, dinero que sale. La ganancia es lo que queda. Y un
                    hábito es una decisión que se repite.
                </p>
            </div>

            <div className="no-print space-y-4">
                <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
                        2. Elige tu meta
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3">
                        {PERSONAL_GOALS.map((candidate) => (
                            <button
                                key={candidate.id}
                                type="button"
                                onClick={() => setGoalId(candidate.id)}
                                className={cn(
                                    "rounded-2xl border-2 px-3 py-3 text-left transition-all",
                                    goalId === candidate.id
                                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900",
                                )}
                            >
                                <span aria-hidden className="text-xl">
                                    {candidate.emoji}
                                </span>
                                <span className="mt-1 block text-xs font-bold leading-tight text-slate-800 dark:text-zinc-100">
                                    {candidate.label}
                                </span>
                                <span className="mt-0.5 block text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                                    {cop(candidate.price)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-end justify-between">
                        <label htmlFor="semanas-plan" className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
                            ¿En cuántas semanas?
                        </label>
                        <span className="text-lg font-bold tabular-nums text-slate-900 dark:text-zinc-50">
                            {weeks} semanas
                        </span>
                    </div>
                    <input
                        id="semanas-plan"
                        type="range"
                        min={4}
                        max={24}
                        step={4}
                        value={weeks}
                        onChange={(event) => setWeeks(Number(event.target.value))}
                        className="w-full cursor-pointer accent-emerald-600"
                    />
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        Te toca guardar {cop(weekly)} cada semana.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                >
                    <Printer className="h-4 w-4" />
                    Imprimir mi postal
                </button>

                <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    Terminaste la semana. La abuela vuelve mañana y la nevera nueva ya tiene cómo llegar.
                </p>
            </div>
        </div>
    )
}
