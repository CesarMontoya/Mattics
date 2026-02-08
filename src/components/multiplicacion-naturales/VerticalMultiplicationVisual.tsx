"use client"

import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function VerticalMultiplicationVisual() {
    const [step, setStep] = useState(0)

    // 23 × 4 = 92
    const multiplicand = 23
    const multiplier = 4
    
    // Geometric positioning
    const circleRadius = 7
    const squareSize = 20
    const unitSpacing = 16
    const rowGap = 35
    const colDecadeX = 50
    const colUnitX = 140
    const startY = 40

    const forward = () => setStep(prev => Math.min(prev + 1, 5))
    const back = () => setStep(prev => Math.max(prev - 1, 0))
    const reset = () => setStep(0)

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') forward()
            if (e.key === 'ArrowLeft') back()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [step])

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            
            <p className="text-center text-slate-500 dark:text-zinc-400">
                Mira cómo cada movimiento en el papel tiene su reflejo en los bloques
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LEFT: ALGORITHM */}
                <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700">
                    <h4 className="text-lg font-bold text-slate-700 dark:text-zinc-300">Algoritmo</h4>
                    
                    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto overflow-visible">
                        {/* Numbers */}
                        <g className="text-4xl font-bold fill-slate-700 dark:fill-zinc-300" style={{ fontFamily: 'monospace' }}>
                            <text x="100" y="60" textAnchor="end">2</text>
                            <text x="140" y="60" textAnchor="end">3</text>
                            
                            <text x="60" y="100" textAnchor="end" className="fill-purple-600">×</text>
                            <text x="140" y="100" textAnchor="end">4</text>
                        </g>

                        <line x1="50" y1="110" x2="150" y2="110" className="stroke-slate-400 dark:stroke-zinc-500 stroke-2" />

                        {/* Carry (Step 3 onwards) */}
                        {step >= 3 && (
                            <text 
                                x="90" 
                                y="25" 
                                textAnchor="middle" 
                                className={cn(
                                    "text-xl font-bold transition-all duration-500",
                                    step >= 5 ? "fill-slate-400 scale-90" : "fill-rose-500 animate-in zoom-in"
                                )}
                                style={{ fontFamily: 'monospace' }}
                            >
                                1
                            </text>
                        )}

                        {/* Units Result */}
                        {step >= 3 && (
                            <text x="140" y="150" textAnchor="end" className="text-4xl font-bold fill-purple-600 animate-in fade-in" style={{ fontFamily: 'monospace' }}>
                                2
                            </text>
                        )}

                        {/* Decades Result (Step 4 is '8', Step 5 is '9') */}
                        {step === 4 && (
                            <text x="100" y="150" textAnchor="end" className="text-4xl font-bold fill-purple-600 animate-in fade-in" style={{ fontFamily: 'monospace' }}>
                                8
                            </text>
                        )}
                        {step >= 5 && (
                            <text 
                                x="100" 
                                y="150" 
                                textAnchor="end" 
                                className="text-4xl font-bold fill-purple-600 animate-in zoom-in" 
                                style={{ fontFamily: 'monospace', transformOrigin: '90px 140px' }}
                            >
                                9
                            </text>
                        )}
                    </svg>
                </div>

                {/* RIGHT: GEOMETRIC REPRESENTATION */}
                <div className="flex flex-col items-center gap-6 p-6 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-800">
                    <h4 className="text-lg font-bold text-purple-700 dark:text-purple-300">Geometría</h4>
                    
                    <svg viewBox="0 0 300 250" className="w-full h-auto overflow-visible">
                        {/* Decades Column */}
                        <text x={colDecadeX + 15} y={startY - 15} textAnchor="middle" className="text-xs font-bold fill-slate-400 uppercase tracking-wider">Decenas</text>
                        
                        {/* Units Column */}
                        <text x={colUnitX + 15} y={startY - 15} textAnchor="middle" className="text-xs font-bold fill-slate-400 uppercase tracking-wider">Unidades</text>

                        {/* REPLICATION LOGIC */}
                        {Array.from({ length: 4 }).map((_, rowIndex) => {
                            const isOriginalRow = rowIndex === 0
                            const y = startY + (rowIndex * rowGap)
                            const isVisible = step >= 1 && (isOriginalRow || step >= 2)
                            
                            // Decades replication happens at Step 4
                            const isDecadeVisible = step >= 1 && (isOriginalRow || step >= 4)

                            return (
                                <g key={rowIndex} className="transition-all duration-700">
                                    {/* Decades (2 squares per row) */}
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <rect
                                            key={`dec-${rowIndex}-${i}`}
                                            x={colDecadeX + (i * (squareSize + 4))}
                                            y={y}
                                            width={squareSize}
                                            height={squareSize}
                                            rx={3}
                                            className={cn(
                                                "fill-emerald-500 stroke-emerald-600 stroke-2 transition-all duration-700",
                                                isDecadeVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                            )}
                                            style={{ transitionDelay: !isOriginalRow ? `${rowIndex * 100}ms` : '0ms' }}
                                        />
                                    ))}

                                    {/* Units (3 circles per row) - Replicate at Step 2 */}
                                    {Array.from({ length: 3 }).map((_, i) => {
                                        const unitIndex = rowIndex * 3 + i
                                        
                                        // In Step 3+, all original circles are hidden (we show 2 manually at the top)
                                        const shouldShowCircle = step < 3

                                        return (
                                            <circle
                                                key={`unit-${rowIndex}-${i}`}
                                                cx={colUnitX + (i * unitSpacing)}
                                                cy={y + squareSize / 2}
                                                r={circleRadius}
                                                className={cn(
                                                    "fill-blue-500 stroke-blue-600 stroke-2 transition-all duration-700",
                                                    isVisible && shouldShowCircle ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                                )}
                                                style={{ transitionDelay: !isOriginalRow ? `${rowIndex * 100}ms` : '0ms' }}
                                            />
                                        )
                                    })}
                                </g>
                            )
                        })}

                        {/* Regrouped decade square (Step 3 onwards) - positioned at top */}
                        {step >= 3 && (
                            <rect
                                x={step >= 5 ? colDecadeX + (2 * (squareSize + 4)) : colUnitX}
                                y={step >= 5 ? startY : startY}
                                width={squareSize}
                                height={squareSize}
                                rx={3}
                                className={cn(
                                    "fill-amber-500 stroke-amber-600 stroke-2 transition-all duration-1000 ease-in-out",
                                    step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                )}
                                style={{ 
                                    filter: 'drop-shadow(0px 2px 4px rgba(245, 158, 11, 0.4))'
                                }}
                            />
                        )}
                        
                        {/* Remaining 2 units after regrouping - positioned at top next to amber decade */}
                        {step >= 3 && Array.from({ length: 2 }).map((_, i) => (
                            <circle
                                key={`remaining-unit-${i}`}
                                cx={colUnitX + squareSize + 10 + (i * unitSpacing)}
                                cy={startY + squareSize / 2}
                                r={circleRadius}
                                className={cn(
                                    "fill-blue-500 stroke-blue-600 stroke-2 transition-all duration-700",
                                    step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                )}
                            />
                        ))}
                    </svg>
                </div>
            </div>

            {/* Step description */}
            <div className="min-h-[80px] flex items-center justify-center bg-slate-50 dark:bg-zinc-800/30 rounded-2xl p-4">
                <p className="text-lg text-slate-700 dark:text-zinc-300 font-medium text-center max-w-2xl">
                    {step === 0 && "Presiona 'Siguiente' para iniciar"}
                    {step === 1 && "Paso 1: Empezamos representando el número 23. Son 2 decenas y 3 unidades."}
                    {step === 2 && "Paso 2: Multiplicamos las unidades geométricamente. 3 × 4 = 12 círculos azules."}
                    {step === 3 && "Paso 3: ¡Transformación! Las 10 unidades se reagrupan en 1 decena (cuadrado ámbar). Escribimos 2 en las unidades y llevamos 1."}
                    {step === 4 && "Paso 4: Multiplicamos las decenas. 2 × 4 = 8. Anotamos el 8 en el algoritmo."}
                    {step === 5 && "Paso 5: Sumamos la decena que llevábamos. 8 + 1 = 9. La decena ámbar se mueve con sus compañeras."}
                </p>
            </div>

            {/* Navigation controls */}
            <div className="flex flex-wrap justify-center items-center gap-4">
                <button
                    onClick={back}
                    disabled={step === 0}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all",
                        step === 0
                            ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200 active:scale-95"
                    )}
                >
                    <ChevronLeft className="h-5 w-5" /> Anterior
                </button>

                <div className="flex items-center gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-2 w-2 rounded-full transition-all",
                                step === i ? "bg-purple-600 w-6" : "bg-slate-300 dark:bg-zinc-600"
                            )}
                        />
                    ))}
                </div>

                {step < 5 ? (
                    <button
                        onClick={forward}
                        className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-full font-semibold transition-all active:scale-95 shadow-lg shadow-purple-200 dark:shadow-none"
                    >
                        Siguiente <ChevronRight className="h-5 w-5" />
                    </button>
                ) : (
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-6 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200 rounded-full font-semibold transition-all active:scale-95"
                    >
                        <RotateCcw className="h-5 w-5" /> Reiniciar
                    </button>
                )}
            </div>

            <p className="text-center text-sm text-slate-400 dark:text-zinc-500">
                💡 Usa las flechas ← → del teclado para navegar
            </p>
        </div>
    )
}

