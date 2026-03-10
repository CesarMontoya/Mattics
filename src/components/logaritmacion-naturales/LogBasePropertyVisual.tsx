"use client"

import React, { useState } from 'react'
import { Anchor, Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function LogBasePropertyVisual() {
    const [step, setStep] = useState(0)

    const handleNext = () => {
        if (step < 2) setStep(step + 1)
        else setStep(0)
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-emerald-50 dark:border-zinc-800">
                {/* Formula Display */}
                <div className="flex flex-col items-center justify-center py-6 border-b border-slate-100 dark:border-zinc-800 mb-6">
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Fórmula</span>
                    <div className="text-3xl md:text-4xl font-black text-slate-800 dark:text-zinc-200 flex items-center gap-4">
                        log<tspan className="text-xl">b</tspan>(b) = 1
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Example 1 */}
                    <div className={cn("space-y-4 transition-all duration-500", step >= 1 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Base 10</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-emerald-600 dark:text-emerald-400 font-bold">log₁₀(10)</p>
                            <p className="text-slate-400">¿Cuántas veces es 10 para llegar a 10?</p>
                            <p className="text-emerald-600 font-black text-lg">= 1</p>
                        </div>
                    </div>

                    {/* Example 2 */}
                    <div className={cn("space-y-4 transition-all duration-500 delay-100", step >= 2 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Base 7</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-emerald-600 dark:text-emerald-400 font-bold">log₇(7)</p>
                            <p className="text-slate-400">¿Cuántas veces es 7 para llegar a 7?</p>
                            <p className="text-emerald-600 font-black text-lg">= 1</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <p className="text-slate-600 dark:text-zinc-400 text-center font-medium max-w-lg">
                    {step === 0 && "El logaritmo de la base siempre es 1, porque cualquier número elevado a 1 es el mismo número."}
                    {step === 1 && "Se necesita exactamente un paso (el mismo número) para llegar al valor de la base."}
                    {step === 2 && "No importa qué base sea, si el número es igual a la base, el resultado es 1."}
                </p>
                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
                >
                    {step === 2 ? <><RotateCcw className="h-5 w-5" /> Reiniciar</> : <><Play className="h-5 w-5" /> Ver ejemplo {step + 1}</>}
                </button>
            </div>
        </div>
    )
}
