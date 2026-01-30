"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface FlowContainerProps {
    children: React.ReactNode[]
    className?: string
}

/**
 * FlowContainer renders children sequentially one by one.
 * Triggers: ArrowDown key, Swipe Up on touch, or clicking the indicator.
 */
export function FlowContainer({ children, className }: FlowContainerProps) {
    const childrenArray = React.Children.toArray(children)
    const [visibleCount, setVisibleCount] = useState(1)
    const lastBlockRef = useRef<HTMLDivElement>(null)

    const showNext = useCallback(() => {
        if (visibleCount < childrenArray.length) {
            setVisibleCount(prev => prev + 1)
        }
    }, [visibleCount, childrenArray.length])

    // Smooth scroll to the newly revealed block
    useEffect(() => {
        if (visibleCount > 1 && lastBlockRef.current) {
            // We wait a bit for the animation to start so the scroll height is more accurate
            setTimeout(() => {
                lastBlockRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }, 100)
        }
    }, [visibleCount])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only trigger if we are not in an input/textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
                if (visibleCount < childrenArray.length) {
                    e.preventDefault()
                    showNext()
                }
            }
        }

        // Swipe detection
        let touchStart = 0
        const handleTouchStart = (e: TouchEvent) => {
            touchStart = e.touches[0].clientY
        }
        const handleTouchEnd = (e: TouchEvent) => {
            const touchEnd = e.changedTouches[0].clientY
            // Swipe UP shows content BELOW
            if (touchStart - touchEnd > 70) {
                showNext()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('touchstart', handleTouchStart)
        window.addEventListener('touchend', handleTouchEnd)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [showNext, childrenArray.length, visibleCount])

    return (
        <div className={cn("flex flex-col gap-12 md:gap-20 pb-40", className)}>
            {childrenArray.slice(0, visibleCount).map((child, index) => (
                <div
                    key={index}
                    ref={index === visibleCount - 1 ? lastBlockRef : null}
                    className={cn(
                        "w-full transition-all duration-1000",
                        index === visibleCount - 1
                            ? "animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-forwards"
                            : "opacity-100"
                    )}
                >
                    {child}
                </div>
            ))}

            {/* Visual Action Cue */}
            {visibleCount < childrenArray.length && (
                <div
                    onClick={showNext}
                    className="flex flex-col items-center gap-3 py-10 cursor-pointer group transition-all"
                >
                    <p className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground/60 group-hover:text-indigo-500 transition-colors">
                        Siguiente parte
                    </p>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-indigo-200 dark:border-indigo-900 group-hover:border-indigo-500 group-hover:bg-indigo-50 transition-all">
                        <ChevronDown className="h-6 w-6 text-indigo-400 group-hover:text-indigo-600 animate-bounce" />
                    </div>
                </div>
            )}
        </div>
    )
}
