"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Droplets, Clock, Trash2, History } from "lucide-react"

type Quantidade = "Pouco" | "Médio" | "Muito"
type Cor = "Transparente" | "Amarelo claro" | "Amarelo escuro" | "Laranja" | "Vermelho"

interface Registro {
  id: string
  time: string
  quantidade: Quantidade
  cor: Cor
  escape: boolean
}

const quantidadeOptions = [
  { value: "Pouco" as Quantidade, label: "Pouco", drops: 1 },
  { value: "Médio" as Quantidade, label: "Médio", drops: 2 },
  { value: "Muito" as Quantidade, label: "Muito", drops: 3 },
]

const corOptions = [
  { value: "Transparente" as Cor, label: "Transparente", color: "bg-gray-100 border-gray-400" },
  { value: "Amarelo claro" as Cor, label: "Amarelo claro", color: "bg-yellow-100 border-yellow-400" },
  { value: "Amarelo escuro" as Cor, label: "Amarelo escuro", color: "bg-yellow-300 border-yellow-600" },
  { value: "Laranja" as Cor, label: "Laranja", color: "bg-orange-300 border-orange-600" },
  { value: "Vermelho" as Cor, label: "Vermelho", color: "bg-red-300 border-red-600" },
]

const getDropIcon = (quantidade: Quantidade) => {
  const drops = quantidadeOptions.find((q) => q.value === quantidade)?.drops || 1
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: drops }).map((_, i) => (
        <Droplets key={i} className="w-5 h-5 text-blue-500" />
      ))}
    </div>
  )
}

const getColorCircle = (cor: Cor) => {
  const corOption = corOptions.find((c) => c.value === cor)
  return <div className={`w-8 h-8 rounded-full border-2 ${corOption?.color || "bg-gray-100 border-gray-400"}`} />
}

export default function UrineLogPage() {
  const [registrosHoje, setRegistrosHoje] = useState<Registro[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newRegistro, setNewRegistro] = useState({
    time: new Date().toTimeString().slice(0, 5),
    quantidade: null as Quantidade | null,
    cor: null as Cor | null,
    escape: false,
  })
  const [errors, setErrors] = useState<{ quantidade?: boolean; cor?: boolean }>({})

  const addRegistro = () => {
    // Validation
    const newErrors: { quantidade?: boolean; cor?: boolean } = {}
    if (!newRegistro.quantidade) newErrors.quantidade = true
    if (!newRegistro.cor) newErrors.cor = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const registro: Registro = {
      id: Date.now().toString(),
      time: newRegistro.time,
      quantidade: newRegistro.quantidade!,
      cor: newRegistro.cor!,
      escape: newRegistro.escape,
    }

    // TODO: POST /urine-logs
    setRegistrosHoje([registro, ...registrosHoje])

    // Reset form
    setNewRegistro({
      time: new Date().toTimeString().slice(0, 5),
      quantidade: null,
      cor: null,
      escape: false,
    })
    setErrors({})
    setShowAddModal(false)
  }

  const deleteRegistro = (id: string) => {
    // TODO: DELETE /urine-logs/:id
    setRegistrosHoje(registrosHoje.filter((r) => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 pb-28">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg mb-4">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Urina</h1>
        </div>

        {/* Card 1 - Hoje */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">{registrosHoje.length}</div>
              <div className="text-xl text-gray-700">Registros hoje</div>
            </div>

            <div className="flex gap-4">
              <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogTrigger asChild>
                  <Button
                    className="flex-1 h-14 text-lg font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
                    aria-label="Adicionar novo registro de urina"
                  >
                    <Droplets className="w-5 h-5 mr-2" />
                    Novo
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-hidden flex flex-col rounded-2xl">
                  <DialogHeader className="flex-shrink-0 pb-4">
                    <DialogTitle className="text-2xl text-center font-bold">Novo Registro</DialogTitle>
                  </DialogHeader>

                  <div className="flex-1 overflow-y-auto px-1">
                    <div className="space-y-6">
                      {/* Horário */}
                      <div className="space-y-3">
                        <Label className="text-xl font-semibold">Horário</Label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                          <Input
                            type="time"
                            value={newRegistro.time}
                            onChange={(e) => setNewRegistro({ ...newRegistro, time: e.target.value })}
                            className="h-16 pl-14 text-xl text-center bg-blue-50 border-2 border-blue-200 rounded-xl"
                            aria-label="Selecionar horário do registro"
                          />
                        </div>
                      </div>

                      {/* Quantidade */}
                      <div className="space-y-3">
                        <Label className="text-xl font-semibold">Quantidade</Label>
                        {errors.quantidade && <p className="text-red-600 text-lg">Selecione uma quantidade</p>}
                        <div className="grid grid-cols-3 gap-3">
                          {quantidadeOptions.map((option) => (
                            <Button
                              key={option.value}
                              variant={newRegistro.quantidade === option.value ? "default" : "outline"}
                              onClick={() => {
                                setNewRegistro({ ...newRegistro, quantidade: option.value })
                                setErrors({ ...errors, quantidade: false })
                              }}
                              className={`h-20 flex flex-col items-center justify-center gap-2 text-lg font-semibold rounded-xl ${
                                newRegistro.quantidade === option.value
                                  ? "bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-600"
                                  : "bg-white hover:bg-blue-50 text-gray-700 border-2 border-gray-300"
                              }`}
                              aria-label={`Quantidade ${option.label}`}
                              aria-pressed={newRegistro.quantidade === option.value}
                            >
                              {getDropIcon(option.value)}
                              <span>{option.label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Cor */}
                      <div className="space-y-3">
                        <Label className="text-xl font-semibold">Cor</Label>
                        {errors.cor && <p className="text-red-600 text-lg">Selecione uma cor</p>}
                        <div className="space-y-3">
                          {corOptions.map((option) => (
                            <Button
                              key={option.value}
                              variant={newRegistro.cor === option.value ? "default" : "outline"}
                              onClick={() => {
                                setNewRegistro({ ...newRegistro, cor: option.value })
                                setErrors({ ...errors, cor: false })
                              }}
                              className={`w-full h-16 flex items-center justify-start gap-4 text-lg font-semibold rounded-xl ${
                                newRegistro.cor === option.value
                                  ? "bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-600"
                                  : "bg-white hover:bg-blue-50 text-gray-700 border-2 border-gray-300"
                              }`}
                              aria-label={`Cor ${option.label}`}
                              aria-pressed={newRegistro.cor === option.value}
                            >
                              <div className={`w-10 h-10 rounded-full border-2 ${option.color}`} />
                              <span>{option.label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Escape */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <Label className="text-xl font-semibold">Foi escape?</Label>
                        <Switch
                          checked={newRegistro.escape}
                          onCheckedChange={(checked) => setNewRegistro({ ...newRegistro, escape: checked })}
                          className="scale-125"
                          aria-label="Marcar como escape"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex-shrink-0 pt-6 border-t space-y-3">
                    <Button
                      onClick={addRegistro}
                      className="w-full h-14 text-xl font-semibold bg-blue-500 hover:bg-blue-600 rounded-xl"
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setShowAddModal(false)}
                      className="w-full h-12 text-lg text-gray-600 hover:text-gray-800"
                    >
                      Cancelar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="flex-1 h-14 text-lg font-semibold rounded-xl border-2 border-blue-200 hover:bg-blue-50 bg-transparent"
                aria-label="Ver histórico de registros"
              >
                <History className="w-5 h-5 mr-2" />
                Histórico
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Hoje */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Hoje</h2>

          {registrosHoje.length === 0 ? (
            <Card className="bg-white/70 border-2 border-dashed border-gray-300 rounded-2xl">
              <CardContent className="p-8 text-center">
                <Droplets className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-500">Sem registros hoje</p>
              </CardContent>
            </Card>
          ) : (
            registrosHoje.map((registro) => (
              <Card
                key={registro.id}
                className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 rounded-2xl shadow-lg"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Time */}
                      <div className="text-center min-w-[60px]">
                        <div className="text-2xl font-bold text-blue-600">{registro.time}</div>
                      </div>

                      {/* Quantidade */}
                      <div className="flex items-center justify-center min-w-[60px]">
                        {getDropIcon(registro.quantidade)}
                      </div>

                      {/* Cor */}
                      <div className="flex items-center justify-center min-w-[60px]">
                        {getColorCircle(registro.cor)}
                      </div>

                      {/* Escape badge */}
                      {registro.escape && (
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                          💧
                        </div>
                      )}
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteRegistro(registro.id)}
                      className="h-12 w-12 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                      aria-label="Excluir registro"
                    >
                      <Trash2 className="w-6 h-6" />
                    </Button>
                  </div>
                </CardContent>
                {/* Warning for red urine */}
                {registro.cor === "Vermelho" && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="text-red-600">⚠️</div>
                      <p className="text-red-800 text-sm">
                        Urina vermelha pode indicar problemas de saúde. Consulte um médico.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Dica */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl">
          <CardContent className="p-6 text-center">
            <p className="text-lg text-blue-700">Urina clara indica boa hidratação.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
