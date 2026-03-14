"use client"

import React, { useState } from 'react'
import { Plus, Play, RotateCcw } from 'lucide-react'
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

export function LogProductPropertyVisual() {
    const [step, setStep] = useState(0)

    const handleNext = () => {
        if (step < 2) setStep(step + 1)
        else setStep(0)
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-blue-50 dark:border-zinc-800">
                {/* Formula Display */}
                <div className="flex flex-col items-center justify-center py-6 border-b border-slate-100 dark:border-zinc-800 mb-6">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Fórmula</span>
                    <div className="text-3xl md:text-4xl font-black text-slate-800 dark:text-zinc-200">
                        <Math math="\log_b(m \times n) = \log_b m + \log_b n" block />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Example 1 */}
                    <div className={cn("space-y-4 transition-all duration-500", step >= 1 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Ejemplo con base 2</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-blue-600 dark:text-blue-400 font-bold"><Math math="\log_2(4 \times 8)" /></p>
                            <p className="text-slate-400"><Math math="\log_2(4) + \log_2(8)" /></p>
                            <p className="text-slate-400">2 + 3</p>
                            <p className="text-emerald-600 font-black text-lg">= 5</p>
                        </div>
                    </div>

                    {/* Example 2 */}
                    <div className={cn("space-y-4 transition-all duration-500 delay-100", step >= 2 ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2")}>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                            <h4 className="font-bold text-slate-700 dark:text-zinc-300">Ejemplo con base 3</h4>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl font-mono text-sm space-y-2">
                            <p className="text-blue-600 dark:text-blue-400 font-bold"><Math math="\log_3(9 \times 27)" /></p>
                            <p className="text-slate-400"><Math math="\log_3(9) + \log_3(27)" /></p>
                            <p className="text-slate-400">2 + 3</p>
                            <p className="text-emerald-600 font-black text-lg">= 5</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <p className="text-slate-600 dark:text-zinc-400 text-center font-medium max-w-lg">
                    {step === 0 && "El logaritmo de un producto es igual a la suma de los logaritmos de los factores."}
                    {step === 1 && (
                        <span>En el primer ejemplo: <Math math="\log_2(32)" /> es igual a <Math math="\log_2(4) + \log_2(8) = 2 + 3 = 5" />.</span>
                    )}
                    {step === 2 && (
                        <span>En el segundo ejemplo: <Math math="\log_3(243)" /> es igual a <Math math="\log_3(9) + \log_3(27) = 2 + 3 = 5" />.</span>
                    )}
                </p>
                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                >
                    {step === 2 ? <><RotateCcw className="h-5 w-5" /> Reiniciar</> : <><Play className="h-5 w-5" /> Ver ejemplo {step + 1}</>}
                </button>
            </div>
        </div>
    )
}
