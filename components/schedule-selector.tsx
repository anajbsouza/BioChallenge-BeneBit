"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Repeat, Bell, Plus, X } from "lucide-react"

export interface ScheduleData {
  time: string[]
  days: string[]
  specificDate?: string
  repeat: {
    type: "daily" | "weekly" | "every-x-days" | "multiple-daily" | "custom"
    interval?: number
    timesPerDay?: number
  }
  reminder: {
    enabled: boolean
    times: string[]
    repeatIfIgnored: boolean
  }
}

interface ScheduleSelectorProps {
  schedule: ScheduleData
  onScheduleChange: (schedule: ScheduleData) => void
}

const daysOfWeek = [
  { value: "segunda", label: "Seg", fullLabel: "Segunda" },
  { value: "terca", label: "Ter", fullLabel: "Terça" },
  { value: "quarta", label: "Qua", fullLabel: "Quarta" },
  { value: "quinta", label: "Qui", fullLabel: "Quinta" },
  { value: "sexta", label: "Sex", fullLabel: "Sexta" },
  { value: "sabado", label: "Sáb", fullLabel: "Sábado" },
  { value: "domingo", label: "Dom", fullLabel: "Domingo" },
]

const timeOptions = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
]

export function ScheduleSelector({ schedule, onScheduleChange }: ScheduleSelectorProps) {
  const [showCustomRepeat, setShowCustomRepeat] = useState(false)
  const [newReminderTime, setNewReminderTime] = useState("")

  const updateSchedule = (updates: Partial<ScheduleData>) => {
    onScheduleChange({ ...schedule, ...updates })
  }

  const toggleDay = (day: string) => {
    const newDays = schedule.days.includes(day) ? schedule.days.filter((d) => d !== day) : [...schedule.days, day]
    updateSchedule({ days: newDays })
  }

  const addTime = (time: string) => {
    if (!schedule.time.includes(time)) {
      updateSchedule({ time: [...schedule.time, time] })
    }
  }

  const removeTime = (time: string) => {
    updateSchedule({ time: schedule.time.filter((t) => t !== time) })
  }

  const addReminderTime = () => {
    if (newReminderTime && !schedule.reminder.times.includes(newReminderTime)) {
      updateSchedule({
        reminder: {
          ...schedule.reminder,
          times: [...schedule.reminder.times, newReminderTime],
        },
      })
      setNewReminderTime("")
    }
  }

  const removeReminderTime = (time: string) => {
    updateSchedule({
      reminder: {
        ...schedule.reminder,
        times: schedule.reminder.times.filter((t) => t !== time),
      },
    })
  }

  const formatScheduleSummary = () => {
    const parts = []

    if (schedule.days.length > 0) {
      const dayLabels = schedule.days.map((day) => daysOfWeek.find((d) => d.value === day)?.label).join(", ")
      parts.push(dayLabels)
    }

    if (schedule.time.length > 0) {
      parts.push(`às ${schedule.time.join(", ")}`)
    }

    if (schedule.repeat.type === "daily") {
      parts.push("(Diariamente)")
    } else if (schedule.repeat.type === "every-x-days" && schedule.repeat.interval) {
      parts.push(`(A cada ${schedule.repeat.interval} dias)`)
    } else if (schedule.repeat.type === "multiple-daily" && schedule.repeat.timesPerDay) {
      parts.push(`(${schedule.repeat.timesPerDay}x ao dia)`)
    }

    return parts.join(" ")
  }

  return (
    <div className="space-y-6">
      {/* Time Selection */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-600" />
            Horário
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {timeOptions.map((time) => (
              <Button
                key={time}
                variant={schedule.time.includes(time) ? "default" : "outline"}
                onClick={() => (schedule.time.includes(time) ? removeTime(time) : addTime(time))}
                className="h-12 text-lg"
              >
                {time}
              </Button>
            ))}
          </div>

          {schedule.time.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {schedule.time.map((time) => (
                <div key={time} className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-lg font-medium">{time}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTime(time)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Days Selection */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            Dias da Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {daysOfWeek.map((day) => (
              <Button
                key={day.value}
                variant={schedule.days.includes(day.value) ? "default" : "outline"}
                onClick={() => toggleDay(day.value)}
                className="h-16 flex flex-col gap-1 text-center"
              >
                <span className="text-lg font-bold">{day.label}</span>
                <span className="text-sm">{day.fullLabel}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Repeat Settings */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Repeat className="w-6 h-6 text-purple-600" />
            Repetição
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant={schedule.repeat.type === "daily" ? "default" : "outline"}
              onClick={() => updateSchedule({ repeat: { type: "daily" } })}
              className="h-16 text-xl justify-start"
            >
              Diariamente
            </Button>

            <Button
              variant={schedule.repeat.type === "weekly" ? "default" : "outline"}
              onClick={() => updateSchedule({ repeat: { type: "weekly" } })}
              className="h-16 text-xl justify-start"
            >
              Semanalmente
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant={schedule.repeat.type === "every-x-days" ? "default" : "outline"}
                onClick={() => updateSchedule({ repeat: { type: "every-x-days", interval: 2 } })}
                className="flex-1 h-16 text-xl"
              >
                A cada X dias
              </Button>
              {schedule.repeat.type === "every-x-days" && (
                <Input
                  type="number"
                  value={schedule.repeat.interval || 2}
                  onChange={(e) =>
                    updateSchedule({
                      repeat: { ...schedule.repeat, interval: Number.parseInt(e.target.value) || 2 },
                    })
                  }
                  className="w-20 h-16 text-xl text-center"
                  min="1"
                  max="30"
                />
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={schedule.repeat.type === "multiple-daily" ? "default" : "outline"}
                onClick={() => updateSchedule({ repeat: { type: "multiple-daily", timesPerDay: 2 } })}
                className="flex-1 h-16 text-xl"
              >
                Mais de uma vez ao dia
              </Button>
              {schedule.repeat.type === "multiple-daily" && (
                <Input
                  type="number"
                  value={schedule.repeat.timesPerDay || 2}
                  onChange={(e) =>
                    updateSchedule({
                      repeat: { ...schedule.repeat, timesPerDay: Number.parseInt(e.target.value) || 2 },
                    })
                  }
                  className="w-20 h-16 text-xl text-center"
                  min="1"
                  max="10"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Bell className="w-6 h-6 text-purple-600" />
            Lembrete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
            <div>
              <Label className="text-xl font-medium">Deseja receber lembrete?</Label>
              <p className="text-lg text-gray-600 mt-1">Notificação no horário</p>
            </div>
            <Switch
              checked={schedule.reminder.enabled}
              onCheckedChange={(enabled) =>
                updateSchedule({
                  reminder: { ...schedule.reminder, enabled },
                })
              }
              className="h-8 w-14 data-[state=checked]:bg-purple-500"
            />
          </div>

          {schedule.reminder.enabled && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <Select value={newReminderTime} onValueChange={setNewReminderTime}>
                  <SelectTrigger className="flex-1 h-14 text-xl">
                    <SelectValue placeholder="Escolher horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time} className="text-xl py-3">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addReminderTime} disabled={!newReminderTime} className="h-14 px-6">
                  <Plus className="w-6 h-6" />
                </Button>
              </div>

              {schedule.reminder.times.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-lg font-medium">Horários de lembrete:</Label>
                  <div className="flex flex-wrap gap-2">
                    {schedule.reminder.times.map((time) => (
                      <div key={time} className="flex items-center gap-2 bg-orange-100 px-3 py-2 rounded-lg">
                        <Bell className="w-4 h-4 text-orange-600" />
                        <span className="text-lg font-medium">{time}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeReminderTime(time)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl">
                <div>
                  <Label className="text-lg font-medium">Repetir se ignorado</Label>
                  <p className="text-base text-gray-600">Lembrar novamente em 15 min</p>
                </div>
                <Switch
                  checked={schedule.reminder.repeatIfIgnored}
                  onCheckedChange={(repeatIfIgnored) =>
                    updateSchedule({
                      reminder: { ...schedule.reminder, repeatIfIgnored },
                    })
                  }
                  className="h-6 w-12 data-[state=checked]:bg-orange-500"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      {(schedule.time.length > 0 || schedule.days.length > 0) && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <Label className="text-lg font-medium text-green-800">Resumo do agendamento:</Label>
                <p className="text-xl font-semibold text-green-700 mt-1">
                  {formatScheduleSummary() || "Configure horário e dias"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
