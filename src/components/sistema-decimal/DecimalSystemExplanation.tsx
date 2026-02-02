"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Info, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

export function DecimalSystemExplanation() {
    const [isVisible, setIsVisible] = useState(false)
    const [animationKey, setAnimationKey] = useState(0)
    const sectionRef = useRef<HTMLDivElement>(null)
    
    const blueDots = 27
    const redDots = 6
    const totalDots = blueDots + redDots
    const cols = 10

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Trigger animation after 2 seconds when section enters view
                    setTimeout(() => {
                        setIsVisible(true)
                    }, 2000)
                }
            },
            { threshold: 0.3 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [animationKey])

    const reset = () => {
        setIsVisible(false)
        setAnimationKey(prev => prev + 1)
    }

    return (
        <div 
            ref={sectionRef}
            className="flex flex-col gap-6 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-hidden min-h-[550px] relative"
        >
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 italic">"Ordenar en el Sistema Decimal"</h3>
                    
                    {/* RESET BUTTON (Top Right) */}
                    <button
                        onClick={reset}
                        className={cn(
                            "p-2 rounded-full bg-slate-100 hover:bg-indigo-100 text-slate-400 hover:text-indigo-600 transition-all duration-500",
                            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
                        )}
                        title="Reiniciar animación"
                    >
                        <RotateCcw className="h-5 w-5" />
                    </button>
                </div>
                <p className="text-slate-600 dark:text-zinc-400">
                    El sistema decimal consiste en agrupar de a 10 para formar unidades de orden superior.
                </p>
            </div>

            <div className="relative flex-1 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-200 dark:border-zinc-700 p-8 flex flex-col items-center justify-center">
                <svg key={animationKey} viewBox="0 0 600 400" className="w-full h-full max-w-[500px] overflow-visible">
                    
                    {/* DOTS GRID */}
                    <g transform="translate(50, 80)">
                        {Array.from({ length: totalDots }).map((_, i) => {
                            const row = Math.floor(i / cols)
                            const col = i % cols
                            const isBlue = i < blueDots
                            return (
                                <circle 
                                    key={i}
                                    cx={col * 35}
                                    cy={row * 35}
                                    r={10}
                                    fill={isBlue ? "#3b82f6" : "#ef4444"}
                                    className="transition-all duration-700 shadow-sm"
                                    style={{ 
                                        filter: `drop-shadow(0px 2px 4px ${isBlue ? "#3b82f640" : "#ef444440"})`,
                                        opacity: isVisible ? 1 : 0.8
                                    }}
                                />
                            )
                        })}
                    </g>

                    {/* TOP BRACKET (Agrupados de a 10) */}
                    <g className={cn("transition-all duration-1000", isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4")}>
                        <path 
                            d="M 50 65 Q 50 55 65 55 L 202.5 55 Q 217.5 55 217.5 45 Q 217.5 55 232.5 55 L 370 55 Q 385 55 385 65" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="2"
                        />
                        <rect x="135" y="15" width="165" height="30" rx="4" fill="#93c5fd" />
                        <text x="217.5" y="35" textAnchor="middle" fill="#1e3a8a" className="text-sm font-bold" style={{ fontFamily: 'Quicksand' }}>
                            Agrupados de a 10
                        </text>
                    </g>

                    {/* RIGHT BRACKET (3 decenas) */}
                    <g className={cn("transition-all duration-[1200ms] delay-500", isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4")}>
                        <path 
                            d="M 405 80 Q 415 80 415 95 L 415 102.5 Q 415 115 425 115 Q 415 115 415 127.5 L 415 135 Q 415 150 405 150" 
                            fill="none" 
                            stroke="#f97316" 
                            strokeWidth="2"
                        />
                        <rect x="435" y="100" width="110" height="30" rx="4" fill="#fbcfb0" />
                        <text x="490" y="120" textAnchor="middle" fill="#7c2d12" className="text-sm font-bold" style={{ fontFamily: 'Quicksand' }}>
                            3 decenas
                        </text>
                    </g>

                    {/* LEFT BOTTOM BRACKET (3 unidades) */}
                    <g className={cn("transition-all duration-[1200ms] delay-[1000ms]", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                        <path 
                            d="M 50 200 Q 50 210 65 210 L 72.5 210 Q 85 210 85 220 Q 85 210 97.5 210 L 105 210 Q 120 210 120 200" 
                            fill="none" 
                            stroke="#15803d" 
                            strokeWidth="2"
                        />
                        <rect x="35" y="230" width="105" height="30" rx="4" fill="#15803d" />
                        <text x="87.5" y="250" textAnchor="middle" fill="white" className="text-sm font-bold" style={{ fontFamily: 'Quicksand' }}>
                            3 unidades
                        </text>
                    </g>

                    {/* POSITIONAL CHART (Bottom Right) */}
                    <g transform="translate(350, 240)" className={cn("transition-all duration-[1500ms] delay-[1800ms]", isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90")}>
                        <rect x="0" y="0" width="170" height="35" rx="4" fill="#15803d" />
                        <text x="85" y="23" textAnchor="middle" fill="white" className="text-sm font-bold" style={{ fontFamily: 'Quicksand' }}>
                            Unidades
                        </text>
                        
                        <rect x="-70" y="45" width="130" height="35" rx="4" fill="#fbcfb0" />
                        <text x="-5" y="68" textAnchor="middle" fill="#7c2d12" className="text-sm font-bold" style={{ fontFamily: 'Quicksand' }}>
                            Decenas
                        </text>

                        {/* Arrows */}
                        <path d="M 60 40 L 60 75" stroke="#15803d" strokeWidth="2" markerEnd="url(#arrowhead-green)"/>
                        <path d="M 0 85 L 0 120" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowhead-orange)"/>

                        {/* Numbers */}
                        <g transform="translate(-25, 130)">
                            <rect x="0" y="0" width="45" height="55" rx="4" stroke="#7c2d12" strokeWidth="1" fill="#fbcfb0" />
                            <text x="22.5" y="40" textAnchor="middle" fill="#7c2d12" className="text-4xl font-black" style={{ fontFamily: 'Quicksand' }}>3</text>
                        </g>
                        <g transform="translate(45, 130)">
                            <rect x="0" y="0" width="45" height="55" rx="4" stroke="#15803d" strokeWidth="1" fill="#15803d" />
                            <text x="22.5" y="40" textAnchor="middle" fill="white" className="text-4xl font-black" style={{ fontFamily: 'Quicksand' }}>3</text>
                        </g>

                        {/* Defs for arrowheads */}
                        <defs>
                            <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#15803d" />
                            </marker>
                            <marker id="arrowhead-orange" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
                            </marker>
                        </defs>
                    </g>
                </svg>
            </div>

            {/* INFO FOOTER */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                <Info className="h-5 w-5 text-blue-600 shrink-0" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Explicación:</strong> Al agrupar los 33 círculos (27 azules y 6 rojos) de 10 en 10, obtenemos 3 decenas completas y nos sobran 3 unidades. Por eso escribimos el número como 33.
                </p>
            </div>
        </div>
    )
}
