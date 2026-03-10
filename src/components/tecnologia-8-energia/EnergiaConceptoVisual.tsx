"use client"

import React, { useState, useEffect } from "react"

export function EnergiaConceptoVisual() {
    const [pulse, setPulse] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setPulse(prev => !prev)
        }, 1200)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-700 bg-gradient-to-b from-sky-100 to-cyan-50 dark:from-sky-950 dark:to-zinc-900 shadow-lg">
            <svg viewBox="0 0 600 320" width="100%" aria-label="Esquiador en la cima de la montaña con energía potencial">
                {/* Sky gradient */}
                <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#bae6fd" />
                        <stop offset="100%" stopColor="#e0f2fe" />
                    </linearGradient>
                    <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e2e8f0" />
                        <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
                        <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.15" />
                    </filter>
                </defs>

                {/* Sky */}
                <rect x="0" y="0" width="600" height="320" fill="url(#skyGrad)" />

                {/* Sun */}
                <circle cx="520" cy="55" r="30" fill="#fde68a" opacity="0.9" />
                <circle cx="520" cy="55" r="22" fill="#fbbf24" />
                {[0,45,90,135,180,225,270,315].map((angle, i) => (
                    <line
                        key={i}
                        x1={520 + Math.cos(angle * Math.PI / 180) * 26}
                        y1={55 + Math.sin(angle * Math.PI / 180) * 26}
                        x2={520 + Math.cos(angle * Math.PI / 180) * 38}
                        y2={55 + Math.sin(angle * Math.PI / 180) * 38}
                        stroke="#fbbf24"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                ))}

                {/* Mountain body */}
                <polygon points="50,290 300,60 550,290" fill="url(#mountainGrad)" />
                {/* Snow cap */}
                <polygon points="240,110 300,60 360,110 340,115 300,75 260,115" fill="url(#snowGrad)" />

                {/* Ground */}
                <rect x="0" y="288" width="600" height="32" fill="#94a3b8" rx="0" />
                <rect x="0" y="288" width="600" height="8" fill="#cbd5e1" rx="0" />

                {/* Height arrow */}
                <line x1="80" y1="80" x2="80" y2="270" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6,4" />
                <polygon points="80,65 74,82 86,82" fill="#3b82f6" />
                <polygon points="80,285 74,268 86,268" fill="#3b82f6" />
                <text x="55" y="180" fill="#3b82f6" fontSize="13" fontWeight="bold" textAnchor="middle" transform="rotate(-90,55,180)">Altura (h)</text>

                {/* Skier body */}
                {/* skier at peak ~ x=300 y=60, standing on snow*/}
                {/* body */}
                <circle cx="301" cy="43" r="9" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" /> {/* head */}
                <rect x="295" y="52" width="12" height="18" rx="3" fill="#3b82f6" /> {/* torso */}
                {/* arms */}
                <line x1="295" y1="57" x2="283" y2="68" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                <line x1="307" y1="57" x2="316" y2="63" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                {/* poles */}
                <line x1="283" y1="68" x2="279" y2="80" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                <line x1="316" y1="63" x2="318" y2="75" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                {/* legs */}
                <line x1="299" y1="70" x2="295" y2="82" stroke="#1e40af" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="303" y1="70" x2="307" y2="82" stroke="#1e40af" strokeWidth="3.5" strokeLinecap="round" />
                {/* skis */}
                <line x1="287" y1="83" x2="302" y2="83" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                <line x1="300" y1="83" x2="315" y2="83" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

                {/* Energy bank label - pulsing */}
                <rect
                    x="330" y="20" width="200" height="55" rx="12"
                    fill="#fffbeb"
                    stroke={pulse ? "#f59e0b" : "#fde68a"}
                    strokeWidth={pulse ? "3" : "2"}
                    filter="url(#shadow)"
                    style={{ transition: "all 0.6s ease" }}
                />
                <text x="430" y="42" fill="#92400e" fontSize="13" fontWeight="bold" textAnchor="middle">⚡ Energía Potencial</text>
                <text x="430" y="60" fill="#b45309" fontSize="12" textAnchor="middle">¡Guardada y lista para usarse!</text>

                {/* Arrow from skier to label */}
                <line x1="320" y1="48" x2="333" y2="48" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Thought bubble arrows - pulsing up */}
                <text
                    x="301" y={pulse ? "22" : "18"}
                    fontSize="18"
                    textAnchor="middle"
                    style={{ transition: "all 0.6s ease" }}
                >
                    🤔
                </text>

                {/* Bottom label */}
                <text x="300" y="309" fill="#475569" fontSize="12" fontWeight="600" textAnchor="middle">
                    El esquiador está quieto... ¿pero tiene energía?
                </text>
            </svg>
        </div>
    )
}
