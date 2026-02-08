"use client"

import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function RegroupingMultiplicationVisual() {
    const [step, setStep] = useState(0)

    // 27 × 6 = 162
    const multiplicand = 27 // 2 decenas + 7 unidades
    const multiplier = 6
    const result = 162

    const d1 = Math.floor(multiplicand / 10) // 2 decenas
    const u1 = multiplicand % 10 // 7 unidades

    const circleRadius = 6
    const squareSize = 16
    const largeSquareSize = 50
    const unitSpacing = 9
    const groupGap = 50

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
    const prevStep = () => setStep(prev => Math.max(prev - 1, 0))
    const reset = () => setStep(0)

    // Step 0: Show initial 27 (2 decades + 7 units)
    // Step 1: Replicate 6 times + Count total (merged)
    // Step 2: Show regrouping: 42 units → 4 decades + 2 units
    // Step 3: Final intermediate: 16 decades + 2 units
    // Step 4: Final regrouping to century

    const totalDecades = d1 * multiplier // 12
    const totalUnits = u1 * multiplier // 42
    const regroupedDecades = Math.floor(totalUnits / 10) // 4
    const remainingUnits = totalUnits % 10 // 2
    const finalDecades = totalDecades + regroupedDecades // 16
    const finalCenturies = Math.floor(finalDecades / 10) // 1
    const finalDecadesAfterCenturies = finalDecades % 10 // 6

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-50 dark:border-zinc-800 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">El Desafío: Reagrupar</h3>
                    <p className="text-slate-500 dark:text-zinc-400">Cuando las unidades superan 10, debemos reorganizar</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                    <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{multiplicand} × {multiplier} = ?</span>
                </div>
            </div>

            {/* Visualization */}
            <div className="relative w-full overflow-visible">
                <svg
                    viewBox={
                        step === 0 ? "0 0 280 50" :
                        step === 1 ? "0 0 280 200" :
                        step <= 3 ? "0 0 350 230" :
                        "0 0 450 230"
                    }
                    className="w-full h-full overflow-visible"
                >
                    {/* Render groups - Steps 0 and 1 */}
                    {step <= 1 && Array.from({ length: step >= 1 ? multiplier : 1 }).map((_, groupIndex) => {
                        const groupY = 20 + (groupIndex * 30)
                        const groupX = 20

                        return (
                            <g 
                                key={groupIndex}
                                className={cn(
                                    "transition-all duration-700 ease-out",
                                    step >= 1 ? "opacity-100" : groupIndex === 0 ? "opacity-100" : "opacity-0"
                                )}
                                style={{ transitionDelay: step >= 1 ? `${groupIndex * 150}ms` : '0ms' }}
                            >
                                {/* Decades (2 green squares) */}
                                {Array.from({ length: d1 }).map((_, decIndex) => (
                                    <rect
                                        key={`dec-${decIndex}`}
                                        x={groupX + (decIndex * (squareSize + 4))}
                                        y={groupY}
                                        width={squareSize}
                                        height={squareSize}
                                        rx={3}
                                        className="fill-emerald-500 stroke-emerald-600 stroke-2"
                                        style={{ filter: 'drop-shadow(0px 2px 4px rgba(16, 185, 129, 0.3))' }}
                                    />
                                ))}

                                {/* Units (7 blue circles) */}
                                {Array.from({ length: u1 }).map((_, unitIndex) => (
                                    <circle
                                        key={`unit-${unitIndex}`}
                                        cx={groupX + (d1 * (squareSize + 4)) + 15 + (unitIndex * unitSpacing)}
                                        cy={groupY + squareSize / 2}
                                        r={circleRadius}
                                        className="fill-blue-500 stroke-blue-600 stroke-2"
                                        style={{ filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))' }}
                                    />
                                ))}

                                {/* Group label */}
                                {step >= 1 && (
                                    <text
                                        x={groupX + 130}
                                        y={groupY + squareSize / 2 + 4}
                                        className="text-xs font-semibold fill-slate-400 dark:fill-zinc-500"
                                    >
                                        Grupo {groupIndex + 1}
                                    </text>
                                )}
                            </g>
                        )
                    })}


                    {/* Step 2-3: Show regrouping visualization (Decades) */}
                    {step >= 2 && step <= 3 && (
                        <g className="animate-in fade-in duration-1000">
                            {/* Final decades (16 total: 12 original + 4 from regrouping) */}
                            <text
                                x={20}
                                y={25}
                                className="text-sm font-bold fill-emerald-600 dark:fill-emerald-400"
                            >
                                Decenas totales:
                            </text>
                            
                            {/* Show all decades in rows */}
                            {Array.from({ length: finalDecades }).map((_, decIndex) => {
                                const row = Math.floor(decIndex / 8)
                                const col = decIndex % 8
                                return (
                                    <rect
                                        key={`final-dec-${decIndex}`}
                                        x={20 + (col * (squareSize + 6))}
                                        y={40 + (row * (squareSize + 6))}
                                        width={squareSize}
                                        height={squareSize}
                                        rx={3}
                                        className={cn(
                                            "stroke-2",
                                            decIndex < totalDecades 
                                                ? "fill-emerald-500 stroke-emerald-600" 
                                                : "fill-amber-500 stroke-amber-600"
                                        )}
                                        style={{ 
                                            filter: decIndex < totalDecades 
                                                ? 'drop-shadow(0px 2px 4px rgba(16, 185, 129, 0.3))' 
                                                : 'drop-shadow(0px 2px 4px rgba(245, 158, 11, 0.3))',
                                            transitionDelay: `${decIndex * 30}ms`
                                        }}
                                    />
                                )
                            })}

                            {/* Annotation for regrouped decades */}
                            {step >= 2 && (
                                <text
                                    x={20 + (totalDecades % 8) * (squareSize + 6)}
                                    y={40 + Math.floor(totalDecades / 8) * (squareSize + 6) + 45}
                                    className="text-xs font-semibold fill-amber-600 dark:fill-amber-400 animate-in fade-in"
                                >
                                    ← {regroupedDecades} nuevas
                                </text>
                            )}

                            {/* Final units */}
                            <text
                                x={20}
                                y={155}
                                className="text-sm font-bold fill-blue-600 dark:fill-blue-400"
                            >
                                Unidades restantes:
                            </text>
                            
                            {Array.from({ length: remainingUnits }).map((_, unitIndex) => (
                                <circle
                                    key={`final-unit-${unitIndex}`}
                                    cx={20 + (unitIndex * unitSpacing)}
                                    cy={175}
                                    r={circleRadius}
                                    className="fill-blue-500 stroke-blue-600 stroke-2 animate-in zoom-in"
                                    style={{ 
                                        filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))',
                                        transitionDelay: `${unitIndex * 50}ms`
                                    }}
                                />
                            ))}

                            {/* Explanation */}
                            <text
                                x={20}
                                y={215}
                                className="text-sm font-bold fill-slate-700 dark:fill-zinc-300"
                            >
                                42 unidades = 4 decenas + 2 unidades
                            </text>
                        </g>
                    )}

                    {/* Step 4: Final regrouping (Century) */}
                    {step === 4 && (
                        <g className="animate-in fade-in duration-1000">
                            {/* Century square */}
                            <rect
                                x={30}
                                y={40}
                                width={largeSquareSize}
                                height={largeSquareSize}
                                rx={6}
                                className="fill-yellow-400 stroke-yellow-600 stroke-2"
                                style={{ filter: 'drop-shadow(0px 4px 12px rgba(234, 179, 8, 0.4))' }}
                            />
                            <text
                                x={30 + largeSquareSize / 2}
                                y={40 + largeSquareSize + 25}
                                textAnchor="middle"
                                className="text-sm font-bold fill-yellow-700 dark:fill-yellow-500"
                            >
                                1 Centena (100)
                            </text>

                            {/* Remaining decades */}
                            {Array.from({ length: finalDecadesAfterCenturies }).map((_, decIndex) => (
                                <rect
                                    key={`last-dec-${decIndex}`}
                                    x={110 + (decIndex * (squareSize + 6))}
                                    y={40 + (largeSquareSize/2 - squareSize/2)}
                                    width={squareSize}
                                    height={squareSize}
                                    rx={3}
                                    className="fill-emerald-500 stroke-emerald-600 stroke-2"
                                />
                            ))}
                            <text
                                x={110 + (finalDecadesAfterCenturies * (squareSize + 6)) / 2}
                                y={40 + largeSquareSize + 25}
                                textAnchor="middle"
                                className="text-sm font-bold fill-emerald-700 dark:fill-emerald-500"
                            >
                                6 Decenas (60)
                            </text>

                            {/* Remaining units */}
                            {Array.from({ length: remainingUnits }).map((_, unitIndex) => (
                                <circle
                                    key={`last-unit-${unitIndex}`}
                                    cx={350 + (unitIndex * unitSpacing)}
                                    cy={40 + largeSquareSize / 2}
                                    r={circleRadius}
                                    className="fill-blue-500 stroke-blue-600 stroke-2"
                                />
                            ))}
                            <text
                                x={350 + (remainingUnits * unitSpacing) / 2 - unitSpacing/2}
                                y={40 + largeSquareSize + 25}
                                textAnchor="middle"
                                className="text-sm font-bold fill-blue-700 dark:fill-blue-500"
                            >
                                2 Unidades
                            </text>

                            {/* Final Label */}
                            <g className="animate-in slide-in-from-bottom-4 duration-700 delay-500">
                                <text
                                    x={30}
                                    y={165}
                                    className="text-base font-bold fill-slate-700 dark:fill-zinc-300"
                                >
                                    Total: 1 centena + 6 decenas + 2 unidades
                                </text>
                                <text
                                    x={30}
                                    y={200}
                                    className="text-3xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = 162
                                </text>
                            </g>
                        </g>
                    )}
                </svg>
            </div>

            {/* Step description */}
            <div className="min-h-[70px] flex items-center justify-center">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center max-w-2xl px-4">
                    {step === 0 && "Comenzamos con 27: dos decenas (cuadrados verdes) y 7 unidades (círculos azules)."}
                    {step === 1 && (
                        <>
                            Al multiplicar por 6, replicamos este conjunto 6 veces.
                            <br />
                            Contamos el total inicial: 12 decenas y 42 unidades. ¡Tenemos más de 10 unidades! Debemos reagrupar.
                        </>
                    )}
                    {step === 2 && "Reagrupamos las unidades: 42 unidades se convierten en 4 nuevas decenas y 2 unidades sueltas."}
                    {step === 3 && "Ahora tenemos 16 decenas en total (12 de antes + 4 nuevas). Como son más de 10, ¡volvemos a reagrupar!"}
                    {step === 4 && "16 decenas se convierten en 1 centena y quedan 6 decenas. El resultado final es 1 centena, 6 decenas y 2 unidades = 162."}
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
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-2 w-2 rounded-full transition-all",
                                step === i ? "bg-purple-600 w-6" : "bg-slate-300 dark:bg-zinc-600"
                            )}
                        />
                    ))}
                </div>

                {step < 4 ? (
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Unidades (1)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-sm bg-emerald-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Decenas (10)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-sm bg-amber-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Reagrupado</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded bg-yellow-400" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Centena (100)</span>
                </div>
            </div>
        </div>
    )
}
