"use client"

import React, { useState, useEffect } from "react"
import { Home, HeartPulse, Plus, Check, X, ShoppingCart, ChevronLeft, ChevronRight, Zap, Sofa, Monitor, Package, Star, Sparkles, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import * as RoomItems from "@/components/room-items"
import { CoinIcon } from "@/components/coin-icon"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useBenebits } from "@/lib/benebits"

interface RoomItem {
  id: string
  name: string
  category: string
  price: number
  position: PositionKey
  component: React.ComponentType<{ className?: string }>
}

interface UserInventory {
  [itemId: string]: boolean
}

interface RoomDisplay {
  [position: string]: string | null
}

type PositionKey =
  | "ceiling-left"
  | "ceiling-center"
  | "ceiling-right"
  | "wall-left"
  | "wall-center"
  | "wall-right"
  | "floor-left"
  | "floor-center"
  | "floor-right"
  | "corner-left"
  | "corner-right"

const ROOM_ITEMS: RoomItem[] = [
  // ─── PLANTAS & DECORAÇÃO ──────────────────────────────────────────────
  {
    id: "planta-pequena",
    name: "Planta pequena",
    category: "Plantas & Decoração",
    price: 10,
    position: "corner-left",
    component: RoomItems.PlantSmall,
  },
  {
    id: "vaso-flores",
    name: "Vaso com flores",
    category: "Plantas & Decoração",
    price: 12,
    position: "corner-right",
    component: RoomItems.FlowerVase,
  },
  {
    id: "quadro-decorativo",
    name: "Quadro decorativo",
    category: "Plantas & Decoração",
    price: 15,
    position: "wall-left",
    component: RoomItems.WallPicture,
  },
  {
    id: "cortina-clara",
    name: "Cortina clara",
    category: "Plantas & Decoração",
    price: 20,
    position: "wall-right",
    component: RoomItems.WindowCurtain,
  },
  {
    id: "espelho-parede",
    name: "Espelho de parede",
    category: "Plantas & Decoração",
    price: 18,
    position: "wall-right",
    component: RoomItems.WallMirror,
  },
  {
    id: "relogio-parede",
    name: "Relógio de parede",
    category: "Plantas & Decoração",
    price: 16,
    position: "wall-center",
    component: RoomItems.WallClock,
  },
  {
    id: "tapete-felpudo",
    name: "Tapete felpudo",
    category: "Plantas & Decoração",
    price: 22,
    position: "floor-center",
    component: RoomItems.FluffyRug,
  },

  // ─── MÓVEIS ────────────────────────────────────────────────────────────
  {
    id: "abajur",
    name: "Abajur",
    category: "Móveis",
    price: 25,
    position: "floor-left",
    component: RoomItems.TableLamp,
  },
  {
    id: "estante-livros",
    name: "Estante com livros",
    category: "Móveis",
    price: 30,
    position: "wall-left",
    component: RoomItems.Bookshelf,
  },
  {
    id: "poltrona-azul",
    name: "Poltrona azul",
    category: "Móveis",
    price: 35,
    position: "floor-left",
    component: RoomItems.BlueArmchair,
  },
  {
    id: "cama-simples",
    name: "Cama simples",
    category: "Móveis",
    price: 50,
    position: "floor-right",
    component: RoomItems.SimpleBed,
  },
  {
    id: "sofa-cinza",
    name: "Sofá cinza",
    category: "Móveis",
    price: 70,
    position: "floor-center",
    component: RoomItems.GreySofa,
  },
  {
    id: "criado-mudo",
    name: "Criado-mudo",
    category: "Móveis",
    price: 28,
    position: "floor-right",
    component: RoomItems.NightStand,
  },
  {
    id: "mesinha-cha",
    name: "Mesinha de chá",
    category: "Móveis",
    price: 26,
    position: "floor-center",
    component: RoomItems.TeaTable,
  },

  // ─── TECNOLOGIA & INTERAÇÃO ───────────────────────────────────────────
  {
    id: "radio-antigo",
    name: "Rádio antigo",
    category: "Tecnologia & Interação",
    price: 25,
    position: "floor-left",
    component: RoomItems.VintageRadio,
  },
  {
    id: "tv-retro",
    name: "TV retrô",
    category: "Tecnologia & Interação",
    price: 60,
    position: "wall-center",
    component: RoomItems.RetroTV,
  },
  {
    id: "caixa-som",
    name: "Caixa de som",
    category: "Tecnologia & Interação",
    price: 45,
    position: "corner-left",
    component: RoomItems.SpeakerBox,
  },
  {
    id: "luminaria-moderna",
    name: "Luminária moderna",
    category: "Tecnologia & Interação",
    price: 35,
    position: "ceiling-right",
    component: RoomItems.ModernLamp,
  },
  {
    id: "computador-antigo",
    name: "Computador antigo",
    category: "Tecnologia & Interação",
    price: 55,
    position: "floor-right",
    component: RoomItems.VintageComputer,
  },

  // ─── ITENS ESPECIAIS ──────────────────────────────────────────────────
  {
    id: "pelucia-benedita",
    name: "Pelúcia da Benedita",
    category: "Itens especiais",
    price: 100,
    position: "floor-center",
    component: RoomItems.TeddyBear,
  },
  {
    id: "quadro-benedita",
    name: "Quadro animado da Benedita",
    category: "Itens especiais",
    price: 120,
    position: "wall-center",
    component: RoomItems.AnimatedPicture,
  },
  {
    id: "porta-magica",
    name: "Porta mágica",
    category: "Itens especiais",
    price: 90,
    position: "wall-right",
    component: RoomItems.MagicDoor,
  },
  {
    id: "janela-paisagem",
    name: "Janela interativa",
    category: "Itens especiais",
    price: 80,
    position: "wall-right",
    component: RoomItems.InteractiveWindow,
  },
  {
    id: "mascote-digital",
    name: "Mascote digital",
    category: "Itens especiais",
    price: 150,
    position: "floor-center",
    component: RoomItems.DigitalPet,
  },
]

// Helper for labels shown in inventory
const POSITION_LABEL: Record<PositionKey, string> = {
  "ceiling-left": "Teto esquerdo",
  "ceiling-center": "Teto central",
  "ceiling-right": "Teto direito",
  "wall-left": "Parede esquerda",
  "wall-center": "Parede central",
  "wall-right": "Parede direita",
  "floor-left": "Chão esquerdo",
  "floor-center": "Chão central",
  "floor-right": "Chão direito",
  "corner-left": "Canto esquerdo",
  "corner-right": "Canto direito",
}

export default function HomePage() {
  const { beneBits, addBenebits } = useBenebits()
  const [inventory, setInventory] = useState<UserInventory>({})
  const [roomDisplay, setRoomDisplay] = useState<RoomDisplay>({})
  const [showFirstMessage, setShowFirstMessage] = useState(false)
  const [showStore, setShowStore] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Plantas & Decoração")
  const [purchaseAnimation, setPurchaseAnimation] = useState<string | null>(null)

  useEffect(() => {
    const loadRoomData = () => {
      const storedInv = localStorage.getItem("roomInventory")
      const storedDisp = localStorage.getItem("roomDisplay")
      const first = localStorage.getItem("hasVisitedHome")

      if (storedInv) setInventory(JSON.parse(storedInv))
      if (storedDisp) setRoomDisplay(JSON.parse(storedDisp))
      if (!first) {
        setShowFirstMessage(true)
        localStorage.setItem("hasVisitedHome", "true")
      }
    }

    loadRoomData()
  }, [])

  useEffect(() => {
    localStorage.setItem("roomInventory", JSON.stringify(inventory))
  }, [inventory])

  useEffect(() => {
    localStorage.setItem("roomDisplay", JSON.stringify(roomDisplay))
  }, [roomDisplay])

  // No need to manually sync Benebits to localStorage here
  // The useBenebits hook already handles this

  useEffect(() => {
    const event = new CustomEvent('beneBitsUpdated', { detail: beneBits })
    window.dispatchEvent(event)
    
    // Also dispatch storage event for cross-tab communication
    const storageEvent = new StorageEvent('storage', {
      key: 'bene:bits',
      newValue: beneBits.toString(),
      oldValue: localStorage.getItem('bene:bits'),
      storageArea: localStorage,
      url: window.location.href
    })
    window.dispatchEvent(storageEvent)
  }, [beneBits])

  /* ─── ACTIONS ─────────────────────────────────────────────────── */
  function purchaseItem(item: RoomItem) {
    if (beneBits < item.price || inventory[item.id]) return
    addBenebits(-item.price) // Subtract the item price from Benebits
    setInventory((inv) => ({ ...inv, [item.id]: true }))
    setPurchaseAnimation(item.id)
    setTimeout(() => setPurchaseAnimation(null), 2000)

    // Auto-display if position is empty
    if (!roomDisplay[item.position]) {
      setRoomDisplay((disp) => ({ ...disp, [item.position]: item.id }))
    }
  }

  const toggleItemInRoom = (item: RoomItem) => {
    const isCurrentlyDisplayed = roomDisplay[item.position] === item.id

    if (isCurrentlyDisplayed) {
      // Remove from room
      setRoomDisplay((disp) => {
        const updated = { ...disp }
        delete updated[item.position]
        return updated
      })
    } else {
      // Add to room (replace any existing item in that position)
      setRoomDisplay((disp) => ({ ...disp, [item.position]: item.id }))
    }
  }

  /* ─── HELPERS ─────────────────────────────────────────────────── */
  const getDisplayedItem = (pos: PositionKey) => {
    const id = roomDisplay[pos]
    return id ? ROOM_ITEMS.find((it) => it.id === id) : null
  }

  const categories = [...new Set(ROOM_ITEMS.map((i) => i.category))]

  const isItemDisplayedInRoom = (itemId: string) => {
    return Object.values(roomDisplay).includes(itemId)
  }

  const ownedItems = ROOM_ITEMS.filter((item) => inventory[item.id])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Plantas & Decoração":
        return <RoomItems.PlantSmall className="w-5 h-5" />
      case "Móveis":
        return <Sofa className="w-5 h-5" />
      case "Tecnologia & Interação":
        return <Monitor className="w-5 h-5" />
      case "Itens especiais":
        return <RoomItems.TeddyBear className="w-5 h-5" />
      default:
        return <Package className="w-5 h-5" />
    }
  }

  /* ─── UI ──────────────────────────────────────────────────────── */
  return (
    <div className="h-screen bg-gradient-to-b from-purple-200 via-purple-100 to-teal-400 relative overflow-hidden">
      {/* ROOM CONTAINER - CLEAN, NO FLOATING UI */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] overflow-hidden z-10" style={{ perspective: "1000px" }}>
        {/* ROOM FLOOR - 2.5D PERSPECTIVE */}
        <div
          className="absolute bottom-20 left-0 right-0 h-96 bg-gradient-to-t from-teal-500 to-teal-400 border-t-4 border-teal-600"
          style={{
            transform: "rotateX(60deg) translateZ(-50px)",
            transformOrigin: "bottom center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 opacity-50"></div>

          {/* Floor pattern for depth */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 20px,
          rgba(255,255,255,0.1) 20px,
          rgba(255,255,255,0.1) 22px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 20px,
          rgba(255,255,255,0.1) 20px,
          rgba(255,255,255,0.1) 22px
        )`,
            }}
          />
        </div>

        {/* BACK WALL - 2.5D PERSPECTIVE */}
        <div
          className="absolute top-0 left-0 right-0 h-3/5 bg-gradient-to-b from-purple-200 to-purple-300"
          style={{
            transform: "translateZ(-100px)",
            transformOrigin: "center center",
          }}
        >
          {/* Wall pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 2px),
                         radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* ROOM ITEMS WITH 2.5D POSITIONING */}
        {/* CEILING ITEMS */}
        <div className="absolute top-8 left-12" style={{ transform: "translateZ(20px)" }}>
          {getDisplayedItem("ceiling-left") && (
            <div className="transform scale-300 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("ceiling-left")!.component, {
                className: "w-12 h-16",
              })}
            </div>
          )}
        </div>

        <div
          className="absolute top-6 left-1/2 transform -translate-x-1/2"
          style={{ transform: "translateX(-50%) translateZ(30px)" }}
        >
          {getDisplayedItem("ceiling-center") && (
            <div className="transform scale-300 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("ceiling-center")!.component, {
                className: "w-16 h-20",
              })}
            </div>
          )}
        </div>

        <div className="absolute top-8 right-12" style={{ transform: "translateZ(20px)" }}>
          {getDisplayedItem("ceiling-right") && (
            <div className="transform scale-300 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("ceiling-right")!.component, {
                className: "w-12 h-16",
              })}
            </div>
          )}
        </div>

        {/* WALL ITEMS - BACK WALL */}
        <div className="absolute top-24 left-8" style={{ transform: "translateZ(-80px) scale(1.2)" }}>
          {getDisplayedItem("wall-left") && (
            <div className="transform scale-300 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("wall-left")!.component, {
                className: "w-16 h-16",
              })}
            </div>
          )}
        </div>

        <div
          className="absolute top-20 left-1/2 transform -translate-x-1/2"
          style={{ transform: "translateX(-50%) translateZ(-80px) scale(1.2)" }}
        >
          {getDisplayedItem("wall-center") && (
            <div className="transform scale-300 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("wall-center")!.component, {
                className: "w-20 h-16",
              })}
            </div>
          )}
        </div>

        <div className="absolute top-24 right-8" style={{ transform: "translateZ(-80px) scale(1.2)" }}>
          {getDisplayedItem("wall-right") && (
            <div className="transform scale-300 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("wall-right")!.component, {
                className: "w-16 h-20",
              })}
            </div>
          )}
        </div>

        {/* CORNER ITEMS - SIDE POSITIONING */}
        <div
          className="absolute top-1/2 left-4 transform -translate-y-1/2"
          style={{ transform: "translateY(-50%) translateZ(10px)" }}
        >
          {getDisplayedItem("corner-left") && (
            <div className="transform scale-300 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("corner-left")!.component, {
                className: "w-12 h-16",
              })}
            </div>
          )}
        </div>

        <div
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
          style={{ transform: "translateY(-50%) translateZ(10px)" }}
        >
          {getDisplayedItem("corner-right") && (
            <div className="transform scale-300 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("corner-right")!.component, {
                className: "w-12 h-16",
              })}
            </div>
          )}
        </div>

        {/* FLOOR ITEMS - FOREGROUND */}
        <div className="absolute bottom-32 left-12" style={{ transform: "translateZ(50px)" }}>
          {getDisplayedItem("floor-left") && (
            <div className="transform scale-400 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("floor-left")!.component, {
                className: "w-16 h-16",
              })}
            </div>
          )}
        </div>

        <div
          className="absolute bottom-28 left-1/2 transform -translate-x-1/2"
          style={{ transform: "translateX(-50%) translateZ(40px)" }}
        >
          {getDisplayedItem("floor-center") && (
            <div className="transform scale-400 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("floor-center")!.component, {
                className: "w-20 h-16",
              })}
            </div>
          )}
        </div>

        <div className="absolute bottom-32 right-12" style={{ transform: "translateZ(50px)" }}>
          {getDisplayedItem("floor-right") && (
            <div className="transform scale-400 drop-shadow-2xl">
              {React.createElement(getDisplayedItem("floor-right")!.component, {
                className: "w-16 h-16",
              })}
            </div>
          )}
        </div>

        {/* EMPTY ROOM MESSAGE */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(100px)" }}>
          {Object.keys(roomDisplay).length === 0 && (
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-amber-300 shadow-2xl">
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-8xl">🏠</div>
                <h2 className="text-2xl font-bold text-gray-800">Cantinho vazio</h2>
                <p className="text-xl text-gray-600">Complete tarefas para decorar!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* INVENTORY GRID - BOTTOM 40% OF SCREEN */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-amber-200 to-amber-100 border-t-4 border-amber-300 overflow-hidden z-20">
        <div className="h-full px-4 py-4">
          <div className="max-w-md mx-auto h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <CoinIcon className="w-6 h-6" />
                <span className="text-2xl font-bold text-purple-700">{beneBits}</span>
              </div>
              <Button
                onClick={() => setShowStore(true)}
                className="h-12 px-4 bg-green-500 hover:bg-green-600 text-white border-2 border-green-600 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Loja
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {ownedItems.length > 0 ? (
                <div className="grid grid-cols-4 gap-3 pb-4">
                  {ownedItems.map((item) => {
                    const isDisplayed = isItemDisplayedInRoom(item.id)
                    return (
                      <div
                        key={item.id}
                        className={`relative cursor-pointer transition-all duration-200 ${
                          isDisplayed
                            ? "bg-green-50 border-2 border-green-400 shadow-lg"
                            : "bg-white/90 border-2 border-amber-300 hover:border-amber-400 hover:shadow-md"
                        } rounded-xl p-3`}
                        onClick={() => toggleItemInRoom(item)}
                      >
                        <div className="w-full h-16 flex items-center justify-center">
                          {React.createElement(item.component, { className: "w-12 h-12" })}
                        </div>
                        {isDisplayed && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-lg text-gray-600">Nenhum item comprado</p>
                  <p className="text-sm text-gray-500">Visite a loja para comprar decorações!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── DIALOGS ───────────────────────────────────────────────── */}

      {/* First visit */}
      <Dialog open={showFirstMessage} onOpenChange={setShowFirstMessage}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl text-center text-purple-700 flex gap-3 justify-center">
              <Sparkles className="w-8 h-8" />
              Bem-vindo!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-4 text-center">
            <div className="text-6xl">🏠</div>
            <p className="text-2xl font-bold text-gray-800 leading-relaxed">
              Ganhe BeneBits para decorar seu cantinho!
            </p>
            <p className="text-xl text-gray-600">
              Complete suas tarefas diárias e use BeneBits para comprar móveis e decorações.
            </p>
            <Button
              onClick={() => setShowFirstMessage(false)}
              className="w-full h-16 text-2xl bg-purple-500 hover:bg-purple-600 text-white"
            >
              Entendi!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Store - COMPACT MOBILE-OPTIMIZED */}
      <Dialog open={showStore} onOpenChange={setShowStore}>
        <DialogContent className="w-[95vw] max-w-sm h-[80vh] max-h-[600px] p-0 gap-0">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="text-xl text-center text-green-700 flex gap-2 justify-center">
              <ShoppingBag className="w-5 h-5" />
              Loja
            </DialogTitle>
          </DialogHeader>

          {/* CATEGORY TOGGLE BUTTONS */}
          <div className="px-4 pb-3">
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={`h-12 p-2 flex flex-col items-center justify-center gap-1 text-xs ${
                    selectedCategory === cat
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-white hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  {getCategoryIcon(cat)}
                </Button>
              ))}
            </div>
          </div>

          {/* ITEMS GRID */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {ROOM_ITEMS.filter((item) => item.category === selectedCategory).map((item) => (
                <Card
                  key={item.id}
                  className={`border transition-all duration-200 ${
                    inventory[item.id] ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <CardContent className="p-2">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 flex justify-center items-center bg-gray-50 rounded-lg">
                        {React.createElement(item.component, { className: "w-8 h-8" })}
                      </div>

                      <div className="text-center w-full">
                        <h4 className="text-sm font-semibold text-gray-800 leading-tight">{item.name}</h4>

                        {!inventory[item.id] && (
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <CoinIcon className="w-3 h-3" />
                            <span
                              className={`text-xs font-bold ${
                                beneBits >= item.price ? "text-purple-600" : "text-gray-400"
                              }`}
                            >
                              {item.price}
                            </span>
                          </div>
                        )}
                      </div>

                      {inventory[item.id] ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <Star className="w-3 h-3" />
                          <span className="text-xs font-semibold">OK</span>
                        </div>
                      ) : (
                        <Button
                          disabled={beneBits < item.price}
                          onClick={() => purchaseItem(item)}
                          size="sm"
                          className={`h-6 px-2 text-xs font-semibold w-full ${
                            beneBits >= item.price
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          Comprar
                        </Button>
                      )}

                      {purchaseAnimation === item.id && <Sparkles className="w-3 h-3 text-yellow-500 animate-spin" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
