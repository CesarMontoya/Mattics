"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { DecimalGroupingVisual } from "@/components/adicion-naturales/DecimalGroupingVisual"
import { CentenaGroupingVisual } from "@/components/adicion-naturales/CentenaGroupingVisual"
import { MultiLevelGroupingVisual } from "@/components/adicion-naturales/MultiLevelGroupingVisual"
import { Plus, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react"

export default function AdicionNaturalesPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Adición de Números Naturales" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Adición de Números Naturales"
                description="Descubre cómo las sumas construyen todo lo que nos rodea."
                icon={<Plus className="h-10 w-10 text-emerald-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* BLOQUE 1: Conceptos del Sistema Decimal - Unidades */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Conceptos sobre el sistema decimal</h2>
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-emerald-500 shrink-0" />
                            <p className="text-emerald-800 dark:text-emerald-200">
                                <b>Dato curioso:</b> La palabra "adición" viene del latín <i>additio</i>, que significa "añadir".
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            El sistema decimal consiste en agrupar de a 10 para formar uno del nivel siguiente:
                        </p>

                        <DecimalGroupingVisual />
                    </section>

                    {/* BLOQUE 2: Conceptos del Sistema Decimal - Decenas */}
                    <section className="space-y-6">
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            También sucede cuando tenemos más de 10 decenas:
                        </p>
                        <CentenaGroupingVisual />
                    </section>

                    {/* BLOQUE 2: Desafío de Agrupación */}
                    <section className="space-y-6">
                        <MultiLevelGroupingVisual />
                    </section>

                    {/* BLOQUE 3: Conceptos de la Suma */}
                    <section className="space-y-6">
                        <h3 className="heading-3">La Regla de Oro</h3>
                        <div className="grid gap-4">
                            <div className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 shadow-sm transition-hover hover:shadow-md">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 font-bold">1</div>
                                <p className="font-medium">Los números naturales siempre nos llevan hacia la <b>derecha</b> en la recta numérica.</p>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 shadow-sm transition-hover hover:shadow-md">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 font-bold">2</div>
                                <p className="font-medium">El resultado de sumar dos naturales siempre será otro <b>número natural</b>.</p>
                            </div>
                        </div>
                    </section>

                    {/* BLOQUE 4: Ejemplo Final Visual */}
                    <section className="space-y-8">
                        <h2 className="heading-2 text-indigo-600 dark:text-indigo-400 border-indigo-100">Pongámoslo en práctica</h2>
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-10 rounded-3xl text-white shadow-xl flex flex-col items-center">
                            <p className="text-indigo-100 uppercase tracking-widest text-xs font-bold mb-6">Desafío Visual</p>
                            <div className="flex items-center gap-6 text-5xl md:text-7xl font-mono font-bold tracking-tighter">
                                <span>12</span>
                                <Plus className="h-10 w-10 md:h-16 md:w-16 text-indigo-300" />
                                <span>15</span>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                                <span className="text-emerald-400">27</span>
                            </div>
                            <div className="mt-8 flex items-center gap-2 text-indigo-100/80 bg-white/10 px-4 py-2 rounded-full text-sm">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>¡Correcto! Has avanzado 15 espacios desde el 12.</span>
                            </div>
                        </div>

                        {/* Botón de retorno al final del flujo */}
                        <div className="pt-10 flex justify-center">
                            <a
                                href="/matematicas-7"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white rounded-full font-semibold transition-all duration-300"
                            >
                                <span>←</span>
                                Volver a Matemáticas 7
                            </a>
                        </div>
                    </section>
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}



