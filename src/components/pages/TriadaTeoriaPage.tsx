"use client"

import * as React from "react"
import { SidebarLayout } from "@/components/layouts/SidebarLayout"
import { PageContent } from "@/components/layout/PageContent"
import { FlowContainer } from "@/components/layout/FlowContainer"
import { 
    Zap, 
    Grid3x3, 
    Search, 
    ArrowRightLeft, 
    Play, 
    Pause,
    Info, 
    Layers,
    Calculator
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────
// COMPARISON COMPONENT
// ─────────────────────────────────────────────

const TriadComparison = () => {
    const [hoveredTerm, setHoveredTerm] = React.useState<string | null>(null)

    // Color Mapping
    const getTermColor = (term: string) => {
        switch (term) {
            case 'base': return "text-indigo-600 dark:text-indigo-400"
            case 'exponent': return "text-orange-600 dark:text-orange-400"
            case 'result': return "text-emerald-600 dark:text-emerald-400"
            default: return ""
        }
    }

    // Terms: 'base' (a), 'exponent' (m), 'result' (b)
    const getHighlightClass = (term: string) => {
        const baseColor = getTermColor(term)
        if (!hoveredTerm) return baseColor
        return hoveredTerm === term
            ? cn("bg-slate-100 dark:bg-zinc-800 ring-2 ring-current scale-110 z-10", baseColor)
            : "opacity-20 blur-[1px]"
    }

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-zinc-800">
                {/* Potenciación */}
                <div className="p-8 space-y-6 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-xl">
                            <Zap className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Potenciación</h3>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl h-40">
                        <div className="text-4xl font-mono relative whitespace-nowrap">
                            <span 
                                onMouseEnter={() => setHoveredTerm('base')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help font-bold", getHighlightClass('base'))}
                            >2</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('exponent')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help font-bold text-2xl -top-5 relative", getHighlightClass('exponent'))}
                            >3</span>
                            <span className="mx-2 text-slate-400">=</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('result')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help font-bold", getHighlightClass('result'))}
                            >8</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-500 font-medium">"2 elevado a la 3 es 8"</p>
                    </div>

                    <div className="space-y-4">
                        {/* Extended Example: Potenciación */}
                        <div className="flex items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-slate-200 dark:border-zinc-700 text-sm font-mono whitespace-nowrap overflow-hidden">
                            <div className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-indigo-600">2</span>
                                        <span className="text-slate-300">×</span>
                                        <span className="text-indigo-600">2</span>
                                        <span className="text-slate-300">×</span>
                                        <span className="text-indigo-600">2</span>
                                    </div>
                                    <div className="mt-1 h-3 w-16 border-x border-b border-indigo-200 dark:border-indigo-800 rounded-b-lg relative">
                                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 px-1 text-[10px] text-orange-500 font-bold uppercase tracking-tighter">3 pasos</span>
                                    </div>
                                </div>
                                <span className="text-slate-400 font-sans mx-2">=</span>
                                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/40 border-2 border-red-200 dark:border-red-800 flex items-center justify-center text-red-600 font-bold">?</div>
                            </div>
                        </div>

                        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/30">
                            <p className="text-xs font-bold text-orange-600 uppercase mb-1">¿Qué buscamos?</p>
                            <p className="text-sm text-slate-700 dark:text-zinc-300">El <b>resultado total</b> después de aplicar los pasos multiplicativos.</p>
                        </div>
                        <div className="text-sm space-y-2">
                            <p><b className="text-indigo-600 dark:text-indigo-400">Base (2):</b> El factor que se repite.</p>
                            <p><b className="text-orange-600 dark:text-orange-400">Exponente (3):</b> Los <b>pasos multiplicativos</b>.</p>
                        </div>
                    </div>
                </div>

                {/* Radicación */}
                <div className="p-8 space-y-6 bg-emerald-50/20">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-xl">
                            <Grid3x3 className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Radicación</h3>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl h-40">
                        <div className="text-4xl font-mono relative flex items-center whitespace-nowrap">
                            <div className="relative">
                                <span
                                    onMouseEnter={() => setHoveredTerm('exponent')}
                                    onMouseLeave={() => setHoveredTerm(null)}
                                    className={cn("absolute -top-3 left-4 text-xl font-bold transition-all cursor-help z-10", getHighlightClass('exponent'))}
                                >3</span>
                                <span className="text-6xl text-slate-400 leading-none">√</span>
                            </div>
                            <span 
                                onMouseEnter={() => setHoveredTerm('result')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help border-t-4 border-slate-800 dark:border-white font-bold -ml-1 py-1", getHighlightClass('result'))}
                            >8</span>
                            <span className="mx-2 text-slate-400">=</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('base')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help font-bold", getHighlightClass('base'))}
                            >2</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-500 font-medium">"Raíz cúbica de 8 es 2"</p>
                    </div>

                    <div className="space-y-4">
                        {/* Extended Example: Radicación */}
                        <div className="flex items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-slate-200 dark:border-zinc-700 text-sm font-mono whitespace-nowrap overflow-hidden">
                            <div className="flex items-center text-xs">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1">
                                        <div className="w-7 h-7 rounded bg-red-100 dark:bg-red-900/40 border-2 border-red-200 dark:border-red-800 flex items-center justify-center text-red-600 font-bold">?</div>
                                        <span className="text-slate-300">×</span>
                                        <div className="w-7 h-7 rounded bg-red-100 dark:bg-red-900/40 border-2 border-red-200 dark:border-red-800 flex items-center justify-center text-red-600 font-bold">?</div>
                                        <span className="text-slate-300">×</span>
                                        <div className="w-7 h-7 rounded bg-red-100 dark:bg-red-900/40 border-2 border-red-200 dark:border-red-800 flex items-center justify-center text-red-600 font-bold">?</div>
                                    </div>
                                    <div className="mt-1 h-2 w-full border-x border-b border-orange-200 dark:border-orange-800/50 rounded-b-lg relative">
                                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 px-1 text-[10px] text-orange-500 font-bold uppercase tracking-tighter">3 pasos</span>
                                    </div>
                                </div>
                                <span className="text-slate-400 font-sans mx-2">=</span>
                                <span className="text-emerald-600 font-bold text-lg">8</span>
                            </div>
                        </div>

                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                            <p className="text-xs font-bold text-emerald-600 uppercase mb-1">¿Qué buscamos?</p>
                            <p className="text-sm text-slate-700 dark:text-zinc-300">La <b>base</b> (o factor) que se usó en los pasos multiplicativos.</p>
                        </div>
                        <div className="text-sm space-y-2">
                            <p><b className="text-orange-600 dark:text-orange-400">Índice (3):</b> Los <b>pasos multiplicativos</b>.</p>
                            <p><b className="text-emerald-600 dark:text-emerald-400">Radicando (8):</b> El resultado conocido.</p>
                        </div>
                    </div>
                </div>

                {/* Logaritmación */}
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-xl">
                            <Search className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight truncate">Logaritmación</h3>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl h-40">
                        <div className="text-4xl font-mono relative whitespace-nowrap">
                            <span className="text-slate-400">log</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('base')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-0.5 rounded transition-all cursor-help text-xl align-sub font-bold", getHighlightClass('base'))}
                            >2</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('result')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help mx-1 font-bold", getHighlightClass('result'))}
                            >8</span>
                            <span className="mx-2 text-slate-400">=</span>
                            <span 
                                onMouseEnter={() => setHoveredTerm('exponent')}
                                onMouseLeave={() => setHoveredTerm(null)}
                                className={cn("inline-block p-1 rounded transition-all cursor-help font-bold", getHighlightClass('exponent'))}
                            >3</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-500 font-medium">"Logaritmo en base 2 de 8 es 3"</p>
                    </div>

                    <div className="space-y-4">
                        {/* Extended Example: Logaritmación */}
                        <div className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-slate-200 dark:border-zinc-700 text-sm font-mono whitespace-nowrap overflow-hidden">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-indigo-600">2</span>
                                    <span className="text-slate-300">×</span>
                                    <span className="text-indigo-600">2</span>
                                    <span className="text-slate-300">×</span>
                                    <span className="text-indigo-600 font-bold">...</span>
                                    <span className="text-slate-400 font-sans mx-1">=</span>
                                    <span className="text-emerald-600 font-bold">8</span>
                                </div>
                                <div className="mt-1.5 flex items-center gap-2">
                                    <div className="h-2 w-16 border-x border-b border-orange-200 dark:border-orange-800 rounded-b-lg" />
                                    <div className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/40 border-2 border-red-200 dark:border-red-800 text-red-600 text-[10px] font-bold uppercase tracking-tighter leading-none">
                                        ¿? pasos
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <p className="text-xs font-bold text-blue-600 uppercase mb-1">¿Qué buscamos?</p>
                            <p className="text-sm text-slate-700 dark:text-zinc-300">El número de <b>pasos multiplicativos</b> para llegar al resultado.</p>
                        </div>
                        <div className="text-sm space-y-2">
                            <p><b className="text-indigo-600 dark:text-indigo-400">Base (2):</b> El factor conocido.</p>
                            <p><b className="text-emerald-600 dark:text-emerald-400">Argumento (8):</b> El resultado conocido.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 text-center">
                <p className="text-xs text-slate-500 font-medium">✨ Pasa el mouse sobre los números para ver cómo se relacionan entre sí</p>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
// REAL WORLD ANIMATIONS
// ─────────────────────────────────────────────

const CellTimelineAnimation = () => {
    const [step, setStep] = React.useState(0)
    const [isPlaying, setIsPlaying] = React.useState(true)
    
    React.useEffect(() => {
        if (!isPlaying) return
        const timer = setInterval(() => {
            setStep(prev => (prev + 1) % 6)
        }, 2500)
        return () => clearInterval(timer)
    }, [isPlaying])

    const renderCells = (count: number, boxSize: number) => {
        const cells = []
        const margin = 10
        const usableSize = boxSize - margin * 2
        
        // Arrange cells in a grid within the box
        const cols = Math.ceil(Math.sqrt(count))
        const rows = Math.ceil(count / cols)
        const cellSize = Math.min(usableSize / cols, usableSize / rows, 12) * 0.8

        for (let i = 0; i < count; i++) {
            const r = i % cols
            const c = Math.floor(i / cols)
            const x = margin + (r + 0.5) * (usableSize / cols)
            const y = margin + (c + 0.5) * (usableSize / rows)
            
            cells.push(
                <g key={i} className="animate-in fade-in zoom-in duration-500">
                    <circle 
                        cx={x} 
                        cy={y} 
                        r={cellSize / 2} 
                        fill="url(#cellGrad)" 
                        className="drop-shadow-sm" 
                    />
                    <circle cx={x} cy={y} r={cellSize / 6} fill="white" opacity="0.3" />
                </g>
            )
        }
        return cells
    }

    return (
        <div className="w-full space-y-3 mb-6">
            <div className="grid grid-cols-6 gap-2">
                {[0, 1, 2, 3, 4, 5].map((h) => {
                    const isPast = h < step
                    const isCurrent = h === step
                    const cellsCount = Math.pow(2, h)
                    
                    return (
                        <div 
                            key={h} 
                            className={cn(
                                "flex flex-col gap-1 transition-all duration-700",
                                isPast ? "opacity-30 scale-95" : h > step ? "opacity-10 grayscale" : "opacity-100"
                            )}
                        >
                            <div className={cn(
                                "aspect-square rounded-xl border relative flex flex-col items-center justify-center p-1 bg-white dark:bg-zinc-800",
                                isCurrent ? "border-orange-400 shadow-lg shadow-orange-100 dark:shadow-orange-900/20 ring-2 ring-orange-200" : "border-slate-100 dark:border-zinc-700"
                            )}>
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <defs>
                                        <radialGradient id="cellGrad" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#fb923c" />
                                            <stop offset="100%" stopColor="#ea580c" />
                                        </radialGradient>
                                    </defs>
                                    {(isPast || isCurrent) ? renderCells(cellsCount, 100) : null}
                                </svg>
                                {isCurrent && (
                                    <div className="absolute -top-1 -right-1 flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500"></span>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <span className={cn(
                                    "text-[9px] font-bold uppercase tracking-tighter",
                                    isCurrent ? "text-orange-600" : "text-slate-400"
                                )}>
                                    H{h}
                                </span>
                                <div className={cn(
                                    "text-[10px] font-mono font-bold leading-none",
                                    isCurrent ? "text-slate-800 dark:text-white" : "text-slate-400"
                                )}>
                                    {cellsCount}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex items-center justify-between px-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 rounded-full w-fit border border-orange-100 dark:border-orange-900/30">
                    <div className={cn("w-1.5 h-1.5 rounded-full bg-orange-500", isPlaying && "animate-pulse")} />
                    <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">
                        Tiempo Transcurrido: {step}h
                    </span>
                </div>
                
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 hover:scale-110 transition-transform shadow-sm border border-orange-200 dark:border-orange-800"
                >
                    {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                </button>
            </div>
        </div>
    )
}

const RichterCityAnimation = () => {
    const [mag, setMag] = React.useState(4)
    const [isPlaying, setIsPlaying] = React.useState(true)
    
    React.useEffect(() => {
        if (!isPlaying) return
        const timer = setInterval(() => {
            setMag(prev => (prev === 7 ? 4 : prev + 1))
        }, 5000)
        return () => clearInterval(timer)
    }, [isPlaying])

    const getShakeIntensity = () => {
        switch(mag) {
            case 4: return { duration: '0.4s', distance: '1px' };
            case 5: return { duration: '0.2s', distance: '3px' };
            case 6: return { duration: '0.1s', distance: '6px' };
            case 7: return { duration: '0.05s', distance: '12px' };
            default: return { duration: '0s', distance: '0px' };
        }
    }

    const intensity = getShakeIntensity()

    return (
        <div className="w-full space-y-4 mb-6">
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes seismic-vibration {
                    0% { transform: translateX(0px); }
                    25% { transform: translateX(calc(-1 * var(--shake-dist))); }
                    50% { transform: translateX(0px); }
                    75% { transform: translateX(var(--shake-dist)); }
                    100% { transform: translateX(0px); }
                }
                .seismic-active {
                    animation: seismic-vibration var(--shake-dur) infinite linear;
                    animation-play-state: ${isPlaying ? 'running' : 'paused'};
                }
            ` }} />
            <div 
                className="relative h-48 w-full bg-slate-50 dark:bg-zinc-800/50 rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-700 p-4"
                style={{ 
                    '--shake-dist': intensity.distance, 
                    '--shake-dur': intensity.duration 
                } as React.CSSProperties}
            >
                {/* Sky / Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
                
                <svg viewBox="0 0 400 200" className="w-full h-full seismic-active">
                    {/* Ground */}
                    <rect x="0" y="150" width="400" height="50" fill="#94a3b8" />
                    <rect x="0" y="150" width="400" height="2" fill="#64748b" />

                    {/* Light Pole */}
                    <g 
                        style={{ transformOrigin: '182px 150px', transition: 'transform 1s ease-in-out' }}
                        className={cn(mag >= 5 ? "rotate-[-95deg] translate-y-1" : "rotate-0")}
                    >
                        <rect x="180" y="80" width="4" height="70" fill="#475569" />
                        <circle cx="182" cy="80" r="6" fill={mag >= 5 ? "#334155" : "#facc15"} className={cn(mag < 5 && "animate-pulse")} />
                    </g>

                    {/* Building 1 (Left) - Collapses at Mag 7 */}
                    <g 
                        style={{ transformOrigin: '75px 150px', transition: 'transform 1s cubic-bezier(0.45, 0, 0.55, 1)' }}
                        className={cn(mag === 7 ? "scale-y-[0.25] translate-y-4" : "scale-y-100 translate-y-0")}
                    >
                        <rect x="50" y="60" width="50" height="90" fill="#cbd5e1" stroke="#94a3b8" />
                        {[0, 1, 2, 3].map(r => [0, 1].map(c => (
                            <rect 
                                key={`${r}-${c}`} 
                                x={60 + c*20} 
                                y={70 + r*20} 
                                width="10" 
                                height="10" 
                                fill="#f8fafc" 
                                className={cn(mag === 7 && "opacity-0 transition-opacity")}
                            />
                        )))}
                        {mag >= 6 && <path d="M 60 80 l 10 10 l -5 10 l 15 5" stroke="#64748b" fill="none" strokeWidth="2" />}
                    </g>

                    {/* Building 2 (Center) - High Resistance */}
                    <g>
                        <rect x="120" y="40" width="40" height="110" fill="#94a3b8" stroke="#64748b" />
                        {[0, 1, 2, 3, 4].map(r => (
                            <rect key={r} x={130} y={50 + r*20} width="20" height="10" fill="#f8fafc" />
                        ))}
                        {mag >= 6 && <path d="M 140 60 l -10 15 l 10 10" stroke="#475569" fill="none" strokeWidth="1" />}
                    </g>

                    {/* Building 3 (Right) - Collapses at Mag 7 */}
                    <g 
                        style={{ transformOrigin: '280px 150px', transition: 'transform 1.2s cubic-bezier(0.45, 0, 0.55, 1)' }}
                        className={cn(mag === 7 ? "scale-y-[0.3] translate-y-4" : "scale-y-100 translate-y-0")}
                    >
                        <rect x="250" y="70" width="60" height="80" fill="#cbd5e1" stroke="#94a3b8" />
                        {[0, 1, 2].map(r => [0, 1, 2].map(c => (
                            <rect 
                                key={`${r}-${c}`} 
                                x={258 + c*15} 
                                y={80 + r*20} 
                                width="8" 
                                height="10" 
                                fill="#f8fafc" 
                                className={cn(mag === 7 && "opacity-0 transition-opacity")}
                            />
                        )))}
                        {mag >= 6 && <path d="M 280 90 l -10 20 l 15 5" stroke="#64748b" fill="none" strokeWidth="2" />}
                    </g>

                    {/* Building 4 (Far Right) */}
                    <g>
                        <rect x="330" y="90" width="40" height="60" fill="#94a3b8" stroke="#64748b" />
                        {[0, 1].map(r => (
                            <rect key={r} x={340} y={100 + r*20} width="20" height="10" fill="#f8fafc" />
                        ))}
                        {mag >= 7 && <path d="M 345 100 l 10 20" stroke="#475569" fill="none" strokeWidth="1" />}
                    </g>
                </svg>

                {/* Magnitude Label Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-2 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-xl text-slate-600 hover:scale-110 transition-transform"
                    >
                        {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                    </button>
                    
                    <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200 dark:border-zinc-700 shadow-xl flex flex-col items-center">
                        <span className="text-[10px] uppercase font-black text-slate-400">Magnitud</span>
                        <span className={cn(
                            "text-3xl font-black italic",
                            mag === 4 ? "text-emerald-500" : mag === 5 ? "text-yellow-500" : mag === 6 ? "text-orange-500" : "text-red-500"
                        )}>{mag}.0</span>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
                        {mag === 4 && "✅ Sismo Leve - Sin daños"}
                        {mag === 5 && "⚠️ Sismo Moderado - Caída de objetos"}
                        {mag === 6 && "❌ Sismo Fuerte - Daños estructurales"}
                        {mag === 7 && "🆘 Desastre - Colapso de edificios"}
                    </div>
                </div>
            </div>

            {/* Explanation Bar */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-zinc-800 rounded-2xl border border-slate-200 dark:border-zinc-700">
                {[4, 5, 6, 7].map(m => (
                    <button 
                        key={m}
                        onClick={() => setMag(m)}
                        className={cn(
                            "py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-0.5",
                            mag === m ? "bg-white dark:bg-zinc-700 shadow-sm" : "hover:bg-white/50 dark:hover:bg-white/5"
                        )}
                    >
                        <span className="text-[10px] font-black">{m}.0</span>
                        {m > 4 && mag === m && (
                            <span className="text-[8px] text-red-500 font-bold leading-none animate-bounce">×10 Energía</span>
                        )}
                    </button>
                ))}
            </div>
            <p className="text-[10px] text-center text-slate-500 italic">
                Cada paso en la escala Richter significa que el sismo es <span className="text-orange-600 font-bold">10 veces más fuerte</span> que el anterior.
            </p>
        </div>
    )
}

// ─────────────────────────────────────────────
// REAL WORLD CARDS
// ─────────────────────────────────────────────

const RealLifeExamples = () => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="group bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-4 mb-4">
                    <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Layers className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white">Crecimiento Celular</h4>
                        <p className="text-sm text-slate-500">Un ejemplo de Potenciación</p>
                    </div>
                </div>

                <CellTimelineAnimation />

                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    Una célula se divide en 2 cada hora. En 5 horas (5 pasos multiplicativos), ¿cuántas células habrá?
                </p>
                <div className="bg-slate-50 dark:bg-zinc-800 p-3 rounded-xl font-mono text-center text-orange-600 font-bold">
                    2⁵ = 32 células
                </div>
            </div>

            <div className="group bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-4 mb-4">
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Calculator className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white">Escala Richter</h4>
                        <p className="text-sm text-slate-500">Un ejemplo de Logaritmación</p>
                    </div>
                </div>

                <RichterCityAnimation />

                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    Si un terremoto libera 100,000 unidades de energía (base 10), ¿qué magnitud Richter representa? Buscamos los pasos multiplicativos.
                </p>
                <div className="bg-slate-50 dark:bg-zinc-800 p-3 rounded-xl font-mono text-center text-blue-600 font-bold">
                    log₁₀(100,000) = 5
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function TriadaTeoriaPage() {
    const breadcrumbs = [
        { label: "Matemáticas 7", href: "/matematicas-7" },
        { label: "La Tríada Aritmética" },
    ]

    return (
        <SidebarLayout breadcrumbs={breadcrumbs}>
            <PageContent
                title="La Tríada Aritmética"
                description="Entiende la conexión profunda entre Potenciación, Radicación y Logaritmación como tres caras de una misma moneda."
                icon={<ArrowRightLeft className="h-10 w-10 text-indigo-600" />}
                className="animate-in fade-in duration-700"
            >
                <FlowContainer>
                    {/* SECTION 1: THE CONCEPT */}
                    <section className="space-y-6">
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden">
                            <div className="absolute top-[-20px] right-[-20px] opacity-10">
                                <ArrowRightLeft className="h-64 w-64 text-indigo-900" />
                            </div>
                            <div className="relative z-10 max-w-2xl space-y-4">
                                <h2 className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-200">Una Misma Relación, Tres Preguntas</h2>
                                <p className="text-lg text-indigo-800/80 dark:text-indigo-300 leading-relaxed">
                                    En matemáticas, estas tres operaciones no son independientes. Son formas distintas de relacionar los mismos tres elementos: la <b>base</b>, los <b>pasos multiplicativos</b> y el <b>resultado</b>.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: THE COMPARISON TABLE */}
                    <section className="space-y-8">
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 italic">"¿Qué es lo que no conozco?"</h3>
                            <p className="text-slate-500">Dependiendo de lo que queramos encontrar, usamos una operación u otra.</p>
                        </div>
                        
                        <TriadComparison />
                    </section>

                    {/* SECTION 3: VIDEO EXPLANATION */}
                    <section className="space-y-6 bg-slate-900 rounded-[2.5rem] p-4 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <Play className="h-40 w-40" />
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-red-500/30">
                                    <Play className="h-3 w-3 fill-current" /> Video Explicativo
                                </div>
                                <h3 className="text-4xl font-extrabold leading-tight">¿Qué es realmente un Logaritmo?</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Los logaritmos a menudo se sienten extraños, pero son simplemente el mecanismo para <b>contar cuántas veces</b> hemos multiplicado un número para llegar a otro.
                                </p>
                                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <Info className="h-6 w-6 text-indigo-400 shrink-0" />
                                    <p className="text-sm text-slate-300">
                                        Mira cómo Math Antics explica la logaritmación como el proceso de encontrar cuántos <b>pasos multiplicativos</b> se han dado en una escala.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 ring-1 ring-white/20">
                                <iframe 
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/W_BZb_va6jY" 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: REAL LIFE APPLICATIONS */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">La Tríada en la Vida Real</h3>
                        </div>
                        <RealLifeExamples />
                    </section>
                </FlowContainer>
            </PageContent>
        </SidebarLayout>
    )
}
