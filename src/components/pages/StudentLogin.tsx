import * as React from "react"
import { Button } from "@/components/ui/sidebar/button"
import { CreditCard, GraduationCap } from "lucide-react"

interface StudentLoginProps {
  onLogin: (id: string) => void
}

export function StudentLogin({ onLogin }: StudentLoginProps) {
  const [docId, setDocId] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (docId.trim()) {
      onLogin(docId.trim())
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white dark:bg-zinc-900 rounded-3xl border-2 border-slate-200 dark:border-zinc-800 shadow-xl text-center animate-in fade-in zoom-in duration-500">
      <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-2">¡Bienvenido!</h2>
      <p className="text-slate-600 dark:text-zinc-400 mb-6">Ingresa tu número de documento para registrar tu progreso.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Número de documento"
            value={docId}
            onChange={(e) => setDocId(e.target.value.replace(/\D/g, ""))}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-zinc-700 dark:bg-zinc-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            required
            autoFocus
          />
        </div>
        <Button type="submit" className="w-full py-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-lg shadow-blue-200 dark:shadow-none">
          Empezar Actividad
        </Button>
      </form>
    </div>
  )
}
