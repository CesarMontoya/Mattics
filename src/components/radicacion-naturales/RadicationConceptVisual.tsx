"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Math } from "@/components/ui/math"

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
                                <foreignObject x="0" y="50" width="600" height="150" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full">
                                        <div className="text-7xl fill-purple-600 text-purple-600 dark:text-purple-400 font-black">
                                            <Math math={`\\sqrt[${index}]{${radicand}}`} />
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
                                            <Math math={`\\sqrt[${index}]{${radicand}}`} />
                                        </div>
                                    </div>
                                </foreignObject>
                                <foreignObject x="0" y="120" width="600" height="120" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full gap-4">
                                        {Array.from({length: index}).map((_, i) => (
                                            <React.Fragment key={i}>
                                                <div className="w-16 h-16 border-4 border-dashed border-purple-400 dark:border-purple-600 rounded-xl flex items-center justify-center bg-purple-50 dark:bg-purple-900/20">
                                                    <span className="text-3xl text-purple-400/50 dark:text-purple-500/50">?</span>
                                                </div>
                                                {i < index - 1 && <span className="text-3xl font-black text-slate-400 dark:text-zinc-500">×</span>}
                                            </React.Fragment>
                                        ))}
                                        <span className="text-4xl font-black text-purple-600 dark:text-purple-400 ml-2">= {radicand}</span>
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="text-sm font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{index} pasos multiplicativos indica el índice</span>
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
                                            <Math math={`\\sqrt[${index}]{${radicand}}`} />
                                        </div>
                                    </div>
                                </foreignObject>
                                <foreignObject x="0" y="120" width="600" height="120" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full gap-4">
                                        {Array.from({length: index}).map((_, i) => (
                                            <React.Fragment key={i}>
                                                <div className="w-16 h-16 border-4 border-solid border-purple-600 dark:border-purple-400 rounded-xl flex items-center justify-center bg-purple-100 dark:bg-purple-900/50 shadow-sm animate-in zoom-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
                                                    <span className="text-4xl font-black text-purple-700 dark:text-purple-300">{result}</span>
                                                </div>
                                                {i < index - 1 && <span className="text-3xl font-black text-slate-600 dark:text-zinc-400">×</span>}
                                            </React.Fragment>
                                        ))}
                                        <span className="text-4xl font-black text-purple-600 dark:text-purple-400 ml-2">= {radicand}</span>
                                    </div>
                                </foreignObject>
                            </g>
                        )}

                        {/* Step 3: Show final result */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <foreignObject x="0" y="50" width="400" height="150" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full pl-8">
                                        <div className="text-6xl fill-purple-600 text-purple-600 dark:text-purple-400 font-black">
                                            <Math math={`\\sqrt[${index}]{${radicand}} = ${result}`} />
                                        </div>
                                    </div>
                                </foreignObject>
                                
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
                        {step === 1 && "Buscar el factor"}
                        {step === 2 && "Verificar"}
                        {step === 3 && "Resultado final"}
                    </p>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center min-h-[60px] flex items-center justify-center">
                    {step === 0 && <span className="flex items-center justify-center gap-2"><Math math={`\\sqrt[3]{${radicand}}`} /> se lee "raíz cúbica de {radicand}"</span>}
                    {step === 1 && `Como el índice es ${index}, buscamos un número que multiplicado por sí mismo ${index} veces dé ${radicand}.`}
                    {step === 2 && `¡El número es ${result}! Verificamos: ${result} × ${result} × ${result} = ${radicand}`}
                    {step === 3 && `Por lo tanto, la raíz de la operación es ${result}`}
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
