"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function DecadeUnitDivisionVisual() {
    const [isDivided, setIsDivided] = useState(false)
    
    // Problem: 26 ÷ 2 = 13
    const totalDecades = 2
    const totalUnits = 6
    const numberOfGroups = 2
    const decadesPerGroup = totalDecades / numberOfGroups
    const unitsPerGroup = totalUnits / numberOfGroups

    const squareSize = 28
    const circleRadius = 14
    const itemSpacing = 45
    const groupSpacing = 140

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-50 dark:border-zinc-800 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">División con Decenas y Unidades</h3>
                    <p className="text-slate-500 dark:text-zinc-400">Repartir 2 decenas y 6 unidades en 2 grupos iguales.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                    <span className="text-2xl font-black text-orange-600 dark:text-orange-400">26 ÷ 2 = ?</span>
                </div>
            </div>

            <div className="relative w-full overflow-visible min-h-[200px]">
                <svg
                    viewBox="0 0 400 170"
                    className="w-full h-full overflow-visible"
                >


                    {/* Decades Animation Logic */}
                    {Array.from({ length: totalDecades }).map((_, i) => {
                        const groupIndex = i % numberOfGroups
                        
                        // Initial position: center of the SVG
                        const initialX = i === 0 ? 175 : 220
                        const initialY = 15

                        // Final position: Row 3, Column 1 or 2
                        const finalX = (groupIndex === 0 ? 80 : 280) + 19
                        const finalY = 25

                        const targetX = isDivided ? finalX : initialX
                        const targetY = isDivided ? finalY : initialY

                        return (
                            <rect
                                key={`decade-${i}`}
                                x={targetX - squareSize / 2}
                                y={targetY}
                                width={squareSize}
                                height={squareSize}
                                className="fill-green-500 stroke-green-600 stroke-2 transition-all duration-700 ease-out"
                                rx={4}
                                style={{ 
                                    filter: 'drop-shadow(0px 2px 4px rgba(34, 197, 94, 0.3))',
                                    transitionDelay: isDivided ? `${groupIndex * 150}ms` : '0ms'
                                }}
                            />
                        )
                    })}

                    {/* Units Animation Logic */}
                    {Array.from({ length: totalUnits }).map((_, i) => {
                        const groupIndex = Math.floor(i / unitsPerGroup)
                        const positionInGroup = i % unitsPerGroup
                        
                        // Initial position: center below decades
                        const initialX = 155 + (i % 3) * 45
                        const initialY = 65 + Math.floor(i / 3) * 45

                        // Final position: Row 3, Column 1 or 2 (distributed horizontally within the column)
                        const centerX = groupIndex === 0 ? 100 : 300
                        const finalX = (centerX - 45) + positionInGroup * 45
                        const finalY = 90

                        const targetX = isDivided ? finalX : initialX
                        const targetY = isDivided ? finalY : initialY

                        return (
                            <circle
                                key={`unit-${i}`}
                                cx={targetX}
                                cy={targetY}
                                r={circleRadius}
                                className="fill-blue-500 stroke-blue-600 stroke-2 transition-all duration-700 ease-out"
                                style={{ 
                                    filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))',
                                    transitionDelay: isDivided ? `${groupIndex * 150 + 200}ms` : '0ms'
                                }}
                            />
                        )
                    })}

                    {/* Fila 2, 3 y 4: Estructura por Columnas */}
                    {isDivided && Array.from({ length: numberOfGroups }).map((_, groupIndex) => {
                        const centerX = groupIndex === 0 ? 100 : 300
                        return (
                            <g key={`group-${groupIndex}`}>
                                {/* Fila 2: Títulos de Grupo */}
                                <text
                                    x={centerX}
                                    y={-5}
                                    textAnchor="middle"
                                    className="text-sm font-bold fill-orange-600 dark:fill-orange-400 animate-in fade-in"
                                    style={{ 
                                        fontFamily: "'Inter', sans-serif",
                                        transitionDelay: `${groupIndex * 150 + 300}ms`
                                    }}
                                >
                                    Grupo {groupIndex + 1}
                                </text>

                                {/* Fila 3: Caja de Representación Geométrica */}
                                <rect
                                    x={centerX - 70}
                                    y={5}
                                    width={140}
                                    height={130}
                                    className="fill-none stroke-orange-300 dark:stroke-orange-700 stroke-2 stroke-dashed"
                                    rx={12}
                                    style={{
                                        transitionDelay: `${groupIndex * 150 + 500}ms`
                                    }}
                                />
                                
                                {/* Fila 4: Resultado Individual */}
                                <text
                                    x={centerX}
                                    y={170}
                                    textAnchor="middle"
                                    className="text-xl font-bold fill-slate-700 dark:fill-zinc-300 animate-in fade-in"
                                    style={{ 
                                        fontFamily: "'Quicksand', sans-serif",
                                        transitionDelay: `${groupIndex * 150 + 700}ms`
                                    }}
                                >
                                    = {13}
                                </text>
                            </g>
                        )
                    })}
                </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded bg-green-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Decenas (10)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Unidades (1)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-16 border-2 border-dashed border-orange-400 rounded" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Grupos iguales</span>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {isDivided 
                        ? "¡Correcto! Cada grupo recibe 1 decena y 3 unidades. 1 decena (10) + 3 unidades = 13." 
                        : "Observa cómo las decenas y las unidades se reparten por igual en cada grupo."}
                </p>
                <button
                    onClick={() => setIsDivided(!isDivided)}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95",
                        isDivided
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-700"
                    )}
                >
                    {isDivided ? (
                        <><RotateCcw className="h-5 w-5" /> Reiniciar</>
                    ) : (
                        <><Play className="h-5 w-5" /> Repartir en cantidades iguales</>
                    )}
                </button>
            </div>
        </div>
    )
}
