"use client"

import React, { useState } from 'react'
import { Circle, Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"
import katex from 'katex'
import 'katex/dist/katex.min.css'

function Math({ math, block }: { math: string; block?: boolean }) {
    const html = katex.renderToString(math, {
        throwOnError: false,
        displayMode: block
    })
    return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export function LogUnityPropertyVisual() {
    const [step, setStep] = useState(0)

    const handleNext = () => {
        if (step < 2) setStep(step + 1)
        else setStep(0)
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-50/50 dark:bg-zinc-900/10 rounded-3xl border border-slate-100 dark:border-zinc-800">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-50 dark:border-zinc-800">
                {/* Formula Display */}
                <div className="flex flex-col items-center justify-center py-6 border-b border-slate-100 dark:border-zinc-800 mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Fórmula</span>
                    <div className="text-3xl md:text-4xl font-black text-slate-800 dark:text-zinc-200">
                        <Math math="\log_b(1) = 0" block />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Example 1 */}
                    <div className={cn("space-y-4 transition-all duration-500", step >= 1 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-600 text-white text-xs flex items-center justify-center font-bold">1</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Base 2</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-slate-600 dark:text-slate-400 font-bold"><Math math="\log_2(1)" /></p>
                            <p className="text-slate-400">¿Cuántas veces es 2 para llegar a 1?</p>
                            <p className="text-blue-600 font-black text-lg">= 0</p>
                        </div>
                    </div>

                    {/* Example 2 */}
                    <div className={cn("space-y-4 transition-all duration-500 delay-100", step >= 2 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Cualquier base "a"</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-slate-600 dark:text-slate-400 font-bold"><Math math="\log_a(1)" /></p>
                            <p className="text-slate-400">Como <Math math="a^0 = 1" /></p>
                            <p className="text-blue-600 font-black text-lg">= 0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <p className="text-slate-600 dark:text-zinc-400 text-center font-medium max-w-lg">
                    {step === 0 && "El logaritmo de 1 en cualquier base es siempre 0."}
                    {step === 1 && "Esto es porque necesitamos 'cero multiplicaciones' de la base para obtener 1 (identidad de potencia cero)."}
                    {step === 2 && "¡Es una regla universal de los logaritmos! log de 1 es cero."}
                </p>
                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-600 text-white rounded-full font-bold hover:bg-slate-700 transition-all shadow-lg active:scale-95"
                >
                    {step === 2 ? <><RotateCcw className="h-5 w-5" /> Reiniciar</> : <><Play className="h-5 w-5" /> Ver ejemplo {step + 1}</>}
                </button>
            </div>
        </div>
    )
}
