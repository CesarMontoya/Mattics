"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function ExponentiationExample2Visual() {
    const [step, setStep] = useState(0)
    const base = 2
    const exponent = 4
    const result = Math.pow(base, exponent)

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1)
        } else {
            setStep(0)
        }
    }

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">

                {/* Visualizador SVG */}
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[280px]">
                    <svg
                        viewBox="0 0 550 280"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Step 0: Show exponential notation */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                <text
                                    x={275}
                                    y={140}
                                    textAnchor="middle"
                                    className="text-6xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base}
                                    <tspan className="text-4xl" dy="-30" dx="5">{exponent}</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show expansion */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={275}
                                    y={140}
                                    textAnchor="middle"
                                    className="text-4xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base} × {base} × {base} × {base}
                                </text>
                            </g>
                        )}

                        {/* Step 2: First multiplication */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={275}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base} × {base} = {base * base}
                                </text>
                                <text
                                    x={275}
                                    y={170}
                                    textAnchor="middle"
                                    className="text-2xl font-semibold fill-slate-400 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base * base} × {base} × {base}
                                </text>
                            </g>
                        )}

                        {/* Step 3: Second multiplication */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={275}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base * base} × {base} = {base * base * base}
                                </text>
                                <text
                                    x={275}
                                    y={170}
                                    textAnchor="middle"
                                    className="text-2xl font-semibold fill-slate-400 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base * base * base} × {base}
                                </text>
                            </g>
                        )}

                        {/* Step 4: Final result with visual */}
                        {step === 4 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={275}
                                    y={80}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = {result}
                                </text>
                                
                                {/* Visual: Doubling blocks */}
                                {[1, 2, 4, 8, 16].map((value, index) => {
                                    if (index === 0) return null // Skip the first "1"
                                    const x = 80 + (index - 1) * 110
                                    const y = 180
                                    const blockWidth = 15
                                    const blockHeight = 20
                                    const gap = 3
                                    
                                    return (
                                        <g key={index}>
                                            {/* Label */}
                                            <text
                                                x={x + 20}
                                                y={y - 15}
                                                textAnchor="middle"
                                                className="text-sm font-bold fill-orange-600 dark:fill-orange-400"
                                                style={{ fontFamily: "'Inter', sans-serif" }}
                                            >
                                                {value}
                                            </text>
                                            {/* Blocks */}
                                            {Array.from({ length: value }).map((_, blockIdx) => (
                                                <rect
                                                    key={blockIdx}
                                                    x={x + (blockIdx % 4) * (blockWidth + gap)}
                                                    y={y + Math.floor(blockIdx / 4) * (blockHeight + gap)}
                                                    width={blockWidth}
                                                    height={blockHeight}
                                                    className="fill-orange-500 stroke-orange-700 dark:fill-orange-400 dark:stroke-orange-600"
                                                    strokeWidth={1}
                                                    rx={2}
                                                    style={{
                                                        filter: 'drop-shadow(0px 1px 2px rgba(249, 115, 22, 0.3))'
                                                    }}
                                                />
                                            ))}
                                        </g>
                                    )
                                })}
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400 mb-1">Ejemplo 2</h4>
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded bg-orange-500" />
                        <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">Bloques de potencia</span>
                    </div>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `${base}⁴ significa "${base} multiplicado por sí mismo 4 veces"`}
                    {step === 1 && `Expandimos en multiplicación repetida`}
                    {step === 2 && `Primer paso: ${base} × ${base} = ${base * base}`}
                    {step === 3 && `Segundo paso: ${base * base} × ${base} = ${base * base * base}`}
                    {step === 4 && `Resultado final: ${base * base * base} × ${base} = ${result}. Observa cómo se duplica: 2 → 4 → 8 → 16`}
                </p>
                <button
                    onClick={handleNext}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95",
                        step === 4
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-700"
                    )}
                >
                    {step === 4 ? (
                        <><RotateCcw className="h-5 w-5" /> Reiniciar</>
                    ) : (
                        <><Play className="h-5 w-5" /> Siguiente</>
                    )}
                </button>
            </div>
        </div>
    )
}
