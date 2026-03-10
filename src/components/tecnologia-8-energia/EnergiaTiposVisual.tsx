"use client"

import React, { useState } from "react"

const TYPES = [
    {
        id: "termica",
        emoji: "🔥",
        name: "Térmica",
        color: "#ef4444",
        bg: "#fee2e2",
        darkBg: "#450a0a",
        desc: "La que sentimos como calor. Cuando los esquís rozan la nieve, ¡parte de la energía cinética se convierte en calor!",
        example: "Fricción del esquí con la nieve",
        svgContent: (
            <g>
                {/* Ski on snow */}
                <rect x="90" y="100" width="120" height="8" rx="4" fill="#0f172a" />
                <rect x="70" y="105" width="160" height="12" rx="2" fill="#e2e8f0" />
                {/* Friction sparks */}
                {[100, 120, 140, 160, 180].map((x, i) => (
                    <g key={i}>
                        <line
                            x1={x} y1="105"
                            x2={x - 5 + i * 2} y2={90 - i * 3}
                            stroke="#f97316" strokeWidth="2" strokeLinecap="round"
                        />
                        <circle cx={x - 5 + i * 2} cy={90 - i * 3} r="2.5" fill="#ef4444" />
                    </g>
                ))}
                <text x="150" y="135" fill="#b91c1c" fontSize="12" textAnchor="middle" fontWeight="bold">Fricción → Calor</text>
            </g>
        )
    },
    {
        id: "quimica",
        emoji: "⚡",
        name: "Química",
        color: "#16a34a",
        bg: "#dcfce7",
        darkBg: "#052e16",
        desc: "Almacenada en alimentos y combustibles. ¡La energía química de tu desayuno te da fuerza para subir la montaña!",
        example: "Alimentos, pilas, combustibles",
        svgContent: (
            <g>
                {/* Apple */}
                <ellipse cx="130" cy="100" rx="25" ry="28" fill="#ef4444" />
                <ellipse cx="130" cy="100" rx="18" ry="22" fill="#b91c1c" opacity="0.4" />
                <line x1="130" y1="72" x2="133" y2="63" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="138" cy="61" rx="9" ry="6" fill="#16a34a" />
                {/* Arrow → Energy */}
                <text x="162" y="105" fill="#64748b" fontSize="22">→</text>
                {/* Lightning bolt */}
                <polygon points="185,78 177,103 185,103 177,128" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
                <text x="150" y="142" fill="#15803d" fontSize="12" textAnchor="middle" fontWeight="bold">Comida → Movimiento</text>
            </g>
        )
    },
    {
        id: "electrica",
        emoji: "🔌",
        name: "Eléctrica",
        color: "#7c3aed",
        bg: "#ede9fe",
        darkBg: "#2e1065",
        desc: "La que fluye por los cables y carga tus dispositivos. ¡Las remontas de los esquíes también la usan!",
        example: "Cargar tu teléfono, remonta de esquís",
        svgContent: (
            <g>
                {/* Cable */}
                <path d="M90,105 Q130,80 170,105" stroke="#7c3aed" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Plug */}
                <rect x="75" y="96" width="20" height="18" rx="4" fill="#4c1d95" />
                <line x1="82" y1="96" x2="82" y2="88" stroke="#6d28d9" strokeWidth="3" strokeLinecap="round" />
                <line x1="89" y1="96" x2="89" y2="88" stroke="#6d28d9" strokeWidth="3" strokeLinecap="round" />
                {/* Phone */}
                <rect x="160" y="85" width="28" height="44" rx="5" fill="#1e293b" />
                <rect x="163" y="90" width="22" height="30" rx="2" fill="#818cf8" opacity="0.9" />
                <circle cx="174" cy="125" r="3" fill="#64748b" />
                {/* Electrons moving */}
                {[0, 1, 2].map(i => (
                    <circle key={i} cx={100 + i * 22} cy={105 - Math.sin(i) * 12} r="4" fill="#a78bfa" opacity="0.8" />
                ))}
                <text x="148" y="142" fill="#7c3aed" fontSize="12" textAnchor="middle" fontWeight="bold">Electricidad → Luz/Calor</text>
            </g>
        )
    },
]

export function EnergiaTiposVisual() {
    const [selected, setSelected] = useState<string | null>(null)
    const current = TYPES.find(t => t.id === selected)

    return (
        <div className="w-full rounded-3xl border border-slate-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900 shadow-lg">
            <div className="p-5 pb-3">
                <p className="text-slate-600 dark:text-zinc-400 font-medium text-sm">
                    Toca cada tipo de energía para ver cómo funciona:
                </p>
            </div>

            {/* Type buttons */}
            <div className="flex gap-3 px-5 pb-4 flex-wrap">
                {TYPES.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setSelected(selected === t.id ? null : t.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm border-2 transition-all duration-300 ${
                            selected === t.id
                                ? "scale-105 shadow-lg"
                                : "scale-100 opacity-80 hover:opacity-100"
                        }`}
                        style={{
                            backgroundColor: selected === t.id ? t.color : t.bg,
                            color: selected === t.id ? "white" : t.color,
                            borderColor: t.color,
                        }}
                    >
                        <span className="text-lg">{t.emoji}</span>
                        {t.name}
                    </button>
                ))}
            </div>

            {/* Detail panel */}
            {current && (
                <div
                    className="mx-5 mb-5 rounded-2xl overflow-hidden border-2 transition-all duration-500"
                    style={{ borderColor: current.color }}
                >
                    {/* SVG Illustration */}
                    <svg viewBox="0 0 300 160" width="100%" style={{ backgroundColor: current.bg }}>
                        {current.svgContent}
                    </svg>

                    {/* Text */}
                    <div className="p-4" style={{ backgroundColor: `${current.color}10` }}>
                        <p className="font-bold mb-1" style={{ color: current.color }}>
                            {current.emoji} Energía {current.name}
                        </p>
                        <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
                            {current.desc}
                        </p>
                        <p className="mt-2 text-xs font-semibold" style={{ color: current.color }}>
                            Ejemplo: {current.example}
                        </p>
                    </div>
                </div>
            )}

            {!selected && (
                <div className="mx-5 mb-5 p-5 rounded-2xl bg-slate-50 dark:bg-zinc-800 text-center text-slate-400 dark:text-zinc-500 text-sm">
                    👆 Selecciona un tipo de energía para aprender más
                </div>
            )}
        </div>
    )
}
