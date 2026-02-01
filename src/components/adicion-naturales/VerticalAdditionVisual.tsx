"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Plus, RotateCcw, ArrowRight, ArrowLeft, Sparkles, Keyboard } from 'lucide-react'
import { cn } from "@/lib/utils"

export function VerticalAdditionVisual() {
    const [step, setStep] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)
    
    // States for each step to allow backtracking
    const states = [
        { // Step 0: Initial
            values: { U: 58, D: 35, C: 16, UM: 1 },
            carries: { D: 0, C: 0, UM: 0 },
            result: { U: null, D: null, C: null, UM: null },
            message: "Presiona 'Siguiente' o usa → para comenzar."
        },
        { // Step 1: Units processed
            values: { U: 8, D: 35, C: 16, UM: 1 },
            carries: { D: 5, C: 0, UM: 0 },
            result: { U: 8, D: null, C: null, UM: null },
            message: "Agrupando las 58 unidades: se forman 5 decenas y sobran 8 unidades."
        },
        { // Step 2: Carry added to tens
            values: { U: 8, D: 40, C: 16, UM: 1 },
            carries: { D: 0, C: 0, UM: 0 },
            result: { U: 8, D: null, C: null, UM: null },
            message: "Sumamos las 5 decenas que llevamos a las 35 que ya teníamos (35 + 5 = 40)."
        },
        { // Step 3: Tens processed
            values: { U: 8, D: 0, C: 16, UM: 1 },
            carries: { D: 0, C: 1, UM: 0 },
            result: { U: 8, D: 0, C: null, UM: null },
            message: "Agrupando las 10 decenas (5+5): se forma 1 centena y sobran 0 decenas (el 3 de las 35 decenas sigue ahí)."
        },
        { // Step 4: Summing hundreds column
            values: { U: 8, D: 0, C: 20, UM: 1 },
            carries: { D: 0, C: 1, UM: 0 },
            result: { U: 8, D: 0, C: null, UM: null },
            message: "En las centenas sumamos: 1 (que llevamos) + 6 (de 16) + 3 (de 35) = 10."
        },
        { // Step 5: Hundreds processed
            values: { U: 8, D: 0, C: 0, UM: 1 },
            carries: { D: 0, C: 0, UM: 1 },
            result: { U: 8, D: 0, C: 0, UM: null },
            message: "De las 10 centenas, se forma 1 unidad de mil y sobran 0 centenas."
        },
        { // Step 6: Final sum of thousands
            values: { U: 8, D: 0, C: 0, UM: 3 },
            carries: { D: 0, C: 0, UM: 1 },
            result: { U: 8, D: 0, C: 0, UM: 3 },
            message: "Finalmente sumamos 1 (que llevamos) + 1 (de 16) + 1 (inicial) = 3."
        },
        { // Step 7: Finish
            values: { U: 8, D: 0, C: 0, UM: 3 },
            carries: { D: 0, C: 0, UM: 0 },
            result: { U: 8, D: 0, C: 0, UM: 3 },
            message: "¡Suma completada! El resultado final es 3.008"
        }
    ]

    const currentState = states[step]

    const nextStep = useCallback(() => {
        if (step < 7) setStep(prev => prev + 1)
    }, [step])

    const prevStep = useCallback(() => {
        if (step > 0) setStep(prev => prev - 1)
    }, [step])

    const reset = () => {
        setStep(0)
    }

    // Keyboard listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextStep()
            if (e.key === 'ArrowLeft') prevStep()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [nextStep, prevStep])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-8 p-6 md:p-10 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-2xl overflow-visible">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 dark:border-zinc-800 pb-6">
                    <div className="space-y-1">
                        <p className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                            {step < 7 && <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-sm">{step + 1}</span>}
                            {currentState.message}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={reset}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 dark:bg-zinc-800 dark:text-zinc-300 rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" /> Reiniciar
                        </button>
                        
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
                            <button
                                onClick={prevStep}
                                disabled={step === 0}
                                title="Paso anterior (Flecha izquierda)"
                                className="flex items-center justify-center h-9 w-9 text-slate-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-all disabled:opacity-30 active:scale-90"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextStep}
                                disabled={step === 7}
                                title="Siguiente paso (Flecha derecha)"
                                className="flex items-center gap-2 px-4 h-9 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-30 active:scale-95"
                            >
                                <span>Siguiente</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* COLUMNA IZQUIERDA: Figuras Visuales */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs uppercase tracking-widest font-black text-slate-400">Representación Visual</h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            {/* Unidades */}
                            <div className={cn(
                                "p-4 rounded-2xl border-2 transition-all duration-300",
                                step === 0 ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/20" : "border-transparent bg-slate-50 dark:bg-zinc-800/50"
                            )}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-blue-600">UNIDADES</span>
                                    <span className="text-lg font-black">{currentState.values.U}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 relative">
                                    {Array.from({ length: currentState.values.U }).map((_, i) => (
                                        <div key={i} className="w-3 h-3 rounded-full bg-blue-500 shadow-sm animate-in zoom-in-50" />
                                    ))}
                                </div>
                            </div>

                            {/* Decenas */}
                            <div className={cn(
                                "p-4 rounded-2xl border-2 transition-all duration-300",
                                (step === 1 || step === 2) ? "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20" : "border-transparent bg-slate-50 dark:bg-zinc-800/50"
                            )}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-emerald-600">DECENAS</span>
                                    <span className="text-lg font-black">{currentState.values.D}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {Array.from({ length: currentState.values.D }).map((_, i) => (
                                        <div key={i} className="w-4 h-4 rounded-sm bg-emerald-500 shadow-sm animate-in zoom-in-50" />
                                    ))}
                                </div>
                            </div>

                            {/* Centenas */}
                            <div className={cn(
                                "p-4 rounded-2xl border-2 transition-all duration-300",
                                (step === 3 || step === 4) ? "border-amber-400 bg-amber-50/50 dark:bg-amber-900/20" : "border-transparent bg-slate-50 dark:bg-zinc-800/50"
                            )}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-amber-600">CENTENAS</span>
                                    <span className="text-lg font-black">{currentState.values.C}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: currentState.values.C }).map((_, i) => (
                                        <div key={i} className="w-6 h-6 rounded-md bg-amber-400 shadow-sm animate-in zoom-in-50" />
                                    ))}
                                </div>
                            </div>

                            {/* Unidades de Mil */}
                            <div className={cn(
                                "p-4 rounded-2xl border-2 transition-all duration-700 flex flex-col min-h-[160px]",
                                (step === 5 || step === 6) ? "border-purple-400 bg-purple-50/50 dark:bg-purple-900/20" : "border-transparent bg-slate-50 dark:bg-zinc-800/50"
                            )}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-purple-600">UNID. MIL</span>
                                    <span className="text-lg font-black">{currentState.values.UM}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 transition-all duration-700">
                                    {Array.from({ length: currentState.values.UM }).map((_, i) => (
                                        <div key={i} className="w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-700 rotate-45 border-2 border-purple-300 shadow-md animate-in zoom-in-50" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Indicador de Estado */}
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700">
                            <div className="flex -space-x-1.5 flex-1">
                                {[...Array(8)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={cn(
                                            "h-2 flex-1 rounded-full border border-white dark:border-zinc-900 transition-all",
                                            i < step ? "bg-indigo-500" : i === step ? "bg-indigo-300 animate-pulse" : "bg-slate-200 dark:bg-zinc-700"
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Paso {step + 1} / 8</span>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Algoritmo de la Suma */}
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-50 dark:bg-zinc-950/40 rounded-3xl p-8 border border-slate-100 dark:border-zinc-800 shadow-inner">
                        <h4 className="text-xs uppercase tracking-widest font-black text-slate-400 mb-8 self-start">Algoritmo Vertical</h4>
                        
                        <div className="relative font-mono text-5xl md:text-6xl font-bold flex flex-col items-end gap-2 text-slate-700 dark:text-zinc-200">
                            
                            {/* Carries (Llevamos) - Fixed width slots for alignment */}
                            <div className="flex gap-4 md:gap-8 mb-2 min-h-[60px] items-end">
                                <div className={cn("w-12 flex justify-center text-2xl text-purple-500 transition-all duration-500", currentState.carries.UM > 0 ? "opacity-100 translate-y-0 scale-110" : "opacity-0 translate-y-4 scale-50")}>{currentState.carries.UM}</div>
                                <div className={cn("w-12 flex justify-center text-2xl text-amber-500 transition-all duration-500", currentState.carries.C > 0 ? "opacity-100 translate-y-0 scale-110" : "opacity-0 translate-y-4 scale-50")}>{currentState.carries.C}</div>
                                <div className={cn("w-12 flex justify-center text-2xl text-emerald-500 transition-all duration-500", (currentState.carries.D > 0 && step !== 1) ? "opacity-100 translate-y-0 scale-110" : "opacity-0 translate-y-4 scale-50")}>{currentState.carries.D}</div>
                                <div className="w-12"></div>
                            </div>

                            {/* Numbers to sum - Using w-12 for each slot */}
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex gap-4 md:gap-8">
                                    <span className={cn(
                                        "w-12 text-center transition-colors duration-500",
                                        step >= 6 ? "text-purple-500 font-bold" : "text-slate-300 dark:text-zinc-700"
                                    )}>1</span>
                                    <span className="w-12 text-center text-slate-300 dark:text-zinc-700">0</span>
                                    <span className="w-12 text-center text-slate-300 dark:text-zinc-700">0</span>
                                    <span className="w-12 text-center text-slate-300 dark:text-zinc-700">0</span>
                                </div>
                                <div className="flex gap-4 md:gap-8">
                                    <span className={cn(
                                        "w-12 text-center transition-colors duration-500",
                                        step >= 6 ? "text-purple-500 font-bold" : "text-slate-300 dark:text-zinc-700"
                                    )}>1</span>
                                    <span className="w-12 text-center text-amber-500">6</span>
                                    <span className="w-12 text-center text-slate-300 dark:text-zinc-700">0</span>
                                    <span className="w-12 text-center text-slate-300 dark:text-zinc-700">0</span>
                                </div>
                                <div className="flex gap-4 md:gap-8">
                                    <span className="w-12 invisible">0</span>
                                    <span className={cn(
                                        "w-12 text-center transition-colors duration-500",
                                        step >= 4 ? "text-emerald-500 font-bold" : "text-slate-300 dark:text-zinc-700"
                                    )}>3</span>
                                    <span className="w-12 text-center text-emerald-500">5</span>
                                    <span className="w-12 text-center text-slate-300 dark:text-zinc-700">0</span>
                                </div>
                                <div className="flex gap-4 md:gap-8 relative">
                                    <Plus className="absolute -left-12 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400" />
                                    <span className="w-12 invisible">0</span>
                                    <span className="w-12 invisible">0</span>
                                    <span className={cn(
                                        "w-12 text-center transition-colors duration-500",
                                        step >= 1 ? "text-blue-500 font-bold" : "text-slate-300 dark:text-zinc-700"
                                    )}>5</span>
                                    <span className="w-12 text-center text-blue-500">8</span>
                                </div>
                            </div>

                            {/* Sum Line */}
                            <div className="w-full h-1.5 bg-slate-800 dark:bg-zinc-200 rounded-full my-2" />

                            {/* Result */}
                            <div className="flex gap-4 md:gap-8 min-h-[70px]">
                                <span className={cn("w-12 text-center transition-all duration-700", currentState.result.UM !== null ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 -translate-y-4 text-slate-100 dark:text-zinc-800")}>{currentState.result.UM ?? 0}</span>
                                <span className={cn("w-12 text-center transition-all duration-700", currentState.result.C !== null ? "opacity-100 scale-100 translate-y-0 text-amber-500" : "opacity-0 scale-50 -translate-y-4 text-slate-100 dark:text-zinc-800")}>{currentState.result.C ?? 0}</span>
                                <span className={cn("w-12 text-center transition-all duration-700", currentState.result.D !== null ? "opacity-100 scale-100 translate-y-0 text-emerald-500" : "opacity-0 scale-50 -translate-y-4 text-slate-100 dark:text-zinc-800")}>{currentState.result.D ?? 0}</span>
                                <span className={cn("w-12 text-center transition-all duration-700", currentState.result.U !== null ? "opacity-100 scale-100 translate-y-0 text-blue-500" : "opacity-0 scale-50 -translate-y-4 text-slate-100 dark:text-zinc-800")}>{currentState.result.U ?? 0}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Final message for result */}
            {step === 7 && (
                <div className="p-8 rounded-3xl bg-emerald-500 text-white flex flex-col items-center gap-4 animate-in slide-in-from-bottom-10 duration-700 shadow-xl shadow-emerald-200 dark:shadow-none">
                    <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">¡Operación Completada!</h3>
                    <p className="text-lg opacity-90 font-medium text-center max-w-md">
                        Has seguido todos los pasos del algoritmo. Recuerda: agrupar 10 es lo mismo que llevar 1 al siguiente nivel.
                    </p>
                    <div className="text-5xl font-mono font-bold tracking-widest mt-2 bg-white/10 px-8 py-4 rounded-2xl border border-white/20">
                        3.008
                    </div>
                </div>
            )}
        </div>
    )
}
