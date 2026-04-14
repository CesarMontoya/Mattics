"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { MapPin } from "lucide-react"

import { ReferenceConcept } from "../valores-relativos/ReferenceConcept"
import { OtherExamplesConcept } from "../valores-relativos/OtherExamplesConcept"
import { NumberLineConcept } from "../valores-relativos/NumberLineConcept"
import { ContextualExercises } from "../valores-relativos/ContextualExercises"

export default function ValoresRelativosPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Números Enteros", href: "#" },
        { label: "Valores Relativos" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Valores Relativos"
                description="Entiende por qué en la vida real usamos números positivos y negativos dependiendo de nuestro punto de referencia."
                icon={<MapPin className="h-10 w-10 text-sky-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* BLOQUE 1: Concepto de Referencia (Montaña y Mar) */}
                    <section className="space-y-6">
                        <ReferenceConcept />
                    </section>

                    {/* BLOQUE 2: Térmometros, Edificios, Brújula */}
                    <section className="space-y-6">
                        <OtherExamplesConcept />
                    </section>

                    {/* BLOQUE 3: La Recta Numérica */}
                    <section className="space-y-6">
                        <NumberLineConcept />
                    </section>

                    {/* BLOQUE 4: Ejercicios Contextualizados */}
                    <section className="space-y-6">
                        <ContextualExercises />
                    </section>

                    {/* Botones de navegación al final del flujo */}
                    <div className="pt-10 flex justify-between items-center w-full">
                        <a
                            href="/matematicas-7/positivos-y-negativos"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-sky-600 hover:text-white rounded-full font-semibold transition-all duration-300"
                        >
                            <span>←</span>
                            Anterior: Fichas (+ y -)
                        </a>
                        <a
                            href="/matematicas-7"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-sky-600 dark:bg-sky-500 hover:bg-sky-700 dark:hover:bg-sky-400 text-white rounded-full font-semibold transition-all duration-300"
                        >
                            Volver al Menú
                            <span>→</span>
                        </a>
                    </div>
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
