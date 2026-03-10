"use client"

import React, { useState, useEffect } from "react"

// Simulates the skier going down with real-time energy bars
export function EnergiaConservacionVisual() {
    const [t, setT] = useState(0) // 0 to 1 representing the journey
    const [running, setRunning] = useState(false)

    useEffect(() => {
        let raf: number
        let start: number | null = null
        const duration = 4000

        if (running) {
            const animate = (timestamp: number) => {
                if (!start) start = timestamp
                const elapsed = timestamp - start
                const progress = Math.min(elapsed / duration, 1)
                setT(progress)
                if (progress < 1) {
                    raf = requestAnimationFrame(animate)
                } else {
                    setRunning(false)
                }
            }
            raf = requestAnimationFrame(animate)
        }
        return () => cancelAnimationFrame(raf)
    }, [running])

    const handleStart = () => {
        setT(0)
        setTimeout(() => setRunning(true), 50)
    }

    // Energy values: EP decreases, EC increases, heat grows slowly, total = 1000J
    const ep = Math.round(1000 * (1 - t))
    const heat = Math.round(1000 * t * 0.12) // 12% becomes heat via friction
    const ec = 1000 - ep - heat

    // Skier position along the slope
    const skierX = 60 + t * 380
    const skierY = 220 - (1 - t) * 150

    const barScale = 180 / 1000

    return (
        <div className="w-full rounded-3xl border border-slate-200 dark:border-zinc-700 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-zinc-900 dark:to-zinc-950 shadow-lg">
            <div className="px-6 pt-5 pb-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-200 mb-1">
                    La energía total siempre se conserva
                </h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                    Presiona "¡Lanzar!" y observa cómo la energía se transforma, pero la <strong>suma siempre es 1000 J</strong>.
                </p>
            </div>

            <svg viewBox="0 0 600 260" width="100%" aria-label="Conservación de energía animada">
                <defs>
                    <linearGradient id="cons_slope" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    <linearGradient id="cons_ep" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                    <linearGradient id="cons_ec" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="cons_heat" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#fca5a5" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>

                {/* BG */}
                <rect x="0" y="0" width="600" height="260" fill="#f8fafc" />

                {/* Slope */}
                <polygon points="40,235 40,70 440,235" fill="url(#cons_slope)" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="40" y1="70" x2="440" y2="235" stroke="#94a3b8" strokeWidth="3" />
                {/* Flat ground */}
                <rect x="440" y="233" width="120" height="27" fill="#e2e8f0" />
                <line x1="440" y1="233" x2="560" y2="233" stroke="#94a3b8" strokeWidth="2" />

                {/* Skier */}
                <g transform={`translate(${skierX}, ${skierY})`} style={{ transition: running ? "none" : "all 0.3s ease" }}>
                    <g transform={t > 0.05 && t < 0.95 ? "rotate(-21)" : "rotate(0)"}>
                        <circle cy="-26" r="8" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
                        <rect x="-5" y="-18" width="11" height="14" rx="3" fill="#4f46e5" />
                        <line x1="-5" y1="-14" x2="-14" y2="-7" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="6" y1="-14" x2="13" y2="-9" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="-2" y1="-4" x2="-3" y2="3" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" />
                        <line x1="2" y1="-4" x2="3" y2="3" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" />
                        <line x1="-11" y1="4" x2="1" y2="4" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="-1" y1="4" x2="11" y2="4" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                    {/* Speed particles when moving */}
                    {running && t > 0.1 && t < 0.9 && (
                        <>
                            <line x1="-20" y1="-15" x2="-35" y2="-15" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                            <line x1="-18" y1="-8" x2="-30" y2="-8" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                        </>
                    )}
                </g>

                {/* Energy Bars Section */}
                {/* EP Bar */}
                <rect x="480" y="35" width="28" height="185" rx="6" fill="#e0e7ff" />
                <rect
                    x="480"
                    y={35 + 185 - ep * barScale}
                    width="28"
                    height={ep * barScale}
                    rx="6"
                    fill="url(#cons_ep)"
                    style={{ transition: running ? "none" : "all 0.3s ease" }}
                />
                <text x="494" y="28" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">Ep</text>
                <text x="494" y="232" fill="#4f46e5" fontSize="10" fontWeight="bold" textAnchor="middle">{ep}J</text>

                {/* EC Bar */}
                <rect x="515" y="35" width="28" height="185" rx="6" fill="#fef3c7" />
                <rect
                    x="515"
                    y={35 + 185 - ec * barScale}
                    width="28"
                    height={Math.max(0, ec * barScale)}
                    rx="6"
                    fill="url(#cons_ec)"
                    style={{ transition: running ? "none" : "all 0.3s ease" }}
                />
                <text x="529" y="28" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Ec</text>
                <text x="529" y="232" fill="#d97706" fontSize="10" fontWeight="bold" textAnchor="middle">{ec}J</text>

                {/* Heat Bar */}
                <rect x="550" y="35" width="28" height="185" rx="6" fill="#fee2e2" />
                <rect
                    x="550"
                    y={35 + 185 - heat * barScale}
                    width="28"
                    height={heat * barScale}
                    rx="6"
                    fill="url(#cons_heat)"
                    style={{ transition: running ? "none" : "all 0.3s ease" }}
                />
                <text x="564" y="28" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">🔥</text>
                <text x="564" y="232" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">{heat}J</text>

                {/* Total line */}
                <line x1="475" y1="35" x2="583" y2="35" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4,3" />
                <text x="529" y="18" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Total = 1000 J
                </text>
            </svg>

            {/* Total indicator */}
            <div className="mx-6 mb-4 p-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex justify-around items-center text-sm font-bold">
                <span className="text-indigo-600 dark:text-indigo-400">Ep: {ep} J</span>
                <span className="text-slate-400">+</span>
                <span className="text-amber-600 dark:text-amber-400">Ec: {ec} J</span>
                <span className="text-slate-400">+</span>
                <span className="text-red-500">🔥 {heat} J</span>
                <span className="text-slate-400">=</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-base">1000 J ✓</span>
            </div>

            <div className="pb-5 flex justify-center">
                <button
                    onClick={handleStart}
                    disabled={running}
                    className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold text-sm transition-all shadow-md hover:shadow-indigo-200 dark:hover:shadow-none"
                >
                    {running ? "Bajando... 🎿" : t === 0 ? "¡Lanzar! 🎿" : "¡Repetir! 🎿"}
                </button>
            </div>
        </div>
    )
}
