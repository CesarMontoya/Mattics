"use client"

import React, { useState } from "react"
import { CheckCircle, XCircle, HelpCircle } from "lucide-react"

interface Option {
    id: string
    text: string
    feedback?: string // Shown when wrong
}

interface QuestionCardProps {
    question: string
    options: Option[]
    correctId: string
    hint?: string
}

export function QuestionCard({ question, options, correctId, hint }: QuestionCardProps) {
    const [selected, setSelected] = useState<string | null>(null)
    const [showHint, setShowHint] = useState(false)
    const answered = selected !== null
    const isCorrect = selected === correctId

    const handleSelect = (id: string) => {
        if (!answered) setSelected(id)
    }

    const reset = () => {
        setSelected(null)
        setShowHint(false)
    }

    return (
        <div className="w-full rounded-3xl border-2 border-indigo-100 dark:border-indigo-900 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/40 dark:to-zinc-900 shadow-md overflow-hidden">
            {/* Question */}
            <div className="p-6 pb-4">
                <div className="flex items-start gap-3">
                    <HelpCircle className="h-6 w-6 text-indigo-500 shrink-0 mt-0.5" />
                    <p className="text-lg font-semibold text-slate-800 dark:text-zinc-200 leading-snug">
                        {question}
                    </p>
                </div>
            </div>

            {/* Options */}
            <div className="px-6 pb-4 flex flex-col gap-3">
                {options.map((opt) => {
                    const isSelected = selected === opt.id
                    const isRight = opt.id === correctId
                    let style = "border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-indigo-300 hover:bg-indigo-50/50"
                    if (answered) {
                        if (isRight) style = "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
                        else if (isSelected) style = "border-red-400 bg-red-50 dark:bg-red-900/30"
                        else style = "border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 opacity-60"
                    }

                    return (
                        <button
                            key={opt.id}
                            onClick={() => handleSelect(opt.id)}
                            disabled={answered}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${style} ${!answered ? "cursor-pointer" : "cursor-default"}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold
                                    ${answered && isRight ? "bg-emerald-500 border-emerald-500 text-white"
                                    : answered && isSelected ? "bg-red-500 border-red-500 text-white"
                                    : "border-slate-300 dark:border-zinc-600 text-slate-500"}`}>
                                    {opt.id.toUpperCase()}
                                </span>
                                <span className={`font-medium text-sm ${answered && isRight ? "text-emerald-700 dark:text-emerald-300"
                                    : answered && isSelected ? "text-red-700 dark:text-red-300"
                                    : "text-slate-700 dark:text-zinc-300"}`}>
                                    {opt.text}
                                </span>
                                {answered && isRight && <CheckCircle className="h-5 w-5 text-emerald-500 ml-auto" />}
                                {answered && isSelected && !isRight && <XCircle className="h-5 w-5 text-red-500 ml-auto" />}
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* Feedback */}
            {answered && (
                <div className={`mx-6 mb-4 p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                    isCorrect
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200"
                        : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                }`}>
                    {isCorrect ? (
                        <span>✅ <strong>¡Correcto!</strong> {options.find(o => o.id === correctId)?.feedback || "¡Excelente razonamiento!"}</span>
                    ) : (
                        <span>❌ <strong>Inténtalo de nuevo.</strong> {options.find(o => o.id === selected)?.feedback}</span>
                    )}
                </div>
            )}

            {/* Hint */}
            {hint && !answered && (
                <div className="px-6 pb-4">
                    <button
                        onClick={() => setShowHint(s => !s)}
                        className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold underline underline-offset-2"
                    >
                        {showHint ? "Ocultar pista" : "💡 Ver pista"}
                    </button>
                    {showHint && (
                        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-xl">
                            💡 {hint}
                        </p>
                    )}
                </div>
            )}

            {/* Retry */}
            {answered && !isCorrect && (
                <div className="px-6 pb-5">
                    <button
                        onClick={reset}
                        className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 font-bold underline underline-offset-2"
                    >
                        🔁 Intentar de nuevo
                    </button>
                </div>
            )}
        </div>
    )
}
