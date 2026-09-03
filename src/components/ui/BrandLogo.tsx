'use client';

export function BrandLogo({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* HD Flooring Brand SVG Emblem */}
      <svg
        viewBox="0 0 200 180"
        className="h-full w-auto drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Red Roof */}
        <path
          d="M 100 10 L 185 60 L 175 75 L 100 30 L 25 75 L 15 60 Z"
          fill="#DC2626"
        />

        {/* Inner Cyan Roof */}
        <path
          d="M 100 32 L 168 72 L 160 82 L 100 48 L 40 82 L 32 72 Z"
          fill="#0284C7"
        />

        {/* Carpet Roll (Red) inside Roof Left */}
        <path
          d="M 45 78 C 45 70, 75 60, 95 68 C 95 75, 80 88, 50 82 Z"
          fill="#EF4444"
        />

        {/* Floor Tile Grid inside Roof Right */}
        <rect x="110" y="65" width="22" height="12" fill="#94A3B8" rx="1" />
        <rect x="135" y="65" width="22" height="12" fill="#64748B" rx="1" />
        <rect x="120" y="80" width="22" height="12" fill="#475569" rx="1" />

        {/* Main HD Lettering */}
        <text
          x="100"
          y="130"
          textAnchor="middle"
          fill="#18181B"
          className="dark:fill-stone-100"
          fontSize="52"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="4"
        >
          HD
        </text>

        {/* Bottom Red Ribbon Banner */}
        <path
          d="M 20 142 Q 100 135 180 142 L 175 168 Q 100 162 25 168 Z"
          fill="#DC2626"
        />

        {/* "FLOORING" text inside ribbon */}
        <text
          x="100"
          y="160"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="17"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="3"
        >
          FLOORING
        </text>
      </svg>
    </div>
  );
}
