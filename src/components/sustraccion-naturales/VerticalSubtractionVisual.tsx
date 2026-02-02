"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Minus, RotateCcw, ArrowRight, ArrowLeft, Sparkles, Hammer } from 'lucide-react'
import { cn } from "@/lib/utils"

export function VerticalSubtractionVisual() {
    const [step, setStep] = useState(0)
    const [hasRegroupedUnits, setHasRegroupedUnits] = useState(false)
    const [hasRegroupedTens, setHasRegroupedTens] = useState(false)
    
    // States for each step
    // 325 - 147
    const states = [
        { // Step 0: Initial
            values: { C: 3, D: 2, U: 5 },
            subtract: { C: 1, D: 4, U: 7 },
            activeColumn: null,
            message: "A las 3 centenas, 2 decenas y 5 unidades, quítales 1 centena, 4 decenas y 7 unidades. ¡Empecemos por las unidades!",
            currentValues: { C: 3, D: 2, U: 5 },
            regrouping: { DtoU: false, CtoD: false },
            result: { C: null, D: null, U: null }
        },
        { // Step 1: Units regrouping
            values: { C: 3, D: 2, U: 5 },
            subtract: { C: 1, D: 4, U: 7 },
            activeColumn: 'U',
            message: "¿5 - 7? ¡No alcanza! Usa el martillo para romper 1 decena.",
            currentValues: { C: 3, D: 1, U: 15 },
            regrouping: { DtoU: true, CtoD: false },
            result: { C: null, D: null, U: null }
        },
        { // Step 2: Units subtraction
            values: { C: 3, D: 2, U: 5 },
            subtract: { C: 1, D: 4, U: 7 },
            activeColumn: 'U',
            message: "Quita las unidades indicadas",
            currentValues: { C: 3, D: 1, U: 15 },
            regrouping: { DtoU: true, CtoD: false },
            result: { C: null, D: null, U: 8 }
        },
        { // Step 3: Tens regrouping
            values: { C: 3, D: 2, U: 5 },
            subtract: { C: 1, D: 4, U: 7 },
            activeColumn: 'D',
            message: "¿1 - 4? ¡No alcanza! Usa el martillo para romper 1 centena.",
            currentValues: { C: 2, D: 11, U: 15 },
            regrouping: { DtoU: true, CtoD: true },
            result: { C: null, D: null, U: 8 }
        },
        { // Step 4: Tens subtraction
            values: { C: 3, D: 2, U: 5 },
            subtract: { C: 1, D: 4, U: 7 },
            activeColumn: 'D',
            message: "Quita las decenas indicadas",
            currentValues: { C: 2, D: 11, U: 15 },
            regrouping: { DtoU: true, CtoD: true },
            result: { C: null, D: 7, U: 8 }
        },
        { // Step 5: Hundreds subtraction
            values: { C: 3, D: 2, U: 5 },
            subtract: { C: 1, D: 4, U: 7 },
            activeColumn: 'C',
            message: "Quita las centenas indicadas",
            currentValues: { C: 2, D: 11, U: 15 },
            regrouping: { DtoU: true, CtoD: true },
            result: { C: 1, D: 7, U: 8 }
        },
        { // Step 6: Finish
            values: { C: 3, D: 2, U: 5 },
            subtract: { C: 1, D: 4, U: 7 },
            activeColumn: null,
            message: "¡Resta completada! 325 - 147 = 178.",
            currentValues: { C: 2, D: 11, U: 15 },
            regrouping: { DtoU: true, CtoD: true },
            result: { C: 1, D: 7, U: 8 }
        }
    ]

    const [selectedUnits, setSelectedUnits] = useState<number[]>([])
    const [unitsDeleted, setUnitsDeleted] = useState(false)
    const [unitFeedback, setUnitFeedback] = useState<string | null>(null)

    const [selectedDecades, setSelectedDecades] = useState<number[]>([])
    const [decadesDeleted, setDecadesDeleted] = useState(false)
    const [decadeFeedback, setDecadeFeedback] = useState<string | null>(null)

    const [selectedHundreds, setSelectedHundreds] = useState<number[]>([])
    const [hundredsDeleted, setHundredsDeleted] = useState(false)
    const [hundredFeedback, setHundredFeedback] = useState<string | null>(null)

    const currentState = states[step]

    const toggleUnitSelection = (id: number) => {
        if (step !== 2 || unitsDeleted) return
        setSelectedUnits(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
        setUnitFeedback(null)
    }

    const toggleDecadeSelection = (id: number) => {
        if (step !== 4 || decadesDeleted) return
        setSelectedDecades(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
        // Ensure feedback doesn't block interaction
        if (decadeFeedback) setDecadeFeedback(null)
    }

    const toggleHundredSelection = (id: number) => {
        if (step !== 5 || hundredsDeleted) return
        setSelectedHundreds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
        if (hundredFeedback) setHundredFeedback(null)
    }

    const handleDeleteUnits = () => {
        if (selectedUnits.length === 7) {
            setUnitsDeleted(true)
            setUnitFeedback(null)
            setTimeout(nextStep, 1500)
        } else {
            setUnitFeedback("¡Cantidad incorrecta! Intenta contar de nuevo.")
        }
    }

    const handleDeleteDecades = () => {
        if (selectedDecades.length === 4) {
            setDecadesDeleted(true)
            setDecadeFeedback(null)
            setTimeout(nextStep, 1500)
        } else {
            setDecadeFeedback("¡Cantidad incorrecta! Intenta contar de nuevo.")
        }
    }

    const handleDeleteHundreds = () => {
        if (selectedHundreds.length === 1) {
            setHundredsDeleted(true)
            setHundredFeedback(null)
            setTimeout(nextStep, 1500)
        } else {
            setHundredFeedback("¡Cantidad incorrecta! Intenta contar de nuevo.")
        }
    }

    const nextStep = useCallback(() => {
        if (step < 6) {
            setStep(prev => prev + 1)
            setUnitFeedback(null)
            setDecadeFeedback(null)
            setHundredFeedback(null)
        }
    }, [step])

    const reset = () => {
        setStep(0)
        setHasRegroupedUnits(false)
        setHasRegroupedTens(false)
        setSelectedUnits([])
        setUnitsDeleted(false)
        setUnitFeedback(null)
        setSelectedDecades([])
        setDecadesDeleted(false)
        setDecadeFeedback(null)
        setSelectedHundreds([])
        setHundredsDeleted(false)
        setHundredFeedback(null)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && step === 0) nextStep()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [nextStep, step])

    const hammerCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m15 5 4 4'/><path d='M21.5 12 12 21.5'/><path d='m14.09 6.11 3.8 3.8'/><path d='M10.5 7.5 4.5 1.5'/><path d='M3 5c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5Z'/></svg>") 16 16, auto`

    const triggerRegrouping = () => {
        if (step === 1) {
            setHasRegroupedUnits(true)
            setTimeout(nextStep, 2000)
        }
        if (step === 3) {
            setHasRegroupedTens(true)
            setTimeout(nextStep, 2000)
        }
    }

    const activeError = unitFeedback || decadeFeedback || hundredFeedback

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-8 p-6 md:p-10 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-2xl overflow-visible">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 dark:border-zinc-800 pb-6">
                    <div className="space-y-1">
                        <p className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                            {step > 0 && step < 6 && <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 text-sm">{step}</span>}
                            {currentState.message}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={reset} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 dark:bg-zinc-800 dark:text-zinc-300 rounded-xl hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors">
                            <RotateCcw className="w-4 h-4" /> Reiniciar
                        </button>
                        {step === 0 && (
                            <button 
                                onClick={nextStep} 
                                className="flex items-center gap-2 px-6 h-10 text-sm font-black uppercase tracking-widest text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                            >
                                <span>Iniciar</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* LEFT: Visual Figures */}
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[48px]">
                            <h4 className="text-xs uppercase tracking-widest font-black text-slate-400">Representación Visual</h4>
                            {activeError && (
                                <div className="bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold animate-in slide-in-from-top-2 shadow-lg flex items-center gap-2 border-2 border-white">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-rose-600 text-[10px] font-black">!</span>
                                    {activeError}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {/* Centenas */}
                            <div className={cn("p-4 rounded-2xl border-2 transition-all duration-1000 relative", currentState.activeColumn === 'C' ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20" : "border-transparent bg-slate-50 dark:bg-zinc-800/50")}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-amber-600">CENTENAS</span>
                                    <span className="text-lg font-black">{step >= 3 && hasRegroupedTens ? (hundredsDeleted ? 1 : 2) : 3}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 3 }).map((_, i) => {
                                        const isBroken = i === 2 && hasRegroupedTens
                                        const showHammer = i === 2 && step === 3 && !hasRegroupedTens
                                        const isSelected = selectedHundreds.includes(i)
                                        const isDeleted = hundredsDeleted && isSelected
                                        return (
                                            <button 
                                                key={i} 
                                                disabled={!showHammer && (step !== 5 || isDeleted)}
                                                onClick={() => showHammer ? triggerRegrouping() : toggleHundredSelection(i)}
                                                style={showHammer ? { cursor: hammerCursor } : {}}
                                                className={cn(
                                                    "w-10 h-10 rounded-md shadow-sm transition-all duration-1500 flex items-center justify-center",
                                                    isBroken ? "bg-amber-200/50 border-2 border-dashed border-amber-300 opacity-40" : 
                                                    isDeleted ? "opacity-0 scale-0" : 
                                                    isSelected ? "bg-rose-500 ring-4 ring-rose-200 scale-110" : "bg-amber-400",
                                                    showHammer && "animate-pulse ring-2 ring-amber-500"
                                                )}
                                            >
                                                {isBroken && <span className="text-amber-600 font-bold">-</span>}
                                                {showHammer && <Hammer className="h-4 w-4 mx-auto text-amber-800" />}
                                            </button>
                                        )
                                    })}
                                </div>

                                {/* Interaction button for Step 5 */}
                                {step === 5 && !hundredsDeleted && (
                                    <div className="absolute right-4 bottom-4 z-10">
                                        <button 
                                            onClick={handleDeleteHundreds}
                                            className="w-10 h-10 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 active:scale-90 transition-all flex items-center justify-center font-black text-2xl border-2 border-white"
                                        >
                                            -
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Decenas */}
                            <div className={cn("p-4 rounded-2xl border-2 transition-all duration-1000 relative", currentState.activeColumn === 'D' ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" : "border-transparent bg-slate-50 dark:bg-zinc-800/50")}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-emerald-600">DECENAS</span>
                                    <span className="text-lg font-black">{hasRegroupedTens ? (decadesDeleted ? 7 : 11) : (hasRegroupedUnits ? 1 : 2)}</span>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-1.5 font-mono">
                                        {/* Original tens */}
                                        {Array.from({ length: 2 }).map((_, i) => {
                                            const isBroken = i === 1 && hasRegroupedUnits
                                            const showHammer = i === 1 && step === 1 && !hasRegroupedUnits
                                            const id = i
                                            const isSelected = selectedDecades.includes(id)
                                            const isDeleted = decadesDeleted && isSelected
                                            return (
                                                <button 
                                                    key={i} 
                                                    disabled={!showHammer && (step !== 4 || isDeleted || isBroken)}
                                                    onClick={() => showHammer ? triggerRegrouping() : toggleDecadeSelection(id)}
                                                    style={showHammer ? { cursor: hammerCursor } : {}}
                                                    className={cn(
                                                        "w-6 h-6 rounded-md shadow-sm transition-all duration-1500 flex items-center justify-center",
                                                        isBroken ? "bg-emerald-200/50 border-2 border-dashed border-emerald-300 opacity-40 text-emerald-600 font-bold" : 
                                                        isDeleted ? "opacity-0 scale-0" :
                                                        isSelected ? "bg-rose-500 ring-4 ring-rose-200 scale-110" : "bg-emerald-500",
                                                        showHammer && "animate-pulse ring-2 ring-emerald-500"
                                                    )}
                                                >
                                                    {isBroken ? "-" : ""}
                                                    {showHammer && <Hammer className="h-4 w-4 mx-auto text-amber-800" />}
                                                </button>
                                            )
                                        })}
                                        {/* Tens from centena */}
                                        {hasRegroupedTens && Array.from({ length: 10 }).map((_, i) => {
                                            const id = i + 2
                                            const isSelected = selectedDecades.includes(id)
                                            const isDeleted = decadesDeleted && isSelected
                                            return (
                                                <button 
                                                    key={`from-c-${i}`} 
                                                    onClick={() => toggleDecadeSelection(id)}
                                                    disabled={step !== 4 || isDeleted}
                                                    className={cn(
                                                        "w-6 h-6 rounded-md shadow-sm flex items-center justify-center transition-all duration-1500",
                                                        isDeleted ? "opacity-0 scale-0" : (isSelected ? "bg-rose-500 ring-4 ring-rose-200 scale-110" : "bg-emerald-500"),
                                                        !decadesDeleted && "animate-in zoom-in slide-in-from-left duration-1500"
                                                    )}
                                                >
                                                    {!isSelected && !isDeleted && <span className="text-[10px] text-white font-bold">+</span>}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {/* Interaction button for Step 4 */}
                                    {step === 4 && !decadesDeleted && (
                                        <div className="absolute right-4 bottom-4 z-10">
                                            <button 
                                                onClick={handleDeleteDecades}
                                                className="w-10 h-10 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 active:scale-90 transition-all flex items-center justify-center font-black text-2xl border-2 border-white"
                                            >
                                                -
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Unidades */}
                            <div className={cn("p-4 rounded-2xl border-2 transition-all duration-1000 relative", currentState.activeColumn === 'U' ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20" : "border-transparent bg-slate-50 dark:bg-zinc-800/50")}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-blue-600">UNIDADES</span>
                                    <span className="text-lg font-black">{hasRegroupedUnits ? (unitsDeleted ? 8 : 15) : 5}</span>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {/* Initial units row */}
                                    <div className="flex flex-wrap gap-2.5">
                                        {Array.from({ length: 5 }).map((_, i) => {
                                            const id = i
                                            const isSelected = selectedUnits.includes(id)
                                            const isDeleted = unitsDeleted && isSelected
                                            return (
                                                <button 
                                                    key={i} 
                                                    onClick={() => toggleUnitSelection(id)}
                                                    className={cn(
                                                        "w-7 h-7 rounded-full shadow-md transition-all duration-1000 flex items-center justify-center",
                                                        isDeleted ? "opacity-0 scale-0" : (isSelected ? "bg-rose-500 ring-4 ring-rose-200 scale-110" : "bg-blue-500 hover:bg-blue-600")
                                                    )} 
                                                />
                                            )
                                        })}
                                    </div>
                                    {/* Extra units row */}
                                    {hasRegroupedUnits && (
                                        <div className="flex flex-wrap gap-2.5 pt-4 border-t border-blue-100/50">
                                            {Array.from({ length: 10 }).map((_, i) => {
                                                const id = i + 5
                                                const isSelected = selectedUnits.includes(id)
                                                const isDeleted = unitsDeleted && isSelected
                                                return (
                                                    <button 
                                                        key={`extra-${i}`} 
                                                        onClick={() => toggleUnitSelection(id)}
                                                        className={cn(
                                                            "w-7 h-7 rounded-full shadow-md flex items-center justify-center transition-all duration-1000",
                                                            isDeleted ? "opacity-0 scale-0" : (isSelected ? "bg-rose-500 ring-4 ring-rose-200 scale-110" : "bg-blue-500 hover:bg-blue-600"),
                                                            !unitsDeleted && "animate-in slide-in-from-top-4 duration-1500"
                                                        )}
                                                    >
                                                        {!isSelected && !isDeleted && <span className="text-xs text-white font-black leading-none">+</span>}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Interaction button for Step 2 */}
                                {step === 2 && !unitsDeleted && (
                                    <div className="absolute -right-2 -bottom-2 z-10">
                                        <button 
                                            onClick={handleDeleteUnits}
                                            className="w-14 h-14 rounded-full bg-rose-600 text-white shadow-2xl hover:bg-rose-700 active:scale-90 transition-all flex items-center justify-center font-black text-3xl border-4 border-white"
                                        >
                                            -
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Algorithm */}
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-50 dark:bg-zinc-950/40 rounded-3xl p-8 border border-slate-100 dark:border-zinc-800 shadow-inner">
                        <h4 className="text-xs uppercase tracking-widest font-black text-slate-400 mb-8 self-start">Algoritmo de la Resta</h4>
                        
                        <div className="relative font-mono text-5xl md:text-6xl font-bold flex flex-col items-end gap-2 text-slate-700 dark:text-zinc-200">
                            {/* Regrouping Marks (Green smaller numbers above) */}
                            <div className="flex gap-6 md:gap-10 mb-2 min-h-[50px] items-end">
                                <div className={cn("w-12 text-center text-2xl transition-all duration-1500", hasRegroupedTens ? "text-amber-500 opacity-100" : "opacity-0")}>
                                    2
                                </div>
                                <div className="w-12 text-center text-2xl transition-all duration-1500">
                                    {hasRegroupedUnits && !hasRegroupedTens && <span className={cn("text-emerald-500 opacity-100")}>1</span>}
                                    {hasRegroupedTens && (
                                        <div className="flex justify-center items-center">
                                            <span className="text-amber-400 animate-in fade-in duration-1000">1</span>
                                            <span className="text-emerald-500">1</span>
                                        </div>
                                    )}
                                </div>
                                <div className="w-12"></div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                {/* First Number */}
                                <div className="flex gap-6 md:gap-10">
                                    {/* Hundreds */}
                                    <span className={cn("w-12 text-center relative transition-colors duration-1500", hasRegroupedTens && "text-slate-300")}>
                                        3 {hasRegroupedTens && <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-400 rotate-12" />}
                                    </span>
                                    {/* Tens - no absolute 1 here anymore */}
                                    <span className={cn("w-12 text-center relative transition-colors duration-1500", (hasRegroupedUnits || hasRegroupedTens) && "text-slate-300")}>
                                        2 {hasRegroupedUnits && <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-400 rotate-12" />}
                                    </span>
                                    {/* Units - with 1 to its left if regrouped from tens */}
                                    <span className={cn("w-12 text-center relative transition-colors duration-1500")}>
                                        {hasRegroupedUnits && <span className="absolute -left-4 text-emerald-500 text-3xl animate-in fade-in slide-in-from-top-2 duration-1500">1</span>}
                                        5 
                                    </span>
                                </div>
                                {/* Subtrahend */}
                                <div className="flex gap-6 md:gap-10 relative">
                                    <Minus className="absolute -left-12 top-1/2 -translate-y-1/2 h-8 w-8 text-rose-500" />
                                    <span className={cn("w-12 text-center", currentState.activeColumn === 'C' && "text-rose-500")}>1</span>
                                    <span className={cn("w-12 text-center", currentState.activeColumn === 'D' && "text-rose-500")}>4</span>
                                    <span className={cn("w-12 text-center", currentState.activeColumn === 'U' && "text-rose-500")}>7</span>
                                </div>
                            </div>

                            <div className="w-full h-1.5 bg-slate-800 dark:bg-zinc-200 rounded-full my-4" />

                            {/* Result */}
                            <div className="flex gap-6 md:gap-10 min-h-[70px]">
                                <span className={cn("w-12 text-center transition-all duration-1000", (currentState.result.C !== null && (step >= 6 || hundredsDeleted)) ? "opacity-100 scale-100" : "opacity-0 scale-50")}>{currentState.result.C}</span>
                                <span className={cn("w-12 text-center transition-all duration-1000", (currentState.result.D !== null && (step >= 5 || decadesDeleted)) ? "opacity-100 scale-100" : "opacity-0 scale-50")}>{currentState.result.D}</span>
                                <span className={cn("w-12 text-center transition-all duration-1000", (currentState.result.U !== null && (step >= 3 || unitsDeleted)) ? "opacity-100 scale-100" : "opacity-0 scale-50")}>{currentState.result.U}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {step === 6 && (
                <div className="p-8 rounded-3xl bg-rose-500 text-white flex flex-col items-center gap-4 animate-in slide-in-from-bottom-10 shadow-xl">
                    <Sparkles className="h-8 w-8 text-rose-200" />
                    <h3 className="text-3xl font-black uppercase">¡Resta Completada!</h3>
                    <p className="text-lg opacity-90 text-center">Has aprendido a desagrupar centenas y decenas para comprender por qué funciona el algoritmo de la resta</p>
                    <div className="text-5xl font-mono font-bold bg-white/10 px-8 py-4 rounded-2xl border border-white/20">178</div>
                </div>
            )}
        </div>
    )
}
