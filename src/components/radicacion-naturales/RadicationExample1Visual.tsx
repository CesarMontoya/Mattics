"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function RadicationExample1Visual() {
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
                                    d="M 220 140 L 235 160 L 250 90 L 380 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text
                                    x={315}
                                    y={135}
                                    textAnchor="middle"
                                    className="text-6xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    16
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show question */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    ¿Qué número multiplicado
                                </text>
                                <text
                                    x={300}
                                    y={165}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    por sí mismo da 16?
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show verification */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    4 × 4 = 16
                                </text>
                                <text
                                    x={300}
                                    y={170}
                                    textAnchor="middle"
                                    className="text-4xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    4<tspan className="text-2xl" dy="-15" dx="5">2</tspan>
                                    <tspan className="text-4xl" dy="15" dx="10">= 16</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show result with visual */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                {/* Result */}
                                <path
                                    d="M 150 140 L 165 160 L 180 90 L 280 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text
                                    x={230}
                                    y={135}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    16
                                </text>
                                <text
                                    x={320}
                                    y={135}
                                    textAnchor="start"
                                    className="text-5xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = 4
                                </text>
                                
                                {/* Visual representation: 4x4 square */}
                                {Array.from({ length: 4 }).map((_, row) =>
                                    Array.from({ length: 4 }).map((_, col) => {
                                        const x = 420 + col * 32
                                        const y = 85 + row * 32
                                        return (
                                            <rect
                                                key={`${row}-${col}`}
                                                x={x}
                                                y={y}
                                                width={28}
                                                height={28}
                                                className="fill-purple-500 stroke-purple-700 dark:fill-purple-400 dark:stroke-purple-600"
                                                strokeWidth={2}
                                                style={{
                                                    filter: 'drop-shadow(0px 2px 4px rgba(168, 85, 247, 0.3))',
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
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-purple-600 dark:text-purple-400 mb-1">Paso {step + 1} de 4</h4>
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                        {step === 0 && "Raíz cuadrada"}
                        {step === 1 && "Encontrar el número"}
                        {step === 2 && "Verificación"}
                        {step === 3 && "Resultado visual"}
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && "La raíz cuadrada (√) es el caso más común de radicación"}
                    {step === 1 && "Buscamos un número que al cuadrado dé 16"}
                    {step === 2 && "Comprobamos: 4 al cuadrado es igual a 16"}
                    {step === 3 && "√16 = 4, representado como un cuadrado de 4×4"}
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
