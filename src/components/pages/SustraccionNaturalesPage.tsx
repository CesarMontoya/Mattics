"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { UnitSubtractionVisual } from "@/components/sustraccion-naturales/UnitSubtractionVisual"
import { DecadeSubtractionVisual } from "@/components/sustraccion-naturales/DecadeSubtractionVisual"
import { RegroupingSubtractionVisual } from "@/components/sustraccion-naturales/RegroupingSubtractionVisual"
import { VerticalSubtractionVisual } from "@/components/sustraccion-naturales/VerticalSubtractionVisual"
import { Minus, Lightbulb, History, Info } from "lucide-react"

export default function SustraccionNaturalesPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Sustracción de Números Naturales" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Sustracción de Números Naturales"
                description="Aprende a restar de forma visual y domina el algoritmo de la sustracción."
                icon={<Minus className="h-10 w-10 text-rose-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* INTRODUCCIÓN */}
                    <section className="space-y-6">
                        <h2 className="heading-2">¿Qué es restar?</h2>
                        <div className="bg-rose-50 dark:bg-rose-950/30 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/50 flex items-start gap-4 shadow-sm">
                            <Info className="h-8 w-8 text-rose-500 shrink-0" />
                            <p className="text-rose-800 dark:text-rose-200">
                                Restar es <b>disminuir</b> o quitar una cantidad de otra. En el sistema decimal, a veces necesitamos "pedir" (desagrupar) para poder completar la operación.
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Empecemos por lo más simple: quitar unidades sueltas.
                        </p>

                        <UnitSubtractionVisual />
                    </section>

                    {/* RESTANDO DECENAS */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Subiendo de nivel: Las Decenas</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Restar decenas es igual de fácil. Cada cuadrado verde que quitamos representa 10 unidades.
                        </p>
                        <DecadeSubtractionVisual />
                    </section>

                    {/* EL GRAN DESAFÍO: DESAGRUPAR */}
                    <section className="space-y-6">
                        <h2 className="heading-2">El arte de Desagrupar</h2>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-amber-500 shrink-0" />
                            <p className="text-amber-800 dark:text-amber-200">
                                <b>Importante:</b> Si no tienes suficientes decenas para restar, puedes transformar <b>1 centena en 10 decenas</b>. ¡Siguen siendo la misma cantidad total!
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Observa cómo una centena se "rompe" para ayudarnos a restar:
                        </p>
                        <RegroupingSubtractionVisual />
                    </section>


                    {/* ALGORITMO VERTICAL COMPARATIVO */}
                    <section className="space-y-6">
                        <h2 className="heading-2">El Algoritmo de la Resta</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Ahora comparemos cómo los bloques geométricos se relacionan con los números que escribimos en nuestro cuaderno.
                        </p>
                        <VerticalSubtractionVisual />
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
                            El símbolo de la resta <b>(-)</b> apareció por primera vez impreso en 1489. Antes de eso, los matemáticos usaban palabras completas o abreviaturas para indicar que estaban quitando una cantidad.
                        </p>
                    </section>

                    {/* Botón de retorno */}
                    <div className="pt-10 flex justify-center">
                        <a
                            href="/matematicas-7"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-zinc-800 hover:bg-rose-600 hover:text-white rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-rose-200 dark:hover:shadow-none"
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
