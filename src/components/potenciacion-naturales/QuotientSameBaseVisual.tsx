"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function QuotientSameBaseVisual() {
    const [activeExample, setActiveExample] = useState<1 | 2>(1)
    const [step, setStep] = useState(0)

    // Example 1: 2⁵ ÷ 2² = 2³
    const ex1 = { base: 2, exp1: 5, exp2: 2, result: 3, finalValue: 8 }
    // Example 2: 3⁴ ÷ 3¹ = 3³
    const ex2 = { base: 3, exp1: 4, exp2: 1, result: 3, finalValue: 27 }
    
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
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.base}
                                    <tspan className="text-3xl" dy="-20" dx="3">{ex.exp1}</tspan>
                                    <tspan className="text-5xl" dy="20" dx="5"> ÷ </tspan>
                                    <tspan className="text-5xl" dy="0" dx="5">{ex.base}</tspan>
                                    <tspan className="text-3xl" dy="-20" dx="3">{ex.exp2}</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show expansion with fraction */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                {/* Numerator */}
                                <text
                                    x={300}
                                    y={100}
                                    textAnchor="middle"
                                    className="text-2xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {Array(ex.exp1).fill(ex.base).join(' × ')}
                                </text>
                                {/* Fraction line */}
                                <line
                                    x1={150}
                                    y1={120}
                                    x2={450}
                                    y2={120}
                                    className="stroke-slate-400 dark:stroke-zinc-600"
                                    strokeWidth={3}
                                />
                                {/* Denominator */}
                                <text
                                    x={300}
                                    y={160}
                                    textAnchor="middle"
                                    className="text-2xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {Array(ex.exp2).fill(ex.base).join(' × ')}
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show cancellation and rule */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={100}
                                    textAnchor="middle"
                                    className="text-2xl font-bold fill-slate-400 dark:fill-zinc-600"
                                    style={{ 
                                        fontFamily: "'Quicksand', sans-serif",
                                        textDecoration: 'line-through',
                                        textDecorationColor: 'rgb(239, 68, 68)',
                                        textDecorationThickness: '3px'
                                    }}
                                >
                                    {Array(ex.exp2).fill(ex.base).join(' × ')}
                                    <tspan className="fill-orange-600 dark:fill-orange-400" style={{ textDecoration: 'none' }}>
                                        {ex.exp1 > ex.exp2 ? ' × ' + Array(ex.result).fill(ex.base).join(' × ') : ''}
                                    </tspan>
                                </text>
                                <line
                                    x1={150}
                                    y1={120}
                                    x2={450}
                                    y2={120}
                                    className="stroke-slate-400 dark:stroke-zinc-600"
                                    strokeWidth={3}
                                />
                                <text
                                    x={300}
                                    y={160}
                                    textAnchor="middle"
                                    className="text-2xl font-bold fill-slate-400 dark:fill-zinc-600"
                                    style={{ 
                                        fontFamily: "'Quicksand', sans-serif",
                                        textDecoration: 'line-through',
                                        textDecorationColor: 'rgb(239, 68, 68)',
                                        textDecorationThickness: '3px'
                                    }}
                                >
                                    {Array(ex.exp2).fill(ex.base).join(' × ')}
                                </text>
                                <text
                                    x={300}
                                    y={210}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-slate-500 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    = {ex.base}
                                    <tspan className="text-lg" dy="-10" dx="3">{ex.exp1} - {ex.exp2}</tspan>
                                    <tspan className="text-xl" dy="10" dx="5"> = </tspan>
                                    <tspan className="text-xl" dy="0" dx="5">{ex.base}</tspan>
                                    <tspan className="text-lg" dy="-10" dx="3">{ex.result}</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show final result */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.base}
                                    <tspan className="text-3xl" dy="-20" dx="3">{ex.result}</tspan>
                                    <tspan className="text-5xl" dy="20" dx="10"> = {ex.finalValue}</tspan>
                                </text>
                                <text
                                    x={300}
                                    y={180}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-emerald-600 dark:fill-emerald-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ✓ Se restan los exponentes
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-1">Propiedad</h4>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m-n</sup>
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `Al dividir potencias con la misma base, restamos los exponentes`}
                    {step === 1 && `Expandimos cada potencia como fracción`}
                    {step === 2 && `Cancelamos factores comunes: ${ex.exp1} - ${ex.exp2} = ${ex.result} factores quedan`}
                    {step === 3 && `Resultado final: ${ex.base}${ex.result} = ${ex.finalValue}`}
                </p>
                <button
                    onClick={handleNext}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95",
                        step === 3
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-700"
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
