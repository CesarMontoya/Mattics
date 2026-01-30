"use client"

import * as React from "react"
import { BookOpen, Calculator, Plus, Minus, X, Divide } from "lucide-react"

export default function Matematicas7Content() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Matemáticas 7°
                        </h1>
                    </div>
                    <p className="max-w-2xl text-lg text-white/90">
                        Aquí empieza tu aprendizaje de matemáticas. Prepárate para
                        descubrir un mundo nuevo lleno de números, patrones y soluciones
                        fascinantes.
                    </p>
                </div>
            </div>

            {/* Topics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <TopicCard
                    title="Adición de Números Naturales"
                    description="Aprende a sumar cantidades de forma sencilla y divertida"
                    icon={Plus}
                    href="/matematicas-7/adicion-naturales"
                    gradient="from-emerald-500 to-teal-600"
                />
                <TopicCard
                    title="Sustracción"
                    description="Domina la resta y sus aplicaciones"
                    icon={Minus}
                    href="#"
                    gradient="from-blue-500 to-cyan-600"
                />
                <TopicCard
                    title="Multiplicación"
                    description="Multiplica con confianza y velocidad"
                    icon={X}
                    href="#"
                    gradient="from-orange-500 to-amber-600"
                />
                <TopicCard
                    title="División"
                    description="Divide y conquista cualquier problema"
                    icon={Divide}
                    href="#"
                    gradient="from-rose-500 to-pink-600"
                />
            </div>

            {/* Stats Section */}
            <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                    title="Lecciones Completadas"
                    value="0"
                    total="24"
                    color="bg-violet-500"
                />
                <StatCard
                    title="Ejercicios Resueltos"
                    value="0"
                    total="120"
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Logros Desbloqueados"
                    value="0"
                    total="12"
                    color="bg-amber-500"
                />
            </div>

            {/* Recent Activity Placeholder */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Actividad Reciente
                </h2>
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Calculator className="mb-4 h-12 w-12 opacity-50" />
                    <p className="text-center">
                        ¡Comienza tu primera lección para ver tu progreso aquí!
                    </p>
                </div>
            </div>
        </div>
    )
}

interface TopicCardProps {
    title: string
    description: string
    icon: React.ElementType
    href: string
    gradient: string
}

function TopicCard({
    title,
    description,
    icon: Icon,
    href,
    gradient,
}: TopicCardProps) {
    return (
        <a
            href={href}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-transparent hover:shadow-xl hover:-translate-y-1"
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative z-10">
                <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-lg`}
                >
                    <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-white">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground transition-colors group-hover:text-white/80">
                    {description}
                </p>
            </div>
        </a>
    )
}

interface StatCardProps {
    title: string
    value: string
    total: string
    color: string
}

function StatCard({ title, value, total, color }: StatCardProps) {
    const percentage = (parseInt(value) / parseInt(total)) * 100

    return (
        <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{value}</span>
                <span className="text-sm text-muted-foreground">/ {total}</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div
                    className={`h-full ${color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
