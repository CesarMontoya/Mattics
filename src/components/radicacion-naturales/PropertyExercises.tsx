"use client"

import React, { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, ArrowRight, Award, GripHorizontal, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Math } from "@/components/ui/math"

const EXERCISES_DATA = {
    product: [
        {
            id: 1,
            question: "\\sqrt[3]{125 \\times 64}",
            options: ["8000", "9", "20", "54"],
            correctAnswer: "20",
            explanationText: "¡Excelente! Separamos en $\\sqrt[3]{125} \\times \\sqrt[3]{64} = 5 \\times 4 = 20$."
        },
        {
            id: 2,
            question: "\\sqrt{16 \\times 49 \\times 81}",
            options: ["146", "252", "14", "108"],
            correctAnswer: "252",
            explanationText: "¡Correcto! $\\sqrt{16} \\times \\sqrt{49} \\times \\sqrt{81} = 4 \\times 7 \\times 9 = 252$."
        },
        {
            id: 3,
            question: "\\sqrt[16]{m \\times n}",
            options: ["\\sqrt[16]{mn}", "\\sqrt{m} \\times \\sqrt{n}", "\\sqrt[16]{m} \\times \\sqrt[16]{n}", "mn"],
            correctAnswer: "\\sqrt[16]{m} \\times \\sqrt[16]{n}",
            explanationText: "¡Muy bien! Separamos los factores conservando el índice: $\\sqrt[16]{m} \\times \\sqrt[16]{n}$."
        },
        {
            id: 4,
            question: "\\sqrt[11]{a^2 \\times b^4 \\times c^5}",
            options: ["\\sqrt[11]{a^2 b^4 c^5}", "\\sqrt[11]{a^2} \\times \\sqrt[11]{b^4} \\times \\sqrt[11]{c^5}", "\\sqrt{a^2} \\times \\sqrt{b^4} \\times \\sqrt{c^5}", "a^{22} \\times b^{44} \\times c^{55}"],
            correctAnswer: "\\sqrt[11]{a^2} \\times \\sqrt[11]{b^4} \\times \\sqrt[11]{c^5}",
            explanationText: "¡Exacto! Simplemente aplicamos la propiedad separando la raíz y conservando el índice 11 para cada uno de los factores."
        }
    ],
    quotient: [
        {
            id: 1,
            question: "\\sqrt{\\frac{144}{9}}",
            options: ["12", "16", "4", "3"],
            correctAnswer: "4",
            explanationText: "¡Excelente! $\\frac{\\sqrt{144}}{\\sqrt{9}} = \\frac{12}{3} = 4$."
        },
        {
            id: 2,
            question: "\\sqrt[3]{\\frac{1000 \\times 8}{64}}",
            options: ["10", "2", "5", "20"],
            correctAnswer: "5",
            explanationText: "¡Correcto! $\\frac{\\sqrt[3]{1000} \\times \\sqrt[3]{8}}{\\sqrt[3]{64}} = \\frac{10 \\times 2}{4} = \\frac{20}{4} = 5$."
        },
        {
            id: 3,
            question: "\\sqrt[4]{\\frac{x}{y}}",
            options: ["\\frac{x}{y}", "\\frac{\\sqrt[4]{x}}{y}", "\\frac{\\sqrt[4]{x}}{\\sqrt[4]{y}}", "\\sqrt{\\frac{x}{y}}"],
            correctAnswer: "\\frac{\\sqrt[4]{x}}{\\sqrt[4]{y}}",
            explanationText: "¡Muy bien! Distribuimos la raíz tanto en el numerador como en el denominador: $\\frac{\\sqrt[4]{x}}{\\sqrt[4]{y}}$."
        },
        {
            id: 4,
            question: "\\sqrt{\\frac{(3^2)^2}{9}}",
            options: ["9", "27", "81", "3"],
            correctAnswer: "3",
            explanationText: "¡Exacto! Primero simplificamos las potencias: $\\sqrt{\\frac{3^4}{3^2}} = \\sqrt{3^2} = 3$."
        }
    ],
    rootOfRoot: [
        {
            id: 1,
            question: "\\sqrt{\\sqrt{81}}",
            options: ["9", "3", "2", "27"],
            correctAnswer: "3",
            explanationText: "¡Excelente! Multiplicamos índices $2 \\times 2 = 4$. $\\sqrt[4]{81} = 3$."
        },
        {
            id: 2,
            question: "\\sqrt{\\sqrt[3]{64}}",
            options: ["4", "8", "6", "2"],
            correctAnswer: "2",
            explanationText: "¡Correcto! Multiplicamos índices $2 \\times 3 = 6$. $\\sqrt[6]{64} = 2$."
        },
        {
            id: 3,
            question: "\\sqrt[3]{\\sqrt{a}}",
            options: ["\\sqrt[5]{a}", "\\sqrt[6]{a}", "\\sqrt[3]{a}", "\\sqrt{a}"],
            correctAnswer: "\\sqrt[6]{a}",
            explanationText: "¡Muy bien! Multiplicamos los índices $3 \\times 2 = 6$, obteniendo $\\sqrt[6]{a}$."
        },
        {
            id: 4,
            question: "\\sqrt{\\sqrt{(2^2)^4}}",
            options: ["16", "2", "8", "4"],
            correctAnswer: "4",
            explanationText: "¡Exacto! Potencia de potencia: $(2^2)^4 = 2^8$. Raíz de raíz: $2 \\times 2 = 4$. Nos queda $\\sqrt[4]{2^8} = 2^2 = 4$."
        }
    ],
    rootOfPower: [
        {
            id: 1,
            question: "\\sqrt[3]{2^6}",
            options: ["8", "2", "16", "4"],
            correctAnswer: "4",
            explanationText: "¡Excelente! Dividimos el exponente entre el índice: $2^{6 \\div 3} = 2^2 = 4$."
        },
        {
            id: 2,
            question: "\\sqrt[4]{3^{12} \\times 2^8}",
            options: ["54", "36", "108", "72"],
            correctAnswer: "108",
            explanationText: "¡Correcto! Dividimos ambos exponentes entre 4: $3^3 \\times 2^2 = 27 \\times 4 = 108$."
        },
        {
            id: 3,
            question: "\\sqrt[5]{m^{15}}",
            options: ["m^5", "m^2", "m^{10}", "m^3"],
            correctAnswer: "m^3",
            explanationText: "¡Muy bien! Dividimos el exponente entre el índice: $m^{15 \\div 5} = m^3$."
        },
        {
            id: 4,
            question: "\\sqrt[3]{(5^2)^3}",
            options: ["125", "25", "5", "625"],
            correctAnswer: "25",
            explanationText: "¡Exacto! Potencia de potencia: $(5^2)^3 = 5^6$. Luego raíz: $5^{6 \\div 3} = 5^2 = 25$."
        }
    ],
    powerOfRoot: [
        {
            id: 1,
            question: "(\\sqrt{7})^2",
            options: ["49", "14", "7", "1"],
            correctAnswer: "7",
            explanationText: "¡Excelente! Al elevar una raíz cuadrada (índice 2) a la 2, se simplifican y obtenemos 7."
        },
        {
            id: 2,
            question: "(\\sqrt[3]{2 \\times 5})^3",
            options: ["1000", "7", "30", "10"],
            correctAnswer: "10",
            explanationText: "¡Correcto! El exponente 3 y el índice 3 se anulan, y queda $2 \\times 5 = 10$."
        },
        {
            id: 3,
            question: "(\\sqrt[4]{p})^8",
            options: ["p^4", "p^8", "p^2", "p"],
            correctAnswer: "p^2",
            explanationText: "¡Muy bien! Podemos hacerlo dividiendo el exponente exterior 8 entre el índice 4: $p^{8 \\div 4} = p^2$."
        },
        {
            id: 4,
            question: "(\\sqrt[3]{(2^2)^3})^2",
            options: ["8", "64", "4", "16"],
            correctAnswer: "16",
            explanationText: "¡Exacto! Primero las dos potencias interiores y la raíz cúbica: $\\sqrt[3]{2^6} = 2^2 = 4$. Y finalmente elevamos al cuadrado de afuera: $4^2 = 16$."
        }
    ]
}

export type PropertyType = keyof typeof EXERCISES_DATA;

interface PropertyExercisesProps {
    propertyType: PropertyType;
}

export function PropertyExercises({ propertyType }: PropertyExercisesProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    
    const exercises = EXERCISES_DATA[propertyType]
    const exercise = exercises[currentStep]
    
    // Arrays for answering
    const [box, setBox] = useState<string>("")
    
    // Interaction states
    const [draggedValue, setDraggedValue] = useState<string | null>(null)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [feedbackMessage, setFeedbackMessage] = useState("")

    useEffect(() => {
        if (exercise) {
            setBox("")
            setIsCorrect(null)
            setFeedbackMessage("")
            setSelectedOption(null)
            setDraggedValue(null)
        }
    }, [currentStep, exercise])

    const isComplete = box !== ""

    const handleDragStart = (e: React.DragEvent, value: string) => {
        setDraggedValue(value)
        setSelectedOption(null)
        e.dataTransfer.setData("text/plain", value)
        e.dataTransfer.effectAllowed = "copy"
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const value = e.dataTransfer.getData("text/plain")
        if (value && !isCorrect) {
            fillBox(value)
        }
        setDraggedValue(null)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy"
    }

    const fillBox = (value: string) => {
        if (isCorrect) return // Don't allow changing if already verified & correct
        setBox(value)
        setSelectedOption(null)
        setIsCorrect(null) // Reset evaluation when they change answers
    }

    const handleBoxClick = () => {
        // Remove value if there's no selected option, else place the selected option
        if (selectedOption && !isCorrect) {
            fillBox(selectedOption)
        } else if (!isCorrect) {
            // Empties the box
            setBox("")
            setIsCorrect(null)
        }
    }

    const verifyAnswer = () => {
        if (!isComplete) return
        
        const correct = box === exercise.correctAnswer
        
        if (correct) {
            setIsCorrect(true)
            setFeedbackMessage(exercise.explanationText)
            setScore(prev => prev + 1)
        } else {
            setIsCorrect(false)
            setFeedbackMessage("Revisa tu respuesta. Intenta simplificar usando las propiedades aprendidas.")
        }
    }

    const handleNext = () => {
        if (currentStep < exercises.length - 1) {
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
                    ¡Propiedad Superada!
                </h3>
                <p className="text-xl text-slate-600 dark:text-zinc-400">
                    Puntuación: <span className="font-bold text-purple-600 dark:text-purple-400">{score}</span> de {exercises.length}
                </p>
                <div className="h-2 w-full max-w-sm bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-4">
                    <div 
                        className="h-full bg-purple-600 dark:bg-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(score / exercises.length) * 100}%` }}
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
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-200 shadow-sm border border-slate-100 dark:border-zinc-800 px-4 py-2 rounded-2xl">
                    Ejercicio {currentStep + 1} de {exercises.length}
                </h3>
                <div className="flex gap-1.5">
                    {exercises.map((_, idx) => (
                        <div 
                            key={idx}
                            className={cn(
                                "h-2 w-6 sm:w-8 rounded-full transition-all duration-300",
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
                    Arrastra la respuesta correcta al recuadro vacío para resolver la expresión.
                </p>

                <div className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-8 w-full pb-4">
                    {/* Root Expression */}
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-purple-600 dark:text-purple-400 whitespace-nowrap bg-white dark:bg-zinc-900 py-4 px-6 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800">
                            <Math math={exercise.question} />
                        </div>
                        
                        <span className="text-3xl md:text-4xl lg:text-5xl text-slate-400 font-bold px-2">=</span>
                    </div>
                    
                    {/* Arrow Divider (optional) */}
                    <div className="text-slate-300 dark:text-zinc-600 shrink-0 my-2 xl:my-0 hidden sm:block">
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 rotate-90 xl:rotate-0 flex-shrink-0" />
                    </div>

                    {/* Box Area */}
                    <div className="flex items-center justify-center bg-purple-50/50 dark:bg-purple-900/10 p-4 sm:p-6 rounded-3xl border border-purple-100 dark:border-purple-900/30">
                        <div 
                            className={cn(
                                "min-w-[5rem] sm:min-w-[6rem] sm:h-20 h-16 sm:px-6 px-4 shrink-0 border-4 rounded-2xl flex items-center justify-center transition-all duration-300",
                                box 
                                    ? isCorrect === true 
                                        ? "bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                        : isCorrect === false
                                            ? "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                            : "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 shadow-md" 
                                    : selectedOption 
                                        ? "border-purple-300 border-dashed bg-white dark:border-purple-700 dark:bg-zinc-800/70 cursor-pointer hover:border-purple-500 hover:bg-purple-100" 
                                        : "border-slate-300 border-dashed bg-white dark:border-zinc-700 dark:bg-zinc-900" 
                            )}
                            onDrop={(e) => handleDrop(e)}
                            onDragOver={handleDragOver}
                            onClick={() => handleBoxClick()}
                        >
                            {box ? (
                                box.includes('\\') || box.includes('^') || box.includes('_') ? 
                                <span className="text-2xl sm:text-3xl font-bold"><Math math={box} /></span> :
                                <span className="text-2xl sm:text-3xl font-bold">{box}</span>
                            ) : (
                                <span className="opacity-20 text-3xl font-bold">?</span>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Reset button for the boxes */}
                {box !== "" && !isCorrect && (
                    <button 
                        onClick={() => setBox("")}
                        className="mt-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors bg-white dark:bg-zinc-800 px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-zinc-700"
                    >
                        <RotateCcw className="w-4 h-4" /> Limpiar recuadro
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
                                "flex items-center gap-2 px-6 py-4 rounded-2xl border-2 cursor-grab active:cursor-grabbing transition-all hover:-translate-y-1 shadow-sm select-none",
                                selectedOption === option 
                                    ? "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/40 dark:border-purple-400 dark:text-purple-300 ring-2 ring-purple-400 ring-offset-2 dark:ring-offset-zinc-900" 
                                    : "bg-white border-slate-200 text-slate-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 hover:border-purple-300 dark:hover:border-purple-700"
                            )}
                        >
                            <GripHorizontal className="w-5 h-5 opacity-40 shrink-0" />
                            {option.includes('\\') || option.includes('^') || option.includes('_') ? (
                                <span className="text-2xl"><Math math={option} /></span>
                            ) : (
                                <span className="text-2xl font-bold">{option}</span>
                            )}
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
                        "w-full animate-in slide-in-from-bottom-4 fade-in duration-500 p-6 rounded-3xl border-l-4 flex flex-col md:flex-row items-center gap-6 shadow-sm",
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
                                {isCorrect && exercise.explanationText.includes('$') ? (
                                    <span>
                                        {exercise.explanationText.split('$').map((part, i) => {
                                            if (i % 2 === 1) {
                                                return <Math key={i} math={part} />;
                                            }
                                            return <span key={i}>{part}</span>;
                                        })}
                                    </span>
                                ) : (
                                    exercise.explanationText
                                )}
                            </p>
                            {isCorrect && exercise.explanationText !== "" && (
                                <div className="mt-2 text-lg font-medium text-emerald-800 dark:text-emerald-300">
                                    {/* Actually let's use the explanationText directly, keeping formatting simple */}
                                </div>
                            )}
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
                            {isCorrect ? (currentStep < exercises.length - 1 ? "Siguiente" : "Finalizar") : "Corregir"}
                            {isCorrect && <ArrowRight className="w-5 h-5" />}
                        </button>
                        
                    </div>
                )}
            </div>

        </div>
    )
}
