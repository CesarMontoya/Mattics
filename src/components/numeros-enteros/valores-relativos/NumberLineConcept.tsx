import React from "react"

export function NumberLineConcept() {
    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 dark:bg-emerald-900/10 rounded-bl-[100px] -z-10" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-4">
                    La Recta Numérica
                </h2>
                <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-3xl">
                    Para hacer matemáticas, no dibujamos el mar o un termómetro cada vez. Traducimos todas estas situaciones a una línea recta llamada <strong>Recta Numérica</strong>.
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                <div className="w-full mb-8 text-center max-w-2xl">
                    <p className="text-slate-600 dark:text-zinc-400">
                        Imagina que tu <strong className="text-emerald-600">Casa</strong> es el punto cero. A 3 km hacia la derecha está el <strong className="text-indigo-600">Colegio</strong>, y a 4 km hacia la izquierda está la <strong className="text-rose-600">Cancha de fútbol</strong>. 
                        En la recta numérica, quitamos los "km" y nos quedamos con los <strong>números puros</strong>.
                    </p>
                </div>

                <div className="w-full max-w-4xl bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-8 border border-slate-200 dark:border-zinc-700 overflow-x-auto">
                    <svg viewBox="0 -50 800 220" className="w-full min-w-[600px] drop-shadow-sm">
                        {/* Línea Principal */}
                        <line x1="50" y1="100" x2="750" y2="100" stroke="#94a3b8" strokeWidth="4" />
                        
                        {/* Flechas de infinito */}
                        <polygon points="50,100 65,90 65,110" fill="#94a3b8" />
                        <polygon points="750,100 735,90 735,110" fill="#94a3b8" />

                        {/* Tics y números */}
                        {[...Array(11)].map((_, i) => {
                            const val = i - 5; // De -5 a 5
                            const x = 100 + i * 60;
                            const isZero = val === 0;
                            
                            return (
                                <g key={i}>
                                    <line 
                                        x1={x} y1="90" 
                                        x2={x} y2="110" 
                                        stroke={isZero ? "#10b981" : "#cbd5e1"} 
                                        strokeWidth={isZero ? "4" : "2"} 
                                    />
                                    <text 
                                        x={x} y="135" 
                                        fill={isZero ? "#10b981" : val > 0 ? "#4f46e5" : "#e11d48"} 
                                        fontSize="18" 
                                        fontWeight={isZero ? "bold" : "normal"}
                                        textAnchor="middle"
                                        className="dark:fill-slate-300"
                                    >
                                        {val > 0 ? `+${val}` : val}
                                    </text>
                                </g>
                            )
                        })}

                        {/* Dibujos en la recta */}

                        {/* Flecha plana desde 0 a -4 */}
                        <line x1="400" y1="80" x2="160" y2="80" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 6" />
                        <polygon points="160,80 170,75 170,85" fill="#f43f5e" />
                        
                        {/* Flecha plana desde 0 a +3 */}
                        <line x1="400" y1="80" x2="580" y2="80" stroke="#6366f1" strokeWidth="2" strokeDasharray="6 6" />
                        <polygon points="580,80 570,75 570,85" fill="#6366f1" />

                        {/* Cancha (-4) */}
                        <g transform="translate(160, 25)">
                            <circle cx="0" cy="20" r="25" fill="#fee2e2" stroke="#f43f5e" strokeWidth="2" />
                            <text x="0" y="27" fontSize="20" textAnchor="middle">⚽</text>
                            <text x="0" y="-15" fill="#f43f5e" fontSize="14" fontWeight="bold" textAnchor="middle">Cancha</text>
                            <text x="0" y="-35" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">A 4 km a la izquierda</text>
                        </g>

                        {/* Casa (0) */}
                        <g transform="translate(400, 25)">
                            <rect x="-20" y="-5" width="40" height="40" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="4" />
                            <polygon points="-25,-5 25,-5 0,-25" fill="#10b981" />
                            <rect x="-5" y="15" width="10" height="20" fill="#047857" />
                            <text x="0" y="-35" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">CASA</text>
                            <text x="0" y="-55" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Punto de referencia</text>
                        </g>

                        {/* Colegio (+3) */}
                        <g transform="translate(580, 25)">
                            <rect x="-25" y="0" width="50" height="35" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" rx="2" />
                            <rect x="-15" y="-15" width="30" height="15" fill="#6366f1" />
                            <text x="0" y="-25" fill="#4f46e5" fontSize="14" fontWeight="bold" textAnchor="middle">Colegio</text>
                            <text x="0" y="-45" fill="#4f46e5" fontSize="12" fontWeight="bold" textAnchor="middle">A 3 km a la derecha</text>
                            {/* Windows */}
                            <rect x="-20" y="10" width="10" height="10" fill="white" />
                            <rect x="10" y="10" width="10" height="10" fill="white" />
                        </g>

                    </svg>
                </div>
            </div>
        </div>
    )
}
