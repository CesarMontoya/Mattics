"use client"

import React from "react"
import { Calculator, RefreshCcw, SplitSquareHorizontal, Sparkles, Braces } from "lucide-react"
import { Math } from "@/components/ui/math"

export default function MultiplicacionDivisionEnteros() {
    return (
        <div className="space-y-12 pb-20">
            <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-6 flex items-center gap-3">
                    <Calculator className="text-sky-600" />
                    Multiplicación de enteros con lógica de fichas
                </h2>

                <div className="space-y-6 text-slate-600 dark:text-zinc-400">
                    <p>
                        Acá no memorizamos una tabla de signos. Pensamos con sentido: el <strong>factor 1</strong> define
                        el tipo y cantidad de fichas base, y el <strong>factor 2</strong> dice cuántas veces actuamos sobre
                        ese grupo. Si el factor 2 es positivo, conserva el signo del factor 1; si es negativo, cambia el
                        signo del factor 1.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-emerald-500">
                            <h4 className="font-bold text-lg mb-3 text-emerald-800 dark:text-emerald-400">Caso 1: segundo factor positivo (conserva)</h4>
                            <p className="mb-3 text-sm">Base: 3 fichas negativas. Repetición: 4 veces.</p>
                            <div className="font-mono text-center bg-white dark:bg-zinc-900 rounded-xl p-3 border border-slate-200 dark:border-zinc-700">
                                <Math math={String.raw`(-3) \times (+4) = -12`} />
                            </div>
                            <div className="font-mono text-center bg-white dark:bg-zinc-900 rounded-xl p-3 border border-slate-200 dark:border-zinc-700 mt-3">
                                <Math math={String.raw`(+5) \times (+2) = +10`} />
                            </div>
                            <p className="mt-3 text-sm">Conservar significa: sigue siendo el mismo tipo de fichas (negativas), pero más cantidad.</p>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-rose-500">
                            <h4 className="font-bold text-lg mb-3 text-rose-800 dark:text-rose-400">Caso 2: segundo factor negativo (cambia)</h4>
                            <p className="mb-3 text-sm">Base: 3 fichas negativas. Repetición inversa: 4 veces.</p>
                            <div className="font-mono text-center bg-white dark:bg-zinc-900 rounded-xl p-3 border border-slate-200 dark:border-zinc-700">
                                <Math math={String.raw`(-3) \times (-4) = +12`} />
                            </div>
                            <div className="font-mono text-center bg-white dark:bg-zinc-900 rounded-xl p-3 border border-slate-200 dark:border-zinc-700 mt-3">
                                <Math math={String.raw`(+5) \times (-2) = -10`} />
                            </div>
                            <p className="mt-3 text-sm">Cambiar significa: el tipo de fichas del factor 1 se invierte (de negativas a positivas).</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-slate-200 dark:border-zinc-700 space-y-4">
                        <h4 className="font-bold text-lg text-slate-800 dark:text-zinc-100">Multiplicación con tres y cuatro factores (paso a paso lógico)</h4>
                        <p className="text-sm">
                            Después del primer producto, cada factor siguiente actúa sobre el signo acumulado: si es positivo, lo conserva; si es negativo, lo cambia.
                        </p>

                        <div className="space-y-3 font-mono text-sm md:text-base">
                            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
                                <p className="mb-2 text-slate-500 dark:text-zinc-400">Ejemplo con 3 factores:</p>
                                <Math math={String.raw`(-2)\times(+3)\times(-4)`} />
                                <Math math={String.raw`=(-6)\times(-4)`} />
                                <Math math={String.raw`=+24`} />
                                <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400">Primero +3 conserva el signo de -2, luego -4 cambia el signo acumulado.</p>
                            </div>

                            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
                                <p className="mb-2 text-slate-500 dark:text-zinc-400">Ejemplo con 4 factores:</p>
                                <Math math={String.raw`(+2)\times(-3)\times(-5)\times(+2)`} />
                                <Math math={String.raw`=(-6)\times(-5)\times(+2)`} />
                                <Math math={String.raw`=(+30)\times(+2)`} />
                                <Math math={String.raw`=+60`} />
                                <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400">-3 cambia, -5 vuelve a cambiar, y +2 conserva el signo final.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                    <RefreshCcw className="text-indigo-500" />
                    Propiedades de la multiplicación en <Math math={String.raw`\mathbb{Z}`} />
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            title: "Clausurativa",
                            desc: "Multiplicar enteros siempre produce otro entero.",
                            math: String.raw`a,b \in \mathbb{Z} \Rightarrow a\cdot b \in \mathbb{Z}`,
                        },
                        {
                            title: "Conmutativa",
                            desc: "Cambiar el orden de los factores no cambia el producto.",
                            math: String.raw`a\cdot b=b\cdot a`,
                        },
                        {
                            title: "Asociativa",
                            desc: "Podemos reagrupar factores sin alterar el resultado.",
                            math: String.raw`(a\cdot b)\cdot c = a\cdot (b\cdot c)`,
                        },
                        {
                            title: "Distributiva",
                            desc: "La multiplicación se reparte sobre una suma o resta.",
                            math: String.raw`a\cdot(b\pm c)=a\cdot b \pm a\cdot c`,
                        },
                        {
                            title: "Elemento neutro",
                            desc: "Multiplicar por 1 conserva cualquier entero.",
                            math: String.raw`a\cdot1=a`,
                        },
                        {
                            title: "Producto por cero",
                            desc: "Toda cantidad de grupos vacíos termina en cero.",
                            math: String.raw`a\cdot0=0`,
                        },
                    ].map((prop, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                            <h5 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-2">{prop.title}</h5>
                            <p className="text-base text-slate-600 dark:text-zinc-400 mb-4">{prop.desc}</p>
                            <div className="text-lg font-mono bg-slate-50 dark:bg-zinc-800 p-4 rounded-xl text-center border border-slate-100 dark:border-zinc-700">
                                <Math math={prop.math} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                    <SplitSquareHorizontal className="text-sky-600" />
                    División de enteros como distribución de fichas
                </h3>

                <p className="text-slate-600 dark:text-zinc-400">
                    En división miramos cómo se distribuyen fichas. El <strong>dividendo</strong> trae el tipo base de fichas y
                    el <strong>divisor</strong> tiene el poder de conservar o cambiar ese signo: divisor positivo conserva,
                    divisor negativo cambia.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-emerald-500">
                        <h4 className="font-bold text-lg mb-3 text-emerald-800 dark:text-emerald-400">Distribución que conserva</h4>
                        <p className="text-sm mb-3">12 fichas negativas repartidas en 3 grupos positivos.</p>
                        <div className="font-mono text-center bg-white dark:bg-zinc-900 rounded-xl p-3 border border-slate-200 dark:border-zinc-700">
                            <Math math={String.raw`(-12) \div (+3) = -4`} />
                        </div>
                        <div className="font-mono text-center bg-white dark:bg-zinc-900 rounded-xl p-3 border border-slate-200 dark:border-zinc-700 mt-3">
                            <Math math={String.raw`(+20) \div (+5) = +4`} />
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-rose-500">
                        <h4 className="font-bold text-lg mb-3 text-rose-800 dark:text-rose-400">Distribución que cambia</h4>
                        <p className="text-sm mb-3">12 fichas negativas con divisor negativo (cambio de signo).</p>
                        <div className="font-mono text-center bg-white dark:bg-zinc-900 rounded-xl p-3 border border-slate-200 dark:border-zinc-700">
                            <Math math={String.raw`(-12) \div (-3) = +4`} />
                        </div>
                        <div className="font-mono text-center bg-white dark:bg-zinc-900 rounded-xl p-3 border border-slate-200 dark:border-zinc-700 mt-3">
                            <Math math={String.raw`(+20) \div (-5) = -4`} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                    <Sparkles className="text-amber-500" />
                    De lo trivial a lo medianamente avanzado
                </h3>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <div className="space-y-4 font-mono text-sm md:text-base">
                        <div className="flex justify-between border-b border-slate-200 dark:border-zinc-700 pb-2">
                            <span className="text-slate-500">Trivial:</span>
                            <Math math={String.raw`(+2)\times(+3)=+6`} />
                        </div>
                        <div className="flex justify-between border-b border-slate-200 dark:border-zinc-700 pb-2">
                            <span className="text-slate-500">Básico con cambio:</span>
                            <Math math={String.raw`(+2)\times(-3)=-6`} />
                        </div>
                        <div className="flex justify-between border-b border-slate-200 dark:border-zinc-700 pb-2">
                            <span className="text-slate-500">Intermedio:</span>
                            <Math math={String.raw`(-18)\div(+6)=-3`} />
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Intermedio con dos cambios:</span>
                            <Math math={String.raw`(-18)\div(-6)=+3`} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                    <Braces className="text-violet-500" />
                    Polinomios aritméticos con las cuatro operaciones
                </h3>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm max-w-3xl">
                    <p className="text-slate-600 dark:text-zinc-400 mb-6">
                        Un polinomio aritmético combina suma, resta, multiplicación y división en la misma cuenta. Para no equivocarnos,
                        seguimos una ruta fija: <strong>1) paréntesis</strong>, <strong>2) multiplicaciones y divisiones</strong>,
                        <strong> 3) sumas y restas</strong>, siempre de izquierda a derecha dentro del mismo nivel.
                    </p>

                    <div className="space-y-6 font-mono text-sm md:text-base">
                        <div className="space-y-3">
                            <p className="text-sm font-sans text-slate-600 dark:text-zinc-400">Ejemplo 1</p>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
                                <Math math={String.raw`-8 + 3\cdot(-4) - \frac{-18}{3}`} />
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                                <Math math="= -8 + (-12) - (-6)" />
                            </div>
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 font-bold text-sky-700 dark:text-sky-300">
                                <Math math="= -20 + 6 = -14" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-sans text-slate-600 dark:text-zinc-400">Ejemplo 2</p>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
                                <Math math={String.raw`[(+6)-(-2)]\cdot(-3) + \frac{(+16)}{(-4)}`} />
                            </div>
                            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                                <Math math={String.raw`= (8)\cdot(-3) + (-4)`} />
                            </div>
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 font-bold text-sky-700 dark:text-sky-300">
                                <Math math={String.raw`= -24 + (-4) = -28`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
