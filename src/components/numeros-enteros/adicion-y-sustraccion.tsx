"use client"

import React, { useState } from "react"
import { FunctionSquare, Sigma, Parentheses, Brain, CheckCircle2, HelpCircle, Thermometer, ArrowRightLeft, Target, Info } from "lucide-react"
import { Math } from "@/components/ui/math"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/sidebar/tooltip"

export default function AdicionSustraccionEnteros() {
    return (
        <TooltipProvider>
            <div className="space-y-12 pb-20">
                {/* Sección 1: Definición y Reglas de Signos */}
                <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-6 flex items-center gap-3">
                        <Sigma className="text-sky-600" />
                        Reglas Operativas de la Adición en <Math math={String.raw`\mathbb{Z}`} />
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-emerald-500">
                            <h4 className="font-bold text-lg mb-2 text-emerald-800 dark:text-emerald-400">1. Adición de números con igual signo</h4>
                            <p className="text-slate-600 dark:text-zinc-400 mb-4">
                                Imagina que todos los números son <strong>fichas</strong>. Si los signos son iguales, simplemente <strong>sumamos la cantidad total de fichas</strong> porque todas son del mismo tipo (todas positivas o todas negativas).
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                    <Math math="(+15) + (+20) = +35" />
                                    <p className="text-[10px] mt-1 text-slate-400">35 fichas positivas en total</p>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                    <Math math="(-12) + (-8) = -20" />
                                    <p className="text-[10px] mt-1 text-slate-400">20 fichas negativas en total</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-amber-500">
                            <h4 className="font-bold text-lg mb-2 text-amber-800 dark:text-amber-400">2. Adición de números con diferente signo</h4>
                            <p className="text-slate-600 dark:text-zinc-400 mb-4">
                                Aquí ocurre una <strong>cancelación</strong>. Cada ficha positiva anula a una ficha negativa. El resultado es la cantidad de fichas que sobran y su tipo.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center cursor-help group">
                                            <Math math="(-45) + (+30) = -15" />
                                            <div className="flex items-center justify-center gap-1 mt-1 text-amber-600">
                                                <Info className="w-3 h-3" />
                                                <span className="text-[10px]">Ver explicación</span>
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="max-w-[200px] text-center">
                                        Se cancelan 30 fichas positivas con 30 fichas negativas; quedan 15 fichas negativas.
                                    </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center cursor-help group">
                                            <Math math="(+100) + (-20) = +80" />
                                            <div className="flex items-center justify-center gap-1 mt-1 text-emerald-600">
                                                <Info className="w-3 h-3" />
                                                <span className="text-[10px]">Ver explicación</span>
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="max-w-[200px] text-center">
                                        Se cancelan 20 fichas negativas con 20 fichas positivas; quedan 80 fichas positivas.
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección 2: Propiedades Formales */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                        <ArrowRightLeft className="text-indigo-500" />
                        Propiedades de la Adición
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { 
                                title: "Clausurativa", 
                                desc: "La suma de dos números enteros es siempre otro número entero. La operación es interna al conjunto Z.", 
                                math: "a, b \\in \\mathbb{Z} \\implies (a + b) \\in \\mathbb{Z}" 
                            },
                            { title: "Conmutativa", desc: "El orden de los sumandos no altera la suma total.", math: "a + b = b + a" },
                            { title: "Elemento Neutro", desc: "Cualquier número sumado con cero da el mismo número.", math: "a + 0 = a" },
                            { title: "Elemento Opuesto", desc: "Todo número tiene un opuesto que al sumarlos da cero.", math: "a + (-a) = 0" }
                        ].map((prop, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between">
                                <div>
                                    <h5 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">{prop.title}</h5>
                                    <p className="text-base text-slate-600 dark:text-zinc-400 mb-4">{prop.desc}</p>
                                </div>
                                <div className="text-lg font-mono bg-slate-50 dark:bg-zinc-800 p-4 rounded-xl text-center border border-slate-100 dark:border-zinc-700">
                                    <Math math={prop.math} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sección 3: Polinomios Aritméticos (Varios términos) */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">1</div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Suma Algebraica de Varios Términos</h3>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <p className="text-slate-600 dark:text-zinc-400 mb-6">
                            Para resolver expresiones con múltiples términos, aplicamos la <strong>propiedad asociativa</strong> agrupando los términos por su signo:
                        </p>
                        <div className="space-y-6 max-w-2xl mx-auto">
                            <div className="p-6 bg-slate-50 dark:bg-zinc-800/80 rounded-2xl font-mono text-lg space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-700 pb-2">
                                    <span className="text-slate-400 text-sm italic">Expresión:</span>
                                    <Math math="-15 + 24 - 8 + 30 - 12" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-emerald-600 text-sm font-bold uppercase">Agrupar (+):</span>
                                    <Math math="(24 + 30) = 54" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-rose-600 text-sm font-bold uppercase">Agrupar (-):</span>
                                    <Math math="(-15 - 8 - 12) = -35" />
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-sky-200 dark:border-sky-900 font-bold text-2xl text-sky-600">
                                    <span>Total:</span>
                                    <Math math="54 - 35 = 19" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección 4: Signos de Agrupación Complejos */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">2</div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Jerarquía y Signos de Agrupación</h3>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative">
                        <Parentheses className="absolute top-4 right-4 text-slate-100 dark:text-zinc-800 w-24 h-24 -z-10" />
                        <div className="max-w-3xl">
                            <p className="text-slate-600 dark:text-zinc-400 mb-6 font-medium italic">
                                "Si un signo negativo antecede a un paréntesis, todos los términos en su interior cambian de signo al suprimir el signo de agrupación."
                            </p>
                            <div className="space-y-4">
                                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                                    <h5 className="font-bold text-indigo-800 dark:text-indigo-400 mb-4 flex items-center gap-2">
                                        <Brain className="w-5 h-5" /> Análisis Paso a Paso:
                                    </h5>
                                    <div className="space-y-3 font-mono text-sm md:text-base">
                                        <div className="flex gap-4">
                                            <span className="text-slate-400 w-8">1.</span>
                                            <Math math="25 - [ -8 + (15 - 20) ] + 10" />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <span className="text-slate-400 w-8">2.</span>
                                            <Math math="25 - [ -8 + (-5) ] + 10" />
                                            <span className="text-[10px] bg-slate-200 dark:bg-zinc-700 px-2 py-1 rounded text-slate-600 uppercase">Paréntesis</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <span className="text-slate-400 w-8">3.</span>
                                            <Math math="25 - [ -13 ] + 10" />
                                            <span className="text-[10px] bg-slate-200 dark:bg-zinc-700 px-2 py-1 rounded text-slate-600 uppercase">Corchetes</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <span className="text-slate-400 w-8">4.</span>
                                            <Math math="25 + 13 + 10" />
                                            <span className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded uppercase">Supresión</span>
                                        </div>
                                        <div className="flex gap-4 font-bold text-indigo-600 text-lg border-t border-indigo-200 dark:border-indigo-800 pt-2 mt-2">
                                            <span className="text-slate-400 w-8">R.</span>
                                            <Math math="48" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección 5: Ecuaciones con Incógnitas (Desafíos) */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                        <Target className="text-rose-500" />
                        Ecuaciones de primer grado en <Math math={"\\mathbb{Z}"} />
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400">
                        Determina el valor que satisface la igualdad en cada caso:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PureMathExercise 
                            equation={"-15 + \\Box = -40"} 
                            answer={-25} 
                            solution={"x = -40 - (-15) \\Rightarrow x = -40 + 15 = -25"}
                        />
                        <PureMathExercise 
                            equation={"20 - ( -8 + \\Box ) = 35"} 
                            answer={-7} 
                            solution={"20 - 35 = -8 + x \\Rightarrow -15 = -8 + x \\Rightarrow x = -7"}
                        />
                    </div>
                </section>

                {/* Sección 6: Aplicaciones y Ejercicios Finales */}
                <section className="space-y-8">
                    <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-zinc-100">Evaluación de Competencias</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Situación 1 */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mb-6 text-sky-600">
                                    <HelpCircle className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">Balance Financiero</h4>
                                <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                                    Un comerciante inicia el día con un saldo de <strong>-$250.000</strong>. Realiza una venta de <strong>$480.000</strong>, paga un servicio de <strong>$120.000</strong> y recibe un abono de una deuda por <strong>$300.000</strong>. ¿Cuál es su saldo final?
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <input type="number" placeholder="Resultado" className="flex-1 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl p-4 text-center font-mono font-bold text-lg" />
                                <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 rounded-xl font-bold transition-colors">Validar</button>
                            </div>
                        </div>

                        {/* Situación 2 */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-6 text-rose-600">
                                    <Thermometer className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">Variación Térmica</h4>
                                <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                                    La temperatura en el Polo Norte es de <strong>-35°C</strong>. Si un científico necesita que su experimento alcance los <strong>-12°C</strong>, ¿cuántos grados debe aumentar la temperatura de su laboratorio?
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <input type="number" placeholder="Grados" className="flex-1 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl p-4 text-center font-mono font-bold text-lg" />
                                <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 rounded-xl font-bold transition-colors">Validar</button>
                            </div>
                        </div>

                    </div>

                    {/* Tabla de Ejercicios Puros */}
                    <div className="bg-white dark:bg-zinc-900 p-10 rounded-[40px] border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 dark:bg-zinc-800/20 rounded-full -mr-32 -mt-32" />
                        <h4 className="text-2xl font-bold mb-10 flex items-center gap-3 text-slate-800 dark:text-zinc-100">
                            <CheckCircle2 className="text-emerald-500 w-7 h-7" />
                            Práctica de Cálculo Mental y Escrito
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                            {[
                                { q: "(-50) + (-35) + 100", r: "15" },
                                { q: "40 - ( -12 + 5 )", r: "47" },
                                { q: "(-8) - (-8) + (-2)", r: "-2" },
                                { q: "100 - [ 50 - ( -20 ) ]", r: "30" },
                                { q: "-30 + ( 15 - 40 )", r: "-55" },
                                { q: "[ (-2) + (-3) ] - (-5)", r: "0" }
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-3xl border border-slate-100 dark:border-zinc-700 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all group">
                                    <div className="flex flex-col gap-3">
                                        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Ejercicio {i+1}</span>
                                        <div className="text-xl font-mono flex justify-between items-center text-slate-700 dark:text-zinc-200">
                                            <Math math={item.q} />
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-300 dark:text-zinc-600">=</span>
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 dark:text-emerald-400 font-bold">
                                                    {item.r}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </section>
            </div>
        </TooltipProvider>
    )
}

function PureMathExercise({ equation, answer, solution }: { equation: string, answer: number, solution: string }) {
    const [val, setVal] = useState("")
    const [showSolution, setShowSolution] = useState(false)
    const isCorrect = parseInt(val) === answer

    return (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col gap-6 group">
            <div className="text-3xl font-mono text-center py-8 bg-slate-50 dark:bg-zinc-800 rounded-2xl border border-slate-100 dark:border-zinc-700 group-hover:border-rose-200 transition-colors">
                <Math math={equation.replace(/\\Box/g, val || "x")} />
            </div>
            
            <div className="space-y-4">
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        placeholder="Valor de x"
                        className="flex-1 p-4 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-center font-bold text-xl"
                    />
                    <button 
                        onClick={() => setShowSolution(!showSolution)}
                        className="bg-slate-900 dark:bg-zinc-800 text-white p-4 rounded-xl hover:opacity-80 transition-opacity"
                        title="Ver solución"
                    >
                        <Brain />
                    </button>
                </div>
                
                {val !== "" && (
                    <div className={`p-4 rounded-xl text-center font-bold text-sm animate-in zoom-in ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {isCorrect ? "Identidad comprobada ✓" : "El valor no satisface la igualdad"}
                    </div>
                )}

                {showSolution && (
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-xl animate-in fade-in slide-in-from-top-2">
                        <p className="text-xs font-bold text-indigo-600 uppercase mb-2 tracking-wider">Procedimiento:</p>
                        <div className="font-mono text-sm text-indigo-800 dark:text-indigo-300">
                            <Math math={solution} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
