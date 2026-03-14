"use client"

import React, { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, ArrowRight, Award, GripHorizontal, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Math } from "@/components/ui/math"

const EXERCISES = [
    {
        id: 1,
        question: "\\sqrt{64}",
        index: 2,
        radicand: 64,
        options: ["16", "8", "4", "32", "2"],
        correctAnswer: "8",
        explanationText: "¡Excelente! La raíz cuadrada de 64 es 8 porque 8 × 8 = 64. Todos los factores deben ser idénticos."
    },
    {
        id: 2,
        question: "\\sqrt[3]{125}",
        index: 3,
        radicand: 125,
        options: ["25", "1", "5", "125"],
        correctAnswer: "5",
        explanationText: "¡Correcto! La raíz cúbica de 125 es 5 porque 5 × 5 × 5 = 125."
    },
    {
        id: 3,
        question: "\\sqrt[4]{16}",
        index: 4,
        radicand: 16,
        options: ["8", "16", "4", "2"],
        correctAnswer: "2",
        explanationText: "¡Muy bien! La raíz cuarta de 16 es 2 porque 2 × 2 × 2 × 2 = 16."
    },
    {
        id: 4,
        question: "\\sqrt[5]{243}",
        index: 5,
        radicand: 243,
        options: ["27", "9", "81", "3"],
        correctAnswer: "3",
        explanationText: "¡Exacto! La raíz quinta de 243 es 3 porque 3 × 3 × 3 × 3 × 3 = 243."
    },
    {
        id: 5,
        question: "\\sqrt{144}",
        index: 2,
        radicand: 144,
        options: ["6", "24", "12", "2", "72"],
        correctAnswer: "12",
        explanationText: "¡Perfecto! La raíz cuadrada de 144 es 12 porque 12 × 12 = 144."
    }
]

export function RadicationExercises() {
    const [currentStep, setCurrentStep] = useState(0)
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    
    const exercise = EXERCISES[currentStep]
    
    // Arrays for answering
    const [boxes, setBoxes] = useState<string[]>(Array(exercise?.index || 2).fill(""))
    
    // Interaction states
    const [draggedValue, setDraggedValue] = useState<string | null>(null)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [feedbackMessage, setFeedbackMessage] = useState("")

    useEffect(() => {
        if (exercise) {
            setBoxes(Array(exercise.index).fill(""))
            setIsCorrect(null)
            setFeedbackMessage("")
            setSelectedOption(null)
            setDraggedValue(null)
        }
    }, [currentStep, exercise])

    const isComplete = boxes && boxes.every(b => b !== "")

    const handleDragStart = (e: React.DragEvent, value: string) => {
        setDraggedValue(value)
        setSelectedOption(null)
        e.dataTransfer.setData("text/plain", value)
        e.dataTransfer.effectAllowed = "copy"
    }

    const handleDrop = (e: React.DragEvent, boxIndex: number) => {
        e.preventDefault()
        const value = e.dataTransfer.getData("text/plain")
        if (value && !isCorrect) {
            fillBox(boxIndex, value)
        }
        setDraggedValue(null)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy"
    }

    const fillBox = (boxIndex: number, value: string) => {
        if (isCorrect) return // Don't allow changing if already verified & correct
        const newBoxes = [...boxes]
        newBoxes[boxIndex] = value
        setBoxes(newBoxes)
        setSelectedOption(null)
        setIsCorrect(null) // Reset evaluation when they change answers
    }

    const handleBoxClick = (boxIndex: number) => {
        // Remove value if there's no selected option, else place the selected option
        if (selectedOption && !isCorrect) {
            fillBox(boxIndex, selectedOption)
        } else if (!isCorrect) {
            // Empties the box
            const newBoxes = [...boxes]
            newBoxes[boxIndex] = ""
            setBoxes(newBoxes)
            setIsCorrect(null)
        }
    }

    const verifyAnswer = () => {
        if (!isComplete) return
        
        const allCorrect = boxes.every(b => b === exercise.correctAnswer)
        
        if (allCorrect) {
            setIsCorrect(true)
            setFeedbackMessage(exercise.explanationText)
            setScore(prev => prev + 1)
        } else {
            setIsCorrect(false)
            // Diagnostic feedback
            const product = boxes.reduce((acc, val) => acc * parseInt(val), 1)
            const allSame = boxes.every(b => b === boxes[0])
            
            if (product === exercise.radicand && !allSame) {
                setFeedbackMessage(`La multiplicación da ${exercise.radicand}, ¡pero recuerda que para calcular una raíz, TODOS los factores deben ser el mismo número!`)
            } else if (allSame) {
                 setFeedbackMessage(`Seleccionaste el mismo número, lo cual es correcto para el concepto, pero ${boxes[0]} multiplicado ${exercise.index} veces da ${product}, no ${exercise.radicand}.`)
            } else {
                 setFeedbackMessage("Revisa tu respuesta. Los factores deben ser exactamente el mismo número y multiplicados dar el resultado final.")
            }
        }
    }

    const handleNext = () => {
        if (currentStep < EXERCISES.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            setIsFinished(true)
        }
    }

    const resetQuiz = () => {
        setCurrentStep(0)
        setScore(0)
        setIsFinished(false)
    }

    if (isFinished) {
        return (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-slate-100 dark:border-zinc-800 shadow-xl flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                    ¡Práctica Completada!
                </h3>
                <p className="text-xl text-slate-600 dark:text-zinc-400">
                    Puntuación: <span className="font-bold text-purple-600 dark:text-purple-400">{score}</span> de {EXERCISES.length}
                </p>
                <div className="h-2 w-full max-w-sm bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-4">
                    <div 
                        className="h-full bg-purple-600 dark:bg-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(score / EXERCISES.length) * 100}%` }}
                    />
                </div>
                <button
                    onClick={resetQuiz}
                    className="mt-8 px-8 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-full font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    Intentar de nuevo
                </button>
            </div>
        )
    }

    if (!exercise) return null

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-zinc-800 shadow-xl flex flex-col gap-8">
            {/* Header / Progress */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-200">
                    Ejercicio {currentStep + 1} de {EXERCISES.length}
                </h3>
                <div className="flex gap-1.5">
                    {EXERCISES.map((_, idx) => (
                        <div 
                            key={idx}
                            className={cn(
                                "h-2 w-8 rounded-full transition-all duration-300",
                                idx === currentStep ? "bg-purple-600 dark:bg-purple-500" : 
                                idx < currentStep ? "bg-purple-200 dark:bg-purple-900/50" : 
                                "bg-slate-100 dark:bg-zinc-800"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Drag & Drop Visual Area */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-x-auto min-w-full">
                
                <p className="text-slate-500 dark:text-zinc-400 font-medium mb-8 text-center max-w-xl">
                    Arrastra el número correcto a los recuadros vacíos. Recuerda que para una raíz, <b>todos los pasos multiplicativos deben ser con el mismo factor</b> y su producto debe dar como resultado el radicando.
                </p>

                <div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-6 w-full pb-4">
                    {/* Root Expression and Answer */}
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-purple-600 dark:text-purple-400 whitespace-nowrap">
                            <Math math={exercise.question} />
                        </div>
                        
                        <span className="text-2xl md:text-3xl lg:text-4xl text-slate-400 font-bold">=</span>
                        
                        <div className="text-3xl md:text-4xl lg:text-5xl font-black min-w-[2rem] md:min-w-[2.5rem] text-center text-purple-700 dark:text-purple-300">
                            {isCorrect ? exercise.correctAnswer : <span className="opacity-20">?</span>}
                        </div>
                    </div>
                    
                    {/* Arrow Divider */}
                    <div className="text-slate-300 dark:text-zinc-600 shrink-0 my-2 xl:my-0">
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 rotate-90 xl:rotate-0" />
                    </div>

                    {/* Boxes Area */}
                    <div className="flex items-center justify-center gap-1 md:gap-2 bg-purple-50/50 dark:bg-purple-900/10 p-2 md:p-4 rounded-2xl md:rounded-3xl border border-purple-100 dark:border-purple-900/30 overflow-x-auto max-w-full">
                        {boxes.map((boxVal, idx) => (
                            <React.Fragment key={idx}>
                                <div 
                                    className={cn(
                                        "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 shrink-0 border-2 sm:border-4 rounded-xl flex items-center justify-center text-xl lg:text-2xl font-bold transition-all duration-300",
                                        boxVal 
                                            ? isCorrect === true 
                                                ? "bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                : isCorrect === false
                                                  ? "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                  : "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 shadow-md" 
                                            : selectedOption 
                                                ? "border-purple-300 border-dashed bg-white dark:border-purple-700 dark:bg-zinc-800/70 cursor-pointer hover:border-purple-500 hover:bg-purple-100" 
                                                : "border-slate-300 border-dashed bg-white dark:border-zinc-700 dark:bg-zinc-900" 
                                    )}
                                    onDrop={(e) => handleDrop(e, idx)}
                                    onDragOver={handleDragOver}
                                    onClick={() => handleBoxClick(idx)}
                                >
                                    {boxVal ? boxVal : <span className="opacity-20">?</span>}
                                </div>
                                {idx < exercise.index - 1 && (
                                    <span className="text-xl md:text-2xl font-black text-slate-400 dark:text-zinc-500 shrink-0">×</span>
                                )}
                            </React.Fragment>
                        ))}
                    
                        <span className="text-2xl lg:text-3xl text-slate-400 font-bold shrink-0 mx-1 md:mx-2">=</span>

                        {/* Result (Radicand) */}
                        <div className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-700 dark:text-zinc-300 shrink-0 pr-2">
                            {exercise.radicand}
                        </div>
                    </div>
                </div>
                
                {/* Reset button for the boxes */}
                {boxes.some(b => b !== "") && !isCorrect && (
                    <button 
                        onClick={() => setBoxes(Array(exercise.index).fill(""))}
                        className="mt-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" /> Limpiar recuadros
                    </button>
                )}
            </div>

            {/* Options Bank */}
            <div className="flex flex-col items-center">
                <p className="text-sm uppercase tracking-wider font-bold text-slate-400 dark:text-zinc-500 mb-4">
                    Opciones Disponibles
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    {exercise.options.map((option, idx) => (
                        <div
                            key={idx}
                            draggable
                            onDragStart={(e) => handleDragStart(e, option)}
                            onClick={() => setSelectedOption(option === selectedOption ? null : option)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-4 rounded-xl border-2 text-2xl font-bold cursor-grab active:cursor-grabbing transition-all hover:-translate-y-1 shadow-sm select-none",
                                selectedOption === option 
                                    ? "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/40 dark:border-purple-400 dark:text-purple-300 ring-2 ring-purple-400 ring-offset-2 dark:ring-offset-zinc-900" 
                                    : "bg-white border-slate-200 text-slate-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 hover:border-purple-300 dark:hover:border-purple-700"
                            )}
                        >
                            <GripHorizontal className="w-5 h-5 opacity-40" />
                            {option}
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Area / Verification */}
            <div className="flex flex-col items-center justify-center min-h-[100px] mt-2">
                {isCorrect === null ? (
                    <button
                        disabled={!isComplete}
                        onClick={verifyAnswer}
                        className={cn(
                            "px-10 py-4 rounded-full font-bold text-lg transition-all",
                            isComplete 
                                ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg active:scale-95 cursor-pointer" 
                                : "bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed"
                        )}
                    >
                        Verificar Respuesta
                    </button>
                ) : (
                    <div className={cn(
                        "w-full animate-in slide-in-from-bottom-4 fade-in duration-500 p-6 rounded-2xl border-l-4 flex flex-col md:flex-row items-center gap-6",
                        isCorrect 
                            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500" 
                            : "bg-red-50 dark:bg-red-950/30 border-red-500"
                    )}>
                        <div className="flex-shrink-0">
                            {isCorrect ? (
                                <CheckCircle2 className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
                            ) : (
                                <XCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
                            )}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className={cn(
                                "text-xl font-bold mb-1",
                                isCorrect ? "text-emerald-800 dark:text-emerald-300" : "text-red-800 dark:text-red-300"
                            )}>
                                {isCorrect ? "¡Excelente!" : "Sigue intentando"}
                            </h4>
                            <p className={cn(
                                "text-lg font-medium",
                                isCorrect ? "text-emerald-700 dark:text-emerald-400/80" : "text-red-700 dark:text-red-400/80"
                            )}>
                                {feedbackMessage}
                            </p>
                        </div>
                        
                        <button
                            onClick={isCorrect ? handleNext : () => setIsCorrect(null)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-md active:scale-95 transition-transform flex-shrink-0 whitespace-nowrap",
                                isCorrect 
                                    ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600" 
                                    : "bg-slate-800 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900"
                            )}
                        >
                            {isCorrect ? (currentStep < EXERCISES.length - 1 ? "Siguiente" : "Finalizar") : "Corregir"}
                            {isCorrect && <ArrowRight className="w-5 h-5" />}
                        </button>
                        
                    </div>
                )}
            </div>

        </div>
    )
}
