"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function ExponentiationConceptVisual() {
    const [step, setStep] = useState(0)
    const base = 2
    const exponent = 3
    const result = Math.pow(base, exponent)

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1)
        } else {
            setStep(0)
        }
    }

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">

                {/* Visualizador SVG */}
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[300px]">
                    <svg
                        viewBox="0 0 600 300"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Step 0: Show exponential notation */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                <text
                                    x={300}
                                    y={150}
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
                                    x={300}
                                    y={150}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base} × {base} × {base}
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show calculation steps */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                {/* First multiplication */}
                                <text
                                    x={300}
                                    y={100}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base} × {base} = {base * base}
                                </text>
                                {/* Second multiplication */}
                                <text
                                    x={300}
                                    y={160}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base * base} × {base} = {result}
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show final result with visual */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                {/* Result */}
                                <text
                                    x={300}
                                    y={80}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = {result}
                                </text>
                                
                                {/* Visual representation: 2x2x2 cube */}
                                {Array.from({ length: 2 }).map((_, layer) =>
                                    Array.from({ length: 2 }).map((_, row) =>
                                        Array.from({ length: 2 }).map((_, col) => {
                                            const x = 250 + col * 35 + layer * 15
                                            const y = 140 + row * 35 - layer * 15
                                            return (
                                                <rect
                                                    key={`${layer}-${row}-${col}`}
                                                    x={x}
                                                    y={y}
                                                    width={30}
                                                    height={30}
                                                    className="fill-orange-500 stroke-orange-700 dark:fill-orange-400 dark:stroke-orange-600"
                                                    strokeWidth={2}
                                                    style={{
                                                        filter: 'drop-shadow(0px 2px 4px rgba(249, 115, 22, 0.3))',
                                                        opacity: 0.8 + layer * 0.2
                                                    }}
                                                />
                                            )
                                        })
                                    )
                                )}
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-100 dark:border-orange-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-orange-600 dark:text-orange-400 mb-1">Paso {step + 1} de 4</h4>
                    <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                        {step === 0 && "Notación exponencial"}
                        {step === 1 && "Expansión en multiplicación"}
                        {step === 2 && "Cálculo paso a paso"}
                        {step === 3 && "Resultado final"}
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `${base}³ significa "${base} multiplicado por sí mismo ${exponent} veces"`}
                    {step === 1 && `Expandimos la potencia en una multiplicación repetida`}
                    {step === 2 && `Calculamos de izquierda a derecha`}
                    {step === 3 && `El resultado es ${result}, representado como un cubo de ${base}×${base}×${base}`}
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
