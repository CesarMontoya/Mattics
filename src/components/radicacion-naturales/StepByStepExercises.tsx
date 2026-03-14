"use client"

import React, { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, ArrowRight, Award, GripHorizontal, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Math } from "@/components/ui/math"
import { STEP_EXERCISES_DATA } from './StepExercisesData'

export type StepPropertyType = keyof typeof STEP_EXERCISES_DATA;

interface StepByStepExercisesProps {
    propertyType: StepPropertyType;
}

export function StepByStepExercises({ propertyType }: StepByStepExercisesProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    
    const exercises = STEP_EXERCISES_DATA[propertyType]
    const exercise = exercises[currentStep]
    
    // Track which step of the specific exercise we are on
    const [activePromptIndex, setActivePromptIndex] = useState(0)
    
    // Store boxes state for the complete exercise
    // Example: [ ["\\sqrt[3]{125}", "\\sqrt[3]{64}"], ["5", "4"], ["20"] ]
    const [boxes, setBoxes] = useState<string[][]>([])
    
    // Interaction states
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isCorrectStep, setIsCorrectStep] = useState<boolean | null>(null)
    const [feedbackMessage, setFeedbackMessage] = useState("")

    useEffect(() => {
        if (exercise) {
            setBoxes(exercise.prompts.map(p => new Array(p.answers.length).fill("")))
            setActivePromptIndex(0)
            setIsCorrectStep(null)
            setFeedbackMessage("")
            setSelectedOption(null)
        }
    }, [currentStep, exercise])

    const fillBox = (promptIdx: number, boxIdx: number, value: string) => {
        if (promptIdx !== activePromptIndex) return; // Can only fill current active step
        if (isCorrectStep === true) return; // Prevent change if verified correctly
        
        const newBoxes = [...boxes];
        newBoxes[promptIdx] = [...newBoxes[promptIdx]];
        newBoxes[promptIdx][boxIdx] = value;
        setBoxes(newBoxes);
        
        setSelectedOption(null);
        setIsCorrectStep(null);
    }

    const handleDrop = (e: React.DragEvent, promptIdx: number, boxIdx: number) => {
        e.preventDefault()
        const value = e.dataTransfer.getData("text/plain")
        if (value) {
            fillBox(promptIdx, boxIdx, value)
        }
    }

    const handleBoxClick = (promptIdx: number, boxIdx: number) => {
        if (promptIdx !== activePromptIndex) return;
        if (selectedOption && isCorrectStep !== true) {
            fillBox(promptIdx, boxIdx, selectedOption)
        } else if (isCorrectStep !== true) {
            // Empties the box
            fillBox(promptIdx, boxIdx, "")
        }
    }

    const isCurrentStepComplete = () => {
        if (!boxes[activePromptIndex]) return false;
        return boxes[activePromptIndex].every(b => b !== "");
    }

    const verifyStep = () => {
        if (!isCurrentStepComplete()) return
        
        const currentPrompt = exercise.prompts[activePromptIndex]
        const currentAnswers = currentPrompt.answers
        const currentBoxes = boxes[activePromptIndex]
        
        // Exact matching for now. Some questions might have symmetric answers, 
        // handle array sorting if order doesn't matter (e.g. A*B = B*A),
        // but let's assume exact order in this implementation to keep it simple, 
        // or check if sort matches.
        let correct = false;
        if (currentPrompt.symmetric) {
            // Check if arrays have same elements
            const sortedBoxes = [...currentBoxes].sort();
            const sortedAnswers = [...currentAnswers].sort();
            correct = sortedBoxes.every((val, index) => val === sortedAnswers[index]);
        } else {
            correct = currentBoxes.every((val, index) => val === currentAnswers[index]);
        }
        
        if (correct) {
            setIsCorrectStep(true)
            setFeedbackMessage(currentPrompt.explanationText)
        } else {
            setIsCorrectStep(false)
            setFeedbackMessage("Revisa tu respuesta. Intenta usar las opciones correctas.")
        }
    }

    const handleNextStep = () => {
        if (activePromptIndex < exercise.prompts.length - 1) {
            setActivePromptIndex(prev => prev + 1)
            setIsCorrectStep(null)
            setFeedbackMessage("")
        } else {
            // End of exercise
            setScore(prev => prev + 1)
            if (currentStep < exercises.length - 1) {
                const nextExercise = exercises[currentStep + 1];
                setCurrentStep(prev => prev + 1)
                setActivePromptIndex(0)
                setBoxes(nextExercise.prompts.map(p => new Array(p.answers.length).fill("")))
                setIsCorrectStep(null)
                setFeedbackMessage("")
                setSelectedOption(null)
            } else {
                setIsFinished(true)
            }
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
                    ¡Construcción Completada!
                </h3>
                <p className="text-xl text-slate-600 dark:text-zinc-400">
                    Puntuación: <span className="font-bold text-purple-600 dark:text-purple-400">{score}</span> de {exercises.length}
                </p>
                <button
                    onClick={resetQuiz}
                    className="mt-8 px-8 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-full font-bold transition-all shadow-lg"
                >
                    Intentar de nuevo
                </button>
            </div>
        )
    }

    if (!exercise || boxes.length === 0) return null
    if (activePromptIndex >= exercise.prompts.length) return null // Guard when transitioning

    const currentPromptData = exercise.prompts[activePromptIndex];

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-zinc-800 shadow-xl flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-200 shadow-sm border border-slate-100 dark:border-zinc-800 px-4 py-2 rounded-2xl">
                    Ejercicio {currentStep + 1} de {exercises.length}
                </h3>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-x-auto">
                <div className="flex flex-col gap-6 items-center">
                    
                    {/* The Initial Expression */}
                    <div className="text-3xl md:text-4xl font-black text-purple-600 dark:text-purple-400 bg-white dark:bg-zinc-900 py-3 px-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 mb-4 inline-block">
                        <Math math={exercise.question} />
                    </div>

                    {/* Render All Prompts (visible up to current active) */}
                    <div className="flex flex-col gap-4 items-center w-full max-w-2xl">
                        {exercise.prompts.map((prompt, pIdx) => {
                            if (pIdx > activePromptIndex) return null; // hide future steps
                            
                            const isActive = pIdx === activePromptIndex;
                            const isPast = pIdx < activePromptIndex;

                            return (
                                <div key={pIdx} className={cn(
                                    "flex items-center gap-3 w-full justify-center opacity-100 transition-opacity duration-500",
                                    isPast ? "opacity-60 scale-95" : "scale-100"
                                )}>
                                    {/* Format renderer for the prompt */}
                                    {prompt.format.map((item, i) => {
                                        const createBox = (boxIdx: number, scaleDown = false, customMarginClass = "") => {
                                            const boxVal = boxes[pIdx]?.[boxIdx] || "";
                                            
                                            let boxStateClass = "border-slate-300 border-dashed bg-white dark:border-zinc-700 dark:bg-zinc-900";
                                            if (boxVal) {
                                                if (isPast || (isActive && isCorrectStep === true)) {
                                                    boxStateClass = "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
                                                } else if (isActive && isCorrectStep === false) {
                                                    boxStateClass = "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                                                } else {
                                                    boxStateClass = "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 shadow-md";
                                                }
                                            } else if (isActive && selectedOption) {
                                                boxStateClass = "border-purple-300 border-dashed bg-white dark:border-purple-700 dark:bg-zinc-800/70 cursor-pointer hover:border-purple-500 hover:bg-purple-100";
                                            }

                                            const heightClass = scaleDown ? "h-10 sm:h-12 px-2 text-lg" : "h-12 sm:h-16 px-2 sm:px-4 text-xl sm:text-2xl";

                                            return (
                                                <div 
                                                    key={`box-${i}-${boxIdx}`}
                                                    className={cn(
                                                        "min-w-[4rem] sm:min-w-[5rem] shrink-0 border-4 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer",
                                                        heightClass,
                                                        boxStateClass,
                                                        customMarginClass,
                                                        (!isActive) && "pointer-events-none"
                                                    )}
                                                    onDrop={(e) => handleDrop(e, pIdx, boxIdx)}
                                                    onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "copy" }}
                                                    onClick={() => handleBoxClick(pIdx, boxIdx)}
                                                >
                                                    {boxVal ? (
                                                        <span className="font-bold">
                                                            {(boxVal.includes('\\') || boxVal.includes('^')) ? <Math math={boxVal} /> : boxVal}
                                                        </span>
                                                    ) : (
                                                        <span className="opacity-20 font-bold">?</span>
                                                    )}
                                                </div>
                                            )
                                        }

                                        if (item === "BOX" || item.includes("BOX")) {
                                            const baseBoxIdx = prompt.format.slice(0, i).join("").split("BOX").length - 1;
                                            
                                            if (item === "BOX") {
                                                return createBox(baseBoxIdx);
                                            } 
                                            else {
                                                // Handle `\frac{BOX \times BOX}{BOX}`
                                                if (item === "\\frac{BOX \\times BOX}{BOX}") {
                                                    return (
                                                        <div key={i} className="flex flex-col items-center gap-1 mx-2">
                                                            <div className="flex items-center gap-2">
                                                                {createBox(baseBoxIdx, true)}
                                                                <span className="text-xl md:text-2xl text-slate-500 font-bold">×</span>
                                                                {createBox(baseBoxIdx + 1, true)}
                                                            </div>
                                                            <div className="w-full h-1 bg-slate-400 dark:bg-slate-600 rounded-full my-1"></div>
                                                            <div>
                                                                {createBox(baseBoxIdx + 2, true)}
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                                // Handle fraction fallback
                                                if (item.startsWith("\\frac{") || item.startsWith("\\sqrt{\\frac{")) {
                                                    const isRootFraction = item.startsWith("\\sqrt{");
                                                    const parts = item.split("BOX");
                                                    
                                                    const fractionContent = (
                                                        <div className={cn("flex flex-col items-center gap-1", isRootFraction ? "mx-1" : "mx-2")}>
                                                            {parts.slice(0, -1).map((_, innerIdx) => (
                                                                <React.Fragment key={innerIdx}>
                                                                    {innerIdx > 0 && <div className="w-full h-[3px] bg-slate-400 dark:bg-slate-500 rounded-full my-1"></div>}
                                                                    {createBox(baseBoxIdx + innerIdx, true)}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>
                                                    );

                                                    if (isRootFraction) {
                                                        return (
                                                            <div key={i} className="flex items-stretch mt-[2px]">
                                                                <div className="flex items-stretch w-6 sm:w-8 mr-[1px]">
                                                                    <svg className="w-full h-full text-slate-500/80" preserveAspectRatio="none" viewBox="0 0 100 100">
                                                                        <path d="M10,60 L45,95 L100,2" fill="none" stroke="currentColor" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </div>
                                                                <div className="border-t-[3px] border-slate-500/80 pt-2 pb-1 pr-2 w-full mt-[1px]">
                                                                    {fractionContent}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                    return <div key={i} className="flex items-center">{fractionContent}</div>;
                                                }
                                                
                                                // Handle roots with index (e.g. \sqrt[BOX]{81}, \sqrt[4]{BOX}, \sqrt[BOX]{BOX})
                                                if (item.startsWith("\\sqrt[")) {
                                                    const match = item.match(/\\sqrt\[(.*?)\]\{(.*?)\}/);
                                                    if (match) {
                                                        const indexPart = match[1];
                                                        const radicandPart = match[2];
                                                        
                                                        let currentInternalBoxIdx = baseBoxIdx;
                                                        
                                                        const indexBox = indexPart === "BOX" 
                                                            ? createBox(currentInternalBoxIdx++, true, "z-10 !h-7 !min-w-[2rem] !px-1 text-xs bg-white dark:bg-zinc-900 mb-[-12px] mr-[-4px]")
                                                            : <span className="text-sm font-bold text-slate-500 mb-[-12px] mr-[-2px] z-10 bg-white/80 dark:bg-zinc-900/80 rounded px-0.5"><Math math={indexPart} /></span>;
                                                        
                                                        const radicandContent = radicandPart === "BOX"
                                                            ? createBox(currentInternalBoxIdx, false, "mt-1")
                                                            : <Math math={radicandPart} />;

                                                        return (
                                                            <div key={i} className="flex items-stretch mt-1">
                                                                <div className="flex flex-col items-end">
                                                                    <div className="flex justify-end w-full">
                                                                        {indexBox}
                                                                    </div>
                                                                    <div className="flex items-stretch w-5 sm:w-6 mr-[1px] h-full">
                                                                        <svg className="w-full h-full text-slate-500/80" preserveAspectRatio="none" viewBox="0 0 100 100">
                                                                            <path d="M8,65 L40,95 L100,2" fill="none" stroke="currentColor" strokeWidth="5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="border-t-[3px] border-slate-500/80 pt-2 pb-1 pr-2 w-full mt-[1.5px] min-w-[3rem] flex items-center justify-center">
                                                                    {radicandContent}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }
                                                
                                                // Fallback
                                                const parts = item.split("BOX");
                                                return <span key={i}>{parts.join(" BOX ")}</span>
                                            }
                                        } else {
                                            // Static text/math part e.g. "=", "\\times", etc.
                                            return (
                                                <span key={i} className="text-2xl sm:text-3xl text-slate-500 font-bold px-1">
                                                    {(item.includes('\\') || item.includes('}')) ? <Math math={item} /> : item}
                                                </span>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Options Bank for current prompt */}
            <div className="flex flex-col items-center min-h-[140px]">
                <p className="text-sm uppercase tracking-wider font-bold text-slate-400 dark:text-zinc-500 mb-4">
                    Paso {activePromptIndex + 1}: Opciones Disponibles
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    {currentPromptData.options.map((option, idx) => {
                        // Don't show already correctly used options from this prompt if doing 1-to-1 matching?
                        // Simple approach: show all available options for the step always.
                        return (
                        <div
                            key={idx}
                            draggable
                            onDragStart={(e) => {
                                setSelectedOption(null);
                                e.dataTransfer.setData("text/plain", option);
                                e.dataTransfer.effectAllowed = "copy";
                            }}
                            onClick={() => setSelectedOption(option === selectedOption ? null : option)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 rounded-xl border-2 cursor-grab active:cursor-grabbing transition-all hover:-translate-y-1 shadow-sm select-none",
                                selectedOption === option 
                                    ? "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/40 dark:border-purple-400 dark:text-purple-300 ring-2 ring-purple-400" 
                                    : "bg-white border-slate-200 text-slate-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 hover:border-purple-300"
                            )}
                        >
                            <GripHorizontal className="w-4 h-4 opacity-40 shrink-0" />
                            <span className="text-xl sm:text-2xl font-bold">
                                {(option.includes('\\') || option.includes('^')) ? <Math math={option} /> : option}
                            </span>
                        </div>
                    )})}
                </div>
            </div>

            {/* Verification/Feedback Area */}
            <div className="flex flex-col items-center justify-center min-h-[100px] mt-2">
                {isCorrectStep === null ? (
                    <button
                        disabled={!isCurrentStepComplete()}
                        onClick={verifyStep}
                        className={cn(
                            "px-8 py-3 rounded-full font-bold text-lg transition-all",
                            isCurrentStepComplete() 
                                ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg active:scale-95" 
                                : "bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed"
                        )}
                    >
                        Verificar Paso
                    </button>
                ) : (
                    <div className={cn(
                        "w-full animate-in slide-in-from-bottom-4 fade-in duration-500 p-4 sm:p-6 rounded-3xl border-l-4 flex flex-col md:flex-row items-center gap-4 sm:gap-6 shadow-sm",
                        isCorrectStep ? "bg-emerald-50 border-emerald-500 dark:bg-emerald-950/30" : "bg-red-50 border-red-500 dark:bg-red-950/30"
                    )}>
                        <div className="flex-shrink-0">
                            {isCorrectStep ? <CheckCircle2 className="w-10 h-10 text-emerald-500" /> : <XCircle className="w-10 h-10 text-red-500" />}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className={cn("text-lg font-bold mb-1", isCorrectStep ? "text-emerald-800 dark:text-emerald-300" : "text-red-800 dark:text-red-300")}>
                                {isCorrectStep ? "¡Correcto!" : "Revisa tu respuesta"}
                            </h4>
                            <p className={cn("text-base font-medium", isCorrectStep ? "text-emerald-700 dark:text-emerald-400/80" : "text-red-700 dark:text-red-400/80")}>
                                {isCorrectStep && feedbackMessage.includes('$') ? (
                                    <span>
                                        {feedbackMessage.split('$').map((part, i) => {
                                            if (i % 2 === 1) return <Math key={i} math={part} />;
                                            return <span key={i}>{part}</span>;
                                        })}
                                    </span>
                                ) : feedbackMessage}
                            </p>
                        </div>
                        <button
                            onClick={isCorrectStep ? handleNextStep : () => setIsCorrectStep(null)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white shadow-md active:scale-95 transition-transform flex-shrink-0 whitespace-nowrap",
                                isCorrectStep ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-800 hover:bg-slate-900"
                            )}
                        >
                            {isCorrectStep ? (activePromptIndex < exercise.prompts.length - 1 ? "Siguiente Paso" : currentStep < exercises.length - 1 ? "Siguiente Ejercicio" : "Finalizar") : "Corregir"}
                            {isCorrectStep && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
