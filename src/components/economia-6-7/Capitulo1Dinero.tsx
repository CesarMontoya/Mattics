"use client"

import * as React from "react"
import { GrandmaSays } from "./kit/SliceShell"
import { OrderRail } from "./kit/OrderRail"
import { MONEY_TIMELINE } from "./content"
import type { StepProps } from "./kit/types"

export function Capitulo1Dinero({ onDone }: StepProps) {
    return (
        <div className="space-y-5">
            <GrandmaSays>
                Cuando yo era niña no se compraba con plata. Se cambiaba. Si tú tenías yuca y yo tenía pescado,
                hacíamos negocio. Pero si yo no quería yuca, ¿qué hacía?
            </GrandmaSays>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                Esa pregunta es la que hizo que existiera el dinero. Pon los cuatro momentos en orden: del más
                antiguo al más reciente.
            </p>

            <OrderRail items={MONEY_TIMELINE} onSolved={() => onDone()} />
        </div>
    )
}
