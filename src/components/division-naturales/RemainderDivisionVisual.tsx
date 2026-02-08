"use client"

import React, { useState } from 'react'
import { Play, RotateCcw, Info } from 'lucide-react'
import { cn } from "@/lib/utils"

export function RemainderDivisionVisual() {
    const [isDivided, setIsDivided] = useState(false)
    
    // Problem: 17 ÷ 5 = 3 (remainder 2)
    const totalUnits = 17
    const numberOfGroups = 5
    const unitsPerGroup = 3
    const remainder = 2

    const circleRadius = 14
    const itemSpacing = 40
    const groupSpacing = 90

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-50 dark:border-zinc-800 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">División con Residuo</h3>
                    <p className="text-slate-500 dark:text-zinc-400">Descubre qué sucede cuando no se puede repartir todo.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                    <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                        17 ÷ 5 = {isDivided ? "3 (R: 2)" : "?"}
                    </span>
                </div>
            </div>

            <div className="relative w-full overflow-visible min-h-[320px]">
                <svg
                    viewBox={`0 0 ${isDivided ? 550 : 400} 200`}
                    className="w-full h-full overflow-visible"
                >
                    {/* Initial state - all units together */}
                    {!isDivided && (
                        <g>
                            <text
                                x={200}
                                y={40}
                                textAnchor="middle"
                                className="text-lg font-bold fill-slate-600 dark:fill-zinc-400"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                17 unidades para repartir
                            </text>
                            {Array.from({ length: totalUnits }).map((_, i) => {
                                const row = Math.floor(i / 6)
                                const col = i % 6
                                return (
                                    <circle
                                        key={`unit-${i}`}
                                        cx={120 + col * itemSpacing}
                                        cy={80 + row * itemSpacing}
                                        r={circleRadius}
                                        className="fill-blue-500 stroke-blue-600 stroke-2"
                                        style={{ 
                                            filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))'
                                        }}
                                    />
                                )
                            })}
                        </g>
                    )}

                    {/* Distributed state */}
                    {isDivided && (
                        <g>
                            {/* Groups with distributed units */}
                            {Array.from({ length: numberOfGroups }).map((_, groupIndex) => (
                                <g key={`group-${groupIndex}`}>
                                    {/* Group box */}
                                    <rect
                                        x={30 + groupIndex * groupSpacing}
                                        y={60}
                                        width={75}
                                        height={140}
                                        className="fill-none stroke-orange-300 dark:stroke-orange-700 stroke-2 stroke-dashed animate-in fade-in"
                                        rx={10}
                                        style={{ animationDelay: `${groupIndex * 100}ms` }}
                                    />
                                    
                                    {/* Group label */}
                                    <text
                                        x={30 + groupIndex * groupSpacing + 37.5}
                                        y={45}
                                        textAnchor="middle"
                                        className="text-xs font-bold fill-orange-600 dark:fill-orange-400 animate-in fade-in"
                                        style={{ 
                                            fontFamily: "'Inter', sans-serif",
                                            animationDelay: `${groupIndex * 100 + 150}ms`
                                        }}
                                    >
                                        Grupo {groupIndex + 1}
                                    </text>

                                    {/* Units in group */}
                                    {Array.from({ length: unitsPerGroup }).map((_, unitIndex) => (
                                        <circle
                                            key={`g${groupIndex}-u${unitIndex}`}
                                            cx={30 + groupIndex * groupSpacing + 37.5}
                                            cy={85 + unitIndex * 35}
                                            r={circleRadius}
                                            className="fill-blue-500 stroke-blue-600 stroke-2 animate-in zoom-in"
                                            style={{ 
                                                filter: 'drop-shadow(0px 2px 4px rgba(59, 130, 246, 0.3))',
                                                animationDelay: `${groupIndex * 100 + unitIndex * 80 + 300}ms`
                                            }}
                                        />
                                    ))}

                                    {/* Result per group */}
                                    <text
                                        x={30 + groupIndex * groupSpacing + 37.5}
                                        y={220}
                                        textAnchor="middle"
                                        className="text-base font-bold fill-slate-700 dark:fill-zinc-300 animate-in fade-in"
                                        style={{ 
                                            fontFamily: "'Quicksand', sans-serif",
                                            animationDelay: `${groupIndex * 100 + 800}ms`
                                        }}
                                    >
                                        = {unitsPerGroup}
                                    </text>
                                </g>
                            ))}

                            {/* Remainder section with highlight */}
                            <g className="animate-in fade-in" style={{ animationDelay: '1000ms' }}>
                                {/* Remainder box */}
                                <rect
                                    x={480}
                                    y={60}
                                    width={60}
                                    height={140}
                                    className="fill-amber-50 dark:fill-amber-950/30 stroke-amber-400 dark:stroke-amber-600 stroke-2"
                                    rx={10}
                                />
                                
                                {/* Remainder label */}
                                <text
                                    x={510}
                                    y={45}
                                    textAnchor="middle"
                                    className="text-xs font-bold fill-amber-700 dark:fill-amber-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Residuo
                                </text>

                                {/* Remainder units */}
                                {Array.from({ length: remainder }).map((_, i) => (
                                    <circle
                                        key={`remainder-${i}`}
                                        cx={510}
                                        cy={100 + i * 40}
                                        r={circleRadius}
                                        className="fill-amber-400 stroke-amber-600 stroke-2 animate-in zoom-in"
                                        style={{ 
                                            filter: 'drop-shadow(0px 2px 4px rgba(251, 191, 36, 0.3))',
                                            animationDelay: `${1200 + i * 150}ms`
                                        }}
                                    />
                                ))}

                                {/* Remainder count */}
                                <text
                                    x={510}
                                    y={220}
                                    textAnchor="middle"
                                    className="text-base font-bold fill-amber-700 dark:fill-amber-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = {remainder}
                                </text>
                            </g>
                        </g>
                    )}
                </svg>
            </div>

            {/* Info box about remainders */}
            <div className="flex items-start gap-4 p-5 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-2">
                    <h4 className="font-bold text-blue-900 dark:text-blue-200">¿Qué es el residuo?</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                        El <strong>residuo</strong> (o resto) es lo que sobra cuando no podemos repartir todo en cantidades iguales. 
                        {isDivided && ` En este caso, al repartir 17 unidades en 5 grupos, cada grupo recibe 3 unidades y sobran 2.`}
                        {!isDivided && ` Presiona el botón para ver cómo funciona.`}
                    </p>
                </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-700">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Unidades repartidas</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-amber-400" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Unidades sobrantes (residuo)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-16 border-2 border-dashed border-orange-400 rounded" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300">Grupos iguales</span>
                </div>
            </div>

            {/* Controls and Message */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center max-w-2xl">
                    {isDivided 
                        ? `¡Perfecto! Al repartir ${totalUnits} unidades en ${numberOfGroups} grupos iguales, cada grupo recibe ${unitsPerGroup} unidades. Como ${numberOfGroups} × ${unitsPerGroup} = ${numberOfGroups * unitsPerGroup}, sobran ${remainder} unidades (el residuo).` 
                        : `Vamos a repartir ${totalUnits} unidades en ${numberOfGroups} grupos iguales. ¿Cuántas unidades recibirá cada grupo? ¿Sobrarán algunas?`}
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
