"use client"

import React, { useState, useEffect } from 'react'
import { RotateCcw, Trophy, ArrowRight, MousePointer2, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"

type Level = 'U' | 'D' | 'C' | 'UM'

export function MultiLevelGroupingVisual() {
    const [units, setUnits] = useState(34)
    const [tens, setTens] = useState(15)
    const [hundreds, setHundreds] = useState(21)
    const [thousands, setThousands] = useState(0)

    const [selectedIndices, setSelectedIndices] = useState<number[]>([])
    const [currentPhase, setCurrentPhase] = useState<Level>('U')
    const [isFinished, setIsFinished] = useState(false)
    const [message, setMessage] = useState("Agrupa unidades para formar una decena")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // Reset exercise
    const reset = () => {
        setUnits(34)
        setTens(15)
        setHundreds(21)
        setThousands(0)
        setSelectedIndices([])
        setCurrentPhase('U')
        setIsFinished(false)
        setMessage("Agrupa unidades para formar una decena")
        setErrorMessage(null)
    }

    // Handle selection
    const toggleSelect = (index: number, level: Level) => {
        if (level !== currentPhase) return
        if (isFinished) return

        if (selectedIndices.includes(index)) {
            setSelectedIndices(prev => prev.filter(i => i !== index))
        } else if (selectedIndices.length < 10) {
            setSelectedIndices(prev => [...prev, index])
        }
    }

    // Handle transformation
    const transform = (targetLevel: Level) => {
        if (selectedIndices.length !== 10) {
            setErrorMessage("¡Alto! Recuerda la cantidad de elementos a capturar")
            return
        }

        let isCorrect = false
        if (currentPhase === 'U' && targetLevel === 'D') isCorrect = true
        else if (currentPhase === 'D' && targetLevel === 'C') isCorrect = true
        else if (currentPhase === 'C' && targetLevel === 'UM') isCorrect = true

        if (isCorrect) {
            setErrorMessage(null)
            if (currentPhase === 'U') {
                setUnits(prev => prev - 10)
                setTens(prev => prev + 1)
                setSelectedIndices([])
                setMessage("¡Excelente! Esas 10 unidades ahora son 1 decena nueva.")
            } else if (currentPhase === 'D') {
                setTens(prev => prev - 10)
                setHundreds(prev => prev + 1)
                setSelectedIndices([])
                setMessage("¡Bien hecho! 10 decenas se convirtieron en 1 centena.")
            } else if (currentPhase === 'C') {
                setHundreds(prev => prev - 10)
                setThousands(prev => prev + 1)
                setSelectedIndices([])
                setMessage("¡Impresionante! 10 centenas forman 1 unidad de mil.")
            }
        } else {
            setErrorMessage("Vuelve a intentarlo, ese no es el nivel superior.")
        }
    }

    // Check if phase is done
    useEffect(() => {
        if (currentPhase === 'U' && units < 10) {
            if (units === 34) return // Initial state
            setMessage("Ya no hay suficientes unidades para agrupar. ¡Pasemos a las decenas!")
        }
        if (currentPhase === 'D' && tens < 10) {
            if (tens === 15 && currentPhase === 'D') return
            setMessage("Ya no quedan suficientes decenas. ¡Sigue con las centenas!")
        }
        if (currentPhase === 'C' && hundreds < 10) {
            if (hundreds === 21 && currentPhase === 'C') return
            setMessage("¡Has terminado de agrupar todo! Mira el resultado final.")
            setIsFinished(true)
        }
    }, [units, tens, hundreds, currentPhase])

    const nextPhase = () => {
        if (currentPhase === 'U') setCurrentPhase('D')
        else if (currentPhase === 'D') setCurrentPhase('C')
    }

    // Helper to render figures
    const renderFigures = (count: number, type: Level) => {
        const items = []
        for (let i = 0; i < count; i++) {
            const isSelected = currentPhase === type && selectedIndices.includes(i)
            const isSelectable = currentPhase === type && !isFinished

            items.push(
                <div
                    key={`${type}-${i}`}
                    onClick={() => toggleSelect(i, type)}
                    className={cn(
                        "transition-all duration-300 cursor-pointer relative group",
                        type === 'U' ? "w-6 h-6 rounded-full" :
                            type === 'D' ? "w-6 h-6 rounded-md" :
                                type === 'C' ? "w-10 h-10 rounded-md" : "w-10 h-10",

                        type === 'U' && "bg-blue-500 shadow-blue-200",
                        type === 'D' && "bg-emerald-500 shadow-emerald-200",
                        type === 'C' && "bg-amber-400 shadow-amber-200",
                        type === 'UM' && "bg-gradient-to-br from-purple-500 to-indigo-700 rotate-45 border-2 border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]",

                        isSelected ? "scale-110 ring-4 ring-white shadow-xl z-10 opacity-100" : "opacity-40 hover:opacity-70",
                        !isSelectable && "cursor-default opacity-100",
                        isFinished && "opacity-100"
                    )}
                >
                    {isSelected && (
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm overflow-visible">
                            <Sparkles className="w-2 h-2 text-indigo-500 animate-pulse" />
                        </div>
                    )}
                </div>
            )
        }
        return items
    }

    return (
        <div className="flex flex-col gap-10">
            {/* Header info - Outside the card */}
            <div className="space-y-6">
                <h2 className="heading-2 flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-amber-500" /> Desafío de Agrupación
                </h2>
                <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                    La clave está en iniciar con las unidades, agrupar de a 10, continuar con las decenas, agrupar de a 10 hasta completar todos los grupos.
                </p>
            </div>

            <div className="flex flex-col gap-8 p-6 md:p-10 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-2xl overflow-visible">

                {/* Internal Card Header: Status & Reset */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 dark:border-zinc-800 pb-6">
                    <div className="space-y-1">
                        <p className="text-slate-500 dark:text-zinc-400 font-medium">{message}</p>
                    </div>
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-50 hover:bg-slate-800 bg-slate-700 rounded-xl transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" /> Reiniciar
                    </button>
                </div>

                {/* Main Interactive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[500px]">

                    {/* COLUMN 1 (3/4) - Source Boxes */}
                    <div className="lg:col-span-3 flex flex-col gap-6">

                        {/* Units Box */}
                        <div className={cn(
                            "p-6 rounded-2xl border-2 border-dashed transition-all duration-500 flex flex-col gap-4",
                            currentPhase === 'U' ? "border-blue-400 bg-blue-50/30 dark:bg-blue-900/10" : "border-slate-200 opacity-60"
                        )}>
                            <h4 className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400">Unidades ({units})</h4>
                            <div className="flex flex-wrap gap-3">
                                {renderFigures(units, 'U')}
                            </div>
                        </div>

                        {/* Tens Box */}
                        <div className={cn(
                            "p-6 rounded-2xl border-2 border-dashed transition-all duration-500 flex flex-col gap-4",
                            currentPhase === 'D' ? "border-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10" : "border-slate-200 opacity-60"
                        )}>
                            <h4 className="text-xs uppercase tracking-widest font-black text-emerald-600 dark:text-emerald-400">Decenas ({tens}) {currentPhase === 'U' && units < 10 && "← ¡Ir aquí!"}</h4>
                            <div className="flex flex-wrap gap-3">
                                {renderFigures(tens, 'D')}
                            </div>
                        </div>

                        {/* Hundreds Box */}
                        <div className={cn(
                            "p-6 rounded-2xl border-2 border-dashed transition-all duration-500 flex flex-col gap-4",
                            currentPhase === 'C' ? "border-amber-400 bg-amber-50/30 dark:bg-amber-900/10" : "border-slate-200 opacity-60"
                        )}>
                            <h4 className="text-xs uppercase tracking-widest font-black text-amber-600 dark:text-amber-400">Centenas ({hundreds}) {currentPhase === 'D' && tens < 10 && "← ¡Ir aquí!"}</h4>
                            <div className="flex flex-wrap gap-3">
                                {renderFigures(hundreds, 'C')}
                            </div>
                        </div>

                        {/* Thousands Box (Output only) */}
                        {thousands > 0 && (
                            <div className="p-6 rounded-2xl border-2 border-dashed border-purple-400 bg-purple-50/30 dark:bg-purple-900/10 flex flex-col gap-4 animate-in fade-in zoom-in-95">
                                <h4 className="text-xs uppercase tracking-widest font-black text-purple-600 dark:text-purple-400">Unidades de Mil ({thousands})</h4>
                                <div className="flex flex-wrap gap-3">
                                    {renderFigures(thousands, 'UM')}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* COLUMN 2 (1/4) - Selection & Transform */}
                    <div className="lg:col-span-1 flex flex-col gap-6">

                        {/* Selection Bucket */}
                        <div className={cn(
                            "p-5 rounded-2xl border-2 border-dashed border-indigo-200 bg-slate-50/50 dark:bg-zinc-800/20 flex flex-col gap-3 transition-all",
                            currentPhase === 'U' ? "min-h-[140px]" : "flex-1 min-h-[200px]"
                        )}>
                            <div className="flex flex-col items-center text-center gap-1">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Seleccionados</h4>
                                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-bold leading-none">
                                    {selectedIndices.length}
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {selectedIndices.length === 0 ? (
                                    <div className="w-full min-h-[60px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl">
                                        <MousePointer2 className="text-slate-300 animate-bounce" />
                                    </div>
                                ) : (
                                    Array.from({ length: selectedIndices.length }).map((_, i) => (
                                        <div
                                            key={`bucket-${i}`}
                                            className={cn(
                                                "w-6 h-6 rounded-full animate-in zoom-in-50",
                                                currentPhase === 'U' ? "bg-blue-500" :
                                                    currentPhase === 'D' ? "bg-emerald-500 rounded-sm" : "bg-amber-400 rounded-md"
                                            )}
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Transform Area */}
                        <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/20 flex flex-col gap-4">
                            <h4 className="text-[10px] uppercase tracking-widest font-black text-black">Transformar en:</h4>

                            <div className="flex flex-col gap-3">
                                {/* Option D */}
                                <button
                                    onClick={() => transform('D')}
                                    disabled={isFinished}
                                    className={cn(
                                        "w-full flex flex-col items-center gap-2 p-4 rounded-xl transition-all shadow-md",
                                        "bg-slate-950/90 hover:bg-slate-950 border border-slate-800/50 active:scale-95 disabled:opacity-80"
                                    )}
                                >
                                    <div className="w-6 h-6 bg-emerald-400 rounded-md border-2 border-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-center text-emerald-400">Decena</span>
                                </button>

                                {/* Option C */}
                                <button
                                    onClick={() => transform('C')}
                                    disabled={isFinished}
                                    className={cn(
                                        "w-full flex flex-col items-center gap-2 p-4 rounded-xl transition-all shadow-md",
                                        "bg-slate-950/90 hover:bg-slate-950 border border-slate-800/50 active:scale-95 disabled:opacity-80"
                                    )}
                                >
                                    <div className="w-10 h-10 bg-amber-400 rounded-md border-2 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-center text-amber-400">Centena</span>
                                </button>

                                {/* Option UM */}
                                <button
                                    onClick={() => transform('UM')}
                                    disabled={isFinished}
                                    className={cn(
                                        "w-full flex flex-col items-center gap-2 p-4 rounded-xl transition-all shadow-md",
                                        "bg-slate-950/90 hover:bg-slate-950 border border-slate-800/50 active:scale-95 disabled:opacity-80"
                                    )}
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-600 rotate-45 border-2 border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
                                    <div className="flex flex-col items-center leading-none mt-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-center text-purple-300">Unidad</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-center text-purple-300">de mil</span>
                                    </div>
                                </button>
                            </div>

                            {/* Next Phase Button */}
                            {((currentPhase === 'U' && units < 10 && units !== 34) || (currentPhase === 'D' && tens < 10)) && !isFinished && (
                                <button
                                    onClick={nextPhase}
                                    className="mt-2 w-full flex items-center justify-center text-center gap-2 py-2 px-4 bg-emerald-400 text-emerald-950 text-sm font-medium rounded-xl hover:bg-emerald-300 transition-all animate-bounce"
                                >
                                    <span>Siguiente Nivel</span> <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Error Message Below Grid */}
                {errorMessage && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <p className="text-sm font-bold text-red-400 dark:text-red-300 text-center leading-snug tracking-wider">
                            {errorMessage}
                        </p>
                    </div>
                )}

                {/* Final Outcome */}
                {isFinished && (
                    <div className="p-8 rounded-3xl bg-slate-900 dark:bg-black text-white flex flex-col items-center gap-6 animate-in slide-in-from-bottom-10 duration-700">
                        <h3 className="text-xl font-bold text-amber-400 uppercase tracking-widest">Resultado Final Simplificado</h3>
                        <div className="flex flex-wrap justify-center gap-8">
                            <div className="text-center">
                                <div className="text-5xl font-black">{thousands}</div>
                                <div className="text-[10px] font-bold text-slate-400">U. Mil</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-black">{hundreds}</div>
                                <div className="text-[10px] font-bold text-slate-400">Centenas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-black">{tens}</div>
                                <div className="text-[10px] font-bold text-slate-400">Decenas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-black">{units}</div>
                                <div className="text-[10px] font-bold text-slate-400">Unidades</div>
                            </div>
                        </div>
                        <div className="h-px w-20 bg-slate-700" />
                        <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200 font-mono">
                            {thousands}.{hundreds}{tens}{units}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
