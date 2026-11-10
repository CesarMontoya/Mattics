"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MONEY_STEP_PIECES, type MuralPiece, type StepId } from "./types"

const PIECE_COLORS: Record<MuralPiece, string> = {
    letrero: "#d97706",
    toldo: "#b91c1c",
    vitrina: "#0284c7",
    puerta: "#7c2d12",
    nevera: "#059669",
    maceta: "#65a30d",
}

const EMPTY = "var(--mural-empty, #e2e8f0)"

interface MuralProps {
    completed: StepId[]
    colors?: Partial<Record<MuralPiece, string>>
    className?: string
    size?: number
}

/**
 * Mural de la tienda: cada capítulo resuelto pinta una pieza.
 * El progreso no se muestra con una barra, se muestra con la tienda tomando color.
 */
export function Mural({ completed, colors = {}, className, size = 128 }: MuralProps) {
    const donePieces = new Set(
        completed.map((step) => MONEY_STEP_PIECES[step]).filter(Boolean) as MuralPiece[],
    )
    const fillOf = (piece: MuralPiece) =>
        donePieces.has(piece) ? (colors[piece] ?? PIECE_COLORS[piece]) : EMPTY

    const pieceClass = "transition-[fill] duration-700 ease-out"

    return (
        <svg
            viewBox="0 0 320 200"
            width={size}
            height={(size * 200) / 320}
            role="img"
            aria-label={`Mural de la tienda, ${donePieces.size} de 6 partes pintadas`}
            className={cn("shrink-0", className)}
        >
            <rect x="0" y="176" width="320" height="10" rx="5" className="fill-slate-200 dark:fill-zinc-800" />

            <rect
                x="90"
                y="8"
                width="140"
                height="28"
                rx="9"
                className={pieceClass}
                fill={fillOf("letrero")}
                stroke="#78350f"
                strokeOpacity="0.25"
            />

            <path
                d="M56 42 H264 L246 78 H74 Z"
                className={pieceClass}
                fill={fillOf("toldo")}
                stroke="#78350f"
                strokeOpacity="0.25"
            />
            <path d="M104 42 H128 L120 78 H96 Z" fill="#ffffff" fillOpacity="0.45" />
            <path d="M160 42 H184 L180 78 H156 Z" fill="#ffffff" fillOpacity="0.45" />
            <path d="M216 42 H240 L236 78 H212 Z" fill="#ffffff" fillOpacity="0.45" />

            <rect x="64" y="78" width="192" height="100" rx="4" className="fill-amber-100 dark:fill-zinc-800" stroke="#78350f" strokeOpacity="0.2" />

            <rect
                x="80"
                y="94"
                width="78"
                height="52"
                rx="4"
                className={pieceClass}
                fill={fillOf("vitrina")}
                stroke="#78350f"
                strokeOpacity="0.2"
            />

            <rect
                x="170"
                y="94"
                width="46"
                height="84"
                rx="4"
                className={pieceClass}
                fill={fillOf("puerta")}
                stroke="#78350f"
                strokeOpacity="0.2"
            />
            <circle cx="207" cy="138" r="3" fill="#ffffff" fillOpacity="0.7" />

            <rect
                x="228"
                y="94"
                width="20"
                height="60"
                rx="3"
                className={pieceClass}
                fill={fillOf("nevera")}
                stroke="#78350f"
                strokeOpacity="0.2"
            />
            <line x1="231" y1="112" x2="245" y2="112" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />

            <g className={cn(pieceClass)} fill={fillOf("maceta")}>
                <path d="M276 160 h26 l-4 20 h-18 Z" />
                <circle cx="283" cy="152" r="7" />
                <circle cx="295" cy="148" r="9" />
                <circle cx="291" cy="158" r="7" />
            </g>
        </svg>
    )
}
