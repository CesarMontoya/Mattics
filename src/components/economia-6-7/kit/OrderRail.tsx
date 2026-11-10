"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, RotateCcw, X } from "lucide-react"
import { CoachMessage } from "./SliceShell"
import type { RailItem } from "../content"

interface OrderRailProps {
    items: RailItem[]
    onSolved: (attempts: number) => void
}

/** Orden inicial fijo (no aleatorio) para que la hidratación sea estable. */
const START_ORDER = [1, 3, 0, 2]

type SlotMark = "ok" | "bad" | null

export function OrderRail({ items, onSolved }: OrderRailProps) {
    const [slots, setSlots] = React.useState<(string | null)[]>(() => items.map(() => null))
    const [marks, setMarks] = React.useState<SlotMark[]>(() => items.map(() => null))
    const [selected, setSelected] = React.useState<string | null>(null)
    const [attempts, setAttempts] = React.useState(0)
    const [message, setMessage] = React.useState<{ tone: "success" | "error" | "info"; text: string } | null>({
        tone: "info",
        text: "Arrastra cada tarjeta a un lugar, o toca la tarjeta y después el número.",
    })
    const solvedRef = React.useRef(false)

    const bankIds = React.useMemo(() => {
        const placed = new Set(slots.filter(Boolean) as string[])
        const ordered = START_ORDER.map((index) => items[index]?.id).filter(Boolean) as string[]
        return ordered.filter((id) => !placed.has(id))
    }, [items, slots])

    const place = (itemId: string, slotIndex: number) => {
        if (solvedRef.current) return
        if (marks[slotIndex] === "ok") return
        setSlots((current) => {
            if (current[slotIndex]) return current
            const next = current.map((value) => (value === itemId ? null : value))
            next[slotIndex] = itemId
            return next
        })
        setMarks((current) => current.map((mark, index) => (index === slotIndex ? null : mark)))
        setSelected(null)
    }

    const remove = (slotIndex: number) => {
        if (solvedRef.current || marks[slotIndex] === "ok") return
        setSlots((current) => current.map((value, index) => (index === slotIndex ? null : value)))
        setMarks((current) => current.map((mark, index) => (index === slotIndex ? null : mark)))
    }

    const check = () => {
        if (slots.some((slot) => !slot)) {
            setMessage({ tone: "error", text: "Todavía falta ubicar una tarjeta." })
            return
        }
        const nextMarks = slots.map((id, index) => (id === items[index].id ? "ok" : "bad")) as SlotMark[]
        setMarks(nextMarks)
        const wrongCount = nextMarks.filter((mark) => mark === "bad").length

        if (wrongCount === 0) {
            solvedRef.current = true
            setMessage({
                tone: "success",
                text: "Ese es el camino: primero el trueque, después las monedas, luego los billetes y hoy el pago con el celular.",
            })
            onSolved(attempts)
            return
        }

        setAttempts((value) => value + 1)
        const firstWrong = slots.findIndex((id, index) => id !== items[index].id)
        setMessage({
            tone: "error",
            text: `Hay ${wrongCount} ${wrongCount === 1 ? "paso mal ubicado" : "pasos mal ubicados"}. ${items[firstWrong].feedback}`,
        })
    }

    const allFilled = slots.every(Boolean)
    const solved = marks.every((mark) => mark === "ok")

    return (
        <div className="space-y-5">
            <div className="grid gap-2.5 sm:grid-cols-2">
                {bankIds.map((id) => {
                    const item = items.find((candidate) => candidate.id === id)
                    if (!item) return null
                    return (
                        <button
                            key={id}
                            type="button"
                            data-testid={`rail-card-${id}`}
                            draggable
                            onDragStart={(event) => {
                                event.dataTransfer.setData("text/plain", id)
                                event.dataTransfer.effectAllowed = "move"
                            }}
                            onClick={() => setSelected((current) => (current === id ? null : id))}
                            aria-pressed={selected === id}
                            className={cn(
                                "flex w-full items-start gap-3 rounded-2xl border-2 bg-white px-4 py-3 text-left transition-all dark:bg-zinc-900",
                                "hover:-translate-y-0.5 hover:shadow-md",
                                selected === id
                                    ? "-translate-y-0.5 border-amber-400 ring-4 ring-amber-100 dark:ring-amber-900/40"
                                    : "border-slate-200 dark:border-zinc-700",
                            )}
                        >
                            <span aria-hidden className="text-2xl">
                                {item.emoji}
                            </span>
                            <span>
                                <span className="block text-sm font-bold text-slate-800 dark:text-zinc-100">
                                    {item.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-snug text-slate-500 dark:text-zinc-400">
                                    {item.detail}
                                </span>
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className="relative">
                <div className="absolute inset-x-6 top-3.5 hidden h-0.5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 sm:block dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />
                <div className="relative grid gap-3 sm:grid-cols-4">
                    {slots.map((id, index) => {
                        const item = id ? items.find((candidate) => candidate.id === id) : null
                        const mark = marks[index]
                        return (
                            <div key={index} className="flex flex-col items-stretch gap-2">
                                <span
                                    className={cn(
                                        "mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                                        mark === "ok"
                                            ? "bg-emerald-500 text-white"
                                            : mark === "bad"
                                              ? "bg-rose-500 text-white"
                                              : "bg-white text-slate-500 ring-2 ring-amber-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700",
                                    )}
                                >
                                    {index + 1}
                                </span>
                                <button
                                    type="button"
                                    data-testid={`rail-slot-${index}`}
                                    onClick={() => {
                                        if (id) remove(index)
                                        else if (selected) place(selected, index)
                                    }}
                                    onDragOver={(event) => {
                                        event.preventDefault()
                                        event.dataTransfer.dropEffect = "move"
                                    }}
                                    onDrop={(event) => {
                                        event.preventDefault()
                                        const dropped = event.dataTransfer.getData("text/plain")
                                        if (dropped && !id) place(dropped, index)
                                    }}
                                    className={cn(
                                        "flex min-h-[116px] flex-col items-center justify-center gap-1.5 rounded-2xl border-2 p-3 text-center transition-all",
                                        !item &&
                                            "border-dashed border-slate-200 bg-slate-50/70 text-slate-400 dark:border-zinc-700 dark:bg-zinc-900/40",
                                        item &&
                                            mark === "ok" &&
                                            "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
                                        item &&
                                            mark === "bad" &&
                                            "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30",
                                        item &&
                                            !mark &&
                                            "border-slate-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900",
                                        selected && !id && "border-amber-300 bg-amber-50/60 dark:border-amber-800",
                                    )}
                                >
                                    {item ? (
                                        <>
                                            <span aria-hidden className="text-2xl">
                                                {item.emoji}
                                            </span>
                                            <span className="text-xs font-bold leading-tight text-slate-800 dark:text-zinc-100">
                                                {item.label}
                                            </span>
                                            {mark === "ok" && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                                            {mark === "bad" && <X className="h-3.5 w-3.5 text-rose-500" />}
                                        </>
                                    ) : (
                                        <span className="text-xs font-semibold">Soltar aquí</span>
                                    )}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            {message && <CoachMessage tone={message.tone}>{message.text}</CoachMessage>}

            {!solved && (
                <button
                    type="button"
                    data-testid="rail-check"
                    onClick={check}
                    disabled={!allFilled}
                    className={cn(
                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                        allFilled
                            ? "bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
                            : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-600",
                    )}
                >
                    <RotateCcw className="h-4 w-4" />
                    Revisar el orden
                </button>
            )}
        </div>
    )
}
