"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { Button } from "@/components/ui/sidebar/button"
import { Input } from "@/components/ui/sidebar/input"
import { CheckCircle2, XCircle, Lightbulb, Trophy, ArrowRight, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Local UI Components (Since shadcn components are limited in this project) ---

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("rounded-xl border border-border/50 bg-card shadow-sm transition-all duration-300", className)}>
        {children}
    </div>
)

const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
        {children}
    </div>
)

const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("p-6 pt-0", className)}>
        {children}
    </div>
)

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
        {children}
    </div>
)

// --- Types for exercises ---
type Exercise = {
    id: number
    level: "Básico" | "Intermedio" | "Avanzado" | "Desafío"
    question: React.ReactNode
    correctAnswer: string
    hint?: string
}

export default function ActividadAdicionNaturalesPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Adición de Números Naturales", href: "/matematicas-7/adicion-naturales" },
        { label: "Actividad de Práctica" },
    ]

    const [answers, setAnswers] = React.useState<Record<number, string>>({})
    const [results, setResults] = React.useState<Record<number, boolean | null>>({})

    const exercises: Exercise[] = [
        // NIVEL 1: Identificación Visual (Basado en la imagen)
        {
            id: 1,
            level: "Básico",
            question: (
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-zinc-400">Cada círculo azul representa <b>1 unidad</b>. ¿Cuál es el valor total mostrado?</p>
                    <div className="grid grid-cols-6 gap-2 p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl w-fit">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-4 h-4 rounded-full bg-blue-500 shadow-sm shadow-blue-200" />
                        ))}
                    </div>
                </div>
            ),
            correctAnswer: "12",
            hint: "Cuenta cada círculo azul uno por uno."
        },
        {
            id: 2,
            level: "Básico",
            question: (
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-zinc-400">Cada cuadrado verde representa <b>1 decena</b> y cada círculo <b>1 unidad</b>. ¿Cuál es el valor total?</p>
                    <div className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl">
                        <div className="grid grid-cols-2 gap-1">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-8 h-4 bg-emerald-500 rounded-sm" />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-4 h-4 rounded-full bg-blue-500" />
                            ))}
                        </div>
                    </div>
                </div>
            ),
            correctAnswer: "44",
            hint: "Recuerda que cada decena vale 10. 4 decenas son 40."
        },
        // NIVEL 2: Composición y Regrupamiento
        {
            id: 3,
            level: "Intermedio",
            question: (
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-zinc-400">Observa los elementos y clasifícalos. ¿Cuál es el número total?</p>
                    <div className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl">
                        <div className="flex gap-2">
                            <div className="w-12 h-12 bg-orange-500 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">100</div>
                            <div className="w-12 h-12 bg-orange-500 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">100</div>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                            {[...Array(8)].map((_, i) => <div key={i} className="w-6 h-3 bg-emerald-500 rounded-sm" />)}
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                            {[...Array(8)].map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-blue-500" />)}
                        </div>
                    </div>
                </div>
            ),
            correctAnswer: "288",
            hint: "Suma: 2 centenas + 8 decenas + 8 unidades."
        },
        {
            id: 4,
            level: "Intermedio",
            question: (
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">¿Cuál es el resultado final de agrupar: <br/><b className="text-indigo-600 dark:text-indigo-400">7 centenas, 30 decenas y 18 unidades</b>?</p>
                </div>
            ),
            correctAnswer: "1018",
            hint: "Convierte 30 decenas a centenas (300) y 18 unidades (18). 700 + 300 + 18 = ?"
        },
        // NIVEL 3: Razonamiento Matemático
        {
            id: 5,
            level: "Avanzado",
            question: (
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                        En una campaña de reciclaje, el 7mo grado recolectó:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li><span className="font-bold text-orange-600">9 centenas</span> de botellas</li>
                            <li><span className="font-bold text-emerald-600">75 decenas</span> de latas</li>
                            <li><span className="font-bold text-blue-600">154 unidades</span> de tapitas</li>
                        </ul>
                        ¿Cuántos elementos recolectaron en total?
                    </p>
                </div>
            ),
            correctAnswer: "1804",
            hint: "900 + 750 + 154 = ?"
        },
        {
            id: 6,
            level: "Desafío",
            question: (
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                        Un tren transporta <b>3 unidades de mil</b> pasajeros al inicio. <br/>
                        En la siguiente estación suben <b>14 centenas</b> y en la otra <b>85 decenas</b>. <br/>
                        Si luego bajan 200 personas y suben 350 más, ¿cuántos pasajeros tiene el tren ahora?
                    </p>
                </div>
            ),
            correctAnswer: "5400",
            hint: "Total = (3000 + 1400 + 850) - 200 + 350"
        }
    ]

    const handleCheck = (id: number) => {
        const isCorrect = answers[id]?.trim() === exercises.find(e => e.id === id)?.correctAnswer
        setResults((prev) => ({ ...prev, [id]: isCorrect }))
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Básico": return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
            case "Intermedio": return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300"
            case "Avanzado": return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300"
            case "Desafío": return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
            default: return "bg-slate-100 text-slate-700"
        }
    }

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Actividad: Adición de Números Naturales"
                description="Pon a prueba tus conocimientos y sube de nivel con estos desafíos matemáticos."
                icon={<Trophy className="h-10 w-10 text-amber-500" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    <section className="space-y-8">
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4 mb-8">
                            <Lightbulb className="h-8 w-8 text-amber-500 shrink-0" />
                            <div>
                                <h3 className="font-bold text-amber-900 dark:text-amber-100">Instrucciones</h3>
                                <p className="text-amber-800 dark:text-amber-200 text-sm">
                                    Resuelve cada ejercicio y escribe tu respuesta en el cuadro. Los desafíos van aumentando de dificultad. ¡Tú puedes lograrlo!
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                            {exercises.map((ex) => (
                                <Card key={ex.id} className={cn(
                                    "overflow-hidden border-2",
                                    results[ex.id] === true ? "border-emerald-500/50 bg-emerald-50/10" : 
                                    results[ex.id] === false ? "border-red-500/50 bg-red-50/10" : "border-slate-100 dark:border-zinc-800"
                                )}>
                                    <CardHeader className="pb-3 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
                                        <div className="flex justify-between items-center">
                                            <Badge className={getLevelColor(ex.level)}>
                                                {ex.level}
                                            </Badge>
                                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">EJERCICIO #{ex.id}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-6">
                                        <div className="min-h-[100px] flex flex-col justify-center">
                                            {ex.question}
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <Input 
                                                    type="text" 
                                                    placeholder="Escribe tu respuesta..." 
                                                    className="font-mono text-lg bg-white dark:bg-zinc-900"
                                                    value={answers[ex.id] || ""}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswers({ ...answers, [ex.id]: e.target.value })}
                                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleCheck(ex.id)}
                                                />
                                                <Button 
                                                    onClick={() => handleCheck(ex.id)}
                                                    className={cn(
                                                        "font-bold transition-all",
                                                        results[ex.id] === true ? "bg-emerald-600 hover:bg-emerald-700" : ""
                                                    )}
                                                >
                                                    {results[ex.id] === true ? <CheckCircle2 className="h-4 w-4" /> : "Revisar"}
                                                </Button>
                                            </div>

                                            {results[ex.id] === false && (
                                                <div className="flex flex-col gap-1 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg animate-in slide-in-from-top-1">
                                                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-bold">
                                                        <XCircle className="h-4 w-4" />
                                                        <span>¡Sigue intentando!</span>
                                                    </div>
                                                    {ex.hint && (
                                                        <p className="text-slate-500 dark:text-zinc-400 text-xs italic ml-6">Pista: {ex.hint}</p>
                                                    )}
                                                </div>
                                            )}
                                            {results[ex.id] === true && (
                                                <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400 text-sm font-bold animate-in zoom-in-95">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    <span>¡Excelente trabajo! ¡Nivel superado!</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Banner Final */}
                        <div className="mt-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white text-center space-y-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Trophy className="h-32 w-32" />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold">¿Listo para más desafíos?</h2>
                                <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
                                    Has completado el entrenamiento de hoy. Tu capacidad de razonamiento matemático crece con cada ejercicio.
                                </p>
                                <div className="pt-6 flex flex-wrap justify-center gap-4">
                                    <Button variant="secondary" size="lg" asChild className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
                                        <a href="/matematicas-7/adicion-naturales">
                                            <BookOpen className="mr-2 h-5 w-5" />
                                            Repasar Teoría
                                        </a>
                                    </Button>
                                    <Button className="bg-white text-indigo-600 hover:bg-indigo-50" size="lg" asChild>
                                        <a href="/matematicas-7">
                                            Volver al Inicio
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </a>
                                    </Button>
                                    <Button variant="secondary" size="lg" className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold border-none" onClick={() => window.print()}>
                                        Imprimir Ejercicios
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
