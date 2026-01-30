"use client"

import React, { useState } from 'react'
import { Play, RotateCcw, Lightbulb } from 'lucide-react'
import { cn } from "@/lib/utils"

export function CentenaGroupingVisual() {
    const [isGrouped, setIsGrouped] = useState(false)
    const totalSquares = 12
    const totalCircles = 5
    const collapseThreshold = 10

    // Visual configuration
    const spacing = 42
    const startX = 40
    const centerY = 110
    const circleRadius = 14
    const squareSize = 34
    const bigSquareSize = 42 // Yellow square is slightly larger

    // Brace calculation for first 10 squares
    const braceStartX = startX - 15
    const braceEndX = startX + (9 * spacing) + 15
    const braceWidth = braceEndX - braceStartX
    const braceMidX = braceStartX + braceWidth / 2
    const braceY = centerY - 30

    return (
        <div className="flex flex-col gap-10 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            {/* Visualizador SVG - Full width at top */}
            <div className="relative w-full overflow-visible min-h-[180px]">
                <svg
                    viewBox={`0 0 800 180`}
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
                            "stroke-amber-400 dark:stroke-amber-600 stroke-2 transition-all duration-500",
                            isGrouped ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100"
                        )}
                        style={{ transformOrigin: `${braceMidX}px ${braceY}px` }}
                    />

                    {/* INITIAL PREVIEW BIG YELLOW SQUARE (Above brace) */}
                    <rect
                        x={braceMidX - (bigSquareSize / 2)}
                        y={braceY - 70}
                        width={bigSquareSize}
                        height={bigSquareSize}
                        rx={8}
                        className={cn(
                            "fill-amber-100 dark:fill-amber-950/50 stroke-amber-300 dark:stroke-amber-800 stroke-2 transition-all duration-[1000ms]",
                            isGrouped ? "opacity-0 translate-y-10 scale-50" : "opacity-100"
                        )}
                    />

                    {/* FINAL CENTENA YELLOW SQUARE (Where it ends up) */}
                    <rect
                        x={startX - (bigSquareSize / 2)}
                        y={centerY - (bigSquareSize / 2)}
                        width={bigSquareSize}
                        height={bigSquareSize}
                        rx={8}
                        className={cn(
                            "fill-amber-400 stroke-amber-500 stroke-2 transition-all duration-[1000ms] ease-out",
                            isGrouped ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-12 pointer-events-none"
                        )}
                        style={{ filter: 'drop-shadow(0px 4px 12px rgba(251, 191, 36, 0.5))' }}
                    />

                    {/* Squares (Decenas) Rendering */}
                    {Array.from({ length: totalSquares }).map((_, i) => {
                        const isPartOfHundred = i < collapseThreshold

                        // Position logic
                        let targetX;
                        if (isGrouped) {
                            if (isPartOfHundred) {
                                targetX = startX; // All first 10 go to 0 position
                            } else {
                                targetX = startX + ((i - 9) * spacing);
                            }
                        } else {
                            targetX = startX + (i * spacing);
                        }

                        return (
                            <g key={`square-${i}`} className="transition-all duration-[1200ms] ease-in-out" style={{ transitionDelay: isGrouped && isPartOfHundred ? `${(9 - i) * 50}ms` : '0ms' }}>
                                <rect
                                    x={targetX - (squareSize / 2)}
                                    y={centerY - (squareSize / 2)}
                                    width={squareSize}
                                    height={squareSize}
                                    rx={6}
                                    className={cn(
                                        "fill-emerald-500 stroke-emerald-600 stroke-2 transition-all duration-700",
                                        isGrouped && isPartOfHundred ? "opacity-0 scale-0" : "opacity-100 scale-100"
                                    )}
                                    style={{ filter: 'drop-shadow(0px 2px 4px rgba(16, 185, 129, 0.3))' }}
                                />
                            </g>
                        )
                    })}

                    {/* Circles (Unidades) Rendering */}
                    {Array.from({ length: totalCircles }).map((_, i) => {
                        let targetX;
                        if (isGrouped) {
                            targetX = startX + (3 * spacing) + (i * spacing);
                        } else {
                            targetX = startX + (totalSquares * spacing) + (i * spacing);
                        }

                        return (
                            <g
                                key={`circle-${i}`}
                                className="transition-all duration-[1200ms] ease-in-out"
                                style={{ transform: `translateX(${targetX}px)` }}
                            >
                                <circle
                                    cx={0}
                                    cy={centerY}
                                    r={circleRadius}
                                    className="fill-blue-500 stroke-blue-600 stroke-2"
                                    style={{ filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))' }}
                                />
                            </g>
                        )
                    })}

                    {/* VALORES POSICIONALES */}
                    <g className={cn(
                        "transition-all duration-1000 ease-out",
                        isGrouped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}>
                        {/* El 1 de la centena */}
                        <text
                            x={startX}
                            y={centerY + 55}
                            textAnchor="middle"
                            className="text-4xl font-black fill-amber-600 dark:fill-amber-400"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            1
                        </text>
                        {/* El 2 de las decenas */}
                        <text
                            x={startX + (1.5 * spacing)}
                            y={centerY + 55}
                            textAnchor="middle"
                            className="text-4xl font-black fill-emerald-600 dark:fill-emerald-400"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            2
                        </text>
                        {/* El 5 de las unidades */}
                        <text
                            x={startX + (5 * spacing)}
                            y={centerY + 55}
                            textAnchor="middle"
                            className="text-4xl font-black fill-blue-600 dark:fill-blue-400"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            5
                        </text>
                    </g>
                </svg>
            </div>

            {/* Bottom Section: Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">

                {/* Left Column: Messages and Controls */}
                <div className="flex flex-col items-center gap-8 text-center">
                    {/* Bloque 1: Texto explicativo */}
                    <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium leading-tight max-w-xl">
                        {isGrouped
                            ? "12 decenas se convierten en 1 centena, quedan 2 decenas sueltas y se conservan las 5 unidades."
                            : "12 decenas y 5 unidades representan el número 125."}
                    </p>

                    {/* Bloque 2: Representación Numérica y Nota */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="text-5xl font-black text-slate-800 dark:text-zinc-100 tracking-tighter">
                            {isGrouped ? "125" : "12 D + 5 U"}
                        </div>

                        {/* EL BOMBILLO (Nota aclaratoria) - Colocado después del 125 */}
                        {isGrouped && (
                            <div className="flex items-start gap-3 p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 rounded-2xl text-md text-slate-700 dark:text-zinc-300 animate-in fade-in slide-in-from-bottom-3 max-w-md shadow-sm">
                                <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                                <p className="leading-snug">Al igual que con las unidades, cuando completamos 10 decenas, estas forman una unidad de orden superior: la <strong>Centena</strong>.</p>
                            </div>
                        )}
                    </div>

                    {/* Bloque 3: Botón de acción */}
                    <button
                        onClick={() => setIsGrouped(!isGrouped)}
                        className={cn(
                            "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95 shadow-lg",
                            isGrouped
                                ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200 shadow-none border border-slate-300/50 dark:border-zinc-700"
                                : "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200 dark:shadow-none"
                        )}
                    >
                        {isGrouped ? (
                            <><RotateCcw className="h-5 w-5" /> Deshacer</>
                        ) : (
                            <><Play className="h-5 w-5" /> ¡Agrupar!</>
                        )}
                    </button>
                </div>

                {/* Right Column: Legend (Independent Card) */}
                <div className="p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700 h-fit w-full max-w-xs lg:ml-auto">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Leyenda</h4>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-5 w-5 rounded bg-amber-400 shadow-sm" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Centena (x100)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-sm bg-emerald-500" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Decena (x10)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full bg-blue-500" />
                            <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Unidades</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
