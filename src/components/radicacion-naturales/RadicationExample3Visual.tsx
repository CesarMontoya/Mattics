"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function RadicationExample3Visual() {
    const [step, setStep] = useState(0)

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
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[300px]">
                    <svg
                        viewBox="0 0 600 300"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Step 0: Show radical */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                <path
                                    d="M 200 150 L 215 170 L 230 100 L 370 100"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text
                                    x={190}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-3xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    5
                                </text>
                                <text
                                    x={300}
                                    y={145}
                                    textAnchor="middle"
                                    className="text-6xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    32
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
                                    ¿Qué número elevado a 5
                                </text>
                                <text
                                    x={300}
                                    y={165}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    da como resultado 32?
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show verification */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={300}
                                    y={110}
                                    textAnchor="middle"
                                    className="text-2xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    2 × 2 × 2 × 2 × 2 = 32
                                </text>
                                <text
                                    x={300}
                                    y={160}
                                    textAnchor="middle"
                                    className="text-4xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    2<tspan className="text-2xl" dy="-15" dx="5">5</tspan>
                                    <tspan className="text-4xl" dy="15" dx="10">= 32</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show progression tree */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                {/* Level 0 */}
                                <circle cx={300} cy={50} r={18} className="fill-purple-400 stroke-purple-600" strokeWidth={2} />
                                <text x={300} y={57} textAnchor="middle" className="text-lg font-black fill-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>2</text>
                                
                                {/* Level 1 */}
                                <line x1={300} y1={68} x2={300} y2={95} className="stroke-purple-500" strokeWidth={2} />
                                <circle cx={300} cy={110} r={18} className="fill-purple-400 stroke-purple-600" strokeWidth={2} />
                                <text x={300} y={117} textAnchor="middle" className="text-lg font-black fill-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>4</text>
                                <text x={320} y={95} className="text-xs fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Inter', sans-serif" }}>×2</text>
                                
                                {/* Level 2 */}
                                <line x1={300} y1={128} x2={300} y2={155} className="stroke-purple-500" strokeWidth={2} />
                                <circle cx={300} cy={170} r={18} className="fill-purple-400 stroke-purple-600" strokeWidth={2} />
                                <text x={300} y={177} textAnchor="middle" className="text-lg font-black fill-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>8</text>
                                <text x={320} y={155} className="text-xs fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Inter', sans-serif" }}>×2</text>
                                
                                {/* Level 3 */}
                                <line x1={300} y1={188} x2={300} y2={215} className="stroke-purple-500" strokeWidth={2} />
                                <circle cx={300} cy={230} r={18} className="fill-purple-400 stroke-purple-600" strokeWidth={2} />
                                <text x={300} y={237} textAnchor="middle" className="text-sm font-black fill-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>16</text>
                                <text x={320} y={215} className="text-xs fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Inter', sans-serif" }}>×2</text>
                                
                                {/* Level 4 */}
                                <line x1={300} y1={248} x2={300} y2={275} className="stroke-purple-500" strokeWidth={2} />
                                <circle cx={300} cy={290} r={20} className="fill-purple-600 stroke-purple-800 dark:fill-purple-500 dark:stroke-purple-400" strokeWidth={3} />
                                <text x={300} y={297} textAnchor="middle" className="text-sm font-black fill-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>32</text>
                                <text x={320} y={275} className="text-xs fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Inter', sans-serif" }}>×2</text>
                            </g>
                        )}

                        {/* Step 4: Show result */}
                        {step === 4 && (
                            <g className="animate-in fade-in duration-700">
                                <path
                                    d="M 150 150 L 165 170 L 180 100 L 280 100"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <text
                                    x={140}
                                    y={120}
                                    textAnchor="middle"
                                    className="text-3xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    5
                                </text>
                                <text
                                    x={230}
                                    y={145}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    32
                                </text>
                                <text
                                    x={310}
                                    y={145}
                                    textAnchor="start"
                                    className="text-5xl font-black fill-purple-600 dark:fill-purple-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = 2
                                </text>
                                
                                <text
                                    x={300}
                                    y={200}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-emerald-600 dark:fill-emerald-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ✓ Multiplicando 2 cinco veces llegamos a 32
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-purple-600 dark:text-purple-400 mb-1">Paso {step + 1} de 5</h4>
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                        {step === 0 && "Raíz quinta"}
                        {step === 1 && "Plantear el problema"}
                        {step === 2 && "Verificación"}
                        {step === 3 && "Árbol de duplicación"}
                        {step === 4 && "Resultado final"}
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && "La raíz quinta (⁵√) busca un número que multiplicado 5 veces dé el radicando"}
                    {step === 1 && "Buscamos qué número elevado a la quinta potencia resulta en 32"}
                    {step === 2 && "Comprobamos: 2⁵ = 2 × 2 × 2 × 2 × 2 = 32"}
                    {step === 3 && "Vemos cómo 2 se duplica sucesivamente hasta llegar a 32"}
                    {step === 4 && "⁵√32 = 2, confirmado por el proceso de multiplicación repetida"}
                </p>
                <button
                    onClick={handleNext}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95",
                        step === 4
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-none hover:bg-purple-700"
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
