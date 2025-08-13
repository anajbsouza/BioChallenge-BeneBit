"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Edit3, Mail, Plus, Trash2, Users, Heart } from "lucide-react"

export default function ProfilePage() {
  const [userName, setUserName] = useState("")
  const [caregiverEmails, setCaregiverEmails] = useState<string[]>([])
  const [showEditName, setShowEditName] = useState(false)
  const [showAddEmail, setShowAddEmail] = useState(false)
  const [tempName, setTempName] = useState("")
  const [newEmail, setNewEmail] = useState("")

  useEffect(() => {
    // Load data from localStorage
    const storedName = localStorage.getItem("userName") || ""
    const storedEmails = JSON.parse(localStorage.getItem("healthReportEmails") || "[]")

    setUserName(storedName)
    setCaregiverEmails(storedEmails)
    setTempName(storedName)
  }, [])

  const saveName = () => {
    setUserName(tempName)
    localStorage.setItem("userName", tempName)
    setShowEditName(false)
  }

  const addCaregiverEmail = () => {
    if (newEmail && validateEmail(newEmail) && !caregiverEmails.includes(newEmail)) {
      const updatedEmails = [...caregiverEmails, newEmail]
      setCaregiverEmails(updatedEmails)
      setNewEmail("")
      setShowAddEmail(false)
      localStorage.setItem("healthReportEmails", JSON.stringify(updatedEmails))
    }
  }

  const removeCaregiverEmail = (emailToRemove: string) => {
    const updatedEmails = caregiverEmails.filter((email) => email !== emailToRemove)
    setCaregiverEmails(updatedEmails)
    localStorage.setItem("healthReportEmails", JSON.stringify(updatedEmails))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4 pb-28">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Perfil</h1>
        </div>

        {/* Name Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
              <Heart className="w-6 h-6 text-purple-600" />
              Nome
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-gray-700 flex-1">{userName || "—"}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditName(true)}
                className="h-12 px-6 text-xl text-blue-600 border-blue-300 hover:bg-blue-50"
                aria-label="Editar nome"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Caregiver Emails Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-600" />
                Contatos
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddEmail(true)}
                className="h-12 px-6 text-xl text-green-600 border-green-300 hover:bg-green-50"
                aria-label="Adicionar novo contato"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar
              </Button>
            </CardTitle>
            <div className="pt-2">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Adicione e-mails de familiares e profissionais de saúde para receberem seu relatório semanal.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {caregiverEmails.length === 0 ? (
              <p className="text-xl text-gray-500 text-center py-6">Nenhum contato adicionado</p>
            ) : (
              caregiverEmails.map((email, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span className="flex-1 text-xl text-gray-700">{email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCaregiverEmail(email)}
                    className="h-12 w-12 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    aria-label={`Remover contato ${email}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Edit Name Dialog */}
        <Dialog open={showEditName} onOpenChange={setShowEditName}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">Editar Nome</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="text-xl h-14"
                placeholder="Seu nome"
                aria-label="Digite seu nome"
              />
              <div className="flex gap-3">
                <Button onClick={saveName} className="flex-1 h-14 text-xl">
                  Salvar
                </Button>
                <Button variant="outline" onClick={() => setShowEditName(false)} className="flex-1 h-14 text-xl">
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Email Dialog */}
        <Dialog open={showAddEmail} onOpenChange={setShowAddEmail}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">Novo Contato</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="text-xl h-14"
                placeholder="familiar@exemplo.com"
                aria-label="Digite o e-mail do contato"
              />
              <div className="flex gap-3">
                <Button onClick={addCaregiverEmail} disabled={!validateEmail(newEmail)} className="flex-1 h-14 text-xl">
                  Adicionar
                </Button>
                <Button variant="outline" onClick={() => setShowAddEmail(false)} className="flex-1 h-14 text-xl">
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
