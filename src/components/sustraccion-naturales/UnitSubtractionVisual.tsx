"use client"

import React, { useState } from 'react'
import { RotateCcw, Check, AlertCircle, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"

export function UnitSubtractionVisual() {
    const initialUnits = 8
    const subtractAmount = 3
    const [selectedIndices, setSelectedIndices] = useState<number[]>([])
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" })
    const [isConfirmed, setIsConfirmed] = useState(false)

    const toggleUnit = (index: number) => {
        if (isConfirmed) return
        setSelectedIndices(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index) 
                : [...prev, index]
        )
        setFeedback({ type: null, message: "" })
    }

    const checkAnswer = () => {
        if (selectedIndices.length === subtractAmount) {
            setFeedback({ type: 'success', message: "¡Excelente! Has quitado la cantidad correcta." })
            setIsConfirmed(true)
        } else {
            setFeedback({ 
                type: 'error', 
                message: `Cuidado, seleccionaste ${selectedIndices.length} unidades. Debes quitar exactamente ${subtractAmount}.` 
            })
        }
    }

    const reset = () => {
        setSelectedIndices([])
        setFeedback({ type: null, message: "" })
        setIsConfirmed(false)
    }

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-50 dark:border-zinc-800 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Actividad: Restando Unidades</h3>
                    <p className="text-slate-500 dark:text-zinc-400">Selecciona las unidades que quieres quitar (haz clic sobre ellas).</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">8 - {subtractAmount} = ?</span>
                </div>
            </div>

            <div className="relative w-full overflow-visible min-h-[140px] flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-6 p-4">
                    {Array.from({ length: initialUnits }).map((_, i) => {
                        const isSelected = selectedIndices.includes(i)
                        
                        return (
                            <button
                                key={i}
                                onClick={() => toggleUnit(i)}
                                disabled={isConfirmed}
                                className={cn(
                                    "relative w-12 h-12 rounded-full transition-all duration-300 transform active:scale-90 flex items-center justify-center group",
                                    isSelected 
                                        ? "bg-rose-100 border-rose-500 border-2 scale-90" 
                                        : "bg-blue-500 hover:bg-blue-600 border-transparent border-2 shadow-lg shadow-blue-200 dark:shadow-none"
                                )}
                            >
                                <div className={cn(
                                    "w-3 h-3 rounded-full transition-all",
                                    isSelected ? "bg-rose-500 scale-150" : "bg-white"
                                )} />
                                
                                {isSelected && (
                                    <Trash2 className="absolute -top-1 -right-1 h-5 w-5 text-rose-600 bg-white rounded-full p-0.5 border border-rose-200 animate-in zoom-in" />
                                )}
                                
                                {isConfirmed && isSelected && (
                                    <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 rounded-full flex items-center justify-center animate-out fade-out zoom-out duration-1000 fill-mode-forwards">
                                        <Trash2 className="h-6 w-6 text-rose-500" />
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Feedback Message */}
                {feedback.type && (
                    <div className={cn(
                        "mt-4 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2",
                        feedback.type === 'success' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                    )}>
                        {feedback.type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                        <span className="font-semibold">{feedback.message}</span>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {!isConfirmed ? (
                    <button
                        onClick={checkAnswer}
                        disabled={selectedIndices.length === 0}
                        className={cn(
                            "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95 shadow-lg",
                            selectedIndices.length > 0 
                                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200" 
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        )}
                    >
                        <Check className="h-5 w-5" /> Comprobar Resta
                    </button>
                ) : (
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-8 py-3 bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200 rounded-full font-bold transition-all active:scale-95"
                    >
                        <RotateCcw className="h-5 w-5" /> Intentar de nuevo
                    </button>
                )}
            </div>
        </div>
    )
}
