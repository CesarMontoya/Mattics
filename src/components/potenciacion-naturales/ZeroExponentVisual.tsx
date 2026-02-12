"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function ZeroExponentVisual() {
    const [activeExample, setActiveExample] = useState<1 | 2>(1)
    const [step, setStep] = useState(0)

    // Example 1: 5⁰ = 1
    const ex1 = { base: 5 }
    // Example 2: 100⁰ = 1
    const ex2 = { base: 100 }
    
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
                                    <tspan className="text-4xl" dy="-30" dx="5">0</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show explanation using quotient rule */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={80}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Usando la regla del cociente:
                                </text>
                                {/* Numerator */}
                                <text
                                    x={300}
                                    y={130}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.base}
                                    <tspan className="text-2xl" dy="-12" dx="3">3</tspan>
                                </text>
                                {/* Fraction line */}
                                <line
                                    x1={220}
                                    y1={150}
                                    x2={380}
                                    y2={150}
                                    className="stroke-slate-400 dark:stroke-zinc-600"
                                    strokeWidth={3}
                                />
                                {/* Denominator */}
                                <text
                                    x={300}
                                    y={185}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.base}
                                    <tspan className="text-2xl" dy="-12" dx="3">3</tspan>
                                </text>
                                <text
                                    x={300}
                                    y={220}
                                    textAnchor="middle"
                                    className="text-2xl font-semibold fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = {ex.base}
                                    <tspan className="text-lg" dy="-10" dx="3">3-3</tspan>
                                    <tspan className="text-2xl" dy="10" dx="5"> = </tspan>
                                    <tspan className="text-2xl" dy="0" dx="5">{ex.base}</tspan>
                                    <tspan className="text-lg" dy="-10" dx="3">0</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show final result */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={100}
                                    textAnchor="middle"
                                    className="text-6xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = 1
                                </text>
                                <text
                                    x={300}
                                    y={150}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-emerald-600 dark:fill-emerald-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ✓ Cualquier número elevado a 0 es 1
                                </text>
                                <text
                                    x={300}
                                    y={190}
                                    textAnchor="middle"
                                    className="text-sm font-medium fill-slate-500 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    (excepto 0⁰ que está indefinido)
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-1">Propiedad</h4>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        a<sup>0</sup> = 1
                        <br />
                        <span className="text-xs">(donde a ≠ 0)</span>
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `Cualquier número (excepto cero) elevado a 0 es igual a 1`}
                    {step === 1 && `¿Por qué? Porque ${ex.base}³ ÷ ${ex.base}³ = 1, pero también = ${ex.base}³⁻³ = ${ex.base}⁰`}
                    {step === 2 && `Por lo tanto, ${ex.base}⁰ = 1. Esta regla funciona para cualquier número.`}
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
