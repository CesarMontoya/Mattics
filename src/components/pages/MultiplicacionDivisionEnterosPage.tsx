"use client"

import * as React from "react"
import { XSquare } from "lucide-react"

import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import MultiplicacionDivisionEnteros from "@/components/numeros-enteros/multiplicacion-y-division"

export default function MultiplicacionDivisionEnterosPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Números Enteros", href: "#" },
        { label: "Multiplicación y División" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Multiplicación y División de Números Enteros"
                description="Aprende a razonar el signo en multiplicación y división usando fichas positivas y negativas, sin memorizar reglas sueltas."
                icon={<XSquare className="h-10 w-10 text-sky-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    <MultiplicacionDivisionEnteros />

                    <div className="pt-10 flex justify-between items-center w-full">
                        <a
                            href="/matematicas-7/adicion-sustraccion-enteros"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-sky-600 hover:text-white rounded-full font-semibold transition-all duration-300"
                        >
                            <span>←</span>
                            Anterior: Adición y Sustracción
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
