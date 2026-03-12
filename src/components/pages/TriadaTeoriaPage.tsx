"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { 
    Zap, 
    Grid3x3, 
    Search, 
    ArrowRightLeft, 
    Play, 
    Info, 
    Layers,
    Calculator
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────
// COMPARISON COMPONENT
// ─────────────────────────────────────────────

const TriadComparison = () => {
    const [hoveredTerm, setHoveredTerm] = React.useState<string | null>(null)

    // Terms: 'base' (a), 'exponent' (m), 'result' (b)
    const getHighlightClass = (term: string) => {
        if (!hoveredTerm) return ""
        return hoveredTerm === term ? "bg-yellow-400/30 ring-2 ring-yellow-400 scale-105" : "opacity-40 blur-[1px]"
    }

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-zinc-800">
                {/* Potenciación */}
                <div className="p-8 space-y-6 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-xl">
                            <Zap className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Potenciación</h3>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl h-40">
                        <div className="text-4xl font-mono relative">
                            <span 
                                onMouseEnter={() => setHoveredTerm('base')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help", getHighlightClass('base'))}
                            >2</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('exponent')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help text-2xl -top-4 relative", getHighlightClass('exponent'))}
                            >3</span>
                            <span className="mx-2">=</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('result')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help", getHighlightClass('result'))}
                            >8</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-500 font-medium">"2 elevado a la 3 es 8"</p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/30">
                            <p className="text-xs font-bold text-orange-600 uppercase mb-1">¿Qué buscamos?</p>
                            <p className="text-sm text-slate-700 dark:text-zinc-300">El <b>resultado total</b> después de aplicar los pasos multiplicativos.</p>
                        </div>
                        <div className="text-sm space-y-2">
                            <p><b className="text-slate-400">Base (2):</b> El factor que se repite.</p>
                            <p><b className="text-slate-400">Exponente (3):</b> Los <b>pasos multiplicativos</b>.</p>
                        </div>
                    </div>
                </div>

                {/* Radicación */}
                <div className="p-8 space-y-6 bg-emerald-50/20">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-xl">
                            <Grid3x3 className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Radicación</h3>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl h-40">
                        <div className="text-4xl font-mono relative">
                            <span 
                                onMouseEnter={() => setHoveredTerm('exponent')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help text-lg relative top-[-10px] left-[15px]", getHighlightClass('exponent'))}
                            >3</span>
                            <span className="text-5xl">√</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('result')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help border-t-2 border-slate-800 dark:border-white", getHighlightClass('result'))}
                            >8</span>
                            <span className="mx-2">=</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('base')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help", getHighlightClass('base'))}
                            >2</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-500 font-medium">"Raíz cúbica de 8 es 2"</p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                            <p className="text-xs font-bold text-emerald-600 uppercase mb-1">¿Qué buscamos?</p>
                            <p className="text-sm text-slate-700 dark:text-zinc-300">La <b>base</b> (o factor) que se usó en los pasos multiplicativos.</p>
                        </div>
                        <div className="text-sm space-y-2">
                            <p><b className="text-slate-400">Índice (3):</b> Los <b>pasos multiplicativos</b>.</p>
                            <p><b className="text-slate-400">Radicando (8):</b> El resultado conocido.</p>
                        </div>
                    </div>
                </div>

                {/* Logaritmación */}
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-xl">
                            <Search className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Logaritmación</h3>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl h-40">
                        <div className="text-4xl font-mono relative">
                            <span>log</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('base')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-0.5 rounded transition-all cursor-help text-xl align-sub", getHighlightClass('base'))}
                            >2</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('result')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help mx-1", getHighlightClass('result'))}
                            >8</span>
                            <span className="mx-2">=</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('exponent')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help", getHighlightClass('exponent'))}
                            >3</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-500 font-medium">"Logaritmo en base 2 de 8 es 3"</p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <p className="text-xs font-bold text-blue-600 uppercase mb-1">¿Qué buscamos?</p>
                            <p className="text-sm text-slate-700 dark:text-zinc-300">El número de <b>pasos multiplicativos</b> para llegar al resultado.</p>
                        </div>
                        <div className="text-sm space-y-2">
                            <p><b className="text-slate-400">Base (2):</b> El factor conocido.</p>
                            <p><b className="text-slate-400">Argumento (8):</b> El resultado conocido.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 text-center">
                <p className="text-xs text-slate-500 font-medium">✨ Pasa el mouse sobre los números para ver cómo se relacionan entre sí</p>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
// REAL WORLD CARDS
// ─────────────────────────────────────────────

const RealLifeExamples = () => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="group bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-4 mb-4">
                    <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Layers className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white">Crecimiento Celular</h4>
                        <p className="text-sm text-slate-500">Un ejemplo de Potenciación</p>
                    </div>
                </div>
                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    Una célula se divide en 2 cada hora. En 5 horas (5 pasos multiplicativos), ¿cuántas células habrá?
                </p>
                <div className="bg-slate-50 dark:bg-zinc-800 p-3 rounded-xl font-mono text-center text-orange-600 font-bold">
                    2⁵ = 32 células
                </div>
            </div>

            <div className="group bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-4 mb-4">
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Calculator className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white">Escala Richter</h4>
                        <p className="text-sm text-slate-500">Un ejemplo de Logaritmación</p>
                    </div>
                </div>
                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    Si un terremoto libera 100,000 unidades de energía (base 10), ¿qué magnitud Richter representa? Buscamos los pasos multiplicativos.
                </p>
                <div className="bg-slate-50 dark:bg-zinc-800 p-3 rounded-xl font-mono text-center text-blue-600 font-bold">
                    log₁₀(100,000) = 5
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function TriadaTeoriaPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "La Tríada Aritmética" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="La Tríada Aritmética"
                description="Entiende la conexión profunda entre Potenciación, Radicación y Logaritmación como tres caras de una misma moneda."
                icon={<ArrowRightLeft className="h-10 w-10 text-indigo-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* SECTION 1: THE CONCEPT */}
                    <section className="space-y-6">
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden">
                            <div className="absolute top-[-20px] right-[-20px] opacity-10">
                                <ArrowRightLeft className="h-64 w-64 text-indigo-900" />
                            </div>
                            <div className="relative z-10 max-w-2xl space-y-4">
                                <h2 className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-200">Una Misma Relación, Tres Preguntas</h2>
                                <p className="text-lg text-indigo-800/80 dark:text-indigo-300 leading-relaxed">
                                    En matemáticas, estas tres operaciones no son independientes. Son formas distintas de relacionar los mismos tres elementos: la <b>base</b>, los <b>pasos multiplicativos</b> y el <b>resultado</b>.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: THE COMPARISON TABLE */}
                    <section className="space-y-8">
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 italic">"¿Qué es lo que no conozco?"</h3>
                            <p className="text-slate-500">Dependiendo de lo que queramos encontrar, usamos una operación u otra.</p>
                        </div>
                        
                        <TriadComparison />
                    </section>

                    {/* SECTION 3: VIDEO EXPLANATION */}
                    <section className="space-y-6 bg-slate-900 rounded-[2.5rem] p-4 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <Play className="h-40 w-40" />
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-red-500/30">
                                    <Play className="h-3 w-3 fill-current" /> Video Explicativo
                                </div>
                                <h3 className="text-4xl font-extrabold leading-tight">¿Qué es realmente un Logaritmo?</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Los logaritmos a menudo se sienten extraños, pero son simplemente el mecanismo para <b>contar cuántas veces</b> hemos multiplicado un número para llegar a otro.
                                </p>
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <Info className="h-6 w-6 text-indigo-400 shrink-0" />
                                    <p className="text-sm text-slate-300">
                                        Mira cómo Math Antics explica la logaritmación como el proceso de encontrar cuántos <b>pasos multiplicativos</b> se han dado en una escala.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 ring-1 ring-white/20">
                                <iframe 
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/W_BZb_va6jY" 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: REAL LIFE APPLICATIONS */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">La Tríada en la Vida Real</h3>
                        </div>
                        <RealLifeExamples />
                    </section>
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
