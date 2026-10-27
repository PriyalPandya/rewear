'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Garment',
  afterLabel = 'Transformed Piece',
  className = '',
  aspectRatio = 'aspect-[4/3]',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none cursor-ew-resize rounded-2xl bg-[#173F35]/5 shadow-inner ${aspectRatio} ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      role="region"
      aria-label="Interactive before and after comparison slider"
    >
      {/* After image (Base layer) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />
      {/* After label */}
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-[#173F35]/85 backdrop-blur-md text-[#F8F5EF] text-[11px] font-medium tracking-wide uppercase shadow-sm">
        {afterLabel}
      </div>

      {/* Before image (Clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          loading="lazy"
        />
        {/* Before label */}
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[#252824]/85 backdrop-blur-md text-[#F8F5EF] text-[11px] font-medium tracking-wide uppercase shadow-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Divider line & handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none z-20 flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 -ml-[15px] rounded-full bg-[#F8F5EF] text-[#173F35] shadow-lg flex items-center justify-center border-2 border-[#173F35] transition-transform duration-150 hover:scale-110 active:scale-95">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 7L3 12L8 17M16 7L21 12L16 17" />
          </svg>
        </div>
      </div>

      {/* Subtle guide instruction pill at bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[10px] font-medium pointer-events-none">
        Drag slider to compare
      </div>
    </div>
  );
}
