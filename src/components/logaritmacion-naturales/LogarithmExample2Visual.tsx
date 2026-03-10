"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function LogarithmExample2Visual() {
    const [step, setStep] = useState(0)
    const base = 2
    const argument = 16
    const result = 4

    const handleNext = () => {
        if (step < 4) {
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
                            <text x="200" y="100" textAnchor="middle" className="text-5xl font-black fill-purple-600 dark:fill-purple-400 animate-in fade-in zoom-in">
                                log<tspan className="text-2xl" dy="10">2</tspan><tspan dy="-10" dx="5">16</tspan>
                            </text>
                        )}
                        
                        {(step >= 1 && step <= 3) && (
                            <g className="animate-in fade-in duration-300">
                                <text x="200" y="50" textAnchor="middle" className="text-xl font-bold fill-slate-400">Multiplicando el 2:</text>
                                <g transform="translate(100, 100)">
                                    <text x="0" y="0" textAnchor="middle" className={cn("text-3xl font-black transition-all", step >= 1 ? "fill-purple-600" : "fill-slate-200")}>2</text>
                                    <text x="40" y="0" textAnchor="middle" className={cn("text-xl font-bold transition-all", step >= 2 ? "fill-slate-400" : "fill-slate-100")}>×</text>
                                    <text x="80" y="0" textAnchor="middle" className={cn("text-3xl font-black transition-all", step >= 2 ? "fill-purple-600" : "fill-slate-200")}>2</text>
                                    <text x="120" y="0" textAnchor="middle" className={cn("text-xl font-bold transition-all", step >= 3 ? "fill-slate-400" : "fill-slate-100")}>×</text>
                                    <text x="160" y="0" textAnchor="middle" className={cn("text-3xl font-black transition-all", step >= 3 ? "fill-purple-600" : "fill-slate-200")}>2</text>
                                    <text x="200" y="0" textAnchor="middle" className={cn("text-xl font-bold transition-all", step >= 4 ? "fill-slate-400" : "fill-slate-100")}>×</text>
                                    <text x="240" y="0" textAnchor="middle" className={cn("text-3xl font-black transition-all", step >= 4 ? "fill-purple-600" : "fill-slate-200")}>2</text>
                                </g>
                                <g transform="translate(200, 150)">
                                    <text x="0" y="0" textAnchor="middle" className="text-2xl font-bold fill-slate-300">=</text>
                                    <text x="0" y="40" textAnchor="middle" className="text-4xl font-black fill-purple-600 animate-bounce">
                                        {step === 1 && "2"}
                                        {step === 2 && "4"}
                                        {step === 3 && "8"}
                                        {step === 4 && "16"}
                                    </text>
                                </g>
                            </g>
                        )}

                        {step === 4 && (
                            <g className="animate-in zoom-in duration-500">
                                <rect x="50" y="40" width="300" height="120" rx="20" className="fill-purple-500/10 stroke-purple-500" strokeWidth="2" strokeDasharray="8 4" />
                                <text x="200" y="85" textAnchor="middle" className="text-2xl font-bold fill-slate-500">Resultado</text>
                                <text x="200" y="140" textAnchor="middle" className="text-8xl font-black fill-purple-600">4</text>
                            </g>
                        )}
                    </svg>
                </div>
                
                <div className="flex-1 space-y-4">
                    <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold rounded-full uppercase tracking-wider">
                        Paso {step} de 4
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Logaritmo en base 2 de 16</h4>
                    <p className="text-slate-600 dark:text-zinc-400 leading-relaxed h-20">
                        {step === 0 && "Calcularemos log₂(16). ¿Cuántos 2 necesitamos multiplicar para llegar al 16?"}
                        {step === 1 && "Paso 1: Tenemos 2."}
                        {step === 2 && "Paso 2: 2 × 2 = 4."}
                        {step === 3 && "Paso 3: 4 × 2 = 8."}
                        {step === 4 && "Paso 4: 8 × 2 = 16. ¡Llegamos en 4 pasos!"}
                    </p>
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all shadow-md shadow-purple-100 dark:shadow-none"
                    >
                        {step === 4 ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {step === 4 ? "Reiniciar" : "Multiplicar de nuevo"}
                    </button>
                </div>
            </div>
        </div>
    )
}
