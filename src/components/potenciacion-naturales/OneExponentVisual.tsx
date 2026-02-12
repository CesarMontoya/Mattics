"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function OneExponentVisual() {
    const [activeExample, setActiveExample] = useState<1 | 2>(1)
    const [step, setStep] = useState(0)

    // Example 1: 7¹ = 7
    const ex1 = { base: 7 }
    // Example 2: 25¹ = 25
    const ex2 = { base: 25 }
    
    const ex = activeExample === 1 ? ex1 : ex2

    const handleNext = () => {
        if (step < 2) {
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
                            ? "bg-orange-600 text-white"
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
                            ? "bg-orange-600 text-white"
                            : "bg-slate-200 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                    )}
                >
                    Ejemplo 2
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                {/* Visualizador SVG */}
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[280px]">
                    <svg
                        viewBox="0 0 600 280"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Step 0: Show original expression */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                <text
                                    x={300}
                                    y={140}
                                    textAnchor="middle"
                                    className="text-6xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.base}
                                    <tspan className="text-4xl" dy="-30" dx="5">1</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show expansion */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = {ex.base}
                                </text>
                                <text
                                    x={300}
                                    y={170}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-slate-500 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    (un solo factor de {ex.base})
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show final result with visual */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={100}
                                    textAnchor="middle"
                                    className="text-6xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = {ex.base}
                                </text>
                                <text
                                    x={300}
                                    y={150}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-emerald-600 dark:fill-emerald-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ✓ Cualquier número elevado a 1 es igual a sí mismo
                                </text>
                                
                                {/* Visual representation: single element */}
                                <circle
                                    cx={300}
                                    cy={210}
                                    r={25}
                                    className="fill-orange-500 stroke-orange-700 dark:fill-orange-400 dark:stroke-orange-600"
                                    strokeWidth={3}
                                    style={{
                                        filter: 'drop-shadow(0px 2px 4px rgba(249, 115, 22, 0.3))'
                                    }}
                                />
                                <text
                                    x={300}
                                    y={217}
                                    textAnchor="middle"
                                    className="text-lg font-black fill-white dark:fill-zinc-900"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.base}
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-1">Propiedad</h4>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        a<sup>1</sup> = a
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `Un número elevado a la primera potencia es igual a sí mismo`}
                    {step === 1 && `${ex.base}¹ significa tomar ${ex.base} una sola vez`}
                    {step === 2 && `Por lo tanto, ${ex.base}¹ = ${ex.base}. ¡Simple y directo!`}
                </p>
                <button
                    onClick={handleNext}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95",
                        step === 2
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-700"
                    )}
                >
                    {step === 2 ? (
                        <><RotateCcw className="h-5 w-5" /> Reiniciar</>
                    ) : (
                        <><Play className="h-5 w-5" /> Siguiente</>
                    )}
                </button>
            </div>
        </div>
    )
}
