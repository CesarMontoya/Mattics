"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function RootOfProductVisual() {
    const [activeExample, setActiveExample] = useState<1 | 2>(1)
    const [step, setStep] = useState(0)

    // Example 1: √(4 × 9) = √4 × √9
    const ex1 = { a: 4, b: 9, product: 36, rootA: 2, rootB: 3, result: 6 }
    // Example 2: ³√(8 × 27) = ³√8 × ³√27
    const ex2 = { a: 8, b: 27, product: 216, rootA: 2, rootB: 3, result: 6, index: 3 }
    
    const ex = activeExample === 1 ? ex1 : ex2
    const index = activeExample === 1 ? 2 : ex2.index

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
                        {/* Step 0: Show original expression */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                <path
                                    d="M 170 140 L 185 160 L 200 90 L 420 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {index === 3 && (
                                    <text
                                        x={160}
                                        y={110}
                                        textAnchor="middle"
                                        className="text-2xl font-black fill-purple-600 dark:fill-purple-400"
                                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                                    >
                                        {index}
                                    </text>
                                )}
                                <text
                                    x={310}
                                    y={135}
                                    textAnchor="middle"
                                    className="text-4xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.a} × {ex.b}
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show property application */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                {/* First radical */}
                                <path
                                    d="M 150 140 L 165 160 L 180 90 L 250 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={3}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {index === 3 && (
                                    <text x={140} y={110} textAnchor="middle" className="text-xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {index}
                                    </text>
                                )}
                                <text x={215} y={130} textAnchor="middle" className="text-3xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.a}
                                </text>
                                
                                {/* Times sign */}
                                <text x={280} y={130} textAnchor="middle" className="text-3xl font-black fill-slate-600 dark:fill-zinc-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    ×
                                </text>
                                
                                {/* Second radical */}
                                <path
                                    d="M 310 140 L 325 160 L 340 90 L 410 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={3}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {index === 3 && (
                                    <text x={300} y={110} textAnchor="middle" className="text-xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {index}
                                    </text>
                                )}
                                <text x={375} y={130} textAnchor="middle" className="text-3xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.b}
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show calculation */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-4xl font-bold fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.rootA} × {ex.rootB}
                                </text>
                                <text
                                    x={300}
                                    y={170}
                                    textAnchor="middle"
                                    className="text-2xl font-semibold fill-slate-500 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {index === 3 ? `³√${ex.a} = ${ex.rootA}  y  ³√${ex.b} = ${ex.rootB}` : `√${ex.a} = ${ex.rootA}  y  √${ex.b} = ${ex.rootB}`}
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show final result */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <path
                                    d="M 150 130 L 165 150 L 180 80 L 330 80"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {index === 3 && (
                                    <text x={140} y={100} textAnchor="middle" className="text-2xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {index}
                                    </text>
                                )}
                                <text x={255} y={125} textAnchor="middle" className="text-4xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.product}
                                </text>
                                <text x={370} y={125} textAnchor="start" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    = {ex.result}
                                </text>
                                
                                <text
                                    x={300}
                                    y={180}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-emerald-600 dark:fill-emerald-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ✓ La raíz del producto = producto de las raíces
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-1">Propiedad</h4>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        {index === 3 ? "³√(a × b) = ³√a × ³√b" : "√(a × b) = √a × √b"}
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `Podemos separar la raíz de un producto en el producto de las raíces`}
                    {step === 1 && `Aplicamos la ${index === 3 ? 'raíz cúbica' : 'raíz cuadrada'} a cada factor por separado`}
                    {step === 2 && `Calculamos cada raíz: ${ex.rootA} y ${ex.rootB}`}
                    {step === 3 && `El resultado es ${ex.result}, igual que si calculáramos ${index === 3 ? '³' : ''}√${ex.product} directamente`}
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
