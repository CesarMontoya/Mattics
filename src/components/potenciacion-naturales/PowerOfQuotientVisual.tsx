"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function PowerOfQuotientVisual() {
    const [activeExample, setActiveExample] = useState<1 | 2>(1)
    const [step, setStep] = useState(0)

    // Example 1: (6÷2)² = 6² ÷ 2² = 36 ÷ 4 = 9
    const ex1 = { num: 6, den: 2, exp: 2, numResult: 36, denResult: 4, finalValue: 9 }
    // Example 2: (8÷2)² = 8² ÷ 2² = 64 ÷ 4 = 16
    const ex2 = { num: 8, den: 2, exp: 2, numResult: 64, denResult: 4, finalValue: 16 }
    
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
                                    ({ex.num} ÷ {ex.den})
                                    <tspan className="text-3xl" dy="-20" dx="3">{ex.exp}</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 1: Distribute exponent */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                {/* Numerator */}
                                <text
                                    x={300}
                                    y={95}
                                    textAnchor="middle"
                                    className="text-4xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.num}
                                    <tspan className="text-3xl" dy="-15" dx="3">{ex.exp}</tspan>
                                </text>
                                {/* Fraction line */}
                                <line
                                    x1={220}
                                    y1={120}
                                    x2={380}
                                    y2={120}
                                    className="stroke-orange-600 dark:stroke-orange-400"
                                    strokeWidth={4}
                                />
                                {/* Denominator */}
                                <text
                                    x={300}
                                    y={165}
                                    textAnchor="middle"
                                    className="text-4xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.den}
                                    <tspan className="text-3xl" dy="-15" dx="3">{ex.exp}</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 2: Calculate each power */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={80}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.num}
                                    <tspan className="text-2xl" dy="-12" dx="2">{ex.exp}</tspan>
                                    <tspan className="text-3xl" dy="12" dx="5"> = {ex.numResult}</tspan>
                                </text>
                                <text
                                    x={300}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.den}
                                    <tspan className="text-2xl" dy="-12" dx="2">{ex.exp}</tspan>
                                    <tspan className="text-3xl" dy="12" dx="5"> = {ex.denResult}</tspan>
                                </text>
                                {/* Result fraction */}
                                <text
                                    x={300}
                                    y={170}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.numResult}
                                </text>
                                <line
                                    x1={240}
                                    y1={185}
                                    x2={360}
                                    y2={185}
                                    className="stroke-orange-600 dark:stroke-orange-400"
                                    strokeWidth={3}
                                />
                                <text
                                    x={300}
                                    y={220}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {ex.denResult}
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
                                    = {ex.finalValue}
                                </text>
                                <text
                                    x={300}
                                    y={180}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-emerald-600 dark:fill-emerald-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ✓ El exponente se distribuye al numerador y denominador
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-1">Propiedad</h4>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        (a÷b)<sup>n</sup> = a<sup>n</sup> ÷ b<sup>n</sup>
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `Un cociente elevado a una potencia distribuye el exponente al numerador y denominador`}
                    {step === 1 && `El exponente ${ex.exp} se aplica a ${ex.num} y a ${ex.den}`}
                    {step === 2 && `Calculamos: ${ex.num}² = ${ex.numResult} y ${ex.den}² = ${ex.denResult}`}
                    {step === 3 && `Dividimos: ${ex.numResult} ÷ ${ex.denResult} = ${ex.finalValue}`}
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
