interface CoinIconProps {
  className?: string
}

export function CoinIcon({ className = "w-8 h-8" }: CoinIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="12" cy="12" r="10" fill="currentColor" className="text-purple-500" />
      {/* Inner circle for depth */}
      <circle cx="12" cy="12" r="8" fill="currentColor" className="text-purple-400" />
      {/* Letter B */}
      <text x="12" y="16" textAnchor="middle" className="fill-white font-bold" style={{ fontSize: "10px" }}>
        B
      </text>
      {/* Small highlight for 3D effect */}
      <circle cx="9" cy="9" r="2" fill="currentColor" className="text-purple-300 opacity-60" />
    </svg>
  )
}
