"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

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
                {/* Visualizador SVG */}
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[280px]">
                    <svg
                        viewBox="0 0 600 280"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Step 0: Show nested radicals */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                {/* Outer radical */}
                                <path
                                    d="M 120 150 L 135 170 L 150 80 L 450 80"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {ex.outerIndex > 2 && (
                                    <text x={110} y={110} textAnchor="middle" className="text-2xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {ex.outerIndex}
                                    </text>
                                )}
                                
                                {/* Inner radical */}
                                <path
                                    d="M 200 140 L 215 160 L 230 90 L 400 90"
                                    className="stroke-purple-500 dark:stroke-purple-300 fill-none"
                                    strokeWidth={3}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text x={315} y={135} textAnchor="middle" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.radicand}
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show multiplication of indices */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <text x={300} y={120} textAnchor="middle" className="text-4xl font-bold fill-slate-600 dark:fill-zinc-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    Índices: {ex.outerIndex} × {ex.innerIndex}
                                </text>
                                <text x={300} y={170} textAnchor="middle" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    = {ex.finalIndex}
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show simplified radical */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <path
                                    d="M 180 150 L 195 170 L 210 90 L 400 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text x={170} y={115} textAnchor="middle" className="text-3xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.finalIndex}
                                </text>
                                <text x={305} y={145} textAnchor="middle" className="text-6xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.radicand}
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show final result */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <path
                                    d="M 150 150 L 165 170 L 180 90 L 330 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text x={140} y={115} textAnchor="middle" className="text-3xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.finalIndex}
                                </text>
                                <text x={255} y={145} textAnchor="middle" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.radicand}
                                </text>
                                <text x={370} y={145} textAnchor="start" className="text-6xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    = {ex.result}
                                </text>
                                
                                <text
                                    x={300}
                                    y={200}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-emerald-600 dark:fill-emerald-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ✓ Raíz de raíz = multiplicamos los índices
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-1">Propiedad</h4>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        <sup>m</sup>√(<sup>n</sup>√a) = <sup>m×n</sup>√a
                    </p>
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
