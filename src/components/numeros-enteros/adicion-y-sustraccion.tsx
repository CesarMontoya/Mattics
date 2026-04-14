// src/components/numeros-enteros/adicion-y-sustraccion.tsx
import React from 'react';

const AdicionSustraccionEnteros: React.FC = () => {
  return (
    <div className="adicion-sustraccion-enteros-page">
      <h1>Adición y Sustracción de Números Enteros</h1>
      <p>
        En esta sección, exploraremos las operaciones de adición y sustracción con números enteros de una manera rigurosa.
        Nos basaremos en los conceptos previamente introducidos de números positivos y negativos,
        así como en el entendimiento de los valores relativos.
      </p>

      <h2>1. Adición de Números Enteros</h2>
      <h3>1.1. Adición de Números con el Mismo Signo</h3>
      <p>
        Para sumar dos números enteros con el mismo signo, se suman sus valores absolutos y
        se conserva el signo común.
      </p>
      <ul>
        <li>Ejemplo: (+3) + (+5) = +8</li>
        <li>Ejemplo: (-3) + (-5) = -8</li>
      </ul>

      <h3>1.2. Adición de Números con Signos Diferentes</h3>
      <p>
        Para sumar dos números enteros con signos diferentes, se restan sus valores absolutos
        (el mayor menos el menor) y se coloca el signo del número con mayor valor absoluto.
      </p>
      <ul>
        <li>Ejemplo: (+7) + (-4) = +3</li>
        <li>Ejemplo: (-7) + (+4) = -3</li>
      </ul>

      <h3>1.3. Propiedades de la Adición</h3>
      <ul>
        <li><strong>Conmutativa:</strong> a + b = b + a</li>
        <li><strong>Asociativa:</strong> (a + b) + c = a + (b + c)</li>
        <li><strong>Elemento Neutro:</strong> a + 0 = a</li>
        <li><strong>Elemento Opuesto:</strong> a + (-a) = 0</li>
      </ul>

      <h2>2. Sustracción de Números Enteros</h2>
      <p>
        La sustracción de dos números enteros se define como la adición del minuendo
        con el opuesto del sustraendo.
      </p>
      <p>a - b = a + (-b)</p>
      <ul>
        <li>Ejemplo: (+8) - (+3) = (+8) + (-3) = +5</li>
        <li>Ejemplo: (-8) - (-3) = (-8) + (+3) = -5</li>
        <li>Ejemplo: (+8) - (-3) = (+8) + (+3) = +11</li>
        <li>Ejemplo: (-8) - (+3) = (-8) + (-3) = -11</li>
      </ul>

      <h2>3. Ejercicios Rigurosos</h2>
      {/* Aquí podrías integrar componentes de ejercicios interactivos o explicaciones más profundas */}
      <p>
        A continuación, se presentarán ejercicios y demostraciones para consolidar
        el entendimiento de estas operaciones.
      </p>
    </div>
  );
};

export default AdicionSustraccionEnteros;
