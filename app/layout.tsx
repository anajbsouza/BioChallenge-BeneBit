import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BottomNavigation } from "@/components/bottom-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BeneBit - Seu companheiro de saúde",
  description: "App de saúde e bem-estar para idosos",
  generator: "v0.dev",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.className}`}>
        <main className="min-h-screen pb-24">{children}</main>
        <BottomNavigation />
      </body>
    </html>
  )
}
