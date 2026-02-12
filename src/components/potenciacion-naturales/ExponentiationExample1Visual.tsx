"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function ExponentiationExample1Visual() {
    const [step, setStep] = useState(0)
    const base = 3
    const exponent = 2
    const result = Math.pow(base, exponent)

    const handleNext = () => {
        if (step < 2) {
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
                        viewBox="0 0 500 280"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Step 0: Show exponential notation */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                <text
                                    x={250}
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
                                    x={250}
                                    y={140}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base} × {base} = {result}
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show result with 3x3 grid */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                {/* Result */}
                                <text
                                    x={250}
                                    y={60}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = {result}
                                </text>
                                
                                {/* 3x3 grid */}
                                {Array.from({ length: base }).map((_, row) =>
                                    Array.from({ length: base }).map((_, col) => {
                                        const squareSize = 40
                                        const gap = 5
                                        const totalSize = squareSize + gap
                                        const startX = 250 - (base * totalSize) / 2
                                        const startY = 120
                                        
                                        return (
                                            <rect
                                                key={`${row}-${col}`}
                                                x={startX + col * totalSize}
                                                y={startY + row * totalSize}
                                                width={squareSize}
                                                height={squareSize}
                                                className="fill-orange-500 stroke-orange-700 dark:fill-orange-400 dark:stroke-orange-600"
                                                strokeWidth={2}
                                                rx={4}
                                                style={{
                                                    filter: 'drop-shadow(0px 2px 4px rgba(249, 115, 22, 0.3))',
                                                    animationDelay: `${(row * base + col) * 50}ms`
                                                }}
                                            />
                                        )
                                    })
                                )}
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400 mb-1">Ejemplo 1</h4>
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded bg-orange-500" />
                        <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">Cuadrado {base}×{base}</span>
                    </div>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `${base}² se lee "${base} al cuadrado"`}
                    {step === 1 && `Es igual a ${base} multiplicado por ${base}`}
                    {step === 2 && `El resultado es ${result}, visualizado como un cuadrado de ${base}×${base}`}
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
