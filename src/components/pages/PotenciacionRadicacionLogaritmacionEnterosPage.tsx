"use client"

import * as React from "react"
import { Sigma } from "lucide-react"

import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import PotenciacionRadicacionLogaritmacionEnteros from "@/components/numeros-enteros/potenciacion-radicacion-logaritmacion"

export default function PotenciacionRadicacionLogaritmacionEnterosPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Números Enteros", href: "#" },
        { label: "Potenciación, Radicación y Logaritmación" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Potenciación, Radicación y Logaritmación en Z"
                description="Descubre cómo cambian la potenciación, radicación y logaritmación cuando trabajamos con números enteros. Negativos, signos, y nuevas reglas."
                icon={<Sigma className="h-10 w-10 text-orange-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    <PotenciacionRadicacionLogaritmacionEnteros />

                    {/* Botones de navegación al final del flujo */}
                    <div className="pt-10 flex justify-between items-center w-full">
                        <a
                            href="/matematicas-7/multiplicacion-division-enteros"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-zinc-800 hover:bg-orange-600 hover:text-white rounded-full font-semibold transition-all duration-300"
                        >
                            <span>←</span>
                            Anterior: Multiplicación y División
                        </a>
                        <a
                            href="/matematicas-7"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-400 text-white rounded-full font-semibold transition-all duration-300"
                        >
                            Volver a Matemáticas 7
                            <span>→</span>
                        </a>
                    </div>
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
