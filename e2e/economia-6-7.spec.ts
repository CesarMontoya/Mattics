import { test, expect, type Page } from "@playwright/test"

/**
 * Recorre la actividad completa de "La tienda de la abuela".
 * Requiere el build servido en `bun run preview` (lo levanta playwright.config.ts).
 */

async function setRange(page: Page, selector: string, value: number) {
    await page.locator(selector).evaluate((element, next) => {
        const input = element as HTMLInputElement
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
        setter?.call(input, String(next))
        input.dispatchEvent(new Event("input", { bubbles: true }))
        input.dispatchEvent(new Event("change", { bubbles: true }))
    }, value)
}

async function sortInto(page: Page, cardId: string, zoneId: string) {
    await page.getByTestId(`sort-card-${cardId}`).click()
    await page.getByTestId(`sort-zone-${zoneId}`).click()
}

test("la actividad se completa de punta a punta", async ({ page }) => {
    await page.goto("/economia-6-7")

    await expect(page.getByRole("heading", { name: "La tienda de la abuela" })).toBeVisible()

    // Prólogo
    await page.getByRole("button", { name: /Cuento lo que hay/ }).click()
    await page.getByRole("button", { name: /Abrir la tienda/ }).click()

    // Capítulo 1: línea de tiempo
    const timeline: [string, number][] = [
        ["trueque", 0],
        ["monedas", 1],
        ["billetes", 2],
        ["digital", 3],
    ]
    for (const [id, slot] of timeline) {
        await page.getByTestId(`rail-card-${id}`).click()
        await page.getByTestId(`rail-slot-${slot}`).click()
    }
    await page.getByTestId("rail-check").click()
    await expect(page.getByText(/Ese es el camino/)).toBeVisible()
    await page.getByRole("button", { name: "Continuar" }).click()

    // Capítulo 2: ingresos y gastos
    const movements: [string, string][] = [
        ["empanadas", "ingreso"],
        ["aceite", "gasto"],
        ["jugos", "ingreso"],
        ["luz", "gasto"],
        ["fiado", "ingreso"],
        ["domicilio", "gasto"],
    ]
    for (const [cardId, zoneId] of movements) {
        await sortInto(page, cardId, zoneId)
    }
    await expect(page.getByText("La cuenta del día")).toBeVisible()
    await expect(page.getByText("$50.000").first()).toBeVisible()
    await page.getByRole("button", { name: "Continuar" }).click()

    // Capítulo 3: precio del jugo
    await setRange(page, "#precio-jugo", 2500)
    await page.getByRole("button", { name: "Confirmar precio" }).click()
    await expect(page.getByText(/la ganancia del día es \$20.000/i)).toBeVisible()
    await page.getByRole("button", { name: "Continuar" }).click()

    // Capítulo 4: hábitos
    const habits: [string, string][] = [
        ["anotar", "bueno"],
        ["credito", "malo"],
        ["guardar", "bueno"],
        ["sueldo", "malo"],
        ["comparar", "bueno"],
        ["gusto", "malo"],
        ["separar", "bueno"],
        ["oferta", "malo"],
    ]
    for (const [cardId, zoneId] of habits) {
        await sortInto(page, cardId, zoneId)
    }
    await expect(page.getByText(/Ninguno de estos hábitos/)).toBeVisible()
    await page.getByRole("button", { name: "Continuar" }).click()

    // Capítulo 5: la semana en el cuaderno (enteros con signo).
    // El reparto de resultados es aleatorio, así que se prueba un signo y, si no
    // queda fijado, el otro. Así la prueba no depende del orden que salga.
    for (const dayId of ["lunes", "martes", "miercoles", "jueves", "viernes"]) {
        const row = page.getByTestId(`day-${dayId}`)
        await page.getByTestId("sign-positive").click()
        await row.click()
        if (!(await row.isDisabled())) {
            await page.getByTestId("sign-negative").click()
            await row.click()
        }
        await expect(row).toBeDisabled()
    }
    await expect(page.getByText("El cuaderno está completo")).toBeVisible()
    await page.getByTestId("total-absolutos").click()
    await expect(page.getByText(/error clásico/)).toBeVisible()
    await page.getByTestId("total-correcto").click()
    await expect(page.getByText("El camino de la semana")).toBeVisible()
    await page.getByRole("button", { name: "Continuar" }).click()

    // Cierre: postal y plan
    await expect(page.getByText("Mi plan de ahorro")).toBeVisible()
    await page.getByRole("button", { name: "Vitrina" }).click()
    await page.getByRole("button", { name: "Verde" }).click()
    await expect(page.getByRole("button", { name: /Imprimir mi postal/ })).toBeVisible()
    await expect(page.getByText(/Guardar/)).toBeVisible()
})

test("explica el error en vez de solo marcarlo", async ({ page }) => {
    await page.goto("/economia-6-7?paso=3")

    // Coloca un ingreso en el grupo de gastos: debe explicar por qué no lo es.
    await sortInto(page, "empanadas", "gasto")
    await expect(page.getByText(/Entra plata a la caja: es un ingreso/)).toBeVisible()
    await expect(page.getByTestId("sort-card-empanadas")).toBeVisible()

    // Y al colocarlo bien, la tarjeta se queda en su grupo.
    await sortInto(page, "empanadas", "ingreso")
    await expect(page.getByTestId("sort-card-empanadas")).toHaveCount(0)
})

test("conserva el progreso al recargar", async ({ page }) => {
    await page.goto("/economia-6-7")
    await page.getByRole("button", { name: /Cuento lo que hay/ }).click()
    await page.getByRole("button", { name: /Abrir la tienda/ }).click()
    await expect(page.getByText("Paso 2 de 7")).toBeVisible()

    await page.reload()
    await expect(page.getByText("Paso 2 de 7")).toBeVisible()
    await expect(page.getByRole("heading", { name: "¿De dónde viene este billete?" })).toBeVisible()
})
