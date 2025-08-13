"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MainPage() {
  const router = useRouter()

  useEffect(() => {
    // Always redirect to login page first
    router.push("/login")
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xl text-gray-600">Carregando...</p>
      </div>
    </div>
  )
}
