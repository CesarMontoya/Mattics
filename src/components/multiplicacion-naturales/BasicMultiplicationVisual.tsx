"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function BasicMultiplicationVisual() {
    const [isMultiplied, setIsMultiplied] = useState(false)
    const unitsPerRow = 4
    const numberOfRows = 3
    const totalUnits = unitsPerRow * numberOfRows

    const circleRadius = 14
    const spacing = 45
    const startX = 50
    const startY = 50
    const rowGap = 55

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">

                {/* Visualizador SVG */}
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[280px]">
                    <svg
                        viewBox={`0 0 300 280`}
                        className="w-full h-full overflow-visible"
                    >
                        {/* Render rows */}
                        {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
                            <g key={rowIndex}>
                                {/* Render circles in each row */}
                                {Array.from({ length: unitsPerRow }).map((_, colIndex) => {
                                    const targetX = startX + (colIndex * spacing)
                                    
                                    // All rows start from the first row position
                                    // Then move to their final positions when multiplied
                                    const initialY = startY
                                    const finalY = startY + (rowIndex * rowGap)
                                    const currentY = isMultiplied ? finalY : initialY

                                    // Only first row is visible initially
                                    // Other rows fade in as they move down
                                    const isVisible = isMultiplied || rowIndex === 0

                                    return (
                                        <circle
                                            key={`${rowIndex}-${colIndex}`}
                                            cx={targetX}
                                            cy={currentY}
                                            r={circleRadius}
                                            className={cn(
                                                "fill-blue-500 stroke-blue-600 stroke-2 transition-all duration-700 ease-out",
                                                isVisible ? "opacity-100" : "opacity-0"
                                            )}
                                            style={{ 
                                                filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))',
                                                transitionDelay: isMultiplied ? `${rowIndex * 200}ms` : '0ms'
                                            }}
                                        />
                                    )
                                })}
                            </g>
                        ))}

                        {/* Multiplication label */}
                        <g className={cn(
                            "transition-all duration-1000 ease-out",
                            isMultiplied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}>
                            <text
                                x={startX + (unitsPerRow * spacing) / 2 - spacing / 2}
                                y={startY + (numberOfRows * rowGap) + 40}
                                textAnchor="middle"
                                className="text-3xl font-black fill-purple-600 dark:fill-purple-400"
                                style={{ fontFamily: "'Quicksand', sans-serif" }}
                            >
                                {unitsPerRow} × {numberOfRows} = {totalUnits}
                            </text>
                        </g>

                        {/* Row labels on the right */}
                        {isMultiplied && Array.from({ length: numberOfRows }).map((_, rowIndex) => (
                            <text
                                key={`label-${rowIndex}`}
                                x={startX + (unitsPerRow * spacing) + 20}
                                y={startY + (rowIndex * rowGap) + 5}
                                className="text-sm font-semibold fill-slate-400 dark:fill-zinc-500 animate-in fade-in"
                                style={{ 
                                    fontFamily: "'Inter', sans-serif",
                                    transitionDelay: `${rowIndex * 150 + 400}ms`
                                }}
                            >
                                Fila {rowIndex + 1}
                            </text>
                        ))}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Leyenda</h4>
                    <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full bg-blue-500" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Unidades</span>
                    </div>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {isMultiplied 
                        ? `¡Perfecto! 4 unidades repetidas 3 veces nos dan ${totalUnits} unidades en total.` 
                        : "Observa cómo una fila de 4 unidades se replica hacia abajo."}
                </p>
                <button
                    onClick={() => setIsMultiplied(!isMultiplied)}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95",
                        isMultiplied
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-none hover:bg-purple-700"
                    )}
                >
                    {isMultiplied ? (
                        <><RotateCcw className="h-5 w-5" /> Reiniciar</>
                    ) : (
                        <><Play className="h-5 w-5" /> ¡Multiplicar!</>
                    )}
                </button>

            </div>
        </div>
    )
}
