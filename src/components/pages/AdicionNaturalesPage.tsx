"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { DecimalGroupingVisual } from "@/components/adicion-naturales/DecimalGroupingVisual"
import { CentenaGroupingVisual } from "@/components/adicion-naturales/CentenaGroupingVisual"
import { MultiLevelGroupingVisual } from "@/components/adicion-naturales/MultiLevelGroupingVisual"
import { VerticalAdditionVisual } from "@/components/adicion-naturales/VerticalAdditionVisual"
import { Plus, Lightbulb } from "lucide-react"

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


                    {/* BLOQUE 4: Algoritmo de la Suma Vertical */}
                    <section className="space-y-6">
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Otra forma de hacerlo es:
                        </p>
                        <VerticalAdditionVisual />
                    </section>

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
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}



