"use client"

import * as React from "react"
import { GrandmaSays, CoachMessage } from "./kit/SliceShell"
import { SAVINGS_CIRCLE } from "./content"
import { cop } from "./kit/types"
import { cn } from "@/lib/utils"
import type { StepProps } from "./kit/types"

export function Capitulo5Junta({ onDone }: StepProps) {
    const [fee, setFee] = React.useState(30000)
    const [solved, setSolved] = React.useState(false)
    const [feedback, setFeedback] = React.useState<{ tone: "success" | "error"; text: string } | null>(null)

    const pot = fee * SAVINGS_CIRCLE.members
    const missing = Math.max(SAVINGS_CIRCLE.fridgePrice - pot, 0)
    const filledBlocks = Math.min(
        Math.floor(pot / (SAVINGS_CIRCLE.fridgePrice / SAVINGS_CIRCLE.members)),
        SAVINGS_CIRCLE.members,
    )

    const confirm = () => {
        if (pot >= SAVINGS_CIRCLE.fridgePrice) {
            setSolved(true)
            setFeedback({
                tone: "success",
                text: `Con ${cop(fee)} de cada uno, el pozo de la semana es ${cop(pot)}: alcanza para la nevera. Doce vecinos juntan lo que uno solo no podría ahorrar rápido.`,
            })
            onDone()
            return
        }
        setFeedback({
            tone: "error",
            text: `Con ${cop(fee)} por vecino el pozo llega a ${cop(pot)}. Faltan ${cop(missing)}. ¿Cuánto tendría que poner cada uno?`,
        })
    }

    return (
        <div className="space-y-5">
            <GrandmaSays>
                Mi primera vitrina no la compré sola. Doce vecinos pusimos una cuota cada semana y cada semana uno
                recibía el pozo. Así se juntó. A eso le llamamos la junta.
            </GrandmaSays>

            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-800">
                La nevera nueva cuesta <strong>{cop(SAVINGS_CIRCLE.fridgePrice)}</strong>. En la junta somos{" "}
                <strong>{SAVINGS_CIRCLE.members} vecinos</strong> y todos aportamos la misma cuota cada semana. El
                pozo de la semana es lo que juntamos entre todos.
            </div>

            <div className="space-y-3">
                <div className="flex items-end justify-between">
                    <label htmlFor="cuota-junta" className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
                        Cuota semanal de cada vecino
                    </label>
                    <span className="text-3xl font-bold tabular-nums text-slate-900 dark:text-zinc-50">
                        {cop(fee)}
                    </span>
                </div>
                <input
                    id="cuota-junta"
                    type="range"
                    min={SAVINGS_CIRCLE.minFee}
                    max={SAVINGS_CIRCLE.maxFee}
                    step={SAVINGS_CIRCLE.step}
                    value={fee}
                    onChange={(event) => {
                        if (solved) return
                        setFee(Number(event.target.value))
                        setFeedback(null)
                    }}
                    disabled={solved}
                    className="w-full cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
                    <span>{cop(SAVINGS_CIRCLE.minFee)}</span>
                    <span>{cop(SAVINGS_CIRCLE.maxFee)}</span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 dark:text-zinc-400">Pozo de la semana</span>
                    <span className={cn("tabular-nums", pot >= SAVINGS_CIRCLE.fridgePrice ? "text-emerald-600" : "text-amber-600")}>
                        {cop(pot)}
                    </span>
                </div>
                <div className="flex gap-1">
                    {Array.from({ length: SAVINGS_CIRCLE.members }).map((_, index) => (
                        <span
                            key={index}
                            className={cn(
                                "h-8 flex-1 rounded-md transition-colors duration-300",
                                index < filledBlocks
                                    ? "bg-emerald-400"
                                    : "bg-slate-200 dark:bg-zinc-800",
                            )}
                            style={{ transitionDelay: `${index * 25}ms` }}
                        />
                    ))}
                </div>
                <p className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
                    {cop(pot)} de {cop(SAVINGS_CIRCLE.fridgePrice)}
                    {missing > 0 ? ` · faltan ${cop(missing)}` : " · alcanza para la nevera"}
                </p>
            </div>

            {feedback && <CoachMessage tone={feedback.tone}>{feedback.text}</CoachMessage>}

            {!solved ? (
                <button
                    type="button"
                    onClick={confirm}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                >
                    Proponer la cuota
                </button>
            ) : (
                <div className="animate-in fade-in space-y-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900 ring-1 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-100 dark:ring-emerald-900/50">
                    <p>
                        La cuenta: {cop(SAVINGS_CIRCLE.fridgePrice)} ÷ {SAVINGS_CIRCLE.members} vecinos ={" "}
                        <strong>{cop(SAVINGS_CIRCLE.fridgePrice / SAVINGS_CIRCLE.members)}</strong> por semana.
                    </p>
                    <p>
                        Y algo importante: cuando te toca el turno recibes el pozo, pero sigues aportando hasta la
                        última semana. La junta funciona porque todos cumplen.
                    </p>
                </div>
            )}
        </div>
    )
}
