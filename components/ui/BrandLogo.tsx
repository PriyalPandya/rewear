import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
}

export function BrandLogo({ className = '', variant = 'auto', showTagline = false }: BrandLogoProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-[#F8F5EF]' : 'text-[#173F35]';
  const accentColor = '#C96F4A'; // Burnt terracotta
  const threadColor = isDark ? '#B9C9B1' : '#173F35';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Artisanal needle, thread & circular infinity loop emblem */}
      <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-[#173F35] text-[#F8F5EF] shadow-sm ring-1 ring-[#173F35]/20 overflow-hidden flex-shrink-0">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 transform hover:rotate-12 transition-transform duration-300"
          aria-hidden="true"
        >
          {/* Continuous circular upcycling thread loop */}
          <path
            d="M8 18C8 12.4772 12.4772 8 18 8C23.5228 8 28 12.4772 28 18C28 23.5228 23.5228 28 18 28C13.5 28 10 24 10 20"
            stroke={threadColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="2 3"
            opacity="0.85"
          />
          {/* Diagonal bespoke sewing needle */}
          <path
            d="M26 10L12 24"
            stroke="#F8F5EF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Needle eye */}
          <ellipse
            cx="24.5"
            cy="11.5"
            rx="1.2"
            ry="2"
            transform="rotate(-45 24.5 11.5)"
            stroke="#F8F5EF"
            strokeWidth="1.2"
            fill="#173F35"
          />
          {/* Burnt terracotta thread knot accent */}
          <circle cx="12" cy="24" r="2.5" fill={accentColor} />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-serif tracking-tight text-2xl font-bold leading-none ${textColor}`}>
          Re<span className="text-[#C96F4A]">Wear</span>
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-widest text-[#B9C9B1] font-sans font-medium mt-0.5">
            Circular Garment Studio
          </span>
        )}
      </div>
    </div>
  );
}
