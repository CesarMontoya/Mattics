export const STEP_EXERCISES_DATA = {
    product: [
        {
            id: 1,
            question: "\\sqrt[3]{125 \\times 64}",
            prompts: [
                {
                    format: ["BOX", "\\times", "BOX"],
                    answers: ["\\sqrt[3]{125}", "\\sqrt[3]{64}"],
                    symmetric: true,
                    options: ["\\sqrt[4]{64}", "\\sqrt[3]{125}", "\\sqrt[3]{64}", "\\sqrt{125}"],
                    explanationText: "¡Excelente! El primer paso es separar la raíz conservando el índice 3 en ambos factores."
                },
                {
                    format: ["=", "BOX", "\\times", "BOX"],
                    answers: ["5", "4"],
                    symmetric: true,
                    options: ["8", "5", "25", "4"],
                    explanationText: "¡Correcto! Calculaste las raíces de forma individual: $\\sqrt[3]{125} = 5$ y $\\sqrt[3]{64} = 4$."
                },
                {
                    format: ["=", "BOX"],
                    answers: ["20"],
                    symmetric: false,
                    options: ["9", "54", "20", "8000"],
                    explanationText: "¡Muy bien! $5 \\times 4 = 20$. ¡Has resuelto el ejercicio paso a paso!"
                }
            ]
        },
        {
            id: 2,
            question: "\\sqrt{16 \\times 49 \\times 81}",
            prompts: [
                {
                    format: ["BOX", "\\times", "BOX", "\\times", "BOX"],
                    answers: ["\\sqrt{16}", "\\sqrt{49}", "\\sqrt{81}"],
                    symmetric: true,
                    options: ["49", "\\sqrt{81}", "\\sqrt[3]{81}", "\\sqrt{16}", "16", "\\sqrt{49}"],
                    explanationText: "¡Excelente! Separamos la raíz cuadrada en tres partes."
                },
                {
                    format: ["=", "BOX", "\\times", "BOX", "\\times", "BOX"],
                    answers: ["4", "7", "9"],
                    symmetric: true,
                    options: ["8", "4", "3", "7", "6", "9"],
                    explanationText: "¡Correcto! $\\sqrt{16}=4$, $\\sqrt{49}=7$, y $\\sqrt{81}=9$."
                },
                {
                    format: ["=", "BOX"],
                    answers: ["252"],
                    symmetric: false,
                    options: ["146", "252", "108", "14"],
                    explanationText: "¡Exacto! El producto final es $4 \\times 7 \\times 9 = 252$."
                }
            ]
        },
        {
            id: 3,
            question: "\\sqrt[16]{m \\times n}",
            prompts: [
                {
                    format: ["BOX", "\\times", "BOX"],
                    answers: ["\\sqrt[16]{m}", "\\sqrt[16]{n}"],
                    symmetric: true,
                    options: ["\\sqrt{m}", "n", "\\sqrt[16]{n}", "m", "\\sqrt{n}", "\\sqrt[16]{m}"],
                    explanationText: "¡Muy bien! Como solo debemos aplicar la propiedad separando los factores, el ejercicio termina aquí."
                }
            ]
        },
        {
            id: 4,
            question: "\\sqrt[11]{a^2 \\times b^4 \\times c^5}",
            prompts: [
                {
                    format: ["BOX", "\\times", "BOX", "\\times", "BOX"],
                    answers: ["\\sqrt[11]{a^2}", "\\sqrt[11]{b^4}", "\\sqrt[11]{c^5}"],
                    symmetric: true,
                    options: ["\\sqrt[11]{c^5}", "\\sqrt{a^2}", "\\sqrt[11]{a^2}", "\\sqrt{b^4}", "\\sqrt[11]{b^4}", "\\sqrt{c^5}"],
                    explanationText: "¡Exacto! Hemos distribuido la raíz onceava para cada factor."
                }
            ]
        }
    ],
    quotient: [
        {
            id: 1,
            question: "\\sqrt{\\frac{144}{9}}",
            prompts: [
                {
                    format: ["\\frac{BOX}{BOX}"],
                    answers: ["\\sqrt{144}", "\\sqrt{9}"], // Note: order matters for division
                    symmetric: false,
                    options: ["9", "\\sqrt{9}", "\\sqrt{144}", "144"],
                    explanationText: "¡Excelente! El primer paso es aplicar la raíz tanto al numerador como al denominador."
                },
                {
                    format: ["=", "\\frac{BOX}{BOX}"],
                    answers: ["12", "3"],
                    symmetric: false,
                    options: ["3", "12", "72", "4"],
                    explanationText: "¡Correcto! Calculamos las raíces individuales: $\\sqrt{144} = 12$ y $\\sqrt{9} = 3$."
                },
                {
                    format: ["=", "BOX"],
                    answers: ["4"],
                    symmetric: false,
                    options: ["16", "3", "4", "12"],
                    explanationText: "¡Exacto! Finalmente $12 \\div 3 = 4$."
                }
            ]
        },
        {
            id: 2,
            question: "\\sqrt[3]{\\frac{1000 \\times 8}{64}}",
            prompts: [
                {
                    format: ["\\frac{BOX \\times BOX}{BOX}"],
                    answers: ["\\sqrt[3]{1000}", "\\sqrt[3]{8}", "\\sqrt[3]{64}"], // Let's keep specific order to match format simply: [num1, num2, den]
                    symmetric: false, 
                    // To handle symmetric num, we would need complex logic. We will rely on user putting 1000 first, or we can just make it exact match.
                    options: ["64", "\\sqrt[3]{8}", "1000", "\\sqrt[3]{64}", "8", "\\sqrt[3]{1000}"],
                    explanationText: "¡Bien hecho! Hemos distribuido la raíz cúbica a todos los factores y al denominador."
                },
                {
                    format: ["=", "\\frac{BOX \\times BOX}{BOX}"],
                    answers: ["10", "2", "4"],
                    symmetric: false,
                    options: ["16", "4", "5", "8", "2", "10"],
                    explanationText: "¡Correcto! Resolviste cada raíz individual."
                },
                {
                    format: ["=", "\\frac{BOX}{BOX}"],
                    answers: ["20", "4"],
                    symmetric: false,
                    options: ["10", "4", "20", "8"],
                    explanationText: "¡Genial! Multiplicaste el numerador $10 \\times 2 = 20$."
                },
                {
                    format: ["=", "BOX"],
                    answers: ["5"],
                    symmetric: false,
                    options: ["20", "5", "10", "2"],
                    explanationText: "¡Excelente! Finalmente dividiste $20 \\div 4 = 5$."
                }
            ]
        },
        {
            id: 3,
            question: "\\sqrt[4]{\\frac{x}{y}}",
            prompts: [
                {
                    format: ["\\frac{BOX}{BOX}"],
                    answers: ["\\sqrt[4]{x}", "\\sqrt[4]{y}"],
                    symmetric: false,
                    options: ["\\sqrt{x}", "\\sqrt[4]{y}", "\\sqrt{y}", "\\sqrt[4]{x}"],
                    explanationText: "¡Muy bien! Distribuimos la raíz en numerador y denominador."
                }
            ]
        },
        {
            id: 4,
            question: "\\sqrt{\\frac{(3^2)^2}{9}}",
            prompts: [
                {
                    format: ["\\sqrt{\\frac{BOX}{BOX}}"],
                    answers: ["3^4", "3^2"], // Inside root, solve powers first
                    symmetric: false,
                    options: ["3^2", "9", "3^6", "3^4"],
                    explanationText: "¡Bien! Primero resolvimos la potencia de una potencia $(3^2)^2 = 3^4$ y expresamos el $9$ como $3^2$."
                },
                {
                    format: ["=", "\\sqrt{BOX}"],
                    answers: ["3^2"],
                    symmetric: false,
                    options: ["3^6", "3^2", "3^4"],
                    explanationText: "¡Correcto! Dividimos potencias de igual base restando exponentes: $4 - 2 = 2$, queda $3^2$."
                },
                {
                    format: ["=", "BOX"],
                    answers: ["3"],
                    symmetric: false,
                    options: ["27", "9", "3", "81"],
                    explanationText: "¡Excelente! La raíz cuadrada se anula con la potencia 2, y nos queda 3."
                }
            ]
        }
    ],
    rootOfRoot: [
        {
            id: 1,
            question: "\\sqrt{\\sqrt{81}}",
            prompts: [
                {
                    format: ["\\sqrt[BOX]{81}"],
                    answers: ["4"],
                    symmetric: false,
                    options: ["2", "4", "8", "6"],
                    explanationText: "¡Excelente! Multiplicaste los índices ocultos $2 \\times 2 = 4$."
                },
                {
                    format: ["=", "BOX"],
                    answers: ["3"],
                    symmetric: false,
                    options: ["27", "81", "3", "9"],
                    explanationText: "¡Correcto! La raíz cuarta de $81$ es $3$."
                }
            ]
        },
        {
            id: 2,
            question: "\\sqrt{\\sqrt[3]{64}}",
            prompts: [
                {
                    format: ["\\sqrt[BOX]{64}"],
                    answers: ["6"],
                    symmetric: false,
                    options: ["4", "8", "6", "5"],
                    explanationText: "¡Bien! Multiplicamos los índices $2 \\times 3 = 6$."
                },
                {
                    format: ["=", "BOX"],
                    answers: ["2"],
                    symmetric: false,
                    options: ["6", "4", "8", "2"],
                    explanationText: "¡Exacto! La raíz sexta de $64$ es $2$."
                }
            ]
        },
        {
            id: 3,
            question: "\\sqrt[3]{\\sqrt{a}}",
            prompts: [
                {
                    format: ["\\sqrt[BOX]{BOX}"],
                    answers: ["6", "a"],
                    symmetric: false,
                    options: ["5", "a", "6", "a^2"],
                    explanationText: "¡Muy bien! Multiplicamos los índices $3 \\times 2 = 6$, obteniendo $\\sqrt[6]{a}$."
                }
            ]
        },
        {
            id: 4,
            question: "\\sqrt{\\sqrt{(2^2)^4}}",
            prompts: [
                {
                    format: ["\\sqrt[BOX]{BOX}"],
                    answers: ["4", "2^8"], // 2x2=4 and (2^2)^4=2^8
                    symmetric: false,
                    options: ["8", "2^8", "2^6", "4"],
                    explanationText: "¡Excelente! Resolvimos potencia de potencia $(2^2)^4 = 2^8$, y multiplicamos los índices $2 \\times 2 = 4$."
                },
                {
                    format: ["=", "BOX"],
                    answers: ["2^2"],
                    symmetric: false,
                    options: ["2^4", "2^2", "2^8"],
                    explanationText: "¡Bien! Dividimos exponente entre índice: $8 \\div 4 = 2$, por lo que nos queda $2^2$."
                },
                {
                    format: ["=", "BOX"],
                    answers: ["4"],
                    symmetric: false,
                    options: ["16", "2", "4", "8"],
                    explanationText: "¡Correcto! Finalmente $2^2 = 4$."
                }
            ]
        }
    ]
}
