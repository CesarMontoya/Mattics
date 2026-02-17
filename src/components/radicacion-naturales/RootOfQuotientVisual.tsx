"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function RootOfQuotientVisual() {
    const [activeExample, setActiveExample] = useState<1 | 2>(1)
    const [step, setStep] = useState(0)

    // Example 1: √(16/4) = √16 / √4
    const ex1 = { numerator: 16, denominator: 4, quotient: 4, rootNum: 4, rootDen: 2, result: 2 }
    // Example 2: ³√(64/8) = ³√64 / ³√8
    const ex2 = { numerator: 64, denominator: 8, quotient: 8, rootNum: 4, rootDen: 2, result: 2, index: 3 }
    
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
                                    d="M 180 150 L 195 170 L 210 90 L 410 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {index === 3 && (
                                    <text x={170} y={110} textAnchor="middle" className="text-2xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {index}
                                    </text>
                                )}
                                {/* Fraction */}
                                <text x={310} y={125} textAnchor="middle" className="text-4xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.numerator}
                                </text>
                                <line x1={270} y1={135} x2={350} y2={135} className="stroke-purple-600 dark:stroke-purple-400" strokeWidth={3} />
                                <text x={310} y={165} textAnchor="middle" className="text-4xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.denominator}
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show property application */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                {/* Numerator radical */}
                                <g>
                                    <path
                                        d="M 140 105 L 155 125 L 170 55 L 270 55"
                                        className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    {index === 3 && (
                                        <text x={130} y={75} textAnchor="middle" className="text-xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                            {index}
                                        </text>
                                    )}
                                    <text x={220} y={95} textAnchor="middle" className="text-3xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {ex.numerator}
                                    </text>
                                </g>
                                
                                {/* Division line */}
                                <line x1={140} y1={140} x2={350} y2={140} className="stroke-slate-600 dark:stroke-zinc-400" strokeWidth={3} />
                                
                                {/* Denominator radical */}
                                <g>
                                    <path
                                        d="M 180 195 L 195 215 L 210 145 L 310 145"
                                        className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    {index === 3 && (
                                        <text x={170} y={165} textAnchor="middle" className="text-xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                            {index}
                                        </text>
                                    )}
                                    <text x={260} y={185} textAnchor="middle" className="text-3xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {ex.denominator}
                                    </text>
                                </g>
                            </g>
                        )}

                        {/* Step 2: Show calculation */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text x={300} y={110} textAnchor="middle" className="text-5xl font-bold fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.rootNum}
                                </text>
                                <line x1={270} y1={125} x2={330} y2={125} className="stroke-purple-600 dark:stroke-purple-400" strokeWidth={3} />
                                <text x={300} y={155} textAnchor="middle" className="text-5xl font-bold fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.rootDen}
                                </text>
                                <text
                                    x={300}
                                    y={195}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-slate-500 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {index === 3 ? `³√${ex.numerator} = ${ex.rootNum}  y  ³√${ex.denominator} = ${ex.rootDen}` : `√${ex.numerator} = ${ex.rootNum}  y  √${ex.denominator} = ${ex.rootDen}`}
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show final result */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <path
                                    d="M 150 150 L 165 170 L 180 90 L 310 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {index === 3 && (
                                    <text x={140} y={110} textAnchor="middle" className="text-2xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {index}
                                    </text>
                                )}
                                <text x={245} y={135} textAnchor="middle" className="text-4xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.quotient}
                                </text>
                                <text x={340} y={135} textAnchor="start" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    = {ex.result}
                                </text>
                                
                                <text
                                    x={300}
                                    y={185}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-emerald-600 dark:fill-emerald-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ✓ La raíz del cociente = cociente de las raíces
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-1">Propiedad</h4>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        {index === 3 ? "³√(a ÷ b) = ³√a ÷ ³√b" : "√(a ÷ b) = √a ÷ √b"}
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `Podemos separar la raíz de un cociente en el cociente de las raíces`}
                    {step === 1 && `Aplicamos la ${index === 3 ? 'raíz cúbica' : 'raíz cuadrada'} al numerador y denominador por separado`}
                    {step === 2 && `Calculamos cada raíz: ${ex.rootNum} y ${ex.rootDen}`}
                    {step === 3 && `El resultado es ${ex.result}, igual que si calculáramos ${index === 3 ? '³' : ''}√${ex.quotient} directamente`}
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
