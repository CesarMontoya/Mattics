/**
 * Orden aleatorio para repartir resultados entre días.
 * Rechaza los órdenes que dejan los signos alternados (+ − + − +): ese patrón
 * permite resolver el ejercicio sin leer una sola tarjeta.
 * Solo debe llamarse en el cliente, nunca durante el render.
 */
export function randomOrder(length: number, signOf: (index: number) => number): number[] {
    const base = Array.from({ length }, (_, index) => index)

    for (let attempt = 0; attempt < 80; attempt++) {
        const order = [...base]
        for (let index = order.length - 1; index > 0; index--) {
            const swapWith = Math.floor(Math.random() * (index + 1))
            ;[order[index], order[swapWith]] = [order[swapWith], order[index]]
        }

        const signs = order.map(signOf)
        const hasRepeat = signs.some((sign, index) => index > 0 && sign === signs[index - 1])
        const isStillSorted = order.every((value, index) => value === index)

        if (hasRepeat && !isStillSorted) return order
    }

    return base
}
