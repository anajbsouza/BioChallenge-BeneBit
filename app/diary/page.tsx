"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, ShoppingBag, Home, Heart, User, Star, Gift, Clock, CheckCircle2, Circle } from "lucide-react"
import { CoinIcon } from "@/components/coin-icon"
import * as RoomItems from "@/components/room-items"
import * as ShelfItems from "@/components/shelf-items"

interface Task {
  id: string
  title: string
  type: "health" | "medication" | "exercise" | "diet"
  completed: boolean
  coins: number
  time?: string
}

interface ShelfItem {
  id: string
  name: string
  category: string
  price: number
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface RoomItem {
  id: string
  name: string
  category: string
  price: number
  position: string
  component: React.ComponentType<{ className?: string }>
}

const DAILY_TASKS: Task[] = [
  {
    id: "glucose",
    title: "Medir glicose",
    type: "health",
    completed: false,
    coins: 15,
    time: "08:00",
  },
  {
    id: "medication",
    title: "Tomar remédio",
    type: "medication",
    completed: true,
    coins: 10,
    time: "09:00",
  },
  {
    id: "walk",
    title: "Caminhada 15min",
    type: "exercise",
    completed: false,
    coins: 20,
    time: "16:00",
  },
  {
    id: "fruit",
    title: "Comer fruta",
    type: "diet",
    completed: true,
    coins: 10,
    time: "15:00",
  },
  {
    id: "water",
    title: "Beber 8 copos de água",
    type: "health",
    completed: false,
    coins: 15,
  },
]

const SHELF_ITEMS: ShelfItem[] = [
  {
    id: "fish-blue",
    name: "Peixinho Azul",
    category: "Animais",
    price: 25,
    icon: ShelfItems.BlueFish,
    description: "Um peixinho calmo e relaxante",
  },
  {
    id: "fish-gold",
    name: "Peixinho Dourado",
    category: "Animais",
    price: 30,
    icon: ShelfItems.GoldFish,
    description: "Traz sorte e prosperidade",
  },
  {
    id: "book-recipes",
    name: "Livro de Receitas",
    category: "Livros",
    price: 20,
    icon: ShelfItems.RecipeBook,
    description: "Receitas saudáveis e saborosas",
  },
  {
    id: "plant-succulent",
    name: "Suculenta",
    category: "Plantas",
    price: 15,
    icon: ShelfItems.Succulent,
    description: "Plantinha fácil de cuidar",
  },
  {
    id: "cat-orange",
    name: "Gatinho Laranja",
    category: "Animais",
    price: 40,
    icon: ShelfItems.OrangeCat,
    description: "Companheiro carinhoso",
  },
  {
    id: "teacup",
    name: "Xícara de Chá",
    category: "Decoração",
    price: 18,
    icon: ShelfItems.TeaCup,
    description: "Para momentos relaxantes",
  },
]

const ROOM_ITEMS: RoomItem[] = [
  {
    id: "bed-cozy",
    name: "Cama Aconchegante",
    category: "Móveis",
    price: 50,
    position: "floor-right",
    component: RoomItems.SimpleBed,
  },
  {
    id: "plant-large",
    name: "Planta Grande",
    category: "Plantas",
    price: 35,
    position: "corner-left",
    component: RoomItems.PlantSmall,
  },
  {
    id: "armchair",
    name: "Poltrona Confortável",
    category: "Móveis",
    price: 60,
    position: "floor-left",
    component: RoomItems.BlueArmchair,
  },
]

export default function DiaryPage() {
  const [coins, setCoins] = useState(85)
  const [tasks, setTasks] = useState<Task[]>(DAILY_TASKS)
  const [shelfInventory, setShelfInventory] = useState<string[]>(["fish-blue", "book-recipes"])
  const [roomInventory, setRoomInventory] = useState<string[]>(["bed-cozy"])
  const [roomDisplay, setRoomDisplay] = useState<{ [key: string]: string }>({ "floor-right": "bed-cozy" })
  const [activeTab, setActiveTab] = useState<"tasks" | "shop" | "room" | "health" | "profile">("room")
  const [showShop, setShowShop] = useState(false)
  const [shopCategory, setShopCategory] = useState<"shelf" | "room">("shelf")

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalCoinsEarned = tasks.filter((t) => t.completed).reduce((sum, t) => sum + t.coins, 0)

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newCompleted = !task.completed
          if (newCompleted && !task.completed) {
            setCoins((c) => c + task.coins)
          } else if (!newCompleted && task.completed) {
            setCoins((c) => c - task.coins)
          }
          return { ...task, completed: newCompleted }
        }
        return task
      }),
    )
  }

  const buyShelfItem = (item: ShelfItem) => {
    if (coins >= item.price && !shelfInventory.includes(item.id)) {
      setCoins((c) => c - item.price)
      setShelfInventory((prev) => [...prev, item.id])
    }
  }

  const buyRoomItem = (item: RoomItem) => {
    if (coins >= item.price && !roomInventory.includes(item.id)) {
      setCoins((c) => c - item.price)
      setRoomInventory((prev) => [...prev, item.id])
      // Auto-place if position is empty
      if (!roomDisplay[item.position]) {
        setRoomDisplay((prev) => ({ ...prev, [item.position]: item.id }))
      }
    }
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "health":
        return "🩺"
      case "medication":
        return "💊"
      case "exercise":
        return "🚶‍♀️"
      case "diet":
        return "🍎"
      default:
        return "📝"
    }
  }

  const getTaskColor = (type: string) => {
    switch (type) {
      case "health":
        return "bg-blue-100 border-blue-300"
      case "medication":
        return "bg-green-100 border-green-300"
      case "exercise":
        return "bg-orange-100 border-orange-300"
      case "diet":
        return "bg-purple-100 border-purple-300"
      default:
        return "bg-gray-100 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100">
      {/* MAIN ROOM VIEW */}
      {activeTab === "room" && (
        <div className="relative h-screen pb-24 overflow-hidden">
          {/* WALLPAPER */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 30px 30px, rgba(255,182,193,0.3) 2px, transparent 2px),
                               radial-gradient(circle at 80px 80px, rgba(221,160,221,0.2) 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* FLOOR */}
          <div className="absolute bottom-24 left-0 right-0 h-40 bg-gradient-to-t from-rose-300 to-rose-200 border-t-4 border-rose-400">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-rose-400 opacity-60"></div>
          </div>

          {/* WINDOW */}
          <div className="absolute top-12 right-8">
            <div className="w-32 h-24 bg-sky-200 border-4 border-amber-600 rounded-lg relative overflow-hidden">
              <div className="absolute inset-2 bg-gradient-to-b from-sky-300 to-green-200"></div>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-amber-600"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-amber-600"></div>
              {/* Curtains */}
              <div className="absolute -left-2 top-0 w-6 h-full bg-pink-200 rounded-r-lg opacity-80"></div>
              <div className="absolute -right-2 top-0 w-6 h-full bg-pink-200 rounded-l-lg opacity-80"></div>
            </div>
          </div>

          {/* WALL CLOCK */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-white border-4 border-amber-700 rounded-full relative">
              <div className="absolute inset-2 bg-cream rounded-full"></div>
              <div className="absolute top-1 left-1/2 w-0.5 h-3 bg-black transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-black transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          {/* SHELF - MAIN FEATURE */}
          <div className="absolute top-32 left-8 z-10">
            <div className="w-48 h-32 bg-amber-800 rounded-lg shadow-2xl relative">
              {/* Shelf structure */}
              <div className="absolute inset-x-2 top-2 h-2 bg-amber-900 rounded"></div>
              <div className="absolute inset-x-2 bottom-2 h-2 bg-amber-900 rounded"></div>
              <div className="absolute inset-x-2 top-1/2 h-1 bg-amber-900 rounded transform -translate-y-1/2"></div>

              {/* Shelf items */}
              <div className="absolute inset-4 grid grid-cols-3 gap-2">
                {shelfInventory.slice(0, 6).map((itemId, index) => {
                  const item = SHELF_ITEMS.find((i) => i.id === itemId)
                  if (!item) return null

                  return (
                    <div key={itemId} className="flex items-center justify-center">
                      <div className="transform scale-75">
                        {React.createElement(item.icon, { className: "w-8 h-8" })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Empty shelf slots */}
              {Array.from({ length: Math.max(0, 6 - shelfInventory.length) }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="absolute w-6 h-6 border-2 border-dashed border-amber-600 rounded"
                  style={{
                    left: `${20 + ((shelfInventory.length + index) % 3) * 32}px`,
                    top: `${16 + Math.floor((shelfInventory.length + index) / 3) * 24}px`,
                  }}
                ></div>
              ))}
            </div>

            {/* Shelf label */}
            <div className="mt-2 text-center">
              <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                Minha Coleção ({shelfInventory.length}/6)
              </Badge>
            </div>
          </div>

          {/* ROOM FURNITURE */}
          <div className="absolute bottom-32 right-12">
            {roomDisplay["floor-right"] && (
              <div className="transform scale-300">
                {React.createElement(
                  ROOM_ITEMS.find((i) => i.id === roomDisplay["floor-right"])?.component || RoomItems.SimpleBed,
                  { className: "w-20 h-16 drop-shadow-2xl" },
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-36 left-16">
            {roomDisplay["floor-left"] && (
              <div className="transform scale-250">
                {React.createElement(
                  ROOM_ITEMS.find((i) => i.id === roomDisplay["floor-left"])?.component || RoomItems.BlueArmchair,
                  { className: "w-16 h-16 drop-shadow-2xl" },
                )}
              </div>
            )}
          </div>

          {/* RUG */}
          <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-20 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-80 shadow-lg"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full"></div>
          </div>

          {/* COINS DISPLAY */}
          <div className="absolute top-4 left-4 z-20">
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-yellow-300 shadow-xl">
              <CardContent className="p-3 flex items-center gap-2">
                <CoinIcon className="w-6 h-6" />
                <span className="text-xl font-bold text-yellow-700">{coins}</span>
              </CardContent>
            </Card>
          </div>

          {/* SHOP BUTTON */}
          <div className="absolute top-4 right-4 z-20">
            <Button
              onClick={() => setShowShop(true)}
              className="h-14 w-14 bg-green-500 hover:bg-green-600 rounded-full shadow-xl"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>
      )}

      {/* TASKS VIEW */}
      {activeTab === "tasks" && (
        <div className="p-4 pb-24">
          <div className="max-w-md mx-auto space-y-6">
            {/* Header */}
            <div className="text-center pt-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Minhas Tarefas</h1>
              <p className="text-lg text-gray-600">Complete para ganhar moedas!</p>
            </div>

            {/* Progress */}
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-purple-700 mb-2">
                  {completedTasks}/{tasks.length}
                </div>
                <p className="text-lg text-purple-600">Tarefas concluídas hoje</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <CoinIcon className="w-5 h-5" />
                  <span className="text-lg font-semibold text-yellow-700">+{totalCoinsEarned} moedas ganhas</span>
                </div>
              </CardContent>
            </Card>

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className={`border-2 transition-all duration-200 ${
                    task.completed
                      ? "bg-green-50 border-green-300 shadow-md"
                      : `${getTaskColor(task.type)} hover:shadow-lg`
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleTask(task.id)}
                        className="h-12 w-12 rounded-full"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        ) : (
                          <Circle className="w-8 h-8 text-gray-400" />
                        )}
                      </Button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{getTaskIcon(task.type)}</span>
                          <h3
                            className={`text-xl font-semibold ${
                              task.completed ? "text-green-700 line-through" : "text-gray-800"
                            }`}
                          >
                            {task.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {task.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{task.time}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <CoinIcon className="w-4 h-4" />
                            <span className="font-semibold text-yellow-700">+{task.coins}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SHOP DIALOG */}
      <Dialog open={showShop} onOpenChange={setShowShop}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl text-center text-green-700 flex gap-3 justify-center">
              <ShoppingBag className="w-8 h-8" />
              Loja
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-2">
            {/* Category Tabs */}
            <div className="flex gap-2">
              <Button
                variant={shopCategory === "shelf" ? "default" : "outline"}
                onClick={() => setShopCategory("shelf")}
                className="flex-1 h-12 text-lg"
              >
                <Gift className="w-5 h-5 mr-2" />
                Colecionáveis
              </Button>
              <Button
                variant={shopCategory === "room" ? "default" : "outline"}
                onClick={() => setShopCategory("room")}
                className="flex-1 h-12 text-lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Móveis
              </Button>
            </div>

            {/* Shelf Items */}
            {shopCategory === "shelf" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">Itens para Coleção</h3>
                {SHELF_ITEMS.map((item) => (
                  <Card
                    key={item.id}
                    className={`border-2 transition-all duration-200 ${
                      shelfInventory.includes(item.id)
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 flex justify-center items-center bg-gray-50 rounded-lg">
                          {React.createElement(item.icon, { className: "w-12 h-12" })}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-lg text-gray-600">{item.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <CoinIcon className="w-5 h-5" />
                            <span className="text-lg font-bold text-purple-600">{item.price}</span>
                          </div>
                        </div>

                        {shelfInventory.includes(item.id) ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <Star className="w-6 h-6" />
                            <span className="text-lg font-semibold">Comprado</span>
                          </div>
                        ) : (
                          <Button
                            disabled={coins < item.price}
                            onClick={() => buyShelfItem(item)}
                            className={`h-14 px-6 text-lg font-semibold ${
                              coins >= item.price
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {coins >= item.price ? "Comprar" : "Sem moedas"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Room Items */}
            {shopCategory === "room" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">Móveis para o Quarto</h3>
                {ROOM_ITEMS.map((item) => (
                  <Card
                    key={item.id}
                    className={`border-2 transition-all duration-200 ${
                      roomInventory.includes(item.id)
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 flex justify-center items-center bg-gray-50 rounded-lg">
                          {React.createElement(item.component, { className: "w-12 h-12" })}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-lg text-gray-600">{item.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <CoinIcon className="w-5 h-5" />
                            <span className="text-lg font-bold text-purple-600">{item.price}</span>
                          </div>
                        </div>

                        {roomInventory.includes(item.id) ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <Star className="w-6 h-6" />
                            <span className="text-lg font-semibold">Comprado</span>
                          </div>
                        ) : (
                          <Button
                            disabled={coins < item.price}
                            onClick={() => buyRoomItem(item)}
                            className={`h-14 px-6 text-lg font-semibold ${
                              coins >= item.price
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {coins >= item.price ? "Comprar" : "Sem moedas"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-200 shadow-lg z-50">
        <div className="max-w-md mx-auto px-2 py-3">
          <div className="grid grid-cols-5 gap-1">
            {[
              { id: "tasks", label: "Tarefas", icon: Calendar, color: "text-blue-600" },
              { id: "shop", label: "Loja", icon: ShoppingBag, color: "text-green-600" },
              { id: "room", label: "Quarto", icon: Home, color: "text-purple-600" },
              { id: "health", label: "Saúde", icon: Heart, color: "text-red-600" },
              { id: "profile", label: "Perfil", icon: User, color: "text-gray-600" },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => {
                    if (tab.id === "shop") {
                      setShowShop(true)
                    } else {
                      setActiveTab(tab.id as any)
                    }
                  }}
                  className={`flex flex-col items-center justify-center gap-1 h-16 rounded-xl transition-all duration-200 ${
                    isActive
                      ? `bg-purple-100 ${tab.color} shadow-sm scale-105`
                      : `text-gray-500 hover:bg-purple-50 hover:${tab.color}`
                  }`}
                >
                  <Icon className={`w-6 h-6 transition-all duration-200 ${isActive ? "scale-110" : ""}`} />
                  <span className={`text-sm font-medium leading-tight ${isActive ? "font-semibold" : ""}`}>
                    {tab.label}
                  </span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
