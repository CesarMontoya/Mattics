/**
 * Mezcla determinista: misma semilla, mismo orden en servidor y cliente.
 * Evita `Math.random()` en render, que rompe la hidratación de Astro.
 */
export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
    const result = [...items]
    let state = seed >>> 0

    const next = () => {
        state = (state * 1664525 + 1013904223) % 4294967296
        return state / 4294967296
    }

    for (let index = result.length - 1; index > 0; index--) {
        const swapWith = Math.floor(next() * (index + 1))
        ;[result[index], result[swapWith]] = [result[swapWith], result[index]]
    }

    return result
}
