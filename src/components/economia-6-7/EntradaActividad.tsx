"use client"

import * as React from "react"
import { UserPlus, X, ArrowRight, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import EconomiaActividad from "./EconomiaActividad"

interface EntradaActividadProps {
    code: string
    title: string
}

interface Entrega {
    token: string
    names: string[]
}

const MAX_ACOMPANANTES = 5

function storageKey(code: string) {
    return `actividad:${code}:entrega`
}

export default function EntradaActividad({ code, title }: EntradaActividadProps) {
    const [entrega, setEntrega] = React.useState<Entrega | null>(null)
    const [ready, setReady] = React.useState(false)

    const [nombre, setNombre] = React.useState("")
    const [acompanantes, setAcompanantes] = React.useState<string[]>([])
    const [error, setError] = React.useState<string | null>(null)
    const [enviando, setEnviando] = React.useState(false)

    // Referencia estable para que el guardado de avance no se recree en cada render.
    const entregaRef = React.useRef<Entrega | null>(null)
    React.useEffect(() => {
        entregaRef.current = entrega
    }, [entrega])

    const enviarProgreso = React.useCallback(
        async (payload: {
            progress: Record<string, unknown>
            answers: Record<string, unknown>
            completed: string[]
            done: boolean
        }) => {
            const actual = entregaRef.current
            if (!actual) return
            try {
                await fetch("/api/actividad/progreso", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: actual.token, ...payload }),
                })
            } catch {
                // Sin red: el avance sigue en el navegador y se reintenta en el siguiente paso.
            }
        },
        [],
    )

    React.useEffect(() => {
        try {
            const raw = window.localStorage.getItem(storageKey(code))
            if (raw) {
                const parsed = JSON.parse(raw) as Entrega
                if (parsed?.token && Array.isArray(parsed.names)) setEntrega(parsed)
            }
        } catch {
            // Entrega guardada corrupta: se ignora y se pide de nuevo.
        }
        setReady(true)
    }, [code])

    const guardar = (data: Entrega) => {
        window.localStorage.setItem(storageKey(code), JSON.stringify(data))
        setEntrega(data)
    }

    const salir = () => {
        window.localStorage.removeItem(storageKey(code))
        setEntrega(null)
        setNombre("")
        setAcompanantes([])
        setError(null)
    }

    const inscribirse = async (event: React.FormEvent) => {
        event.preventDefault()
        if (enviando) return
        setError(null)

        const limpio = nombre.trim().replace(/\s+/g, " ")
        if (limpio.split(" ").filter(Boolean).length < 2) {
            setError("Escribe el nombre completo: nombre y apellido.")
            return
        }

        setEnviando(true)
        try {
            const response = await fetch("/api/actividad/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code,
                    studentName: limpio,
                    groupNames: acompanantes.map((name) => name.trim()).filter(Boolean),
                }),
            })
            const data = (await response.json()) as { token?: string; names?: string[]; error?: string }
            if (!response.ok || !data.token || !data.names) {
                setError(data.error ?? "No se pudo registrar. Intenta de nuevo.")
                return
            }
            guardar({ token: data.token, names: data.names })
        } catch {
            setError("No hay conexión. Revisa internet e intenta otra vez.")
        } finally {
            setEnviando(false)
        }
    }

    if (!ready) {
        return <div className="min-h-screen bg-amber-50/40 dark:bg-zinc-950" />
    }

    if (entrega) {
        return (
            <EconomiaActividad
                standalone
                storageId={entrega.token}
                studentNames={entrega.names}
                onExit={salir}
                onProgress={enviarProgreso}
            />
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 via-white to-rose-50 px-4 py-10 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
            <div className="w-full max-w-lg rounded-[2rem] border-2 border-amber-100 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(120,53,15,0.45)] sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700/80 dark:text-amber-400/80">
                    Actividad de clase
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
                    La tienda de la abuela
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                    {title} · código <span className="font-mono font-bold">{code}</span>
                </p>

                <form onSubmit={inscribirse} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="nombre" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-zinc-200">
                            Tu nombre completo
                        </label>
                        <input
                            id="nombre"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                            autoComplete="name"
                            placeholder="Nombre y apellido"
                            maxLength={80}
                            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-colors focus:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-700 dark:text-zinc-200">
                                ¿Trabajan en grupo?
                            </p>
                            <span className="text-[11px] font-semibold text-slate-400">Opcional</span>
                        </div>

                        {acompanantes.map((name, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    value={name}
                                    onChange={(event) => {
                                        const next = [...acompanantes]
                                        next[index] = event.target.value
                                        setAcompanantes(next)
                                    }}
                                    placeholder={`Nombre y apellido del compañero ${index + 1}`}
                                    maxLength={80}
                                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setAcompanantes(acompanantes.filter((_, i) => i !== index))}
                                    aria-label="Quitar compañero"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-rose-600 dark:border-zinc-700"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        {acompanantes.length < MAX_ACOMPANANTES && (
                            <button
                                type="button"
                                onClick={() => setAcompanantes([...acompanantes, ""])}
                                className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-zinc-700 dark:text-zinc-400"
                            >
                                <UserPlus className="h-4 w-4" />
                                Agregar compañero
                            </button>
                        )}
                    </div>

                    {error && (
                        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={enviando}
                        className={cn(
                            "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold text-white transition-all",
                            enviando ? "bg-amber-400" : "bg-amber-600 hover:bg-amber-700 active:scale-[0.99]",
                        )}
                    >
                        {enviando ? "Entrando…" : "Empezar la actividad"}
                        <ArrowRight className="h-4 w-4" />
                    </button>

                    <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-400 dark:text-zinc-500">
                        <Users className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Tu nombre y tu avance quedan guardados para que el docente pueda revisarlos. Si trabajan en
                        grupo, el trabajo se guarda a nombre de todos.
                    </p>
                </form>
            </div>
        </div>
    )
}
