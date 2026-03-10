"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { Button } from "@/components/ui/sidebar/button"
import {
    CheckCircle2, XCircle, Trophy, RotateCcw, Lock, Star,
    Zap, Layers, Grid3x3, Search, Puzzle, Globe, ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────

type PillStatus = "locked" | "active" | "complete"
type Answer = { value: string; correct: boolean } | null

interface PillState {
    status: PillStatus
    answers: Record<string, Answer>
}

const STORAGE_KEY = "triada-aritmetica-progress"

const PILL_META = [
    { id: 1, title: "Crecimiento Acelerado", subtitle: "Concepto de Potencia", icon: Zap, color: "orange" },
    { id: 2, title: "Reglas del Juego", subtitle: "Propiedades de la Potenciación", icon: Layers, color: "amber" },
    { id: 3, title: "Dimensiones", subtitle: "Radicación Geométrica", icon: Grid3x3, color: "emerald" },
    { id: 4, title: "El Buscador", subtitle: "Introducción a Logaritmos", icon: Search, color: "blue" },
    { id: 5, title: "La Tríada Unida", subtitle: "Conectando las tres operaciones", icon: Puzzle, color: "violet" },
    { id: 6, title: "El Mundo Real", subtitle: "Aplicaciones de Logaritmos", icon: Globe, color: "rose" },
]

const COLOR_MAP: Record<string, string> = {
    orange: "bg-orange-500 border-orange-400 text-orange-600 bg-orange-50 border-orange-200 ring-orange-300",
    amber: "bg-amber-500 border-amber-400 text-amber-600 bg-amber-50 border-amber-200 ring-amber-300",
    emerald: "bg-emerald-500 border-emerald-400 text-emerald-600 bg-emerald-50 border-emerald-200 ring-emerald-300",
    blue: "bg-blue-500 border-blue-400 text-blue-600 bg-blue-50 border-blue-200 ring-blue-300",
    violet: "bg-violet-500 border-violet-400 text-violet-600 bg-violet-50 border-violet-200 ring-violet-300",
    rose: "bg-rose-500 border-rose-400 text-rose-600 bg-rose-50 border-rose-200 ring-rose-300",
}

// ─────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────

const FeedbackBanner = ({ correct, onRetry }: { correct: boolean; onRetry: () => void }) => (
    <div className={cn(
        "flex items-center justify-between p-4 rounded-2xl border-2 animate-in slide-in-from-bottom-4 duration-300",
        correct ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
    )}>
        <div className="flex items-center gap-3">
            {correct
                ? <><div className="bg-emerald-500 p-1.5 rounded-full"><CheckCircle2 className="h-5 w-5 text-white" /></div><div><p className="font-bold text-emerald-800">¡Correcto!</p><p className="text-sm text-emerald-600">Muy bien, sigue adelante.</p></div></>
                : <><div className="bg-rose-500 p-1.5 rounded-full"><XCircle className="h-5 w-5 text-white" /></div><div><p className="font-bold text-rose-800">¡Inténtalo de nuevo!</p><p className="text-sm text-rose-600">Revisa tu respuesta.</p></div></>
            }
        </div>
        {!correct && (
            <Button variant="outline" size="sm" onClick={onRetry} className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full">
                <RotateCcw className="h-3 w-3 mr-1" /> Reintentar
            </Button>
        )}
    </div>
)

const OptionButton = ({ label, selected, submitted, correct, onClick }: {
    label: string; selected: boolean; submitted: boolean; correct: boolean; onClick: () => void
}) => {
    const state = !submitted ? (selected ? "selected" : "idle")
        : selected ? (correct ? "right" : "wrong") : "idle"
    return (
        <button
            onClick={onClick}
            disabled={submitted && correct}
            className={cn(
                "px-6 py-3 rounded-2xl border-2 font-semibold text-lg transition-all duration-200",
                state === "idle" && "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:scale-105",
                state === "selected" && "bg-blue-50 border-blue-400 text-blue-700 scale-105 ring-2 ring-blue-200",
                state === "right" && "bg-emerald-50 border-emerald-400 text-emerald-700 scale-105",
                state === "wrong" && "bg-rose-50 border-rose-400 text-rose-700"
            )}
        >
            {label}
        </button>
    )
}

// ─────────────────────────────────────────────
// PILL 1 – CONCEPTO DE POTENCIA (Tablero de Ajedrez)
// ─────────────────────────────────────────────

const PILL1_QS = [
    { id: "p1q1", q: "En 2³, ¿cuál es la base?", options: ["2", "3", "8", "6"], correct: "2" },
    { id: "p1q2", q: "En 5², ¿cuál es el exponente?", options: ["5", "2", "10", "25"], correct: "2" },
    { id: "p1q3", q: "¿Cuánto vale 3²?", options: ["6", "8", "9", "12"], correct: "9" },
]

const ChessVisual = () => {
    const [clicked, setClicked] = React.useState<number | null>(null)
    const squares = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768]
    return (
        <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
            <p className="text-slate-300 text-sm text-center">Haz clic en una casilla para ver cuántos granos de trigo le corresponden:</p>
            <div className="grid grid-cols-8 gap-1">
                {squares.map((val, i) => (
                    <button
                        key={i}
                        onClick={() => setClicked(i)}
                        className={cn(
                            "aspect-square rounded flex items-center justify-center text-[8px] font-bold transition-all duration-200 border",
                            (i + Math.floor(i / 8)) % 2 === 0 ? "bg-amber-100 text-amber-900 border-amber-200" : "bg-amber-800 text-amber-100 border-amber-700",
                            clicked === i && "ring-2 ring-blue-400 scale-110 z-10"
                        )}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            {clicked !== null && (
                <div className="text-center bg-blue-900/60 rounded-xl p-4 animate-in zoom-in-95 duration-200">
                    <p className="text-blue-200 text-sm">Casilla <span className="font-bold">{clicked + 1}</span></p>
                    <p className="text-white text-2xl font-bold mt-1">
                        2<sup>{clicked}</sup> = <span className="text-yellow-300">{squares[clicked].toLocaleString()} granos</span>
                    </p>
                    <p className="text-slate-400 text-xs mt-1">El número se duplica en cada casilla</p>
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────
// PILL 2 – PROPIEDADES DE POTENCIACIÓN
// ─────────────────────────────────────────────

const PILL2_QS = [
    { id: "p2q1", q: "2³ × 2⁴ = 2^?", hint: "Producto de igual base: suma los exponentes", options: ["12", "7", "1", "6"], correct: "7" },
    { id: "p2q2", q: "3⁶ ÷ 3² = 3^?", hint: "Cociente de igual base: resta los exponentes", options: ["3", "4", "8", "12"], correct: "4" },
    { id: "p2q3", q: "(5²)³ = 5^?", hint: "Potencia de potencia: multiplica los exponentes", options: ["5", "6", "8", "9"], correct: "6" },
    { id: "p2q4", q: "7⁰ = ?", hint: "Cualquier número elevado a cero es 1", options: ["0", "7", "1", "∞"], correct: "1" },
]

// ─────────────────────────────────────────────
// PILL 3 – RADICACIÓN GEOMÉTRICA
// ─────────────────────────────────────────────

const PILL3_QS = [
    { id: "p3q1", q: "√144 = ?", hint: "¿Qué número multiplicado por sí mismo da 144?", options: ["11", "12", "13", "14"], correct: "12" },
    { id: "p3q2", q: "∛27 = ?", hint: "¿Qué número al cubo da 27?", options: ["2", "3", "4", "9"], correct: "3" },
    { id: "p3q3", q: "√196 = ?", hint: "14 × 14 = 196", options: ["13", "16", "14", "15"], correct: "14" },
    { id: "p3q4", q: "∛125 = ?", hint: "5 × 5 × 5 = 125", options: ["3", "4", "5", "6"], correct: "5" },
]

const SquareVisual = ({ side }: { side: number }) => {
    const cells = Array.from({ length: side * side })
    return (
        <div className="flex flex-col items-center gap-2 p-4 bg-emerald-50 rounded-2xl">
            <p className="text-emerald-700 font-bold text-sm">Área = {side}² = {side * side} celdas</p>
            <div
                className="grid gap-0.5"
                style={{ gridTemplateColumns: `repeat(${side}, 1fr)`, maxWidth: `${Math.min(side * 28, 280)}px` }}
            >
                {cells.map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-emerald-400 border border-emerald-500 rounded-sm" />
                ))}
            </div>
            <p className="text-emerald-600 text-sm font-medium">Lado = √{side * side} = <span className="font-bold text-emerald-800">{side}</span></p>
        </div>
    )
}

// ─────────────────────────────────────────────
// PILL 4 – LOGARITMOS
// ─────────────────────────────────────────────

const PILL4_QS = [
    { id: "p4q1", q: "log₂ 8 = ?", hint: "¿A qué potencia debes elevar 2 para obtener 8? (2³=8)", options: ["2", "3", "4", "6"], correct: "3" },
    { id: "p4q2", q: "log₃ 81 = ?", hint: "3⁴ = 81", options: ["3", "4", "9", "27"], correct: "4" },
    { id: "p4q3", q: "log₅ 125 = ?", hint: "5³ = 125", options: ["2", "3", "4", "5"], correct: "3" },
    { id: "p4q4", q: "log₁₀ 1000 = ?", hint: "10³ = 1000", options: ["2", "3", "4", "100"], correct: "3" },
]

const BacteriaTable = () => {
    const rows = [0, 1, 2, 3, 4, 5, 6]
    const [highlighted, setHighlighted] = React.useState<number | null>(null)
    return (
        <div className="bg-blue-950/90 rounded-2xl p-5 space-y-3">
            <p className="text-blue-200 text-sm text-center">Una bacteria se duplica cada hora. Haz clic en una fila:</p>
            <table className="w-full text-center text-sm rounded-xl overflow-hidden">
                <thead>
                    <tr className="bg-blue-900">
                        <th className="py-2 px-3 text-blue-300 font-bold">Horas (t)</th>
                        <th className="py-2 px-3 text-blue-300 font-bold">Expresión</th>
                        <th className="py-2 px-3 text-blue-300 font-bold">Bacterias</th>
                        <th className="py-2 px-3 text-blue-300 font-bold">Logaritmo</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(t => (
                        <tr
                            key={t}
                            onClick={() => setHighlighted(t)}
                            className={cn(
                                "cursor-pointer transition-all duration-200",
                                highlighted === t ? "bg-yellow-500/30 scale-[1.02]" : "hover:bg-blue-800/40",
                                t % 2 === 0 ? "bg-blue-900/30" : "bg-blue-900/10"
                            )}
                        >
                            <td className="py-2 px-3 text-white font-mono">{t}</td>
                            <td className="py-2 px-3 text-blue-300 font-mono">2^{t}</td>
                            <td className="py-2 px-3 text-yellow-300 font-bold">{Math.pow(2, t)}</td>
                            <td className="py-2 px-3 text-emerald-300 font-mono">log₂({Math.pow(2, t)}) = {t}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {highlighted !== null && (
                <div className="text-center text-white bg-blue-800/50 rounded-xl p-3 animate-in zoom-in-95 duration-200">
                    Después de <b className="text-yellow-300">{highlighted} horas</b> hay{" "}
                    <b className="text-emerald-300">{Math.pow(2, highlighted)} bacterias</b>.
                    El logaritmo base 2 de {Math.pow(2, highlighted)} es <b className="text-pink-300">{highlighted}</b>.
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────
// PILL 5 – TRÍADA UNIDA (Matching)
// ─────────────────────────────────────────────

interface MatchPair { id: number; left: string; right: string }
const MATCH_PAIRS: MatchPair[] = [
    { id: 1, left: "2³ = 8", right: "log₂ 8 = 3" },
    { id: 2, left: "3² = 9", right: "√9 = 3" },
    { id: 3, left: "5³ = 125", right: "∛125 = 5" },
    { id: 4, left: "10² = 100", right: "log₁₀ 100 = 2" },
    { id: 5, left: "4² = 16", right: "√16 = 4" },
    { id: 6, left: "2⁴ = 16", right: "log₂ 16 = 4" },
]

const MatchingGame = ({ onComplete }: { onComplete: () => void }) => {
    const [left, setLeft] = React.useState<number | null>(null)
    const [matched, setMatched] = React.useState<number[]>([])
    const [wrong, setWrong] = React.useState<boolean>(false)

    const shuffledRight = React.useMemo(() =>
        [...MATCH_PAIRS].sort(() => Math.random() - 0.5), [])

    const [right, setRight] = React.useState<number | null>(null)

    const handleLeft = (id: number) => { if (matched.includes(id)) return; setLeft(id); setWrong(false) }
    const handleRight = (id: number) => {
        if (!left || matched.includes(id)) return
        setRight(id)
        if (left === id) {
            const newMatched = [...matched, id]
            setMatched(newMatched)
            setLeft(null); setRight(null)
            if (newMatched.length === MATCH_PAIRS.length) onComplete()
        } else {
            setWrong(true)
            setTimeout(() => { setLeft(null); setRight(null); setWrong(false) }, 800)
        }
    }

    return (
        <div className="space-y-4">
            <p className="text-slate-600 dark:text-zinc-400 text-center">
                Selecciona una expresión de la izquierda y su equivalente de la derecha. ({matched.length}/{MATCH_PAIRS.length} conectados)
            </p>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 text-center uppercase tracking-wide">Potencias</p>
                    {MATCH_PAIRS.map(p => (
                        <button key={p.id} onClick={() => handleLeft(p.id)}
                            className={cn(
                                "w-full p-3 rounded-xl border-2 text-sm font-mono font-bold transition-all duration-200",
                                matched.includes(p.id) ? "bg-emerald-100 border-emerald-400 text-emerald-700 opacity-50" :
                                    left === p.id ? "bg-violet-100 border-violet-500 text-violet-800 ring-2 ring-violet-300 scale-105" :
                                        "bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:scale-102"
                            )}
                        >{p.left}</button>
                    ))}
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 text-center uppercase tracking-wide">Equivalentes</p>
                    {shuffledRight.map(p => (
                        <button key={p.id} onClick={() => handleRight(p.id)}
                            className={cn(
                                "w-full p-3 rounded-xl border-2 text-sm font-mono font-bold transition-all duration-200",
                                matched.includes(p.id) ? "bg-emerald-100 border-emerald-400 text-emerald-700 opacity-50" :
                                    right === p.id ? (wrong ? "bg-rose-100 border-rose-400 text-rose-700" : "bg-violet-100 border-violet-500") :
                                        "bg-white border-slate-200 text-slate-700 hover:border-violet-300"
                            )}
                        >{p.right}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
// PILL 6 – APLICACIONES REALES
// ─────────────────────────────────────────────

const PILL6_QS = [
    {
        id: "p6q1",
        context: "🔊 El nivel de sonido en decibelios se calcula con L = 10 × log₁₀(I/I₀). Si una bocina tiene una intensidad 1000 veces mayor que el umbral, ¿cuántos decibeles tiene?",
        q: "L = 10 × log₁₀(1000) = ?",
        hint: "log₁₀(1000) = 3, entonces L = 10 × 3",
        options: ["10 dB", "20 dB", "30 dB", "100 dB"],
        correct: "30 dB"
    },
    {
        id: "p6q2",
        context: "🌍 La escala de Richter mide la magnitud de terremotos con logaritmos base 10. Un sismo de magnitud 6 libera 10 veces más energía que uno de magnitud 5.",
        q: "Un sismo de magnitud 7 libera ¿cuántas veces más energía que uno de magnitud 5?",
        hint: "Magnitud 5→6: ×10, Magnitud 6→7: ×10. Total = 10 × 10",
        options: ["2 veces", "10 veces", "100 veces", "1000 veces"],
        correct: "100 veces"
    },
    {
        id: "p6q3",
        context: "🧪 La escala de pH mide la acidez con pH = -log₁₀[H⁺]. El agua pura tiene pH = 7 ([H⁺] = 10⁻⁷ mol/L).",
        q: "Si [H⁺] = 10⁻⁴ mol/L, ¿cuál es el pH?",
        hint: "pH = -log₁₀(10⁻⁴) = 4",
        options: ["2", "4", "7", "14"],
        correct: "4"
    },
    {
        id: "p6q4",
        context: "📱 Una cuenta de TikTok empieza con 100 seguidores y se triplica cada mes: f(t) = 100 × 3^t.",
        q: "¿Cuántos meses tarda en superar 2700 seguidores?",
        hint: "100 × 3^t > 2700 → 3^t > 27 → t > 3",
        options: ["2 meses", "3 meses", "4 meses", "27 meses"],
        correct: "3 meses"
    },
]

// ─────────────────────────────────────────────
// GENERIC Q&A SECTION
// ─────────────────────────────────────────────

type QAItem = {
    id: string; q: string; options: string[]; correct: string; hint?: string; context?: string
}

const QASection = ({
    questions,
    pillId,
    answers,
    onAnswer,
    onRetry,
}: {
    questions: QAItem[]
    pillId: number
    answers: Record<string, Answer>
    onAnswer: (qId: string, value: string, correct: boolean) => void
    onRetry: (qId: string) => void
}) => {
    const [selected, setSelected] = React.useState<Record<string, string>>({})

    const handleSelect = (qId: string, option: string) => {
        if (answers[qId]?.correct) return
        setSelected(prev => ({ ...prev, [qId]: option }))
    }

    const handleSubmit = (qId: string, correct: string) => {
        const val = selected[qId]
        if (!val) return
        onAnswer(qId, val, val === correct)
    }

    const handleRetry = (qId: string) => {
        setSelected(prev => { const n = { ...prev }; delete n[qId]; return n })
        onRetry(qId)
    }

    return (
        <div className="space-y-6">
            {questions.map((q) => {
                const ans = answers[q.id]
                const submitted = ans !== undefined && ans !== null
                const sel = selected[q.id]

                return (
                    <div key={q.id} className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-md p-6 space-y-4">
                        {q.context && (
                            <div className="bg-slate-50 dark:bg-zinc-800 rounded-2xl p-4 text-slate-600 dark:text-zinc-300 text-sm leading-relaxed">
                                {q.context}
                            </div>
                        )}
                        <p className="font-bold text-slate-800 dark:text-zinc-100 text-lg">{q.q}</p>
                        {q.hint && submitted && !ans?.correct && (
                            <p className="text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-xl">💡 Pista: {q.hint}</p>
                        )}
                        <div className="flex flex-wrap gap-3">
                            {q.options.map(opt => (
                                <OptionButton
                                    key={opt}
                                    label={opt}
                                    selected={sel === opt}
                                    submitted={submitted}
                                    correct={submitted && ans?.value === opt && ans.correct}
                                    onClick={() => handleSelect(q.id, opt)}
                                />
                            ))}
                        </div>
                        {!submitted ? (
                            <Button size="sm" disabled={!sel} onClick={() => handleSubmit(q.id, q.correct)}
                                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6">
                                Comprobar
                            </Button>
                        ) : (
                            <FeedbackBanner correct={ans?.correct ?? false} onRetry={() => handleRetry(q.id)} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

// ─────────────────────────────────────────────
// PILL WRAPPER
// ─────────────────────────────────────────────

const pillColors: Record<string, { header: string; badge: string; icon: string; ring: string }> = {
    orange: { header: "from-orange-500 to-amber-500", badge: "bg-orange-100 text-orange-700", icon: "text-orange-500", ring: "ring-orange-300" },
    amber: { header: "from-amber-500 to-yellow-400", badge: "bg-amber-100 text-amber-700", icon: "text-amber-500", ring: "ring-amber-300" },
    emerald: { header: "from-emerald-500 to-teal-500", badge: "bg-emerald-100 text-emerald-700", icon: "text-emerald-500", ring: "ring-emerald-300" },
    blue: { header: "from-blue-500 to-indigo-500", badge: "bg-blue-100 text-blue-700", icon: "text-blue-500", ring: "ring-blue-300" },
    violet: { header: "from-violet-500 to-purple-500", badge: "bg-violet-100 text-violet-700", icon: "text-violet-500", ring: "ring-violet-300" },
    rose: { header: "from-rose-500 to-pink-500", badge: "bg-rose-100 text-rose-700", icon: "text-rose-500", ring: "ring-rose-300" },
}

const PillWrapper = ({
    meta, status, children, stats
}: {
    meta: typeof PILL_META[0]
    status: PillStatus
    children: React.ReactNode
    stats: { correct: number; total: number }
}) => {
    const [open, setOpen] = React.useState(status === "active")
    const colors = pillColors[meta.color]
    const Icon = meta.icon

    React.useEffect(() => {
        if (status === "active") setOpen(true)
    }, [status])

    return (
        <div className={cn(
            "rounded-3xl border-2 overflow-hidden shadow-lg transition-all duration-500",
            status === "complete" ? "border-emerald-300" :
                status === "active" ? "border-slate-200 shadow-xl" : "border-slate-100 opacity-60"
        )}>
            {/* Header */}
            <button
                className={cn(
                    "w-full flex items-center justify-between p-5 text-left transition-all",
                    status === "locked" ? "cursor-not-allowed bg-slate-100 dark:bg-zinc-900" :
                        `bg-gradient-to-r ${colors.header} text-white cursor-pointer`
                )}
                onClick={() => status !== "locked" && setOpen(o => !o)}
                disabled={status === "locked"}
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg",
                        status === "locked" ? "bg-slate-200" : "bg-white/20 backdrop-blur-sm"
                    )}>
                        {status === "locked"
                            ? <Lock className="h-6 w-6 text-slate-400" />
                            : status === "complete"
                                ? <CheckCircle2 className="h-6 w-6 text-white" />
                                : <Icon className="h-6 w-6 text-white" />
                        }
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full",
                                status === "locked" ? "bg-slate-200 text-slate-500" : "bg-white/20 text-white"
                            )}>
                                Píldora {meta.id}
                            </span>
                            {status === "complete" && (
                                <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                                    ✓ Completada
                                </span>
                            )}
                        </div>
                        <h3 className={cn("font-extrabold text-lg", status === "locked" ? "text-slate-400" : "text-white")}>
                            {meta.title}
                        </h3>
                        <p className={cn("text-sm", status === "locked" ? "text-slate-400" : "text-white/80")}>
                            {meta.subtitle}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {status !== "locked" && stats.total > 0 && (
                        <span className="text-sm font-bold text-white/90 bg-white/20 px-3 py-1 rounded-full">
                            {stats.correct}/{stats.total}
                        </span>
                    )}
                    {status === "locked"
                        ? <Lock className="h-5 w-5 text-slate-400" />
                        : <ChevronDown className={cn("h-5 w-5 text-white transition-transform duration-300", open && "rotate-180")} />
                    }
                </div>
            </button>

            {/* Body */}
            {open && status !== "locked" && (
                <div className="p-6 space-y-6 bg-white dark:bg-zinc-950 animate-in slide-in-from-top-4 duration-300">
                    {children}
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────

const ProgressBar = ({ pills }: { pills: PillState[] }) => {
    const done = pills.filter(p => p.status === "complete").length
    const pct = Math.round((done / pills.length) * 100)
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm p-5 space-y-3">
            <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 dark:text-zinc-200">Tu progreso</span>
                <span className="font-bold text-blue-600">{done}/{pills.length} píldoras</span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <div className="flex gap-1.5 justify-between">
                {pills.map((p, i) => (
                    <div key={i} className={cn(
                        "flex-1 h-2 rounded-full transition-all duration-500",
                        p.status === "complete" ? "bg-emerald-400" :
                            p.status === "active" ? "bg-blue-400 animate-pulse" : "bg-slate-200 dark:bg-zinc-700"
                    )} />
                ))}
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

function buildInitialState(): PillState[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) return JSON.parse(saved)
    } catch { /* ignore */ }
    return PILL_META.map((_, i) => ({
        status: (i === 0 ? "active" : "locked") as PillStatus,
        answers: {}
    }))
}

function pillRequiredQs(pillId: number): QAItem[] {
    if (pillId === 1) return PILL1_QS
    if (pillId === 2) return PILL2_QS
    if (pillId === 3) return PILL3_QS
    if (pillId === 4) return PILL4_QS
    if (pillId === 6) return PILL6_QS
    return []
}

export default function RutaTriadaPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Ruta: La Tríada Aritmética" },
    ]

    const [pills, setPills] = React.useState<PillState[]>(() => buildInitialState())
    const [matchDone, setMatchDone] = React.useState<boolean>(() => {
        const s = pills[4]
        return s?.status === "complete"
    })

    React.useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pills)) } catch { /* ignore */ }
    }, [pills])

    const handleAnswer = (pillIdx: number, qId: string, value: string, correct: boolean) => {
        setPills(prev => {
            const next = prev.map((p, i): PillState => {
                if (i !== pillIdx) return p
                return { ...p, answers: { ...p.answers, [qId]: { value, correct } } }
            })

            // Check if pill is complete
            const pill = next[pillIdx]
            const qs = pillRequiredQs(pillIdx + 1)
            const allCorrect = qs.length === 0
                ? false
                : qs.every(q => pill.answers[q.id]?.correct)

            if (allCorrect && pill.status !== "complete") {
                next[pillIdx] = { ...next[pillIdx], status: "complete" }
                if (pillIdx + 1 < next.length) {
                    next[pillIdx + 1] = { ...next[pillIdx + 1], status: "active" }
                }
            }
            return next
        })
    }
    
    const handleRetryAnswer = (pillIdx: number, qId: string) => {
        setPills(prev => {
            const next = prev.map((p, i): PillState => {
                if (i !== pillIdx) return p
                const newAnswers = { ...p.answers }
                delete newAnswers[qId]
                return { ...p, answers: newAnswers }
            })
            return next
        })
    }

    const handleMatchComplete = () => {
        setMatchDone(true)
        setPills(prev => {
            const next = [...prev]
            next[4] = { ...next[4], status: "complete" }
            if (next[5]) next[5] = { ...next[5], status: "active" }
            return next
        })
    }

    const pillStats = (pillIdx: number) => {
        const answers = pills[pillIdx]?.answers ?? {}
        const vals = Object.values(answers)
        return {
            correct: vals.filter(a => a?.correct).length,
            total: vals.length
        }
    }

    const allComplete = pills.every(p => p.status === "complete")

    const handleReset = () => {
        const fresh = PILL_META.map((_, i) => ({
            status: (i === 0 ? "active" : "locked") as PillStatus,
            answers: {}
        }))
        setPills(fresh)
        setMatchDone(false)
        try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
    }

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Ruta de Micro-Aprendizaje: La Tríada Aritmética"
                description="Desde el crecimiento acelerado hasta las aplicaciones del mundo real. Completa cada píldora para desbloquear la siguiente."
                icon={<Star className="h-10 w-10 text-violet-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* Progress */}
                    <ProgressBar pills={pills} />

                    {/* ── PÍLDORA 1 ── */}
                    <PillWrapper meta={PILL_META[0]} status={pills[0].status} stats={pillStats(0)}>
                        <div className="space-y-2">
                            <p className="text-slate-600 dark:text-zinc-400">
                                Cuenta la leyenda que un sabio pidió como recompensa granos de trigo: <b>1 grano</b> en la primera casilla del ajedrez, el <b>doble</b> en cada casilla siguiente. El rey aceptó... sin saber que nunca podría cumplir su promesa.
                            </p>
                        </div>
                        <ChessVisual />
                        <div className="pt-2">
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300 mb-4">Ahora pon a prueba lo que observaste:</h4>
                            <QASection
                                questions={PILL1_QS}
                                pillId={1}
                                answers={pills[0].answers}
                                onAnswer={(qId, val, correct) => handleAnswer(0, qId, val, correct)}
                                onRetry={(qId) => handleRetryAnswer(0, qId)}
                            />
                        </div>
                    </PillWrapper>

                    {/* ── PÍLDORA 2 ── */}
                    <PillWrapper meta={PILL_META[1]} status={pills[1].status} stats={pillStats(1)}>
                        <p className="text-slate-600 dark:text-zinc-400">
                            Las potencias siguen reglas que permiten simplificar cálculos complejos. Dominar estas propiedades es como aprender los "atajos" del álgebra.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { rule: "aᵐ × aⁿ = aᵐ⁺ⁿ", name: "Producto – misma base", color: "bg-amber-50 border-amber-200" },
                                { rule: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ", name: "Cociente – misma base", color: "bg-orange-50 border-orange-200" },
                                { rule: "(aᵐ)ⁿ = aᵐⁿ", name: "Potencia de potencia", color: "bg-yellow-50 border-yellow-200" },
                                { rule: "a⁰ = 1", name: "Exponente cero", color: "bg-lime-50 border-lime-200" },
                            ].map(p => (
                                <div key={p.name} className={cn("rounded-2xl border-2 p-4 space-y-1", p.color)}>
                                    <p className="font-mono font-bold text-xl text-slate-800">{p.rule}</p>
                                    <p className="text-sm text-slate-600">{p.name}</p>
                                </div>
                            ))}
                        </div>
                        <QASection
                            questions={PILL2_QS}
                            pillId={2}
                            answers={pills[1].answers}
                            onAnswer={(qId, val, correct) => handleAnswer(1, qId, val, correct)}
                            onRetry={(qId) => handleRetryAnswer(1, qId)}
                        />
                    </PillWrapper>

                    {/* ── PÍLDORA 3 ── */}
                    <PillWrapper meta={PILL_META[2]} status={pills[2].status} stats={pillStats(2)}>
                        <p className="text-slate-600 dark:text-zinc-400">
                            La radicación es la operación inversa de la potenciación. Si tenemos un cuadrado de <b>196 fichas</b>, ¿cuántas forman cada lado? Eso es exactamente lo que responde la raíz cuadrada.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {[4, 5, 6].map(side => <SquareVisual key={side} side={side} />)}
                        </div>
                        <QASection
                            questions={PILL3_QS}
                            pillId={3}
                            answers={pills[2].answers}
                            onAnswer={(qId, val, correct) => handleAnswer(2, qId, val, correct)}
                            onRetry={(qId) => handleRetryAnswer(2, qId)}
                        />
                    </PillWrapper>

                    {/* ── PÍLDORA 4 ── */}
                    <PillWrapper meta={PILL_META[3]} status={pills[3].status} stats={pillStats(3)}>
                        <p className="text-slate-600 dark:text-zinc-400">
                            El logaritmo es el <b>"buscador de exponentes"</b>. Si sabemos que 2^? = 8, el logaritmo base 2 de 8 nos da la respuesta: <b>3</b>.
                        </p>
                        <BacteriaTable />
                        <QASection
                            questions={PILL4_QS}
                            pillId={4}
                            answers={pills[3].answers}
                            onAnswer={(qId, val, correct) => handleAnswer(3, qId, val, correct)}
                            onRetry={(qId) => handleRetryAnswer(3, qId)}
                        />
                    </PillWrapper>

                    {/* ── PÍLDORA 5 – MATCHING ── */}
                    <PillWrapper meta={PILL_META[4]} status={pills[4].status} stats={{ correct: matchDone ? 6 : 0, total: 6 }}>
                        <p className="text-slate-600 dark:text-zinc-400">
                            Potenciación, radicación y logaritmación son <b>tres formas de expresar la misma relación</b>. Conecta las expresiones equivalentes para dominar la tríada.
                        </p>
                        {matchDone ? (
                            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center space-y-2">
                                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                                <p className="font-bold text-emerald-800 text-lg">¡Dominio: conectaste todos los pares!</p>
                            </div>
                        ) : (
                            <MatchingGame onComplete={handleMatchComplete} />
                        )}
                    </PillWrapper>

                    {/* ── PÍLDORA 6 – APLICACIONES ── */}
                    <PillWrapper meta={PILL_META[5]} status={pills[5].status} stats={pillStats(5)}>
                        <p className="text-slate-600 dark:text-zinc-400">
                            Los logaritmos y las potencias están en todas partes: en la escala de terremotos, el sonido, la química y las redes sociales. Aplica lo que aprendiste en situaciones reales.
                        </p>
                        <QASection
                            questions={PILL6_QS}
                            pillId={6}
                            answers={pills[5].answers}
                            onAnswer={(qId, val, correct) => handleAnswer(5, qId, val, correct)}
                            onRetry={(qId) => handleRetryAnswer(5, qId)}
                        />
                    </PillWrapper>

                    {/* FINAL CELEBRATION */}
                    {allComplete && (
                        <div className="py-8 animate-in zoom-in-95 duration-700">
                            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-10 text-white text-center space-y-6 shadow-2xl shadow-violet-200 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10">
                                    {[...Array(20)].map((_, i) => (
                                        <Star key={i} className="absolute text-yellow-300"
                                            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${12 + Math.random() * 20}px`, opacity: Math.random() }}
                                        />
                                    ))}
                                </div>
                                <div className="relative">
                                    <div className="absolute -inset-4 rounded-full bg-yellow-400/20 animate-ping" />
                                    <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl relative">
                                        <Trophy className="h-12 w-12 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-extrabold">¡Ruta Completada!</h2>
                                    <p className="text-violet-200 text-xl">Has dominado la Tríada Aritmética: Potenciación, Radicación y Logaritmación.</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4 pt-4">
                                    <Button size="lg" variant="outline" onClick={handleReset}
                                        className="rounded-full px-8 border-white/40 text-white hover:bg-white/10">
                                        <RotateCcw className="h-4 w-4 mr-2" /> Reiniciar ruta
                                    </Button>
                                    <Button size="lg" asChild className="rounded-full px-8 bg-white text-violet-700 hover:bg-violet-50 font-bold shadow-lg">
                                        <a href="/matematicas-7">Volver a Matemáticas 7</a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {!allComplete && (
                        <div className="flex justify-center pb-4">
                            <Button variant="outline" size="sm" onClick={handleReset}
                                className="rounded-full text-slate-500 border-slate-200 hover:border-rose-300 hover:text-rose-500">
                                <RotateCcw className="h-3 w-3 mr-1" /> Reiniciar progreso
                            </Button>
                        </div>
                    )}
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
