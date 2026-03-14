"use client"

import React, { useState } from 'react'
import { Hash, Play, RotateCcw } from 'lucide-react'
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

export function LogPowerPropertyVisual() {
    const [step, setStep] = useState(0)

    const handleNext = () => {
        if (step < 2) setStep(step + 1)
        else setStep(0)
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-orange-50/50 dark:bg-orange-900/10 rounded-3xl border border-orange-100 dark:border-orange-900/30">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-orange-50 dark:border-zinc-800">
                {/* Formula Display */}
                <div className="flex flex-col items-center justify-center py-6 border-b border-slate-100 dark:border-zinc-800 mb-6">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">Fórmula</span>
                    <div className="text-3xl md:text-4xl font-black text-slate-800 dark:text-zinc-200">
                        <Math math="\log_b(m^n) = n \times \log_b m" block />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Example 1 */}
                    <div className={cn("space-y-4 transition-all duration-500", step >= 1 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">1</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Ejemplo con base 2</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-orange-600 dark:text-orange-400 font-bold"><Math math="\log_2(4^3)" /></p>
                            <p className="text-slate-400"><Math math="3 \times \log_2(4)" /></p>
                            <p className="text-slate-400">3 \times 2</p>
                            <p className="text-emerald-600 font-black text-lg">= 6</p>
                        </div>
                    </div>

                    {/* Example 2 */}
                    <div className={cn("space-y-4 transition-all duration-500 delay-100", step >= 2 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Ejemplo con base 3</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-orange-600 dark:text-orange-400 font-bold"><Math math="\log_3(9^2)" /></p>
                            <p className="text-slate-400"><Math math="2 \times \log_3(9)" /></p>
                            <p className="text-slate-400">2 \times 2</p>
                            <p className="text-emerald-600 font-black text-lg">= 4</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <p className="text-slate-600 dark:text-zinc-400 text-center font-medium max-w-lg">
                    {step === 0 && "El logaritmo de una potencia es igual al exponente multiplicado por el logaritmo de la base."}
                    {step === 1 && (
                        <span>El exponente 3 'baja' a multiplicar al resultado de <Math math="\log_2(4)" />.</span>
                    )}
                    {step === 2 && "¡Así de fácil! El exponente se convierte en un multiplicador fuera del logaritmo."}
                </p>
                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg active:scale-95"
                >
                    {step === 2 ? <><RotateCcw className="h-5 w-5" /> Reiniciar</> : <><Play className="h-5 w-5" /> Ver ejemplo {step + 1}</>}
                </button>
            </div>
        </div>
    )
}
