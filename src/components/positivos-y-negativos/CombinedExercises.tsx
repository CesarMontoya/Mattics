"use client"

import React, { useState } from "react"
import { Plus, Minus, Calculator } from "lucide-react"

export function CombinedExercises() {
    // Ejercicio 1
    const [ex1Answer, setEx1Answer] = useState<number | null>(null)
    
    // Ejercicio 2
    const [ex2PosTiles, setEx2PosTiles] = useState<number>(0)
    const [ex2NegTiles, setEx2NegTiles] = useState<number>(0)
    
    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-[100px] -z-10" />
                <div className="flex items-center gap-4 mb-4">
                    <Calculator className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
                        Ejercicios Combinados
                    </h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl">
                    ¡Hora de poner a prueba todo lo que hemos aprendido! Veamos si logras cancelar, contar fichas positivas y negativas, y descubrir el resultado final.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Ejercicio 1 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <h3 className="font-semibold text-slate-700 dark:text-zinc-200">
                            1. Encuentra la suma: <span className="font-mono text-indigo-600 dark:text-indigo-400">4 + (-6)</span>
                        </h3>
                        <p className="text-sm text-slate-500">
                            Esto significa 4 fichas positivas y 6 fichas negativas combinadas.
                        </p>
                    </div>
                    
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <div className="flex gap-2 mb-6">
                            {[-3, -2, 2, 10].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setEx1Answer(num)}
                                    className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${ex1Answer === num 
                                        ? num === -2 ? 'bg-emerald-500 text-white shadow-lg' : 'bg-red-500 text-white' 
                                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        {ex1Answer === -2 && (
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold animate-in fade-in slide-in-from-bottom-2 bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-xl">
                                ¡Correcto! Las 4 positivas de cancelan con 4 negativas. Quedan 2 negativas (-2).
                            </div>
                        )}
                    </div>
                </div>

                {/* Ejercicio 2 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <h3 className="font-semibold text-slate-700 dark:text-zinc-200">
                            2. Haz que la ecuación sea verdadera: <span className="font-mono text-indigo-600 dark:text-indigo-400">-3 + (?) = 2</span>
                        </h3>
                        <p className="text-sm text-slate-500">
                            Empieza poniendo las 3 fichas negativas. Luego, añade las necesarias hasta llegar a que sobrén 2 positivas.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                             <div className="flex flex-col gap-2">
                                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tus Fichas (+)</span>
                                <div className="flex gap-2">
                                    <button onClick={() => setEx2PosTiles(Math.max(0, ex2PosTiles - 1))} className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-slate-200 font-bold">-</button>
                                    <button onClick={() => setEx2PosTiles(ex2PosTiles + 1)} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 font-bold">+</button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                 <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tus Fichas (-)</span>
                                 <div className="flex gap-2">
                                     <button onClick={() => setEx2NegTiles(Math.max(0, ex2NegTiles - 1))} className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-slate-200 font-bold">-</button>
                                     <button onClick={() => setEx2NegTiles(ex2NegTiles + 1)} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 font-bold">+</button>
                                 </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
                        <div className="w-full min-h-[160px] bg-slate-50 dark:bg-zinc-800 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-zinc-700 flex justify-center gap-4">
                            <div className="flex flex-col gap-2">
                                {[...Array(ex2PosTiles)].map((_, i) => (
                                    <div key={`p-${i}`} className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg flex items-center justify-center animate-in zoom-in duration-200">
                                        <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                {/* Base -3 */}
                                {[...Array(3)].map((_, i) => (
                                    <div key={`n-base-${i}`} className="w-10 h-10 bg-rose-100 opacity-50 dark:bg-rose-900/30 border-2 border-rose-300/50 rounded-lg flex items-center justify-center">
                                        <Minus className="w-5 h-5 text-rose-600/50 dark:text-rose-400/50" />
                                    </div>
                                ))}
                                {/* Added neg */}
                                {[...Array(ex2NegTiles)].map((_, i) => (
                                    <div key={`n-${i}`} className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 border-2 border-rose-300 dark:border-rose-700 rounded-lg flex items-center justify-center animate-in zoom-in duration-200">
                                        <Minus className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {(ex2PosTiles - (3 + ex2NegTiles) === 2) && (
                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-4 animate-in fade-in slide-in-from-bottom-2 text-center bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-xl">
                                ¡Eso es! Agregaste {ex2PosTiles} fichas positivas. 3 se cancelan con las negativas y te quedan 2 libres.
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Ejercicio 3 removed for contextualized exercises */}
            </div>
        </div>
    )
}
