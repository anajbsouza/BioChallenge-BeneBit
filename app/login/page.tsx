"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { LogIn, Mail, Lock, Eye, EyeOff, User } from "lucide-react"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add proper authentication logic
    console.log("Form submitted:", formData)
    
    // For now, just redirect to welcome page after login
    router.push('/welcome')
  }

  const handleGoogleLogin = () => {
    // TODO: Add Google authentication logic
    console.log("Google login clicked")
  }

  const handleFacebookLogin = () => {
    // TODO: Add Facebook authentication logic
    console.log("Facebook login clicked")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header with Icon and Title */}
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <LogIn className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Entrar</h1>
          <p className="text-xl text-gray-600">Bem-vindo ao BeneBit</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg rounded-2xl">
          <CardContent className="px-8 pb-8 pt-6">
            {/* Social Login Buttons */}
            <div className="space-y-4 mb-8">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full h-16 text-xl font-semibold border-2 border-gray-300 hover:border-blue-300 rounded-2xl bg-white hover:bg-gray-50"
                aria-label="Entrar com Google"
              >
                <svg className="w-8 h-8 mr-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuar com Google
              </Button>

              <Button
                onClick={handleFacebookLogin}
                className="w-full h-16 text-xl font-semibold bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-2xl"
                aria-label="Entrar com Facebook"
              >
                <svg className="w-8 h-8 mr-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continuar com Facebook
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200" />
              </div>
              <div className="relative flex justify-center text-lg">
                <span className="bg-white px-4 text-gray-500 font-medium">ou</span>
              </div>
            </div>

            {/* Toggle Login/Register */}
            <div className="flex mb-8 bg-gray-100 rounded-2xl p-2">
              <Button
                type="button"
                variant={isLogin ? "default" : "ghost"}
                onClick={() => setIsLogin(true)}
                className={`flex-1 h-12 text-lg font-semibold rounded-xl ${
                  isLogin ? "bg-blue-500 text-white" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Entrar
              </Button>
              <Button
                type="button"
                variant={!isLogin ? "default" : "ghost"}
                onClick={() => setIsLogin(false)}
                className={`flex-1 h-12 text-lg font-semibold rounded-xl ${
                  !isLogin ? "bg-blue-500 text-white" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Cadastrar
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field (register only) */}
              {!isLogin && (
                <div className="space-y-3">
                  <Label className="text-xl font-semibold text-gray-700">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-16 pl-14 text-lg border-2 border-gray-300 rounded-2xl focus:border-blue-500"
                      placeholder="Digite seu nome completo"
                      required={!isLogin}
                      aria-label="Nome completo"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-3">
                <Label className="text-xl font-semibold text-gray-700">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-16 pl-14 text-lg border-2 border-gray-300 rounded-2xl focus:border-blue-500"
                    placeholder="Digite seu e-mail"
                    required
                    aria-label="E-mail"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <Label className="text-xl font-semibold text-gray-700">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-16 pl-14 pr-14 text-lg border-2 border-gray-300 rounded-2xl focus:border-blue-500"
                    placeholder="Digite sua senha"
                    required
                    aria-label="Senha"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 p-0 hover:bg-gray-100 rounded-xl"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-6 h-6 text-gray-400" />
                    ) : (
                      <Eye className="w-6 h-6 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password (register only) */}
              {!isLogin && (
                <div className="space-y-3">
                  <Label className="text-xl font-semibold text-gray-700">Confirmar senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="h-16 pl-14 pr-14 text-lg border-2 border-gray-300 rounded-2xl focus:border-blue-500"
                      placeholder="Confirme sua senha"
                      required={!isLogin}
                      aria-label="Confirmar senha"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 p-0 hover:bg-gray-100 rounded-xl"
                      aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-6 h-6 text-gray-400" />
                      ) : (
                        <Eye className="w-6 h-6 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-18 text-2xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg"
              >
                {isLogin ? "Entrar" : "Criar conta"}
              </Button>

              {/* Forgot Password (login only) */}
              {isLogin && (
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-lg text-blue-600 hover:text-blue-800 font-medium underline"
                    onClick={() => {
                      // TODO: Add forgot password logic
                      console.log("Forgot password clicked")
                    }}
                  >
                    Esqueci minha senha
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-lg text-gray-600">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-xl text-blue-600 hover:text-blue-800 font-semibold underline p-0"
            >
              {isLogin ? "Cadastre-se" : "Entre aqui"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
