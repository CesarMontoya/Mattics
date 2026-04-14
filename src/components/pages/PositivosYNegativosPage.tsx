"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { PlusCircle } from "lucide-react"

import { PositiveTilesConcept } from "../numeros-enteros/positivos-y-negativos/PositiveTilesConcept"
import { CancellationConcept } from "../numeros-enteros/positivos-y-negativos/CancellationConcept"

import { ZeroConcept } from "../numeros-enteros/positivos-y-negativos/ZeroConcept"
import { NegativeTilesConcept } from "../numeros-enteros/positivos-y-negativos/NegativeTilesConcept"
import { NegativeResultConcept } from "../numeros-enteros/positivos-y-negativos/NegativeResultConcept"
import { SubtractionConcept } from "../numeros-enteros/positivos-y-negativos/SubtractionConcept"
import { CombinedExercises } from "../numeros-enteros/positivos-y-negativos/CombinedExercises"
export default function PositivosYNegativosPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Introducción a los Números Enteros" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Introducción a los Números Enteros"
                description="Entiende cómo la combinación de valores positivos y negativos puede cancelar cantidades y dar lugar a nuevos resultados."
                icon={<PlusCircle className="h-10 w-10 text-indigo-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* BLOQUE 1: Concepto de fichas positivas */}
                    <section className="space-y-6">
                        <PositiveTilesConcept />
                    </section>

                    {/* BLOQUE 2: Concepto de cancelación */}
                    <section className="space-y-6">
                        <CancellationConcept />
                    </section>

                    {/* BLOQUE 3: Concepto de Cero */}
                    <section className="space-y-6">
                        <ZeroConcept />
                    </section>

                    {/* BLOQUE 4: Fichas negativas solamente */}
                    <section className="space-y-6">
                        <NegativeTilesConcept />
                    </section>

                    {/* BLOQUE 5: Resultado negativo */}
                    <section className="space-y-6">
                        <NegativeResultConcept />
                    </section>

                    {/* BLOQUE 6: Concepto de Resta */}
                    <section className="space-y-6">
                        <SubtractionConcept />
                    </section>

                    {/* BLOQUE 7: Ejercicios combinados */}
                    <section className="space-y-6">
                        <CombinedExercises />
                    </section>

                    {/* Botones de navegación al final del flujo */}
                    <div className="pt-10 flex justify-between items-center w-full">
                        <a
                            href="/matematicas-7"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white rounded-full font-semibold transition-all duration-300"
                        >
                            <span>←</span>
                            Volver al Menú
                        </a>
                        <a
                            href="/matematicas-7/valores-relativos"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 text-white rounded-full font-semibold transition-all duration-300"
                        >
                            Siguiente: Valores Relativos
                            <span>→</span>
                        </a>
                    </div>
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
