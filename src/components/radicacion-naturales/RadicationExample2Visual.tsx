"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Math } from "@/components/ui/math"

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
                                <foreignObject x="0" y="50" width="600" height="150" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full">
                                        <div className="text-7xl fill-purple-600 text-purple-600 dark:text-purple-400 font-black">
                                            <Math math="\sqrt[4]{81}" />
                                        </div>
                                    </div>
                                </foreignObject>
                            </g>
                        )}

                        {/* Step 1: Empty boxes */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <foreignObject x="0" y="20" width="600" height="80" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full">
                                        <div className="text-4xl fill-purple-600 text-purple-600 dark:text-purple-400 font-black">
                                            <Math math="\sqrt[4]{81}" />
                                        </div>
                                    </div>
                                </foreignObject>
                                <foreignObject x="0" y="120" width="600" height="120" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full gap-4">
                                        {Array.from({length: 4}).map((_, i) => (
                                            <React.Fragment key={i}>
                                                <div className="w-16 h-16 border-4 border-dashed border-purple-400 dark:border-purple-600 rounded-xl flex items-center justify-center bg-purple-50 dark:bg-purple-900/20">
                                                    <span className="text-3xl text-purple-400/50 dark:text-purple-500/50">?</span>
                                                </div>
                                                {i < 3 && <span className="text-3xl font-black text-slate-400 dark:text-zinc-500">×</span>}
                                            </React.Fragment>
                                        ))}
                                        <span className="text-4xl font-black text-purple-600 dark:text-purple-400 ml-2">= 81</span>
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="text-sm font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">4 pasos multiplicativos indica el índice</span>
                                    </div>
                                </foreignObject>
                            </g>
                        )}

                        {/* Step 2: Filled boxes */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <foreignObject x="0" y="20" width="600" height="80" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full">
                                        <div className="text-4xl fill-purple-600 text-purple-600 dark:text-purple-400 font-black">
                                            <Math math="\sqrt[4]{81}" />
                                        </div>
                                    </div>
                                </foreignObject>
                                <foreignObject x="0" y="120" width="600" height="120" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full gap-4">
                                        {Array.from({length: 4}).map((_, i) => (
                                            <React.Fragment key={i}>
                                                <div className="w-16 h-16 border-4 border-solid border-purple-600 dark:border-purple-400 rounded-xl flex items-center justify-center bg-purple-100 dark:bg-purple-900/50 shadow-sm animate-in zoom-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
                                                    <span className="text-4xl font-black text-purple-700 dark:text-purple-300">3</span>
                                                </div>
                                                {i < 3 && <span className="text-3xl font-black text-slate-600 dark:text-zinc-400">×</span>}
                                            </React.Fragment>
                                        ))}
                                        <span className="text-4xl font-black text-purple-600 dark:text-purple-400 ml-2">= 81</span>
                                    </div>
                                </foreignObject>
                            </g>
                        )}

                        {/* Step 3: Show result */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <foreignObject x="0" y="50" width="350" height="150" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full pl-8">
                                        <div className="text-5xl fill-purple-600 text-purple-600 dark:text-purple-400 font-black">
                                            <Math math="\sqrt[4]{81} = 3" />
                                        </div>
                                    </div>
                                </foreignObject>
                                
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
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center min-h-[60px] flex items-center justify-center">
                    {step === 0 && <span className="flex items-center justify-center gap-2">La raíz cuarta (<Math math="\sqrt[4]{\phantom{x}}" />) busca un número que multiplicado 4 veces dé el radicando</span>}
                    {step === 1 && "Como el índice es 4, buscamos un número que multiplicado por sí mismo 4 veces dé 81."}
                    {step === 2 && "¡El número es 3! Verificamos: 3 × 3 × 3 × 3 = 81"}
                    {step === 3 && <span className="flex items-center justify-center gap-2"><Math math="\sqrt[4]{81} = 3" />, porque 3 multiplicado 4 veces nos lleva a 81</span>}
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
