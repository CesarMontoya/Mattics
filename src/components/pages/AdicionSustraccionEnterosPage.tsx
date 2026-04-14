"use client"

import * as React from "react"
import { PlusSquare } from "lucide-react"

import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import AdicionSustraccionEnteros from "@/components/numeros-enteros/adicion-y-sustraccion"

export default function AdicionSustraccionEnterosPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Números Enteros", href: "#" },
        { label: "Adición y Sustracción" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Adición y Sustracción de Números Enteros"
                description="Lleva tus habilidades con números enteros al siguiente nivel, dominando las operaciones de adición y sustracción con rigor matemático."
                icon={<PlusSquare className="h-10 w-10 text-sky-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    <AdicionSustraccionEnteros />

                    {/* Botones de navegación al final del flujo */}
                    <div className="pt-10 flex justify-between items-center w-full">
                        <a
                            href="/matematicas-7/valores-relativos"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-sky-600 hover:text-white rounded-full font-semibold transition-all duration-300"
                        >
                            <span>←</span>
                            Anterior: Valores Relativos
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
