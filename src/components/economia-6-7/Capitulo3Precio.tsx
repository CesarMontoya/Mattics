"use client"

import * as React from "react"
import { GrandmaSays, CoachMessage } from "./kit/SliceShell"
import { JUICE_STAND } from "./content"
import { cop } from "./kit/types"
import { cn } from "@/lib/utils"
import type { StepProps } from "./kit/types"

const MIN_PROFIT = JUICE_STAND.glassesPerDay * (JUICE_STAND.minPrice - JUICE_STAND.costPerGlass)
const MAX_PROFIT = JUICE_STAND.glassesPerDay * (JUICE_STAND.maxPrice - JUICE_STAND.costPerGlass)
const SPAN = MAX_PROFIT - MIN_PROFIT
const ZERO_RATIO = (0 - MIN_PROFIT) / SPAN

export function Capitulo3Precio({ onDone, onAttempt }: StepProps) {
    const [price, setPrice] = React.useState(2000)
    const [solved, setSolved] = React.useState(false)
    const [feedback, setFeedback] = React.useState<{ tone: "success" | "error" | "info"; text: string } | null>(null)

    const perGlass = price - JUICE_STAND.costPerGlass
    const dailyProfit = perGlass * JUICE_STAND.glassesPerDay
    const isProfit = dailyProfit >= 0

    const barStart = isProfit ? ZERO_RATIO : ZERO_RATIO - Math.abs(dailyProfit) / SPAN
    const barWidth = Math.abs(dailyProfit) / SPAN

    const confirm = () => {
        onAttempt?.({
            value: cop(price),
            detail: isProfit ? `Ganancia de ${cop(dailyProfit)}` : `Pérdida de ${cop(Math.abs(dailyProfit))}`,
            correct: dailyProfit >= JUICE_STAND.goalProfit,
        })

        if (dailyProfit >= JUICE_STAND.goalProfit) {
            setSolved(true)
            setFeedback({
                tone: "success",
                text: `Exacto. Cada vaso deja ${cop(perGlass)} y vendes ${JUICE_STAND.glassesPerDay}: la ganancia del día es ${cop(dailyProfit)}. Ganancia es lo que queda después de pagar el costo.`,
            })
            onDone({ answers: { precio: price, ganancia: dailyProfit } })
            return
        }
        if (dailyProfit < 0) {
            setFeedback({
                tone: "error",
                text: `A ${cop(price)} cada vaso cuesta más de lo que se vende: pierdes ${cop(Math.abs(perGlass))} por vaso. Cuando el costo supera el precio, hay pérdida.`,
            })
            return
        }
        setFeedback({
            tone: "info",
            text: `Ganas ${cop(dailyProfit)} al día, pero necesitas ${cop(JUICE_STAND.goalProfit)}. ¿Cuánto tendría que costar cada vaso para lograrlo?`,
        })
    }

    return (
        <div className="space-y-5">
            <GrandmaSays>
                El jugo no es gratis: la fruta, el azúcar y el vaso cuestan. Primero se sabe cuánto cuesta, y
                después se decide cuánto se cobra.
            </GrandmaSays>

            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-800">
                Cada vaso de jugo cuesta <strong>{cop(JUICE_STAND.costPerGlass)}</strong> prepararlo. En un día se
                venden <strong>{JUICE_STAND.glassesPerDay} vasos</strong>. La meta de hoy es ganar{" "}
                <strong>{cop(JUICE_STAND.goalProfit)}</strong>.
            </div>

            <div className="space-y-3">
                <div className="flex items-end justify-between">
                    <label htmlFor="precio-jugo" className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
                        Precio por vaso
                    </label>
                    <span className="text-3xl font-bold tabular-nums text-slate-900 dark:text-zinc-50">
                        {cop(price)}
                    </span>
                </div>
                <input
                    id="precio-jugo"
                    type="range"
                    min={JUICE_STAND.minPrice}
                    max={JUICE_STAND.maxPrice}
                    step={JUICE_STAND.step}
                    value={price}
                    onChange={(event) => {
                        if (solved) return
                        setPrice(Number(event.target.value))
                        setFeedback(null)
                    }}
                    disabled={solved}
                    className="w-full cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
                    <span>{cop(JUICE_STAND.minPrice)}</span>
                    <span>{cop(JUICE_STAND.maxPrice)}</span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 dark:text-zinc-400">
                        {isProfit ? "Ganancia del día" : "Pérdida del día"}
                    </span>
                    <span className={cn("tabular-nums", isProfit ? "text-emerald-600" : "text-rose-600")}>
                        {isProfit ? "+" : "−"}
                        {cop(Math.abs(dailyProfit))}
                    </span>
                </div>
                <div className="relative h-8 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-900">
                    <div
                        className={cn(
                            "absolute inset-y-1 rounded-full transition-all duration-200",
                            isProfit ? "bg-emerald-500" : "bg-rose-500",
                        )}
                        style={{
                            left: `${barStart * 100}%`,
                            width: `${Math.max(barWidth * 100, 0.6)}%`,
                        }}
                    />
                    <div
                        className="absolute inset-y-0 z-10 w-0.5 bg-slate-500/80 dark:bg-zinc-400"
                        style={{ left: `${ZERO_RATIO * 100}%` }}
                    />
                </div>
                <div className="relative text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
                    <span className="absolute left-0">−{cop(Math.abs(MIN_PROFIT))}</span>
                    <span className="absolute right-0">+{cop(MAX_PROFIT)}</span>
                </div>
                <div className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-white px-3 py-2 text-center ring-1 ring-slate-200 dark:bg-zinc-900 dark:ring-zinc-800">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Por vaso</p>
                    <p className={cn("text-base font-bold tabular-nums", perGlass >= 0 ? "text-slate-800 dark:text-zinc-100" : "text-rose-600")}>
                        {perGlass >= 0 ? "+" : "−"}
                        {cop(Math.abs(perGlass))}
                    </p>
                </div>
                <div className="rounded-2xl bg-white px-3 py-2 text-center ring-1 ring-slate-200 dark:bg-zinc-900 dark:ring-zinc-800">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        × {JUICE_STAND.glassesPerDay} vasos
                    </p>
                    <p className={cn("text-base font-bold tabular-nums", isProfit ? "text-emerald-600" : "text-rose-600")}>
                        {isProfit ? "+" : "−"}
                        {cop(Math.abs(dailyProfit))}
                    </p>
                </div>
            </div>

            {feedback && <CoachMessage tone={feedback.tone}>{feedback.text}</CoachMessage>}

            {!solved && (
                <button
                    type="button"
                    onClick={confirm}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                >
                    Confirmar precio
                </button>
            )}

            {solved && price >= 3600 && (
                <p className="text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
                    Ojo: a este precio algunos clientes podrían dejar de comprar. Cobrar más no siempre significa
                    ganar más.
                </p>
            )}
        </div>
    )
}
