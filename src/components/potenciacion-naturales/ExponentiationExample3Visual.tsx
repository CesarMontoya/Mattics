"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function ExponentiationExample3Visual() {
    const [step, setStep] = useState(0)
    const base = 5
    const exponent = 3
    const result = Math.pow(base, exponent)

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1)
        } else {
            setStep(0)
        }
    }

    return (
        <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">

                {/* Visualizador SVG */}
                <div className="lg:col-span-3 relative w-full overflow-visible min-h-[320px]">
                    <svg
                        viewBox="0 0 550 320"
                        className="w-full h-full overflow-visible"
                    >
                        {/* Step 0: Show exponential notation */}
                        {step === 0 && (
                            <g className="animate-in fade-in duration-500">
                                <text
                                    x={275}
                                    y={160}
                                    textAnchor="middle"
                                    className="text-6xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base}
                                    <tspan className="text-4xl" dy="-30" dx="5">{exponent}</tspan>
                                </text>
                            </g>
                        )}

                        {/* Step 1: Show expansion */}
                        {step === 1 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={275}
                                    y={160}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base} × {base} × {base}
                                </text>
                            </g>
                        )}

                        {/* Step 2: Show calculation steps */}
                        {step === 2 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={275}
                                    y={130}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base} × {base} = {base * base}
                                </text>
                                <text
                                    x={275}
                                    y={180}
                                    textAnchor="middle"
                                    className="text-3xl font-bold fill-slate-600 dark:fill-zinc-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    {base * base} × {base} = {result}
                                </text>
                            </g>
                        )}

                        {/* Step 3: Show result with 5x5x5 cube visualization */}
                        {step === 3 && (
                            <g className="animate-in fade-in duration-700">
                                <text
                                    x={275}
                                    y={60}
                                    textAnchor="middle"
                                    className="text-5xl font-black fill-orange-600 dark:fill-orange-400"
                                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                                >
                                    = {result}
                                </text>
                                
                                {/* 3D cube representation (isometric view) */}
                                {/* Front face (5x5) */}
                                {Array.from({ length: base }).map((_, row) =>
                                    Array.from({ length: base }).map((_, col) => {
                                        const cubeSize = 16
                                        const gap = 2
                                        const totalSize = cubeSize + gap
                                        const startX = 180
                                        const startY = 110
                                        
                                        return (
                                            <rect
                                                key={`front-${row}-${col}`}
                                                x={startX + col * totalSize}
                                                y={startY + row * totalSize}
                                                width={cubeSize}
                                                height={cubeSize}
                                                className="fill-orange-500 stroke-orange-700 dark:fill-orange-400 dark:stroke-orange-600"
                                                strokeWidth={1.5}
                                                rx={2}
                                                style={{
                                                    filter: 'drop-shadow(0px 2px 3px rgba(249, 115, 22, 0.3))'
                                                }}
                                            />
                                        )
                                    })
                                )}
                                
                                {/* Right face (partial 5x5 to show depth) */}
                                {Array.from({ length: base }).map((_, row) =>
                                    Array.from({ length: 3 }).map((_, depth) => {
                                        const cubeSize = 16
                                        const gap = 2
                                        const totalSize = cubeSize + gap
                                        const startX = 180 + base * totalSize
                                        const startY = 110
                                        const offsetX = depth * 8
                                        const offsetY = row * totalSize - depth * 8
                                        
                                        return (
                                            <rect
                                                key={`right-${row}-${depth}`}
                                                x={startX + offsetX}
                                                y={startY + offsetY}
                                                width={cubeSize}
                                                height={cubeSize}
                                                className="fill-orange-400 stroke-orange-600 dark:fill-orange-300 dark:stroke-orange-500"
                                                strokeWidth={1.5}
                                                rx={2}
                                                style={{
                                                    filter: 'drop-shadow(0px 2px 3px rgba(249, 115, 22, 0.2))',
                                                    opacity: 0.8
                                                }}
                                            />
                                        )
                                    })
                                )}
                                
                                {/* Top face (partial 5x5 to show depth) */}
                                {Array.from({ length: 3 }).map((_, depth) =>
                                    Array.from({ length: base }).map((_, col) => {
                                        const cubeSize = 16
                                        const gap = 2
                                        const totalSize = cubeSize + gap
                                        const startX = 180
                                        const startY = 110
                                        const offsetX = col * totalSize + depth * 8
                                        const offsetY = -depth * 8
                                        
                                        return (
                                            <rect
                                                key={`top-${depth}-${col}`}
                                                x={startX + offsetX}
                                                y={startY + offsetY - totalSize}
                                                width={cubeSize}
                                                height={cubeSize}
                                                className="fill-orange-600 stroke-orange-800 dark:fill-orange-500 dark:stroke-orange-700"
                                                strokeWidth={1.5}
                                                rx={2}
                                                style={{
                                                    filter: 'drop-shadow(0px 2px 3px rgba(249, 115, 22, 0.2))',
                                                    opacity: 0.9
                                                }}
                                            />
                                        )
                                    })
                                )}
                                
                                {/* Dimension labels */}
                                <text
                                    x={270}
                                    y={250}
                                    textAnchor="middle"
                                    className="text-xs font-bold fill-slate-500 dark:fill-zinc-500"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {base} × {base} × {base} = {result} cubitos
                                </text>
                            </g>
                        )}
                    </svg>
                </div>

                {/* Legend */}
                <div className="lg:col-span-1 flex flex-col gap-4 p-5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/50 h-fit">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400 mb-1">Ejemplo 3</h4>
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded bg-orange-500" />
                        <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">Cubo {base}×{base}×{base}</span>
                    </div>
                </div>
            </div>

            {/* Controles y Mensaje */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium text-center">
                    {step === 0 && `${base}³ se lee "${base} al cubo"`}
                    {step === 1 && `Expandimos en ${base} × ${base} × ${base}`}
                    {step === 2 && `Calculamos paso a paso`}
                    {step === 3 && `El resultado es ${result}, representado como un cubo tridimensional de ${base}×${base}×${base}`}
                </p>
                <button
                    onClick={handleNext}
                    className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all active:scale-95",
                        step === 3
                            ? "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-200"
                            : "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-700"
                    )}
                >
                    {step === 3 ? (
                        <><RotateCcw className="h-5 w-5" /> Reiniciar</>
                    ) : (
                        <><Play className="h-5 w-5" /> Siguiente</>
                    )}
                </button>
            </div>
        </div>
    )
}
