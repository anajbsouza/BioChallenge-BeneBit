"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sparkles } from "lucide-react"

export default function WelcomeScreen() {
  const [name, setName] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const handleContinue = () => {
    setIsAnimating(true)
    // Store name in localStorage for use in main page
    localStorage.setItem("userName", name)
    setTimeout(() => {
      router.push("/home")
    }, 500)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim())
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-violet-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* App Logo/Icon */}
        <div className="text-center space-y-6">
          <div className="mx-auto w-28 h-28 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="relative">
              <Heart className="w-16 h-16 text-white" />
              <Sparkles className="w-8 h-8 text-purple-200 absolute -top-2 -right-2" />
            </div>
          </div>

          {/* Welcome Title */}
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Bem-vindo ao
            <br />
            <span className="text-purple-600">BeneBit!</span>
          </h1>
        </div>

        {/* Name Input Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-6">
              <Label htmlFor="name-input" className="text-3xl font-semibold text-gray-800 block text-center">
                Seu nome?
              </Label>

              <div className="relative">
                <Input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Digite aqui"
                  className="h-20 text-2xl px-6 border-2 border-gray-300 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                  maxLength={30}
                />
                {name && (
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                )}
              </div>

              {name && (
                <p className="text-2xl text-center text-gray-600 animate-fade-in">
                  Olá, <span className="font-semibold text-purple-600">{name}</span>!
                </p>
              )}
            </div>

            {/* Continue Button */}
            <div className="pt-6">
              {name ? (
                <Button
                  onClick={handleContinue}
                  disabled={isAnimating}
                  className={`w-full h-20 text-2xl font-semibold rounded-2xl transition-all duration-300 ${
                    isAnimating ? "bg-green-500 scale-105" : "bg-purple-500 hover:bg-purple-600 hover:scale-105"
                  } text-white shadow-lg`}
                >
                  {isAnimating ? (
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Preparando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      Continuar
                      <Heart className="w-8 h-8" />
                    </div>
                  )}
                </Button>
              ) : (
                <div className="w-full h-20 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <p className="text-xl text-gray-500 font-medium">Digite seu nome</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
