"use client"

import * as React from "react"
import { ChevronLeft, RotateCcw, Store } from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { Mural } from "./kit/Mural"
import { SliceShell, ContinueButton } from "./kit/SliceShell"
import { Prologo } from "./Prologo"
import { Capitulo1Dinero } from "./Capitulo1Dinero"
import { Capitulo2Caja } from "./Capitulo2Caja"
import { Capitulo3Precio } from "./Capitulo3Precio"
import { Capitulo4Consejos } from "./Capitulo4Consejos"
import { Capitulo5Semana } from "./Capitulo5Semana"
import { CierrePostal } from "./CierrePostal"
import type { StepId, StepProps, StepResult } from "./kit/types"

interface StepDefinition {
    id: StepId
    eyebrow: string
    title: string
    goal: string
    Component: React.ComponentType<StepProps>
}

const STEPS: StepDefinition[] = [
    {
        id: "prologo",
        eyebrow: "Antes de abrir",
        title: "Te dejo la caja",
        goal: "La abuela se va tres días y la tienda queda en tus manos.",
        Component: Prologo,
    },
    {
        id: "dinero",
        eyebrow: "Día 1 · Capítulo 1",
        title: "¿De dónde viene este billete?",
        goal: "Ordena cómo cambió el dinero desde el trueque hasta el pago con el celular.",
        Component: Capitulo1Dinero,
    },
    {
        id: "caja",
        eyebrow: "Día 2 · Capítulo 2",
        title: "La caja del día",
        goal: "Separa lo que entra de lo que sale y descubre cuánto queda.",
        Component: Capitulo2Caja,
    },
    {
        id: "precio",
        eyebrow: "Día 3 · Capítulo 3",
        title: "¿Cuánto cobro el jugo?",
        goal: "Encuentra el precio que alcanza la meta del día.",
        Component: Capitulo3Precio,
    },
    {
        id: "consejos",
        eyebrow: "Día 4 · Capítulo 4",
        title: "Los consejos de la abuela",
        goal: "Separa los hábitos que cuidan la plata de los que la gastan.",
        Component: Capitulo4Consejos,
    },
    {
        id: "semana",
        eyebrow: "Día 5 · Capítulo 5",
        title: "La semana en el cuaderno",
        goal: "Suma los cinco días y averigua si la semana cerró en ganancia o en pérdida, y de cuánto.",
        Component: Capitulo5Semana,
    },
    {
        id: "postal",
        eyebrow: "Cierre",
        title: "La postal",
        goal: "Pinta la tienda y llévate tu plan de ahorro.",
        Component: CierrePostal,
    },
]

const STORAGE_KEY = "economia-6-7:tienda-progreso"

interface SavedState {
    completed: StepId[]
    maxVisited: number
    results: Partial<Record<StepId, StepResult>>
}

function readSaved(key: string): SavedState | null {
    try {
        const raw = window.localStorage.getItem(key)
        if (!raw) return null
        const parsed = JSON.parse(raw) as Partial<SavedState>
        if (!Array.isArray(parsed.completed)) return null
        // "junta" fue el nombre anterior del quinto capítulo.
        const legacyIds: Record<string, StepId> = { junta: "semana" }
        const restored = (parsed.completed as string[])
            .map((id) => legacyIds[id] ?? id)
            .filter((id): id is StepId => STEPS.some((step) => step.id === id))

        return {
            completed: restored,
            maxVisited: typeof parsed.maxVisited === "number" ? parsed.maxVisited : 0,
            results: (parsed.results as SavedState["results"]) ?? {},
        }
    } catch {
        return null
    }
}

interface EconomiaActividadProps {
    /** Nombres de la entrega: titular y grupo. */
    studentNames?: string[]
    /** Se llama en cada cambio de avance para guardarlo en la clase. */
    onProgress?: (payload: {
        progress: Record<string, unknown>
        answers: Record<string, unknown>
        completed: StepId[]
        done: boolean
    }) => void
    /** Salir de la entrega actual y volver al formulario de entrada. */
    onExit?: () => void
    /** Sin el menú del sitio: la actividad se abre desde un enlace de clase. */
    standalone?: boolean
    /** Aísla el progreso local por entrega, para que dos estudiantes no se mezclen. */
    storageId?: string
}

export default function EconomiaActividad({
    studentNames = [],
    onProgress,
    onExit,
    standalone = false,
    storageId,
}: EconomiaActividadProps) {
    const [current, setCurrent] = React.useState(0)
    const [completed, setCompleted] = React.useState<StepId[]>([])
    const [results, setResults] = React.useState<Partial<Record<StepId, StepResult>>>({})
    const [maxVisited, setMaxVisited] = React.useState(0)
    const [hydrated, setHydrated] = React.useState(false)

    const storageKey = storageId ? `${STORAGE_KEY}:${storageId}` : STORAGE_KEY

    React.useEffect(() => {
        const saved = readSaved(storageKey)
        const param = Number(new URLSearchParams(window.location.search).get("paso"))
        const fromUrl = Number.isFinite(param) && param >= 1 && param <= STEPS.length ? param - 1 : null

        if (saved) {
            setCompleted(saved.completed)
            setMaxVisited(saved.maxVisited)
        }
        const start = fromUrl ?? Math.min(saved?.maxVisited ?? 0, STEPS.length - 1)
        setCurrent(start)
        setMaxVisited((value) => Math.max(value, saved?.maxVisited ?? 0, start))
        if (saved?.results) setResults(saved.results)
        setHydrated(true)
    }, [storageKey])

    React.useEffect(() => {
        if (!hydrated) return
        window.localStorage.setItem(storageKey, JSON.stringify({ completed, maxVisited, results }))
    }, [completed, maxVisited, results, hydrated, storageKey])

    React.useEffect(() => {
        if (!hydrated || !onProgress) return
        const progress = Object.fromEntries(
            completed.map((id) => [id, { attempts: results[id]?.attempts ?? 0 }]),
        )
        const answers = Object.fromEntries(completed.map((id) => [id, results[id]?.answers ?? {}]))
        onProgress({ progress, answers, completed, done: completed.length === STEPS.length })
    }, [completed, results, hydrated, onProgress])

    React.useEffect(() => {
        if (!hydrated) return
        const url = new URL(window.location.href)
        url.searchParams.set("paso", String(current + 1))
        window.history.replaceState(null, "", url)
    }, [current, hydrated])

    const step = STEPS[current]
    const isDone = completed.includes(step.id)
    const isLast = current === STEPS.length - 1

    const markDone = React.useCallback(
        (result?: StepResult) => {
            setCompleted((currentCompleted) =>
                currentCompleted.includes(step.id) ? currentCompleted : [...currentCompleted, step.id],
            )
            if (result) setResults((current) => ({ ...current, [step.id]: result }))
        },
        [step.id],
    )

    const goTo = (index: number) => {
        if (index < 0 || index > maxVisited) return
        setCurrent(index)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const next = () => {
        if (isLast) return
        const target = current + 1
        setMaxVisited((value) => Math.max(value, target))
        setCurrent(target)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const restart = () => {
        const confirmed = window.confirm("¿Borrar el progreso y empezar de nuevo?")
        if (!confirmed) return
        window.localStorage.removeItem(storageKey)
        setCompleted([])
        setMaxVisited(0)
        setCurrent(0)
    }

    const StepBody = step.Component

    const content = (
            <main className="flex-1 bg-gradient-to-b from-amber-50/60 via-white to-rose-50/40 pb-16 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
                <div className="mx-auto w-full max-w-4xl px-4 pt-6 sm:px-6">
                    <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/25">
                                <Store className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700/80 dark:text-amber-400/80">
                                    Educación económica y financiera
                                </p>
                                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-xl">
                                    La tienda de la abuela
                                </h1>
                                {studentNames.length > 0 && (
                                    <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                                        {studentNames.join(" · ")}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block">
                                <Mural completed={completed} size={104} />
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-zinc-500">
                                    Paso {current + 1} de {STEPS.length}
                                </p>
                                <p className="text-sm font-bold text-slate-700 dark:text-zinc-200">
                                    {completed.length} de {STEPS.length} listos
                                </p>
                                {onExit && (
                                    <button
                                        type="button"
                                        onClick={onExit}
                                        className="text-[11px] font-semibold text-slate-400 underline underline-offset-2 hover:text-rose-600"
                                    >
                                        Cambiar de estudiante
                                    </button>
                                )}
                            </div>
                        </div>
                    </header>

                    <nav aria-label="Progreso de la actividad" className="mb-5 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => goTo(current - 1)}
                            disabled={current === 0}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-400"
                            aria-label="Paso anterior"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <ol className="flex flex-1 items-center gap-1.5">
                            {STEPS.map((candidate, index) => {
                                const done = completed.includes(candidate.id)
                                const active = index === current
                                const reachable = index <= maxVisited
                                return (
                                    <li key={candidate.id} className="flex-1">
                                        <button
                                            type="button"
                                            onClick={() => goTo(index)}
                                            disabled={!reachable}
                                            aria-current={active ? "step" : undefined}
                                            aria-label={`${candidate.title}${done ? " (listo)" : ""}`}
                                            className={cn(
                                                "group flex w-full flex-col items-start gap-1",
                                                reachable ? "cursor-pointer" : "cursor-not-allowed",
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "h-1.5 w-full rounded-full transition-colors",
                                                    done
                                                        ? "bg-emerald-500"
                                                        : active
                                                          ? "bg-amber-400"
                                                          : reachable
                                                            ? "bg-slate-200 dark:bg-zinc-700"
                                                            : "bg-slate-100 dark:bg-zinc-800",
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "hidden text-[10px] font-bold uppercase tracking-wide transition-colors sm:block",
                                                    active
                                                        ? "text-slate-700 dark:text-zinc-200"
                                                        : "text-slate-400 dark:text-zinc-500",
                                                )}
                                            >
                                                {candidate.eyebrow.split("·").pop()?.trim()}
                                            </span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ol>

                        <button
                            type="button"
                            onClick={restart}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:text-rose-600 dark:border-zinc-700 dark:text-zinc-400"
                            aria-label="Reiniciar la actividad"
                            title="Reiniciar la actividad"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                    </nav>

                    <div key={step.id} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4">
                        <SliceShell
                            eyebrow={step.eyebrow}
                            title={step.title}
                            goal={step.goal}
                            footer={
                                <>
                                    <p className="text-xs font-semibold text-slate-400 dark:text-zinc-500">
                                        {isDone
                                            ? "Paso completado."
                                            : "Resuelve el ejercicio para continuar."}
                                    </p>
                                    {!isLast && (
                                        <ContinueButton enabled={isDone} onClick={next}>
                                            {current === 0 ? "Abrir la tienda" : "Continuar"}
                                        </ContinueButton>
                                    )}
                                    {isLast && isDone && (
                                        <span className="text-sm font-bold text-emerald-600">
                                            Actividad terminada 🎉
                                        </span>
                                    )}
                                </>
                            }
                        >
                            <StepBody onDone={markDone} studentNames={studentNames} />
                        </SliceShell>
                    </div>

                    <p className="mt-6 text-center text-[11px] font-medium text-slate-400 dark:text-zinc-600">
                        Actividad de 90 minutos · Grados 6-7 · Educación económica y financiera
                    </p>
                </div>
            </main>
    )

    // En una clase (/e/CODIGO) el estudiante no necesita el menú del sitio.
    if (standalone) return content

    return (
        <SidebarLayout breadcrumbs={[{ label: "Económica 6-7", href: "#" }, { label: "La tienda de la abuela" }]}>
            {content}
        </SidebarLayout>
    )
}
