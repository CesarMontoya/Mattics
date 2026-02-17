"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function PowerOfRootVisual() {
    const [activeExample, setActiveExample] = useState<1 | 2>(1)
    const [step, setStep] = useState(0)

    // Example 1: (√4)² = 4
    const ex1 = { radicand: 4, rootIndex: 2, power: 2, root: 2, result: 4 }
    // Example 2: (³√8)³ = 8
    const ex2 = { radicand: 8, rootIndex: 3, power: 3, root: 2, result: 8 }
    
    const ex = activeExample === 1 ? ex1 : ex2

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1)
        } else {
            setStep(0)
        }
    }

    const switchExample = (exNum: 1 | 2) => {
        setActiveExample(exNum)
        setStep(0)
    }

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            {/* Example switcher */}
            <div className="flex gap-3 justify-center">
                <button
                    onClick={() => switchExample(1)}
                    className={cn(
                        "px-6 py-2 rounded-full font-bold transition-all",
                        activeExample === 1
                            ? "bg-purple-600 text-white"
                            : "bg-slate-200 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                    )}
                >
                    Ejemplo 1
                </button>
                <button
                    onClick={() => switchExample(2)}
                    className={cn(
                        "px-6 py-2 rounded-full font-bold transition-all",
                        activeExample === 2
                            ? "bg-purple-600 text-white"
                            : "bg-slate-200 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                    )}
                >
                    Ejemplo 2
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                {/* Visualizador SVG */}
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[280px]">
                    <svg
                        viewBox="0 0 600 280"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Step 0: Show power of root */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                <text x={110} y={135} textAnchor="end" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    (
                                </text>
                                <path
                                    d="M 120 140 L 135 160 L 150 90 L 280 90"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {ex.rootIndex === 3 && (
                                    <text x={110} y={110} textAnchor="middle" className="text-2xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {ex.rootIndex}
                                    </text>
                                )}
                                <text x={215} y={135} textAnchor="middle" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.radicand}
                                </text>
                                <text x={290} y={135} textAnchor="start" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    )
                                    <tspan className="text-3xl" dy="-20" dx="3">{ex.power}</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show root calculation */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <text x={300} y={110} textAnchor="middle" className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    Primero calculamos la raíz:
                                </text>
                                <path
                                    d="M 200 175 L 215 195 L 230 125 L 360 125"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={3}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {ex.rootIndex === 3 && (
                                    <text x={190} y={145} textAnchor="middle" className="text-xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {ex.rootIndex}
                                    </text>
                                )}
                                <text x={295} y={170} textAnchor="middle" className="text-4xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.radicand}
                                </text>
                                <text x={390} y={170} textAnchor="start" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    = {ex.root}
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show power calculation */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text x={300} y={100} textAnchor="middle" className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    Luego elevamos al exponente:
                                </text>
                                <text x={300} y={155} textAnchor="middle" className="text-6xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.root}
                                    <tspan className="text-4xl" dy="-25" dx="5">{ex.power}</tspan>
                                </text>
                                <text
                                    x={300}
                                    y={210}
                                    textAnchor="middle"
                                    className="text-2xl font-semibold fill-slate-500 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {ex.root} × {ex.root}{ex.power === 3 ? ` × ${ex.root}` : ''} = {ex.result}
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show final simplification */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <text x={100} y={125} textAnchor="end" className="text-4xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    (
                                </text>
                                <path
                                    d="M 110 135 L 125 155 L 140 85 L 240 85"
                                    className="stroke-purple-600 dark:stroke-purple-400 fill-none"
                                    strokeWidth={3}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {ex.rootIndex === 3 && (
                                    <text x={100} y={105} textAnchor="middle" className="text-xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        {ex.rootIndex}
                                    </text>
                                )}
                                <text x={190} y={125} textAnchor="middle" className="text-3xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    {ex.radicand}
                                </text>
                                <text x={250} y={125} textAnchor="start" className="text-4xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    )
                                    <tspan className="text-2xl" dy="-15" dx="3">{ex.power}</tspan>
                                </text>
                                <text x={315} y={125} textAnchor="start" className="text-5xl font-black fill-purple-600 dark:fill-purple-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    = {ex.result}
                                </text>
                                
                                <text
                                    x={300}
                                    y={185}
                                    textAnchor="middle"
                                    className="text-xl font-semibold fill-emerald-600 dark:fill-emerald-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ✓ Cuando índice = exponente, se simplifican
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-1">Propiedad</h4>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        (<sup>n</sup>√a)<sup>n</sup> = a
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `Cuando elevamos una raíz a su mismo índice, obtenemos el radicando`}
                    {step === 1 && `La raíz ${ex.rootIndex === 3 ? 'cúbica' : 'cuadrada'} de ${ex.radicand} es ${ex.root}`}
                    {step === 2 && `Ahora elevamos ${ex.root} a la potencia ${ex.power}`}
                    {step === 3 && `Se simplifican mutuamente: (${ex.rootIndex === 3 ? '³' : ''}√${ex.radicand})${ex.power === 3 ? '³' : '²'} = ${ex.result}`}
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
