"use client"

import React, { useState, useEffect, useCallback } from "react"

const STEPS = [
    {
        label: "En la cima",
        ep: 100,
        ec: 0,
        skierX: 120,
        skierY: 82,
        desc: "Toda la energía está guardada como Energía Potencial (Ep). El esquiador no se mueve.",
    },
    {
        label: "A mitad",
        ep: 60,
        ec: 40,
        skierX: 280,
        skierY: 178,
        desc: "Al bajar, la Ep se convierte en Energía Cinética (Ec). ¡El esquiador empieza a moverse!",
    },
    {
        label: "En la base",
        ep: 5,
        ec: 85,
        skierX: 450,
        skierY: 248,
        desc: "Casi toda la Ep se convirtió en Ec. El 10% se perdió como calor por fricción con la nieve.",
        heat: 10,
    },
]

export function EnergiaCineticaVisual() {
    const [step, setStep] = useState(0)
    const [animating, setAnimating] = useState(false)

    const goNext = useCallback(() => {
        if (step < STEPS.length - 1 && !animating) {
            setAnimating(true)
            setTimeout(() => {
                setStep(s => s + 1)
                setAnimating(false)
            }, 300)
        }
    }, [step, animating])

    const goPrev = useCallback(() => {
        if (step > 0 && !animating) {
            setAnimating(true)
            setTimeout(() => {
                setStep(s => s - 1)
                setAnimating(false)
            }, 300)
        }
    }, [step, animating])

    const current = STEPS[step]
    const barMaxH = 90

    return (
        <div className="w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-700 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-zinc-900 shadow-lg select-none">
            {/* Mountain scene */}
            <svg viewBox="0 0 600 290" width="100%" aria-label="Transformación de energía al bajar la pendiente">
                <defs>
                    <linearGradient id="ec_skyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e0f2fe" />
                        <stop offset="100%" stopColor="#f0f9ff" />
                    </linearGradient>
                    <linearGradient id="ec_snowGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                    <linearGradient id="epBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <linearGradient id="ecBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                </defs>

                {/* Sky */}
                <rect x="0" y="0" width="600" height="290" fill="url(#ec_skyGrad)" />

                {/* Slope */}
                <polygon points="50,270 50,90 490,270" fill="url(#ec_snowGrad)" />
                <line x1="50" y1="90" x2="490" y2="270" stroke="#94a3b8" strokeWidth="3" />
                {/* Ground flat */}
                <rect x="490" y="268" width="110" height="22" fill="#cbd5e1" />
                <rect x="0" y="268" width="55" height="22" fill="#94a3b8" />

                {/* Height indicator */}
                <line x1="32" y1="95" x2="32" y2="265" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,4" />
                <polygon points="32,82 26,98 38,98" fill="#6366f1" />
                <polygon points="32,278 26,262 38,262" fill="#6366f1" />
                <text x="20" y="182" fill="#6366f1" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90,20,182)">h</text>

                {/* Energy bars background */}
                <rect x="510" y="110" width="40" height={barMaxH + 10} rx="5" fill="#e2e8f0" opacity="0.7" />
                <rect x="555" y="110" width="40" height={barMaxH + 10} rx="5" fill="#e2e8f0" opacity="0.7" />

                {/* EP Bar */}
                <rect
                    x="510"
                    y={110 + barMaxH - (current.ep / 100) * barMaxH}
                    width="40"
                    height={(current.ep / 100) * barMaxH}
                    rx="4"
                    fill="url(#epBar)"
                    style={{ transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)" }}
                />

                {/* EC Bar */}
                <rect
                    x="555"
                    y={110 + barMaxH - (current.ec / 100) * barMaxH}
                    width="40"
                    height={(current.ec / 100) * barMaxH}
                    rx="4"
                    fill="url(#ecBar)"
                    style={{ transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)" }}
                />

                {/* Bar labels */}
                <text x="530" y="107" fill="#6366f1" fontSize="10" fontWeight="bold" textAnchor="middle">Ep</text>
                <text x="575" y="107" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Ec</text>
                <text x="530" y="225" fill="#6366f1" fontSize="11" fontWeight="bold" textAnchor="middle">{current.ep}%</text>
                <text x="575" y="225" fill="#d97706" fontSize="11" fontWeight="bold" textAnchor="middle">{current.ec}%</text>

                {/* Heat label if applicable */}
                {current.heat && (
                    <text x="542" y="240" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">
                        🔥 {current.heat}% calor
                    </text>
                )}

                {/* Skier */}
                <g
                    transform={`translate(${current.skierX}, ${current.skierY})`}
                    style={{ transition: "all 1s cubic-bezier(0.4,0,0.2,1)" }}
                >
                    {/* Tilt skier based on slope */}
                    <g transform={step === 0 ? "rotate(0)" : step === 1 ? "rotate(-30)" : "rotate(0)"} style={{ transition: "all 1s ease" }}>
                        <circle cy="-30" r="9" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" /> {/* head */}
                        <rect x="-6" y="-22" width="12" height="16" rx="3" fill="#6366f1" /> {/* body */}
                        <line x1="-6" y1="-18" x2="-16" y2="-10" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                        <line x1="6" y1="-18" x2="14" y2="-12" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                        <line x1="-3" y1="-6" x2="-4" y2="4" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" />
                        <line x1="3" y1="-6" x2="4" y2="4" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" />
                        <line x1="-12" y1="5" x2="2" y2="5" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                        <line x1="0" y1="5" x2="14" y2="5" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                    </g>
                </g>

                {/* Step label */}
                <rect x="155" y="16" width="300" height="40" rx="10" fill="white" fillOpacity="0.85" />
                <text x="305" y="40" fill="#1e293b" fontSize="15" fontWeight="bold" textAnchor="middle">
                    {current.label}
                </text>
            </svg>

            {/* Description card */}
            <div className="px-6 pb-4 pt-2">
                <p
                    className="text-center text-slate-700 dark:text-zinc-300 text-base font-medium leading-relaxed min-h-[56px]"
                    style={{ transition: "opacity 0.4s ease" }}
                >
                    {current.desc}
                </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between px-6 pb-5">
                <button
                    onClick={goPrev}
                    disabled={step === 0}
                    className="px-5 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-sm disabled:opacity-30 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all"
                >
                    ← Anterior
                </button>
                <div className="flex gap-2">
                    {STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all ${i === step ? "bg-indigo-500 scale-125" : "bg-slate-300 dark:bg-zinc-600"}`}
                        />
                    ))}
                </div>
                <button
                    onClick={goNext}
                    disabled={step === STEPS.length - 1}
                    className="px-5 py-2 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-bold text-sm disabled:opacity-30 hover:bg-amber-200 dark:hover:bg-amber-800 transition-all"
                >
                    Siguiente →
                </button>
            </div>
        </div>
    )
}
