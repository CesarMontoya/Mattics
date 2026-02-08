"use client"

import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function VerticalDivisionVisual() {
    const [step, setStep] = useState(0)
    
    // Problem: 156 ÷ 3 = 52
    const dividend = 156
    const divisor = 3
    const quotient = 52

    // Breakdown: 
    // Step 0: Initial state
    // Step 1: Show 156 as 1 hundred, 5 tens, 6 units
    // Step 2: Try to divide 1 hundred by 3 (can't), regroup into tens
    // Step 3: Now have 15 tens, divide by 3 = 5 tens per group
    // Step 4: Divide 6 units by 3 = 2 units per group
    // Step 5: Final result 52

    const squareSize = 18
    const circleRadius = 7
    const itemSpacing = 12
    const colSpacing = 60

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

    // Calculate geometric state based on step
    const getHundreds = () => {
        if (step <= 1) return 1
        return 0 // Regrouped into tens
    }

    const getTens = () => {
        if (step === 0 || step === 1) return 5
        if (step === 2) return 15 // After regrouping hundred
        if (step >= 3) return 0 // Distributed
        return 5
    }

    const getUnits = () => {
        if (step <= 3) return 6
        return 0 // Distributed
    }

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
                    Algoritmo y Geometría
                </h3>
                <p className="text-slate-500 dark:text-zinc-400">
                    Mira cómo cada paso del algoritmo se refleja en la representación geométrica
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LEFT: LONG DIVISION ALGORITHM */}
                <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700">
                    <h4 className="text-lg font-bold text-slate-700 dark:text-zinc-300">Algoritmo de la División</h4>
                    
                    <svg viewBox="0 0 250 280" className="w-full max-w-[250px] h-auto overflow-visible">
                        {/* Division bracket and divisor */}
                        <g className="text-3xl font-bold fill-slate-700 dark:fill-zinc-300" style={{ fontFamily: 'monospace' }}>
                            <text x="30" y="70" textAnchor="end">3</text>
                            
                            {/* Division bracket (⟌) */}
                            <path 
                                d="M 45 30 L 45 85 M 45 30 L 180 30" 
                                className="stroke-slate-700 dark:stroke-zinc-300 stroke-3 fill-none"
                                strokeLinecap="round"
                            />
                            
                            {/* Dividend: 156 */}
                            <text x="80" y="70" textAnchor="middle">1</text>
                            <text x="120" y="70" textAnchor="middle">5</text>
                            <text x="160" y="70" textAnchor="middle">6</text>
                        </g>

                        {/* Quotient appears as we solve */}
                        <g className="text-3xl font-bold fill-orange-600 dark:fill-orange-400" style={{ fontFamily: 'monospace' }}>
                            {/* 5 in quotient (Step 3) */}
                            {step >= 3 && (
                                <text x="120" y="25" textAnchor="middle" className="animate-in fade-in zoom-in">
                                    5
                                </text>
                            )}
                            {/* 2 in quotient (Step 4+) */}
                            {step >= 4 && (
                                <text x="160" y="25" textAnchor="middle" className="animate-in fade-in zoom-in">
                                    2
                                </text>
                            )}
                        </g>

                        {/* Step 2: Can't divide 1 by 3, arrow to combine with 5 */}
                        {step === 2 && (
                            <g className="animate-in fade-in">
                                <path
                                    d="M 75 75 Q 95 90 115 75"
                                    className="stroke-amber-500 stroke-2 fill-none"
                                    strokeDasharray="4,2"
                                />
                                <text 
                                    x="95" 
                                    y="105" 
                                    textAnchor="middle" 
                                    className="text-xs font-semibold fill-amber-700 dark:fill-amber-400"
                                >
                                    Desagrupar
                                </text>
                            </g>
                        )}

                        {/* Step 3: Division of 15 by 3 */}
                        {step >= 3 && (
                            <g className="text-2xl font-bold" style={{ fontFamily: 'monospace' }}>
                                {/* 15 */}
                                <line x1="65" y1="90" x2="135" y2="90" className="stroke-slate-400 dark:stroke-zinc-500 stroke-2" />
                                <text x="98" y="115" className="fill-slate-600 dark:fill-zinc-400">15</text>
                                
                                {/* Subtract 15 */}
                                <line x1="65" y1="147" x2="135" y2="147" className="stroke-slate-400 dark:stroke-zinc-500 stroke-2" />
                                <text x="85" y="140" className={cn("fill-slate-600 dark:fill-zinc-400", step >= 3 && "animate-in fade-in")}>-15</text>
                                
                                {/* Result 0, bring down 6 */}
                                <text x="109" y="170" className="fill-slate-600 dark:fill-zinc-400">0</text>
                            </g>
                        )}

                        {/* Step 4: Bring down 6 and divide */}
                        {step >= 4 && (
                            <g className="text-2xl font-bold animate-in fade-in" style={{ fontFamily: 'monospace' }}>
                                <text x="150" y="170" className="fill-orange-500">6</text>
                                
                                {/* Division of 6 by 3 */}
                                <text x="136" y="197" className="fill-slate-600 dark:fill-zinc-400">-6</text>
                                
                                <line x1="140" y1="204" x2="170" y2="204" className="stroke-slate-400 dark:stroke-zinc-500 stroke-2" />
                                <text x="150" y="230" className="fill-slate-600 dark:fill-zinc-400">0</text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* RIGHT: GEOMETRIC REPRESENTATION */}
                <div className="flex flex-col items-center gap-6 p-6 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-800">
                    <h4 className="text-lg font-bold text-orange-700 dark:text-orange-300">Representación Geométrica</h4>
                    
                    <svg viewBox="0 0 300 320" className="w-full h-auto overflow-visible">
                        {/* Column headers */}
                        <text x="60" y="25" textAnchor="middle" className="text-xs font-bold fill-slate-400 uppercase tracking-wider">Centenas</text>
                        <text x="140" y="25" textAnchor="middle" className="text-xs font-bold fill-slate-400 uppercase tracking-wider">Decenas</text>
                        <text x="220" y="25" textAnchor="middle" className="text-xs font-bold fill-slate-400 uppercase tracking-wider">Unidades</text>

                        {/* INITIAL STATE */}
                        {step >= 1 && (
                            <g>
                                {/* Hundreds */}
                                {getHundreds() > 0 && (
                                    <rect
                                        x={40}
                                        y={45}
                                        width={40}
                                        height={40}
                                        className={cn(
                                            "fill-yellow-400 stroke-yellow-600 stroke-2 transition-all duration-700",
                                            step === 2 ? "animate-pulse" : ""
                                        )}
                                        rx={4}
                                        style={{ 
                                            filter: 'drop-shadow(0px 2px 4px rgba(250, 204, 21, 0.3))'
                                        }}
                                    />
                                )}

                                {/* Tens - initial or after regrouping */}
                                <g className="transition-all duration-700">
                                    {Array.from({ length: getTens() }).map((_, i) => {
                                        const row = Math.floor(i / 3)
                                        const col = i % 3
                                        const isFromRegroup = i >= 5 && step >= 2
                                        
                                        return (
                                            <rect
                                                key={`ten-${i}`}
                                                x={120 + (col * (squareSize + 3))}
                                                y={45 + (row * (squareSize + 3))}
                                                width={squareSize}
                                                height={squareSize}
                                                className={cn(
                                                    "stroke-2 transition-all duration-500",
                                                    isFromRegroup 
                                                        ? "fill-amber-400 stroke-amber-600 animate-in zoom-in" 
                                                        : "fill-green-500 stroke-green-600",
                                                    step === 3 && "opacity-50"
                                                )}
                                                rx={3}
                                                style={{ 
                                                    filter: 'drop-shadow(0px 2px 4px rgba(34, 197, 94, 0.3))',
                                                    animationDelay: isFromRegroup ? `${(i - 5) * 50}ms` : '0ms'
                                                }}
                                            />
                                        )
                                    })}
                                </g>

                                {/* Units */}
                                <g>
                                    {Array.from({ length: getUnits() }).map((_, i) => {
                                        const row = Math.floor(i / 2)
                                        const col = i % 2
                                        
                                        return (
                                            <circle
                                                key={`unit-${i}`}
                                                cx={210 + (col * itemSpacing)}
                                                cy={55 + (row * itemSpacing)}
                                                r={circleRadius}
                                                className={cn(
                                                    "fill-blue-500 stroke-blue-600 stroke-2 transition-all duration-500",
                                                    step === 4 && "opacity-50"
                                                )}
                                                style={{ 
                                                    filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))'
                                                }}
                                            />
                                        )
                                    })}
                                </g>
                            </g>
                        )}

                        {/* DISTRIBUTED GROUPS (Step 3+) */}
                        {step >= 3 && (
                            <g>
                                <text x="150" y="160" textAnchor="middle" className="text-sm font-bold fill-slate-500 dark:fill-zinc-400">
                                    Repartido en 3 grupos:
                                </text>

                                {/* 3 groups, each with result */}
                                {Array.from({ length: 3 }).map((_, groupIndex) => (
                                    <g key={`group-${groupIndex}`}>
                                        {/* Group box */}
                                        <rect
                                            x={30 + groupIndex * 90}
                                            y={180}
                                            width={70}
                                            height={100}
                                            className="fill-none stroke-orange-300 dark:stroke-orange-700 stroke-2 stroke-dashed animate-in fade-in"
                                            rx={8}
                                            style={{ animationDelay: `${groupIndex * 100}ms` }}
                                        />

                                        {/* Group label */}
                                        <text
                                            x={30 + groupIndex * 90 + 35}
                                            y={175}
                                            textAnchor="middle"
                                            className="text-xs font-bold fill-orange-600 dark:fill-orange-400"
                                        >
                                            Grupo {groupIndex + 1}
                                        </text>

                                        {/* 5 tens per group */}
                                        {step >= 3 && Array.from({ length: 5 }).map((_, i) => (
                                            <rect
                                                key={`g${groupIndex}-ten-${i}`}
                                                x={38 + groupIndex * 90 + (i % 3) * 19}
                                                y={195 + Math.floor(i / 3) * 19}
                                                width={squareSize}
                                                height={squareSize}
                                                className="fill-green-500 stroke-green-600 stroke-2 animate-in zoom-in"
                                                rx={3}
                                                style={{ 
                                                    filter: 'drop-shadow(0px 2px 4px rgba(34, 197, 94, 0.3))',
                                                    animationDelay: `${groupIndex * 100 + i * 50}ms`
                                                }}
                                            />
                                        ))}

                                        {/* 2 units per group */}
                                        {step >= 4 && Array.from({ length: 2 }).map((_, i) => (
                                            <circle
                                                key={`g${groupIndex}-unit-${i}`}
                                                cx={45 + groupIndex * 90 + i * 15}
                                                cy={250}
                                                r={circleRadius}
                                                className="fill-blue-500 stroke-blue-600 stroke-2 animate-in zoom-in"
                                                style={{ 
                                                    filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))',
                                                    animationDelay: `${groupIndex * 100 + 600 + i * 50}ms`
                                                }}
                                            />
                                        ))}

                                        {/* Result */}
                                        {step >= 5 && (
                                            <text
                                                x={30 + groupIndex * 90 + 35}
                                                y={295}
                                                textAnchor="middle"
                                                className="text-lg font-bold fill-orange-700 dark:fill-orange-300 animate-in fade-in"
                                                style={{ fontFamily: "'Quicksand', sans-serif" }}
                                            >
                                                = 52
                                            </text>
                                        )}
                                    </g>
                                ))}
                            </g>
                        )}
                    </svg>
                </div>
            </div>

            {/* Step description */}
            <div className="min-h-[80px] flex items-center justify-center bg-slate-50 dark:bg-zinc-800/30 rounded-2xl p-4">
                <p className="text-lg text-slate-700 dark:text-zinc-300 font-medium text-center max-w-2xl">
                    {step === 0 && "Presiona 'Siguiente' para comenzar el proceso de división 156 ÷ 3."}
                    {step === 1 && "Paso 1: Representamos 156 como 1 centena (amarillo), 5 decenas (verde) y 6 unidades (azul)."}
                    {step === 2 && "Paso 2: ¿Podemos dividir 1 centena entre 3? No. Entonces la reagrupamos en 10 decenas. Ahora tenemos 15 decenas en total."}
                    {step === 3 && "Paso 3: Dividimos 15 decenas entre 3. Cada grupo recibe 5 decenas. En el algoritmo escribimos 5 en el cociente."}
                    {step === 4 && "Paso 4: Ahora dividimos las 6 unidades entre 3. Cada grupo recibe 2 unidades. Escribimos 2 en el cociente."}
                    {step === 5 && "Paso 5: ¡Completado! Cada grupo tiene 5 decenas + 2 unidades = 52. Por lo tanto, 156 ÷ 3 = 52."}
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
                                step === i ? "bg-orange-600 w-6" : "bg-slate-300 dark:bg-zinc-600"
                            )}
                        />
                    ))}
                </div>

                {step < 5 ? (
                    <button
                        onClick={forward}
                        className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-full font-semibold transition-all active:scale-95 shadow-lg shadow-orange-200 dark:shadow-none"
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
