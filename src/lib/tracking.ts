import type { Student } from "@/hooks/use-student";

// Google Apps Script Deploy URL (Example)
// Si quieres activar el guardado real, crea un Google Sheet, abre Extensiones > Apps Script
// y pega el código que te daré abajo. Luego pega aquí la URL que te den al "Desplegar".
const TRACKING_ENDPOINT = "https://script.google.com/macros/s/AKfycbwyEz9sD6c3kvRgZkVEVP1BrSC_vmG-uteqo__ft2ZMipDTrzoFhxqWMxQIwDbPSDTr/exec"; 

export interface ExerciseAttempt {
  student: Student;
  pillId: number;
  questionId: string;
  answer: string;
  isCorrect: boolean;
  timestamp: string;
}

export async function registerAttempt(attempt: ExerciseAttempt) {
  console.log("Attempt registered locally:", attempt);
  
  if (!TRACKING_ENDPOINT) return;

  try {
    // Usamos mode: 'no-cors' porque Google Apps Script suele tener temas de CORS
    // pero igual recibe el dato si es un webhook simple.
    await fetch(TRACKING_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attempt),
    });
  } catch (error) {
    console.error('Error sending attempt:', error);
  }
}

export async function registerPillCompletion(student: Student, pillId: number, score: number, total: number) {
  const completionData = {
    event: 'pill_complete',
    student,
    pillId,
    score,
    total,
    timestamp: new Date().toISOString(),
  };

  console.log("Pill completed locally:", completionData);

  if (!TRACKING_ENDPOINT) return;

  try {
    await fetch(TRACKING_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completionData),
    });
  } catch (error) {
    console.error('Error sending completion:', error);
  }
}
