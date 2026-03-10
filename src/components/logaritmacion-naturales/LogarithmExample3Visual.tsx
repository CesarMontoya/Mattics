"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function LogarithmExample3Visual() {
    const [step, setStep] = useState(0)
    const base = 5
    const argument = 125
    const result = 3

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1)
        } else {
            setStep(0)
        }
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 w-full min-h-[250px] flex items-center justify-center bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-inner relative overflow-hidden">
                    <svg viewBox="0 0 400 200" className="w-full h-full font-quicksand">
                        {step === 0 && (
                            <text x="200" y="100" textAnchor="middle" className="text-5xl font-black fill-orange-600 dark:fill-orange-400 animate-in fade-in zoom-in">
                                log<tspan className="text-2xl" dy="10">5</tspan><tspan dy="-10" dx="5">125</tspan>
                            </text>
                        )}
                        
                        {(step >= 1 && step <= 2) && (
                            <g className="animate-in fade-in duration-300">
                                <g transform="translate(200, 80)">
                                    {/* Circles representing factors */}
                                    <circle cx="-100" cy="0" r="30" className="fill-orange-100 stroke-orange-500" />
                                    <text x="-100" y="8" textAnchor="middle" className="text-xl font-bold fill-orange-700">5</text>
                                    
                                    <text x="-50" y="5" textAnchor="middle" className="text-2xl font-bold fill-slate-300">×</text>
                                    
                                    <circle cx="0" cy="0" r="30" className={cn("transition-all", step >= 1 ? "fill-orange-100 stroke-orange-500" : "fill-slate-50 stroke-slate-200")} />
                                    <text x="0" y="8" textAnchor="middle" className={cn("text-xl font-bold", step >= 1 ? "fill-orange-700" : "fill-slate-300")}>5</text>
                                    
                                    <text x="50" y="5" textAnchor="middle" className={cn("text-2xl font-bold transition-all", step >= 2 ? "fill-slate-300" : "fill-slate-50")}>×</text>
                                    
                                    <circle cx="100" cy="0" r="30" className={cn("transition-all", step >= 2 ? "fill-orange-100 stroke-orange-500" : "fill-slate-50 stroke-slate-100")} />
                                    <text x="100" y="8" textAnchor="middle" className={cn("text-xl font-bold", step >= 2 ? "fill-orange-700" : "fill-slate-200")}>5</text>
                                </g>
                                
                                <g transform="translate(200, 160)">
                                    <text x="0" y="0" textAnchor="middle" className="text-5xl font-black fill-orange-600">
                                        {step === 1 && "25"}
                                        {step === 2 && "125"}
                                    </text>
                                    <text x="0" y="-35" textAnchor="middle" className="text-sm font-bold text-slate-400 uppercase tracking-widest">Resultado parcial</text>
                                </g>
                            </g>
                        )}

                        {step === 3 && (
                            <g className="animate-in zoom-in duration-500">
                                <path d="M 100 100 Q 200 20 300 100" fill="none" className="stroke-orange-500 stroke-[4]" strokeDasharray="10 5" />
                                <text x="200" y="110" textAnchor="middle" className="text-3xl font-bold fill-slate-500">Pasos:</text>
                                <text x="200" y="180" textAnchor="middle" className="text-8xl font-black fill-orange-600">3</text>
                            </g>
                        )}
                    </svg>
                </div>
                
                <div className="flex-1 space-y-4">
                    <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider">
                        Ejemplo 3
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Logaritmo en base 5</h4>
                    <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                        {step === 0 && "¿Cuántas veces multiplicamos el 5 para llegar a 125?"}
                        {step === 1 && "Dos veces: 5 × 5 = 25. ¡Todavía falta!"}
                        {step === 2 && "Tres veces: 25 × 5 = 125. ¡Llegamos!"}
                        {step === 3 && "Como multiplicamos el 5 un total de 3 veces, log₅(125) = 3."}
                    </p>
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-all shadow-md shadow-orange-100 dark:shadow-none"
                    >
                        {step === 3 ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {step === 3 ? "Reiniciar" : "Siguiente paso"}
                    </button>
                </div>
            </div>
        </div>
    )
}
