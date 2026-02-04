"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { Button } from "@/components/ui/sidebar/button"
import { 
    Calculator, 
    CheckCircle2, 
    XCircle, 
    Trophy,
    RotateCcw
} from "lucide-react"
import { cn } from "@/lib/utils"

// --- Local UI Components ---

const ActivityCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn(
        "bg-white dark:bg-zinc-900 rounded-3xl border border-slate-400 dark:border-zinc-800 shadow-xl overflow-hidden transition-all duration-500",
        className
    )}>
        {children}
    </div>
)

// Updated geometric components to match AdicionNaturalesPage and details from prompt
// Thousands: Large Purple/Violet squares (New addition for 4 digits)
// Thousands: Purple/Violet Triangle (Height of tens)
const ThousandTriangle = ({ className }: { className?: string }) => (
    <div className={cn("w-10 h-10 drop-shadow-sm flex items-center justify-center", className)}>
        <svg viewBox="0 0 100 100" className="w-full h-full fill-violet-500 stroke-violet-600 stroke-[8]">
             <polygon points="50,10 10,90 90,90" strokeLinejoin="round" />
        </svg>
    </div>
)

// Hundreds: Large yellow squares
const HundredSquare = ({ className }: { className?: string }) => (
    <div className={cn("w-12 h-12 bg-amber-400 rounded-lg shadow-md border-2 border-amber-500", className)} />
)

// Tens: Small green squares (represented slightly larger here for visibility in the set)
const TenSquare = ({ className }: { className?: string }) => (
    <div className={cn("w-8 h-8 bg-emerald-500 rounded-sm shadow-sm border border-emerald-600", className)} />
)

// Units: Blue circles
const UnitCircle = ({ className }: { className?: string }) => (
    <div className={cn("w-6 h-6 rounded-full bg-blue-500 shadow-sm border border-blue-600", className)} />
)

// --- Types ---

type ExerciseData = {
    id: number
    title: string
    description?: string
    type: "addition" | "subtraction" | "geometric_construction" | "geometric_subtraction"
    rows: string[] 
    result: string | null // Null to hide result
    options: string[]

    correctAnswers: string[]
    geometric: { thousands?: number, hundreds: number, tens: number, units: number }
    initialGeometric?: { thousands?: number, hundreds: number, tens: number, units: number }
    inputMode?: boolean
}

const exercises: ExerciseData[] = [
    {
        id: 1,
        title: "Suma de Números Naturales",
        type: "addition",
        rows: ["80", "_"],
        result: null,
        options: ["6", "7", "8", "9"],
        correctAnswers: ["7"],
        geometric: { hundreds: 0, tens: 8, units: 7 }
    },
    {
        id: 2,
        title: "Suma de Números Naturales",
        type: "addition",
        rows: ["200", "__0", "18"],
        result: null,
        options: ["1", "3", "5", "7"],
        correctAnswers: ["1", "5"], // 150 -> 1 and 5
        geometric: { hundreds: 2, tens: 15, units: 18 }
    },
    {
        id: 3,
        title: "Suma de Números Naturales",
        description: "Observa las figuras geométricas y completa el algoritmo de la suma arrastrando los valores correctos a las casillas vacías.",
        type: "addition",
        rows: ["_00", "_0", "4"],
        result: null,
        options: ["1", "2", "3", "4"],
        correctAnswers: ["3", "1"], // 300, 10
        geometric: { hundreds: 1, tens: 19, units: 24 }
    },
    {
        id: 4,
        title: "Construcción Geométrica",
        description: "Observa el algoritmo de la suma y construye la representación geométrica correspondiente utilizando la menor cantidad de figuras posible.",
        type: "geometric_construction",
        rows: ["210", "22", "4"],
        result: null,
        options: ["100", "10", "1"],
        correctAnswers: [],
        geometric: { hundreds: 2, tens: 3, units: 6 },
        initialGeometric: { hundreds: 1, tens: 1, units: 1 }
    },
    {
        id: 5,
        title: "Construcción Geométrica",
        description: "Observa el algoritmo de la suma y construye la representación geométrica correspondiente utilizando la menor cantidad de figuras posible.",
        type: "geometric_construction",
        rows: ["248", "105", "54"],
        result: null,
        options: ["100", "10", "1"],
        correctAnswers: [],
        geometric: { hundreds: 4, tens: 0, units: 7 }, // 248 + 105 + 54 = 407
        initialGeometric: { hundreds: 1, tens: 0, units: 1 }
    },
    {
        id: 6,
        title: "Sustracción de Números Naturales",
        type: "subtraction",
        description: "Observa la representación geométrica del resultado (diferencia) y completa el minuendo arrastrando los valores correctos.",
        rows: ["_7_", "221"],
        result: null,
        options: ["3", "5", "6", "9"], // Options adjusted to include accurate answers
        correctAnswers: ["6", "9"], // 679
        geometric: { hundreds: 4, tens: 5, units: 8 } // Result: 458 (679 - 221)
    },
    {
        id: 7,
        title: "Sustracción (Algoritmo)",
        description: "Completa los espacios en blanco del algoritmo de la resta.",
        type: "subtraction",
        inputMode: true,
        rows: ["__53", "6_8"],
        result: "62_",
        options: [],
        correctAnswers: ["1", "2", "2", "5"],
        geometric: { hundreds: 0, tens: 0, units: 0 }
    },
    {
        id: 8,
        title: "Sustracción con Miles",
        description: "Observa la representación geométrica del resultado y completa los espacios del algoritmo.",
        type: "subtraction",
        inputMode: true,
        rows: ["__59", "__"],
        result: null,
        options: [],
        correctAnswers: ["4", "7", "7", "7"], // 4759 - 77
        geometric: { thousands: 4, hundreds: 6, tens: 8, units: 2 } // Result 4682
    },
    {
        id: 9,
        title: "Sustracción (Ceros en el Resultado)",
        description: "Completa los espacios en blanco para que el resultado coincida con la representación geométrica.",
        type: "subtraction",
        inputMode: true,
        rows: ["13_27", "_16_"],
        result: null,
        options: [],
        correctAnswers: ["2", "9", "7"], // 13227 - 9167 = 4060
        geometric: { thousands: 4, hundreds: 0, tens: 6, units: 0 }
    }
]

export default function ActividadAdicionSustraccionPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "Actividad: Adición y Sustracción" },
    ]

    const [selectedOptions, setSelectedOptions] = React.useState<Record<string, string | null>>({})
    const [geometricAnswers, setGeometricAnswers] = React.useState<Record<string, number>>({})
    const [submittedExercises, setSubmittedExercises] = React.useState<Record<number, boolean>>({})

    const [, setDraggedItem] = React.useState<string | null>(null)
    const [isOverDropZone, setIsOverDropZone] = React.useState<string | null>(null)

    const handleDragStart = (e: React.DragEvent, option: string) => {
        setDraggedItem(option)
        e.dataTransfer.setData("text/plain", option)
    }

    const handleDrop = (e: React.DragEvent, exerciseId: number, boxIndex: number) => {
        e.preventDefault()
        const option = e.dataTransfer.getData("text/plain")
        const key = `${exerciseId}-${boxIndex}`
        // In drag mode, usually prevent overwriting if strict, but here we can just overwrite
        
        setSelectedOptions(prev => ({ ...prev, [key]: option }))
        setDraggedItem(null)
        setIsOverDropZone(null)
    }

    const handleInput = (val: string, exerciseId: number, boxIndex: number) => {
        // Allow only digits
        if (val && !/^\d$/.test(val)) return
        
        const key = `${exerciseId}-${boxIndex}`
        setSelectedOptions(prev => ({ ...prev, [key]: val }))
    }

    const handleGeometricDrop = (e: React.DragEvent, exerciseId: number, type: "hundreds" | "tens" | "units") => {
        e.preventDefault()
        const option = e.dataTransfer.getData("text/plain")
        
        // Validate correct shape is dropped
        if ((type === "hundreds" && option !== "100") || 
            (type === "tens" && option !== "10") || 
            (type === "units" && option !== "1")) return

        const key = `${exerciseId}-${type}`
        setGeometricAnswers(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
        setIsOverDropZone(null)
    }

    const handleSubmit = (exerciseId: number) => {
        setSubmittedExercises(prev => ({ ...prev, [exerciseId]: true }))
    }

    const resetExercise = (exerciseId: number) => {
        const resetObj: Record<string, string | null> = {}
        const ex = exercises.find(e => e.id === exerciseId)
        if (ex) {
            ex.correctAnswers.forEach((_, i) => {
                resetObj[`${exerciseId}-${i}`] = null
            })
        }

        setSelectedOptions(prev => ({ ...prev, ...resetObj }))

        // Reset geometric answers
        setGeometricAnswers(prev => {
            const newState = { ...prev }
            delete newState[`${exerciseId}-hundreds`]
            delete newState[`${exerciseId}-tens`]
            delete newState[`${exerciseId}-units`]
            return newState
        })
        setSubmittedExercises(prev => ({ ...prev, [exerciseId]: false }))
    }

    const isExerciseComplete = (exerciseId: number) => {
        const ex = exercises.find(e => e.id === exerciseId)
        if (!ex) return false
        
        if (ex.type === "geometric_construction" || ex.type === "geometric_subtraction") {
            // Consider complete if total shapes > initial shapes. 
            // Or simply always allow submission for this type.
            return true 
        }

        return ex.correctAnswers.every((_, i) => selectedOptions[`${exerciseId}-${i}`])
    }

    const isExerciseCorrect = (exerciseId: number) => {
        const ex = exercises.find(e => e.id === exerciseId)
        if (!ex) return false

        if (ex.type === "geometric_construction" || ex.type === "geometric_subtraction") {
            const h = (ex.initialGeometric?.hundreds || 0) + (geometricAnswers[`${exerciseId}-hundreds`] || 0)
            const t = (ex.initialGeometric?.tens || 0) + (geometricAnswers[`${exerciseId}-tens`] || 0)
            const u = (ex.initialGeometric?.units || 0) + (geometricAnswers[`${exerciseId}-units`] || 0)
            return h === ex.geometric.hundreds && t === ex.geometric.tens && u === ex.geometric.units
        }

        return ex.correctAnswers.every((ans, i) => selectedOptions[`${exerciseId}-${i}`] === ans)
    }

    const allCorrect = exercises.every(ex => isExerciseCorrect(ex.id))

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="Actividad: Adición y Sustracción de Números Naturales"
                icon={<Calculator className="h-10 w-10 text-blue-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {exercises.map((ex) => (
                        <div key={ex.id} className="space-y-6">
                            <p className="text-xl text-slate-600 dark:text-zinc-400 font-medium leading-relaxed">
                                {ex.description}
                            </p>
                            <ActivityCard className="p-8 md:p-12 space-y-10 border-2 dark:border-zinc-800 animate-in slide-in-from-bottom-8 duration-700">
                                <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-end">
                                    
                                    {/* Left: Algorithm */}

                                    <div className={cn(
                                        "flex flex-col items-center justify-center bg-slate-50/50 dark:bg-zinc-800/20 rounded-3xl p-8 min-w-[280px]",
                                        (ex.geometric.hundreds === 0 && ex.geometric.tens === 0 && ex.geometric.units === 0 && !ex.initialGeometric) 
                                            ? "w-full lg:w-1/2 lg:mx-auto" 
                                            : "w-full lg:w-auto"
                                    )}>
                                        <div className="font-mono text-5xl md:text-6xl tracking-widest text-slate-800 dark:text-zinc-200 relative w-fit">
                                            <div className="flex flex-col items-end space-y-4 border-b-4 border-slate-300 dark:border-zinc-700 pb-4">
                                                {ex.rows.map((row, rowIndex) => {
                                                    let localBoxCounter = 0;
                                                    // Count previous boxes to uniquely identify. Only count '_' 
                                                    const previousBoxes = ex.rows.slice(0, rowIndex).reduce((acc, r) => acc + (r.split('_').length - 1), 0);
                                                    
                                                    return (
                                                        <div key={rowIndex} className="relative flex items-center leading-none justify-end w-full">
                                                            {rowIndex === ex.rows.length - 1 && (
                                                                <span className={cn(
                                                                    "absolute text-4xl",
                                                                    ex.rows[0].length > row.length ? "-left-14" : "-left-8"
                                                                )}>
                                                                    {ex.type === "subtraction" || ex.type === "geometric_subtraction" ? "-" : "+"}
                                                                </span>
                                                            )}
                                                            {row.split('').map((char, charIndex) => {
                                                                if (char === '_') {
                                                                    const currentBoxIndex = previousBoxes + localBoxCounter++;
                                                                    const key = `${ex.id}-${currentBoxIndex}`;
                                                                    const isCorrect = selectedOptions[key] === ex.correctAnswers[currentBoxIndex];
                                                                    return ex.inputMode ? (
                                                                        <input
                                                                            key={charIndex}
                                                                            className={cn(
                                                                                "w-12 h-16 mx-0.5 border-4 border-dashed rounded-xl text-center text-4xl bg-white dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                                                selectedOptions[key]
                                                                                    ? (isCorrect ? "border-emerald-500 text-emerald-600" : "border-rose-500 text-rose-600")
                                                                                    : "border-slate-300 dark:border-zinc-600"
                                                                            )}
                                                                            maxLength={1}
                                                                            value={selectedOptions[key] || ""}
                                                                            onChange={(e) => handleInput(e.target.value, ex.id, currentBoxIndex)}
                                                                        />
                                                                    ) : (
                                                                        <div 
                                                                            key={charIndex}
                                                                            onDragOver={(e) => { e.preventDefault(); setIsOverDropZone(key) }}
                                                                            onDragLeave={() => setIsOverDropZone(null)}
                                                                            onDrop={(e) => handleDrop(e, ex.id, currentBoxIndex)}
                                                                            className={cn(
                                                                                "w-12 h-16 mx-0.5 border-4 border-dashed rounded-xl flex items-center justify-center transition-all duration-300 text-4xl",
                                                                                selectedOptions[key] 
                                                                                    ? (isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-rose-500 bg-rose-50 text-rose-600")
                                                                                    : (isOverDropZone === key ? "border-blue-500 bg-blue-50/50 scale-105" : "border-slate-300 dark:border-zinc-700 bg-slate-100/50 dark:bg-zinc-800/50")
                                                                            )}
                                                                        >
                                                                            {selectedOptions[key] || ""}
                                                                        </div>
                                                                    );
                                                                }
                                                                // Use a fixed width span for digits to maintain alignment with boxes
                                                                return <span key={charIndex} className="w-12 text-center inline-block">{char}</span>;
                                                            })}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            {/* Result */}
                                            {ex.result && (
                                                <div className="pt-4 flex justify-end leading-none w-full">
                                                    <div className="relative flex items-center leading-none justify-end w-full">
                                                        {ex.result.split('').map((char, charIndex) => {
                                                            if (char === '_') {
                                                                const totalRowBoxes = ex.rows.reduce((acc, r) => acc + (r.split('_').length - 1), 0);
                                                                // Count previous results blanks if any (assuming single result line for now)
                                                                const previousResultBoxes = ex.result!.slice(0, charIndex).split('_').length - 1;
                                                                const currentBoxIndex = totalRowBoxes + previousResultBoxes;
                                                                
                                                                const key = `${ex.id}-${currentBoxIndex}`;
                                                                const isCorrect = selectedOptions[key] === ex.correctAnswers[currentBoxIndex];
                                                                
                                                                return ex.inputMode ? (
                                                                    <input
                                                                        key={`res-${charIndex}`}
                                                                        className={cn(
                                                                            "w-12 h-16 mx-0.5 border-4 border-dashed rounded-xl text-center text-4xl bg-white dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                                            selectedOptions[key]
                                                                                ? (isCorrect ? "border-emerald-500 text-emerald-600" : "border-rose-500 text-rose-600")
                                                                                : "border-slate-300 dark:border-zinc-600"
                                                                        )}
                                                                        maxLength={1}
                                                                        value={selectedOptions[key] || ""}
                                                                        onChange={(e) => handleInput(e.target.value, ex.id, currentBoxIndex)}
                                                                    />
                                                                ) : (
                                                                    <div 
                                                                        key={`res-${charIndex}`}
                                                                        onDragOver={(e) => { e.preventDefault(); setIsOverDropZone(key) }}
                                                                        onDragLeave={() => setIsOverDropZone(null)}
                                                                        onDrop={(e) => handleDrop(e, ex.id, currentBoxIndex)}
                                                                        className={cn(
                                                                            "w-12 h-16 mx-0.5 border-4 border-dashed rounded-xl flex items-center justify-center transition-all duration-300 text-4xl",
                                                                            selectedOptions[key] 
                                                                                ? (isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-rose-500 bg-rose-50 text-rose-600")
                                                                                : (isOverDropZone === key ? "border-blue-500 bg-blue-50/50 scale-105" : "border-slate-300 dark:border-zinc-700 bg-slate-100/50 dark:bg-zinc-800/50")
                                                                        )}
                                                                    >
                                                                        {selectedOptions[key] || ""}
                                                                    </div>
                                                                );
                                                            }
                                                            return <span key={`res-${charIndex}`} className="w-12 text-center inline-block">{char}</span>;
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right: Pista Visual */}
                                    {((ex.geometric.thousands && ex.geometric.thousands > 0) || ex.geometric.hundreds > 0 || ex.geometric.tens > 0 || ex.geometric.units > 0 || ex.initialGeometric) && (
                                        <div className="w-full lg:w-auto flex flex-col border-2 border-slate-300 dark:border-zinc-800 rounded-3xl p-8 bg-slate-50/30">
                                            
                                            {ex.type === "geometric_construction" || ex.type === "geometric_subtraction" ? (
                                                <div className="flex flex-col md:flex-row flex-wrap gap-4 items-start justify-center h-full min-h-[200px]">
                                                    {/* Hundreds Drop Zone */}
                                                    <div 
                                                        onDragOver={(e) => { e.preventDefault(); setIsOverDropZone(`${ex.id}-hundreds`) }}
                                                        onDragLeave={() => setIsOverDropZone(null)}
                                                        onDrop={(e) => handleGeometricDrop(e, ex.id, "hundreds")}
                                                        className={cn(
                                                            "flex flex-col items-center space-y-4 flex-1 min-w-[150px] p-4 rounded-xl transition-all border-2 border-dashed",
                                                            isOverDropZone === `${ex.id}-hundreds` ? "border-amber-400 bg-amber-50" : "border-slate-400 dark:border-zinc-700"
                                                        )}
                                                    >
                                                        <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-950 px-4 py-1.5 rounded-full shadow-sm">Centenas</span>
                                                        <div className="flex flex-wrap gap-4 justify-center">
                                                            {[...Array((ex.initialGeometric?.hundreds || 0) + (geometricAnswers[`${ex.id}-hundreds`] || 0))].map((_, i) => (
                                                                <HundredSquare key={`hundred-gen-${i}`} />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Tens Drop Zone */}
                                                    <div 
                                                        onDragOver={(e) => { e.preventDefault(); setIsOverDropZone(`${ex.id}-tens`) }}
                                                        onDragLeave={() => setIsOverDropZone(null)}
                                                        onDrop={(e) => handleGeometricDrop(e, ex.id, "tens")}
                                                        className={cn(
                                                            "flex flex-col items-center space-y-4 flex-1 min-w-[150px] p-4 rounded-xl transition-all border-2 border-dashed",
                                                            isOverDropZone === `${ex.id}-tens` ? "border-emerald-400 bg-emerald-50" : "border-slate-400 dark:border-zinc-700"
                                                        )}
                                                    >
                                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-4 py-1.5 rounded-full shadow-sm">Decenas</span>
                                                        <div className="flex flex-wrap gap-2 justify-center max-w-[200px]">
                                                            {[...Array((ex.initialGeometric?.tens || 0) + (geometricAnswers[`${ex.id}-tens`] || 0))].map((_, i) => (
                                                                <TenSquare key={`ten-gen-${i}`} />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Units Drop Zone */}
                                                    <div 
                                                        onDragOver={(e) => { e.preventDefault(); setIsOverDropZone(`${ex.id}-units`) }}
                                                        onDragLeave={() => setIsOverDropZone(null)}
                                                        onDrop={(e) => handleGeometricDrop(e, ex.id, "units")}
                                                        className={cn(
                                                            "flex flex-col items-center space-y-4 flex-1 min-w-[150px] p-4 rounded-xl transition-all border-2 border-dashed",
                                                            isOverDropZone === `${ex.id}-units` ? "border-blue-400 bg-blue-50" : "border-slate-400 dark:border-zinc-700"
                                                        )}
                                                    >
                                                        <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-950 px-4 py-1.5 rounded-full shadow-sm">Unidades</span>
                                                        <div className="flex flex-wrap gap-2 justify-center max-w-[200px]">
                                                            {[...Array((ex.initialGeometric?.units || 0) + (geometricAnswers[`${ex.id}-units`] || 0))].map((_, i) => (
                                                                <UnitCircle key={`unit-gen-${i}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex-1 flex flex-col gap-6 items-center justify-center overflow-hidden w-fit mx-auto">
                                                    {/* Thousands */}
                                                    {ex.geometric.thousands && ex.geometric.thousands > 0 && (
                                                        <div className="flex flex-col items-center space-y-4">
                                                            <span className="text-xs font-bold text-violet-600 bg-violet-100 dark:bg-violet-950 px-4 py-1.5 rounded-full shadow-sm">Unidades de Mil</span>
                                                            <div className="flex flex-wrap gap-4 justify-center">
                                                                {[...Array(ex.geometric.thousands)].map((_, i) => (
                                                                    <ThousandTriangle key={`thousand-${i}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Hundreds */}
                                                    {ex.geometric.hundreds > 0 && (
                                                        <div className="flex flex-col items-center space-y-4">
                                                            <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-950 px-4 py-1.5 rounded-full shadow-sm">Centenas</span>
                                                            <div className="flex flex-wrap gap-4 justify-center">
                                                                {[...Array(ex.geometric.hundreds)].map((_, i) => (
                                                                    <HundredSquare key={`hundred-${i}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Decenas */}
                                                    {ex.geometric.tens > 0 && (
                                                        <div className="flex flex-col items-center space-y-4">
                                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-4 py-1.5 rounded-full shadow-sm">Decenas</span>
                                                            <div className="flex flex-wrap gap-2 justify-center max-w-[300px]">
                                                                {[...Array(ex.geometric.tens)].map((_, i) => (
                                                                    <TenSquare key={`ten-${i}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Unidades */}
                                                    {ex.geometric.units > 0 && (
                                                        <div className="flex flex-col items-center space-y-4">
                                                            <span className="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-950 px-4 py-1.5 rounded-full shadow-sm">Unidades</span>
                                                            <div className="flex flex-wrap gap-2 justify-center max-w-[300px]">
                                                                {[...Array(ex.geometric.units)].map((_, i) => (
                                                                    <UnitCircle key={`unit-${i}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Bottom: Drag Options (Inside Card) */}
                                <div className="pt-6 border-t-2 border-slate-50 dark:border-zinc-800/50">
                                    <div className="flex flex-col items-center space-y-8">
                                        {isExerciseComplete(ex.id) && (
                                            <h3 className="text-lg font-bold text-slate-600 dark:text-zinc-400">
                                                Resultado del intento:
                                            </h3>
                                        )}
                                        
                                        <div className="flex flex-wrap justify-center gap-6">
                                            {!ex.inputMode && (
                                                ex.type === "geometric_construction" || ex.type === "geometric_subtraction" ? (
                                                    <>
                                                        <div
                                                            draggable={!isExerciseCorrect(ex.id)}
                                                            onDragStart={(e) => { e.dataTransfer.setData("text/plain", "100"); setDraggedItem("100") }}
                                                            className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-2 border-amber-200 cursor-grab hover:scale-105 active:cursor-grabbing shadow-sm"
                                                        >
                                                            <HundredSquare />
                                                        </div>
                                                        <div
                                                            draggable={!isExerciseCorrect(ex.id)}
                                                            onDragStart={(e) => { e.dataTransfer.setData("text/plain", "10"); setDraggedItem("10") }}
                                                            className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-2 border-emerald-200 cursor-grab hover:scale-105 active:cursor-grabbing shadow-sm"
                                                        >
                                                            <TenSquare />
                                                        </div>
                                                        <div
                                                            draggable={!isExerciseCorrect(ex.id)}
                                                            onDragStart={(e) => { e.dataTransfer.setData("text/plain", "1"); setDraggedItem("1") }}
                                                            className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white border-2 border-blue-200 cursor-grab hover:scale-105 active:cursor-grabbing shadow-sm"
                                                        >
                                                            <UnitCircle />
                                                        </div>
                                                    </>
                                                ) : (
                                                    ex.options.map((option, idx) => {
                                                        const isUsed = Object.values(selectedOptions).includes(option);
                                                        return (
                                                            <div
                                                                key={`${option}-${idx}`}
                                                                draggable={!isExerciseCorrect(ex.id)}
                                                                onDragStart={(e) => handleDragStart(e, option)}
                                                                className={cn(
                                                                    "w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl text-2xl font-bold shadow-lg transition-all duration-300",
                                                                    !isExerciseCorrect(ex.id)
                                                                        ? (isUsed ? "bg-slate-100 text-slate-300 opacity-50 cursor-not-allowed" : "bg-white dark:bg-zinc-800 border-2 border-slate-400 dark:border-zinc-700 cursor-grab hover:scale-110 active:cursor-grabbing hover:border-blue-400 hover:shadow-blue-100")
                                                                        : (ex.correctAnswers.includes(option) ? "bg-emerald-500 text-white scale-110 shadow-emerald-200" : "bg-slate-50 text-slate-300 dark:bg-zinc-800 dark:text-zinc-700 opacity-40")
                                                                )}
                                                            >
                                                                {option}
                                                            </div>
                                                        );
                                                    })
                                                )
                                            )}
                                        </div>

                                        {!submittedExercises[ex.id] ? (
                                            <div className="flex justify-center pt-4">
                                                <Button 
                                                    size="lg" 
                                                    onClick={() => handleSubmit(ex.id)}
                                                    disabled={!isExerciseComplete(ex.id)}
                                                    className="rounded-full px-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                                                >
                                                    Entregar
                                                </Button>
                                            </div>
                                        ) : (
                                            (isExerciseComplete(ex.id) || ex.type === "geometric_construction" || ex.type === "geometric_subtraction") && (
                                                <div className={cn(
                                                    "w-full max-w-2xl p-6 rounded-2xl border-2 flex items-center justify-between animate-in zoom-in-95 duration-300 mx-auto mt-8",
                                                    isExerciseCorrect(ex.id) 
                                                        ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-950" 
                                                        : "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-950"
                                                )}>
                                                    <div className="flex items-center gap-4">
                                                        {isExerciseCorrect(ex.id) ? (
                                                            <>
                                                                <div className="bg-emerald-500 p-2 rounded-full text-white">
                                                                    <CheckCircle2 className="h-6 w-6" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-emerald-800 dark:text-emerald-400">¡Correcto!</p>
                                                                    <p className="text-emerald-600 dark:text-emerald-500/80 text-sm">Has completado la operación correctamente.</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="bg-rose-500 p-2 rounded-full text-white">
                                                                    <XCircle className="h-6 w-6" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-rose-800 dark:text-rose-400">¡Inténtalo de nuevo!</p>
                                                                    <p className="text-rose-600 dark:text-rose-500/80 text-sm">Revisa tu respuesta.</p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                    {!isExerciseCorrect(ex.id) && (
                                                        <Button variant="outline" onClick={() => resetExercise(ex.id)} className="border-rose-300 text-rose-600 hover:bg-rose-50">
                                                            <RotateCcw className="h-4 w-4 mr-2" /> Reintentar
                                                        </Button>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </ActivityCard>
                        </div>
                    ))}

                    {/* Final Celebration */}
                    {allCorrect ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-1000">
                            <ActivityCard className="p-12 border-amber-200 bg-amber-50/30 dark:border-amber-900/30 w-full max-w-2xl">
                                <div className="relative mb-8">
                                    <div className="absolute -inset-4 rounded-full bg-amber-500/20 animate-ping" />
                                    <div className="h-32 w-32 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl relative">
                                        <Trophy className="h-16 w-16 text-white" />
                                    </div>
                                </div>
                                
                                <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">¡Excelente Trabajo!</h2>
                                <p className="text-xl text-slate-600 dark:text-zinc-400 mt-4">
                                    Has resuelto el ejercicio de adición correctamente.
                                </p>

                                <div className="pt-10 flex flex-wrap justify-center gap-4">
                                    <Button size="lg" variant="outline" onClick={() => setSelectedOptions({})} className="rounded-full px-8">
                                        Reiniciar
                                    </Button>
                                    <Button size="lg" asChild className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                                        <a href="/matematicas-7/adicion-naturales">
                                            Volver a Adición
                                        </a>
                                    </Button>
                                </div>
                            </ActivityCard>
                        </div>
                    ) : (
                        <div className="hidden" />
                    )}
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
