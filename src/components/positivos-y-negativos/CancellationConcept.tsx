"use client"

import React, { useState } from "react"
import { Play, Plus, Minus } from "lucide-react"

export function CancellationConcept() {
    const [animated, setAnimated] = useState(false)
    const [exercise1Answer, setExercise1Answer] = useState<number | null>(null)
    const [exercise2PosTiles, setExercise2PosTiles] = useState<number>(0)
    const [exercise2NegTiles, setExercise2NegTiles] = useState<number>(0)

    const triggerAnimation = () => {
        setAnimated(false)
        setTimeout(() => setAnimated(true), 100)
    }

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 dark:bg-red-900/10 rounded-bl-[100px] -z-10" />

                <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-4">
                    Pares Cero (Cancelación)
                </h2>
                <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl">
                    Cada ficha negativa <strong>cancela</strong> una ficha positiva. A esto se le conoce como un par cero. Veamos como funciona.
                </p>

                <div className="mt-8 bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
                        <button
                            onClick={triggerAnimation}
                            className="text-sm font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <Play className="w-4 h-4" /> Reproducir Animación
                        </button>
                        
                        <svg viewBox="0 0 300 200" className="w-full max-w-[250px] drop-shadow-md">
                            {/* Box */}
                            <rect x="20" y="20" width="160" height="160" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="3" className="dark:fill-zinc-800 dark:stroke-zinc-700" />
                            
                            {/* Positive Tiles (Static) */}
                            <g>
                                {/* Tile 1 (Will be cancelled) */}
                                <g className={`transition-all duration-1000 ${animated ? 'delay-1000 opacity-0' : 'opacity-100'}`}>
                                    <rect x="50" y="40" width="30" height="30" rx="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
                                    <path d="M65 48 v14 M58 55 h14" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                                </g>
                                {/* Tile 2 (Will be cancelled) */}
                                <g className={`transition-all duration-1000 ${animated ? 'delay-1000 opacity-0' : 'opacity-100'}`}>
                                    <rect x="50" y="85" width="30" height="30" rx="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
                                    <path d="M65 93 v14 M58 100 h14" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                                </g>
                                {/* Tile 3 (Will remain) */}
                                <g className={`transition-all duration-1000 ${animated ? 'delay-1000 translate-x-[40px] translate-y-[-45px]' : ''}`}>
                                    <rect x="50" y="130" width="30" height="30" rx="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
                                    <path d="M65 138 v14 M58 145 h14" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                                </g>
                            </g>

                            {/* Negative Tiles (Moving to cancel) */}
                            <g>
                                {/* Neg Tile 1 */}
                                <g className={`transition-all duration-1000 ease-in-out ${animated ? 'translate-x-[-80px] delay-1000 opacity-0' : ''}`}>
                                    <rect x="130" y="40" width="30" height="30" rx="8" fill="#fee2e2" stroke="#f87171" strokeWidth="2" />
                                    <path d="M138 55 h14" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
                                </g>
                                {/* Neg Tile 2 */}
                                <g className={`transition-all duration-1000 ease-in-out ${animated ? 'translate-x-[-80px] delay-1000 opacity-0' : ''}`}>
                                    <rect x="130" y="85" width="30" height="30" rx="8" fill="#fee2e2" stroke="#f87171" strokeWidth="2" />
                                    <path d="M138 100 h14" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
                                </g>
                            </g>

                            {/* Result bracket & text */}
                            <g className={`transition-all duration-1000 delay-[2000ms] ${animated ? 'opacity-100' : 'opacity-0'}`}>
                                <path d="M190 70 h15 v40 h-15" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <text x="220" y="98" fontSize="24" fontWeight="bold" fill="#334155" className="dark:fill-slate-200">1</text>
                            </g>
                        </svg>
                    </div>

                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="bg-rose-50 dark:bg-rose-900/30 p-4 rounded-xl text-rose-900 dark:text-rose-200">
                            <strong>Explicación:</strong> Las fichas negativas (rojas) se unen con las fichas positivas (azules). Se cancelan entre ellas, desapareciendo. Al final, solo queda <strong>1</strong> ficha positiva.
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ejercicio 1 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-semibold text-slate-700 dark:text-zinc-200 mb-4 self-start">
                        3. ¿Cuál es el valor total mostrado?
                    </h3>
                    <div className="bg-slate-50 dark:bg-zinc-800 p-4 rounded-2xl border border-slate-100 dark:border-zinc-700 flex justify-center gap-4 mb-6 w-full">
                        <div className="flex flex-col gap-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg flex items-center justify-center">
                                    <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 border-2 border-rose-300 dark:border-rose-700 rounded-lg flex items-center justify-center">
                                    <Minus className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 w-full justify-center">
                        {[1, 2, 3, 5].map(num => (
                            <button
                                key={num}
                                onClick={() => setExercise1Answer(num)}
                                className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${exercise1Answer === num 
                                    ? num === 1 ? 'bg-emerald-500 text-white shadow-lg' : 'bg-red-500 text-white' 
                                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    {exercise1Answer === 1 && (
                        <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-4 animate-in fade-in slide-in-from-bottom-2">
                            ¡Correcto! Las dos fichas negativas cancelan dos positivas, dejando solo 1 ficha positiva.
                        </div>
                    )}
                </div>

                {/* Ejercicio 2 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-semibold text-slate-700 dark:text-zinc-200 mb-4 self-start">
                        4. Dibuja suficientes fichas para que el total sea -2.
                    </h3>
                    <div className="flex gap-4 items-center flex-col w-full">
                        <div className="min-h-[160px] w-full bg-slate-50 dark:bg-zinc-800 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-zinc-700 flex justify-center gap-4">
                            {/* Positives */}
                            <div className="flex flex-col gap-2">
                                {[...Array(exercise2PosTiles)].map((_, i) => (
                                    <div key={i} className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg flex items-center justify-center animate-in zoom-in duration-200">
                                        <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                ))}
                            </div>
                            {/* Negatives */}
                            <div className="flex flex-col gap-2">
                                {[...Array(exercise2NegTiles)].map((_, i) => (
                                    <div key={i} className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 border-2 border-rose-300 dark:border-rose-700 rounded-lg flex items-center justify-center animate-in zoom-in duration-200">
                                        <Minus className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                             <div className="flex flex-col gap-2 items-center">
                                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Fichas (+)</span>
                                <div className="flex gap-2">
                                    <button onClick={() => setExercise2PosTiles(Math.max(0, exercise2PosTiles - 1))} className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-slate-200 font-bold">-</button>
                                    <button onClick={() => setExercise2PosTiles(exercise2PosTiles + 1)} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 font-bold">+</button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                 <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Fichas (-)</span>
                                 <div className="flex gap-2">
                                     <button onClick={() => setExercise2NegTiles(Math.max(0, exercise2NegTiles - 1))} className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-slate-200 font-bold">-</button>
                                     <button onClick={() => setExercise2NegTiles(exercise2NegTiles + 1)} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 font-bold">+</button>
                                 </div>
                            </div>
                        </div>

                        {(exercise2PosTiles - exercise2NegTiles === -2) && (exercise2PosTiles > 0 || exercise2NegTiles > 0) && (
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-4 animate-in fade-in slide-in-from-bottom-2 text-center">
                                ¡Excelente! {exercise2PosTiles} fichas positivas y {exercise2NegTiles} negativas dan un valor de -2.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
