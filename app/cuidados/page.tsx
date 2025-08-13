"use client"

import { useEffect, useState } from "react"
import { Footprints, Apple, Moon, Droplets, Zap, Plus, Trash2, Check, HeartPulse } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useBenebits } from "@/lib/benebits"

type RepeatOpt = "daily" | "weekly" | "custom"

interface Task {
  id: string
  title: string
  icon: string
  completed: boolean
  rewarded: boolean // Tracks if the reward has been given
  reward: number
  repetitions: number
  currentCount: number
}

const ICON_MAP: Record<string, LucideIcon> = {
  footprints: Footprints,
  apple: Apple,
  moon: Moon,
  droplets: Droplets,
  zap: Zap,
}

const DEFAULT_ICON = "footprints"

const iconOptions = [
  { value: "footprints", label: "Caminhada" },
  { value: "apple", label: "Fruta" },
  { value: "moon", label: "Sono" },
  { value: "droplets", label: "Água" },
  { value: "zap", label: "Energia" },
]

export default function CuidadosPage() {
  const { tasks, beneBits, updateTask } = useBenebits()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    icon: DEFAULT_ICON,
    repetitions: 1,
  })

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    if (task.completed) {
      // If unchecking, just update the completed status
      // Don't change the rewarded status or affect Benebits
      updateTask(id, { completed: false })
    } else {
      // If checking, increment count and check if completed
      const newCount = task.currentCount + 1
      const isNowCompleted = newCount >= task.repetitions
      
      const updates: Partial<Task> = {
        currentCount: newCount,
        completed: isNowCompleted
      }
      
      // Only update rewarded status and add Benebits if:
      // 1. The task is being marked as completed now, AND
      // 2. It hasn't been rewarded before
      if (isNowCompleted && !task.rewarded) {
        updates.rewarded = true
      }
      
      updateTask(id, updates)
    }
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.title.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      icon: newTask.icon,
      completed: false,
      rewarded: false, // New tasks start as not rewarded
      reward: 10,
      repetitions: Number(newTask.repetitions) || 1,
      currentCount: 0,
    }

    // The task will be added through the store's state update
    setNewTask({ title: "", icon: DEFAULT_ICON, repetitions: 1 })
    setIsAddOpen(false)
    
    // This is a simplified version - in a real app, you'd have an addTask method in the store
    // For now, we'll just update the tasks directly in localStorage
    const updatedTasks = [...tasks, task]
    localStorage.setItem('bene:tasks', JSON.stringify(updatedTasks))
    window.dispatchEvent(new Event('storage'))
  }

  const deleteTask = (id: string) => {
    // In a real implementation, you'd have a deleteTask method in the store
    const updatedTasks = tasks.filter(task => task.id !== id)
    localStorage.setItem('bene:tasks', JSON.stringify(updatedTasks))
    window.dispatchEvent(new Event('storage'))
  }

  const completed = tasks.filter((t) => t.completed).length
  const progress = (completed / tasks.length) * 100

  const renderIcon = (iconName: string, className = "w-7 h-7") => {
    const Icon = ICON_MAP[iconName] || ICON_MAP[DEFAULT_ICON]
    return <Icon className={className} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pb-28">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-pink-700 to-purple-700 rounded-full flex items-center justify-center shadow-lg mb-6">
          <HeartPulse className="w-12 h-12 text-white" />
        </div>
          <h1 className="text-3xl font-bold text-gray-800">Cuidados</h1>
        </div>
        <div className="flex items-center justify-end">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" /> Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Atividade</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Título</Label>
                  <Input value={newTask.title} onChange={(e) => setNewTask((p) => ({ ...p, title: e.target.value }))} />
                </div>
                <div>
                  <Label>Ícone</Label>
                  <Select value={newTask.icon} onValueChange={(v) => setNewTask((p) => ({ ...p, icon: v }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <div className="flex items-center gap-2">
                            {renderIcon(opt.value, "w-4 h-4")}
                            {opt.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Repetição</Label>
                  <Select
                    value={newTask.repetitions.toString()}
                    onValueChange={(v) => setNewTask((p) => ({ ...p, repetitions: Number.parseInt(v) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1x</SelectItem>
                      <SelectItem value="2">2x</SelectItem>
                      <SelectItem value="3">3x</SelectItem>
                      <SelectItem value="4">4x</SelectItem>
                      <SelectItem value="5">5x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  disabled={!newTask.title.trim()}
                  onClick={addTask}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Adicionar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-semibold text-gray-700">Hoje</span>
              <span className="text-2xl font-bold text-purple-700">
                {completed} / {tasks.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-purple-400 to-purple-600 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`border-2 transition-all ${
              task.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
            }`}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <span
                className={`p-3 rounded-full ${
                  task.completed ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"
                }`}
              >
                {renderIcon(task.icon)}
              </span>
              <div className="flex-1" onClick={() => (task.repetitions === 1 ? toggleTask(task.id) : undefined)}>
                <span
                  className={`block text-lg font-medium ${
                    task.completed ? "text-green-700 line-through" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteTask(task.id)
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {task.repetitions > 1 && !task.completed && (
                  <span className="text-sm text-gray-600 mr-2">
                    {task.currentCount} / {task.repetitions}
                  </span>
                )}
                <div className="relative">
                  {task.repetitions > 1 && !task.completed ? (
                    <Button
                      onClick={() => toggleTask(task.id)}
                      size="sm"
                      className="h-9 w-9 rounded-full bg-purple-500 hover:bg-purple-600"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </Button>
                  ) : (
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-9 w-9 border-2 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                  )}
                  {task.completed && (
                    <Check className="absolute inset-0 w-5 h-5 m-auto text-white pointer-events-none" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card className="bg-gradient-to-r from-purple-100 to-violet-100 border-2 border-purple-300">
          <CardContent className="p-6 text-center">
            <span className="block text-4xl font-bold text-purple-700">{beneBits}</span>
            <p className="text-xl font-medium text-purple-800">BeneBits</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
