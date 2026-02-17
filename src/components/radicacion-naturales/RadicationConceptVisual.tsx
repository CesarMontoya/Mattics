"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function RadicationConceptVisual() {
    const [step, setStep] = useState(0)
    const index = 3
    const radicand = 27
    const result = 3

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
                        {/* Step 0: Show radical notation */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                {/* Radical symbol */}
                                <path
                                    d="M 220 150 L 235 170 L 250 100 L 400 100"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {/* Index */}
                                <text
                                    x={210}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-3xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {index}
                                </text>
                                {/* Radicand */}
                                <text
                                    x={325}
                                    y={145}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {radicand}
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show equivalence with power */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    ¿Qué número elevado a {index}
                                </text>
                                <text
                                    x={300}
                                    y={165}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    da como resultado {radicand}?
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
                                    className="text-4xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {result}
                                    <tspan className="text-2xl" dy="-15" dx="5">{index}</tspan>
                                    <tspan className="text-4xl" dy="15" dx="10">= {radicand}</tspan>
                                </text>
                                <text
                                    x={300}
                                    y={170}
                                    textAnchor="middle"
                                    className="text-2xl font-semibold fill-slate-500 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {result} × {result} × {result} = {radicand}
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show final result */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                {/* Radical symbol */}
                                <path
                                    d="M 180 150 L 195 170 L 210 100 L 310 100"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {/* Index */}
                                <text
                                    x={170}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-3xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {index}
                                </text>
                                {/* Radicand */}
                                <text
                                    x={260}
                                    y={145}
                                    textAnchor="middle"
                                    className="text-4xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {radicand}
                                </text>
                                {/* Equals sign and result */}
                                <text
                                    x={340}
                                    y={145}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = {result}
                                </text>
                                
                                {/* Visual representation: 3x3x3 cube */}
                                {Array.from({ length: 3 }).map((_, layer) =>
                                    Array.from({ length: 3 }).map((_, row) =>
                                        Array.from({ length: 3 }).map((_, col) => {
                                            const x = 430 + col * 20 + layer * 10
                                            const y = 120 + row * 20 - layer * 10
                                            return (
                                                <rect
                                                    key={`${layer}-${row}-${col}`}
                                                    x={x}
                                                    y={y}
                                                    width={18}
                                                    height={18}
                                                    className="fill-purple-500 stroke-purple-700 dark:fill-purple-400 dark:stroke-purple-600"
                                                    strokeWidth={1.5}
                                                    style={{
                                                        filter: 'drop-shadow(0px 2px 4px rgba(168, 85, 247, 0.3))',
                                                        opacity: 0.7 + layer * 0.15
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
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-purple-600 dark:text-purple-400 mb-1">Paso {step + 1} de 4</h4>
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                        {step === 0 && "Notación radical"}
                        {step === 1 && "Pregunta inversa"}
                        {step === 2 && "Verificación"}
                        {step === 3 && "Resultado final"}
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `³√${radicand} se lee "raíz cúbica de ${radicand}"`}
                    {step === 1 && `La radicación es la operación inversa de la potenciación`}
                    {step === 2 && `Verificamos: ${result}³ = ${result} × ${result} × ${result} = ${radicand}`}
                    {step === 3 && `Por lo tanto, la raíz cúbica de ${radicand} es ${result}`}
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
