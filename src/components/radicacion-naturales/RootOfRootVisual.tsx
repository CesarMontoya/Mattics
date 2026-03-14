"use client"

import React, { useState } from 'react'
import { Play, RotateCcw, ArrowDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Math } from "@/components/ui/math"

export function RootOfRootVisual() {
    const [activeExample, setActiveExample] = useState<1 | 2>(1)
    const [step, setStep] = useState(0)

    // Example 1: √(√16) = ⁴√16
    const ex1 = { radicand: 16, innerIndex: 2, outerIndex: 2, finalIndex: 4, result: 2 }
    // Example 2: ³√(√64) = ⁶√64
    const ex2 = { radicand: 64, innerIndex: 2, outerIndex: 3, finalIndex: 6, result: 2 }
    
    const ex = activeExample === 1 ? ex1 : ex2

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1)
        } else {
            setStep(0)
        }
    }

    const switchExample = (exNum: 1 | 2) => {
        setActiveExample(exNum)
        setStep(0)
    }

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            {/* Example switcher */}
            <div className="flex gap-3 justify-center">
                <button
                    onClick={() => switchExample(1)}
                    className={cn(
                        "px-6 py-2 rounded-full font-bold transition-all",
                        activeExample === 1
                            ? "bg-purple-600 text-white"
                            : "bg-slate-200 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                    )}
                >
                    Ejemplo 1
                </button>
                <button
                    onClick={() => switchExample(2)}
                    className={cn(
                        "px-6 py-2 rounded-full font-bold transition-all",
                        activeExample === 2
                            ? "bg-purple-600 text-white"
                            : "bg-slate-200 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                    )}
                >
                    Ejemplo 2
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                {/* Visualizador */}
                <div className="lg:col-span-3 relative w-full min-h-[300px] flex flex-col items-center justify-start gap-4 py-4">
                    {/* Step 0: Show nested radicals */}
                    {step >= 0 && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-500 flex justify-center items-center w-full">
                            <div className="text-5xl md:text-6xl text-purple-600 dark:text-purple-400 font-black">
                                <Math math={`\\sqrt${ex.outerIndex > 2 ? `[${ex.outerIndex}]` : ''}{\\sqrt{${ex.radicand}}}`} />
                            </div>
                        </div>
                    )}

                    {/* Step 1: Show multiplication of indices */}
                    {step >= 1 && (
                        <>
                            <div className="text-slate-300 dark:text-zinc-600 animate-in fade-in zoom-in duration-300">
                                <ArrowDown className="w-8 h-8" />
                            </div>
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500 flex flex-col justify-center items-center w-full gap-2 px-6 py-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 font-bold">
                                <div className="text-2xl font-bold text-slate-600 dark:text-zinc-400">
                                    Índices: <Math math={`${ex.outerIndex} \\times ${ex.innerIndex}`} />
                                </div>
                                <div className="text-4xl font-black">
                                    <Math math={`= ${ex.finalIndex}`} />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 2: Show simplified radical */}
                    {step >= 2 && (
                        <>
                            <div className="text-slate-300 dark:text-zinc-600 animate-in fade-in zoom-in duration-300">
                                <ArrowDown className="w-8 h-8" />
                            </div>
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500 flex justify-center items-center w-full">
                                <div className="text-6xl md:text-7xl text-purple-600 dark:text-purple-400 font-black">
                                    <Math math={`\\sqrt[${ex.finalIndex}]{${ex.radicand}}`} />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 3: Show final result */}
                    {step >= 3 && (
                        <>
                            <div className="text-slate-300 dark:text-zinc-600 animate-in fade-in zoom-in duration-300">
                                <ArrowDown className="w-8 h-8" />
                            </div>
                            <div className="animate-in fade-in slide-in-from-top-4 duration-700 flex flex-col justify-center items-center w-full">
                                <div className="text-5xl md:text-6xl px-8 py-2 bg-purple-100 dark:bg-purple-900/40 rounded-3xl border-4 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 font-black mb-2">
                                    = {ex.result}
                                </div>
                                <span className="text-sm md:text-base font-semibold text-emerald-600 dark:text-emerald-400">
                                    ✓ Raíz de raíz = multiplicamos los índices
                                </span>
                            </div>
                        </>
                    )}
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-1">Propiedad</h4>
                    <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        <Math math="\sqrt[m]{\sqrt[n]{a}} = \sqrt[m \times n]{a}" />
                    </div>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `Cuando tenemos raíces anidadas, podemos simplificarlas`}
                    {step === 1 && `Multiplicamos los índices: ${ex.outerIndex} × ${ex.innerIndex} = ${ex.finalIndex}`}
                    {step === 2 && `La raíz ${ex.finalIndex === 4 ? 'cuarta' : 'sexta'} de ${ex.radicand} es más simple de expresar`}
                    {step === 3 && `El resultado final es ${ex.result}`}
                </p>
                <button
                    onClick={handleNext}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95",
                        step === 3
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-none hover:bg-purple-700"
                    )}
                >
                    {step === 3 ? (
                        <><RotateCcw className="h-5 w-5" /> Reiniciar</>
                    ) : (
                        <><Play className="h-5 w-5" /> Siguiente</>
                    )}
                </button>
            </div>
        </div>
    )
}
