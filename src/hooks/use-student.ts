import { useState, useEffect } from 'react';

const STUDENT_KEY = 'mattics-student-identity';

export interface Student {
  id: string; // Document number
  name?: string;
  group?: string;
}

export function useStudent() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STUDENT_KEY);
    if (saved) {
      try {
        setStudent(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse student data", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (data: Student) => {
    setStudent(data);
    localStorage.setItem(STUDENT_KEY, JSON.stringify(data));
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem(STUDENT_KEY);
  };

  return { student, login, logout, loading };
}
