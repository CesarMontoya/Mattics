"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { EnergiaConceptoVisual } from "@/components/tecnologia-8-energia/EnergiaConceptoVisual"
import { EnergiaCineticaVisual } from "@/components/tecnologia-8-energia/EnergiaCineticaVisual"
import { EnergiaConservacionVisual } from "@/components/tecnologia-8-energia/EnergiaConservacionVisual"
import { EnergiaTiposVisual } from "@/components/tecnologia-8-energia/EnergiaTiposVisual"
import { QuestionCard } from "@/components/tecnologia-8-energia/QuestionCard"
import { Zap, Lightbulb, Info, FlaskConical } from "lucide-react"

export default function EnergiaPage() {
    const breadcrumbs = [
        { label: "Tecnología 8", href: "#" },
        { label: "Energía" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Energía"
                description="Descubre qué es la energía, cómo se transforma y por qué nunca desaparece."
                icon={<Zap className="h-10 w-10 text-yellow-500" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>

                    {/* ── SECCIÓN 1: El esquiador en la cima ──────────────────────── */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Exploremos la Energía</h2>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4 shadow-sm">
                            <Lightbulb className="h-8 w-8 text-amber-500 shrink-0" />
                            <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                                Imagina un esquiador parado en la cima de una montaña. Está completamente quieto.
                                Pero... ¿eso significa que no tiene energía?
                            </p>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Observa la siguiente situación y piensa antes de responder:
                        </p>
                        <EnergiaConceptoVisual />
                    </section>

                    {/* ── PREGUNTA 1 ───────────────────────────────────────────────── */}
                    <section className="space-y-6">
                        <QuestionCard
                            question="1. ¿Por qué tiene energía el esquiador si está quieto en la cima?"
                            correctId="b"
                            hint="Piensa en lo que pasaría si alguien lo empujara suavemente. ¿Qué ocurriría?"
                            options={[
                                {
                                    id: "a",
                                    text: "Tiene energía porque está quieto.",
                                    feedback: "Estar quieto no es la razón. El reposo no genera energía por sí solo. Piensa en qué tiene el esquiador que no tendría si estuviera en el piso.",
                                },
                                {
                                    id: "b",
                                    text: "Tiene energía porque está en un lugar alto y podría moverse.",
                                    feedback: "¡Exacto! La altura y la gravedad le dan la capacidad de moverse. Eso es la energía potencial: energía 'guardada' lista para usarse.",
                                },
                                {
                                    id: "c",
                                    text: "No tiene energía porque no se mueve.",
                                    feedback: "El movimiento no es la única forma de tener energía. ¿Qué pasa con una pelota en lo alto de una repisa? Tiene energía aunque no se mueva.",
                                },
                            ]}
                        />
                    </section>

                    {/* ── SECCIÓN 2: Energía Potencial ─────────────────────────────── */}
                    <section className="space-y-6">
                        <h2 className="heading-2">La energía potencial: «Ahorrada para usarla después»</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            La energía potencial es como un <strong>banco de energía</strong>. Cuanto más alto estés
                            y más pesado seas, ¡más energía tienes guardada!
                        </p>
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-4">
                            <Info className="h-8 w-8 text-indigo-500 shrink-0" />
                            <div className="space-y-2">
                                <p className="text-indigo-800 dark:text-indigo-200 font-semibold">Ecuación de energía potencial:</p>
                                <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 font-mono">
                                    E<sub>p</sub> = m · g · h
                                </p>
                                <ul className="text-indigo-700 dark:text-indigo-300 text-sm space-y-1">
                                    <li><strong>m</strong> = masa (kg)</li>
                                    <li><strong>g</strong> = gravedad (9.8 m/s² en la Tierra)</li>
                                    <li><strong>h</strong> = altura (m)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Ejercicios de cálculo mental - Energía Potencial */}
                        <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl border border-slate-200 dark:border-zinc-700/50 shadow-sm mt-4">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
                                <span className="text-xl">🧮</span> ¡Desafío mental! (Energía Potencial)
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4">
                                Usa la gravedad <strong>g = 10 m/s²</strong> para facilitar el cálculo. Resuélvelos en tu mente sin usar calculadora:
                            </p>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">Nivel 1: Fácil</div>
                                    <p className="text-slate-700 dark:text-zinc-300 text-sm mb-3">Un gato de <strong>2 kg</strong> en un techo de <strong>5 m</strong> de altura.</p>
                                    <details className="group">
                                        <summary className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">Ver respuesta</summary>
                                        <div className="mt-2 text-sm text-slate-600 dark:text-zinc-400 font-mono">
                                            Ep = 2 × 10 × 5 = <strong className="text-indigo-700 dark:text-indigo-300">100 J</strong>
                                        </div>
                                    </details>
                                </div>
                                <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">Nivel 2: Medio</div>
                                    <p className="text-slate-700 dark:text-zinc-300 text-sm mb-3">Una roca de <strong>5 kg</strong> al borde de un barranco de <strong>10 m</strong>.</p>
                                    <details className="group">
                                        <summary className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">Ver respuesta</summary>
                                        <div className="mt-2 text-sm text-slate-600 dark:text-zinc-400 font-mono">
                                            Ep = 5 × 10 × 10 = <strong className="text-indigo-700 dark:text-indigo-300">500 J</strong>
                                        </div>
                                    </details>
                                </div>
                                <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider">Nivel 3: Difícil</div>
                                    <p className="text-slate-700 dark:text-zinc-300 text-sm mb-3">Un loro de <strong>0.5 kg</strong> volando en una rama a <strong>20 m</strong> de altura.</p>
                                    <details className="group">
                                        <summary className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">Ver respuesta</summary>
                                        <div className="mt-2 text-sm text-slate-600 dark:text-zinc-400 font-mono">
                                            Ep = 0.5 × 10 × 20 = <strong className="text-indigo-700 dark:text-indigo-300">100 J</strong>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── SECCIÓN 3: ¿Qué pasa al bajar? ─────────────────────────── */}
                    <section className="space-y-6">
                        <h2 className="heading-2">¿Qué pasa cuando el esquiador se lanza cuesta abajo? 🎿</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Al empezar a moverse, su energía potencial se <strong>transforma</strong>.
                            Observa el siguiente diagrama paso a paso:
                        </p>
                        <EnergiaCineticaVisual />
                    </section>

                    {/* ── PREGUNTA 2 ───────────────────────────────────────────────── */}
                    <section className="space-y-6">
                        <QuestionCard
                            question="3. ¿Qué ocurre con la energía del esquiador al bajar?"
                            correctId="a"
                            hint="Fíjate en las barras del diagrama anterior. ¿Cuál crece y cuál disminuye?"
                            options={[
                                {
                                    id: "a",
                                    text: "Pierde energía potencial y gana energía de movimiento (cinética).",
                                    feedback: "¡Correcto! Al bajar, la altura disminuye, por lo que la Ep baja. Pero esa energía no desaparece: se convierte en velocidad (Ec).",
                                },
                                {
                                    id: "b",
                                    text: "Gana más energía potencial.",
                                    feedback: "La energía potencial depende de la altura. Al bajar, la altura disminuye, así que la Ep también disminuye.",
                                },
                                {
                                    id: "c",
                                    text: "La energía desaparece.",
                                    feedback: "La energía nunca desaparece; se transforma. Esto se llama el principio de conservación de la energía.",
                                },
                            ]}
                        />
                    </section>

                    {/* ── SECCIÓN 4: Energía Cinética ──────────────────────────────── */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Energía cinética: ¡La energía del movimiento!</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            La energía cinética es la que tienen los objetos <strong>al moverse</strong>.
                            Depende de la velocidad y la masa:
                        </p>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/50 flex items-start gap-4">
                            <Info className="h-8 w-8 text-amber-500 shrink-0" />
                            <div className="space-y-2">
                                <p className="text-amber-800 dark:text-amber-200 font-semibold">Ecuación de energía cinética:</p>
                                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300 font-mono">
                                    E<sub>c</sub> = ½ · m · v²
                                </p>
                                <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
                                    <li><strong>m</strong> = masa (kg)</li>
                                    <li><strong>v</strong> = velocidad (m/s)</li>
                                    <li>¡La velocidad tiene mucho más impacto que la masa porque va al cuadrado!</li>
                                </ul>
                            </div>
                        </div>

                        {/* Ejercicios de cálculo mental - Energía Cinética */}
                        <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl border border-slate-200 dark:border-zinc-700/50 shadow-sm mt-4">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
                                <span className="text-xl">🧮</span> ¡Desafío mental! (Energía Cinética)
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-zinc-400 mb-4">
                                Recuerda elevar primero la velocidad al cuadrado y luego multiplicar. Resuélvelos mentalmente sin usar calculadora:
                            </p>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
                                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider">Nivel 1: Fácil</div>
                                    <p className="text-slate-700 dark:text-zinc-300 text-sm mb-3">Un balón de <strong>2 kg</strong> pateado a una velocidad de <strong>3 m/s</strong>.</p>
                                    <details className="group">
                                        <summary className="text-xs font-semibold text-amber-600 dark:text-amber-400 cursor-pointer hover:underline">Ver respuesta</summary>
                                        <div className="mt-2 text-sm text-slate-600 dark:text-zinc-400 font-mono">
                                            Ec = ½ × 2 × (3)² = 1 × 9 = <strong className="text-amber-700 dark:text-amber-300">9 J</strong>
                                        </div>
                                    </details>
                                </div>
                                <div className="bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
                                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider">Nivel 2: Medio</div>
                                    <p className="text-slate-700 dark:text-zinc-300 text-sm mb-3">Un perro de <strong>4 kg</strong> corriendo a <strong>5 m/s</strong>.</p>
                                    <details className="group">
                                        <summary className="text-xs font-semibold text-amber-600 dark:text-amber-400 cursor-pointer hover:underline">Ver respuesta</summary>
                                        <div className="mt-2 text-sm text-slate-600 dark:text-zinc-400 font-mono">
                                            Ec = ½ × 4 × (5)² = 2 × 25 = <strong className="text-amber-700 dark:text-amber-300">50 J</strong>
                                        </div>
                                    </details>
                                </div>
                                <div className="bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
                                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider">Nivel 3: Difícil</div>
                                    <p className="text-slate-700 dark:text-zinc-300 text-sm mb-3">Una bicicleta de <strong>10 kg</strong> rodando a <strong>4 m/s</strong>.</p>
                                    <details className="group">
                                        <summary className="text-xs font-semibold text-amber-600 dark:text-amber-400 cursor-pointer hover:underline">Ver respuesta</summary>
                                        <div className="mt-2 text-sm text-slate-600 dark:text-zinc-400 font-mono">
                                            Ec = ½ × 10 × (4)² = 5 × 16 = <strong className="text-amber-700 dark:text-amber-300">80 J</strong>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>

                        {/* Pregunta de pendiente/velocidad */}
                        <QuestionCard
                            question="2. Un esquiador desciende por tres pendientes con la misma altura vertical. ¿En cuál llegará más rápido a la base?"
                            correctId="c"
                            hint="Recuerda: la Ec solo depende de la masa y la velocidad final. La forma del camino (si da vueltas o va recto) no afecta la energía final disponible."
                            options={[
                                {
                                    id: "a",
                                    text: "En la pendiente más empinada (casi vertical).",
                                    feedback: "La inclinación afecta qué tan rápido gana velocidad, pero si la altura es la misma, la energía disponible es la misma. Sin fricción, la velocidad final sería igual.",
                                },
                                {
                                    id: "b",
                                    text: "En la pendiente más suave (casi plana).",
                                    feedback: "Una pendiente más suave hace que tarde más en llegar, pero la velocidad final (si no hay fricción) depende solo de la altura, no de la inclinación.",
                                },
                                {
                                    id: "c",
                                    text: "La velocidad final sería igual en las tres (si no hay fricción).",
                                    feedback: "¡Exacto! Con la misma altura vertical, la misma energía potencial se convierte en cinética en los tres casos. La forma de la pendiente no importa.",
                                },
                            ]}
                        />
                    </section>

                    {/* ── SECCIÓN 5: Conservación de energía ──────────────────────── */}
                    <section className="space-y-6">
                        <h2 className="heading-2">
                            La energía NO se crea ni se destruye… ¡Se transforma!
                        </h2>
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex items-start gap-4">
                            <Lightbulb className="h-8 w-8 text-emerald-500 shrink-0" />
                            <div>
                                <p className="text-emerald-800 dark:text-emerald-200 font-semibold mb-2">
                                    Principio de conservación de la energía
                                </p>
                                <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                                    La energía total del sistema se mantiene constante. Solo cambia de forma: de potencial a cinética,
                                    de cinética a calor, etc. ¡Nunca desaparece del universo!
                                </p>
                            </div>
                        </div>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            Presiona el botón y observa cómo la energía total siempre es 1000 J:
                        </p>
                        <EnergiaConservacionVisual />
                    </section>

                    {/* ── PREGUNTA 4 ───────────────────────────────────────────────── */}
                    <section className="space-y-6">
                        <QuestionCard
                            question="4. Si el esquiador se detiene al final de la pista, ¿a dónde fue su energía cinética?"
                            correctId="b"
                            hint="Al frenar, sus esquís rozan la nieve. ¿Has notado que el hielo se derrite un poco cuando lo rozas?"
                            options={[
                                {
                                    id: "a",
                                    text: "Se perdió en el universo.",
                                    feedback: "La energía nunca se pierde en el universo. El principio de conservación dice que debe transformarse en alguna forma.",
                                },
                                {
                                    id: "b",
                                    text: "Se transformó en calor y sonido.",
                                    feedback: "¡Correcto! Al frenar, la fricción entre los esquís y la nieve convierte la energía cinética en calor (la nieve se calienta un poco) y en el sonido del frenado.",
                                },
                                {
                                    id: "c",
                                    text: "Volvió a ser energía potencial.",
                                    feedback: "Para volver a ser potencial, el esquiador tendría que subir de nuevo. Al frenarse en el piso plano, la energía no se convierte en potencial.",
                                },
                            ]}
                        />
                    </section>

                    {/* ── SECCIÓN 6: Tipos de energía ─────────────────────────────── */}
                    <section className="space-y-6">
                        <h2 className="heading-2">Tipos de energía (además de potencial y cinética):</h2>
                        <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            La energía existe en muchas formas. Explora cada una:
                        </p>
                        <EnergiaTiposVisual />
                    </section>

                    {/* ── SECCIÓN 7: Definición final ──────────────────────────────── */}
                    <section className="bg-gradient-to-br from-yellow-600 to-amber-500 text-white p-8 rounded-3xl space-y-4 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Zap className="h-32 w-32" />
                        </div>
                        <h3 className="text-2xl font-bold relative z-10">
                            Ahora sí, ¿Qué es la Energía?
                        </h3>
                        <p className="text-yellow-50 text-lg leading-relaxed relative z-10">
                            La <strong>energía</strong> es la capacidad de producir cambios o hacer que las cosas se muevan.
                            No la vemos directamente, pero observamos sus efectos: un objeto que cae,
                            una lámpara encendida o ¡tu cuerpo al correr!
                        </p>
                        <ul className="text-yellow-50 text-base space-y-1 relative z-10">
                            <li>⚡ La energía no desaparece, solo se <strong>transforma</strong>.</li>
                            <li>⚡ Existe en muchas formas: potencial, cinética, térmica, química…</li>
                            <li>⚡ Ejemplo: Sol (luz) → plantas (química) → animales (cinética) → calor (térmica).</li>
                        </ul>
                    </section>

                    {/* ── SECCIÓN 8: Taller ───────────────────────────────────────── */}
                    <section className="space-y-6">
                        <h2 className="heading-2">
                            <FlaskConical className="inline h-7 w-7 text-indigo-500 mr-2" />
                            Taller 1: Energía
                        </h2>
                        <div className="bg-slate-50 dark:bg-zinc-800 p-6 rounded-2xl border border-slate-200 dark:border-zinc-700 space-y-6">

                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">Ejercicio 1</h3>
                                <p className="text-slate-600 dark:text-zinc-400">
                                    Una manzana de <strong>0.2 kg</strong> está en un árbol a <strong>5 m</strong> de altura. (g = 9.8 m/s²)
                                </p>
                                <ul className="list-disc list-inside text-slate-600 dark:text-zinc-400 space-y-1 ml-2">
                                    <li>a) Calcula su energía potencial cuando está en el árbol.</li>
                                    <li>b) Si cae al suelo, ¿cuál es su energía cinética justo antes de golpear? (Ignora la fricción del aire).</li>
                                    <li>c) ¿Se conserva la energía total? Explica.</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">Ejercicio 2</h3>
                                <p className="text-slate-600 dark:text-zinc-400">
                                    Un skateboarder de <strong>60 kg</strong> baja una rampa de <strong>3 m</strong> de altura y
                                    alcanza <strong>6 m/s</strong> en el punto más bajo.
                                </p>
                                <ul className="list-disc list-inside text-slate-600 dark:text-zinc-400 space-y-1 ml-2">
                                    <li>a) Calcula su energía potencial en la parte alta.</li>
                                    <li>b) Calcula su energía cinética en la parte baja.</li>
                                    <li>c) ¿Hubo conservación de energía? Si no, ¿a qué se debe?</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">Ejercicio 3</h3>
                                <p className="text-slate-600 dark:text-zinc-400">
                                    Un péndulo de <strong>1 kg</strong> se eleva a <strong>0.5 m</strong>. En su punto más bajo, su velocidad es <strong>3 m/s</strong>.
                                </p>
                                <ul className="list-disc list-inside text-slate-600 dark:text-zinc-400 space-y-1 ml-2">
                                    <li>a) Calcula la energía potencial en el punto más alto.</li>
                                    <li>b) Calcula la energía cinética en el punto más bajo.</li>
                                    <li>c) Compara ambos valores y explica si hay conservación.</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">Ejercicio 4</h3>
                                <p className="text-slate-600 dark:text-zinc-400">
                                    El agua en la cima de una cascada de <strong>20 m</strong> tiene velocidad 0. Al caer, llega a <strong>14 m/s</strong>.
                                </p>
                                <ul className="list-disc list-inside text-slate-600 dark:text-zinc-400 space-y-1 ml-2">
                                    <li>a) Si 1 litro de agua (1 kg) cae, calcula su energía potencial inicial.</li>
                                    <li>b) Calcula su energía cinética final.</li>
                                    <li>c) ¿Se cumple la conservación? Si no, ¿a qué se debe?</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Botón de retorno */}
                    <div className="pt-6 flex justify-center">
                        <a
                            href="#"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white rounded-full font-bold transition-all duration-300 shadow-sm"
                        >
                            <span>←</span>
                            Volver a Tecnología 8
                        </a>
                    </div>

                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
