"use client"

import React, { useState } from "react"
import { Play, Minus } from "lucide-react"

export function NegativeTilesConcept() {
    const [animated, setAnimated] = useState(false)
    const [exercise1Answer, setExercise1Answer] = useState<number | null>(null)
    const [exercise2Tiles, setExercise2Tiles] = useState<number>(0)

    const triggerAnimation = () => {
        setAnimated(false)
        setTimeout(() => setAnimated(true), 100)
    }

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 dark:bg-rose-900/10 rounded-bl-[100px] -z-10" />

                <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-4">
                    Suma de Fichas Negativas
                </h2>
                <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl">
                    Cuando juntamos dos grupos de fichas negativas, no hay nada que cancelar. Simplemente agrupamos (sumamos) la cantidad de fichas y el resultado es más negativo.
                </p>

                <div className="mt-8 bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
                        <button
                            onClick={triggerAnimation}
                            className="text-sm font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <Play className="w-4 h-4" /> Reproducir Animación
                        </button>
                        
                        <svg viewBox="0 0 350 200" className="w-full max-w-[300px] drop-shadow-md">
                            {/* Column 1: -2 */}
                            <g className={`transition-all duration-1000 ${animated ? 'translate-x-[40px]' : ''}`}>
                                <rect x="50" y="65" width="30" height="30" rx="8" fill="#fee2e2" stroke="#f87171" strokeWidth="2" />
                                <path d="M58 80 h14" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
                                <rect x="50" y="110" width="30" height="30" rx="8" fill="#fee2e2" stroke="#f87171" strokeWidth="2" />
                                <path d="M58 125 h14" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
                            </g>

                            {/* Plus sign */}
                            <g className={`transition-all duration-500 ${animated ? 'opacity-0' : 'opacity-100'}`}>
                                <path d="M125 80 v20 M115 90 h20" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                            </g>

                            {/* Column 2: -1 */}
                            <g className={`transition-all duration-1000 ${animated ? 'translate-x-[-10px]' : ''}`}>
                                <rect x="150" y="85" width="30" height="30" rx="8" fill="#fee2e2" stroke="#f87171" strokeWidth="2" />
                                <path d="M158 100 h14" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
                            </g>
                            
                            {/* Result bracket & text */}
                            <g className={`transition-all duration-1000 delay-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
                                <path d="M190 55 h15 v90 h-15" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <text x="220" y="108" fontSize="24" fontWeight="bold" fill="#334155" className="dark:fill-slate-200">-3</text>
                            </g>
                        </svg>
                    </div>

                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="bg-rose-50 dark:bg-rose-900/30 p-4 rounded-xl text-rose-900 dark:text-rose-200">
                            <strong>Explicación:</strong> Tenemos un grupo de <strong>-2</strong> y le sumamos un grupo de <strong>-1</strong>. Al combinarlos, formamos un solo grupo con 3 fichas negativas. El resultado es <strong>-3</strong>.
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ejercicio 1 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-semibold text-slate-700 dark:text-zinc-200 mb-4 self-start">
                        1. Encuentra la suma: -2 + (-3)
                    </h3>
                    <div className="bg-slate-50 dark:bg-zinc-800 p-4 rounded-2xl border border-slate-100 dark:border-zinc-700 w-full flex justify-center items-center gap-6 mb-6">
                        <div className="flex flex-col gap-2 items-center">
                            <span className="text-sm font-semibold text-slate-500 mb-1">-2</span>
                            {[...Array(2)].map((_, i) => (
                                <div key={`g1-${i}`} className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 border-2 border-rose-300 dark:border-rose-700 rounded-lg flex items-center justify-center">
                                    <Minus className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                </div>
                            ))}
                        </div>
                        <span className="text-2xl font-bold text-slate-300">+</span>
                        <div className="flex flex-col gap-2 items-center">
                            <span className="text-sm font-semibold text-slate-500 mb-1">-3</span>
                            {[...Array(3)].map((_, i) => (
                                <div key={`g2-${i}`} className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 border-2 border-rose-300 dark:border-rose-700 rounded-lg flex items-center justify-center">
                                    <Minus className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 w-full justify-center">
                        {[-5, -1, 1, 5].map(num => (
                            <button
                                key={num}
                                onClick={() => setExercise1Answer(num)}
                                className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${exercise1Answer === num 
                                    ? num === -5 ? 'bg-emerald-500 text-white shadow-lg' : 'bg-red-500 text-white' 
                                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    {exercise1Answer === -5 && (
                        <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-4 animate-in fade-in slide-in-from-bottom-2">
                            ¡Correcto! Al agruparlas obtienes -5.
                        </div>
                    )}
                </div>

                {/* Ejercicio 2 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-semibold text-slate-700 dark:text-zinc-200 mb-4 self-start line-clamp-1">
                        2. Completa la ecuación: -4 + (?) = -6
                    </h3>
                    <div className="flex gap-4 items-center flex-col w-full">
                        <div className="min-h-[160px] w-full bg-slate-50 dark:bg-zinc-800 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-zinc-700 flex justify-center items-center gap-6">
                            <div className="flex flex-col gap-2 items-center">
                                <span className="text-sm font-semibold text-slate-500 mb-1">-4</span>
                                {[...Array(4)].map((_, i) => (
                                    <div key={`g1-${i}`} className="w-10 h-10 bg-rose-100 opacity-60 dark:bg-rose-900/40 border-2 border-rose-300 dark:border-rose-700 rounded-lg flex items-center justify-center">
                                        <Minus className="w-5 h-5 text-rose-600/60 dark:text-rose-400" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-2xl font-bold text-slate-300">+</span>
                            <div className="flex flex-col gap-2 min-h-[160px] justify-center items-center">
                                <span className="text-sm font-semibold text-indigo-500 mb-1">Tus fichas</span>
                                {[...Array(exercise2Tiles)].map((_, i) => (
                                    <div key={`user-${i}`} className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 border-2 border-rose-300 dark:border-rose-700 rounded-lg flex items-center justify-center animate-in zoom-in duration-200">
                                        <Minus className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={() => setExercise2Tiles(Math.max(0, exercise2Tiles - 1))}
                                className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 rounded-xl hover:bg-slate-200 font-semibold"
                            >
                                Quitar
                            </button>
                            <button
                                onClick={() => setExercise2Tiles(Math.min(4, exercise2Tiles + 1))}
                                className="px-4 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 font-semibold shadow-md"
                            >
                                Ficha Negativa
                            </button>
                        </div>
                        {exercise2Tiles === 2 && (
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-2 animate-in fade-in slide-in-from-bottom-2 text-center">
                                ¡Listo! Sumando -2 logras agrupar un total de -6.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
