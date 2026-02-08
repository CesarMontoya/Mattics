"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { BasicDivisionVisual } from "@/components/division-naturales/BasicDivisionVisual"
import { DecadeUnitDivisionVisual } from "@/components/division-naturales/DecadeUnitDivisionVisual"
import { RegroupingDivisionVisual } from "@/components/division-naturales/RegroupingDivisionVisual"
import { RemainderDivisionVisual } from "@/components/division-naturales/RemainderDivisionVisual"
import { VerticalDivisionVisual } from "@/components/division-naturales/VerticalDivisionVisual"
import { Divide, Lightbulb, Info, History } from "lucide-react"

export default function DivisionNaturalesPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "División de Números Naturales" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="División de Números Naturales"
                description="Aprende a dividir de forma visual y domina el concepto de repartir en cantidades iguales."
                icon={<Divide className="h-10 w-10 text-orange-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* INTRODUCCIÓN */}
                    <section className="space-y-6">
                        <h2 className="heading-2">¿Qué es dividir?</h2>
                        <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/50 flex items-start gap-4 shadow-sm">
                            <Info className="h-8 w-8 text-orange-500 shrink-0" />
                            <p className="text-orange-800 dark:text-orange-200">
                                Dividir es <b>repartir en cantidades iguales</b>. Cuando dividimos, distribuimos una cantidad total en grupos donde cada uno recibe exactamente la misma cantidad.
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Empecemos con lo más básico: repartir unidades en grupos iguales.
                        </p>

                        <BasicDivisionVisual />
                    </section>

                    {/* DIVISIÓN CON DECENAS Y UNIDADES */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Subiendo de nivel: Decenas y Unidades</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Cuando dividimos números más grandes, repartimos tanto las decenas como las unidades en cantidades iguales.
                        </p>
                        <DecadeUnitDivisionVisual />
                    </section>

                    {/* EL DESAFÍO: DESAGRUPAR */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Desagrupar para Dividir</h2>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-amber-500 shrink-0" />
                            <p className="text-amber-800 dark:text-amber-200">
                                <b>Importante:</b> A veces no podemos repartir las decenas de forma igual. En esos casos, debemos <b>desagrupar</b> las decenas en unidades para poder distribuir todo correctamente.
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Observa cómo las decenas se transforman en unidades cuando es necesario:
                        </p>
                        <RegroupingDivisionVisual />
                    </section>

                    {/* EL RESIDUO */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Cuando algo sobra: El Residuo</h2>
                        <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-blue-500 shrink-0" />
                            <p className="text-blue-800 dark:text-blue-200">
                                No todas las divisiones resultan exactas. A veces, después de repartir en cantidades iguales, sobran unidades que no alcanzan para formar otro grupo completo. A esto le llamamos <b>residuo</b> o <b>resto</b>.
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Aprende a identificar y trabajar con el residuo:
                        </p>
                        <RemainderDivisionVisual />
                    </section>

                    {/* ALGORITMO VS GEOMETRÍA */}
                    <section className="space-y-6">
                        <h2 className="heading-2">El Algoritmo de la División</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Ahora comparemos el algoritmo tradicional que usamos en el cuaderno con la representación geométrica. Verás que son dos formas de expresar exactamente el mismo proceso:
                        </p>
                        <VerticalDivisionVisual />
                    </section>

                    {/* CURIOSIDAD HISTÓRICA */}
                    <section className="bg-slate-900 text-white p-8 rounded-3xl space-y-4 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <History className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            ¿Sabías que...?
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed relative z-10">
                            El símbolo de la división <b>÷</b> (llamado "óbelo") apareció por primera vez en 1659 en un libro del matemático suizo Johann Rahn. Sin embargo, los matemáticos de diferentes países usan símbolos distintos: en algunos lugares se usa / (barra diagonal), en otros se usa : (dos puntos), y en álgebra simplemente escribimos fracciones. ¡Todos representan la misma operación!
                        </p>
                    </section>

                    {/* Sección adicional: Relación con otras operaciones */}
                    <section className="space-y-6 mt-8">
                        <h2 className="heading-2">La división y sus hermanas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                                <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-200 mb-3">División y Multiplicación</h4>
                                <p className="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
                                    La división es la <b>operación inversa</b> de la multiplicación. Si 4 × 5 = 20, entonces 20 ÷ 5 = 4. Son dos caras de la misma moneda.
                                </p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-2xl border border-purple-200 dark:border-purple-800">
                                <h4 className="text-lg font-bold text-purple-800 dark:text-purple-200 mb-3">División y Sustracción</h4>
                                <p className="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
                                    La división puede verse como <b>sustracciones repetidas</b>. Dividir 15 ÷ 3 es como preguntarse: "¿Cuántas veces puedo restar 3 de 15?" La respuesta es 5 veces.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Botón de retorno */}
                    <div className="pt-10 flex justify-center">
                        <a
                            href="/matematicas-7"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-zinc-800 hover:bg-orange-600 hover:text-white rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-orange-200 dark:hover:shadow-none"
                        >
                            <span>←</span>
                            Volver a Matemáticas 7
                        </a>
                    </div>
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
