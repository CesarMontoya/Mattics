"use client"

import React, { useState } from "react"
import { Play, Plus } from "lucide-react"

export function PositiveTilesConcept() {
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
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-[100px] -z-10" />

                <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-4">
                    Fichas Positivas
                </h2>
                <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl">
                    Cada ficha positiva tiene un valor de 1. Para encontrar el valor total simplemente contamos cuántas fichas hay en el grupo.
                </p>

                <div className="mt-8 bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
                        <button
                            onClick={triggerAnimation}
                            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <Play className="w-4 h-4" /> Reproducir Animación
                        </button>
                        
                        <svg viewBox="0 0 300 200" className="w-full max-w-[250px] drop-shadow-md">
                            <defs>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>
                            
                            {/* Box */}
                            <rect x="20" y="20" width="160" height="160" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="3" className="dark:fill-zinc-800 dark:stroke-zinc-700"/>
                            
                            {/* Tiles */}
                            <g className={`transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                                <rect x="90" y="40" width="30" height="30" rx="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
                                <path d="M105 48 v14 M98 55 h14" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                            </g>
                            
                            <g className={`transition-all duration-700 delay-300 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                                <rect x="90" y="85" width="30" height="30" rx="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
                                <path d="M105 93 v14 M98 100 h14" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                            </g>

                            <g className={`transition-all duration-700 delay-500 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                                <rect x="90" y="130" width="30" height="30" rx="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
                                <path d="M105 138 v14 M98 145 h14" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                            </g>
                            
                            {/* Result bracket & text */}
                            <g className={`transition-all duration-1000 delay-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
                                <path d="M190 40 h15 v120 h-15" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <text x="220" y="108" fontSize="24" fontWeight="bold" fill="#334155" className="dark:fill-slate-200">3</text>
                            </g>
                        </svg>
                    </div>

                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl text-indigo-900 dark:text-indigo-200">
                            <strong>Explicación:</strong> Vemos un grupo con 3 fichas positivas. Al contarlas una por una, obtenemos un valor total de <strong>3</strong>.
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ejercicio 1 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-semibold text-slate-700 dark:text-zinc-200 mb-4 self-start">
                        1. ¿Cuál es el valor total mostrado?
                    </h3>
                    <div className="bg-slate-50 dark:bg-zinc-800 p-4 rounded-2xl border border-slate-100 dark:border-zinc-700 w-32 flex flex-col items-center gap-2 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg flex items-center justify-center">
                                <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 w-full justify-center">
                        {[3, 4, 5, 6].map(num => (
                            <button
                                key={num}
                                onClick={() => setExercise1Answer(num)}
                                className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${exercise1Answer === num 
                                    ? num === 5 ? 'bg-emerald-500 text-white shadow-lg' : 'bg-red-500 text-white' 
                                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    {exercise1Answer === 5 && (
                        <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-4 animate-in fade-in slide-in-from-bottom-2">
                            ¡Correcto! Hay 5 fichas positivas.
                        </div>
                    )}
                </div>

                {/* Ejercicio 2 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-semibold text-slate-700 dark:text-zinc-200 mb-4 self-start">
                        2. Coloca fichas para que el resultado sea 4.
                    </h3>
                    <div className="flex gap-4 items-center flex-col w-full">
                        <div className="min-h-[160px] w-32 bg-slate-50 dark:bg-zinc-800 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-zinc-700 flex flex-col items-center gap-2">
                            {[...Array(exercise2Tiles)].map((_, i) => (
                                <div key={i} className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg flex items-center justify-center animate-in zoom-in duration-200">
                                    <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setExercise2Tiles(Math.max(0, exercise2Tiles - 1))}
                                className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 rounded-xl hover:bg-slate-200 font-semibold"
                            >
                                Quitar
                            </button>
                            <button
                                onClick={() => setExercise2Tiles(Math.min(6, exercise2Tiles + 1))}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold shadow-md"
                            >
                                Añadir Ficha
                            </button>
                        </div>
                        {exercise2Tiles === 4 && (
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-2 animate-in fade-in slide-in-from-bottom-2">
                                ¡Excelente trabajo!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
