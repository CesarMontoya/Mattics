"use client"

import * as React from "react"
import { ArrowRight, CheckCircle2, Lightbulb, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function GrandmaSays({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 rounded-3xl rounded-tl-md bg-amber-50 px-5 py-4 text-amber-900 ring-1 ring-amber-200/70 dark:bg-amber-950/30 dark:text-amber-100 dark:ring-amber-900/50">
            <span aria-hidden className="text-2xl leading-none">
                👵
            </span>
            <p className="text-[15px] leading-relaxed">{children}</p>
        </div>
    )
}

type Tone = "success" | "error" | "info"

export function CoachMessage({
    tone,
    children,
}: {
    tone: Tone
    children: React.ReactNode
}) {
    const styles: Record<Tone, string> = {
        success:
            "bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-100 dark:ring-emerald-900/60",
        error: "bg-rose-50 text-rose-800 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-100 dark:ring-rose-900/60",
        info: "bg-slate-50 text-slate-700 ring-slate-200 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-800",
    }
    const icons: Record<Tone, React.ReactNode> = {
        success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />,
        error: <Lightbulb className="h-5 w-5 shrink-0 text-rose-500" />,
        info: <Info className="h-5 w-5 shrink-0 text-slate-400" />,
    }

    return (
        <div
            role="status"
            aria-live="polite"
            className={cn(
                "flex items-start gap-3 rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed ring-1",
                styles[tone],
            )}
        >
            {icons[tone]}
            <span>{children}</span>
        </div>
    )
}

interface SliceShellProps {
    eyebrow: string
    title: string
    goal: string
    children: React.ReactNode
    footer?: React.ReactNode
    header?: React.ReactNode
}

export function SliceShell({ eyebrow, title, goal, children, footer, header }: SliceShellProps) {
    return (
        <section className="mx-auto w-full max-w-3xl">
            <div className="overflow-hidden rounded-[2rem] border-2 border-amber-100 bg-white shadow-[0_24px_60px_-30px_rgba(120,53,15,0.45)] dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-start justify-between gap-4 border-b border-amber-100/80 bg-gradient-to-r from-amber-50 via-white to-rose-50 px-6 py-4 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700/80 dark:text-amber-300/80">
                            {eyebrow}
                        </p>
                        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-2xl">
                            {title}
                        </h2>
                    </div>
                    {header}
                </div>

                <div className="space-y-5 px-5 py-6 sm:px-7">
                    <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">{goal}</p>
                    {children}
                </div>

                {footer && (
                    <div className="flex items-center justify-between gap-3 border-t border-amber-100/80 bg-amber-50/40 px-5 py-4 sm:px-7 dark:border-zinc-800 dark:bg-zinc-900/60">
                        {footer}
                    </div>
                )}
            </div>
        </section>
    )
}

export function ContinueButton({
    enabled,
    onClick,
    children = "Continuar",
}: {
    enabled: boolean
    onClick: () => void
    children?: React.ReactNode
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={!enabled}
            className={cn(
                "ml-auto inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all",
                enabled
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-600/25 hover:bg-amber-700 hover:shadow-amber-700/30 active:scale-[0.98]"
                    : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-600",
            )}
        >
            {children}
            <ArrowRight className="h-4 w-4" />
        </button>
    )
}
