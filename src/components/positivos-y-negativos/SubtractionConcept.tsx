"use client"

import React, { useState } from "react"
import { Plus, Minus, ArrowDown, Activity, RotateCcw } from "lucide-react"

export function SubtractionConcept() {
    // Estado para la animación inicial (4 - (-3))
    const [step1Transformed, setStep1Transformed] = useState(false)
    
    // Ejercicios
    const [ex1Transformed, setEx1Transformed] = useState(false)
    const [ex1Answer, setEx1Answer] = useState<number | null>(null)

    const [ex2Transformed, setEx2Transformed] = useState(false)
    const [ex2Answer, setEx2Answer] = useState<number | null>(null)

    const [ex3Transformed, setEx3Transformed] = useState(false)
    const [ex3Answer, setEx3Answer] = useState<number | null>(null)

    const [ex4Transformed, setEx4Transformed] = useState(false)
    const [ex4Answer, setEx4Answer] = useState<number | null>(null)

    const renderTiles = (type: "pos" | "neg", count: number, opacity: string = "opacity-100", animation: string = "") => {
        return (
            <div className={`flex flex-wrap gap-1 w-24 justify-center ${opacity}`}>
                {[...Array(count)].map((_, i) => (
                    <div 
                        key={`${type}-${i}`} 
                        className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 ${
                            type === 'pos' 
                            ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700' 
                            : 'bg-rose-100 dark:bg-rose-900/50 border-rose-300 dark:border-rose-700'
                        } ${animation}`}
                    >
                        {type === 'pos' 
                            ? <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            : <Minus className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50 dark:bg-violet-900/10 rounded-bl-[100px] -z-10" />
                <div className="flex items-center gap-4 mb-4">
                    <Activity className="w-8 h-8 text-violet-500 dark:text-violet-400" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
                        Resta de Enteros: El Transformador de Signos
                    </h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl">
                    La resta en matemáticas tiene un superpoder: <strong>cambia el signo</strong> de todo lo que está a su derecha. En lugar de restar, podemos transformarlo en una suma con el signo contrario.
                </p>
            </div>

            {/* Ejemplo Inicial */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 mb-2">
                        Ejemplo: <span className="font-mono text-indigo-600 dark:text-indigo-400">4 - (-3)</span>
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400">
                        Observa cómo el signo menos transforma las fichas negativas de la derecha en positivas, y el operador se convierte en suma.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6 bg-slate-50 dark:bg-zinc-800/50 p-8 rounded-2xl">
                    {/* Paso 1: Original */}
                    <div className={`flex items-center gap-6 transition-all duration-700 ${step1Transformed ? "opacity-40 scale-95" : "opacity-100 scale-100"}`}>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-semibold text-slate-500">Columna 1 (+4)</span>
                            {renderTiles("pos", 4)}
                        </div>
                        
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center border-2 border-slate-300 dark:border-zinc-600">
                            <Minus className="w-6 h-6 text-slate-700 dark:text-zinc-300" />
                        </div>
                        
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-semibold text-slate-500">Columna 2 (-3)</span>
                            {renderTiles("neg", 3)}
                        </div>
                    </div>

                    {/* Botón de Transformación */}
                    {!step1Transformed ? (
                        <button 
                            onClick={() => setStep1Transformed(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold shadow-lg shadow-violet-200 dark:shadow-violet-900/20 transition-all hover:-translate-y-1"
                        >
                            <ArrowDown className="w-5 h-5" />
                            <span>Aplicar Cambio de Signo</span>
                        </button>
                    ) : (
                        <button 
                            onClick={() => setStep1Transformed(false)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-slate-700 dark:text-zinc-300 rounded-lg text-sm font-semibold transition-all"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Reiniciar</span>
                        </button>
                    )}

                    {/* Paso 2: Transformado */}
                    {step1Transformed && (
                        <div className="flex items-center gap-6 animate-in slide-in-from-top-4 fade-in duration-700">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-sm font-semibold text-slate-500">Sigue igual</span>
                                {renderTiles("pos", 4)}
                            </div>
                            
                            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center border-2 border-indigo-300 dark:border-indigo-600 animate-in zoom-in spin-in-180 duration-500 delay-150">
                                <Plus className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">¡Transformado!</span>
                                {renderTiles("pos", 3, "opacity-100", "animate-in zoom-in flip-in-y duration-700 delay-300")}
                            </div>
                        </div>
                    )}

                    {/* Resultado */}
                    {step1Transformed && (
                        <div className="mt-4 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700 border border-emerald-200 dark:border-emerald-800">
                            ¡Ahora es más fácil! 4 + 3 = 7
                        </div>
                    )}
                </div>
            </div>

            {/* Ejercicios */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Ejercicio 1 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-slate-800 dark:text-zinc-100 mb-4 w-full text-center">
                        Ejercicio A: <span className="font-mono text-violet-600 dark:text-violet-400">-2 - (+3)</span>
                    </h3>
                    
                    <div className="flex flex-col items-center w-full bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl min-h-[300px]">
                        <div className={`flex items-center gap-4 transition-all duration-500 ${ex1Transformed ? "opacity-30 scale-90 mb-4" : "opacity-100 scale-100"}`}>
                            {renderTiles("neg", 2)}
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center border border-slate-300">
                                <Minus className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                            </div>
                            {renderTiles("pos", 3)}
                        </div>

                        {!ex1Transformed ? (
                            <button 
                                onClick={() => setEx1Transformed(true)}
                                className="mt-8 px-6 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg font-bold transition-all"
                            >
                                Transformar Resta
                            </button>
                        ) : (
                            <div className="flex flex-col items-center animate-in slide-in-from-top-4 fade-in duration-500">
                                <div className="flex items-center gap-4 mb-6">
                                    {renderTiles("neg", 2)}
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-300 animate-in spin-in-180 duration-500">
                                        <Plus className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    {renderTiles("neg", 3, "opacity-100", "animate-in flip-in-y duration-500")}
                                </div>
                                <p className="text-sm text-slate-500 mb-4 font-semibold">¿Cuál es el resultado de -2 + (-3)?</p>
                                <div className="flex gap-2">
                                    {[-5, -1, 1, 5].map(num => (
                                        <button
                                            key={`ex1-${num}`}
                                            onClick={() => setEx1Answer(num)}
                                            className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${ex1Answer === num 
                                                ? num === -5 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white' 
                                                : 'bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100'}`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                {ex1Answer === -5 && (
                                    <div className="mt-4 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-lg">
                                        ¡Correcto! 2 negativas y 3 negativas son 5 negativas.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Ejercicio 2 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-slate-800 dark:text-zinc-100 mb-4 w-full text-center">
                        Ejercicio B: <span className="font-mono text-violet-600 dark:text-violet-400">1 - (-4)</span>
                    </h3>
                    
                    <div className="flex flex-col items-center w-full bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl min-h-[300px]">
                        <div className={`flex items-center gap-4 transition-all duration-500 ${ex2Transformed ? "opacity-30 scale-90 mb-4" : "opacity-100 scale-100"}`}>
                            {renderTiles("pos", 1)}
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center border border-slate-300">
                                <Minus className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                            </div>
                            {renderTiles("neg", 4)}
                        </div>

                        {!ex2Transformed ? (
                            <button 
                                onClick={() => setEx2Transformed(true)}
                                className="mt-8 px-6 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg font-bold transition-all"
                            >
                                Transformar Resta
                            </button>
                        ) : (
                            <div className="flex flex-col items-center animate-in slide-in-from-top-4 fade-in duration-500">
                                <div className="flex items-center gap-4 mb-6">
                                    {renderTiles("pos", 1)}
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-300 animate-in spin-in-180 duration-500">
                                        <Plus className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    {renderTiles("pos", 4, "opacity-100", "animate-in flip-in-y duration-500")}
                                </div>
                                <p className="text-sm text-slate-500 mb-4 font-semibold">¿Cuál es el resultado de 1 + (+4)?</p>
                                <div className="flex gap-2">
                                    {[-5, -3, 3, 5].map(num => (
                                        <button
                                            key={`ex2-${num}`}
                                            onClick={() => setEx2Answer(num)}
                                            className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${ex2Answer === num 
                                                ? num === 5 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white' 
                                                : 'bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100'}`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                {ex2Answer === 5 && (
                                    <div className="mt-4 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-lg">
                                        ¡Correcto! 1 positiva y 4 positivas son 5 positivas.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Ejercicio 3 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-slate-800 dark:text-zinc-100 mb-4 w-full text-center">
                        Ejercicio C: <span className="font-mono text-violet-600 dark:text-violet-400">5 - (+3)</span>
                    </h3>
                    
                    <div className="flex flex-col items-center w-full bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl min-h-[300px]">
                        <div className={`flex items-center gap-4 transition-all duration-500 ${ex3Transformed ? "opacity-30 scale-90 mb-4" : "opacity-100 scale-100"}`}>
                            {renderTiles("pos", 5)}
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center border border-slate-300">
                                <Minus className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                            </div>
                            {renderTiles("pos", 3)}
                        </div>

                        {!ex3Transformed ? (
                            <button 
                                onClick={() => setEx3Transformed(true)}
                                className="mt-8 px-6 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg font-bold transition-all"
                            >
                                Transformar Resta
                            </button>
                        ) : (
                            <div className="flex flex-col items-center animate-in slide-in-from-top-4 fade-in duration-500">
                                <div className="flex items-center gap-4 mb-6">
                                    {renderTiles("pos", 5)}
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-300 animate-in spin-in-180 duration-500">
                                        <Plus className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    {renderTiles("neg", 3, "opacity-100", "animate-in flip-in-y duration-500")}
                                </div>
                                <p className="text-sm text-slate-500 mb-4 font-semibold">¿Cuál es el resultado de 5 + (-3)?</p>
                                <div className="flex gap-2">
                                    {[-2, 2, 8, -8].map(num => (
                                        <button
                                            key={`ex3-${num}`}
                                            onClick={() => setEx3Answer(num)}
                                            className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${ex3Answer === num 
                                                ? num === 2 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white' 
                                                : 'bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100'}`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                {ex3Answer === 2 && (
                                    <div className="mt-4 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-lg text-center">
                                        ¡Correcto! 5 positivas se cancelan con 3 negativas y quedan 2 positivas.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Ejercicio 4 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-slate-800 dark:text-zinc-100 mb-4 w-full text-center">
                        Ejercicio D: <span className="font-mono text-violet-600 dark:text-violet-400">-4 - (-2)</span>
                    </h3>
                    
                    <div className="flex flex-col items-center w-full bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl min-h-[300px]">
                        <div className={`flex items-center gap-4 transition-all duration-500 ${ex4Transformed ? "opacity-30 scale-90 mb-4" : "opacity-100 scale-100"}`}>
                            {renderTiles("neg", 4)}
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center border border-slate-300">
                                <Minus className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                            </div>
                            {renderTiles("neg", 2)}
                        </div>

                        {!ex4Transformed ? (
                            <button 
                                onClick={() => setEx4Transformed(true)}
                                className="mt-8 px-6 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg font-bold transition-all"
                            >
                                Transformar Resta
                            </button>
                        ) : (
                            <div className="flex flex-col items-center animate-in slide-in-from-top-4 fade-in duration-500">
                                <div className="flex items-center gap-4 mb-6">
                                    {renderTiles("neg", 4)}
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-300 animate-in spin-in-180 duration-500">
                                        <Plus className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    {renderTiles("pos", 2, "opacity-100", "animate-in flip-in-y duration-500")}
                                </div>
                                <p className="text-sm text-slate-500 mb-4 font-semibold">¿Cuál es el resultado de -4 + (+2)?</p>
                                <div className="flex gap-2">
                                    {[-6, -2, 2, 6].map(num => (
                                        <button
                                            key={`ex4-${num}`}
                                            onClick={() => setEx4Answer(num)}
                                            className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${ex4Answer === num 
                                                ? num === -2 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white' 
                                                : 'bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100'}`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                {ex4Answer === -2 && (
                                    <div className="mt-4 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-lg text-center">
                                        ¡Correcto! 4 negativas se cancelan con 2 positivas y sobran 2 negativas.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
