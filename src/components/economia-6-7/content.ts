/**
 * Contenido pedagógico de la actividad "La tienda de la abuela".
 * Separado de los componentes para que el docente pueda ajustar textos y cifras
 * sin tocar la lógica de interacción.
 */

export interface RailItem {
    id: string
    emoji: string
    label: string
    detail: string
    feedback: string
}

/** Orden correcto: de la forma más antigua de intercambio al dinero digital. */
export const MONEY_TIMELINE: RailItem[] = [
    {
        id: "trueque",
        emoji: "🤝",
        label: "Trueque",
        detail: "Se cambiaba una cosa por otra: yuca por pescado, sin dinero de por medio.",
        feedback:
            "El trueque es el punto de partida: funciona, pero solo si las dos personas quieren justo lo que la otra tiene.",
    },
    {
        id: "monedas",
        emoji: "🪙",
        label: "Monedas",
        detail: "Un pedazo de metal con un valor acordado por toda la comunidad.",
        feedback:
            "Con la moneda apareció algo nuevo: un objeto que vale para todos, no solo para quien lo recibe.",
    },
    {
        id: "billetes",
        emoji: "💵",
        label: "Billetes",
        detail: "Papel respaldado por el gobierno: más liviano y más fácil de transportar.",
        feedback:
            "El billete resolvió un problema práctico: cargar monedas todo el día era pesado e incómodo.",
    },
    {
        id: "digital",
        emoji: "📱",
        label: "Dinero digital",
        detail: "El pago viaja por el celular, sin que ningún billete cambie de manos.",
        feedback:
            "Hoy el dinero también es información: se mueve sin billetes, pero sigue siendo un acuerdo entre personas.",
    },
]

export type MovementKind = "ingreso" | "gasto"

export interface Movement {
    id: string
    emoji: string
    label: string
    amount: number
    kind: MovementKind
    feedback: string
}

export const DAY_MOVEMENTS: Movement[] = [
    {
        id: "empanadas",
        emoji: "🫓",
        label: "Venta de 20 empanadas",
        amount: 30000,
        kind: "ingreso",
        feedback: "Entra plata a la caja: es un ingreso.",
    },
    {
        id: "aceite",
        emoji: "🛒",
        label: "Compra de aceite y harina",
        amount: 18000,
        kind: "gasto",
        feedback: "Sin aceite no hay empanadas, pero la plata sale de la caja: es un gasto.",
    },
    {
        id: "jugos",
        emoji: "🧃",
        label: "Venta de 5 jugos",
        amount: 12000,
        kind: "ingreso",
        feedback: "Otra venta del día: el dinero entra. Es un ingreso.",
    },
    {
        id: "luz",
        emoji: "💡",
        label: "Recibo de la luz",
        amount: 22000,
        kind: "gasto",
        feedback: "La tienda necesita luz para funcionar, pero pagarla es un gasto.",
    },
    {
        id: "fiado",
        emoji: "🙋",
        label: "Un vecino paga lo que debía",
        amount: 8000,
        kind: "ingreso",
        feedback:
            "Hoy no vendiste nada, pero la plata entra igual: recuperar una deuda también es un ingreso.",
    },
    {
        id: "domicilio",
        emoji: "🛵",
        label: "Propina para el domiciliario",
        amount: 3000,
        kind: "gasto",
        feedback: "Es un pago por un servicio: sale de la caja. Es un gasto.",
    },
]

export const DAY_TOTALS = DAY_MOVEMENTS.reduce(
    (acc, movement) => {
        const key = movement.kind === "ingreso" ? "income" : "expense"
        acc[key] += movement.amount
        return acc
    },
    { income: 0, expense: 0 },
)

/** Costos del puesto de jugos del capítulo 3. */
export const JUICE_STAND = {
    costPerGlass: 1500,
    glassesPerDay: 20,
    goalProfit: 20000,
    minPrice: 1000,
    maxPrice: 4000,
    step: 100,
}

export type HabitKind = "bueno" | "malo"

export interface HabitCard {
    id: string
    emoji: string
    label: string
    kind: HabitKind
    feedback: string
}

export const HABIT_CARDS: HabitCard[] = [
    {
        id: "anotar",
        emoji: "📒",
        label: "Anotar lo que entra y lo que sale",
        kind: "bueno",
        feedback: "Si no sabes cuánto tienes, no puedes decidir. Anotar es el primer hábito.",
    },
    {
        id: "credito",
        emoji: "💳",
        label: "Comprar a crédito sin saber cuánto vas a pagar en total",
        kind: "malo",
        feedback: "Una cuota pequeña puede esconder una deuda enorme. Hay que mirar el total, no la cuota.",
    },
    {
        id: "guardar",
        emoji: "🐖",
        label: "Guardar algo cada semana, aunque sea poquito",
        kind: "bueno",
        feedback: "Lo pequeño y constante crece. Así se junta la nevera, el estudio o el imprevisto.",
    },
    {
        id: "sueldo",
        emoji: "💸",
        label: "Gastar todo el sueldo el mismo día que llega",
        kind: "malo",
        feedback: "Si la plata se va el primer día, el resto del mes se vuelve una emergencia.",
    },
    {
        id: "comparar",
        emoji: "⚖️",
        label: "Comparar precios antes de comprar",
        kind: "bueno",
        feedback: "Comparar cuesta cinco minutos y puede ahorrar miles. Es observar antes de decidir.",
    },
    {
        id: "gusto",
        emoji: "🎁",
        label: "Pedir prestado para un gusto, no para una necesidad",
        kind: "malo",
        feedback: "Un gusto pagado con deuda se vuelve más caro y más largo. La deuda es para lo que no puede esperar.",
    },
    {
        id: "separar",
        emoji: "🗂️",
        label: "Separar la plata del negocio de la plata de la casa",
        kind: "bueno",
        feedback: "Si todo se mezcla, el negocio parece que gana cuando en realidad se está gastando la caja.",
    },
    {
        id: "oferta",
        emoji: "🏷️",
        label: "Comprar solo porque está en oferta",
        kind: "malo",
        feedback: "Una oferta de algo que no necesitas no es un ahorro: es un gasto con descuento.",
    },
]

/** Junta de ahorro del capítulo 5. */
export const SAVINGS_CIRCLE = {
    fridgePrice: 600000,
    members: 12,
    minFee: 20000,
    maxFee: 80000,
    step: 5000,
}

export interface SavingsGoal {
    id: string
    label: string
    emoji: string
    price: number
}

export const PERSONAL_GOALS: SavingsGoal[] = [
    { id: "bicicleta", label: "Una bicicleta", emoji: "🚲", price: 240000 },
    { id: "tableta", label: "Una tableta para estudiar", emoji: "📱", price: 480000 },
    { id: "regalo", label: "Un regalo para la abuela", emoji: "🎁", price: 120000 },
]

export const MURAL_COLORS = [
    { id: "terracota", value: "#c2410c", label: "Terracota" },
    { id: "mostaza", value: "#d97706", label: "Mostaza" },
    { id: "verde", value: "#15803d", label: "Verde" },
    { id: "azul", value: "#1d4ed8", label: "Azul" },
    { id: "rojo", value: "#b91c1c", label: "Rojo" },
    { id: "violeta", value: "#7e22ce", label: "Violeta" },
]
