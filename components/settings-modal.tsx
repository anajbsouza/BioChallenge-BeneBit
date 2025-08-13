"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Eye, Info, Volume2, Type, Moon, HelpCircle, Send, Check, X } from "lucide-react"

interface SettingsData {
  notifications: {
    reminders: boolean
    sound: string
  }
  visual: {
    largerFont: boolean
    darkMode: boolean
    explanatoryIcons: boolean
  }
}

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [settings, setSettings] = useState<SettingsData>({
    notifications: {
      reminders: true,
      sound: "padrao",
    },
    visual: {
      largerFont: false,
      darkMode: false,
      explanatoryIcons: true,
    },
  })

  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackSent, setFeedbackSent] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("beneBitSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save settings to localStorage
  const saveSettings = (newSettings: SettingsData) => {
    setSettings(newSettings)
    localStorage.setItem("beneBitSettings", JSON.stringify(newSettings))
  }

  const updateNotificationSetting = (key: keyof SettingsData["notifications"], value: boolean | string) => {
    const newSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    }
    saveSettings(newSettings)
  }

  const updateVisualSetting = (key: keyof SettingsData["visual"], value: boolean) => {
    const newSettings = {
      ...settings,
      visual: {
        ...settings.visual,
        [key]: value,
      },
    }
    saveSettings(newSettings)
  }

  const sendFeedback = async () => {
    if (!feedbackText.trim()) return

    // Simulate sending feedback
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setFeedbackSent(true)
    setTimeout(() => {
      setFeedbackSent(false)
      setFeedbackText("")
      setShowFeedback(false)
    }, 2000)
  }

  const soundOptions = [
    { value: "padrao", label: "Padrão" },
    { value: "suave", label: "Suave" },
    { value: "nenhum", label: "Nenhum" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            Configurações
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 p-2">
          {/* Notifications Section */}
          <Card className="bg-white border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Bell className="w-8 h-8 text-purple-600" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Reminder Toggle */}
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
                <div className="flex-1">
                  <Label className="text-xl font-medium text-gray-700">Receber lembretes</Label>
                  <p className="text-lg text-gray-600 mt-1">Horário das tarefas</p>
                </div>
                <Switch
                  checked={settings.notifications.reminders}
                  onCheckedChange={(checked) => updateNotificationSetting("reminders", checked)}
                  className="h-8 w-14 data-[state=checked]:bg-purple-500"
                />
              </div>

              {/* Sound Selection */}
              <div className="space-y-4">
                <Label className="text-xl font-medium text-gray-700 flex items-center gap-2">
                  <Volume2 className="w-6 h-6 text-purple-600" />
                  Som das notificações
                </Label>
                <Select
                  value={settings.notifications.sound}
                  onValueChange={(value) => updateNotificationSetting("sound", value)}
                >
                  <SelectTrigger className="h-16 text-xl border-2 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {soundOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-xl py-4">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Visual Mode Section */}
          <Card className="bg-white border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Eye className="w-8 h-8 text-purple-600" />
                Modo Visual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Larger Font Toggle */}
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
                <div className="flex-1">
                  <Label className="text-xl font-medium text-gray-700 flex items-center gap-2">
                    <Type className="w-6 h-6 text-purple-600" />
                    Fonte maior
                  </Label>
                  <p className="text-lg text-gray-600 mt-1">Texto mais fácil de ler</p>
                </div>
                <Switch
                  checked={settings.visual.largerFont}
                  onCheckedChange={(checked) => updateVisualSetting("largerFont", checked)}
                  className="h-8 w-14 data-[state=checked]:bg-purple-500"
                />
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
                <div className="flex-1">
                  <Label className="text-xl font-medium text-gray-700 flex items-center gap-2">
                    <Moon className="w-6 h-6 text-purple-600" />
                    Modo escuro
                  </Label>
                  <p className="text-lg text-gray-600 mt-1">Fundo escuro</p>
                </div>
                <Switch
                  checked={settings.visual.darkMode}
                  onCheckedChange={(checked) => updateVisualSetting("darkMode", checked)}
                  className="h-8 w-14 data-[state=checked]:bg-purple-500"
                />
              </div>

              {/* Explanatory Icons Toggle */}
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
                <div className="flex-1">
                  <Label className="text-xl font-medium text-gray-700 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-purple-600" />
                    Ícones explicativos
                  </Label>
                  <p className="text-lg text-gray-600 mt-1">Mais ícones nos menus</p>
                </div>
                <Switch
                  checked={settings.visual.explanatoryIcons}
                  onCheckedChange={(checked) => updateVisualSetting("explanatoryIcons", checked)}
                  className="h-8 w-14 data-[state=checked]:bg-purple-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="bg-white border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Info className="w-8 h-8 text-purple-600" />
                Sobre o App
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* App Info */}
              <div className="p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-200">
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-bold text-purple-700">BeneBit</h3>
                  <p className="text-xl text-gray-700">Versão 1.0.0</p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Desenvolvido por equipe BioMinds no BioChallenge 2025
                  </p>
                </div>
              </div>

              {/* Feedback Button */}
              <Button
                onClick={() => setShowFeedback(true)}
                className="w-full h-20 text-2xl font-semibold bg-purple-500 hover:bg-purple-600 text-white rounded-2xl"
              >
                <Send className="w-8 h-8 mr-3" />
                Enviar sugestão
              </Button>
            </CardContent>
          </Card>

          {/* Close Button */}
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full h-20 text-2xl font-semibold border-2 border-gray-300 rounded-2xl"
          >
            <X className="w-8 h-8 mr-3" />
            Fechar
          </Button>
        </div>

        {/* Feedback Modal */}
        <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Sua sugestão</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-2">
              {feedbackSent ? (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Enviado!</h3>
                    <p className="text-xl text-gray-600">Obrigado pela sua sugestão</p>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <Label className="text-xl font-medium text-gray-700">Como podemos melhorar?</Label>
                    <Textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Digite sua sugestão aqui..."
                      className="mt-3 min-h-32 text-xl p-4 border-2 border-gray-300 rounded-2xl"
                      maxLength={500}
                    />
                    <p className="text-lg text-gray-500 mt-2 text-right">{feedbackText.length}/500</p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={sendFeedback}
                      disabled={!feedbackText.trim()}
                      className="flex-1 h-16 text-xl bg-purple-500 hover:bg-purple-600"
                    >
                      <Send className="w-6 h-6 mr-2" />
                      Enviar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowFeedback(false)}
                      className="flex-1 h-16 text-xl border-2 border-gray-300"
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  )
}
