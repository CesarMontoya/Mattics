import React from "react"
import { Thermometer, Building, Compass } from "lucide-react"

export function OtherExamplesConcept() {
    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 dark:bg-amber-900/10 rounded-bl-[100px] -z-10" />
                <div className="flex items-center gap-4 mb-4">
                    <Thermometer className="w-8 h-8 text-amber-500 dark:text-amber-400" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
                        Más Ejemplos de la Vida Real
                    </h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl">
                    Los números positivos y negativos no solo sirven para alturas y profundidades. ¡Están en todas partes! Solo hace falta definir cuál será nuestro punto "cero".
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Termómetro */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-slate-800 dark:text-zinc-100 mb-4 w-full text-center flex justify-center items-center gap-2">
                        <Thermometer className="w-5 h-5 text-rose-500" />
                        Temperatura
                    </h3>
                    <div className="w-full bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl flex justify-center border border-slate-100 dark:border-zinc-700">
                        <svg viewBox="0 0 100 300" className="w-32 h-auto drop-shadow-sm">
                            {/* Base del termómetro */}
                            <path d="M 40 20 L 40 220 A 20 20 0 1 0 60 220 L 60 20 A 10 10 0 1 0 40 20 Z" fill="#f1f5f9" className="dark:fill-[#1e293b]" stroke="#cbd5e1" strokeWidth="2" />
                            {/* Líquido (Rojo/Azul) */}
                            <path d="M 45 220 A 15 15 0 1 0 55 220 L 55 120 L 45 120 Z" fill="#ef4444" />
                            
                            {/* Marcas */}
                            <line x1="30" y1="50" x2="40" y2="50" stroke="#64748b" strokeWidth="2" />
                            <text x="5" y="55" fill="#64748b" fontSize="12" fontWeight="bold">+40°</text>

                            <line x1="20" y1="150" x2="40" y2="150" stroke="#3b82f6" strokeWidth="3" />
                            <text x="5" y="155" fill="#3b82f6" fontSize="14" fontWeight="bold">0°C</text>

                            <line x1="30" y1="200" x2="40" y2="200" stroke="#64748b" strokeWidth="2" />
                            <text x="5" y="205" fill="#64748b" fontSize="12" fontWeight="bold">-20°</text>

                            {/* Indicador actual */}
                            <line x1="60" y1="120" x2="70" y2="120" stroke="#ef4444" strokeWidth="2" />
                            <text x="75" y="125" fill="#ef4444" fontSize="14" fontWeight="bold">+15°</text>
                        </svg>
                    </div>
                    <p className="text-sm text-slate-500 mt-4 text-center">
                        El <strong>0°C</strong> es el punto de congelación del agua. Por encima el agua es liquida (+), por debajo se hace hielo (-).
                    </p>
                </div>

                {/* Edificio */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-slate-800 dark:text-zinc-100 mb-4 w-full text-center flex justify-center items-center gap-2">
                        <Building className="w-5 h-5 text-indigo-500" />
                        Edificios
                    </h3>
                    <div className="w-full bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl flex justify-center border border-slate-100 dark:border-zinc-700">
                        <svg viewBox="0 0 150 300" className="w-40 h-auto drop-shadow-sm">
                            {/* Sótano / Subterráneo */}
                            <rect y="180" width="150" height="120" fill="#d4d4d8" className="dark:fill-[#3f3f46]" />
                            
                            {/* Edificio principal */}
                            <rect x="30" y="20" width="90" height="260" fill="#6366f1" rx="4" />
                            
                            {/* Ventanas */}
                            <rect x="45" y="40" width="20" height="20" fill="#c7d2fe" />
                            <rect x="85" y="40" width="20" height="20" fill="#c7d2fe" />
                            
                            <rect x="45" y="80" width="20" height="20" fill="#c7d2fe" />
                            <rect x="85" y="80" width="20" height="20" fill="#c7d2fe" />
                            
                            <rect x="45" y="120" width="20" height="20" fill="#c7d2fe" />
                            <rect x="85" y="120" width="20" height="20" fill="#c7d2fe" />

                            {/* Lobby (Nivel de Calle) */}
                            <rect x="45" y="160" width="60" height="20" fill="#fde047" />

                            {/* Ventanas Sótano */}
                            <rect x="45" y="200" width="60" height="15" fill="#1e1b4b" />
                            <rect x="45" y="240" width="60" height="15" fill="#1e1b4b" />

                            {/* Línea de la calle */}
                            <line x1="0" y1="180" x2="150" y2="180" stroke="#10b981" strokeWidth="4" />
                            
                            <text x="15" y="172" fill="#10b981" fontSize="12" fontWeight="bold">0</text>
                            <text x="15" y="55" fill="#c7d2fe" fontSize="12" fontWeight="bold">+3</text>
                            <text x="15" y="212" fill="#a1a1aa" fontSize="12" fontWeight="bold">-1</text>
                            <text x="15" y="252" fill="#a1a1aa" fontSize="12" fontWeight="bold">-2</text>
                        </svg>
                    </div>
                    <p className="text-sm text-slate-500 mt-4 text-center">
                        La <strong>Planta Baja</strong> nivel de la calle (0). Los pisos hacia arriba son positivos, y los sótanos son negativos.
                    </p>
                </div>

                {/* Brújula / Geografía */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                    <h3 className="font-bold text-slate-800 dark:text-zinc-100 mb-4 w-full text-center flex justify-center items-center gap-2">
                        <Compass className="w-5 h-5 text-emerald-500" />
                        Norte y Sur
                    </h3>
                    <div className="w-full bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl flex justify-center items-center min-h-[220px] border border-slate-100 dark:border-zinc-700">
                        <svg viewBox="0 0 200 200" className="w-40 h-auto drop-shadow-sm">
                            {/* Brújula base */}
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="10 5" className="dark:stroke-zinc-600 truncate"/>
                            
                            {/* Eje (Ecuador) */}
                            <line x1="10" y1="100" x2="190" y2="100" stroke="#f59e0b" strokeWidth="3" />
                            <text x="100" y="108" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">ECUADOR (0°)</text>

                            {/* Norte */}
                            <path d="M 100 15 L 115 85 L 85 85 Z" fill="#ef4444" />
                            <text x="60" y="55" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle">N (+)</text>

                            {/* Sur */}
                            <path d="M 100 185 L 115 115 L 85 115 Z" fill="#3b82f6" />
                            <text x="140" y="155" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle">S (-)</text>
                        </svg>
                    </div>
                    <p className="text-sm text-slate-500 mt-4 text-center">
                        La Línea del <strong>Ecuador</strong> es la latitud 0°. Hacia el Norte usamos valores positivos, y hacia el Sur negativos.
                    </p>
                </div>

            </div>
        </div>
    )
}
