"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit3,
  ChevronUp,
  ChevronDown,
  Heart,
  Pill,
  Footprints,
  Droplets,
  Apple,
  Moon,
  Coffee,
  Utensils,
  Phone,
  Book,
  Sun,
  Smile,
  Activity,
  Eye,
  Thermometer,
  Scale,
} from "lucide-react"

interface Task {
  id: string
  label: string
  icon: React.ReactNode
  iconName: string
  beneBits: number
}

const availableIcons = [
  { name: "heart", icon: <Heart className="w-8 h-8" />, label: "Coração" },
  { name: "pill", icon: <Pill className="w-8 h-8" />, label: "Remédio" },
  { name: "footprints", icon: <Footprints className="w-8 h-8" />, label: "Caminhada" },
  { name: "droplets", icon: <Droplets className="w-8 h-8" />, label: "Água/Glicose" },
  { name: "apple", icon: <Apple className="w-8 h-8" />, label: "Fruta" },
  { name: "moon", icon: <Moon className="w-8 h-8" />, label: "Dormir" },
  { name: "coffee", icon: <Coffee className="w-8 h-8" />, label: "Café" },
  { name: "utensils", icon: <Utensils className="w-8 h-8" />, label: "Refeição" },
  { name: "phone", icon: <Phone className="w-8 h-8" />, label: "Ligação" },
  { name: "book", icon: <Book className="w-8 h-8" />, label: "Leitura" },
  { name: "sun", icon: <Sun className="w-8 h-8" />, label: "Sol" },
  { name: "smile", icon: <Smile className="w-8 h-8" />, label: "Bem-estar" },
  { name: "activity", icon: <Activity className="w-8 h-8" />, label: "Exercício" },
  { name: "eye", icon: <Eye className="w-8 h-8" />, label: "Visão" },
  { name: "thermometer", icon: <Thermometer className="w-8 h-8" />, label: "Temperatura" },
  { name: "scale", icon: <Scale className="w-8 h-8" />, label: "Peso" },
]

export default function TaskConfigPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", label: "Medir glicose", icon: <Droplets className="w-8 h-8" />, iconName: "droplets", beneBits: 10 },
    { id: "2", label: "Tomar remédio", icon: <Pill className="w-8 h-8" />, iconName: "pill", beneBits: 15 },
    {
      id: "3",
      label: "Fazer caminhada",
      icon: <Footprints className="w-8 h-8" />,
      iconName: "footprints",
      beneBits: 20,
    },
    { id: "4", label: "Beber água", icon: <Droplets className="w-8 h-8" />, iconName: "droplets", beneBits: 5 },
    { id: "5", label: "Comer fruta", icon: <Apple className="w-8 h-8" />, iconName: "apple", beneBits: 10 },
  ])

  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState("")
  const [editBeneBits, setEditBeneBits] = useState(10)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [newTaskLabel, setNewTaskLabel] = useState("")
  const [newTaskBeneBits, setNewTaskBeneBits] = useState(10)
  const [selectedIcon, setSelectedIcon] = useState(availableIcons[0])

  const startEditing = (task: Task) => {
    setEditingTask(task.id)
    setEditLabel(task.label)
    setEditBeneBits(task.beneBits)
  }

  const saveEdit = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) => (task.id === editingTask ? { ...task, label: editLabel, beneBits: editBeneBits } : task)),
      )
      setEditingTask(null)
    }
  }

  const cancelEdit = () => {
    setEditingTask(null)
    setEditLabel("")
    setEditBeneBits(10)
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const moveTask = (taskId: string, direction: "up" | "down") => {
    const currentIndex = tasks.findIndex((task) => task.id === taskId)
    if ((direction === "up" && currentIndex > 0) || (direction === "down" && currentIndex < tasks.length - 1)) {
      const newTasks = [...tasks]
      const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
      ;[newTasks[currentIndex], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[currentIndex]]
      setTasks(newTasks)
    }
  }

  const addNewTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      label: newTaskLabel,
      icon: selectedIcon.icon,
      iconName: selectedIcon.name,
      beneBits: newTaskBeneBits,
    }
    setTasks([...tasks, newTask])
    setNewTaskLabel("")
    setNewTaskBeneBits(10)
    setSelectedIcon(availableIcons[0])
    setShowAddDialog(false)
  }

  const getIconByName = (iconName: string) => {
    return availableIcons.find((icon) => icon.name === iconName)?.icon || <Heart className="w-8 h-8" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-4">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Minhas Tarefas Diárias</h1>
        </div>

        {/* Current Tasks */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-800">Tarefas Atuais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task, index) => (
              <div key={task.id} className="bg-white border-2 border-gray-200 rounded-2xl p-4">
                {editingTask === task.id ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-lg font-medium">Nome da Tarefa</Label>
                      <Input
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        className="text-lg h-12 mt-2"
                        placeholder="Nome da tarefa"
                      />
                    </div>
                    <div>
                      <Label className="text-lg font-medium">BeneBits</Label>
                      <Input
                        type="number"
                        value={editBeneBits}
                        onChange={(e) => setEditBeneBits(Number(e.target.value))}
                        className="text-lg h-12 mt-2"
                        min="1"
                        max="50"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={saveEdit} className="flex-1 h-12 text-lg">
                        Salvar
                      </Button>
                      <Button variant="outline" onClick={cancelEdit} className="flex-1 h-12 text-lg">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-full">{getIconByName(task.iconName)}</div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-700">{task.label}</p>
                      <p className="text-sm text-gray-500">{task.beneBits} BeneBits</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveTask(task.id, "up")}
                        disabled={index === 0}
                        className="h-8 w-8"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveTask(task.id, "down")}
                        disabled={index === tasks.length - 1}
                        className="h-8 w-8"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEditing(task)} className="h-8 w-8">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTask(task.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Add New Task Button */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="w-full h-16 text-lg bg-green-500 hover:bg-green-600 text-white rounded-2xl">
              <Plus className="w-6 h-6 mr-2" />
              Adicionar Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Nova Tarefa</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-lg font-medium">Nome da Tarefa</Label>
                <Input
                  value={newTaskLabel}
                  onChange={(e) => setNewTaskLabel(e.target.value)}
                  className="text-lg h-12 mt-2"
                  placeholder="Ex: Tomar vitamina"
                />
              </div>

              <div>
                <Label className="text-lg font-medium">Escolher Ícone</Label>
                <Dialog open={showIconPicker} onOpenChange={setShowIconPicker}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full h-16 mt-2 justify-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-full">{selectedIcon.icon}</div>
                        <span className="text-lg">{selectedIcon.label}</span>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-xl">Escolher Ícone</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                      {availableIcons.map((icon) => (
                        <Button
                          key={icon.name}
                          variant={selectedIcon.name === icon.name ? "default" : "outline"}
                          className="h-20 flex-col gap-2 p-3"
                          onClick={() => {
                            setSelectedIcon(icon)
                            setShowIconPicker(false)
                          }}
                        >
                          <div className="text-orange-600">{icon.icon}</div>
                          <span className="text-xs">{icon.label}</span>
                        </Button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div>
                <Label className="text-lg font-medium">BeneBits por Tarefa</Label>
                <Input
                  type="number"
                  value={newTaskBeneBits}
                  onChange={(e) => setNewTaskBeneBits(Number(e.target.value))}
                  className="text-lg h-12 mt-2"
                  min="1"
                  max="50"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={addNewTask} disabled={!newTaskLabel.trim()} className="flex-1 h-12 text-lg">
                  Adicionar
                </Button>
                <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1 h-12 text-lg">
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Save/Cancel Buttons */}
        <div className="flex gap-4 pb-6">
          <Button className="flex-1 h-16 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-2xl">
            Salvar Alterações
          </Button>
          <Button variant="outline" className="flex-1 h-16 text-lg rounded-2xl">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
