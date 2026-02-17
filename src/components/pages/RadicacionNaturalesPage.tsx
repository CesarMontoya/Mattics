"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { RadicationConceptVisual } from "@/components/radicacion-naturales/RadicationConceptVisual"
import { RadicationExample1Visual } from "@/components/radicacion-naturales/RadicationExample1Visual"
import { RadicationExample2Visual } from "@/components/radicacion-naturales/RadicationExample2Visual"
import { RadicationExample3Visual } from "@/components/radicacion-naturales/RadicationExample3Visual"
import { RootOfProductVisual } from "@/components/radicacion-naturales/RootOfProductVisual"
import { RootOfQuotientVisual } from "@/components/radicacion-naturales/RootOfQuotientVisual"
import { RootOfRootVisual } from "@/components/radicacion-naturales/RootOfRootVisual"
import { RootOfPowerVisual } from "@/components/radicacion-naturales/RootOfPowerVisual"
import { PowerOfRootVisual } from "@/components/radicacion-naturales/PowerOfRootVisual"
import { Calculator, Lightbulb, Info, History } from "lucide-react"

export default function RadicacionNaturalesPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Radicación de Números Naturales" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Radicación de Números Naturales"
                description="Descubre la operación inversa de la potenciación y aprende a encontrar la raíz de cualquier número natural."
                icon={<Calculator className="h-10 w-10 text-purple-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* SECCIÓN 1: ¿QUÉ ES LA RADICACIÓN? */}
                    <section className="space-y-6">
                        <h2 className="heading-2">¿Qué es la radicación?</h2>
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/50 flex items-start gap-4 shadow-sm">
                            <Info className="h-8 w-8 text-purple-500 shrink-0" />
                            <p className="text-purple-800 dark:text-purple-200">
                                La radicación es la <b>operación inversa de la potenciación</b>. Cuando buscamos la raíz de un número, preguntamos: ¿qué número multiplicado por sí mismo cierta cantidad de veces da como resultado este número? El índice indica cuántas veces se multiplica, y el radicando es el número del cual queremos obtener la raíz.
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Observa cómo funciona la notación radical:
                        </p>

                        <RadicationConceptVisual />
                    </section>

                    {/* SECCIÓN 2: EJEMPLOS DE RADICACIÓN */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Ejemplos de radicación</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Veamos tres ejemplos fundamentales que te ayudarán a dominar la radicación:
                        </p>

                        {/* Ejemplo 1: √16 */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Ejemplo 1: La raíz cuadrada</h3>
                            <RadicationExample1Visual />
                        </div>

                        {/* Ejemplo 2: ⁴√81 */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Ejemplo 2: La raíz cuarta</h3>
                            <RadicationExample2Visual />
                        </div>

                        {/* Ejemplo 3: ⁵√32 */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Ejemplo 3: La raíz quinta</h3>
                            <RadicationExample3Visual />
                        </div>
                    </section>

                    {/* SECCIÓN 3: PROPIEDADES DE LA RADICACIÓN */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Propiedades de la radicación</h2>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-amber-500 shrink-0" />
                            <p className="text-amber-800 dark:text-amber-200">
                                La radicación tiene <b>propiedades especiales</b> que nos permiten simplificar expresiones radicales y resolver problemas de manera más eficiente. Estas propiedades son especialmente útiles cuando trabajamos con expresiones algebraicas complejas.
                            </p>
                        </div>

                        {/* Propiedad 1: Raíz de un producto */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                1. Raíz de un producto
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                La raíz de un producto es igual al <b>producto de las raíces</b>:
                            </p>
                            <RootOfProductVisual />
                        </div>

                        {/* Propiedad 2: Raíz de un cociente */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                2. Raíz de un cociente
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                La raíz de un cociente es igual al <b>cociente de las raíces</b>:
                            </p>
                            <RootOfQuotientVisual />
                        </div>

                        {/* Propiedad 3: Raíz de una raíz */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                3. Raíz de una raíz
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                Cuando tenemos raíces anidadas, <b>multiplicamos los índices</b>:
                            </p>
                            <RootOfRootVisual />
                        </div>

                        {/* Propiedad 4: Raíz de una potencia */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                4. Raíz de una potencia
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                La raíz de una potencia se calcula <b>dividiendo el exponente entre el índice</b>:
                            </p>
                            <RootOfPowerVisual />
                        </div>

                        {/* Propiedad 5: Potencia de una raíz */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                5. Potencia de una raíz
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                Cuando una raíz se eleva a su mismo índice, <b>se simplifica al radicando</b>:
                            </p>
                            <PowerOfRootVisual />
                        </div>
                    </section>

                    {/* SECCIÓN 4: CURIOSIDAD HISTÓRICA */}
                    <section className="bg-slate-900 text-white p-8 rounded-3xl space-y-4 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <History className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            ¿Sabías que...?
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed relative z-10">
                            El símbolo de la raíz cuadrada (√) que usamos hoy en día fue introducido por el matemático alemán <b>Christoph Rudolff</b> en 1525. El símbolo probablemente proviene de una versión estilizada de la letra "r" minúscula, que representaba la palabra latina "radix" (raíz). Antes de esto, los matemáticos tenían que escribir explicaciones largas como "la raíz cuadrada de 16", lo cual hacía los cálculos muy complicados de leer y escribir.
                        </p>
                    </section>

                    {/* Botón de retorno */}
                    <div className="pt-10 flex justify-center">
                        <a
                            href="/matematicas-7"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-zinc-800 hover:bg-purple-600 hover:text-white rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-purple-200 dark:hover:shadow-none"
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
