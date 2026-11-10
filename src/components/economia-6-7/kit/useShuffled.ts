"use client"

import * as React from "react"

/**
 * Devuelve los elementos en un orden distinto para cada estudiante.
 * Se mezcla al montar y no durante el render: así el HTML del servidor y el
 * del cliente coinciden y la hidratación no se rompe.
 */
export function useShuffled<T>(items: readonly T[]): T[] {
    const [order, setOrder] = React.useState<number[]>(() => items.map((_, index) => index))

    React.useEffect(() => {
        setOrder((current) => {
            const next = [...current]
            for (let index = next.length - 1; index > 0; index--) {
                const swapWith = Math.floor(Math.random() * (index + 1))
                ;[next[index], next[swapWith]] = [next[swapWith], next[index]]
            }
            return next
        })
        // Se mezcla una sola vez por montaje.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return order.map((index) => items[index])
}
