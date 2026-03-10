"use client"

import React, { useState } from 'react'
import { Minus, Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function LogQuotientPropertyVisual() {
    const [step, setStep] = useState(0)

    const handleNext = () => {
        if (step < 2) setStep(step + 1)
        else setStep(0)
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-purple-50/50 dark:bg-purple-900/10 rounded-3xl border border-purple-100 dark:border-purple-900/30">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-purple-50 dark:border-zinc-800">
                {/* Formula Display */}
                <div className="flex flex-col items-center justify-center py-6 border-b border-slate-100 dark:border-zinc-800 mb-6">
                    <span className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-2">Fórmula</span>
                    <div className="text-3xl md:text-4xl font-black text-slate-800 dark:text-zinc-200 flex items-center gap-4">
                        log<tspan className="text-xl">b</tspan>(m / n) = log<tspan className="text-xl">b</tspan>m - log<tspan className="text-xl">b</tspan>n
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Example 1 */}
                    <div className={cn("space-y-4 transition-all duration-500", step >= 1 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">1</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Ejemplo con base 2</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-purple-600 dark:text-purple-400 font-bold">log₂(16 / 4)</p>
                            <p className="text-slate-400">log₂(16) - log₂(4)</p>
                            <p className="text-slate-400">4 - 2</p>
                            <p className="text-emerald-600 font-black text-lg">= 2</p>
                        </div>
                    </div>

                    {/* Example 2 */}
                    <div className={cn("space-y-4 transition-all duration-500 delay-100", step >= 2 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Ejemplo con base 5</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-purple-600 dark:text-purple-400 font-bold">log₅(125 / 25)</p>
                            <p className="text-slate-400">log₅(125) - log₅(25)</p>
                            <p className="text-slate-400">3 - 2</p>
                            <p className="text-emerald-600 font-black text-lg">= 1</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <p className="text-slate-600 dark:text-zinc-400 text-center font-medium max-w-lg">
                    {step === 0 && "El logaritmo de un cociente es igual a la resta del logaritmo del dividendo menos el logaritmo del divisor."}
                    {step === 1 && "Dividir se convierte en restar exponentes: log₂(4) = 2."}
                    {step === 2 && "Para la base 5: log₅(5) = 1. Sustraer los pasos es quitarle factores."}
                </p>
                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-all shadow-lg active:scale-95"
                >
                    {step === 2 ? <><RotateCcw className="h-5 w-5" /> Reiniciar</> : <><Play className="h-5 w-5" /> Ver ejemplo {step + 1}</>}
                </button>
            </div>
        </div>
    )
}
