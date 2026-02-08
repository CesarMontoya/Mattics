"use client"

import React, { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function ArrayMultiplicationVisual() {
    const [isRotated, setIsRotated] = useState(false)
    
    // Original: 5 columns × 3 rows
    // Rotated: 3 columns × 5 rows
    const cols = isRotated ? 3 : 5
    const rows = isRotated ? 5 : 3
    const total = cols * rows // Always 15

    const circleRadius = 12
    const spacing = 40
    const startX = 50
    const startY = 50

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="flex flex-col items-center gap-6">
                
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
                        Propiedad Conmutativa
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400">
                        El orden de los factores no altera el producto
                    </p>
                </div>

                {/* Visualizador SVG */}
                <div className="relative w-full overflow-visible min-h-[280px] max-w-2xl">
                    <svg
                        viewBox={`0 0 350 280`}
                        className="w-full h-full overflow-visible"
                    >
                        {/* Render the array */}
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <g key={rowIndex}>
                                {Array.from({ length: cols }).map((_, colIndex) => {
                                    const x = startX + (colIndex * spacing)
                                    const y = startY + (rowIndex * spacing)

                                    return (
                                        <circle
                                            key={`${rowIndex}-${colIndex}`}
                                            cx={x}
                                            cy={y}
                                            r={circleRadius}
                                            className={cn(
                                                "fill-blue-500 stroke-blue-600 stroke-2 transition-all duration-700 ease-out"
                                            )}
                                            style={{ 
                                                filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))',
                                                transitionDelay: `${(rowIndex * cols + colIndex) * 30}ms`
                                            }}
                                        />
                                    )
                                })}
                            </g>
                        ))}

                        {/* Equation label */}
                        <text
                            x={startX + (cols * spacing) / 2 - spacing / 2}
                            y={startY + (rows * spacing) + 35}
                            textAnchor="middle"
                            className="text-2xl font-black fill-purple-600 dark:fill-purple-400 transition-all duration-500"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            {cols} × {rows} = {total}
                        </text>

                        {/* Dimension labels */}
                        {/* Top label (columns) */}
                        <g className="transition-all duration-500">
                            <path
                                d={`M ${startX} ${startY - 20} L ${startX + (cols - 1) * spacing} ${startY - 20}`}
                                className="stroke-purple-400 dark:stroke-purple-600 stroke-2"
                                markerStart="url(#arrowStart)"
                                markerEnd="url(#arrowEnd)"
                            />
                            <text
                                x={startX + (cols * spacing) / 2 - spacing / 2}
                                y={startY - 25}
                                textAnchor="middle"
                                className="text-sm font-bold fill-purple-600 dark:fill-purple-400"
                            >
                                {cols}
                            </text>
                        </g>

                        {/* Side label (rows) */}
                        <g className="transition-all duration-500">
                            <path
                                d={`M ${startX - 20} ${startY} L ${startX - 20} ${startY + (rows - 1) * spacing}`}
                                className="stroke-purple-400 dark:stroke-purple-600 stroke-2"
                                markerStart="url(#arrowStart)"
                                markerEnd="url(#arrowEnd)"
                            />
                            <text
                                x={startX - 25}
                                y={startY + (rows * spacing) / 2 - spacing / 2}
                                textAnchor="middle"
                                className="text-sm font-bold fill-purple-600 dark:fill-purple-400"
                                transform={`rotate(-90, ${startX - 25}, ${startY + (rows * spacing) / 2 - spacing / 2})`}
                            >
                                {rows}
                            </text>
                        </g>

                        {/* Arrow markers */}
                        <defs>
                            <marker
                                id="arrowStart"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="2" className="fill-purple-400 dark:fill-purple-600" />
                            </marker>
                            <marker
                                id="arrowEnd"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="2" className="fill-purple-400 dark:fill-purple-600" />
                            </marker>
                        </defs>
                    </svg>
                </div>

                {/* Control and Message */}
                <div className="flex flex-col items-center gap-4">
                    <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center max-w-xl">
                        {isRotated 
                            ? "¡Observa! Aunque cambiamos el orden, seguimos teniendo 15 unidades." 
                            : "Haz clic para rotar el arreglo y comprobar que el resultado es el mismo."}
                    </p>
                    <button
                        onClick={() => setIsRotated(!isRotated)}
                        className="flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95 bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-none hover:bg-purple-700"
                    >
                        <RefreshCw className={cn("h-5 w-5 transition-transform duration-500", isRotated && "rotate-180")} />
                        {isRotated ? "5 × 3" : "3 × 5"}
                    </button>
                </div>
            </div>
        </div>
    )
}
