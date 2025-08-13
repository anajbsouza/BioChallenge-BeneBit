// SVG Components for Shelf Collection Items

export const BlueFish = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 80" className={className}>
    {/* Fish body */}
    <ellipse cx="45" cy="40" rx="25" ry="15" fill="#4A90E2" />
    <ellipse cx="45" cy="40" rx="20" ry="12" fill="#5BA0F2" />

    {/* Tail */}
    <path d="M20 40 L5 25 L10 40 L5 55 Z" fill="#4A90E2" />

    {/* Fins */}
    <ellipse cx="35" cy="50" rx="8" ry="4" fill="#4A90E2" transform="rotate(30 35 50)" />
    <ellipse cx="35" cy="30" rx="8" ry="4" fill="#4A90E2" transform="rotate(-30 35 30)" />

    {/* Eye */}
    <circle cx="55" cy="35" r="4" fill="#FFFFFF" />
    <circle cx="56" cy="35" r="2" fill="#000000" />
    <circle cx="57" cy="34" r="1" fill="#FFFFFF" />

    {/* Scales pattern */}
    <g fill="#6BB6FF" opacity="0.6">
      <circle cx="40" cy="35" r="2" />
      <circle cx="50" cy="40" r="2" />
      <circle cx="45" cy="45" r="2" />
    </g>

    {/* Bubbles */}
    <circle cx="75" cy="20" r="2" fill="#87CEEB" opacity="0.7" />
    <circle cx="80" cy="15" r="1.5" fill="#87CEEB" opacity="0.7" />
    <circle cx="85" cy="25" r="1" fill="#87CEEB" opacity="0.7" />
  </svg>
)

export const GoldFish = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 80" className={className}>
    {/* Fish body */}
    <ellipse cx="45" cy="40" rx="25" ry="15" fill="#FFD700" />
    <ellipse cx="45" cy="40" rx="20" ry="12" fill="#FFF700" />

    {/* Tail */}
    <path d="M20 40 L5 25 L10 40 L5 55 Z" fill="#FFD700" />

    {/* Fins */}
    <ellipse cx="35" cy="50" rx="8" ry="4" fill="#FFD700" transform="rotate(30 35 50)" />
    <ellipse cx="35" cy="30" rx="8" ry="4" fill="#FFD700" transform="rotate(-30 35 30)" />

    {/* Eye */}
    <circle cx="55" cy="35" r="4" fill="#FFFFFF" />
    <circle cx="56" cy="35" r="2" fill="#000000" />
    <circle cx="57" cy="34" r="1" fill="#FFFFFF" />

    {/* Scales pattern */}
    <g fill="#FFFF99" opacity="0.8">
      <circle cx="40" cy="35" r="2" />
      <circle cx="50" cy="40" r="2" />
      <circle cx="45" cy="45" r="2" />
    </g>

    {/* Sparkles */}
    <g fill="#FFF700">
      <path d="M75 20 L77 25 L82 23 L77 28 L75 33 L73 28 L68 23 L73 25 Z" opacity="0.8" />
      <circle cx="85" cy="15" r="1" opacity="0.9" />
    </g>
  </svg>
)

export const RecipeBook = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 80 100" className={className}>
    {/* Book cover */}
    <rect x="15" y="10" width="50" height="70" rx="3" fill="#8B4513" />
    <rect x="18" y="13" width="44" height="64" rx="2" fill="#DEB887" />

    {/* Book spine */}
    <rect x="12" y="10" width="6" height="70" rx="3" fill="#654321" />

    {/* Cover design */}
    <rect x="25" y="20" width="30" height="20" rx="2" fill="#FFFFFF" opacity="0.9" />
    <text x="40" y="32" textAnchor="middle" fontSize="8" fill="#8B4513" fontWeight="bold">
      RECEITAS
    </text>

    {/* Cooking icons */}
    <circle cx="30" cy="50" r="3" fill="#FF6B6B" />
    <circle cx="40" cy="55" r="2.5" fill="#4ECDC4" />
    <circle cx="50" cy="50" r="3" fill="#45B7D1" />

    {/* Pages */}
    <rect x="20" y="8" width="40" height="2" fill="#FFFFFF" />
    <rect x="22" y="6" width="36" height="2" fill="#F5F5F5" />

    {/* Bookmark */}
    <rect x="45" y="10" width="4" height="25" fill="#FF6B6B" />
    <path d="M45 35 L47 32 L49 35 Z" fill="#FF6B6B" />
  </svg>
)

export const Succulent = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 80 100" className={className}>
    {/* Pot */}
    <path d="M25 70 L55 70 L50 90 L30 90 Z" fill="#D2691E" />
    <ellipse cx="40" cy="70" rx="15" ry="3" fill="#8B4513" />

    {/* Soil */}
    <ellipse cx="40" cy="72" rx="12" ry="2" fill="#654321" />

    {/* Succulent layers */}
    <g transform="translate(40, 65)">
      {/* Bottom layer */}
      <g fill="#228B22">
        <ellipse cx="0" cy="0" rx="12" ry="4" />
        <ellipse cx="-8" cy="-2" rx="6" ry="3" transform="rotate(-20)" />
        <ellipse cx="8" cy="-2" rx="6" ry="3" transform="rotate(20)" />
        <ellipse cx="0" cy="-8" rx="6" ry="3" />
      </g>

      {/* Middle layer */}
      <g fill="#32CD32" transform="translate(0, -8)">
        <ellipse cx="0" cy="0" rx="8" ry="3" />
        <ellipse cx="-5" cy="-2" rx="4" ry="2" transform="rotate(-25)" />
        <ellipse cx="5" cy="-2" rx="4" ry="2" transform="rotate(25)" />
        <ellipse cx="0" cy="-5" rx="4" ry="2" />
      </g>

      {/* Top layer */}
      <g fill="#90EE90" transform="translate(0, -14)">
        <ellipse cx="0" cy="0" rx="5" ry="2" />
        <ellipse cx="-3" cy="-1" rx="3" ry="1.5" transform="rotate(-30)" />
        <ellipse cx="3" cy="-1" rx="3" ry="1.5" transform="rotate(30)" />
      </g>
    </g>

    {/* Decorative dots */}
    <g fill="#FFFFFF" opacity="0.6">
      <circle cx="35" cy="60" r="1" />
      <circle cx="45" cy="58" r="0.8" />
      <circle cx="40" cy="52" r="0.6" />
    </g>
  </svg>
)

export const OrangeCat = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 120" className={className}>
    {/* Cat body */}
    <ellipse cx="50" cy="80" rx="20" ry="25" fill="#FF8C00" />

    {/* Cat head */}
    <circle cx="50" cy="45" r="18" fill="#FF8C00" />

    {/* Ears */}
    <path d="M35 35 L40 20 L45 35 Z" fill="#FF8C00" />
    <path d="M55 35 L60 20 L65 35 Z" fill="#FF8C00" />
    <path d="M37 32 L40 25 L43 32 Z" fill="#FFB347" />
    <path d="M57 32 L60 25 L63 32 Z" fill="#FFB347" />

    {/* Eyes */}
    <ellipse cx="43" cy="42" rx="3" ry="4" fill="#000000" />
    <ellipse cx="57" cy="42" rx="3" ry="4" fill="#000000" />
    <ellipse cx="43" cy="41" rx="1" ry="2" fill="#32CD32" />
    <ellipse cx="57" cy="41" rx="1" ry="2" fill="#32CD32" />
    <circle cx="44" cy="40" r="0.5" fill="#FFFFFF" />
    <circle cx="58" cy="40" r="0.5" fill="#FFFFFF" />

    {/* Nose */}
    <path d="M48 48 L50 45 L52 48 L50 50 Z" fill="#FFB6C1" />

    {/* Mouth */}
    <path d="M50 50 Q45 55 40 52" stroke="#000000" strokeWidth="1" fill="none" />
    <path d="M50 50 Q55 55 60 52" stroke="#000000" strokeWidth="1" fill="none" />

    {/* Whiskers */}
    <g stroke="#000000" strokeWidth="1">
      <line x1="25" y1="45" x2="35" y2="47" />
      <line x1="25" y1="50" x2="35" y2="50" />
      <line x1="65" y1="47" x2="75" y2="45" />
      <line x1="65" y1="50" x2="75" y2="50" />
    </g>

    {/* Stripes */}
    <g fill="#FF7F00" opacity="0.7">
      <ellipse cx="45" cy="35" rx="2" ry="8" transform="rotate(-20 45 35)" />
      <ellipse cx="55" cy="35" rx="2" ry="8" transform="rotate(20 55 35)" />
      <ellipse cx="40" cy="75" rx="3" ry="10" />
      <ellipse cx="60" cy="75" rx="3" ry="10" />
    </g>

    {/* Paws */}
    <ellipse cx="40" cy="100" rx="4" ry="6" fill="#FF8C00" />
    <ellipse cx="60" cy="100" rx="4" ry="6" fill="#FF8C00" />

    {/* Tail */}
    <path d="M70 85 Q85 70 80 50 Q75 45 70 50 Q75 65 65 80" fill="#FF8C00" />
    <path d="M72 75 Q80 65 78 55" stroke="#FF7F00" strokeWidth="2" fill="none" />
  </svg>
)

export const TeaCup = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {/* Saucer */}
    <ellipse cx="50" cy="85" rx="25" ry="5" fill="#E6E6FA" />
    <ellipse cx="50" cy="83" rx="25" ry="5" fill="#DDA0DD" />

    {/* Cup body */}
    <path d="M30 75 L35 45 L65 45 L70 75 Z" fill="#FFFFFF" />
    <path d="M32 73 L37 47 L63 47 L68 73 Z" fill="#F8F8FF" />

    {/* Cup rim */}
    <ellipse cx="50" cy="45" rx="17.5" ry="3" fill="#E6E6FA" />
    <ellipse cx="50" cy="44" rx="17.5" ry="3" fill="#FFFFFF" />

    {/* Handle */}
    <path d="M70 55 Q80 55 80 65 Q80 70 75 70 Q72 70 72 67 Q72 60 70 60" stroke="#DDA0DD" strokeWidth="3" fill="none" />

    {/* Tea inside */}
    <ellipse cx="50" cy="46" rx="15" ry="2" fill="#8B4513" opacity="0.8" />

    {/* Steam */}
    <g stroke="#CCCCCC" strokeWidth="1.5" fill="none" opacity="0.6">
      <path d="M45 40 Q47 35 45 30 Q43 25 45 20">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M50 40 Q52 35 50 30 Q48 25 50 20">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M55 40 Q57 35 55 30 Q53 25 55 20">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
      </path>
    </g>

    {/* Decorative pattern */}
    <g fill="#DDA0DD" opacity="0.4">
      <circle cx="45" cy="60" r="2" />
      <circle cx="55" cy="65" r="1.5" />
      <circle cx="50" cy="70" r="1" />
    </g>
  </svg>
)
