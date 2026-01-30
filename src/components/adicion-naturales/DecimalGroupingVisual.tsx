"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function DecimalGroupingVisual() {
    const [isGrouped, setIsGrouped] = useState(false)
    const totalCircles = 14
    const collapseThreshold = 10

    // Visual configuration
    const spacing = 40
    const startX = 35
    const centerY = 100 // Lowered to make room for brace and square above
    const circleRadius = 14
    const squareSize = 34

    // Brace calculation
    const braceStartX = startX - 15
    const braceEndX = startX + (9 * spacing) + 15
    const braceWidth = braceEndX - braceStartX
    const braceMidX = braceStartX + braceWidth / 2
    const braceY = centerY - 25

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">

                {/* Visualizador SVG */}
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[160px]">
                    <svg
                        viewBox={`0 0 600 160`}
                        className="w-full h-full overflow-visible"
                    >
                        {/* THE BRACE (Horizontal { ) */}
                        <path
                            d={`
                                M ${braceStartX} ${braceY} 
                                Q ${braceStartX} ${braceY - 10} ${braceStartX + 15} ${braceY - 10} 
                                L ${braceMidX - 15} ${braceY - 10} 
                                Q ${braceMidX} ${braceY - 10} ${braceMidX} ${braceY - 20} 
                                Q ${braceMidX} ${braceY - 10} ${braceMidX + 15} ${braceY - 10} 
                                L ${braceEndX - 15} ${braceY - 10} 
                                Q ${braceEndX} ${braceY - 10} ${braceEndX} ${braceY}
                            `}
                            fill="none"
                            className={cn(
                                "stroke-emerald-400 dark:stroke-emerald-600 stroke-2 transition-all duration-500",
                                isGrouped ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100"
                            )}
                            style={{ transformOrigin: `${braceMidX}px ${braceY}px` }}
                        />

                        {/* INITIAL PREVIEW SQUARE (Above brace) */}
                        <rect
                            x={braceMidX - (squareSize / 2)}
                            y={braceY - 60}
                            width={squareSize}
                            height={squareSize}
                            rx={6}
                            className={cn(
                                "fill-emerald-100 dark:fill-emerald-950/50 stroke-emerald-300 dark:stroke-emerald-800 stroke-2 transition-all duration-[1000ms]",
                                isGrouped ? "opacity-0 translate-y-10 scale-50" : "opacity-100"
                            )}
                        />

                        {/* FINAL DECADE SQUARE (Where it ends up) */}
                        <rect
                            x={startX - (squareSize / 2)}
                            y={centerY - (squareSize / 2)}
                            width={squareSize}
                            height={squareSize}
                            rx={6}
                            className={cn(
                                "fill-emerald-500 stroke-emerald-600 stroke-2 transition-all duration-[1000ms] ease-out",
                                isGrouped ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-12 pointer-events-none"
                            )}
                            style={{ filter: 'drop-shadow(0px 4px 8px rgba(16, 185, 129, 0.4))' }}
                        />

                        {/* Units Rendering */}
                        {Array.from({ length: totalCircles }).map((_, i) => {
                            const isPartOfTen = i < collapseThreshold

                            // Position logic
                            let targetX;
                            if (isGrouped) {
                                if (isPartOfTen) {
                                    targetX = startX; // All first 10 go to 0 position
                                } else {
                                    // The 4 remaining units move next to the decade square
                                    targetX = startX + ((i - 9) * spacing);
                                }
                            } else {
                                targetX = startX + (i * spacing);
                            }

                            return (
                                <g key={i} className="transition-all duration-[1200ms] ease-in-out" style={{ transitionDelay: isGrouped && isPartOfTen ? `${(9 - i) * 50}ms` : '0ms' }}>
                                    <circle
                                        cx={targetX}
                                        cy={centerY}
                                        r={circleRadius}
                                        className={cn(
                                            "fill-blue-500 stroke-blue-600 stroke-2 transition-all duration-700",
                                            isGrouped && isPartOfTen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                                        )}
                                        style={{ filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))' }}
                                    />
                                </g>
                            )
                        })}

                        {/* VALORES POSICIONALES (Aparecen debajo de cada grupo) */}
                        <g className={cn(
                            "transition-all duration-1000 ease-out",
                            isGrouped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}>
                            {/* El 1 de la decena */}
                            <text
                                x={startX}
                                y={centerY + 55}
                                textAnchor="middle"
                                className="text-4xl font-black fill-emerald-600 dark:fill-emerald-400"
                                style={{ fontFamily: "'Quicksand', sans-serif" }}
                            >
                                1
                            </text>
                            {/* El 4 de las unidades */}
                            <text
                                x={startX + spacing}
                                y={centerY + 55}
                                textAnchor="middle"
                                className="text-4xl font-black fill-blue-600 dark:fill-blue-400"
                                style={{ fontFamily: "'Quicksand', sans-serif" }}
                            >
                                4
                            </text>
                        </g>
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Leyenda</h4>
                    <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full bg-blue-500" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Unidades</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-sm bg-emerald-500" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Decena (x10)</span>
                    </div>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 font-medium">
                    {isGrouped ? "14 unidades = 1 decena + 4 unidades sueltas." : "Observa cómo las primeras 10 unidades se transforman."}
                </p>
                <button
                    onClick={() => setIsGrouped(!isGrouped)}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95",
                        isGrouped
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700"
                    )}
                >
                    {isGrouped ? (
                        <><RotateCcw className="h-5 w-5" /> Deshacer grupo</>
                    ) : (
                        <><Play className="h-5 w-5" /> ¡Agrupar por Decenas!</>
                    )}
                </button>

            </div>
        </div>
    )
}
