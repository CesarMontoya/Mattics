"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, Coins } from "lucide-react"
import { CoachMessage } from "./SliceShell"
import { cop } from "./types"

export interface SortItem {
    id: string
    emoji: string
    label: string
    amount?: number
    kind: string
    feedback: string
}

export interface SortZone {
    id: string
    label: string
    hint: string
    tone: "positive" | "negative"
}

interface SortBoardProps {
    items: SortItem[]
    zones: SortZone[]
    onSolved: (attempts: number) => void
}

const zoneStyles: Record<SortZone["tone"], { base: string; active: string; badge: string }> = {
    positive: {
        base: "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/20",
        active: "border-emerald-400 ring-4 ring-emerald-100 dark:ring-emerald-900/40",
        badge: "bg-emerald-600",
    },
    negative: {
        base: "border-rose-200 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/20",
        active: "border-rose-400 ring-4 ring-rose-100 dark:ring-rose-900/40",
        badge: "bg-rose-600",
    },
}

export function SortBoard({ items, zones, onSolved }: SortBoardProps) {
    const [placed, setPlaced] = React.useState<Record<string, string>>({})
    const [selected, setSelected] = React.useState<string | null>(null)
    const [wrongId, setWrongId] = React.useState<string | null>(null)
    const [message, setMessage] = React.useState<{ tone: "success" | "error"; text: string } | null>(null)
    const [attempts, setAttempts] = React.useState(0)
    const solvedRef = React.useRef(false)

    const bank = items.filter((item) => !placed[item.id])
    const solved = bank.length === 0

    const place = React.useCallback(
        (itemId: string, zoneId: string) => {
            if (solvedRef.current) return
            const item = items.find((candidate) => candidate.id === itemId)
            if (!item || placed[itemId]) return

            if (item.kind === zoneId) {
                const next = { ...placed, [itemId]: zoneId }
                setPlaced(next)
                setSelected(null)
                setMessage({ tone: "success", text: item.feedback })
                if (Object.keys(next).length === items.length) {
                    solvedRef.current = true
                    onSolved(attempts)
                }
            } else {
                setAttempts((value) => value + 1)
                setWrongId(itemId)
                setSelected(null)
                setMessage({ tone: "error", text: item.feedback })
                window.setTimeout(() => setWrongId(null), 600)
            }
        },
        [attempts, items, onSolved, placed],
    )

    const onCardClick = (itemId: string) => {
        if (solvedRef.current) return
        setSelected((current) => (current === itemId ? null : itemId))
    }

    const onZoneClick = (zoneId: string) => {
        if (!selected) {
            setMessage({ tone: "error", text: "Primero elige una tarjeta y después el grupo donde va." })
            return
        }
        place(selected, zoneId)
    }

    return (
        <div className="space-y-5">
            <style>{`@keyframes tienda-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`}</style>

            <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
                    Tarjetas por clasificar
                </p>
                <div data-testid="sort-bank" className="grid gap-2.5 sm:grid-cols-2">
                    {bank.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            data-testid={`sort-card-${item.id}`}
                            draggable
                            onDragStart={(event) => {
                                event.dataTransfer.setData("text/plain", item.id)
                                event.dataTransfer.effectAllowed = "move"
                            }}
                            onClick={() => onCardClick(item.id)}
                            aria-pressed={selected === item.id}
                            className={cn(
                                "group flex w-full items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3 text-left transition-all dark:bg-zinc-900",
                                "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
                                selected === item.id
                                    ? "-translate-y-0.5 border-amber-400 ring-4 ring-amber-100 dark:ring-amber-900/40"
                                    : "border-slate-200 dark:border-zinc-700",
                                wrongId === item.id && "border-rose-400",
                            )}
                            style={wrongId === item.id ? { animation: "tienda-shake 0.5s ease-in-out" } : undefined}
                        >
                            <span aria-hidden className="text-2xl">
                                {item.emoji}
                            </span>
                            <span className="flex-1 text-sm font-semibold leading-snug text-slate-800 dark:text-zinc-100">
                                {item.label}
                            </span>
                            {typeof item.amount === "number" && (
                                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold tabular-nums text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
                                    <Coins className="h-3 w-3" />
                                    {cop(item.amount)}
                                </span>
                            )}
                        </button>
                    ))}
                    {solved && (
                        <p className="col-span-full rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
                            Todas las tarjetas están en su lugar.
                        </p>
                    )}
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {zones.map((zone) => {
                    const zoneItems = items.filter((item) => placed[item.id] === zone.id)
                    const isActive = selected !== null
                    return (
                        <button
                            key={zone.id}
                            type="button"
                            data-testid={`sort-zone-${zone.id}`}
                            onClick={() => onZoneClick(zone.id)}
                            onDragOver={(event) => {
                                event.preventDefault()
                                event.dataTransfer.dropEffect = "move"
                            }}
                            onDrop={(event) => {
                                event.preventDefault()
                                const id = event.dataTransfer.getData("text/plain")
                                if (id) place(id, zone.id)
                            }}
                            className={cn(
                                "min-h-[132px] rounded-2xl border-2 border-dashed p-4 text-left transition-all",
                                zoneStyles[zone.tone].base,
                                isActive && "border-solid",
                                zoneStyles[zone.tone].active,
                            )}
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <span
                                    className={cn(
                                        "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white",
                                        zoneStyles[zone.tone].badge,
                                    )}
                                >
                                    {zoneItems.length}
                                </span>
                                <span className="text-sm font-bold text-slate-700 dark:text-zinc-100">{zone.label}</span>
                            </div>
                            <p className="mb-3 text-xs text-slate-500 dark:text-zinc-400">{zone.hint}</p>
                            <div className="space-y-1.5">
                                {zoneItems.map((item) => (
                                    <span
                                        key={item.id}
                                        className="flex animate-in items-center gap-2 fade-in slide-in-from-bottom-2 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:bg-zinc-900/80 dark:text-zinc-200"
                                    >
                                        <span aria-hidden>{item.emoji}</span>
                                        <span className="flex-1">{item.label}</span>
                                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                                    </span>
                                ))}
                            </div>
                        </button>
                    )
                })}
            </div>

            {message && <CoachMessage tone={message.tone}>{message.text}</CoachMessage>}
        </div>
    )
}
