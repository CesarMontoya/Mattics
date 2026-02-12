"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { ExponentiationConceptVisual } from "@/components/potenciacion-naturales/ExponentiationConceptVisual"
import { ExponentiationExample1Visual } from "@/components/potenciacion-naturales/ExponentiationExample1Visual"
import { ExponentiationExample2Visual } from "@/components/potenciacion-naturales/ExponentiationExample2Visual"
import { ExponentiationExample3Visual } from "@/components/potenciacion-naturales/ExponentiationExample3Visual"
import { ProductSameBaseVisual } from "@/components/potenciacion-naturales/ProductSameBaseVisual"
import { QuotientSameBaseVisual } from "@/components/potenciacion-naturales/QuotientSameBaseVisual"
import { PowerOfPowerVisual } from "@/components/potenciacion-naturales/PowerOfPowerVisual"
import { PowerOfProductVisual } from "@/components/potenciacion-naturales/PowerOfProductVisual"
import { PowerOfQuotientVisual } from "@/components/potenciacion-naturales/PowerOfQuotientVisual"
import { ZeroExponentVisual } from "@/components/potenciacion-naturales/ZeroExponentVisual"
import { OneExponentVisual } from "@/components/potenciacion-naturales/OneExponentVisual"
import { Sparkles, Lightbulb, Info, History } from "lucide-react"

export default function PotenciacionNaturalesPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Potenciación de Números Naturales" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Potenciación de Números Naturales"
                description="Descubre el poder de la multiplicación repetida y las propiedades que hacen la potenciación tan especial."
                icon={<Sparkles className="h-10 w-10 text-orange-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* SECCIÓN 1: ¿QUÉ ES LA POTENCIACIÓN? */}
                    <section className="space-y-6">
                        <h2 className="heading-2">¿Qué es la potenciación?</h2>
                        <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/50 flex items-start gap-4 shadow-sm">
                            <Info className="h-8 w-8 text-orange-500 shrink-0" />
                            <p className="text-orange-800 dark:text-orange-200">
                                La potenciación es <b>multiplicar repetidamente</b> el mismo número. En lugar de escribir 2 × 2 × 2, podemos expresarlo como 2³. La base es el número que se repite, y el exponente indica cuántas veces se multiplica.
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Observa cómo funciona la notación exponencial:
                        </p>

                        <ExponentiationConceptVisual />
                    </section>

                    {/* SECCIÓN 2: EJEMPLOS DE POTENCIACIÓN */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Ejemplos de potenciación</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Veamos tres ejemplos fundamentales que te ayudarán a dominar la potenciación:
                        </p>

                        {/* Ejemplo 1: 3² */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Ejemplo 1: El cuadrado</h3>
                            <ExponentiationExample1Visual />
                        </div>

                        {/* Ejemplo 2: 2⁴ */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Ejemplo 2: Duplicación sucesiva</h3>
                            <ExponentiationExample2Visual />
                        </div>

                        {/* Ejemplo 3: 5³ */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Ejemplo 3: El cubo</h3>
                            <ExponentiationExample3Visual />
                        </div>
                    </section>

                    {/* SECCIÓN 3: PROPIEDADES DE LA POTENCIACIÓN */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Propiedades de la potenciación</h2>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-amber-500 shrink-0" />
                            <p className="text-amber-800 dark:text-amber-200">
                                La potenciación tiene <b>propiedades especiales</b> que nos permiten simplificar cálculos complejos. Conocer estas propiedades es fundamental para resolver problemas matemáticos de manera eficiente.
                            </p>
                        </div>

                        {/* Propiedad 1: Producto de potencias de igual base */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                1. Producto de potencias de igual base
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                Cuando multiplicamos potencias con la misma base, <b>sumamos los exponentes</b>:
                            </p>
                            <ProductSameBaseVisual />
                        </div>

                        {/* Propiedad 2: Cociente de potencias de igual base */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                2. Cociente de potencias de igual base
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                Cuando dividimos potencias con la misma base, <b>restamos los exponentes</b>:
                            </p>
                            <QuotientSameBaseVisual />
                        </div>

                        {/* Propiedad 3: Potencia de una potencia */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                3. Potencia de una potencia
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                Cuando elevamos una potencia a otra potencia, <b>multiplicamos los exponentes</b>:
                            </p>
                            <PowerOfPowerVisual />
                        </div>

                        {/* Propiedad 4: Potencia de un producto */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                4. Potencia de un producto
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                Un producto elevado a una potencia <b>distribuye el exponente</b> a cada factor:
                            </p>
                            <PowerOfProductVisual />
                        </div>

                        {/* Propiedad 5: Potencia de un cociente */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                5. Potencia de un cociente
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                Un cociente elevado a una potencia <b>distribuye el exponente</b> al numerador y denominador:
                            </p>
                            <PowerOfQuotientVisual />
                        </div>

                        {/* Propiedad 6: Potencia de exponente cero */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                6. Potencia de exponente cero
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                Cualquier número (excepto cero) elevado a cero <b>siempre es 1</b>:
                            </p>
                            <ZeroExponentVisual />
                        </div>

                        {/* Propiedad 7: Potencia de exponente uno */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
                                7. Potencia de exponente uno
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-zinc-400">
                                Cualquier número elevado a uno <b>es igual a sí mismo</b>:
                            </p>
                            <OneExponentVisual />
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
                            El matemático francés <b>René Descartes</b> fue uno de los primeros en usar la notación moderna de exponentes en el siglo XVII. Antes de eso, los matemáticos escribían las potencias de manera muy diferente. Por ejemplo, en lugar de escribir x³, escribían "x cubo" o usaban símbolos complicados. La notación de Descartes revolucionó las matemáticas al hacer los cálculos mucho más simples y claros.
                        </p>
                    </section>

                    {/* Botón de retorno */}
                    <div className="pt-10 flex justify-center">
                        <a
                            href="/matematicas-7"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-zinc-800 hover:bg-orange-600 hover:text-white rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-orange-200 dark:hover:shadow-none"
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
