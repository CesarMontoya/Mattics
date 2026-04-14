import React, { useState } from "react"
import { Anchor, ThermometerSnowflake, Wallet, CheckCircle2, XCircle } from "lucide-react"

export function ContextualExercises() {
    const [answers, setAnswers] = useState({
        submarino: "",
        temperatura: "",
        banco: ""
    })

    const [status, setStatus] = useState({
        submarino: "idle", // idle, correct, incorrect
        temperatura: "idle",
        banco: "idle"
    })

    const checkAnswer = (key: "submarino" | "temperatura" | "banco", correctAnswer: number) => {
        const value = parseInt(answers[key])
        if (isNaN(value)) return

        if (value === correctAnswer) {
            setStatus(prev => ({ ...prev, [key]: "correct" }))
        } else {
            setStatus(prev => ({ ...prev, [key]: "incorrect" }))
        }
    }

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-[100px] -z-10" />
                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
                        Ejercicios del Mundo Real
                    </h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl">
                    Vamos a poner en práctica las operaciones con positivos y negativos aplicando lo que aprendimos a situaciones cotidianas. ¡Piensa bien antes de responder!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Ejercicio 1: Submarino */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-4 text-sky-600 dark:text-sky-400">
                        <div className="p-3 bg-sky-50 dark:bg-sky-900/20 rounded-2xl">
                            <Anchor className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg">El Submarino</h3>
                    </div>
                    <p className="text-slate-600 dark:text-zinc-400 flex-1 mb-6">
                        Un submarino de investigación se encuentra a <strong className="text-rose-500">-200m</strong> bajo el nivel del mar. 
                        Para estudiar un coral, desciende <strong className="text-rose-500">50m más</strong>. 
                        Terminado el estudio, asciende <strong className="text-emerald-500">100m</strong>. 
                        ¿A qué profundidad se encuentra ahora?
                    </p>
                    
                    <div className="mt-auto space-y-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                                value={answers.submarino}
                                onChange={(e) => {
                                    setAnswers(prev => ({ ...prev, submarino: e.target.value }))
                                    setStatus(prev => ({ ...prev, submarino: "idle" }))
                                }}
                            />
                            <span className="text-slate-500 font-medium">m</span>
                        </div>
                        
                        <button
                            onClick={() => checkAnswer("submarino", -150)}
                            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition-colors"
                        >
                            Comprobar
                        </button>

                        {status.submarino === "correct" && (
                            <div className="flex justify-center items-center gap-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl animate-in zoom-in duration-300">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-bold">¡Correcto! (-150m)</span>
                            </div>
                        )}
                        {status.submarino === "incorrect" && (
                            <div className="flex justify-center items-center gap-2 text-rose-500 bg-rose-50 dark:bg-rose-500/10 p-3 rounded-xl animate-in headShake duration-300">
                                <XCircle className="w-5 h-5" />
                                <span className="font-bold">Intenta de nuevo.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ejercicio 2: Temperatura */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-4 text-amber-500">
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
                            <ThermometerSnowflake className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg">El Clima Extremo</h3>
                    </div>
                    <p className="text-slate-600 dark:text-zinc-400 flex-1 mb-6">
                        En la madrugada, el termómetro marca <strong className="text-rose-500">-4°C</strong>. 
                        Para el mediodía, el sol calienta y la temperatura sube <strong className="text-emerald-500">12°C</strong>. 
                        Al llegar la noche, vuelve a caer <strong className="text-rose-500">5°C</strong>. 
                        ¿Cuál es la temperatura final?
                    </p>
                    
                    <div className="mt-auto space-y-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                                value={answers.temperatura}
                                onChange={(e) => {
                                    setAnswers(prev => ({ ...prev, temperatura: e.target.value }))
                                    setStatus(prev => ({ ...prev, temperatura: "idle" }))
                                }}
                            />
                            <span className="text-slate-500 font-medium">°C</span>
                        </div>
                        
                        <button
                            onClick={() => checkAnswer("temperatura", 3)}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors"
                        >
                            Comprobar
                        </button>

                        {status.temperatura === "correct" && (
                            <div className="flex justify-center items-center gap-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl animate-in zoom-in duration-300">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-bold">¡Exacto! (+3°C)</span>
                            </div>
                        )}
                        {status.temperatura === "incorrect" && (
                            <div className="flex justify-center items-center gap-2 text-rose-500 bg-rose-50 dark:bg-rose-500/10 p-3 rounded-xl animate-in headShake duration-300">
                                <XCircle className="w-5 h-5" />
                                <span className="font-bold">Revisa tus cuentas.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ejercicio 3: Banco */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-400">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg">Finanzas de Gamer</h3>
                    </div>
                    <p className="text-slate-600 dark:text-zinc-400 flex-1 mb-6">
                        Inicias el mes con <strong className="text-emerald-500">$50</strong> ahorrados. 
                        La plataforma de juegos te cobra la suscripción anual de <strong className="text-rose-500">$85</strong> (¡quedaste debiendo!). 
                        Al día siguiente depositas <strong className="text-emerald-500">$20</strong> para cubrir la deuda. 
                        ¿Cuál es el saldo actual de tu cuenta?
                    </p>
                    
                    <div className="mt-auto space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-medium">$</span>
                            <input
                                type="number"
                                className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 text-slate-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                                value={answers.banco}
                                onChange={(e) => {
                                    setAnswers(prev => ({ ...prev, banco: e.target.value }))
                                    setStatus(prev => ({ ...prev, banco: "idle" }))
                                }}
                            />
                        </div>
                        
                        <button
                            onClick={() => checkAnswer("banco", -15)}
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
                        >
                            Comprobar
                        </button>

                        {status.banco === "correct" && (
                            <div className="flex justify-center items-center gap-2 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-xl animate-in zoom-in duration-300">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-bold">¡Bien! Debes $15 (-15).</span>
                            </div>
                        )}
                        {status.banco === "incorrect" && (
                            <div className="flex justify-center items-center gap-2 text-rose-500 bg-rose-50 dark:bg-rose-500/10 p-3 rounded-xl animate-in headShake duration-300">
                                <XCircle className="w-5 h-5" />
                                <span className="font-bold">Calcula de nuevo.</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
