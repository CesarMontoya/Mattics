"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function BasicDivisionVisual() {
    const [isDivided, setIsDivided] = useState(false)
    const totalUnits = 9
    const numberOfGroups = 3
    const unitsPerGroup = totalUnits / numberOfGroups

    const circleRadius = 18
    const spacing = 55
    const groupSpacingY = 80

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">

                {/* Visualizador SVG */}
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[350px]">
                    <svg
                        viewBox="0 0 500 400"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Render units */}
                        {Array.from({ length: totalUnits }).map((_, i) => {
                            const groupIndex = Math.floor(i / unitsPerGroup)
                            const positionInGroup = i % unitsPerGroup
                            
                            // Initial position: all in a single horizontal row at the center top
                            const initialX = 140 + i * 40
                            const initialY = 50

                            // Final position: stacked groups vertically
                            // Center horizontally in the SVG
                            const centerX = 250 - (unitsPerGroup * spacing) / 2 + spacing / 2
                            const finalX = centerX + positionInGroup * spacing
                            const finalY = 120 + groupIndex * groupSpacingY

                            const targetX = isDivided ? finalX : initialX
                            const targetY = isDivided ? finalY : initialY

                            return (
                                <circle
                                    key={i}
                                    cx={targetX}
                                    cy={targetY}
                                    r={circleRadius}
                                    className="fill-blue-500 stroke-blue-600 stroke-2 transition-all duration-700 ease-out"
                                    style={{ 
                                        filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))',
                                        transitionDelay: isDivided ? `${groupIndex * 150}ms` : '0ms'
                                    }}
                                />
                            )
                        })}

                        {/* Group boxes and labels */}
                        {isDivided && Array.from({ length: numberOfGroups }).map((_, groupIndex) => {
                            const centerX = 250 - (unitsPerGroup * spacing) / 2 + spacing / 2
                            const boxWidth = (unitsPerGroup - 1) * spacing + circleRadius * 2 + 30
                            
                            return (
                                <g key={`group-${groupIndex}`}>
                                    {/* Group box */}
                                    <rect
                                        x={centerX - circleRadius - 15}
                                        y={120 + groupIndex * groupSpacingY - circleRadius - 10}
                                        width={boxWidth}
                                        height={circleRadius * 2 + 20}
                                        className="fill-none stroke-orange-300 dark:stroke-orange-700 stroke-2 stroke-dashed"
                                        rx={15}
                                        style={{
                                            transitionDelay: `${groupIndex * 150 + 400}ms`
                                        }}
                                    />
                                    
                                    {/* Group label to the left of the box */}
                                    <text
                                        x={centerX - circleRadius - 30}
                                        y={120 + groupIndex * groupSpacingY + 5}
                                        textAnchor="end"
                                        className="text-sm font-bold fill-orange-600 dark:fill-orange-400 animate-in fade-in"
                                        style={{ 
                                            fontFamily: "'Inter', sans-serif",
                                            transitionDelay: `${groupIndex * 150 + 600}ms`
                                        }}
                                    >
                                        Grupo {groupIndex + 1}
                                    </text>
                                </g>
                            )
                        })}

                        {/* Division result */}
                        <g className={cn(
                            "transition-all duration-1000 ease-out",
                            isDivided ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}>
                            <text
                                x={250}
                                y={360}
                                textAnchor="middle"
                                className="text-4xl font-black fill-orange-600 dark:fill-orange-400"
                                style={{ fontFamily: "'Quicksand', sans-serif" }}
                            >
                                {totalUnits} ÷ {numberOfGroups} = {unitsPerGroup}
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
                        <div className="h-4 w-16 border-2 border-dashed border-orange-400 rounded" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Grupos</span>
                    </div>
                    <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-100 dark:border-orange-900/50">
                        <p className="text-xs text-orange-800 dark:text-orange-200 leading-relaxed">
                            <strong>Dividir</strong> es repartir en cantidades iguales.
                        </p>
                    </div>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {isDivided 
                        ? `¡Perfecto! Al repartir ${totalUnits} unidades en ${numberOfGroups} grupos iguales, cada grupo tiene ${unitsPerGroup} unidades.` 
                        : `Observa cómo ${totalUnits} unidades se reparten en ${numberOfGroups} grupos con la misma cantidad.`}
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
