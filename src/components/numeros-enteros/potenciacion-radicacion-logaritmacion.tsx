"use client"

import React, { useState } from "react"
import { Zap, SquareRadical, Logs, Brain, Info, ArrowRightLeft, Target, Sigma, CheckCircle2, HelpCircle, Divide, Diamond, Minus, Plus } from "lucide-react"
import { Math } from "@/components/ui/math"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/sidebar/tooltip"

export default function PotenciacionRadicacionLogaritmacionEnteros() {
    return (
        <TooltipProvider>
            <div className="space-y-12 pb-20">

                {/* ===================================================== */}
                {/* SECCIÓN 1: POTENCIACIÓN CON ENTEROS */}
                {/* ===================================================== */}
                <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-6 flex items-center gap-3">
                        <Zap className="text-orange-600" />
                        Potenciación en <Math math={String.raw`\mathbb{Z}`} /> — el signo de la base
                    </h2>

                    <div className="space-y-6 text-slate-600 dark:text-zinc-400">
                        <p>
                            En <Math math={String.raw`\mathbb{N}`} /> la potenciación solo daba resultados positivos porque las bases
                            siempre eran positivas. Ahora la <strong>base puede ser negativa</strong>, y eso cambia el signo del resultado.
                        </p>

                        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4">
                            <Info className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-amber-800 dark:text-amber-200 font-medium">
                                <strong>Regla clave:</strong> el signo del resultado depende de la <strong>paridad del exponente</strong>.
                                Si la base es negativa: exponente par → resultado positivo; exponente impar → resultado negativo.
                            </p>
                        </div>

                        {/* Regla de signos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-emerald-500">
                                <h4 className="font-bold text-lg mb-3 text-emerald-800 dark:text-emerald-400">Exponente PAR → positivo</h4>
                                <p className="text-sm mb-4">
                                    Un número negativo multiplicado por sí mismo una cantidad <strong>par</strong> de veces
                                    da un resultado positivo. Los pares de negativos se cancelan.
                                </p>
                                <div className="space-y-3 font-mono">
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`(-2)^4 = (-2)\times(-2)\times(-2)\times(-2) = +16`} />
                                        <p className="text-[10px] mt-1 text-slate-400">4 factores → 2 pares de negativos → positivo</p>
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`(-5)^2 = (-5)\times(-5) = +25`} />
                                        <p className="text-[10px] mt-1 text-slate-400">2 factores → 1 par de negativos → positivo</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-rose-500">
                                <h4 className="font-bold text-lg mb-3 text-rose-800 dark:text-rose-400">Exponente IMPAR → negativo</h4>
                                <p className="text-sm mb-4">
                                    Un número negativo multiplicado por sí mismo una cantidad <strong>impar</strong> de veces
                                    da un resultado negativo. Siempre sobra un negativo sin pareja.
                                </p>
                                <div className="space-y-3 font-mono">
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`(-2)^3 = (-2)\times(-2)\times(-2) = -8`} />
                                        <p className="text-[10px] mt-1 text-slate-400">3 factores → 1 par + 1 suelto → negativo</p>
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`(-3)^5 = -243`} />
                                        <p className="text-[10px] mt-1 text-slate-400">5 factores → 2 pares + 1 suelto → negativo</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Caso especial: base positiva */}
                        <div className="p-5 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-200 dark:border-zinc-700">
                            <h4 className="font-bold text-lg mb-3 text-slate-800 dark:text-zinc-100">¿Y si la base es positiva?</h4>
                            <p className="mb-3">
                                Si la base es positiva, el resultado <strong>siempre es positivo</strong> sin importar el exponente.
                                Esto es igual que en naturales.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                    <Math math={String.raw`(+3)^4 = +81`} />
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                    <Math math={String.raw`(+2)^5 = +32`} />
                                </div>
                            </div>
                        </div>

                        {/* Atención: paréntesis */}
                        <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <div className="flex items-start gap-3">
                                <Brain className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-lg mb-3 text-indigo-800 dark:text-indigo-400">¡Cuidado con los paréntesis!</h4>
                                    <div className="space-y-3 font-mono">
                                        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 flex items-center justify-between">
                                            <Math math={String.raw`(-2)^4 = +16`} />
                                            <span className="text-emerald-600 text-xs font-bold uppercase">Correcto</span>
                                        </div>
                                        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 flex items-center justify-between">
                                            <Math math={String.raw`-2^4 = -16`} />
                                            <span className="text-rose-600 text-xs font-bold uppercase">¡No es lo mismo!</span>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm text-indigo-600 dark:text-indigo-300">
                                        Sin paréntesis, el exponente solo afecta al número, no al signo. <Math math={"-2^4"} /> equivale a <Math math={"-(2^4) = -16"} />.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================================================== */}
                {/* SECCIÓN 2: PROPIEDADES DE LA POTENCIACIÓN EN Z */}
                {/* ===================================================== */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                        <ArrowRightLeft className="text-indigo-500" />
                        Propiedades de la potenciación en <Math math={String.raw`\mathbb{Z}`} />
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400 -mt-4">
                        Las propiedades de la potenciación <strong>se mantienen igual</strong> que en naturales. La novedad es que
                        ahora debemos estar atentos al <strong>signo de la base</strong> al aplicar cada una.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Producto de igual base",
                                desc: "Se conserva la base y se suman los exponentes. El signo del resultado sigue la regla de paridad.",
                                math: String.raw`(-3)^2 \cdot (-3)^3 = (-3)^5 = -243`,
                                detail: "2 + 3 = 5 (impar) → negativo",
                            },
                            {
                                title: "Cociente de igual base",
                                desc: "Se conserva la base y se restan los exponentes. Misma regla de signos.",
                                math: String.raw`(-2)^5 \div (-2)^2 = (-2)^3 = -8`,
                                detail: "5 - 2 = 3 (impar) → negativo",
                            },
                            {
                                title: "Potencia de una potencia",
                                desc: "Se multiplican los exponentes. La base conserva su signo a través de la operación.",
                                math: String.raw`[(-3)^2]^3 = (-3)^6 = +729`,
                                detail: "2 × 3 = 6 (par) → positivo",
                            },
                            {
                                title: "Potencia de un producto",
                                desc: "El exponente se distribuye. Cada factor recibe su propio exponente y signo.",
                                math: String.raw`[(-2)\times(+3)]^2 = (-2)^2\cdot(+3)^2`,
                                detail: " = (+4) × (+9) = +36",
                            },
                            {
                                title: "Potencia de un cociente",
                                desc: "El exponente se distribuye entre numerador y denominador.",
                                math: String.raw`\left[\frac{(-6)}{(+2)}\right]^3 = \frac{(-6)^3}{(+2)^3}`,
                                detail: " = (-216) ÷ 8 = -27",
                            },
                            {
                                title: "Exponente cero y uno",
                                desc: "Todo número (excepto 0) elevado a 0 da 1. Todo número elevado a 1 da sí mismo.",
                                math: String.raw`(-7)^0 = 1 \quad\text{y}\quad (-7)^1 = -7`,
                                detail: "El signo se conserva con exponente 1.",
                            },
                        ].map((prop, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between">
                                <div>
                                    <h5 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">{prop.title}</h5>
                                    <p className="text-base text-slate-600 dark:text-zinc-400 mb-4">{prop.desc}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-base font-mono bg-slate-50 dark:bg-zinc-800 p-4 rounded-xl text-center border border-slate-100 dark:border-zinc-700">
                                        <Math math={prop.math} />
                                    </div>
                                    <p className="text-[11px] text-slate-400 dark:text-zinc-500 text-center italic">{prop.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===================================================== */}
                {/* SECCIÓN 3: RADICACIÓN CON ENTEROS */}
                {/* ===================================================== */}
                <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-6 flex items-center gap-3">
                        <SquareRadical className="text-purple-600" />
                        Radicación en <Math math={String.raw`\mathbb{Z}`} /> — ¿raíz de un negativo?
                    </h2>

                    <div className="space-y-6 text-slate-600 dark:text-zinc-400">
                        <p>
                            En <Math math={String.raw`\mathbb{N}`} /> siempre podíamos calcular cualquier raíz porque los números
                            eran positivos. En <Math math={String.raw`\mathbb{Z}`} /> aparece la pregunta clave:{" "}
                            <strong>¿existe la raíz de un número negativo?</strong>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-emerald-500">
                                <h4 className="font-bold text-lg mb-3 text-emerald-800 dark:text-emerald-400">Índice IMPAR → sí existe</h4>
                                <p className="text-sm mb-4">
                                    Cuando el índice es impar, la raíz de un número negativo <strong>existe</strong> y es negativa.
                                </p>
                                <div className="space-y-3 font-mono">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center cursor-help">
                                                <Math math={String.raw`\sqrt[3]{-8} = -2`} />
                                                <div className="flex items-center justify-center gap-1 mt-1 text-emerald-600">
                                                    <Info className="w-3 h-3" />
                                                    <span className="text-[10px]">Ver explicación</span>
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="max-w-[200px] text-center">
                                            Porque (−2)³ = (−2)×(−2)×(−2) = −8. Exponente impar mantiene el signo.
                                        </TooltipContent>
                                    </Tooltip>
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`\sqrt[5]{-32} = -2`} />
                                        <p className="text-[10px] mt-1 text-slate-400">(−2)⁵ = −32</p>
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`\sqrt[3]{-125} = -5`} />
                                        <p className="text-[10px] mt-1 text-slate-400">(−5)³ = −125</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-rose-500">
                                <h4 className="font-bold text-lg mb-3 text-rose-800 dark:text-rose-400">Índice PAR → NO existe en Z</h4>
                                <p className="text-sm mb-4">
                                    Cuando el índice es par, la raíz de un número negativo <strong>no tiene solución</strong>{" "}
                                    en el conjunto de los enteros.
                                </p>
                                <div className="space-y-3 font-mono">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-rose-200 dark:border-zinc-700 text-center cursor-help">
                                                <Math math={String.raw`\sqrt{-4} \ \nexists \ \text{en} \ \mathbb{Z}`} />
                                                <div className="flex items-center justify-center gap-1 mt-1 text-rose-600">
                                                    <Info className="w-3 h-3" />
                                                    <span className="text-[10px]">¿Por qué?</span>
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="max-w-[220px] text-center">
                                            Ningún entero elevado al cuadrado da −4: (+2)² = +4 y (−2)² = +4.
                                        </TooltipContent>
                                    </Tooltip>
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-rose-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`\sqrt[4]{-16} \ \nexists \ \text{en} \ \mathbb{Z}`} />
                                        <p className="text-[10px] mt-1 text-rose-500">Ningún entero a la cuarta da −16</p>
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-rose-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`\sqrt{-9} \ \nexists \ \text{en} \ \mathbb{Z}`} />
                                        <p className="text-[10px] mt-1 text-rose-500">(+3)² = +9 y (−3)² = +9</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Síntesis visual */}
                        <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-200 dark:border-zinc-700">
                            <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                                <Brain className="w-5 h-5" /> Síntesis de la radicación en Z
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-emerald-100 dark:border-zinc-700">
                                    <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-2 text-sm">Radicando positivo</p>
                                    <p className="text-sm text-slate-600 dark:text-zinc-400">
                                        Siempre existe la raíz, sea índice par o impar. El resultado es positivo con índice par,
                                        y positivo con índice impar.
                                    </p>
                                    <div className="mt-2 font-mono text-sm text-center">
                                        <Math math={String.raw`\sqrt[3]{+27} = +3, \ \sqrt{+16} = +4`} />
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-amber-100 dark:border-zinc-700">
                                    <p className="font-bold text-amber-700 dark:text-amber-400 mb-2 text-sm">Radicando negativo</p>
                                    <p className="text-sm text-slate-600 dark:text-zinc-400">
                                        Solo existe si el índice es impar. Con índice par, no hay solución en Z.
                                    </p>
                                    <div className="mt-2 font-mono text-sm text-center">
                                        <Math math={String.raw`\sqrt[3]{-27} = -3, \ \sqrt{-16} \ \nexists`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================================================== */}
                {/* SECCIÓN 4: PROPIEDADES DE LA RADICACIÓN EN Z */}
                {/* ===================================================== */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                        <ArrowRightLeft className="text-indigo-500" />
                        Propiedades de la radicación en <Math math={String.raw`\mathbb{Z}`} />
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400 -mt-4">
                        Las propiedades de la radicación <strong>funcionan igual</strong>, pero al aplicarlas con enteros
                        debemos verificar que cada raíz individual exista en Z.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Raíz de un producto",
                                desc: "La raíz de un producto es el producto de las raíces. Válido siempre que cada raíz exista en Z.",
                                math: String.raw`\sqrt[3]{(-8)\times(+27)} = \sqrt[3]{-8} \times \sqrt[3]{+27}`,
                                detail: " = (-2) × (+3) = -6",
                            },
                            {
                                title: "Raíz de un cociente",
                                desc: "La raíz de un cociente es el cociente de las raíces. Cada raíz debe existir en Z.",
                                math: String.raw`\sqrt[3]{\frac{-125}{+8}} = \frac{\sqrt[3]{-125}}{\sqrt[3]{+8}}`,
                                detail: " = (-5) ÷ 2 ... ¡no es entero! La propiedad se cumple, pero el resultado puede no ser entero.",
                            },
                            {
                                title: "Raíz de una raíz",
                                desc: "Se multiplican los índices. El signo sigue la regla de paridad del índice compuesto.",
                                math: String.raw`\sqrt[3]{\sqrt[2]{+64}} = \sqrt[6]{+64} = +2`,
                                detail: "3 × 2 = 6 (índice par). El radicando debe ser positivo.",
                            },
                            {
                                title: "Raíz de una potencia",
                                desc: "El exponente se divide entre el índice. Cuando el cociente es entero, se simplifica.",
                                math: String.raw`\sqrt[3]{(-2)^9} = (-2)^{9\div3} = (-2)^3 = -8`,
                                detail: "9 ÷ 3 = 3 (impar) → signo negativo se conserva.",
                            },
                        ].map((prop, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between">
                                <div>
                                    <h5 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">{prop.title}</h5>
                                    <p className="text-base text-slate-600 dark:text-zinc-400 mb-4">{prop.desc}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-base font-mono bg-slate-50 dark:bg-zinc-800 p-4 rounded-xl text-center border border-slate-100 dark:border-zinc-700">
                                        <Math math={prop.math} />
                                    </div>
                                    <p className="text-[11px] text-slate-400 dark:text-zinc-500 text-center italic">{prop.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===================================================== */}
                {/* SECCIÓN 5: LOGARITMACIÓN CON ENTEROS */}
                {/* ===================================================== */}
                <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-6 flex items-center gap-3">
                        <Logs className="text-blue-600" />
                        Logaritmación en <Math math={String.raw`\mathbb{Z}`} /> — la pregunta del exponente
                    </h2>

                    <div className="space-y-6 text-slate-600 dark:text-zinc-400">
                        <p>
                            El logaritmo pregunta: <strong>"¿a qué exponente debo elevar la base para obtener este número?"</strong>
                            {" "}En <Math math={String.raw`\mathbb{Z}`} /> aparecen restricciones importantes que no existían en naturales.
                        </p>

                        {/* Cuadro de restricciones */}
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/50">
                            <h4 className="font-bold text-lg mb-3 text-amber-800 dark:text-amber-400 flex items-center gap-2">
                                <Info className="w-5 h-5" /> Condiciones de existencia del logaritmo en Z
                            </h4>
                            <ul className="space-y-2 text-amber-800 dark:text-amber-200">
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-600 font-bold shrink-0">✔</span>
                                    <span>La base debe ser <strong>positiva</strong> y distinta de 1</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-600 font-bold shrink-0">✔</span>
                                    <span>El argumento (logaritmando) debe ser <strong>positivo</strong></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-rose-600 font-bold shrink-0">✘</span>
                                    <span>No existe <Math math={String.raw`\log_a(b)`} /> en Z si la base o el argumento son negativos</span>
                                </li>
                            </ul>
                        </div>

                        {/* Casos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-emerald-500">
                                <h4 className="font-bold text-lg mb-3 text-emerald-800 dark:text-emerald-400">Sí existe en Z</h4>
                                <p className="text-sm mb-4">
                                    Cuando la base y el argumento son positivos, y el argumento es una potencia entera de la base.
                                </p>
                                <div className="space-y-3 font-mono">
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`\log_2(8) = 3 \ \text{porque} \ 2^3 = 8`} />
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`\log_3(81) = 4 \ \text{porque} \ 3^4 = 81`} />
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`\log_5(125) = 3 \ \text{porque} \ 5^3 = 125`} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-l-4 border-rose-500">
                                <h4 className="font-bold text-lg mb-3 text-rose-800 dark:text-rose-400">NO existe en Z</h4>
                                <p className="text-sm mb-4">
                                    Cuando el argumento es negativo o la base es negativa, no hay exponente entero que funcione.
                                </p>
                                <div className="space-y-3 font-mono">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-rose-200 dark:border-zinc-700 text-center cursor-help">
                                                <Math math={String.raw`\log_2(-8) \ \nexists \ \text{en} \ \mathbb{Z}`} />
                                                <div className="flex items-center justify-center gap-1 mt-1 text-rose-600">
                                                    <Info className="w-3 h-3" />
                                                    <span className="text-[10px]">¿Por qué?</span>
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="max-w-[220px] text-center">
                                            2 elevado a cualquier entero siempre da positivo. Nunca alcanza −8.
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-rose-200 dark:border-zinc-700 text-center cursor-help">
                                                <Math math={String.raw`\log_{-2}(8) \ \nexists \ \text{en} \ \mathbb{Z}`} />
                                                <div className="flex items-center justify-center gap-1 mt-1 text-rose-600">
                                                    <Info className="w-3 h-3" />
                                                    <span className="text-[10px]">¿Por qué?</span>
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="max-w-[220px] text-center">
                                            (−2)³ = −8, no 8. Ningún entero como exponente da 8 con base −2. La base debe ser positiva.
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>

                        {/* Explicación de por qué la base debe ser positiva */}
                        <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <div className="flex items-start gap-3">
                                <Brain className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-lg mb-3 text-indigo-800 dark:text-indigo-400">
                                        ¿Por qué la base del logaritmo debe ser positiva?
                                    </h4>
                                    <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                                        Porque si la base fuera negativa, el resultado sería "saltos" erráticos:
                                        unos términos darían positivos y otros negativos, haciendo imposible definir
                                        un logaritmo para cada número. Las propiedades de los logaritmos solo se
                                        comportan bien con bases positivas.
                                    </p>
                                    <div className="space-y-2 font-mono text-sm">
                                        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700">
                                            <Math math={String.raw`(-2)^1 = -2,\ (-2)^2 = +4,\ (-2)^3 = -8,\ (-2)^4 = +16,\ \dots`} />
                                            <p className="text-indigo-500 text-[11px] mt-1">El signo alterna: no hay un valor fijo al que apuntar.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================================================== */}
                {/* SECCIÓN 6: PROPIEDADES DE LA LOGARITMACIÓN EN Z */}
                {/* ===================================================== */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                        <ArrowRightLeft className="text-indigo-500" />
                        Propiedades de la logaritmación en <Math math={String.raw`\mathbb{Z}`} />
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400 -mt-4">
                        Las propiedades de los logaritmos <strong>se mantienen</strong>, pero solo cuando el logaritmo
                        está definido (base positiva ≠ 1, argumentos positivos).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Logaritmo de un producto",
                                desc: "El logaritmo de una multiplicación es la suma de los logaritmos de cada factor.",
                                math: String.raw`\log_2(4 \times 8) = \log_2(4) + \log_2(8)`,
                                detail: " = 2 + 3 = 5. Se cumple porque 2⁵ = 32 = 4 × 8.",
                            },
                            {
                                title: "Logaritmo de un cociente",
                                desc: "El logaritmo de una división es la resta de los logaritmos.",
                                math: String.raw`\log_3(81 \div 9) = \log_3(81) - \log_3(9)`,
                                detail: " = 4 - 2 = 2. Se cumple porque 3² = 9 = 81 ÷ 9.",
                            },
                            {
                                title: "Logaritmo de una potencia",
                                desc: "El exponente baja a multiplicar al logaritmo. Válido aunque el exponente resulte en un número negativo.",
                                math: String.raw`\log_2(4^3) = 3 \times \log_2(4) = 3 \times 2 = 6`,
                                detail: "Se cumple porque 4³ = 64 y 2⁶ = 64.",
                            },
                            {
                                title: "Logaritmo de la base y la unidad",
                                desc: "Casos especiales que se cumplen para cualquier base positiva.",
                                math: String.raw`\log_a(a) = 1, \quad \log_a(1) = 0`,
                                detail: "a¹ = a y a⁰ = 1, para cualquier base a > 0, a ≠ 1.",
                            },
                        ].map((prop, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between">
                                <div>
                                    <h5 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-3">{prop.title}</h5>
                                    <p className="text-base text-slate-600 dark:text-zinc-400 mb-4">{prop.desc}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-base font-mono bg-slate-50 dark:bg-zinc-800 p-4 rounded-xl text-center border border-slate-100 dark:border-zinc-700">
                                        <Math math={prop.math} />
                                    </div>
                                    <p className="text-[11px] text-slate-400 dark:text-zinc-500 text-center italic">{prop.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===================================================== */}
                {/* SECCIÓN 7: LA TRÍADA ARITMÉTICA EN Z */}
                {/* ===================================================== */}
                <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-start gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                            <Diamond className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
                                La Tríada Aritmética en <Math math={String.raw`\mathbb{Z}`} />
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-6 text-slate-600 dark:text-zinc-400">
                        <p>
                            Potenciación, radicación y logaritmación forman la <strong>tríada aritmética</strong>. Cada una
                            despeja un elemento distinto de la misma relación:
                        </p>

                        <div className="p-8 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-200 dark:border-zinc-700">
                            <div className="text-center text-2xl font-mono font-bold text-sky-700 dark:text-sky-300 mb-8">
                                <Math math={String.raw`\text{base}^{\text{exponente}} = \text{potencia}`} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border-l-4 border-orange-500">
                                    <h5 className="font-bold text-orange-700 dark:text-orange-400 mb-2 flex items-center gap-2">
                                        <Zap className="w-4 h-4" /> Potenciación
                                    </h5>
                                    <p className="text-sm mb-3">Buscamos la <strong>potencia</strong> (resultado).</p>
                                    <div className="font-mono text-center bg-orange-50 dark:bg-zinc-800 p-3 rounded-xl">
                                        <Math math={String.raw`(-3)^4 = +81`} />
                                    </div>
                                    <p className="text-[11px] mt-2 text-slate-400 text-center">Base negativa, exponente par → positivo</p>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border-l-4 border-purple-500">
                                    <h5 className="font-bold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                                        <SquareRadical className="w-4 h-4" /> Radicación
                                    </h5>
                                    <p className="text-sm mb-3">Buscamos la <strong>base</strong> (raíz).</p>
                                    <div className="font-mono text-center bg-purple-50 dark:bg-zinc-800 p-3 rounded-xl">
                                        <Math math={String.raw`\sqrt[4]{+81} = \pm 3?`} />
                                    </div>
                                    <p className="text-[11px] mt-2 text-slate-400 text-center">
                                        En Z: si el índice es par, la raíz de un positivo tiene dos resultados: +3 y −3.
                                        Por convención se toma el positivo.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border-l-4 border-blue-500">
                                    <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                                        <Logs className="w-4 h-4" /> Logaritmación
                                    </h5>
                                    <p className="text-sm mb-3">Buscamos el <strong>exponente</strong>.</p>
                                    <div className="font-mono text-center bg-blue-50 dark:bg-zinc-800 p-3 rounded-xl">
                                        <Math math={String.raw`\log_3(81) = 4`} />
                                    </div>
                                    <p className="text-[11px] mt-2 text-slate-400 text-center">Base y argumento deben ser positivos</p>
                                </div>
                            </div>
                        </div>

                        {/* Observación clave sobre la raíz par de un positivo */}
                        <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <div className="flex items-start gap-3">
                                <Brain className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-lg mb-3 text-indigo-800 dark:text-indigo-400">
                                        Una novedad en Z: raíz par de un positivo
                                    </h4>
                                    <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                                        En <Math math={String.raw`\mathbb{N}`} />, <Math math={String.raw`\sqrt{9}`} /> era simplemente 3.
                                        En <Math math={String.raw`\mathbb{Z}`} />, tanto (+3)² = 9 como (−3)² = 9.
                                        <strong> ¿La raíz es +3 o −3?</strong>
                                    </p>
                                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 mb-3">
                                        <p className="text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">Convención:</p>
                                        <p className="text-sm text-slate-600 dark:text-zinc-400">
                                            En este nivel, cuando el radicando es positivo y el índice es par, tomamos la{" "}
                                            <strong>raíz positiva</strong> (la raíz aritmética). La raíz negativa también
                                            existe, pero trabajaremos con la positiva por claridad y consistencia.
                                        </p>
                                    </div>
                                    <div className="font-mono text-sm bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-center">
                                        <Math math={String.raw`\sqrt{9} = 3 \quad (\text{por convención, la raíz positiva})`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================================================== */}
                {/* SECCIÓN 8: ECUACIONES CON TRÍADA */}
                {/* ===================================================== */}
                <section className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                        <Target className="text-rose-500" />
                        Ecuaciones con potencias, raíces y logaritmos en <Math math={String.raw`\mathbb{Z}`} />
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400">
                        Determina el valor que satisface la igualdad en cada caso. Recuerda las restricciones de cada operación en enteros.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PureMathExercise
                            equation={String.raw`(-3)^\Box = -27`}
                            answer={3}
                            solution={"Buscamos el exponente: (−3)³ = −27. Exponente impar conserva el signo negativo."}
                        />
                        <PureMathExercise
                            equation={String.raw`\sqrt[3]{\Box} = -5`}
                            answer={-125}
                            solution={"La raíz cúbica de un número que da −5: (−5)³ = −125. Índice impar → radicando negativo es válido."}
                        />
                        <PureMathExercise
                            equation={String.raw`\log_2(\Box) = 5`}
                            answer={32}
                            solution={"2⁵ = 32. Base positiva, argumento positivo, exponente entero → logaritmo válido."}
                        />
                        <PureMathExercise
                            equation={String.raw`(-2)^\Box = +16`}
                            answer={4}
                            solution={"Buscamos el exponente: (−2)⁴ = +16. Exponente par → resultado positivo. También (−2)⁴ = 16."}
                        />
                    </div>
                </section>

                {/* ===================================================== */}
                {/* SECCIÓN 9: EVALUACIÓN */}
                {/* ===================================================== */}
                <section className="space-y-8">
                    <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-zinc-100">Evaluación de Competencias</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Situación 1 */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                                    <HelpCircle className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">El desafío del signo</h4>
                                <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                                    Un estudiante afirma que <Math math={String.raw`(-2)^6 = -64`} /> porque "negativo por negativo da positivo, pero hay 6 factores y 6 es par así que debería ser..." 
                                    {" "}¿Tiene razón? ¿Cuál es el resultado correcto?
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <input type="number" placeholder="Resultado" className="flex-1 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl p-4 text-center font-mono font-bold text-lg" />
                                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 rounded-xl font-bold transition-colors">Validar</button>
                            </div>
                        </div>

                        {/* Situación 2 */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                                    <SquareRadical className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">¿Existe o no existe?</h4>
                                <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                                    Un compañero dice que <Math math={String.raw`\sqrt[3]{-125}`} /> "no existe porque no se puede sacar raíz de un número negativo".
                                    {" "}¿Está en lo correcto? Explica con argumentos matemáticos.
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700">
                                <p className="text-sm text-slate-500 dark:text-zinc-400 italic text-center">
                                    ✱ Respuesta: sí existe, es −5, porque (−5)³ = −125. El error del compañero es pensar que ninguna raíz de negativo existe, pero las de índice impar sí.
                                </p>
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
                                { q: String.raw`(-2)^5`, r: "-32" },
                                { q: String.raw`(-3)^4`, r: "+81" },
                                { q: String.raw`\sqrt[3]{-64}`, r: "-4" },
                                { q: String.raw`\log_2(32)`, r: "5" },
                                { q: String.raw`(-1)^{100}`, r: "+1" },
                                { q: String.raw`(-1)^{99}`, r: "-1" },
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
                            {solution}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
