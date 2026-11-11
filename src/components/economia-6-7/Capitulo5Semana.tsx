"use client"

import * as React from "react"
import { GrandmaSays, CoachMessage } from "./kit/SliceShell"
import { WEEK_DAYS, WEEK_OUTCOMES, WEEK_TOTAL_OPTIONS } from "./content"
import { randomOrder } from "./kit/shuffle"
import { cop } from "./kit/types"
import { Check, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StepProps } from "./kit/types"

type Sign = 1 | -1

/** Orden de arranque ya mezclado: el azar real llega al montar, sin saltos visibles. */
const START_ORDER = [1, 4, 2, 0, 3]

export function Capitulo5Semana({ onDone, onAttempt }: StepProps) {
    const [order, setOrder] = React.useState<number[]>(START_ORDER)
    const [signed, setSigned] = React.useState<Record<string, Sign>>({})
    const [selectedSign, setSelectedSign] = React.useState<Sign | null>(null)
    const [wrongId, setWrongId] = React.useState<string | null>(null)
    const [message, setMessage] = React.useState<{ tone: "success" | "error" | "info"; text: string } | null>({
        tone: "info",
        text: "Elige el signo y después el día, o arrastra el signo hasta el día.",
    })
    const [chosenTotal, setChosenTotal] = React.useState<string | null>(null)
    const [solved, setSolved] = React.useState(false)

    // Cada estudiante recibe un reparto distinto: el lugar del día no dice el signo.
    React.useEffect(() => {
        setOrder(randomOrder(WEEK_OUTCOMES.length, (index) => WEEK_OUTCOMES[index].sign))
    }, [])

    const outcomes = order.map((index) => WEEK_OUTCOMES[index])
    const rows = WEEK_DAYS.map((day, index) => ({ day, outcome: outcomes[index] }))
    const weekTotal = outcomes.reduce((sum, outcome) => sum + outcome.amount * outcome.sign, 0)
    const allSigned = rows.every((row) => signed[row.day.id])

    const apply = (dayId: string) => {
        if (solved || signed[dayId]) return
        const row = rows.find((candidate) => candidate.day.id === dayId)
        if (!row) return
        if (!selectedSign) {
            setMessage({ tone: "error", text: "Primero elige el signo + o el signo −." })
            return
        }
        onAttempt?.({
            value: `${row.day.label}: ${selectedSign === 1 ? "+" : "−"}${cop(row.outcome.amount)}`,
            detail: selectedSign === row.outcome.sign ? "Signo correcto" : "Signo equivocado",
            correct: selectedSign === row.outcome.sign,
        })

        if (selectedSign === row.outcome.sign) {
            setSigned((current) => ({ ...current, [dayId]: row.outcome.sign }))
            setSelectedSign(null)
            setMessage({ tone: "success", text: row.outcome.feedback })
        } else {
            setWrongId(dayId)
            setSelectedSign(null)
            setMessage({ tone: "error", text: row.outcome.feedback })
            window.setTimeout(() => setWrongId(null), 600)
        }
    }

    const chooseTotal = (optionId: string) => {
        if (solved) return
        const option = WEEK_TOTAL_OPTIONS.find((candidate) => candidate.id === optionId)
        if (!option) return
        setChosenTotal(optionId)
        onAttempt?.({ value: option.label, detail: "Cierre de la semana", correct: Boolean(option.correct) })
        if (option.correct) {
            setSolved(true)
            setMessage({ tone: "success", text: option.feedback })
            onDone({ answers: { resultado: weekTotal >= 0 ? "ganancia" : "pérdida", monto: Math.abs(weekTotal) } })
            return
        }
        setMessage({ tone: "error", text: option.feedback })
    }

    let running = 0
    const path = outcomes.map((outcome) => {
        running += outcome.amount * outcome.sign
        return running
    })

    return (
        <div className="space-y-5">
            <style>{`@keyframes semana-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`}</style>

            <GrandmaSays>
                El cuaderno no lleva discusiones: un número por día. Si el día dejó ganancia, va con más. Si el
                día dejó pérdida, va con menos. Y al final de la semana se suman todos.
            </GrandmaSays>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                Así cerró la semana en la tienda. Cada día tiene un resultado, pero le falta el signo:{" "}
                <strong>+</strong> si dejó ganancia, <strong>−</strong> si cerró en pérdida.
            </p>

            <div className="flex flex-wrap items-center gap-2">
                {(
                    [
                        { sign: 1 as Sign, label: "Ganancia", icon: <Plus className="h-4 w-4" /> },
                        { sign: -1 as Sign, label: "Pérdida", icon: <Minus className="h-4 w-4" /> },
                    ] as const
                ).map((chip) => (
                    <button
                        key={chip.sign}
                        type="button"
                        draggable
                        onDragStart={(event) => {
                            event.dataTransfer.setData("text/plain", String(chip.sign))
                            event.dataTransfer.effectAllowed = "move"
                        }}
                        onClick={() => {
                            if (solved || allSigned) return
                            setSelectedSign((current) => (current === chip.sign ? null : chip.sign))
                        }}
                        aria-pressed={selectedSign === chip.sign}
                        data-testid={chip.sign === 1 ? "sign-positive" : "sign-negative"}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-all",
                            chip.sign === 1
                                ? "border-emerald-200 bg-white text-emerald-700 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-300"
                                : "border-rose-200 bg-white text-rose-700 dark:border-rose-900 dark:bg-zinc-900 dark:text-rose-300",
                            selectedSign === chip.sign &&
                                "-translate-y-0.5 ring-4 ring-amber-100 dark:ring-amber-900/40",
                            allSigned && "opacity-40",
                        )}
                    >
                        {chip.icon}
                        {chip.label}
                    </button>
                ))}
            </div>

            <ol className="space-y-2">
                {rows.map(({ day, outcome }) => {
                    const daySign = signed[day.id]
                    const locked = Boolean(daySign)
                    return (
                        <li key={day.id}>
                            <button
                                type="button"
                                onClick={() => apply(day.id)}
                                onDragOver={(event) => {
                                    event.preventDefault()
                                    event.dataTransfer.dropEffect = "move"
                                }}
                                onDrop={(event) => {
                                    event.preventDefault()
                                    const raw = event.dataTransfer.getData("text/plain")
                                    const dropped = raw === "1" ? 1 : raw === "-1" ? -1 : null
                                    if (dropped) {
                                        setSelectedSign(dropped)
                                        apply(day.id)
                                    }
                                }}
                                disabled={locked}
                                data-testid={`day-${day.id}`}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all",
                                    locked
                                        ? daySign === 1
                                            ? "border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/20"
                                            : "border-rose-300 bg-rose-50/70 dark:border-rose-800 dark:bg-rose-950/20"
                                        : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900",
                                    selectedSign && !locked && "border-dashed border-amber-300",
                                    wrongId === day.id && "border-rose-400",
                                )}
                                style={wrongId === day.id ? { animation: "semana-shake 0.5s ease-in-out" } : undefined}
                            >
                                <span aria-hidden className="text-2xl">
                                    {outcome.emoji}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-zinc-500">
                                        {day.label}
                                    </span>
                                    <span className="block text-sm font-medium leading-snug text-slate-700 dark:text-zinc-200">
                                        {outcome.description}
                                    </span>
                                </span>
                                <span
                                    className={cn(
                                        "shrink-0 rounded-full px-3 py-1 text-sm font-bold tabular-nums",
                                        locked
                                            ? daySign === 1
                                                ? "bg-emerald-600 text-white"
                                                : "bg-rose-600 text-white"
                                            : "bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400",
                                    )}
                                >
                                    {locked
                                        ? `${daySign === 1 ? "+" : "−"}${cop(outcome.amount)}`
                                        : `? ${cop(outcome.amount)}`}
                                </span>
                                {locked && <Check className="h-4 w-4 shrink-0 text-slate-400" />}
                            </button>
                        </li>
                    )
                })}
            </ol>

            {message && <CoachMessage tone={message.tone}>{message.text}</CoachMessage>}

            {allSigned && (
                <div className="animate-in fade-in slide-in-from-bottom-3 space-y-3 rounded-3xl border-2 border-slate-200 bg-slate-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <p className="text-sm font-bold text-slate-800 dark:text-zinc-100">
                        El cuaderno está completo. Suma los cinco días y di cómo cerró la semana.
                    </p>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
                        ¿Hubo ganancia o pérdida? ¿De cuánto? Los días, en orden:{" "}
                        {outcomes.map((outcome) => `${outcome.sign === 1 ? "+" : "−"}${cop(outcome.amount)}`).join("  ")}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3">
                        {WEEK_TOTAL_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => chooseTotal(option.id)}
                                disabled={solved}
                                data-testid={`total-${option.id}`}
                                className={cn(
                                    "rounded-2xl border-2 px-3 py-3 text-center text-sm font-bold transition-all",
                                    solved && option.correct
                                        ? "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                                        : chosenTotal === option.id
                                          ? "border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300"
                                          : "border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {solved && (
                <div className="animate-in fade-in space-y-3 rounded-2xl bg-emerald-50 px-4 py-4 ring-1 ring-emerald-200 dark:bg-emerald-950/30 dark:ring-emerald-900/50">
                    <p className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                        El camino de la semana, sumando día por día
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold tabular-nums text-slate-500 dark:bg-zinc-900 dark:text-zinc-400">
                            0
                        </span>
                        {path.map((value, index) => (
                            <React.Fragment key={rows[index].day.id}>
                                <span className="text-slate-400">→</span>
                                <span
                                    className={cn(
                                        "rounded-full px-2.5 py-1 text-xs font-bold tabular-nums",
                                        value >= 0 ? "bg-emerald-600 text-white" : "bg-rose-600 text-white",
                                    )}
                                >
                                    {value >= 0 ? "+" : "−"}
                                    {cop(Math.abs(value))}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                    <p className="text-sm leading-relaxed text-emerald-900/90 dark:text-emerald-100/90">
                        Cuando el acumulado baja de cero, el negocio está en pérdida: un solo día malo puede
                        borrar lo que dejaron dos días buenos. Por eso se suma toda la semana, no solo los días
                        buenos.
                    </p>
                </div>
            )}
        </div>
    )
}
