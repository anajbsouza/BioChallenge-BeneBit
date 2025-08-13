"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Droplets, Send, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type DayKey = "Seg" | "Ter" | "Qua" | "Qui" | "Sex" | "Sáb" | "Dom"

interface DayTasks {
  done: number
  total: number
}

interface UrineSummary {
  volumeMl: number
  day: number
  night: number
  leaks: number
}

export default function HealthReportsPage() {
  const [selectedDay, setSelectedDay] = useState<DayKey>("Seg")
  const [contactEmails, setContactEmails] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load contact emails from localStorage
    const storedEmails = JSON.parse(localStorage.getItem("healthReportEmails") || "[]")
    setContactEmails(storedEmails)
  }, [])

  // Mock data - TODO: Replace with API calls
  // TODO: GET /users/summary?week=YYYY-WW → weekly tasks (x/y per day)
  const weeklyTasks: Record<DayKey, DayTasks> = {
    Seg: { done: 4, total: 5 },
    Ter: { done: 5, total: 5 },
    Qua: { done: 2, total: 5 },
    Qui: { done: 4, total: 5 },
    Sex: { done: 5, total: 5 },
    Sáb: { done: 1, total: 5 },
    Dom: { done: 0, total: 0 },
  }

  // TODO: GET /urine/logs/summary?date=YYYY-MM-DD → volume/day/night/leaks
  const urineByDay: Record<DayKey, UrineSummary> = {
    Seg: { volumeMl: 1085, day: 5, night: 2, leaks: 1 },
    Ter: { volumeMl: 1200, day: 6, night: 1, leaks: 0 },
    Qua: { volumeMl: 950, day: 4, night: 3, leaks: 2 },
    Qui: { volumeMl: 1150, day: 5, night: 2, leaks: 0 },
    Sex: { volumeMl: 1300, day: 7, night: 1, leaks: 1 },
    Sáb: { volumeMl: 800, day: 3, night: 4, leaks: 3 },
    Dom: { volumeMl: 1000, day: 4, night: 2, leaks: 1 },
  }

  const dayNames: Record<DayKey, string> = {
    Seg: "Segunda-feira",
    Ter: "Terça-feira",
    Qua: "Quarta-feira",
    Qui: "Quinta-feira",
    Sex: "Sexta-feira",
    Sáb: "Sábado",
    Dom: "Domingo",
  }

  const getCompletionEmoji = (done: number, total: number): string => {
    if (total === 0) return "⚪️"
    const percentage = (done / total) * 100
    if (percentage >= 90) return "😀"
    if (percentage >= 70) return "🙂"
    if (percentage >= 40) return "😐"
    return "☹️"
  }

  function colorClass(done: number, total: number): string {
    if (total === 0) return "bg-slate-200 text-slate-500"
    const pct = (done / total) * 100
    if (pct >= 90) return "bg-emerald-500"
    if (pct >= 70) return "bg-amber-400"
    if (pct >= 40) return "bg-stone-300 text-slate-800"
    if (pct > 0) return "bg-rose-500"
    return "bg-slate-200 text-slate-500"
  }

  const sendWeeklyReport = async () => {
    try {
      if (contactEmails.length === 0) {
        toast({
          title: "Nenhum contato",
          description: "Adicione contatos no seu perfil para enviar o relatório.",
          variant: "destructive",
        })
        return
      }

      // TODO: Replace with actual API call
      // await fetch('/reports/weekly', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ emails: contactEmails })
      // })

      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Relatório enviado!",
        description: `Enviado para ${contactEmails.length} contato(s).`,
      })
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const selectedUrine = urineByDay[selectedDay]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-4 pb-28">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Relatório</h1>
        </div>

        {/* Send Report Button - Full Width */}
        <div className="space-y-3">
          <Button
            onClick={sendWeeklyReport}
            className="w-full h-16 text-xl font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Enviar relatório semanal"
          >
            <Send className="w-6 h-6 mr-3" />
            Enviar relatório
          </Button>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-lg text-blue-800 font-medium leading-relaxed">
                O relatório será enviado para os e-mails definidos em Contatos (Perfil).
              </p>
            </div>
          </div>
        </div>

        {/* Section 1 - Tarefas (weekly) */}
        <section className="rounded-2xl border-2 border-green-200 bg-white/80 backdrop-blur-sm p-4 sm:p-5 overflow-visible">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">Tarefas</h2>
          <div className="grid grid-cols-7 gap-2 px-1 sm:px-2 place-items-center">
            {(Object.keys(weeklyTasks) as DayKey[]).map((day) => {
              const tasks = weeklyTasks[day]
              const emoji = getCompletionEmoji(tasks.done, tasks.total)
              const bgColor = colorClass(tasks.done, tasks.total)
              const isSelected = selectedDay === day

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "w-full max-w-[44px] sm:max-w-[52px]",
                    "aspect-[3/4] rounded-2xl shadow-sm",
                    bgColor,
                    "text-white outline-none transition-all duration-200",
                    isSelected
                      ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white scale-105"
                      : "hover:ring-1 hover:ring-blue-300 ring-offset-2 ring-offset-white hover:scale-105",
                    "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                    "active:scale-95",
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Tarefas de ${day}: ${tasks.done} de ${tasks.total} completas`}
                >
                  <div className="flex h-full flex-col items-center justify-center leading-tight text-center">
                    <span className="text-base sm:text-lg mb-1">{emoji}</span>
                    <span className="text-[10px] sm:text-xs font-semibold mb-0.5">
                      {tasks.done}/{tasks.total}
                    </span>
                    <span className="text-[10px] opacity-90 font-medium">{day}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Section 2 - Xixi (daily) */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl text-gray-800 flex items-center gap-4">
              <Droplets className="w-8 h-8 text-blue-600" />
              <div>
                <h2>Xixi</h2>
                <p className="text-xl font-medium text-gray-600 mt-2">{dayNames[selectedDay]}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Volume Total */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-8 text-center shadow-lg">
              <p className="text-xl font-bold text-blue-800 mb-3">Volume total:</p>
              <p className="text-4xl font-bold text-blue-900">{selectedUrine.volumeMl} ml</p>
            </div>

            {/* Frequência */}
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Frequência</h3>
              <div className="grid grid-cols-3 gap-4">
                {/* Dia */}
                <div className="bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-2xl p-6 min-h-[120px] shadow-lg">
                  <div className="flex flex-col items-center text-center gap-1 h-full justify-center">
                    <div className="text-4xl mb-2">☀️</div>
                    <div className="text-3xl font-bold text-yellow-800">{selectedUrine.day}</div>
                    <div className="text-lg font-bold text-yellow-700">Dia</div>
                  </div>
                </div>

                {/* Noite */}
                <div className="bg-gradient-to-b from-purple-100 to-purple-200 rounded-2xl p-6 min-h-[120px] shadow-lg">
                  <div className="flex flex-col items-center text-center gap-1 h-full justify-center">
                    <div className="text-4xl mb-2">🌙</div>
                    <div className="text-3xl font-bold text-purple-800">{selectedUrine.night}</div>
                    <div className="text-lg font-bold text-purple-700">Noite</div>
                  </div>
                </div>

                {/* Vazamentos */}
                <div className="bg-gradient-to-b from-red-100 to-red-200 rounded-2xl p-6 min-h-[120px] shadow-lg">
                  <div className="flex flex-col items-center text-center gap-1 h-full justify-center">
                    <div className="text-4xl mb-2">💧</div>
                    <div className="text-3xl font-bold text-red-800">{selectedUrine.leaks}</div>
                    <div className="text-lg font-bold text-red-700">Vazamentos</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
