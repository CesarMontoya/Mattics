"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { LogarithmConceptVisual } from "@/components/logaritmacion-naturales/LogarithmConceptVisual"
import { LogarithmExample1Visual } from "@/components/logaritmacion-naturales/LogarithmExample1Visual"
import { LogarithmExample2Visual } from "@/components/logaritmacion-naturales/LogarithmExample2Visual"
import { LogarithmExample3Visual } from "@/components/logaritmacion-naturales/LogarithmExample3Visual"
import { LogProductPropertyVisual } from "@/components/logaritmacion-naturales/LogProductPropertyVisual"
import { LogQuotientPropertyVisual } from "@/components/logaritmacion-naturales/LogQuotientPropertyVisual"
import { LogPowerPropertyVisual } from "@/components/logaritmacion-naturales/LogPowerPropertyVisual"
import { LogBasePropertyVisual } from "@/components/logaritmacion-naturales/LogBasePropertyVisual"
import { LogUnityPropertyVisual } from "@/components/logaritmacion-naturales/LogUnityPropertyVisual"
import { Sparkles, Lightbulb, Info, History, Binary } from "lucide-react"

export default function LogaritmacionNaturalesPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Logaritmación de Números Naturales" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Logaritmación de Números Naturales"
                description="Aprende a encontrar el exponente oculto contando los pasos necesarios para llegar a un número."
                icon={<Binary className="h-10 w-10 text-blue-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* SECCIÓN 1: ¿QUÉ ES LA LOGARITMACIÓN? */}
                    <section className="space-y-6">
                        <h2 className="heading-2">¿Qué es la logaritmación?</h2>
                        <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 flex items-start gap-4 shadow-sm">
                            <Info className="h-8 w-8 text-blue-500 shrink-0" />
                            <p className="text-blue-800 dark:text-blue-200">
                                La logaritmación es la operación inversa a la potenciación. Nos permite hallar el <b>exponente</b> cuando conocemos la base y el resultado. Podemos pensar en ella como contar cuántos <b>pasos</b> (multiplicaciones) necesitamos para alcanzar un número.
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Observa cómo planteamos la pregunta del logaritmo:
                        </p>

                        <LogarithmConceptVisual />
                    </section>

                    {/* SECCIÓN 2: EJEMPLOS DE LOGARITMACIÓN */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Ejemplos de logaritmación</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Practiquemos con estos tres ejemplos para entender mejor el concepto de "contar pasos":
                        </p>

                        {/* Ejemplo 1 */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Ejemplo 1: Base 3</h3>
                            <LogarithmExample1Visual />
                        </div>

                        {/* Ejemplo 2 */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Ejemplo 2: Multiplicando doses</h3>
                            <LogarithmExample2Visual />
                        </div>

                        {/* Ejemplo 3 */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Ejemplo 3: Alcanzando el 125</h3>
                            <LogarithmExample3Visual />
                        </div>
                    </section>

                    {/* SECCIÓN 3: PROPIEDADES DE LA LOGARITMACIÓN */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Propiedades de la logaritmación</h2>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-amber-500 shrink-0" />
                            <p className="text-amber-800 dark:text-amber-200">
                                Al igual que la potenciación, la logaritmación tiene <b>propiedades mágicas</b> que simplifican enormemente los cálculos. ¡Veamos cuáles son!
                            </p>
                        </div>

                        {/* Propiedad 1: Logaritmo de un producto */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                1. Logaritmo de un producto
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium">
                                El logaritmo de una multiplicación es la <b>suma</b> de los logaritmos:
                            </p>
                            <LogProductPropertyVisual />
                        </div>

                        {/* Propiedad 2: Logaritmo de un cociente */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                2. Logaritmo de un cociente
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium">
                                El logaritmo de una división es la <b>resta</b> de los logaritmos:
                            </p>
                            <LogQuotientPropertyVisual />
                        </div>

                        {/* Propiedad 3: Logaritmo de una potencia */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                3. Logaritmo de una potencia
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium">
                                El exponente <b>baja a multiplicar</b> al logaritmo:
                            </p>
                            <LogPowerPropertyVisual />
                        </div>

                        {/* Propiedad 4: Logaritmo de la base */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                4. Logaritmo de la base
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium">
                                Si el número es igual a la base, el resultado <b>siempre es 1</b>:
                            </p>
                            <LogBasePropertyVisual />
                        </div>

                        {/* Propiedad 5: Logaritmo de la unidad */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                5. Logaritmo de la unidad
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400 font-medium">
                                El logaritmo de 1 en cualquier base <b>siempre es 0</b>:
                            </p>
                            <LogUnityPropertyVisual />
                        </div>
                    </section>

                    {/* SECCIÓN 4: CURIOSIDAD HISTÓRICA */}
                    <section className="bg-blue-900 text-white p-8 rounded-3xl space-y-4 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <History className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            Un poco de historia...
                        </h3>
                        <p className="text-blue-100 text-lg leading-relaxed relative z-10">
                            Los logaritmos fueron inventados por <b>John Napier</b> a principios del siglo XVII. Antes de las calculadoras y computadoras, los logaritmos eran la herramienta más poderosa de los científicos, ya que permitían convertir multiplicaciones difíciles en sumas sencillas. Astrónomos como Johannes Kepler pudieron realizar cálculos de órbitas planetarias gracias a que los logaritmos les ahorraban años de trabajo manual.
                        </p>
                    </section>

                    {/* Botón de retorno */}
                    <div className="pt-10 flex justify-center">
                        <a
                            href="/matematicas-7"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-blue-200 dark:hover:shadow-none"
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
