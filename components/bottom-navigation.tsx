"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckSquare, BarChart3, User, Droplets, Home } from "lucide-react"

const navigationItems = [
  {
    id: "cuidados",
    label: "Cuidados",
    icon: CheckSquare,
    path: "/cuidados",
  },
  {
    id: "relatorio",
    label: "Relatório",
    icon: BarChart3,
    path: "/relatorio",
  },
  {
    id: "home",
    label: "Início",
    icon: Home,
    path: "/home",
    isCenter: true,
  },
  {
    id: "perfil",
    label: "Perfil",
    icon: User,
    path: "/perfil",
  },
  {
    id: "xixi",
    label: "Xixi",
    icon: Droplets,
    path: "/urina",
  },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  // Don't show navigation on onboarding pages
  if (pathname === "/welcome" || pathname === "/email-setup") {
    return null
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-200 shadow-lg z-50 pb-safe-bottom">
      <div className="max-w-md mx-auto px-2 py-3">
        <div className="grid grid-cols-5 gap-1 items-end">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            const isCenter = item.isCenter

            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  isCenter
                    ? `h-20 w-20 mx-auto rounded-full shadow-lg transform ${
                        isActive
                          ? "bg-amber-500 text-white shadow-xl scale-110"
                          : "bg-amber-400 text-white hover:bg-amber-500 hover:scale-105"
                      }`
                    : `h-18 rounded-xl ${
                        isActive
                          ? "bg-purple-100 text-purple-600 shadow-sm"
                          : "text-gray-600 hover:bg-purple-50 hover:text-purple-500"
                      }`
                }`}
              >
                <Icon
                  className={`${isCenter ? "w-8 h-8" : isActive ? "w-7 h-7" : "w-6 h-6"} transition-all duration-200`}
                />
                <span
                  className={`text-sm font-medium leading-tight text-center ${
                    isCenter ? "text-white" : isActive ? "text-purple-700" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
