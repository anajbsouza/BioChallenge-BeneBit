// SVG Components for Room Items

export const PlantSmall = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {/* Pot */}
    <path d="M30 70 L70 70 L65 90 L35 90 Z" fill="#8B4513" stroke="#654321" strokeWidth="2" />
    {/* Soil */}
    <ellipse cx="50" cy="70" rx="20" ry="3" fill="#4A4A4A" />
    {/* Stem */}
    <path d="M50 70 Q45 50 40 30" stroke="#228B22" strokeWidth="3" fill="none" />
    <path d="M50 70 Q55 45 60 25" stroke="#228B22" strokeWidth="2" fill="none" />
    {/* Leaves */}
    <ellipse cx="38" cy="35" rx="8" ry="12" fill="#32CD32" transform="rotate(-20 38 35)" />
    <ellipse cx="62" cy="30" rx="6" ry="10" fill="#32CD32" transform="rotate(15 62 30)" />
    <ellipse cx="45" cy="45" rx="5" ry="8" fill="#228B22" transform="rotate(-45 45 45)" />
  </svg>
)

export const FlowerVase = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {/* Vase */}
    <path d="M35 60 L65 60 L70 90 L30 90 Z" fill="#4169E1" stroke="#1E3A8A" strokeWidth="2" />
    {/* Flowers */}
    <circle cx="45" cy="45" r="6" fill="#FF69B4" />
    <circle cx="55" cy="40" r="5" fill="#FFB6C1" />
    <circle cx="50" cy="50" r="4" fill="#FF1493" />
    {/* Petals */}
    <circle cx="40" cy="42" r="3" fill="#FF69B4" opacity="0.8" />
    <circle cx="50" cy="38" r="3" fill="#FF69B4" opacity="0.8" />
    <circle cx="60" cy="43" r="3" fill="#FFB6C1" opacity="0.8" />
    {/* Stems */}
    <path d="M45 45 L45 60" stroke="#228B22" strokeWidth="2" />
    <path d="M55 40 L55 60" stroke="#228B22" strokeWidth="2" />
    <path d="M50 50 L50 60" stroke="#228B22" strokeWidth="1.5" />
  </svg>
)

export const WallPicture = ({ className = "w-16 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 120 80" className={className}>
    {/* Frame */}
    <rect x="5" y="5" width="110" height="70" fill="#8B4513" stroke="#654321" strokeWidth="2" />
    <rect x="10" y="10" width="100" height="60" fill="#F5F5DC" />
    {/* Picture content - landscape */}
    <path d="M15 50 Q30 35 45 40 Q60 30 75 35 Q90 25 105 30 L105 65 L15 65 Z" fill="#87CEEB" />
    <circle cx="25" cy="25" r="8" fill="#FFD700" />
    <path d="M15 45 Q25 40 35 42 Q45 38 55 40 Q65 35 75 38 Q85 33 95 35 Q105 30 105 35" fill="#228B22" stroke="none" />
    <path d="M70 50 L75 45 L80 50 L85 40 L90 45 L95 40 L100 45" fill="#006400" stroke="none" />
  </svg>
)

export const WindowCurtain = ({ className = "w-20 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 140 100" className={className}>
    {/* Window frame */}
    <rect x="10" y="10" width="120" height="80" fill="#8B4513" stroke="#654321" strokeWidth="2" />
    <rect x="15" y="15" width="110" height="70" fill="#87CEEB" opacity="0.3" />
    {/* Window panes */}
    <line x1="70" y1="15" x2="70" y2="85" stroke="#654321" strokeWidth="2" />
    <line x1="15" y1="50" x2="125" y2="50" stroke="#654321" strokeWidth="2" />
    {/* Curtains */}
    <path d="M5 5 Q15 15 10 25 Q20 35 15 45 Q25 55 20 65 Q30 75 25 85 L5 90 Z" fill="#FFB6C1" opacity="0.8" />
    <path
      d="M135 5 Q125 15 130 25 Q120 35 125 45 Q115 55 120 65 Q110 75 115 85 L135 90 Z"
      fill="#FFB6C1"
      opacity="0.8"
    />
  </svg>
)

export const WallMirror = ({ className = "w-12 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 80 100" className={className}>
    {/* Frame */}
    <ellipse cx="40" cy="50" rx="35" ry="45" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="2" />
    <ellipse cx="40" cy="50" rx="30" ry="40" fill="#E6E6FA" opacity="0.8" />
    {/* Reflection */}
    <ellipse cx="35" cy="45" rx="8" ry="12" fill="#FFFFFF" opacity="0.6" />
    <ellipse cx="45" cy="55" rx="5" ry="8" fill="#FFFFFF" opacity="0.4" />
  </svg>
)

export const WallClock = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {/* Clock face */}
    <circle cx="50" cy="50" r="40" fill="#F5F5DC" stroke="#8B4513" strokeWidth="3" />
    <circle cx="50" cy="50" r="35" fill="#FFFFFF" />
    {/* Numbers */}
    <text x="50" y="25" textAnchor="middle" fontSize="8" fill="#000">
      12
    </text>
    <text x="75" y="55" textAnchor="middle" fontSize="8" fill="#000">
      3
    </text>
    <text x="50" y="80" textAnchor="middle" fontSize="8" fill="#000">
      6
    </text>
    <text x="25" y="55" textAnchor="middle" fontSize="8" fill="#000">
      9
    </text>
    {/* Hands */}
    <line x1="50" y1="50" x2="50" y2="30" stroke="#000" strokeWidth="2" />
    <line x1="50" y1="50" x2="65" y2="50" stroke="#000" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="3" fill="#000" />
  </svg>
)

export const FluffyRug = ({ className = "w-20 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 140 80" className={className}>
    {/* Rug base */}
    <ellipse cx="70" cy="40" rx="65" ry="35" fill="#8B4513" />
    <ellipse cx="70" cy="40" rx="60" ry="30" fill="#DEB887" />
    {/* Fluffy texture */}
    <circle cx="50" cy="30" r="3" fill="#CD853F" opacity="0.7" />
    <circle cx="70" cy="25" r="2.5" fill="#CD853F" opacity="0.7" />
    <circle cx="90" cy="35" r="3" fill="#CD853F" opacity="0.7" />
    <circle cx="45" cy="50" r="2" fill="#CD853F" opacity="0.7" />
    <circle cx="95" cy="50" r="2.5" fill="#CD853F" opacity="0.7" />
    <circle cx="70" cy="55" r="2" fill="#CD853F" opacity="0.7" />
    {/* Pattern */}
    <ellipse cx="70" cy="40" rx="40" ry="20" fill="none" stroke="#A0522D" strokeWidth="1" opacity="0.5" />
  </svg>
)

export const TableLamp = ({ className = "w-10 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 80 120" className={className}>
    {/* Base */}
    <ellipse cx="40" cy="110" rx="15" ry="5" fill="#4A4A4A" />
    {/* Stand */}
    <rect x="38" y="70" width="4" height="40" fill="#696969" />
    {/* Lampshade */}
    <path d="M20 40 L60 40 L55 70 L25 70 Z" fill="#F0E68C" stroke="#DAA520" strokeWidth="1" />
    {/* Light glow */}
    <ellipse cx="40" cy="55" rx="25" ry="15" fill="#FFFF99" opacity="0.3" />
  </svg>
)

export const Bookshelf = ({ className = "w-16 h-20" }: { className?: string }) => (
  <svg viewBox="0 0 100 140" className={className}>
    {/* Shelf structure */}
    <rect x="10" y="20" width="80" height="100" fill="#8B4513" stroke="#654321" strokeWidth="2" />
    {/* Shelves */}
    <rect x="12" y="45" width="76" height="3" fill="#654321" />
    <rect x="12" y="70" width="76" height="3" fill="#654321" />
    <rect x="12" y="95" width="76" height="3" fill="#654321" />
    {/* Books */}
    <rect x="15" y="25" width="6" height="18" fill="#FF6B6B" />
    <rect x="22" y="25" width="5" height="18" fill="#4ECDC4" />
    <rect x="28" y="25" width="7" height="18" fill="#45B7D1" />
    <rect x="36" y="25" width="6" height="18" fill="#96CEB4" />
    <rect x="50" y="50" width="5" height="18" fill="#FFEAA7" />
    <rect x="56" y="50" width="6" height="18" fill="#DDA0DD" />
    <rect x="63" y="50" width="5" height="18" fill="#98D8C8" />
    <rect x="20" y="75" width="6" height="18" fill="#F7DC6F" />
    <rect x="27" y="75" width="5" height="18" fill="#BB8FCE" />
  </svg>
)

export const BlueArmchair = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className}>
    {/* Chair back */}
    <path
      d="M20 30 Q15 25 20 20 Q60 15 100 20 Q105 25 100 30 L100 70 Q95 75 90 70 L30 70 Q25 75 20 70 Z"
      fill="#4169E1"
    />
    {/* Seat */}
    <ellipse cx="60" cy="75" rx="35" ry="20" fill="#6495ED" />
    {/* Arms */}
    <ellipse cx="25" cy="60" rx="8" ry="15" fill="#4169E1" />
    <ellipse cx="95" cy="60" rx="8" ry="15" fill="#4169E1" />
    {/* Legs */}
    <rect x="30" y="90" width="4" height="15" fill="#8B4513" />
    <rect x="86" y="90" width="4" height="15" fill="#8B4513" />
    <rect x="40" y="90" width="4" height="15" fill="#8B4513" />
    <rect x="76" y="90" width="4" height="15" fill="#8B4513" />
  </svg>
)

export const SimpleBed = ({ className = "w-20 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 140 100" className={className}>
    {/* Bed frame */}
    <rect x="10" y="50" width="120" height="30" fill="#8B4513" stroke="#654321" strokeWidth="2" />
    {/* Mattress */}
    <rect x="15" y="45" width="110" height="20" fill="#F5F5DC" stroke="#DDD" strokeWidth="1" />
    {/* Headboard */}
    <rect x="10" y="20" width="8" height="40" fill="#654321" />
    {/* Pillow */}
    <ellipse cx="25" cy="40" rx="12" ry="6" fill="#FFB6C1" />
    {/* Blanket */}
    <path d="M40 45 Q70 40 100 45 Q110 50 100 55 Q70 60 40 55 Q30 50 40 45" fill="#87CEEB" opacity="0.8" />
    {/* Legs */}
    <rect x="15" y="80" width="4" height="10" fill="#654321" />
    <rect x="121" y="80" width="4" height="10" fill="#654321" />
  </svg>
)

export const GreySofa = ({ className = "w-20 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 140 80" className={className}>
    {/* Sofa back */}
    <rect x="10" y="20" width="120" height="25" rx="5" fill="#696969" />
    {/* Seat */}
    <rect x="15" y="40" width="110" height="20" rx="3" fill="#808080" />
    {/* Arms */}
    <rect x="5" y="25" width="15" height="35" rx="3" fill="#696969" />
    <rect x="120" y="25" width="15" height="35" rx="3" fill="#696969" />
    {/* Cushions */}
    <rect x="25" y="35" width="25" height="15" rx="2" fill="#A9A9A9" />
    <rect x="55" y="35" width="25" height="15" rx="2" fill="#A9A9A9" />
    <rect x="85" y="35" width="25" height="15" rx="2" fill="#A9A9A9" />
    {/* Legs */}
    <rect x="20" y="60" width="3" height="8" fill="#2F4F4F" />
    <rect x="117" y="60" width="3" height="8" fill="#2F4F4F" />
  </svg>
)

export const NightStand = ({ className = "w-12 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 80 100" className={className}>
    {/* Main body */}
    <rect x="15" y="30" width="50" height="50" fill="#8B4513" stroke="#654321" strokeWidth="2" />
    {/* Top */}
    <rect x="10" y="25" width="60" height="8" fill="#A0522D" />
    {/* Drawer */}
    <rect x="20" y="40" width="40" height="15" fill="#654321" stroke="#4A4A4A" strokeWidth="1" />
    <circle cx="40" cy="47" r="2" fill="#C0C0C0" />
    {/* Legs */}
    <rect x="20" y="80" width="4" height="15" fill="#654321" />
    <rect x="56" y="80" width="4" height="15" fill="#654321" />
  </svg>
)

export const TeaTable = ({ className = "w-16 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 80" className={className}>
    {/* Table top */}
    <ellipse cx="50" cy="35" rx="40" ry="20" fill="#DEB887" />
    <ellipse cx="50" cy="32" rx="40" ry="20" fill="#F4A460" />
    {/* Legs */}
    <rect x="25" y="50" width="4" height="25" fill="#8B4513" />
    <rect x="71" y="50" width="4" height="25" fill="#8B4513" />
    <rect x="35" y="50" width="4" height="25" fill="#8B4513" />
    <rect x="61" y="50" width="4" height="25" fill="#8B4513" />
    {/* Tea set */}
    <circle cx="45" cy="30" r="3" fill="#FFFFFF" stroke="#DDD" />
    <circle cx="55" cy="28" r="2" fill="#FFFFFF" stroke="#DDD" />
  </svg>
)

export const VintageRadio = ({ className = "w-12 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 80" className={className}>
    {/* Radio body */}
    <rect x="10" y="20" width="80" height="50" rx="5" fill="#8B4513" />
    {/* Speaker grille */}
    <rect x="15" y="25" width="35" height="40" fill="#2F4F4F" />
    <g stroke="#696969" strokeWidth="1">
      <line x1="18" y1="30" x2="47" y2="30" />
      <line x1="18" y1="35" x2="47" y2="35" />
      <line x1="18" y1="40" x2="47" y2="40" />
      <line x1="18" y1="45" x2="47" y2="45" />
      <line x1="18" y1="50" x2="47" y2="50" />
      <line x1="18" y1="55" x2="47" y2="55" />
      <line x1="18" y1="60" x2="47" y2="60" />
    </g>
    {/* Controls */}
    <circle cx="65" cy="35" r="6" fill="#C0C0C0" />
    <circle cx="75" cy="50" r="4" fill="#C0C0C0" />
    {/* Antenna */}
    <line x1="85" y1="20" x2="95" y2="5" stroke="#C0C0C0" strokeWidth="2" />
  </svg>
)

export const RetroTV = ({ className = "w-16 h-14" }: { className?: string }) => (
  <svg viewBox="0 0 120 100" className={className}>
    {/* TV body */}
    <rect x="10" y="25" width="100" height="65" rx="8" fill="#4A4A4A" />
    {/* Screen */}
    <rect x="20" y="35" width="80" height="45" rx="3" fill="#000" />
    <rect x="22" y="37" width="76" height="41" fill="#1a1a2e" />
    {/* Static/content */}
    <rect x="25" y="40" width="70" height="35" fill="#16213e" opacity="0.8" />
    <circle cx="60" cy="57" r="15" fill="#0f3460" opacity="0.6" />
    {/* Controls */}
    <circle cx="95" cy="45" r="3" fill="#C0C0C0" />
    <circle cx="95" cy="55" r="3" fill="#C0C0C0" />
    <circle cx="95" cy="65" r="3" fill="#C0C0C0" />
    {/* Legs */}
    <rect x="25" y="85" width="6" height="8" fill="#2F2F2F" />
    <rect x="89" y="85" width="6" height="8" fill="#2F2F2F" />
    {/* Antenna */}
    <line x1="30" y1="25" x2="20" y2="10" stroke="#C0C0C0" strokeWidth="2" />
    <line x1="90" y1="25" x2="100" y2="10" stroke="#C0C0C0" strokeWidth="2" />
  </svg>
)

export const SpeakerBox = ({ className = "w-10 h-14" }: { className?: string }) => (
  <svg viewBox="0 0 70 100" className={className}>
    {/* Speaker body */}
    <rect x="10" y="10" width="50" height="80" rx="3" fill="#2F2F2F" />
    {/* Speakers */}
    <circle cx="35" cy="30" r="12" fill="#1a1a1a" stroke="#696969" />
    <circle cx="35" cy="30" r="8" fill="#4A4A4A" />
    <circle cx="35" cy="70" r="8" fill="#1a1a1a" stroke="#696969" />
    <circle cx="35" cy="70" r="5" fill="#4A4A4A" />
    {/* Brand/details */}
    <rect x="15" y="50" width="40" height="3" fill="#696969" />
    <rect x="20" y="55" width="30" height="2" fill="#696969" />
  </svg>
)

export const ModernLamp = ({ className = "w-8 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 60 120" className={className}>
    {/* Base */}
    <ellipse cx="30" cy="110" rx="12" ry="4" fill="#C0C0C0" />
    {/* Stand */}
    <rect x="28" y="60" width="4" height="50" fill="#A0A0A0" />
    {/* Lamp head */}
    <ellipse cx="30" cy="40" rx="20" ry="25" fill="#F0F0F0" />
    <ellipse cx="30" cy="35" rx="18" ry="20" fill="#FFFFFF" />
    {/* Light glow */}
    <ellipse cx="30" cy="50" rx="25" ry="15" fill="#FFFACD" opacity="0.4" />
    {/* Switch */}
    <rect x="32" y="65" width="3" height="6" fill="#4A4A4A" />
  </svg>
)

export const VintageComputer = ({ className = "w-14 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 80" className={className}>
    {/* Monitor */}
    <rect x="20" y="10" width="60" height="45" rx="3" fill="#F5F5DC" />
    {/* Screen */}
    <rect x="25" y="15" width="50" height="35" fill="#000" />
    <rect x="27" y="17" width="46" height="31" fill="#0f4f0f" />
    {/* Text on screen */}
    <rect x="30" y="20" width="20" height="2" fill="#00ff00" />
    <rect x="30" y="25" width="35" height="2" fill="#00ff00" />
    <rect x="30" y="30" width="25" height="2" fill="#00ff00" />
    {/* Keyboard */}
    <rect x="15" y="60" width="70" height="15" rx="2" fill="#E5E5E5" />
    <g fill="#D3D3D3">
      <rect x="20" y="65" width="4" height="3" />
      <rect x="26" y="65" width="4" height="3" />
      <rect x="32" y="65" width="4" height="3" />
      <rect x="38" y="65" width="4" height="3" />
      <rect x="44" y="65" width="4" height="3" />
      <rect x="50" y="65" width="4" height="3" />
      <rect x="56" y="65" width="4" height="3" />
      <rect x="62" y="65" width="4" height="3" />
      <rect x="68" y="65" width="4" height="3" />
      <rect x="74" y="65" width="4" height="3" />
    </g>
    {/* Stand */}
    <rect x="45" y="55" width="10" height="8" fill="#C0C0C0" />
  </svg>
)

export const TeddyBear = ({ className = "w-12 h-14" }: { className?: string }) => (
  <svg viewBox="0 0 80 100" className={className}>
    {/* Body */}
    <ellipse cx="40" cy="65" rx="18" ry="25" fill="#DEB887" />
    {/* Head */}
    <circle cx="40" cy="35" r="15" fill="#DEB887" />
    {/* Ears */}
    <circle cx="30" cy="25" r="6" fill="#DEB887" />
    <circle cx="50" cy="25" r="6" fill="#DEB887" />
    <circle cx="30" cy="25" r="3" fill="#CD853F" />
    <circle cx="50" cy="25" r="3" fill="#CD853F" />
    {/* Eyes */}
    <circle cx="35" cy="32" r="2" fill="#000" />
    <circle cx="45" cy="32" r="2" fill="#000" />
    <circle cx="36" cy="31" r="0.5" fill="#FFF" />
    <circle cx="46" cy="31" r="0.5" fill="#FFF" />
    {/* Nose */}
    <ellipse cx="40" cy="38" rx="1.5" ry="1" fill="#000" />
    {/* Arms */}
    <ellipse cx="25" cy="55" rx="6" ry="12" fill="#DEB887" />
    <ellipse cx="55" cy="55" rx="6" ry="12" fill="#DEB887" />
    {/* Legs */}
    <ellipse cx="32" cy="85" rx="6" ry="10" fill="#DEB887" />
    <ellipse cx="48" cy="85" rx="6" ry="10" fill="#DEB887" />
    {/* Bow tie */}
    <path d="M35 45 L45 45 L40 50 Z" fill="#FF6B6B" />
    <path d="M35 45 L45 45 L40 40 Z" fill="#FF6B6B" />
    <rect x="39" y="42" width="2" height="6" fill="#8B0000" />
  </svg>
)

export const AnimatedPicture = ({ className = "w-16 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 120 80" className={className}>
    {/* Frame */}
    <rect x="5" y="5" width="110" height="70" fill="#FFD700" stroke="#DAA520" strokeWidth="3" />
    <rect x="10" y="10" width="100" height="60" fill="#000" />
    {/* Animated content */}
    <circle cx="60" cy="40" r="20" fill="#FF69B4" opacity="0.8">
      <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="45" cy="30" r="5" fill="#FFD700">
      <animate attributeName="cy" values="30;25;30" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="75" cy="50" r="3" fill="#00FFFF">
      <animate attributeName="cx" values="75;80;75" dur="1s" repeatCount="indefinite" />
    </circle>
    {/* Sparkles */}
    <g fill="#FFFFFF" opacity="0.8">
      <circle cx="30" cy="20" r="1">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="25" r="1">
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="25" cy="55" r="1">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.8s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
)

export const MagicDoor = ({ className = "w-12 h-20" }: { className?: string }) => (
  <svg viewBox="0 0 80 140" className={className}>
    {/* Door frame */}
    <rect x="10" y="20" width="60" height="110" rx="5" fill="#8B4513" />
    <rect x="15" y="25" width="50" height="100" rx="3" fill="#DEB887" />
    {/* Door panels */}
    <rect x="20" y="30" width="40" height="40" rx="2" fill="#CD853F" />
    <rect x="20" y="80" width="40" height="40" rx="2" fill="#CD853F" />
    {/* Handle */}
    <circle cx="55" cy="75" r="3" fill="#FFD700" />
    {/* Magic effects */}
    <g fill="#9370DB" opacity="0.6">
      <circle cx="25" cy="50" r="2">
        <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="55" cy="45" r="1.5">
        <animate attributeName="r" values="1.5;3;1.5" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="35" cy="100" r="2.5">
        <animate attributeName="r" values="2.5;4.5;2.5" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </g>
    {/* Sparkles */}
    <g fill="#FFD700">
      <circle cx="30" cy="40" r="1">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="90" r="1">
        <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
)

export const InteractiveWindow = ({ className = "w-20 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 140 100" className={className}>
    {/* Window frame */}
    <rect x="10" y="10" width="120" height="80" fill="#8B4513" stroke="#654321" strokeWidth="3" />
    {/* Animated landscape */}
    <rect x="15" y="15" width="110" height="70" fill="#87CEEB" />
    {/* Moving clouds */}
    <ellipse cx="30" cy="30" rx="8" ry="5" fill="#FFFFFF" opacity="0.8">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;20,0;0,0"
        dur="4s"
        repeatCount="indefinite"
      />
    </ellipse>
    <ellipse cx="80" cy="25" rx="6" ry="4" fill="#FFFFFF" opacity="0.7">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0;-15,0;0,0"
        dur="3s"
        repeatCount="indefinite"
      />
    </ellipse>
    {/* Sun */}
    <circle cx="100" cy="30" r="8" fill="#FFD700">
      <animate attributeName="fill" values="#FFD700;#FFA500;#FFD700" dur="2s" repeatCount="indefinite" />
    </circle>
    {/* Mountains */}
    <path d="M15 60 L35 40 L55 50 L75 35 L95 45 L115 40 L125 60 L125 85 L15 85 Z" fill="#228B22" />
    {/* Water */}
    <rect x="15" y="70" width="110" height="15" fill="#4682B4" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite" />
    </rect>
    {/* Window panes */}
    <line x1="70" y1="15" x2="70" y2="85" stroke="#654321" strokeWidth="2" />
    <line x1="15" y1="50" x2="125" y2="50" stroke="#654321" strokeWidth="2" />
  </svg>
)

export const DigitalPet = ({ className = "w-10 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 70 80" className={className}>
    {/* Pet body */}
    <ellipse cx="35" cy="50" rx="15" ry="20" fill="#FF69B4" />
    {/* Head */}
    <circle cx="35" cy="25" r="12" fill="#FF69B4" />
    {/* Ears */}
    <ellipse cx="28" cy="18" rx="3" ry="6" fill="#FF1493" />
    <ellipse cx="42" cy="18" rx="3" ry="6" fill="#FF1493" />
    {/* Eyes */}
    <circle cx="30" cy="23" r="2" fill="#000">
      <animate attributeName="r" values="2;0.5;2" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="23" r="2" fill="#000">
      <animate attributeName="r" values="2;0.5;2" dur="3s" repeatCount="indefinite" />
    </circle>
    {/* Nose */}
    <ellipse cx="35" cy="28" rx="1" ry="0.5" fill="#000" />
    {/* Arms */}
    <ellipse cx="22" cy="45" rx="4" ry="8" fill="#FF69B4">
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 22 45;10 22 45;0 22 45"
        dur="2s"
        repeatCount="indefinite"
      />
    </ellipse>
    <ellipse cx="48" cy="45" rx="4" ry="8" fill="#FF69B4">
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 48 45;-10 48 45;0 48 45"
        dur="2s"
        repeatCount="indefinite"
      />
    </ellipse>
    {/* Legs */}
    <ellipse cx="28" cy="65" rx="4" ry="6" fill="#FF69B4" />
    <ellipse cx="42" cy="65" rx="4" ry="6" fill="#FF69B4" />
    {/* Digital effects */}
    <g fill="#00FFFF" opacity="0.6">
      <circle cx="20" cy="30" r="1">
        <animate attributeName="opacity" values="0.6;0;0.6" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="35" r="1">
        <animate attributeName="opacity" values="0;0.6;0" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
)
