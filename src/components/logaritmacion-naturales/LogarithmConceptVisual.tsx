"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function LogarithmConceptVisual() {
    const [step, setStep] = useState(0)
    const base = 2
    const argument = 8
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
                        {/* Step 0: Show logarithmic notation */}
                        {step === 0 && (
                            <g className="animate-in fade-in zoom-in duration-500">
                                <text
                                    x={300}
                                    y={150}
                                    textAnchor="middle"
                                    className="text-6xl font-black fill-blue-600 dark:fill-blue-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    log<tspan className="text-3xl" dy="15">{base}</tspan>
                                    <tspan dy="-15" dx="10">{argument}</tspan>
                                    <tspan dx="20" className="fill-slate-400">=</tspan>
                                    <tspan dx="20" className="text-7xl fill-orange-500">?</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 1: Thinking process - How many steps? */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <circle cx={300} cy={150} r={80} className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-200 dark:stroke-blue-800" strokeWidth={2} strokeDasharray="8 4" />
                                <text
                                    x={300}
                                    y={140}
                                    textAnchor="middle"
                                    className="text-2xl font-bold fill-blue-700 dark:fill-blue-300 italic"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    ¿Cuántos pasos?
                                </text>
                                <text
                                    x={300}
                                    y={180}
                                    textAnchor="middle"
                                    className="text-xl font-medium fill-slate-500 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    (veces que multiplicamos {base})
                                </text>
                            </g>
                        )}

                        {/* Step 2: Multiplication sequence */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                {/* Step 1 */}
                                <g transform="translate(100, 150)">
                                    <circle r={40} className="fill-blue-100 dark:fill-blue-900/40 stroke-blue-500" strokeWidth={2} />
                                    <text textAnchor="middle" dy="8" className="text-2xl font-bold fill-blue-700 dark:fill-blue-300">2</text>
                                    <text y={60} textAnchor="middle" className="text-sm font-bold fill-blue-500 uppercase tracking-tighter">Paso 1</text>
                                </g>

                                <path d="M 140 150 L 210 150" className="stroke-slate-300 dark:stroke-zinc-700" strokeWidth={3} markerEnd="url(#arrowhead)" />
                                
                                {/* Step 2 */}
                                <g transform="translate(250, 150)">
                                    <circle r={45} className="fill-blue-200 dark:fill-blue-800/40 stroke-blue-600" strokeWidth={2} />
                                    <text textAnchor="middle" dy="8" className="text-2xl font-bold fill-blue-800 dark:fill-blue-200">4</text>
                                    <text y={65} textAnchor="middle" className="text-sm font-bold fill-blue-600 uppercase tracking-tighter">Paso 2</text>
                                    <text y={-55} textAnchor="middle" className="text-xs font-medium fill-slate-400 italic">2 × 2</text>
                                </g>

                                <path d="M 295 150 L 365 150" className="stroke-slate-300 dark:stroke-zinc-700" strokeWidth={3} markerEnd="url(#arrowhead)" />

                                {/* Step 3 */}
                                <g transform="translate(400, 150)">
                                    <circle r={50} className="fill-orange-100 dark:fill-orange-900/40 stroke-orange-500" strokeWidth={3} />
                                    <text textAnchor="middle" dy="10" className="text-3xl font-black fill-orange-700 dark:fill-orange-300">8</text>
                                    <text y={70} textAnchor="middle" className="text-sm font-bold fill-orange-600 uppercase tracking-tighter">Paso 3</text>
                                    <text y={-60} textAnchor="middle" className="text-xs font-medium fill-slate-400 italic">4 × 2</text>
                                </g>

                                <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
                                    </marker>
                                </defs>
                            </g>
                        )}

                        {/* Step 3: Result */}
                        {step === 3 && (
                            <g className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <text
                                    x={300}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-4xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    ¡Llegamos al 8 en 3 pasos!
                                </text>
                                <text
                                    x={300}
                                    y={200}
                                    textAnchor="middle"
                                    className="text-7xl font-black fill-orange-600 dark:fill-orange-400 underline underline-offset-8 decoration-blue-500/30"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    log<tspan className="text-4xl" dy="15">2</tspan><tspan dy="-15" dx="10">8</tspan> = 3
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 mb-1">Paso {step + 1} de 4</h4>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        {step === 0 && "Planteamiento del logaritmo"}
                        {step === 1 && "La pregunta mágica"}
                        {step === 2 && "Contando los pasos"}
                        {step === 3 && "¡Resultado encontrado!"}
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center max-w-2xl px-4">
                    {step === 0 && `¿A qué exponente debemos elevar el ${base} para obtener ${argument}?`}
                    {step === 1 && `Buscamos cuántas veces debemos multiplicar el ${base} por sí mismo.`}
                    {step === 2 && `Multiplicamos: 2 (1 paso), 2×2=4 (2 pasos), 4×2=8 (3 pasos).`}
                    {step === 3 && `Como necesitamos 3 pasos para llegar al ${argument}, el resultado es 3.`}
                </p>
                <button
                    onClick={handleNext}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95 shadow-lg",
                        step === 3
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-blue-600 text-white shadow-blue-200 dark:shadow-none hover:bg-blue-700"
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
