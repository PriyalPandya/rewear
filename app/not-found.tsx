'use client';

import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { ArrowLeft, Scissors } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col justify-between p-6">
      <header className="max-w-7xl mx-auto w-full py-4">
        <Link href="/">
          <BrandLogo />
        </Link>
      </header>

      <main className="max-w-md mx-auto text-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-[#173F35]/10 text-[#173F35] flex items-center justify-center mx-auto mb-6">
          <Scissors className="w-8 h-8 text-[#C96F4A]" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-[#C96F4A]">
          Error 404 • Missing Pattern
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#173F35] mt-2 mb-4">
          This Thread Has Run Out
        </h1>

        <p className="text-sm text-[#252824]/75 leading-relaxed mb-8">
          The page or transformation pattern you are looking for does not exist or has been recut into another piece.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#173F35] text-[#F8F5EF] text-sm font-medium hover:bg-[#123129] transition-colors shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-[#C96F4A]" />
          <span>Return to Atelier Home</span>
        </Link>
      </main>

      <footer className="text-center text-xs text-[#252824]/50 py-4">
        © 2026 ReWear — Clothing Upcycling Platform
      </footer>
    </div>
  );
}
