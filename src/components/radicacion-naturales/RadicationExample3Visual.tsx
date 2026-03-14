"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Math } from "@/components/ui/math"

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
                                <foreignObject x="0" y="50" width="600" height="150" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full">
                                        <div className="text-7xl fill-purple-600 text-purple-600 dark:text-purple-400 font-black">
                                            <Math math="\sqrt[5]{32}" />
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
                                            <Math math="\sqrt[5]{32}" />
                                        </div>
                                    </div>
                                </foreignObject>
                                <foreignObject x="0" y="120" width="600" height="120" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full gap-2">
                                        {Array.from({length: 5}).map((_, i) => (
                                            <React.Fragment key={i}>
                                                <div className="w-12 h-12 border-4 border-dashed border-purple-400 dark:border-purple-600 rounded-lg flex items-center justify-center bg-purple-50 dark:bg-purple-900/20">
                                                    <span className="text-2xl text-purple-400/50 dark:text-purple-500/50">?</span>
                                                </div>
                                                {i < 4 && <span className="text-2xl font-black text-slate-400 dark:text-zinc-500">×</span>}
                                            </React.Fragment>
                                        ))}
                                        <span className="text-3xl font-black text-purple-600 dark:text-purple-400 ml-2">= 32</span>
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="text-sm font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">5 pasos multiplicativos indica el índice</span>
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
                                            <Math math="\sqrt[5]{32}" />
                                        </div>
                                    </div>
                                </foreignObject>
                                <foreignObject x="0" y="120" width="600" height="120" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full gap-2">
                                        {Array.from({length: 5}).map((_, i) => (
                                            <React.Fragment key={i}>
                                                <div className="w-12 h-12 border-4 border-solid border-purple-600 dark:border-purple-400 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-900/50 shadow-sm animate-in zoom-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
                                                    <span className="text-3xl font-black text-purple-700 dark:text-purple-300">2</span>
                                                </div>
                                                {i < 4 && <span className="text-2xl font-black text-slate-600 dark:text-zinc-400">×</span>}
                                            </React.Fragment>
                                        ))}
                                        <span className="text-3xl font-black text-purple-600 dark:text-purple-400 ml-2">= 32</span>
                                    </div>
                                </foreignObject>
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
                                <foreignObject x="0" y="50" width="600" height="150" className="overflow-visible">
                                    <div className="flex justify-center items-center h-full w-full">
                                        <div className="text-5xl fill-purple-600 text-purple-600 dark:text-purple-400 font-black">
                                            <Math math="\sqrt[5]{32} = 2" />
                                        </div>
                                    </div>
                                </foreignObject>
                                
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
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center min-h-[60px] flex items-center justify-center">
                    {step === 0 && <span className="flex items-center justify-center gap-2">La raíz quinta (<Math math="\sqrt[5]{\phantom{x}}" />) busca un número que multiplicado 5 veces dé el radicando</span>}
                    {step === 1 && "Como el índice es 5, buscamos un número que multiplicado por sí mismo 5 veces dé 32."}
                    {step === 2 && "¡El número es 2! Verificamos: 2 × 2 × 2 × 2 × 2 = 32"}
                    {step === 3 && "Vemos cómo 2 se duplica sucesivamente hasta llegar a 32"}
                    {step === 4 && <span className="flex items-center justify-center gap-2"><Math math="\sqrt[5]{32} = 2" />, confirmado por el proceso de multiplicación repetida</span>}
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
