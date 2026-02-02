"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Point {
    x: number
    y: number
    vx: number
    vy: number
    color: string
}

export function UnorderedPoints() {
    const canvasRef = useRef<HTMLDivElement>(null)
    const [points, setPoints] = useState<Point[]>([])
    const [isPlaying, setIsPlaying] = useState(true)
    const requestRef = useRef<number>(undefined)
    
    const numBlue = 27
    const numRed = 6
    const radius = 10
    const speed = 2

    const initPoints = () => {
        if (!canvasRef.current) return
        const width = canvasRef.current.clientWidth
        const height = canvasRef.current.clientHeight
        
        const newPoints: Point[] = []
        
        // Blue points
        for (let i = 0; i < numBlue; i++) {
            newPoints.push({
                x: Math.random() * (width - 2 * radius) + radius,
                y: Math.random() * (height - 2 * radius) + radius,
                vx: (Math.random() - 0.5) * speed * 2,
                vy: (Math.random() - 0.5) * speed * 2,
                color: '#3b82f6' // Blue-500
            })
        }
        
        // Red points
        for (let i = 0; i < numRed; i++) {
            newPoints.push({
                x: Math.random() * (width - 2 * radius) + radius,
                y: Math.random() * (height - 2 * radius) + radius,
                vx: (Math.random() - 0.5) * speed * 2,
                vy: (Math.random() - 0.5) * speed * 2,
                color: '#ef4444' // Red-500
            })
        }
        
        setPoints(newPoints)
    }

    const updatePoints = () => {
        if (!canvasRef.current || !isPlaying) return
        
        const width = canvasRef.current.clientWidth
        const height = canvasRef.current.clientHeight

        setPoints(prevPoints => prevPoints.map(p => {
            let nx = p.x + p.vx
            let ny = p.y + p.vy
            let nvx = p.vx
            let nvy = p.vy

            if (nx - radius < 0 || nx + radius > width) {
                nvx = -nvx
                nx = p.x + nvx
            }
            if (ny - radius < 0 || ny + radius > height) {
                nvy = -nvy
                ny = p.y + nvy
            }

            return { ...p, x: nx, y: ny, vx: nvx, vy: nvy }
        }))

        requestRef.current = requestAnimationFrame(updatePoints)
    }

    useEffect(() => {
        initPoints()
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
    }, [])

    useEffect(() => {
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(updatePoints)
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
    }, [isPlaying])

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-xl overflow-hidden">
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100 italic">"¡Misión Imposible!"</h3>
                <p className="text-slate-600 dark:text-zinc-400">
                    ¿Puedes contar cuántos círculos rojos y azules hay?
                </p>
            </div>

            <div 
                ref={canvasRef}
                className="relative w-full h-[300px] bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-700 overflow-hidden"
            >
                {points.map((p, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full shadow-sm"
                        style={{
                            left: p.x - radius,
                            top: p.y - radius,
                            width: radius * 2,
                            height: radius * 2,
                            backgroundColor: p.color,
                            transition: isPlaying ? 'none' : 'all 0.5s ease-out',
                            filter: `drop-shadow(0px 2px 4px ${p.color}40)`
                        }}
                    />
                ))}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all active:scale-95",
                        isPlaying 
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200" 
                            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                    )}
                >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    {isPlaying ? "Pausar" : "Reanudar"}
                </button>
                <button
                    onClick={initPoints}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 rounded-full font-bold transition-all"
                >
                    <RotateCcw className="h-5 w-5" /> Mezclar
                </button>
            </div>
        </div>
    )
}
