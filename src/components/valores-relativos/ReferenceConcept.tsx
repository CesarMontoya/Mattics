import React from "react"
import { MapPin, Info } from "lucide-react"

export function ReferenceConcept() {
    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 dark:bg-sky-900/10 rounded-bl-[100px] -z-10" />
                <div className="flex items-center gap-4 mb-4">
                    <MapPin className="w-8 h-8 text-sky-500 dark:text-sky-400" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
                        Los Valores Relativos
                    </h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl">
                    Para usar los números enteros en el mundo real, siempre necesitamos un <strong>punto de referencia</strong>. Este punto se marca como nuestro "cero" (0). Todo lo que esté por encima será positivo (+), y lo que esté por debajo, negativo (-).
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                <div className="w-full mb-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                        <Info className="w-5 h-5 text-indigo-500" />
                        La Montaña y el Mar: Sierra Nevada de Santa Marta
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-400 mt-2">
                        Imagina que estás en la playa. El nivel del mar es nuestro punto de partida (0). La majestuosa Sierra Nevada se eleva hacia arriba (positivo) y las profundidades del océano descienden (negativo).
                    </p>
                </div>

                <div className="w-full max-w-3xl bg-sky-50 dark:bg-sky-950/30 rounded-2xl overflow-hidden relative border-2 border-slate-200 dark:border-zinc-700">
                    <svg viewBox="0 0 800 600" className="w-full h-auto drop-shadow-md">
                        {/* Cielo */}
                        <rect width="800" height="300" fill="#e0f2fe" className="dark:fill-[#0c4a6e]" />
                        
                        {/* Sol */}
                        <circle cx="150" cy="100" r="40" fill="#fde047" />

                        {/* Montaña (Sierra Nevada) */}
                        <path d="M 300 300 L 550 50 L 800 300 Z" fill="#64748b" className="dark:fill-[#475569]" />
                        {/* Nieve */}
                        <path d="M 450 150 L 550 50 L 650 150 L 600 180 L 550 140 L 500 180 Z" fill="#ffffff" />
                        
                        {/* Playa */}
                        <path d="M 0 300 L 800 300 L 800 320 L 0 320 Z" fill="#fde68a" className="dark:fill-[#78350f]" />
                        
                        {/* Mar */}
                        <rect y="320" width="800" height="280" fill="#0284c7" className="dark:fill-[#0369a1]" />

                        {/* Línea de Referencia (Cero) */}
                        <line x1="0" y1="300" x2="800" y2="300" stroke="#f43f5e" strokeWidth="4" strokeDasharray="8 8" />
                        
                        <rect x="20" y="280" width="160" height="40" rx="8" fill="#f43f5e" />
                        <text x="100" y="306" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">0m (Nivel del Mar)</text>

                        {/* Marcador Positivo */}
                        <line x1="550" y1="50" x2="450" y2="50" stroke="#10b981" strokeWidth="3" />
                        <rect x="330" y="30" width="110" height="40" rx="8" fill="#10b981" />
                        <text x="385" y="56" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">+5700m</text>
                        
                        <path d="M 550 60 L 550 280" stroke="#10b981" strokeWidth="3" strokeDasharray="6 6" />
                        <polygon points="545,60 555,60 550,50" fill="#10b981" />

                        {/* Marcador Negativo */}
                        <line x1="250" y1="500" x2="150" y2="500" stroke="#ef4444" strokeWidth="3" />
                        <rect x="30" y="480" width="110" height="40" rx="8" fill="#ef4444" />
                        <text x="85" y="506" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">-200m</text>

                        <path d="M 250 340 L 250 490" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 6" />
                        <polygon points="245,490 255,490 250,500" fill="#ef4444" />

                        {/* Peces y detalles de profundidad */}
                        <path d="M 600 450 Q 615 435 630 450 Q 645 465 660 450" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
                        <path d="M 400 520 Q 415 505 430 520 Q 445 535 460 520" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
                        <circle cx="650" cy="400" r="4" fill="white" opacity="0.6"/>
                        <circle cx="660" cy="380" r="6" fill="white" opacity="0.6"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}
