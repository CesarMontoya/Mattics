"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { BasicMultiplicationVisual } from "@/components/multiplicacion-naturales/BasicMultiplicationVisual"
import { ArrayMultiplicationVisual } from "@/components/multiplicacion-naturales/ArrayMultiplicationVisual"
import { MultiDigitMultiplicationVisual } from "@/components/multiplicacion-naturales/MultiDigitMultiplicationVisual"
import { RegroupingMultiplicationVisual } from "@/components/multiplicacion-naturales/RegroupingMultiplicationVisual"
import { VerticalMultiplicationVisual } from "@/components/multiplicacion-naturales/VerticalMultiplicationVisual"
import { X, Lightbulb, Info, History } from "lucide-react"

export default function MultiplicacionNaturalesPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Multiplicación de Números Naturales" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Multiplicación de Números Naturales"
                description="Descubre cómo la multiplicación acelera las operaciones y construye nuevos números."
                icon={<X className="h-10 w-10 text-purple-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* SECCIÓN 1: ¿QUÉ ES MULTIPLICAR? */}
                    <section className="space-y-6">
                        <h2 className="heading-2">¿Qué es multiplicar?</h2>
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/50 flex items-start gap-4 shadow-sm">
                            <Info className="h-8 w-8 text-purple-500 shrink-0" />
                            <p className="text-purple-800 dark:text-purple-200">
                                Multiplicar es <b>sumar repetidamente</b> la misma cantidad. En lugar de escribir 4 + 4 + 4, podemos expresarlo como 4 × 3. Es un atajo poderoso que nos ahorra tiempo y esfuerzo.
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Tenemos 4 círculos azules y requerimos triplicar esta cantidad:
                        </p>

                        <BasicMultiplicationVisual />
                    </section>

                    {/* SECCIÓN 2: PROPIEDAD CONMUTATIVA */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Un atajo interesante</h2>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-amber-500 shrink-0" />
                            <p className="text-amber-800 dark:text-amber-200">
                                <b>Propiedad conmutativa:</b> El orden en que multiplicas dos números no cambia el resultado. Es decir, 5 × 3 = 3 × 5. ¡Esto nos da flexibilidad para escoger el camino más fácil!
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Observa cómo podemos reorganizar los elementos y obtener el mismo total:
                        </p>

                        <ArrayMultiplicationVisual />
                    </section>

                    {/* SECCIÓN 3: MULTIPLICACIÓN CON DECENAS */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Multiplicando números más grandes</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Cuando multiplicamos números mayores que 10, usamos nuestra comprensión del sistema decimal. Los bloques de decenas y unidades se replican de la misma manera:
                        </p>

                        <MultiDigitMultiplicationVisual />
                    </section>

                    {/* SECCIÓN 4: REAGRUPACIÓN EN MULTIPLICACIÓN */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Cuando las unidades superan 10</h2>
                        <div className="bg-rose-50 dark:bg-rose-950/30 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-rose-500 shrink-0" />
                            <p className="text-rose-800 dark:text-rose-200">
                                <b>¡Atención!</b> A veces, al multiplicar las unidades obtenemos más de 10. En ese caso, debemos <b>reagrupar</b> esas unidades en decenas, igual que hacíamos en la adición.
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Observa qué sucede cuando multiplicamos 27 × 6. Las unidades (7 × 6 = 42) superan 10:
                        </p>

                        <RegroupingMultiplicationVisual />
                    </section>

                    {/* SECCIÓN 5: ALGORITMO VS GEOMETRÍA */}
                    <section className="space-y-6">
                        <h2 className="heading-2">El Algoritmo de la Multiplicación</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Ahora comparemos el algoritmo tradicional que usamos en el cuaderno con la representación geométrica. Verás que ambos caminos nos llevan exactamente al mismo destino:
                        </p>

                        <VerticalMultiplicationVisual />
                    </section>

                    {/* SECCIÓN 6: CURIOSIDAD HISTÓRICA */}
                    <section className="bg-slate-900 text-white p-8 rounded-3xl space-y-4 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <History className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            ¿Sabías que...?
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed relative z-10">
                            El símbolo <b>×</b> para la multiplicación fue introducido por el matemático inglés William Oughtred en 1631. Antes de eso, los matemáticos simplemente escribían las letras juntas o usaban otros símbolos. El símbolo · (punto medio) también se usa para multiplicar, especialmente cuando trabajamos con letras en álgebra.
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
