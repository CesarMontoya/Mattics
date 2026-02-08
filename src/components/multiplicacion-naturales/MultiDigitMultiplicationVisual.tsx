"use client"

import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function MultiDigitMultiplicationVisual() {
    const [step, setStep] = useState(0)

    // 12 × 3 = 36
    const multiplicand = 12 // 1 decena + 2 unidades
    const multiplier = 3
    const result = multiplicand * multiplier // 36

    const decades = Math.floor(multiplicand / 10) // 1
    const units = multiplicand % 10 // 2

    const circleRadius = 10
    const squareSize = 28
    const groupSpacing = 80
    const unitSpacing = 15
    const startX = 20
    const startY = 20

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
    const prevStep = () => setStep(prev => Math.max(prev - 1, 0))
    const reset = () => setStep(0)

    // Step 0: Show initial 12 (1 decade + 2 units)
    // Step 1: Replicate 3 times
    // Step 2: Show total: 3 decades + 6 units
    // Step 3: Final regrouping (already grouped)

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-50 dark:border-zinc-800 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Multiplicando con Decenas</h3>
                    <p className="text-slate-500 dark:text-zinc-400">Observa cómo se replican los bloques del sistema decimal</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                    <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{multiplicand} × {multiplier} = ?</span>
                </div>
            </div>

            {/* Visualization */}
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="relative w-full md:w-1/2 overflow-visible">
                    <svg
                        viewBox="0 0 180 240"
                        className="w-full h-full overflow-visible"
                    >
                    {/* Render the 3 groups */}
                    {Array.from({ length: step >= 1 ? multiplier : 1 }).map((_, groupIndex) => {
                        const groupY = startY + (groupIndex * 70)

                        return (
                            <g key={groupIndex} className={cn(
                                "transition-all duration-700 ease-out",
                                step >= 1 ? "opacity-100" : groupIndex === 0 ? "opacity-100" : "opacity-0"
                            )}
                            style={{ transitionDelay: step >= 1 ? `${groupIndex * 200}ms` : '0ms' }}
                            >
                                {/* Decade square */}
                                {Array.from({ length: decades }).map((_, decadeIndex) => (
                                    <rect
                                        key={`decade-${decadeIndex}`}
                                        x={startX + (decadeIndex * (squareSize + 10))}
                                        y={groupY}
                                        width={squareSize}
                                        height={squareSize}
                                        rx={4}
                                        className="fill-emerald-500 stroke-emerald-600 stroke-2"
                                        style={{ filter: 'drop-shadow(0px 2px 4px rgba(16, 185, 129, 0.3))' }}
                                    />
                                ))}

                                {/* Unit circles */}
                                {Array.from({ length: units }).map((_, unitIndex) => (
                                    <circle
                                        key={`unit-${unitIndex}`}
                                        cx={startX + (decades * (squareSize + 10)) + 20 + (unitIndex * unitSpacing)}
                                        cy={groupY + squareSize / 2}
                                        r={circleRadius}
                                        className="fill-blue-500 stroke-blue-600 stroke-2"
                                        style={{ filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))' }}
                                    />
                                ))}

                                {/* Group label */}
                                {step >= 1 && (
                                    <text
                                        x={startX + 90}
                                        y={groupY + squareSize / 2 + 5}
                                        className="text-xs font-semibold fill-slate-400 dark:fill-zinc-500"
                                    >
                                        Grupo {groupIndex + 1}
                                    </text>
                                )}
                            </g>
                        )
                    })}

                </svg>
            </div>
            
            {/* Side panel - always present, but content conditionally rendered */}
            <div className="md:w-1/2 flex items-center justify-center p-6 rounded-2xl border min-h-[100px]">
                {step >= 2 && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-100 dark:border-purple-900/50 p-6 animate-in fade-in slide-in-from-right duration-700">
                        <div className="text-center space-y-3">
                            <p className="text-xl md:text-2xl font-bold text-slate-700 dark:text-zinc-300">
                                Total: {decades * multiplier} decenas + {units * multiplier} unidades
                            </p>
                            <p className="text-4xl md:text-5xl font-black text-purple-600 dark:text-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                = {result}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>

            {/* Step description */}
            <div className="min-h-[60px] flex items-center justify-center">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center max-w-2xl">
                    {step === 0 && "Comenzamos con 12: una decena (cuadrado verde) y 2 unidades (círculos azules)."}
                    {step === 1 && "Al multiplicar por 3, replicamos este conjunto 3 veces."}
                    {step === 2 && "Contamos el total: 3 decenas y 6 unidades."}
                    {step === 3 && "En el sistema decimal: 3 decenas + 6 unidades = 36"}
                </p>
            </div>

            {/* Navigation controls */}
            <div className="flex flex-wrap justify-center items-center gap-4">
                <button
                    onClick={prevStep}
                    disabled={step === 0}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all",
                        step === 0
                            ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200 active:scale-95"
                    )}
                >
                    <ChevronLeft className="h-5 w-5" /> Anterior
                </button>

                <div className="flex items-center gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-2 w-2 rounded-full transition-all",
                                step === i ? "bg-purple-600 w-6" : "bg-slate-300 dark:bg-zinc-600"
                            )}
                        />
                    ))}
                </div>

                {step < 3 ? (
                    <button
                        onClick={nextStep}
                        className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-full font-semibold transition-all active:scale-95 shadow-lg shadow-purple-200 dark:shadow-none"
                    >
                        Siguiente <ChevronRight className="h-5 w-5" />
                    </button>
                ) : (
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-6 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200 rounded-full font-semibold transition-all active:scale-95"
                    >
                        <RotateCcw className="h-5 w-5" /> Reiniciar
                    </button>
                )}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Unidades (1)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-sm bg-emerald-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Decenas (10)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded bg-purple-600" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Resultado</span>
                </div>
            </div>
        </div>
    )
}
