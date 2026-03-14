"use client"

import React, { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"
import 'katex/dist/katex.min.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'

function Math({ math, block }: { math: string; block?: boolean }) {
    const html = katex.renderToString(math, {
        throwOnError: false,
        displayMode: block
    })
    return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export function LogarithmExample1Visual() {
    const [step, setStep] = useState(0)
    const base = 3
    const argument = 9
    const result = 2

    const handleNext = () => {
        if (step < 2) {
            setStep(step + 1)
        } else {
            setStep(0)
        }
    }

    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 w-full min-h-[200px] flex items-center justify-center bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-inner relative overflow-hidden">
                    <svg viewBox="0 0 400 200" className="w-full h-full font-quicksand">
                        {step === 0 && (
                            <g className="animate-in fade-in zoom-in duration-500">
                                <foreignObject x="0" y="50" width="400" height="100">
                                    <div className="flex items-center justify-center h-full w-full">
                                        <div className="text-5xl text-emerald-600 dark:text-emerald-400 font-black">
                                            <Math math={`\\log_{${base}} ${argument}`} />
                                        </div>
                                    </div>
                                </foreignObject>
                            </g>
                        )}
                        {step === 1 && (
                            <g className="animate-in slide-in-from-right duration-500">
                                <rect x="50" y="70" width="60" height="60" rx="12" className="fill-emerald-100 stroke-emerald-500" strokeWidth="2" />
                                <text x="80" y="108" textAnchor="middle" className="text-2xl font-bold fill-emerald-700">3</text>
                                
                                <text x="140" y="105" textAnchor="middle" className="text-3xl font-bold fill-slate-300">×</text>
                                
                                <rect x="170" y="70" width="60" height="60" rx="12" className="fill-emerald-100 stroke-emerald-500" strokeWidth="2" />
                                <text x="200" y="108" textAnchor="middle" className="text-2xl font-bold fill-emerald-700">3</text>
                                
                                <text x="260" y="105" textAnchor="middle" className="text-3xl font-bold fill-slate-400">=</text>
                                
                                <text x="320" y="108" textAnchor="middle" className="text-4xl font-black fill-emerald-600">9</text>
                            </g>
                        )}
                        {step === 2 && (
                            <g className="animate-in zoom-in duration-500">
                                <circle cx="200" cy="100" r="80" className="fill-emerald-500/10 stroke-emerald-500 stroke-[4]" strokeDasharray="12 6" />
                                <text x="200" y="90" textAnchor="middle" className="text-2xl font-bold fill-slate-500 uppercase tracking-widest">Resultado</text>
                                <text x="200" y="135" textAnchor="middle" className="text-7xl font-black fill-emerald-600">2</text>
                            </g>
                        )}
                    </svg>
                </div>
                
                <div className="flex-1 space-y-4">
                    <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
                        Paso {step + 1} de 3
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">¿Cuántas veces es 3 para llegar a 9?</h4>
                    <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                        {step === 0 && (
                            <span>Queremos encontrar <Math math={`\\log_{${base}} ${argument}`} />. El {base} es nuestra base.</span>
                        )}
                        {step === 1 && `Multiplicamos el ${base} por sí mismo: ${base} × ${base} = ${argument}. ¡Ya llegamos!`}
                        {step === 2 && `Como usamos el número ${base} dos veces, el resultado es ${result}.`}
                    </p>
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition-all shadow-md shadow-emerald-100 dark:shadow-none"
                    >
                        {step === 2 ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {step === 2 ? "Reiniciar" : "Ver siguiente paso"}
                    </button>
                </div>
            </div>
        </div>
    )
}
