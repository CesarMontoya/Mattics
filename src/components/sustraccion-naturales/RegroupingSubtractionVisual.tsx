"use client"

import React, { useState } from 'react'
import { RotateCcw, Check, AlertCircle, Trash2, Hammer } from 'lucide-react'
import { cn } from "@/lib/utils"

export function RegroupingSubtractionVisual() {
    const [isBroken, setIsBroken] = useState(false)
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]) // Indices of tens to remove
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" })

    const totalInitialTens = 3
    const subtractAmount = 5 // 5 decenas (50)
    const transformedTens = 10
    
    // Total available tens after breaking the hundred: 10 + 3 = 13
    const totalAvailable = isBroken ? (transformedTens + totalInitialTens) : totalInitialTens

    const toggleTen = (index: number) => {
        if (isConfirmed || !isBroken) return
        setSelectedIndices(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index) 
                : [...prev, index]
        )
        setFeedback({ type: null, message: "" })
    }

    const checkAnswer = () => {
        if (selectedIndices.length === subtractAmount) {
            setFeedback({ type: 'success', message: "¡Perfecto! Has roto la centena y quitado 5 decenas." })
            setIsConfirmed(true)
        } else {
            setFeedback({ 
                type: 'error', 
                message: isBroken 
                    ? `Seleccionaste ${selectedIndices.length} decenas. Debes quitar exactamente 5.` 
                    : "¡Primero debes romper la centena para tener suficientes decenas!"
            })
        }
    }

    const reset = () => {
        setIsBroken(false)
        setSelectedIndices([])
        setIsConfirmed(false)
        setFeedback({ type: null, message: "" })
    }

    // SVG Hammer cursor data URL
    const hammerCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m15 5 4 4'/><path d='M21.5 12 12 21.5'/><path d='m14.09 6.11 3.8 3.8'/><path d='M10.5 7.5 4.5 1.5'/><path d='M3 5c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5Z'/></svg>") 16 16, auto`

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-50 dark:border-zinc-800 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 italic">"Quita 5 decenas. Rompe las centenas en decenas"</h3>
                    <p className="text-slate-500 dark:text-zinc-400">
                        {isBroken ? "Ahora quita las 5 decenas" : "Haz clic en el bloque de 100 para romperlo."}
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800">
                    <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
                        130 - 50 = {isConfirmed ? "80" : "?"}
                    </span>
                </div>
            </div>

            <div className="relative w-full overflow-visible min-h-[300px] flex flex-col items-center justify-center">
                <div className="flex flex-wrap justify-center items-center gap-12 w-full">
                    
                    {/* HUNDRED BLOCK / TRANSFORMED TENS */}
                    <div className="relative flex flex-wrap justify-center gap-2 w-[220px] min-h-[160px] items-center">
                        {!isBroken ? (
                            <button
                                onClick={() => setIsBroken(true)}
                                className="w-40 h-40 bg-amber-400 border-4 border-amber-600 rounded-2xl shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
                                style={{ cursor: hammerCursor }}
                            >
                                <span className="text-3xl font-black text-amber-800 group-hover:hidden">100</span>
                                <Hammer className="hidden group-hover:block h-12 w-12 text-amber-900 animate-bounce" />
                            </button>
                        ) : (
                            <div className="grid grid-cols-5 gap-2 animate-in zoom-in duration-500">
                                {Array.from({ length: transformedTens }).map((_, i) => {
                                    const isSelected = selectedIndices.includes(i)
                                    return (
                                        <button
                                            key={`transformed-${i}`}
                                            onClick={() => toggleTen(i)}
                                            disabled={isConfirmed}
                                            className={cn(
                                                "w-10 h-10 rounded-md transition-all duration-300 flex items-center justify-center",
                                                isSelected 
                                                    ? "bg-rose-100 border-rose-500 border-2 scale-75" 
                                                    : "bg-emerald-500 hover:bg-emerald-600 border-transparent border-2 shadow-md shadow-emerald-200"
                                            )}
                                        >
                                            {isSelected && <Trash2 className="h-4 w-4 text-rose-600" />}
                                            {isConfirmed && isSelected && (
                                                <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center animate-out fade-out zoom-out duration-1000 fill-mode-forwards">
                                                    <Trash2 className="h-5 w-5 text-rose-500" />
                                                </div>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* PLUS ICON BETWEEN BLOCKS */}
                    {!isBroken && <div className="text-4xl font-bold text-slate-300">+</div>}

                    {/* INITIAL TENS */}
                    <div className="flex flex-wrap gap-2 w-[120px] justify-center">
                        {Array.from({ length: totalInitialTens }).map((_, i) => {
                            const actualIndex = i + 10 // To differentiate from transformed ones
                            const isSelected = selectedIndices.includes(actualIndex)
                            return (
                                <button
                                    key={`initial-${i}`}
                                    onClick={() => toggleTen(actualIndex)}
                                    disabled={isConfirmed || !isBroken}
                                    className={cn(
                                        "w-10 h-10 rounded-md transition-all duration-300 flex items-center justify-center",
                                        isSelected 
                                            ? "bg-rose-100 border-rose-500 border-2 scale-75" 
                                            : !isBroken 
                                                ? "bg-emerald-500/50 border-emerald-200 border-2 cursor-not-allowed" 
                                                : "bg-emerald-500 hover:bg-emerald-600 border-transparent border-2 shadow-md shadow-emerald-200"
                                    )}
                                >
                                    {isSelected && <Trash2 className="h-4 w-4 text-rose-600" />}
                                    {isConfirmed && isSelected && (
                                        <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center animate-out fade-out zoom-out duration-1000 fill-mode-forwards">
                                            <Trash2 className="h-5 w-5 text-rose-500" />
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Feedback Message */}
                {feedback.type && (
                    <div className={cn(
                        "mt-10 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2",
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
                        disabled={selectedIndices.length === 0 && isBroken}
                        className={cn(
                            "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95 shadow-lg",
                            selectedIndices.length > 0 || !isBroken
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
                        <RotateCcw className="h-5 w-5" /> Reiniciar Actividad
                    </button>
                )}
            </div>
        </div>
    )
}
