"use client"

import React, { useState } from 'react'
import { Play, RotateCcw, Hammer } from 'lucide-react'
import { cn } from "@/lib/utils"

type Step = 'initial' | 'ungroup1' | 'ungroup2' | 'distributed'

export function RegroupingDivisionVisual() {
    const [currentStep, setCurrentStep] = useState<Step>('initial')
    
    // Problem: 35 ÷ 5 = 7 (Exact division)
    // Start with 3 tens + 5 units
    // Need to ungroup all tens to distribute properly
    const initialTens = 3
    const initialUnits = 5
    const totalUnits = 35
    const numberOfGroups = 5
    const unitsPerGroup = 7
    const remainder = 0

    const squareSize = 28
    const circleRadius = 14
    const itemSpacing = 45

    const handleNext = () => {
        if (currentStep === 'initial') setCurrentStep('ungroup1')
        else if (currentStep === 'ungroup1') setCurrentStep('ungroup2')
        else if (currentStep === 'ungroup2') setCurrentStep('distributed')
    }

    const reset = () => {
        setCurrentStep('initial')
    }

    // Calculate current state
    const getRemainingTens = () => {
        if (currentStep === 'initial') return initialTens
        if (currentStep === 'ungroup1') return 2
        return 0
    }

    const getCurrentUnits = () => {
        if (currentStep === 'initial') return initialUnits
        if (currentStep === 'ungroup1') return 15 // 5 + 10 from first ten
        if (currentStep === 'ungroup2') return 35 // All tens ungrouped
        return 0 
    }

    const showHammer = currentStep === 'initial' || currentStep === 'ungroup1'
    const showDistribution = currentStep === 'distributed'

    const hammerCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m15 5 4 4'/><path d='M21.5 12 12 21.5'/><path d='m14.09 6.11 3.8 3.8'/><path d='M10.5 7.5 4.5 1.5'/><path d='M3 5c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5Z'/></svg>") 16 16, auto`

    const getSVGHeight = () => {
        if (currentStep === 'initial' || currentStep === 'ungroup1') return 250
        if (currentStep === 'ungroup2') return 260
        if (currentStep === 'distributed') return 300
        return 450
    }

    const svgHeight = getSVGHeight()

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-50 dark:border-zinc-800 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">División con Desagrupación</h3>
                    <p className="text-slate-500 dark:text-zinc-400">
                        {currentStep === 'initial' && "¿Podemos repartir 3 decenas en 5 grupos iguales? ¡Necesitamos desagrupar!"}
                        {currentStep === 'ungroup1' && "Primera decena desagrupada. ¿Es suficiente? ¡Sigamos desagrupando!"}
                        {currentStep === 'ungroup2' && "Todas las decenas desagrupadas. Ahora tenemos 35 unidades."}
                        {currentStep === 'distributed' && "¡Repartido! Al repartir 35 unidades en 5 grupos, cada grupo tiene 7."}
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                    <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                        35 ÷ 5 = {showDistribution ? "7" : "?"}
                    </span>
                </div>
            </div>

            <div className="relative w-full overflow-visible transition-all duration-700" style={{ minHeight: svgHeight }}>
                <svg
                    viewBox={`0 0 ${showDistribution ? 550 : 400} ${svgHeight}`}
                    className="w-full h-full overflow-visible transition-all duration-700"
                >
                    {/* Remaining Tens */}
                    {getRemainingTens() > 0 && (
                        <g>
                            <text
                                x={80}
                                y={currentStep === 'initial' || currentStep === 'ungroup1' ? 15 : 85}
                                className="text-sm font-semibold fill-slate-500 dark:fill-zinc-400 transition-all duration-700"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Decenas:
                            </text>
                            {Array.from({ length: getRemainingTens() }).map((_, i) => (
                                <g key={`ten-${i}`}>
                                    <rect
                                        x={80 + i * (squareSize + 10)}
                                        y={currentStep === 'initial' || currentStep === 'ungroup1' ? 30 : 100}
                                        width={squareSize}
                                        height={squareSize}
                                        className="fill-green-500 stroke-green-600 stroke-2 transition-all duration-700"
                                        rx={4}
                                        style={{ 
                                            filter: 'drop-shadow(0px 2px 4px rgba(34, 197, 94, 0.3))',
                                            cursor: showHammer ? hammerCursor : 'default'
                                        }}
                                        onClick={showHammer ? handleNext : undefined}
                                    />
                                    {showHammer && (
                                        <Hammer 
                                            x={80 + i * (squareSize + 10) + squareSize / 2 - 12}
                                            y={(currentStep === 'initial' || currentStep === 'ungroup1' ? 30 : 100) + squareSize / 2 - 12}
                                            className="h-4 w-4 text-amber-600 animate-pulse pointer-events-none transition-all duration-700"
                                        />
                                    )}
                                </g>
                            ))}
                        </g>
                    )}

                    {/* Current Units (before distribution) */}
                    {!showDistribution && (
                        <g>
                            <text
                                x={80}
                                y={
                                    currentStep === 'initial' || currentStep === 'ungroup1' 
                                        ? 100 
                                        : currentStep === 'ungroup2' ? 15 : 195
                                }
                                className="text-sm font-semibold fill-slate-500 dark:fill-zinc-400 transition-all duration-700"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Unidades: {getCurrentUnits()}
                            </text>
                            <g className="transition-all duration-700">
                                {Array.from({ length: getCurrentUnits() }).map((_, i) => {
                                    const row = Math.floor(i / 7)
                                    const col = i % 7
                                    return (
                                        <circle
                                            key={`unit-${i}`}
                                            cx={80 + col * itemSpacing}
                                            cy={
                                                (currentStep === 'initial' || currentStep === 'ungroup1' 
                                                    ? 130 
                                                    : currentStep === 'ungroup2' ? 45 : 215) + row * itemSpacing
                                            }
                                            r={circleRadius}
                                            className="fill-blue-500 stroke-blue-600 stroke-2 animate-in zoom-in transition-all duration-700"
                                            style={{ 
                                                filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))',
                                                animationDelay: `${i * 15}ms`
                                            }}
                                        />
                                    )
                                })}
                            </g>
                        </g>
                    )}

                    {/* Distributed Groups */}
                    {showDistribution && (
                        <g>
                            {Array.from({ length: numberOfGroups }).map((_, groupIndex) => (
                                <g key={`group-${groupIndex}`}>
                                    {/* Group box */}
                                    <rect
                                        x={20 + groupIndex * 105}
                                        y={40}
                                        width={95}
                                        height={160}
                                        className="fill-none stroke-orange-300 dark:stroke-orange-700 stroke-2 stroke-dashed animate-in fade-in"
                                        rx={12}
                                        style={{ animationDelay: `${groupIndex * 100}ms` }}
                                    />
                                    
                                    {/* Group label */}
                                    <text
                                        x={20 + groupIndex * 105 + 47}
                                        y={20}
                                        textAnchor="middle"
                                        className="text-xs font-bold fill-orange-600 dark:fill-orange-400 animate-in fade-in"
                                        style={{ 
                                            fontFamily: "'Inter', sans-serif",
                                            animationDelay: `${groupIndex * 100 + 200}ms`
                                        }}
                                    >
                                        Grupo {groupIndex + 1}
                                    </text>

                                    {/* Units in each group */}
                                    {Array.from({ length: unitsPerGroup }).map((_, unitIndex) => {
                                        const row = Math.floor(unitIndex / 2)
                                        const col = unitIndex % 2
                                        return (
                                            <circle
                                                key={`g${groupIndex}-u${unitIndex}`}
                                                cx={50 + groupIndex * 105 + col * 35}
                                                cy={65 + row * 32}
                                                r={circleRadius - 2}
                                                className="fill-blue-500 stroke-blue-600 stroke-2 animate-in zoom-in"
                                                style={{ 
                                                    filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))',
                                                    animationDelay: `${groupIndex * 100 + unitIndex * 50 + 400}ms`
                                                }}
                                            />
                                        )
                                    })}

                                    {/* Result per group */}
                                    <text
                                        x={20 + groupIndex * 105 + 47}
                                        y={230}
                                        textAnchor="middle"
                                        className="text-lg font-bold fill-slate-700 dark:fill-zinc-300 animate-in fade-in"
                                        style={{ 
                                            fontFamily: "'Quicksand', sans-serif",
                                            animationDelay: `${groupIndex * 100 + 1000}ms`
                                        }}
                                    >
                                        = {unitsPerGroup}
                                    </text>
                                </g>
                            ))}
                        </g>
                    )}
                </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-green-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Decenas</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Unidades</span>
                </div>
                <div className="flex items-center gap-2">
                    <Hammer className="h-4 w-4 text-amber-600" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Desagrupar</span>
                </div>
            </div>

            {/* Step info */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/50">
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                    {currentStep === 'initial' && <><strong>Paso 1:</strong> Tenemos 3 decenas y 5 unidades. No podemos repartir 3 decenas enteras en 5 grupos iguales. ¡Necesitamos desagrupar!</>}
                    {currentStep === 'ungroup1' && <><strong>Paso 2:</strong> Desagrupamos 1 decena en 10 unidades. Ahora tenemos 2 decenas + 15 unidades. Aún no podemos repartir las decenas sobrantes en 5 grupos.</>}
                    {currentStep === 'ungroup2' && <><strong>Paso 3:</strong> Desagrupamos todas las decenas. Ahora tenemos 35 unidades listas para repartir exactamente en 5 grupos.</>}
                    {currentStep === 'distributed' && <><strong>Resultado:</strong> Al repartir 35 unidades en 5 grupos iguales, cada grupo recibe exactamente 7 unidades. ¡No sobra nada!</>}
                </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
                {currentStep !== 'distributed' ? (
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-700"
                    >
                        <Play className="h-5 w-5" />
                        {currentStep === 'initial' && 'Desagrupar 1 decena'}
                        {currentStep === 'ungroup1' && 'Desagrupar más decenas'}
                        {currentStep === 'ungroup2' && 'Repartir en cantidades iguales'}
                    </button>
                ) : (
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-8 py-3 bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200 rounded-full font-bold transition-all active:scale-95"
                    >
                        <RotateCcw className="h-5 w-5" /> Reiniciar
                    </button>
                )}
            </div>
        </div>
    )
}
