"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { UnorderedPoints } from "@/components/sistema-decimal/UnorderedPoints"
import { OrderedPoints } from "@/components/sistema-decimal/OrderedPoints"
import { DecimalSystemExplanation } from "@/components/sistema-decimal/DecimalSystemExplanation"
import { Binary, Lightbulb, Users } from "lucide-react"

export default function SistemaDecimalPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Sistema Decimal" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="El Sistema Decimal"
                description="Descubre cómo el orden y la agrupación transforman el caos en matemáticas."
                icon={<Binary className="h-10 w-10 text-indigo-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* PARTE 1: El Desorden */}
                    <section className="space-y-6">
                        
                        <UnorderedPoints />
                        
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Como habrás notado, contar los 6 círculos rojos fue fácil, pero los 27 azules se volvieron un dolor de cabeza. Las matemáticas están aquí para poner orden al caos.
                        </p>
                    </section>

                    {/* PARTE 2: El Orden */}
                    <section className="space-y-6">
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-indigo-500 shrink-0" />
                            <div className="text-indigo-800 dark:text-indigo-200 font-medium">
                                <p>Al ordenar los puntos, nuestra mente puede usar diferentes estrategias. Hay tres caminos posibles.</p>
                            </div>
                        </div>

                        <OrderedPoints />
                    </section>

                    {/* PARTE 3: El Sistema Decimal */}
                    <section className="space-y-6">
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Finalmente, entendemos que nuestro sistema se basa en <b>agrupar de a 10</b>. Cada vez que completamos diez de un tipo, formamos una unidad de orden superior.
                        </p>

                        <DecimalSystemExplanation />
                    </section>

                    {/* Botón de retorno */}
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
