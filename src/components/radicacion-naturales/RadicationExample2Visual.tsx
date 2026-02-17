"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function RadicationExample2Visual() {
    const [step, setStep] = useState(0)

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
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[280px]">
                    <svg
                        viewBox="0 0 600 280"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Step 0: Show radical */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                <path
                                    d="M 200 140 L 215 160 L 230 90 L 370 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text
                                    x={190}
                                    y={110}
                                    textAnchor="middle"
                                    className="text-3xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    4
                                </text>
                                <text
                                    x={300}
                                    y={135}
                                    textAnchor="middle"
                                    className="text-6xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    81
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show question */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={110}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    ¿Qué número elevado a 4
                                </text>
                                <text
                                    x={300}
                                    y={155}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    da como resultado 81?
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show verification */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={100}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    3 × 3 × 3 × 3 = 81
                                </text>
                                <text
                                    x={300}
                                    y={150}
                                    textAnchor="middle"
                                    className="text-4xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    3<tspan className="text-2xl" dy="-15" dx="5">4</tspan>
                                    <tspan className="text-4xl" dy="15" dx="10">= 81</tspan>
                                </text>
                                <text
                                    x={300}
                                    y={195}
                                    textAnchor="middle"
                                    className="text-2xl font-semibold fill-slate-500 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    (9 × 9 = 81)
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show result */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <path
                                    d="M 150 140 L 165 160 L 180 90 L 280 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text
                                    x={140}
                                    y={110}
                                    textAnchor="middle"
                                    className="text-3xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    4
                                </text>
                                <text
                                    x={230}
                                    y={135}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    81
                                </text>
                                <text
                                    x={310}
                                    y={135}
                                    textAnchor="start"
                                    className="text-5xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = 3
                                </text>
                                
                                {/* Visual: progression 3 -> 9 -> 81 */}
                                <circle
                                    cx={430}
                                    cy={100}
                                    r={20}
                                    className="fill-purple-400 stroke-purple-600 dark:fill-purple-500 dark:stroke-purple-400"
                                    strokeWidth={3}
                                />
                                <text
                                    x={430}
                                    y={108}
                                    textAnchor="middle"
                                    className="text-2xl font-black fill-white"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    3
                                </text>
                                
                                <path
                                    d="M 455 100 L 475 100"
                                    className="stroke-purple-500"
                                    strokeWidth={2}
                                    markerEnd="url(#arrowhead)"
                                />
                                
                                <circle
                                    cx={500}
                                    cy={100}
                                    r={20}
                                    className="fill-purple-400 stroke-purple-600 dark:fill-purple-500 dark:stroke-purple-400"
                                    strokeWidth={3}
                                />
                                <text
                                    x={500}
                                    y={108}
                                    textAnchor="middle"
                                    className="text-2xl font-black fill-white"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    9
                                </text>
                                
                                <path
                                    d="M 525 100 L 545 100"
                                    className="stroke-purple-500"
                                    strokeWidth={2}
                                    markerEnd="url(#arrowhead)"
                                />
                                
                                <circle
                                    cx={570}
                                    cy={100}
                                    r={22}
                                    className="fill-purple-400 stroke-purple-600 dark:fill-purple-500 dark:stroke-purple-400"
                                    strokeWidth={3}
                                />
                                <text
                                    x={570}
                                    y={108}
                                    textAnchor="middle"
                                    className="text-xl font-black fill-white"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    81
                                </text>
                                
                                <defs>
                                    <marker
                                        id="arrowhead"
                                        markerWidth="10"
                                        markerHeight="10"
                                        refX="9"
                                        refY="3"
                                        orient="auto"
                                    >
                                        <polygon
                                            points="0 0, 10 3, 0 6"
                                            className="fill-purple-500"
                                        />
                                    </marker>
                                </defs>
                                
                                <text
                                    x={465}
                                    y={135}
                                    textAnchor="middle"
                                    className="text-sm font-semibold fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ×3
                                </text>
                                <text
                                    x={535}
                                    y={135}
                                    textAnchor="middle"
                                    className="text-sm font-semibold fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ×3
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-purple-600 dark:text-purple-400 mb-1">Paso {step + 1} de 4</h4>
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                        {step === 0 && "Raíz cuarta"}
                        {step === 1 && "Plantear la pregunta"}
                        {step === 2 && "Verificación"}
                        {step === 3 && "Resultado visual"}
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && "La raíz cuarta (⁴√) busca un número que multiplicado 4 veces dé el radicando"}
                    {step === 1 && "Necesitamos encontrar qué número elevado a 4 resulta en 81"}
                    {step === 2 && "Comprobamos: 3⁴ = 3 × 3 × 3 × 3 = 81"}
                    {step === 3 && "⁴√81 = 3, porque 3 multiplicado 4 veces nos lleva a 81"}
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
