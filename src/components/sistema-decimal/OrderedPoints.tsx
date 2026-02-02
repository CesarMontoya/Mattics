"use client"

import React, { useState, useEffect } from 'react'
import { Info } from 'lucide-react'
import { cn } from "@/lib/utils"

export function OrderedPoints() {
    const [viewMode, setViewMode] = useState<'normal' | 'groups' | 'math'>('normal')
    const [animationStep, setAnimationStep] = useState(0)
    
    const numBlue = 27
    const numRed = 6
    const total = numBlue + numRed
    const cols = 10
    const radius = 12

    // Effect for the animations
    useEffect(() => {
        let interval: any;
        setAnimationStep(0)

        if (viewMode === 'groups') {
            const sequence = [3, 6, 9, 12, 15, 18, 21, 23, 25, 27]
            let step = 0
            interval = window.setInterval(() => {
                if (step < sequence.length) {
                    setAnimationStep(sequence[step])
                    step++
                } else {
                    clearInterval(interval)
                }
            }, 600)
        } else if (viewMode === 'math') {
            const sequence = [10, 20, 30, 27]
            let step = 0
            interval = window.setInterval(() => {
                if (step < sequence.length) {
                    setAnimationStep(sequence[step])
                    step++
                } else {
                    clearInterval(interval)
                }
            }, 800)
        }

        return () => clearInterval(interval)
    }, [viewMode])

    const getColumnLabel = (colIndex: number) => {
        if (viewMode !== 'groups') return null
        const sequence = [3, 6, 9, 12, 15, 18, 21, 23, 25, 27]
        if (colIndex < sequence.length && animationStep >= sequence[colIndex]) {
            return sequence[colIndex]
        }
        return null
    }

    const getRowLabel = (rowIndex: number) => {
        if (viewMode !== 'math') return null
        // First row label
        if (rowIndex === 0 && animationStep >= 10) return "10"
        // Second row label
        if (rowIndex === 1 && animationStep >= 20) return "20"
        // Third row label: show 30 then 27
        if (rowIndex === 2) {
            if (animationStep === 30) return "30"
            if (animationStep === 27) return "27"
        }
        return null
    }

    const isPointHighlighted = (index: number) => {
        const row = Math.floor(index / cols)
        const col = index % cols

        if (viewMode === 'groups') {
            if (index >= numBlue) return false
            if (col <= 6) return animationStep >= (col + 1) * 3 && row <= 2
            if (col === 7) return animationStep >= 23 && row <= 1
            if (col === 8) return animationStep >= 25 && row <= 1
            if (col === 9) return animationStep >= 27 && row <= 1
        }

        if (viewMode === 'math') {
            if (animationStep === 10) return row === 0
            if (animationStep === 20) return row <= 1
            if (animationStep === 30) return row <= 2
            if (animationStep === 27) return index < numBlue
        }
        
        return false
    }

    const renderPoints = () => {
        const points = []
        for (let i = 0; i < total; i++) {
            const row = Math.floor(i / cols)
            const color = i < numBlue ? '#3b82f6' : '#ef4444'
            const highlighted = isPointHighlighted(i)

            points.push(
                <div 
                    key={i}
                    className={cn(
                        "relative flex items-center justify-center rounded-full shadow-sm transition-all duration-500",
                        highlighted ? "ring-4 ring-offset-2 ring-emerald-400 scale-110 z-10" : "opacity-40 grayscale-[0.5]"
                    )}
                    style={{
                        width: radius * 2,
                        height: radius * 2,
                        backgroundColor: color,
                        filter: highlighted ? `drop-shadow(0px 4px 8px ${color}60)` : 'none',
                    }}
                >
                </div>
            )
        }
        return points
    }

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-hidden">
            <div className="flex flex-col gap-2">
                <p className="text-slate-600 dark:text-zinc-400">
                    Ahora que los puntos están ordenados, es mucho más fácil contar. ¿Qué estrategia usas?
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 py-4">
                {/* Column Labels (Forma 2) */}
                {viewMode === 'groups' && (
                    <div className="grid grid-cols-10 gap-x-4 gap-y-2 px-8 mb-[-16px]">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="w-[24px] flex justify-center h-6">
                                <span className={cn(
                                    "text-sm font-black text-emerald-600 transition-all duration-500 transform",
                                    getColumnLabel(i) ? "opacity-100 translate-y-0 scale-125" : "opacity-0 translate-y-2 scale-50"
                                )}>
                                    {getColumnLabel(i)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="relative flex gap-8 p-10 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-200 dark:border-zinc-700 items-start">
                    <div className="grid grid-cols-10 gap-x-4 gap-y-10">
                        {renderPoints()}
                    </div>

                    {/* Row Labels (Forma 3) */}
                    {viewMode === 'math' && (
                        <div className="flex flex-col h-full py-0 gap-[37px] mt-[-2px]">
                            {Array.from({ length: 3 }).map((_, i) => {
                                const label = getRowLabel(i);
                                return (
                                    <div key={i} className="h-[28px] flex items-center min-w-[60px]">
                                        <span className={cn(
                                            "text-2xl font-black transition-all duration-500 transform flex items-center gap-2",
                                            label 
                                                ? (i === 2 && animationStep === 27 ? "text-blue-600 scale-150" : "text-emerald-600 scale-125") 
                                                : "opacity-0 translate-x-4"
                                        )}>
                                            {label ? <span>&rarr; <span className="inline-block min-w-[2ch]">{label}</span></span> : ""}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                    onClick={() => setViewMode('normal')}
                    className={cn(
                        "p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-1",
                        viewMode === 'normal' 
                            ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/20" 
                            : "bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 hover:border-slate-200"
                    )}
                >
                    <span className="font-bold text-indigo-700">Forma 1</span>
                    <span className="text-xs text-slate-500">Punto por punto: 1, 2, 3...</span>
                </button>

                <button
                    onClick={() => setViewMode('groups')}
                    className={cn(
                        "p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-1",
                        viewMode === 'groups' 
                            ? "bg-emerald-50 border-emerald-200 ring-2 emerald-500/20" 
                            : "bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 hover:border-slate-200"
                    )}
                >
                    <span className="font-bold text-emerald-700">Forma 2</span>
                    <span className="text-xs text-slate-500">Agrupar de a 3 y sumar sobrantes.</span>
                </button>

                <button
                    onClick={() => setViewMode('math')}
                    className={cn(
                        "p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-1",
                        viewMode === 'math' 
                            ? "bg-amber-50 border-amber-200 ring-2 ring-amber-500/20" 
                            : "bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 hover:border-slate-200"
                    )}
                >
                    <span className="font-bold text-amber-700">Forma 3</span>
                    <span className="text-xs text-slate-500">Agrupa 10, acumula hasta 30 y resta 3 rojos</span>
                </button>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-sm">
                <div className="flex gap-3">
                    <Info className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div className="text-emerald-800 dark:text-emerald-300">
                        {viewMode === 'normal' && <p>Contar de uno en uno es la forma sencilla pero requiere más tiempo.</p>}
                        {viewMode === 'groups' && <p>Agrupar por pequeñas cantidades facilita el conteo rápido de elementos dispersos.</p>}
                        {viewMode === 'math' && <p>Usar las filas de 10 permite sumar rápidamente (10+10+10=30) y luego ajustar restando lo que no necesitamos.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
